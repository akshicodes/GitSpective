import { useLocation, useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Star,
  GitFork,
  Eye,
  Tag,
  FileText,
  Globe,
  GitBranch,
  CheckCircle2,
  AlertCircle,
  Calendar,
  BookOpen,
  Layers,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

import { useAnalytics } from "../context/AnalyticsContext";
import Navbar from "../components/Navbar/Navbar";
import SectionTitle from "../components/SectionTitle/SectionTitle";

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0 },
};

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
  "Getting Started": "text-secondary bg-white/5 border-white/15",
  default: "text-secondary bg-white/5 border-white/15",
};

const BREAKDOWN_LABELS = {
  documentation: "Documentation",
  maintenance: "Maintenance",
  community: "Community",
  quality: "Quality",
};

const BREAKDOWN_MAX = {
  documentation: 25,
  maintenance: 30,
  community: 20,
  quality: 25,
};

const BREAKDOWN_COLORS = {
  documentation: "#96B6DD",
  maintenance: "#9D4EF4",
  community: "#EA4C89",
  quality: "#6ee7b7",
};

function StatPill({ icon: Icon, value, label }) {
  return (
    <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5">
      <Icon className="h-4 w-4 shrink-0 text-[#96B6DD]" strokeWidth={1.75} />
      <span className="font-display text-[15px] font-semibold text-primary">
        {value}
      </span>
      <span className="text-[12px] text-muted">{label}</span>
    </div>
  );
}

function BreakdownBar({ label, score, max, color }) {
  const pct = max > 0 ? Math.min(100, Math.round((score / max) * 100)) : 0;
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between text-[13px]">
        <span className="text-secondary">{label}</span>
        <span className="font-medium text-primary">
          {score}
          <span className="text-muted">/{max}</span>
        </span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: color }}
          initial={{ width: 0 }}
          whileInView={{ width: `${pct}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
    </div>
  );
}

function TopicBadge({ topic }) {
  return (
    <span className="rounded-full border border-[#9D4EF4]/30 bg-[#9D4EF4]/10 px-3 py-1 text-[12px] font-medium text-[#9D4EF4]">
      {topic}
    </span>
  );
}

function QuickFact({ icon: Icon, label, value, isLink }) {
  if (!value) return null;
  return (
    <div className="flex items-start gap-2.5 text-[13.5px]">
      <Icon
        className="mt-0.5 h-4 w-4 shrink-0 text-muted"
        strokeWidth={1.75}
      />
      <div>
        <span className="text-muted">{label}: </span>
        {isLink ? (
          <a
            href={value.startsWith("http") ? value : `https://${value}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#96B6DD] underline-offset-2 hover:underline"
          >
            {value.replace(/^https?:\/\//, "")}
          </a>
        ) : (
          <span className="text-secondary">{value}</span>
        )}
      </div>
    </div>
  );
}
function GrowthTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl border border-white/15 bg-[#0f0b1a]/90 px-3 py-2 text-[13px] backdrop-blur-md">
      <p className="text-muted">{label}</p>
      <p className="mt-0.5 font-semibold text-primary">
        {payload[0].value} repo{payload[0].value !== 1 ? "s" : ""} created
      </p>
    </div>
  );
}

function ErrorState({ title, message, onBack }) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 text-center">
      <AlertCircle className="h-10 w-10 text-[#EA4C89]" strokeWidth={1.5} />
      <h2 className="font-display text-xl font-semibold text-primary">
        {title}
      </h2>
      <p className="max-w-xs text-sm text-muted">{message}</p>
      {onBack && (
        <button
          type="button"
          onClick={onBack}
          className="btn-analyze mt-2 flex items-center gap-2 rounded-xl px-5 py-2.5 font-display text-sm font-semibold text-white"
        >
          <ArrowLeft className="h-4 w-4" strokeWidth={2} />
          Go back
        </button>
      )}
    </div>
  );
}

