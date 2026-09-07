"use client";

import { useId, useState } from "react";
import { archLayers } from "@/lib/content";

/** The last entry is a cross-cutting concern, not a layer in the request path. */
const layers = archLayers.filter((l) => l.id !== "ops");
const crossCutting = archLayers.find((l) => l.id === "ops")!;

export default function ArchitectureExplorer() {
  const [activeId, setActiveId] = useState("services");
  const panelId = useId();

  const active = archLayers.find((l) => l.id === activeId) ?? layers[0];

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-14">
      {/* ------------------------------------------------------------ */}
      {/* Request path                                                  */}
      {/* ------------------------------------------------------------ */}
      <div>
        <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-faint">
          Request path
        </p>

        <ol className="mt-5" role="list">
          {layers.map((layer, i) => {
            const isActive = layer.id === activeId;
            return (
              <li key={layer.id}>
                <button
                  type="button"
                  aria-expanded={isActive}
                  aria-controls={panelId}
                  onClick={() => setActiveId(layer.id)}
                  onMouseEnter={() => setActiveId(layer.id)}
                  onFocus={() => setActiveId(layer.id)}
                  className={`flex w-full items-center justify-between gap-4 rounded-lg border px-5 py-4 text-left transition-all duration-400 ${
                    isActive
                      ? "border-accent/50 bg-accent/[0.08]"
                      : "border-line bg-surface/30 hover:border-line-strong hover:bg-surface/60"
                  }`}
                >
                  <span className="flex items-center gap-4">
                    <span
                      className={`font-mono text-[10.5px] transition-colors duration-400 ${
                        isActive ? "text-accent" : "text-faint"
                      }`}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={`text-[15px] font-medium tracking-tight transition-colors duration-400 ${
                        isActive ? "text-accent-soft" : "text-fg"
                      }`}
                    >
                      {layer.label}
                    </span>
                  </span>
                  <span className="hidden font-mono text-[11px] text-faint sm:block">
                    {layer.role}
                  </span>
                </button>

                {/* Connector between layers */}
                {i < layers.length - 1 && (
                  <div className="flex h-6 justify-start pl-[2.35rem]" aria-hidden="true">
                    <svg width="2" height="24" className="overflow-visible">
                      <line
                        x1="1"
                        y1="0"
                        x2="1"
                        y2="24"
                        className="diag-edge flow-line"
                        strokeOpacity="0.4"
                        strokeWidth="1.5"
                        style={{ animationDelay: `${i * 160}ms` }}
                      />
                    </svg>
                  </div>
                )}
              </li>
            );
          })}
        </ol>

        {/* Cross-cutting rail */}
        <button
          type="button"
          aria-expanded={activeId === crossCutting.id}
          aria-controls={panelId}
          onClick={() => setActiveId(crossCutting.id)}
          onMouseEnter={() => setActiveId(crossCutting.id)}
          onFocus={() => setActiveId(crossCutting.id)}
          className={`mt-8 flex w-full items-center justify-between gap-4 rounded-lg border border-dashed px-5 py-4 text-left transition-all duration-400 ${
            activeId === crossCutting.id
              ? "border-accent/50 bg-accent/[0.08]"
              : "border-line-strong bg-transparent hover:bg-surface/50"
          }`}
        >
          <span
            className={`text-[15px] font-medium tracking-tight transition-colors duration-400 ${
              activeId === crossCutting.id ? "text-accent-soft" : "text-fg"
            }`}
          >
            {crossCutting.label}
          </span>
          <span className="hidden font-mono text-[11px] text-faint sm:block">
            {crossCutting.role}
          </span>
        </button>
      </div>

      {/* ------------------------------------------------------------ */}
      {/* Explanation panel                                             */}
      {/* ------------------------------------------------------------ */}
      <div
        id={panelId}
        aria-live="polite"
        className="lg:sticky lg:top-28 lg:self-start"
      >
        <div className="rounded-xl border border-line bg-surface/40 p-7 sm:p-8">
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent">
            {active.role}
          </p>

          <h3 className="mt-4 text-2xl font-medium tracking-tight">{active.label}</h3>

          {/* key forces a repaint so the text fades on each change */}
          <p
            key={active.id}
            className="prose-body mt-5 animate-[fadeIn_450ms_ease-out] text-pretty text-[15px]"
          >
            {active.detail}
          </p>

          <ul className="mt-7 flex flex-wrap gap-1.5 border-t border-line pt-6">
            {active.tech.map((tech) => (
              <li
                key={tech}
                className="rounded border border-line px-2.5 py-1 font-mono text-[11.5px] text-muted"
              >
                {tech}
              </li>
            ))}
          </ul>
        </div>

        <p className="mt-4 px-1 font-mono text-[11px] text-faint">
          Hover, tap or tab through a layer to see why it is there.
        </p>
      </div>
    </div>
  );
}
