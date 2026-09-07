/**
 * Build-time image pipeline.
 *
 * Takes the original 1254x1254 PNG headshot (1.8 MB) and produces the
 * responsive WebP variants and the Open Graph card the site actually ships.
 * Run with `npm run images` whenever the source photo changes; the outputs
 * are committed so a normal build needs no image processing.
 */

import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const publicDir = resolve(here, "../public");

const SOURCE = process.env.PHOTO_SOURCE ?? "C:/Users/DipanjanDas/Downloads/Aarti Photo.png";

const NAME = "Aarti Hariharno";
const STACK = ".NET  ·  Angular  ·  Microservices  ·  Cloud";
const BG = "#0a0b0e";
const ACCENT = "#4d9fff";
const FG = "#eceef2";
const MUTED = "#949bab";
const FONT = "Segoe UI, Inter, Arial, sans-serif";

await mkdir(publicDir, { recursive: true });

/* ------------------------------------------------------------------ */
/* 1. Responsive portrait, cropped square -> 4:5 editorial crop        */
/* ------------------------------------------------------------------ */

const portrait = sharp(SOURCE).extract({
  // 1254 wide source; a 4:5 crop keeps the subject and drops dead margin.
  left: Math.round((1254 - 1003) / 2),
  top: 0,
  width: 1003,
  height: 1254,
});

for (const width of [480, 960]) {
  const out = `portrait-${width}.webp`;
  const info = await portrait
    .clone()
    .resize({ width, fit: "cover" })
    .webp({ quality: 82, effort: 6 })
    .toFile(resolve(publicDir, out));
  console.log(`${out.padEnd(22)} ${info.width}x${info.height}  ${(info.size / 1024).toFixed(1)} KB`);
}

/* ------------------------------------------------------------------ */
/* 2. Open Graph card (1200x630)                                       */
/* ------------------------------------------------------------------ */

const AVATAR = 260;

const avatar = await sharp(SOURCE)
  .resize({ width: AVATAR, height: AVATAR, fit: "cover", position: "top" })
  .composite([
    {
      // Circular mask.
      input: Buffer.from(
        `<svg width="${AVATAR}" height="${AVATAR}">
           <circle cx="${AVATAR / 2}" cy="${AVATAR / 2}" r="${AVATAR / 2}" fill="#fff"/>
         </svg>`,
      ),
      blend: "dest-in",
    },
  ])
  .png()
  .toBuffer();

const card = `<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse">
      <path d="M48 0H0V48" fill="none" stroke="rgba(255,255,255,0.035)" stroke-width="1"/>
    </pattern>
    <radialGradient id="glow" cx="82%" cy="6%" r="62%">
      <stop offset="0%" stop-color="${ACCENT}" stop-opacity="0.20"/>
      <stop offset="100%" stop-color="${ACCENT}" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <rect width="1200" height="630" fill="${BG}"/>
  <rect width="1200" height="630" fill="url(#grid)"/>
  <rect width="1200" height="630" fill="url(#glow)"/>

  <rect x="0" y="0" width="1200" height="4" fill="${ACCENT}"/>

  <text x="80" y="196" font-family="${FONT}" font-size="26" font-weight="500"
        letter-spacing="5" fill="${ACCENT}">FULL STACK SOFTWARE ENGINEER</text>

  <text x="76" y="316" font-family="${FONT}" font-size="94" font-weight="700"
        letter-spacing="-3" fill="${FG}">${NAME}</text>

  <text x="80" y="392" font-family="${FONT}" font-size="30" fill="${MUTED}">
    Building scalable web applications, distributed
  </text>
  <text x="80" y="436" font-family="${FONT}" font-size="30" fill="${MUTED}">
    systems and cloud-native solutions.
  </text>

  <rect x="80" y="492" width="64" height="2" fill="${ACCENT}"/>
  <text x="80" y="546" font-family="${FONT}" font-size="25" letter-spacing="1"
        fill="${MUTED}">${STACK}</text>

  <circle cx="${1200 - 190}" cy="250" r="${AVATAR / 2 + 8}" fill="none"
          stroke="rgba(255,255,255,0.16)" stroke-width="1.5"/>
  <circle cx="${1200 - 190}" cy="250" r="${AVATAR / 2 + 24}" fill="none"
          stroke="rgba(255,255,255,0.07)" stroke-width="1"/>
</svg>`;

const ogInfo = await sharp(Buffer.from(card))
  .composite([{ input: avatar, left: 1200 - 190 - AVATAR / 2, top: 250 - AVATAR / 2 }])
  .png({ compressionLevel: 9 })
  .toFile(resolve(publicDir, "og.png"));

console.log(`og.png                 ${ogInfo.width}x${ogInfo.height}  ${(ogInfo.size / 1024).toFixed(1)} KB`);

/* ------------------------------------------------------------------ */
/* 3. Apple touch icon — monogram, not the photo (unreadable at 180px) */
/* ------------------------------------------------------------------ */

const monogram = `<svg width="180" height="180" xmlns="http://www.w3.org/2000/svg">
  <rect width="180" height="180" rx="40" fill="${BG}"/>
  <rect x="0.75" y="0.75" width="178.5" height="178.5" rx="39"
        fill="none" stroke="rgba(255,255,255,0.14)" stroke-width="1.5"/>
  <text x="90" y="118" text-anchor="middle" font-family="${FONT}"
        font-size="76" font-weight="600" letter-spacing="-2" fill="${ACCENT}">AH</text>
</svg>`;

const iconInfo = await sharp(Buffer.from(monogram))
  .png({ compressionLevel: 9 })
  .toFile(resolve(publicDir, "apple-icon.png"));

console.log(`apple-icon.png         ${iconInfo.width}x${iconInfo.height}  ${(iconInfo.size / 1024).toFixed(1)} KB`);
