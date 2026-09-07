/**
 * Headless verification harness (dev tool, not shipped).
 *
 * Drives Chrome over the DevTools Protocol to do what a screenshot flag
 * cannot: emulate a real mobile device, wait real time so CSS transitions
 * actually settle, measure horizontal overflow, and report accessibility
 * facts (contrast-relevant colours, heading order, focusable elements).
 *
 * Usage: node scripts/audit.mjs <url> [...]
 */

import { spawn } from "node:child_process";
import { mkdir, writeFile } from "node:fs/promises";
import { setTimeout as sleep } from "node:timers/promises";

const CHROME =
  process.env.CHROME_PATH ??
  "C:/Program Files/Google/Chrome/Application/chrome.exe";
const PORT = 9333;
const OUT = ".shots";

const urls = process.argv.slice(2);
if (!urls.length) {
  console.error("usage: node scripts/audit.mjs <url> [...]");
  process.exit(1);
}

const DEVICES = [
  { name: "mobile", width: 390, height: 844, dsf: 3, mobile: true },
  { name: "tablet", width: 834, height: 1112, dsf: 2, mobile: true },
  { name: "desktop", width: 1440, height: 900, dsf: 1, mobile: false },
];

await mkdir(OUT, { recursive: true });

/* ------------------------------------------------------------------ */
/* Launch                                                              */
/* ------------------------------------------------------------------ */

const chrome = spawn(
  CHROME,
  [
    "--headless=new",
    `--remote-debugging-port=${PORT}`,
    "--disable-gpu",
    "--no-first-run",
    "--no-default-browser-check",
    "--hide-scrollbars",
    "--user-data-dir=" + process.env.TEMP + "/cdp-audit-profile",
    "about:blank",
  ],
  { stdio: "ignore" },
);

/** Poll until the DevTools HTTP endpoint answers. */
async function waitForDevTools() {
  for (let i = 0; i < 60; i++) {
    try {
      const res = await fetch(`http://127.0.0.1:${PORT}/json/version`);
      if (res.ok) return (await res.json()).webSocketDebuggerUrl;
    } catch {
      /* not up yet */
    }
    await sleep(250);
  }
  throw new Error("Chrome DevTools endpoint never became available");
}

const browserWs = await waitForDevTools();

/* ------------------------------------------------------------------ */
/* Minimal CDP client over the built-in WebSocket                      */
/* ------------------------------------------------------------------ */

function connect(url) {
  const ws = new WebSocket(url);
  const pending = new Map();
  let nextId = 1;

  const ready = new Promise((resolve, reject) => {
    ws.addEventListener("open", () => resolve());
    ws.addEventListener("error", (e) => reject(e));
  });

  ws.addEventListener("message", (event) => {
    const msg = JSON.parse(event.data);
    const entry = pending.get(msg.id);
    if (!entry) return;
    pending.delete(msg.id);
    if (msg.error) entry.reject(new Error(JSON.stringify(msg.error)));
    else entry.resolve(msg.result);
  });

  const send = (method, params = {}, sessionId) =>
    new Promise((resolve, reject) => {
      const id = nextId++;
      pending.set(id, { resolve, reject });
      ws.send(JSON.stringify({ id, method, params, sessionId }));
    });

  return { ready, send, close: () => ws.close() };
}

const browser = connect(browserWs);
await browser.ready;

const { targetId } = await browser.send("Target.createTarget", {
  url: "about:blank",
});
const { sessionId } = await browser.send("Target.attachToTarget", {
  targetId,
  flatten: true,
});

const send = (method, params) => browser.send(method, params, sessionId);

await send("Page.enable");
await send("Runtime.enable");

/* ------------------------------------------------------------------ */
/* The page-side probe                                                 */
/* ------------------------------------------------------------------ */

