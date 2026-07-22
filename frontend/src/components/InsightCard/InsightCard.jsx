import { CheckCircle2 } from "lucide-react";

/**
 * Single developer insight, rendered inside the insights grid.
 *
 * @param {object} insight
 * @param {string} insight.text
 */
export default function InsightCard({ insight }) {
  return (
    <div className="hover-lift flex items-start gap-2.5 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#9D4EF4]" strokeWidth={2} />
      <span className="text-[13.5px] leading-snug text-secondary">{insight.text}</span>
    </div>
  );
}
