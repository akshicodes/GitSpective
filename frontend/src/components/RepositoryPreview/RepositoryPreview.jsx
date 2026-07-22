import { Star, GitFork } from "lucide-react";

const LANGUAGE_COLORS = {
  Python: "#96B6DD",
  TypeScript: "#9D4EF4",
  JavaScript: "#EA4C89",
  default: "#C9CBD5",
};

const HEALTH_STYLES = {
  Excellent: "text-emerald-300 bg-emerald-400/10 border-emerald-400/25",
  "Very Good": "text-[#96B6DD] bg-[#96B6DD]/10 border-[#96B6DD]/25",
  Good: "text-amber-300 bg-amber-400/10 border-amber-400/25",
  Developing: "text-orange-300 bg-orange-400/10 border-orange-400/25",
  default: "text-secondary bg-white/5 border-white/15",
};

/**
 * Repository highlight card.
 *
 * @param {object} repo
 * @param {string} repo.name
 * @param {string} repo.description
 * @param {string} repo.language
 * @param {number} repo.stars
 * @param {number} repo.forks
 * @param {string} repo.health - Health status label (e.g. "Excellent", "Good").
 */
export default function RepositoryPreview({ repo }) {
  const dot = LANGUAGE_COLORS[repo.language] ?? LANGUAGE_COLORS.default;
  const healthClass = HEALTH_STYLES[repo.health] ?? HEALTH_STYLES.default;

  return (
    <div className="hover-lift flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.04] p-5">
      <div className="flex items-start justify-between gap-3">
        <h4 className="font-display text-[15px] font-semibold text-primary">
          {repo.name}
        </h4>
        <span
          className={`shrink-0 rounded-full border px-2.5 py-0.5 text-[11px] font-medium ${healthClass}`}
        >
          {repo.health}
        </span>
      </div>

      <p className="mt-2 flex-1 text-[13px] leading-relaxed text-secondary">
        {repo.description}
      </p>

      <div className="mt-4 flex items-center gap-4 border-t border-white/10 pt-3.5 text-[12.5px] text-muted">
        <span className="flex items-center gap-1.5">
          <span
            className="h-2.5 w-2.5 rounded-full"
            style={{ backgroundColor: dot }}
            aria-hidden="true"
          />
          {repo.language}
        </span>
        <span className="flex items-center gap-1">
          <Star className="h-3.5 w-3.5" strokeWidth={1.75} />
          {repo.stars}
        </span>
        <span className="flex items-center gap-1">
          <GitFork className="h-3.5 w-3.5" strokeWidth={1.75} />
          {repo.forks}
        </span>
      </div>
    </div>
  );
}