const PROBE = `(() => {
  const doc = document.documentElement;
  const vw = doc.clientWidth;

  // Anything whose painted box extends past the viewport's right edge.
  const overflow = [];
  for (const el of document.querySelectorAll("body *")) {
    const r = el.getBoundingClientRect();
    if (r.width === 0 && r.height === 0) continue;
    const style = getComputedStyle(el);
    if (style.position === "fixed") continue;      // fixed decor is expected
    if (r.right > vw + 1 || r.left < -1) {
      overflow.push({
        tag: el.tagName.toLowerCase(),
        cls: (el.getAttribute("class") || "").slice(0, 90),
        left: Math.round(r.left),
        right: Math.round(r.right),
        width: Math.round(r.width),
      });
    }
  }

  // Heading order: flag any jump of more than one level.
  const headings = [...document.querySelectorAll("h1,h2,h3,h4,h5,h6")]
    .map((h) => ({ level: +h.tagName[1], text: h.textContent.trim().slice(0, 55) }));
  const jumps = [];
  for (let i = 1; i < headings.length; i++) {
    if (headings[i].level - headings[i - 1].level > 1) {
      jumps.push(headings[i - 1].text + " -> " + headings[i].text);
    }
  }

  // Reveal elements still invisible after the full scroll pass. This must
  // consider the entire document: an earlier version only looked at the
  // viewport and therefore reported zero while most of the page was blank.
  const stuck = [...document.querySelectorAll(".reveal")].filter(
    (el) => getComputedStyle(el).opacity === "0",
  ).length;

  return JSON.stringify({
    viewportWidth: vw,
    scrollWidth: doc.scrollWidth,
    horizontalOverflow: doc.scrollWidth - vw,
    overflowingElements: overflow.slice(0, 12),
    headingCount: headings.length,
    h1Count: headings.filter((h) => h.level === 1).length,
    headingJumps: jumps,
    stuckReveals: stuck,
    imagesMissingAlt: [...document.images].filter((i) => !i.hasAttribute("alt")).length,
    linksWithoutText: [...document.querySelectorAll("a")].filter(
      (a) => !a.textContent.trim() && !a.getAttribute("aria-label")
    ).length,
    buttonsWithoutName: [...document.querySelectorAll("button")].filter(
      (b) => !b.textContent.trim() && !b.getAttribute("aria-label")
    ).length,
    focusable: document.querySelectorAll(
      'a[href],button:not([disabled]),input,select,textarea,[tabindex]:not([tabindex="-1"])'
    ).length,
  });
})()`;

/* ------------------------------------------------------------------ */
/* Run                                                                 */
/* ------------------------------------------------------------------ */

const report = [];

for (const url of urls) {
  for (const device of DEVICES) {
    await send("Emulation.setDeviceMetricsOverride", {
      width: device.width,
      height: device.height,
      deviceScaleFactor: 1,
      mobile: device.mobile,
    });

    await send("Page.navigate", { url });
    // Real time, so fonts load and CSS transitions finish.
    await sleep(1800);

    // Scroll to the bottom and back so every IntersectionObserver fires.
    // `behavior: "instant"` is essential: the stylesheet sets
    // `scroll-behavior: smooth`, which turns a plain scrollTo() into an
    // animation that a stepped loop restarts before it ever arrives.
    const { result: scroll } = await send("Runtime.evaluate", {
      expression: `(async () => {
        const step = window.innerHeight * 0.8;
        let reached = 0;
        for (let y = 0; y < document.documentElement.scrollHeight; y += step) {
          window.scrollTo({ top: y, left: 0, behavior: "instant" });
          await new Promise(r => setTimeout(r, 90));
          reached = Math.max(reached, window.scrollY);
        }
        window.scrollTo({ top: 0, left: 0, behavior: "instant" });
        await new Promise(r => setTimeout(r, 600));
        return reached;
      })()`,
      awaitPromise: true,
      returnByValue: true,
    });

    const { result } = await send("Runtime.evaluate", {
      expression: PROBE,
      returnByValue: true,
    });

    const data = JSON.parse(result.value);
    data.maxScrollY = Math.round(scroll.value);
    const slug = url.replace(/https?:\/\/[^/]+\//, "").replace(/\//g, "_") || "home";
    report.push({ url, device: device.name, ...data });

    const shot = await send("Page.captureScreenshot", {
      format: "png",
      captureBeyondViewport: true,
      optimizeForSpeed: false,
    });
    await writeFile(`${OUT}/${slug}-${device.name}.png`, Buffer.from(shot.data, "base64"));
  }
}

console.log(JSON.stringify(report, null, 2));

await browser.send("Target.closeTarget", { targetId });
browser.close();
chrome.kill();
