import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { ArrowLeft, CalendarDays, Code2, GitCommitHorizontal, Trophy } from "lucide-react";
import { useAnalytics } from "../context/AnalyticsContext";

import Navbar from "../components/Navbar/Navbar";
import ProfileCard from "../components/ProfileCard/ProfileCard";
import StatsCard from "../components/StatsCard/StatsCard";
import ImpactScore from "../components/ImpactScore/ImpactScore";
import InsightCard from "../components/InsightCard/InsightCard";
import SectionTitle from "../components/SectionTitle/SectionTitle";



const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0 },
};

const LANGUAGE_COLORS = ["#EA4C89", "#9D4EF4", "#96B6DD", "#46D9B7", "#F7B955", "#F17C5C"];

function getMostUpdatedMonth(repositories) {
  const months = new Map();
  repositories.forEach((repository) => {
    const date = new Date(repository.updated_at);
    if (Number.isNaN(date.getTime())) return;
    const month = date.toLocaleString("en-US", { month: "long" });
    months.set(month, (months.get(month) ?? 0) + 1);
  });
  return [...months.entries()].sort((a, b) => b[1] - a[1])[0]?.[0] ?? "No activity";
}

/**
 * Dashboard page — UI only, static placeholder data.
 *
 * The `username` route param is read purely for display (Navbar label +
 * ProfileCard identity) so the page reflects whoever was just searched for
 * on the landing page. Every other value here is placeholder data from
 * `src/data/placeholderData.js`; when the backend is wired in later, that
 * import gets swapped for the response of `GET /analytics/{username}` and
 * the component props stay the same shape.
 */



