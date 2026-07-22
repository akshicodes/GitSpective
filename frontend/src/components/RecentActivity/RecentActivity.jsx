import { GitCommitHorizontal } from "lucide-react";

/**
 * Placeholder activity timeline.
 *
 * @param {object[]} items
 * @param {string} items[].action
 * @param {string} items[].target
 * @param {string} items[].time
 */
export default function RecentActivity({ items }) {
  return (
    <ol className="space-y-1">
      {items.map((item, i) => (
        <li key={item.id} className="relative flex gap-3.5 pb-5 last:pb-0">
          {/* connector line */}
          {i < items.length - 1 && (
            <span
              className="absolute left-[9px] top-5 h-full w-px bg-white/10"
              aria-hidden="true"
            />
          )}
          <span className="mt-0.5 flex h-[19px] w-[19px] shrink-0 items-center justify-center rounded-full border border-white/15 bg-bg">
            <GitCommitHorizontal className="h-3 w-3 text-[#96B6DD]" strokeWidth={2} />
          </span>
          <p className="text-[13.5px] leading-relaxed text-secondary">
            <span className="text-primary">{item.action}</span> {item.target}
            <span className="ml-2 text-[12px] text-muted">{item.time}</span>
          </p>
        </li>
      ))}
    </ol>
  );
}
