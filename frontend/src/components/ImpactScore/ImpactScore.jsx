import { motion } from "framer-motion";

/**
 * Large circular impact score with level label and summary line.
 *
 * @param {object} data
 * @param {number} data.score
 * @param {number} [data.maxScore=100]
 * @param {string} data.level
 * @param {string} data.summary
 */
export default function ImpactScore({ data }) {
  const { score, maxScore = 100, level, summary } = data;

  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const progress = Math.max(0, Math.min(1, score / maxScore));
  const dashOffset = circumference * (1 - progress);

  return (
    <div className="glass hover-lift rounded-3xl p-6 sm:p-7">
      <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-center">
        {/* Ring */}
        <div className="relative shrink-0">
          <svg width="140" height="140" viewBox="0 0 140 140" className="-rotate-90">
            <circle
              cx="70"
              cy="70"
              r={radius}
              fill="none"
              stroke="rgba(255,255,255,0.08)"
              strokeWidth="10"
            />
            <defs>
              <linearGradient id="impactGradient" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#EA4C89" />
                <stop offset="55%" stopColor="#9D4EF4" />
                <stop offset="100%" stopColor="#96B6DD" />
              </linearGradient>
            </defs>
            <motion.circle
              cx="70"
              cy="70"
              r={radius}
              fill="none"
              stroke="url(#impactGradient)"
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              whileInView={{ strokeDashoffset: dashOffset }}
              viewport={{ once: true }}
              transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="font-display text-3xl font-semibold text-primary">
              {score}
            </span>
            <span className="text-[11px] text-muted">/ {maxScore}</span>
          </div>
        </div>

        {/* Copy */}
        <div className="text-center sm:text-left">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#96B6DD]">
            Impact score
          </p>
          <h3 className="mt-1 font-display text-xl font-semibold text-primary">
            {level}
          </h3>
          <p className="mt-2 max-w-sm text-[13.5px] leading-relaxed text-secondary">
            {summary}
          </p>
        </div>
      </div>
    </div>
  );
}
