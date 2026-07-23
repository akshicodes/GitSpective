import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Activity, Code2, FolderGit2, GitFork, Star, Users } from "lucide-react";

const HEATMAP_LEVELS = [
  "bg-white/[0.05]",
  "bg-[#96B6DD]/25",
  "bg-[#9D4EF4]/45",
  "bg-[#9D4EF4]/75",
  "bg-[#EA4C89]",
];

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0 },
};

const CONTRIBUTION_LEVEL_INDEX = {
  NONE: 0,
  FIRST_QUARTILE: 1,
  SECOND_QUARTILE: 2,
  THIRD_QUARTILE: 3,
  FOURTH_QUARTILE: 4,
};

export default function AnalyticsOverview({ analytics }) {
  const profile = analytics.profile;
  const statistics = analytics.repository_statistics;
  const activity = analytics.repository_activity;
  const impact = analytics.impact_score;
  const totalCommits = analytics.commit_statistics?.total_commits;
  const languages = Object.entries(analytics.language_analysis ?? {}).sort(([, a], [, b]) => b - a);
  const healthByRepository = new Map(
    (analytics.repository_health ?? []).map((item) => [item.repository, item]),
  );
  const topRepositories = [...(analytics.repositories ?? [])]
    .map((repository) => ({
      ...repository,
      health: healthByRepository.get(repository.name)?.health_score ?? 0,
    }))
    .sort((a, b) => b.health - a.health)
    .slice(0, 5);

  const averageHealth = analytics.repository_health?.length
    ? Math.round((analytics.repository_health ?? []).reduce((total, item) => total + item.health_score, 0) / analytics.repository_health.length)
    : 0;
  const repositories = analytics.repositories ?? [];
  const repositorySnapshot = [
    { label: "Average health", value: `${averageHealth}/100` },
    { label: "Documented", value: repositories.filter((repository) => repository.description).length },
    { label: "Archived", value: repositories.filter((repository) => repository.archived).length },
    { label: "Forked", value: repositories.filter((repository) => repository.fork).length },
  ];  const profileFields = [profile.bio, profile.location, profile.company, profile.blog, profile.name];
  const profileCompleteness = Math.round((profileFields.filter(Boolean).length / profileFields.length) * 100);
  const metrics = [
    { label: "Profile completeness", score: profileCompleteness, description: "Profile fields completed on GitHub." },
    { label: "Repository quality", score: averageHealth, description: "Average health score across public repositories." },
    { label: "Maintenance activity", score: activity.maintenance_consistency, description: activity.activity_level },
    { label: "Technology diversity", score: Math.min(languages.length * 20, 100), description: `${languages.length} detected languages` },
  ];
  const developerInsights = analytics.developer_insights ?? {};
  const quickInsights = [
    developerInsights.primary_insight,
    ...(developerInsights.secondary_insights ?? []),
  ].filter(Boolean).map((text) => ({ text, type: "strength" }));
  const improvementInsights = (developerInsights.improvements ?? [])
    .filter(Boolean)
    .map((text) => ({ text, type: "opportunity" }));
  const displayedInsights = [...quickInsights, ...improvementInsights].slice(0, 6);
  const stats = [
    { label: "Stars", value: statistics.total_stars, icon: Star },
    { label: "Public repositories", value: statistics.total_repositories, icon: FolderGit2 },
    { label: "Active repositories", value: activity.active_repositories, icon: Activity },
    { label: "Followers", value: profile.followers, icon: Users },
    { label: "Following", value: profile.following, icon: Users },
    { label: "Forks", value: statistics.total_forks, icon: GitFork },
  ];
  const contributionCalendars = analytics.contribution_calendar?.calendars ?? [];
  const availableYears = useMemo(
    () => [...contributionCalendars].sort((a, b) => Number(b.year) - Number(a.year)),
    [contributionCalendars],
  );
  const [selectedYear, setSelectedYear] = useState(null);

  useEffect(() => {
    if (!availableYears.length) {
      setSelectedYear(null);
      return;
    }

    setSelectedYear((currentYear) => (
      availableYears.some((calendar) => String(calendar.year) === String(currentYear))
        ? currentYear
        : availableYears[0].year
    ));
  }, [availableYears]);

  const selectedCalendar = availableYears.find(
    (calendar) => String(calendar.year) === String(selectedYear),
  ) ?? availableYears[0];
  return (
    <>
      <motion.header
        variants={fadeUp}
        initial="hidden"
        animate="show"
        transition={{ duration: 0.5 }}
        className="glass flex flex-col gap-5 rounded-3xl p-6 sm:flex-row sm:items-center sm:justify-between sm:p-7"
      >
        <div className="flex items-center gap-3">
          <img src={profile.avatar} alt="" className="h-11 w-11 rounded-2xl border border-white/15 object-cover" />
          <div>
            <h1 className="font-display text-lg font-semibold text-primary">{profile.name || profile.username}</h1>
            <p className="text-sm text-muted">@{profile.username}</p>
          </div>
        </div>
        <div className="btn-analyze flex items-center gap-2.5 rounded-full py-2 pl-2 pr-5 text-white">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/15 font-display text-[13px] font-bold">{impact.impact_score}</span>
          <div className="leading-tight">
            <p className="text-[10.5px] font-medium uppercase tracking-[0.12em] text-white/75">Overall score</p>
            <p className="font-display text-[13px] font-semibold">{impact.impact_score} / 100</p>
          </div>
        </div>
      </motion.header>

      <motion.section
        variants={fadeUp}
        initial="hidden"
        animate="show"
        transition={{ duration: 0.5, delay: 0.05 }}
        className="mt-7 flex flex-wrap gap-3"
      >
        {stats.map(({ label, value, icon: Icon }) => (
          <div key={label} className="glass hover-lift flex items-center gap-3 rounded-full px-4 py-2.5 sm:px-5">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-[#96B6DD]">
              <Icon className="h-4 w-4" strokeWidth={1.75} />
            </span>
            <div className="leading-tight">
              <p className="font-display text-[15px] font-semibold text-primary">{Number(value ?? 0).toLocaleString()}</p>
              <p className="text-[11.5px] text-muted">{label}</p>
            </div>
          </div>
        ))}
      </motion.section>

      <section className="mt-7 grid grid-cols-1 gap-5 lg:grid-cols-3">
        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.5 }}>
          <div className="glass hover-lift h-full rounded-3xl p-6">
            <h2 className="font-display text-base font-semibold text-primary">Analytics &amp; metrics</h2>
            <p className="mt-1 text-[13px] text-muted">How this profile scores across key quality signals.</p>
            <div className="mt-5 space-y-5">
              {metrics.map((metric) => (
                <div key={metric.label}>
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="text-[13.5px] font-medium text-secondary">{metric.label}</span>
                    <span className="font-display text-[13px] font-semibold text-primary">{metric.score}</span>
                  </div>
                  <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ background: "linear-gradient(90deg, #EA4C89 0%, #9D4EF4 60%, #96B6DD 100%)" }}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${metric.score}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                    />
                  </div>
                  <p className="mt-1.5 text-[12px] text-muted">{metric.description}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.5, delay: 0.05 }}>
          <div className="glass hover-lift h-full rounded-3xl p-6">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-[#EA4C89]"><Code2 className="h-4 w-4" /></span>
              <div>
                <p className="font-display text-xl font-semibold text-primary">{activity.active_repositories}</p>
                <p className="text-[12px] text-muted">Active repositories</p>
              </div>
              </div>
              <div className="text-right">
                <p className="font-display text-xl font-semibold text-primary">{analytics.commit_statistics?.available ? totalCommits.toLocaleString() : "—"}</p>
                <p className="text-[12px] text-muted">Total commits</p>
              </div>
            </div>
            <p className="mt-5 text-[11px] font-semibold uppercase tracking-[0.12em] text-muted">Top repositories by health</p>
            <div className="mt-3 space-y-3.5">
              {topRepositories.length ? topRepositories.map((repository) => (
                <div key={repository.name}>
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="truncate text-[13.5px] font-medium text-secondary">{repository.name}</span>
                    <span className="shrink-0 text-[12px] text-muted">{repository.health}/100</span>
                  </div>
                  <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-white/[0.06]"><div className="h-full rounded-full bg-[#96B6DD]" style={{ width: `${repository.health}%` }} /></div>
                </div>
              )) : <p className="text-sm text-muted">No repository data is available.</p>}
            </div>
            <div className="mt-5 border-t border-white/[0.08] pt-4">
              <p className="text-[10.5px] font-semibold uppercase tracking-[0.14em] text-muted">Portfolio snapshot</p>
              <div className="mt-3 grid grid-cols-4 gap-2">
                {repositorySnapshot.map((item) => (
                  <div key={item.label} className="rounded-lg border border-white/[0.07] bg-white/[0.03] px-2.5 py-2">
                    <p className="font-display text-[14px] font-semibold text-primary">{item.value}</p>
                    <p className="mt-0.5 text-[10px] text-muted">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.5, delay: 0.1 }}>
          <div className="glass hover-lift h-full rounded-3xl p-6">
            <h2 className="font-display text-base font-semibold text-primary">Quick insights</h2>
            <p className="mt-1 text-[13px] text-muted">A concise read on this developer's working style.</p>
            <div className="mt-5 rounded-2xl border border-[#9D4EF4]/25 bg-[#9D4EF4]/[0.07] p-4">
              <p className="text-[10.5px] font-semibold uppercase tracking-[0.14em] text-[#C3A4FF]">Developer style</p>
              <h3 className="mt-1.5 font-display text-lg font-semibold text-primary">{developerInsights.developer_type ?? "Building their profile"}</h3>
              <p className="mt-2 text-[12.5px] leading-relaxed text-secondary">{developerInsights.summary ?? "More activity will reveal a clearer development style."}</p>
            </div>
            <p className="mt-5 text-[10.5px] font-semibold uppercase tracking-[0.14em] text-muted">Key takeaways</p>
            <div className="mt-3 space-y-3">
              {displayedInsights.length ? displayedInsights.map((insight, index) => (
                <div key={`${insight.type}-${index}-${insight.text}`} className="flex items-start gap-2.5 text-[12.5px] leading-relaxed text-secondary">
                  <span className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${insight.type === "strength" ? "bg-[#EA4C89]" : "bg-[#F7B955]"}`} />
                  <div>
                    <span className={`mr-1 font-medium ${insight.type === "strength" ? "text-[#F3A0C1]" : "text-[#F7D28A]"}`}>{insight.type === "strength" ? "Strength:" : "Opportunity:"}</span>
                    {insight.text}
                  </div>
                </div>
              )) : <p className="text-sm text-muted">Insights will appear as more profile activity is available.</p>}
            </div>
          </div>
        </motion.div>
        <motion.div className="lg:col-span-3" variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.5, delay: 0.1 }}>
          <div className="glass hover-lift h-full rounded-3xl p-6">
            <h2 className="font-display text-xl font-bold text-primary">Contribution graph</h2>
            <p className="mt-1 text-[13px] text-muted">Explore GitHub activity for a selected year.</p>
            {contributionCalendars.length ? (
              <>
                {selectedCalendar && (
                  <div className="mt-5">
                    <p className="font-display text-2xl font-semibold text-primary">{selectedCalendar.totalContributions.toLocaleString()}</p>
                    <p className="mt-0.5 text-[12px] text-muted">contributions in {selectedCalendar.year}</p>
                  </div>
                )}
                {selectedCalendar && (
                  <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-[minmax(0,3fr)_auto] sm:items-start">
                    <div className="overflow-x-auto pb-1" role="tabpanel" aria-label={`${selectedCalendar.year} contribution graph`}>
                      <div className="flex min-w-max gap-[4px]">
                        {selectedCalendar.weeks.map((week, weekIndex) => (
                          <div key={weekIndex} className="flex flex-col gap-[4px]">
                            {week.contributionDays.map((day) => (
                              <span key={day.date} title={`${day.date}: ${day.contributionCount} contributions`} className={`h-[15px] w-[15px] rounded-[4px] ${HEATMAP_LEVELS[CONTRIBUTION_LEVEL_INDEX[day.contributionLevel] ?? 0]}`} />
                            ))}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="flex max-w-full gap-2 overflow-x-auto pb-1 sm:flex-col sm:items-end sm:overflow-visible" role="tablist" aria-label="Contribution year">
                      {availableYears.map((calendar) => {
                        const isSelected = String(calendar.year) === String(selectedCalendar.year);
                        return (
                          <button
                            key={calendar.year}
                            type="button"
                            role="tab"
                            aria-selected={isSelected}
                            onClick={() => setSelectedYear(calendar.year)}
                            className={`shrink-0 rounded-lg border px-3 py-1.5 text-xs font-semibold transition ${isSelected
                              ? "border-[#EA4C89]/60 bg-[#EA4C89] text-white shadow-[0_0_18px_rgba(234,76,137,0.2)]"
                              : "border-white/10 bg-white/[0.04] text-secondary hover:border-white/20 hover:bg-white/[0.08] hover:text-primary"}`}
                          >
                            {calendar.year}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </>
            ) : <p className="mt-6 text-sm text-muted">{analytics.contribution_calendar?.reason ?? "Contribution history is unavailable."}</p>}
            <div className="mt-4 flex items-center justify-end gap-1.5 text-[11px] text-muted">
              <span>Less</span>{HEATMAP_LEVELS.map((style) => <span key={style} className={`h-[11px] w-[11px] rounded-[3px] ${style}`} />)}<span>More</span>
            </div>
          </div>
        </motion.div>
      </section>
    </>
  );
}