export default function Repository() {
  const { username, repoName } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { analytics } = useAnalytics();
  const backToRepositories = location.state?.from === `/repositories/${username}`;
  const backPath = backToRepositories
    ? `/repositories/${username}`
    : `/dashboard/${username}`;
  const backLabel = backToRepositories ? "Back to repositories" : "Back to dashboard";
  if (!analytics) {
    return (
      <div className="min-h-screen bg-bg">
        <Navbar username={username ?? "—"} />
        <main className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
          <ErrorState
            title="No analytics data"
            message="Navigate from the Dashboard to view a repository's details, or search a username on the home page."
            onBack={() => navigate("/")}
          />
        </main>
      </div>
    );
  }
  const repoData = analytics.repositories?.find((r) => r.name === repoName);
  const healthData = analytics.repository_health?.find(
    (r) => r.repository === repoName
  );

  if (!repoData) {
    return (
      <div className="min-h-screen bg-bg">
        <Navbar username={username} />
        <main className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
          <ErrorState
            title="Repository not found"
            message={`"${repoName}" was not found in the analytics data for @${username}.`}
            onBack={() => navigate(backPath)}
          />
        </main>
      </div>
    );
  }
  const langColor = LANGUAGE_COLORS[repoData.language] ?? LANGUAGE_COLORS.default;
  const healthClass =
    HEALTH_STYLES[healthData?.health_status] ?? HEALTH_STYLES.default;

  const createdYear = repoData.created_at?.slice(0, 4) ?? "—";
  const updatedDate = repoData.updated_at
    ? new Date(repoData.updated_at).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "—";
  const growthData = analytics.repository_growth
    ? Object.entries(analytics.repository_growth).map(([year, count]) => ({
        year,
        repos: count,
      }))
    : [];

  const breakdown = healthData?.breakdown ?? {};
  const strengths = healthData?.strengths ?? [];
  const suggestions = healthData?.suggestions ?? [];

  return (
    <div className="min-h-screen bg-bg">
      <Navbar username={username} />

      <main className="mx-auto max-w-7xl px-5 py-8 sm:px-8 sm:py-10">


        <motion.button
          type="button"
          onClick={() => navigate(backPath)}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          transition={{ duration: 0.35 }}
          className="mb-7 flex items-center gap-2 text-sm text-muted transition-colors hover:text-secondary"
        >
          <ArrowLeft className="h-4 w-4" strokeWidth={2} />
          {backLabel}
        </motion.button>


        <motion.section
          variants={fadeUp}
          initial="hidden"
          animate="show"
          transition={{ duration: 0.5 }}
          className="glass rounded-3xl p-6 sm:p-8"
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="font-display text-2xl font-semibold tracking-tight text-primary sm:text-3xl">
                  {repoData.name}
                </h1>
                {healthData?.health_status && (
                  <span
                    className={`shrink-0 rounded-full border px-2.5 py-0.5 text-[11px] font-semibold ${healthClass}`}
                  >
                    {healthData.health_status}
                  </span>
                )}
              </div>
              <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-secondary">
                {repoData.description || "No description provided."}
              </p>


              <div className="mt-4 flex flex-wrap items-center gap-2">
                {repoData.language && (
                  <span className="flex items-center gap-1.5 text-[13px] text-secondary">
                    <span
                      className="h-2.5 w-2.5 rounded-full"
                      style={{ backgroundColor: langColor }}
                      aria-hidden="true"
                    />
                    {repoData.language}
                  </span>
                )}
                {repoData.topics?.map((topic) => (
                  <TopicBadge key={topic} topic={topic} />
                ))}
              </div>
            </div>


            {healthData && (
              <div className="shrink-0 text-center">
                <div className="relative inline-flex">
                  <svg
                    width="80"
                    height="80"
                    viewBox="0 0 80 80"
                    className="-rotate-90"
                  >
                    <circle
                      cx="40"
                      cy="40"
                      r="32"
                      fill="none"
                      stroke="rgba(255,255,255,0.08)"
                      strokeWidth="6"
                    />
                    <motion.circle
                      cx="40"
                      cy="40"
                      r="32"
                      fill="none"
                      stroke="url(#repoHealthGrad)"
                      strokeWidth="6"
                      strokeLinecap="round"
                      strokeDasharray={2 * Math.PI * 32}
                      initial={{ strokeDashoffset: 2 * Math.PI * 32 }}
                      animate={{
                        strokeDashoffset:
                          2 *
                          Math.PI *
                          32 *
                          (1 - Math.min(healthData.health_score, 100) / 100),
                      }}
                      transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
                    />
                    <defs>
                      <linearGradient
                        id="repoHealthGrad"
                        x1="0"
                        y1="0"
                        x2="1"
                        y2="1"
                      >
                        <stop offset="0%" stopColor="#EA4C89" />
                        <stop offset="55%" stopColor="#9D4EF4" />
                        <stop offset="100%" stopColor="#96B6DD" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="font-display text-lg font-semibold text-primary">
                      {healthData.health_score}
                    </span>
                    <span className="text-[10px] text-muted">/ 100</span>
                  </div>
                </div>
                <p className="mt-1.5 text-[12px] text-muted">Health Score</p>
              </div>
            )}
          </div>


          <div className="mt-6 flex flex-wrap gap-3">
            <StatPill icon={Star} value={repoData.stars} label="stars" />
            <StatPill icon={GitFork} value={repoData.forks} label="forks" />
            <StatPill icon={Eye} value={repoData.watchers ?? repoData.forks} label="watchers" />
            <StatPill icon={Calendar} value={createdYear} label="created" />
          </div>
        </motion.section>


        <div className="mt-7 grid grid-cols-1 gap-7 lg:grid-cols-12">

          <div className="flex flex-col gap-7 lg:col-span-8">


            {healthData && (
              <motion.section
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5 }}
                className="glass rounded-3xl p-6 sm:p-7"
              >
                <SectionTitle
                  title="Health Breakdown"
                  subtitle="Score across four key dimensions of repository quality."
                />
                <div className="space-y-5">
                  {Object.entries(BREAKDOWN_LABELS).map(([key, label]) => (
                    <BreakdownBar
                      key={key}
                      label={label}
                      score={breakdown[key] ?? 0}
                      max={BREAKDOWN_MAX[key]}
                      color={BREAKDOWN_COLORS[key]}
                    />
                  ))}
                </div>
              </motion.section>
            )}


            {(strengths.length > 0 || suggestions.length > 0) && (
              <motion.section
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5 }}
              >
                <SectionTitle
                  title="Strengths & Suggestions"
                  subtitle="What's working well and where to improve."
                />
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

                  {strengths.length > 0 && (
                    <div className="glass rounded-2xl p-5">
                      <p className="mb-3 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-emerald-400">
                        <CheckCircle2 className="h-3.5 w-3.5" strokeWidth={2.5} />
                        Strengths
                      </p>
                      <ul className="space-y-2.5">
                        {strengths.map((s, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-2 text-[13.5px] text-secondary"
                          >
                            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />
                            {s}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}


                  {suggestions.length > 0 && (
                    <div className="glass rounded-2xl p-5">
                      <p className="mb-3 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-[#EA4C89]">
                        <AlertCircle className="h-3.5 w-3.5" strokeWidth={2.5} />
                        Suggestions
                      </p>
                      <ul className="space-y-2.5">
                        {suggestions.map((s, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-2 text-[13.5px] text-secondary"
                          >
                            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#EA4C89]" />
                            {s}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </motion.section>
            )}


            {growthData.length > 0 && (
              <motion.section
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5 }}
                className="glass rounded-3xl p-6 sm:p-7"
              >
                <SectionTitle
                  title="Portfolio Growth"
                  subtitle={`Repositories created per year by @${username}. ${repoData.name} was created in ${createdYear}.`}
                />
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart
                    data={growthData}
                    margin={{ top: 4, right: 4, left: -20, bottom: 0 }}
                  >
                    <XAxis
                      dataKey="year"
                      tick={{ fill: "#8f92a1", fontSize: 12 }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis
                      tick={{ fill: "#8f92a1", fontSize: 12 }}
                      axisLine={false}
                      tickLine={false}
                      allowDecimals={false}
                    />
                    <Tooltip content={<GrowthTooltip />} cursor={{ fill: "rgba(255,255,255,0.04)" }} />
                    <Bar dataKey="repos" radius={[6, 6, 0, 0]}>
                      {growthData.map((entry) => (
                        <Cell
                          key={entry.year}
                          fill={
                            entry.year === createdYear
                              ? "#9D4EF4"
                              : "rgba(150,182,221,0.35)"
                          }
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
                <p className="mt-2 text-center text-[11px] text-muted">
                  <span
                    className="mr-1 inline-block h-2 w-2 rounded-sm align-middle"
                    style={{ background: "#9D4EF4" }}
                  />
                  {createdYear} — year {repoData.name} was created
                </p>
              </motion.section>
            )}
          </div>


          <div className="lg:col-span-4">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5 }}
              className="lg:sticky lg:top-24"
            >
              <div className="glass rounded-3xl p-6">
                <p className="mb-4 text-[11px] font-semibold uppercase tracking-wider text-[#96B6DD]">
                  Quick Facts
                </p>
                <div className="space-y-3.5">
                  <QuickFact
                    icon={Calendar}
                    label="Last updated"
                    value={updatedDate}
                  />
                  <QuickFact
                    icon={Globe}
                    label="Homepage"
                    value={repoData.homepage || null}
                    isLink
                  />
                  <QuickFact
                    icon={FileText}
                    label="License"
                    value={repoData.license || "No license"}
                  />
                  <QuickFact
                    icon={GitBranch}
                    label="Default branch"
                    value={repoData.default_branch || "main"}
                  />
                  <QuickFact
                    icon={BookOpen}
                    label="Issues"
                    value={repoData.has_issues ? "Enabled" : "Disabled"}
                  />
                  <QuickFact
                    icon={Layers}
                    label="Wiki"
                    value={repoData.has_wiki ? "Enabled" : "Disabled"}
                  />
                  <QuickFact
                    icon={Tag}
                    label="Archived"
                    value={repoData.archived ? "Yes" : "No"}
                  />
                </div>


                <a
                  href={`https://github.com/${username}/${repoData.name}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-analyze mt-6 flex w-full items-center justify-center gap-1.5 rounded-2xl py-2.5 font-display text-sm font-semibold text-white"
                >
                  View on GitHub
                  <ArrowLeft className="h-4 w-4 rotate-[135deg]" strokeWidth={2.25} />
                </a>
              </div>
            </motion.div>
          </div>
        </div>


        <footer className="mt-14 flex flex-col items-center gap-1 border-t border-white/10 pt-6 text-center text-[12.5px] text-muted sm:flex-row sm:justify-between">
          <span>GitSpective — GitHub, explained beautifully.</span>
        </footer>
      </main>
    </div>
  );
}
