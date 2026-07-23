import { useMemo } from "react";

export default function CommitGraphField() {
  const paths = useMemo(
    () => [
      { d: "M40,80 L40,760", lane: 0 },
      { d: "M120,140 L120,660", lane: 1 },
      { d: "M200,40 L200,860", lane: 2 },
      { d: "M280,220 L280,560", lane: 3 },
      { d: "M40,220 C70,220 90,260 120,260", lane: 0 },
      { d: "M120,420 C150,420 170,460 200,460", lane: 1 },
      { d: "M200,600 C230,600 250,560 280,560", lane: 2 },
      { d: "M280,340 C250,340 230,300 200,300", lane: 3 },
      { d: "M200,180 C170,180 150,140 120,140", lane: 2 },
    ],
    []
  );

  const nodes = useMemo(
    () => [
      [40, 80], [40, 220], [40, 400], [40, 580], [40, 760],
      [120, 140], [120, 260], [120, 420], [120, 660],
      [200, 40], [200, 180], [200, 300], [200, 460], [200, 600], [200, 860],
      [280, 220], [280, 340], [280, 560],
    ],
    []
  );

  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.16]"
      viewBox="0 0 320 900"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="graphStroke" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#96B6DD" />
          <stop offset="50%" stopColor="#9D4EF4" />
          <stop offset="100%" stopColor="#EA4C89" />
        </linearGradient>
      </defs>
      <g fill="none" stroke="url(#graphStroke)" strokeWidth="1.5" strokeLinecap="round">
        {paths.map((p, i) => (
          <path key={i} d={p.d} />
        ))}
      </g>
      <g fill="#C9CBD5">
        {nodes.map(([cx, cy], i) => (
          <circle key={i} cx={cx} cy={cy} r={i % 5 === 0 ? 3.5 : 2.5} />
        ))}
      </g>
    </svg>
  );
}