export default function Dashboard() {
  const navigate = useNavigate();
  const { analytics } = useAnalytics();

  if (!analytics) {
  return (
    <div className="min-h-screen flex items-center justify-center text-white">
      Loading analytics...
    </div>
  );
  }
  const profile = {
  name: analytics.profile.name,
  username: analytics.profile.username,   
  avatar: analytics.profile.avatar,       
  bio: analytics.profile.bio,
  followers: analytics.profile.followers,
  following: analytics.profile.following,
  publicRepos: analytics.profile.public_repos,
  location: analytics.profile.location,
  company: analytics.profile.company,
  website: analytics.profile.blog,
};
  console.log(analytics.profile);

  const stats = [
  {
    key: "repositories",
    label: "Repositories",
    value: analytics.repository_statistics.total_repositories,
  },
  {
    key: "followers",
    label: "Followers",
    value: analytics.profile.followers,
  },
  {
    key: "following",
    label: "Following",
    value: analytics.profile.following,
  },
  {
    key: "stars",
    label: "Stars",
    value: analytics.repository_statistics.total_stars,
  },
];

const insights = [
  {
    id: 1,
    text: analytics.developer_insights.primary_insight,
  },

  ...analytics.developer_insights.secondary_insights.map((item, index) => ({
    id: index + 2,
    text: item,
  })),

  ...analytics.developer_insights.improvements.map((item, index) => ({
    id:
      analytics.developer_insights.secondary_insights.length +
      index +
      2,
    text: item,
  })),
];

console.log("Repository Health:", analytics.repository_health);

const impactData = {
  score: analytics.impact_score.impact_score,
  maxScore: 100,
  level: analytics.impact_score.impact_level,
  summary: analytics.impact_score.summary,
};

const languageChartData = Object.entries(analytics.language_analysis ?? {})
  .map(([name, value]) => ({ name, value }))
  .sort((a, b) => b.value - a.value);
const githubMetrics = [
  {
    label: "Total commits",
    value: analytics.commit_statistics?.available ? analytics.commit_statistics.total_commits.toLocaleString() : "—",
    description: analytics.commit_statistics?.available ? "Public commits authored on GitHub" : "Unavailable from GitHub right now",
    icon: GitCommitHorizontal,
  },
  { label: "Most active month", value: getMostUpdatedMonth(analytics.repositories ?? []), description: "Based on repository update activity", icon: CalendarDays },
  { label: "Top language", value: languageChartData[0]?.name ?? "No language data", description: languageChartData[0] ? `${languageChartData[0].value} repositories` : "No language data found", icon: Code2 },
  { label: "Top repository", value: analytics.repository_statistics.most_starred_repo ?? "No repositories", description: "Most starred public repository", icon: Trophy },
];


  return (
    <div className="min-h-screen bg-bg">
      <Navbar username={profile.username} />

      <main className="mx-auto max-w-7xl px-5 py-8 sm:px-8 sm:py-10">
        <button
          type="button"
          onClick={() => navigate("/")}
          className="mb-6 inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm font-medium text-secondary transition hover:bg-white/10 hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to home
        </button>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-7">
          {/* Left column — profile */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            transition={{ duration: 0.5 }}
            className="lg:col-span-4"
          >
            <div className="lg:sticky lg:top-24">
              <ProfileCard profile={profile} />
            </div>
          </motion.div>

          {/* Right column — everything else */}
          <div className="flex flex-col gap-7 lg:col-span-8">
            {/* Quick stats */}
            <motion.section
              variants={fadeUp}
              initial="hidden"
              animate="show"
              transition={{ duration: 0.5, delay: 0.05 }}
            >
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                {stats.map((stat) => (
  <StatsCard key={stat.key} stat={stat} />
))}
              </div>
            </motion.section>

            {/* Impact score */}
            <motion.section
              variants={fadeUp}
              initial="hidden"
              animate="show"
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <ImpactScore data={impactData} />
            </motion.section>

            {/* Developer insights */}
            <motion.section
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5 }}
            >
              <SectionTitle
                title="Developer insights"
                subtitle="What the data says about how this developer works."
              />
              <div className="space-y-6">

  {/* Developer Type */}
  <div className="glass rounded-2xl p-5">
    <p className="text-xs uppercase tracking-wider text-[#96B6DD]">
      Developer Type
    </p>

    <h3 className="mt-2 font-display text-xl font-semibold text-primary">
      {analytics.developer_insights.developer_type}
    </h3>

    <p className="mt-3 text-sm leading-relaxed text-secondary">
      {analytics.developer_insights.summary}
    </p>
  </div>

  {/* Insights */}
  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
    {insights.map((insight) => (
      <InsightCard key={insight.id} insight={insight} />
    ))}
  </div>

</div>
            </motion.section>

          </div>
        </div>

        <motion.section
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="mt-10"
        >
          <SectionTitle title="GitHub analytics" subtitle="Languages, activity, and portfolio highlights." />
          <div className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
            <div className="glass rounded-3xl p-6 sm:p-7">
              <div className="flex items-center justify-between">
                <div><p className="text-sm font-semibold text-primary">Top languages</p><p className="mt-1 text-[13px] text-muted">Distribution across public repositories</p></div>
                <span className="rounded-lg bg-white/5 px-2.5 py-1 text-xs text-[#96B6DD]">{languageChartData.length} {languageChartData.length === 1 ? "language" : "languages"}</span>
              </div>
              {languageChartData.length ? (
                <div className="mt-4 flex flex-col items-center gap-4 sm:flex-row sm:justify-around">
                  <div className="h-56 w-full max-w-[260px]"><ResponsiveContainer width="100%" height="100%"><PieChart><Pie data={languageChartData} dataKey="value" nameKey="name" innerRadius={58} outerRadius={84} paddingAngle={4} stroke="none">{languageChartData.map((entry, index) => <Cell key={entry.name} fill={LANGUAGE_COLORS[index % LANGUAGE_COLORS.length]} />)}</Pie><Tooltip formatter={(value, _name, item) => [`${value} repositories`, item.payload.name]} contentStyle={{ background: "#1d1828", border: "1px solid rgba(255,255,255,0.15)", borderRadius: "12px" }} /></PieChart></ResponsiveContainer></div>
                  <div className="w-full space-y-3 sm:max-w-[190px]">{languageChartData.map((language, index) => <div key={language.name} className="flex items-center justify-between gap-3 text-sm"><span className="flex min-w-0 items-center gap-2 text-secondary"><span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ backgroundColor: LANGUAGE_COLORS[index % LANGUAGE_COLORS.length] }} /><span className="truncate">{language.name}</span></span><span className="font-medium text-primary">{language.value}</span></div>)}</div>
                </div>
              ) : <p className="flex h-56 items-center justify-center text-sm text-muted">No language data is available yet.</p>}
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {githubMetrics.map((metric) => {
                const Icon = metric.icon;
                return <div key={metric.label} className="glass hover-lift flex min-h-40 flex-col justify-between rounded-2xl p-5"><span className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-[#96B6DD]"><Icon className="h-[18px] w-[18px]" strokeWidth={1.75} /></span><div className="mt-5"><p className="truncate font-display text-xl font-semibold text-primary" title={metric.value}>{metric.value}</p><p className="mt-1 text-[13px] text-secondary">{metric.label}</p><p className="mt-1 text-xs text-muted">{metric.description}</p></div></div>;
              })}
            </div>
          </div>
        </motion.section>

        {/* Footer */}
        <footer className="mt-14 flex flex-col items-center gap-1 border-t border-white/10 pt-6 text-center text-[12.5px] text-muted sm:flex-row sm:justify-between">
          <span>GitSpective — GitHub, explained beautifully.</span>
          
        </footer>
      </main>
    </div>
  );
}
