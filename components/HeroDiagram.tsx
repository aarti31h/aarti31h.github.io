/**
 * The hero's technical visual: a scaled-down rendering of the actual
 * architecture behind the flagship platform — Angular over a secure API,
 * finance microservices, a message bus, then data and cache.
 *
 * Pure SVG with CSS-driven dash animation. No animation library, no canvas,
 * no JavaScript: it costs a single static payload and animates on the
 * compositor. Decorative, so it is hidden from assistive technology and the
 * same information is given as text elsewhere on the page.
 */

type Node = { x: number; y: number; label: string; accent?: boolean };

const W = 96;
const H = 30;

const nodes: Node[] = [
  { x: 210, y: 34, label: "Angular", accent: true },
  { x: 210, y: 124, label: "Secure API", accent: true },
  { x: 88, y: 214, label: "Subscriptions" },
  { x: 210, y: 214, label: "Payments" },
  { x: 332, y: 214, label: "Goal tracking" },
  { x: 210, y: 304, label: "Service Bus", accent: true },
  { x: 122, y: 394, label: "Redis" },
  { x: 298, y: 394, label: "SQL / Postgres" },
];

/** [fromX, fromY, toX, toY] in flow order, used to stagger the dash offset. */
const edges: [number, number, number, number][] = [
  [210, 49, 210, 109],
  [210, 139, 88, 199],
  [210, 139, 210, 199],
  [210, 139, 332, 199],
  [88, 229, 210, 289],
  [210, 229, 210, 289],
  [332, 229, 210, 289],
  [210, 319, 122, 379],
  [210, 319, 298, 379],
];

export default function HeroDiagram() {
  return (
    <svg
      viewBox="0 0 420 440"
      role="presentation"
      aria-hidden="true"
      focusable="false"
      className="h-auto w-full max-w-[580px]"
    >
      <defs>
        <linearGradient id="edge" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" className="diag-edge-stop" stopOpacity="0.55" />
          <stop offset="100%" className="diag-edge-stop" stopOpacity="0.2" />
        </linearGradient>
        <filter id="soft" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="7" />
        </filter>
      </defs>

      {/* Ambient wash behind the middle of the stack */}
      <ellipse
        cx="210"
        cy="220"
        rx="150"
        ry="170"
        className="diag-glow"
        opacity="0.09"
        filter="url(#soft)"
      />

      {/* Connectors */}
      <g fill="none" stroke="url(#edge)" strokeWidth="1.25" strokeLinecap="round">
        {edges.map(([x1, y1, x2, y2], i) => (
          <line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            className="flow-line"
            style={{ animationDelay: `${i * 130}ms` }}
          />
        ))}
      </g>

      {/* Pulse markers where edges leave a node */}
      <g className="diag-glow">
        {edges.map(([x1, y1], i) => (
          <circle
            key={i}
            cx={x1}
            cy={y1}
            r="3"
            className="node-pulse"
            style={{ animationDelay: `${i * 240}ms` }}
          />
        ))}
      </g>

      {/* Nodes */}
      <g>
        {nodes.map((n) => (
          <g key={n.label}>
            <rect
              x={n.x - W / 2}
              y={n.y - H / 2}
              width={W}
              height={H}
              rx="7"
              className={n.accent ? "diag-node-accent" : "diag-node"}
              strokeWidth="1"
            />
            <text
              x={n.x}
              y={n.y + 3.5}
              textAnchor="middle"
              fontFamily="var(--font-mono-face), ui-monospace, monospace"
              fontSize="9.5"
              letterSpacing="0.4"
              className={n.accent ? "diag-label-accent" : "diag-label"}
            >
              {n.label}
            </text>
          </g>
        ))}
      </g>

      {/* Blueprint corner ticks */}
      <g className="diag-frame" strokeWidth="1" fill="none">
        <path d="M8 26V8h18" />
        <path d="M412 26V8h-18" />
        <path d="M8 414v18h18" />
        <path d="M412 414v18h-18" />
      </g>
    </svg>
  );
}
