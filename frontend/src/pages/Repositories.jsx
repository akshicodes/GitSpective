import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, FolderGit2, Search, X } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import Navbar from "../components/Navbar/Navbar";
import RepositoryPreview from "../components/RepositoryPreview/RepositoryPreview";
import ActivitySummary from "../components/dashboard/ActivitySummary";
import SectionTitle from "../components/SectionTitle/SectionTitle";
import { useAnalytics } from "../context/AnalyticsContext";
import { getAnalytics } from "../services/githubAPI";

export default function Repositories() {
  const { username } = useParams();
  const navigate = useNavigate();
  const { analytics, setAnalytics } = useAnalytics();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (analytics?.profile?.username?.toLowerCase() === username?.toLowerCase()) {
      setLoading(false);
      return;
    }
    let active = true;
    getAnalytics(username)
      .then((data) => active && setAnalytics(data))
      .catch((err) => active && setError(err.message || "Unable to load repositories."))
      .finally(() => active && setLoading(false));
    return () => { active = false; };
  }, [analytics?.profile?.username, setAnalytics, username]);

  const repositories = useMemo(() => {
    const health = new Map(analytics?.repository_health?.map((item) => [item.repository, item]));
    const term = query.trim().toLowerCase();
    return (analytics?.repositories ?? []).map((repo) => ({
      ...repo,
      description: repo.description || "No description available.",
      language: repo.language || "Unknown",
      health: health.get(repo.name)?.health_status || "Unknown",
    })).filter((repo) => !term || repo.name.toLowerCase().includes(term) || repo.description.toLowerCase().includes(term));
  }, [analytics, query]);

  const topRepositories = useMemo(() => {
    const repositoryNames = new Map(
      analytics?.repositories?.map((repo) => [repo.name, repo.name]),
    );

    return (analytics?.repository_health ?? [])
      .filter((health) => repositoryNames.has(health.repository))
      .slice()
      .sort((a, b) => b.health_score - a.health_score)
      .slice(0, 6)
      .map((health) => ({
        name: health.repository,
        score: health.health_score,
      }));
  }, [analytics]);

  if (loading) return <div className="min-h-screen bg-bg" />;

  if (error || !analytics) {
    return (
      <div className="min-h-screen bg-bg">
        <Navbar username={username} />
        <main className="mx-auto max-w-7xl px-5 py-16 text-center sm:px-8">
          <p className="text-[#EA4C89]">{error || "No repository data is available."}</p>
          <button type="button" onClick={() => navigate("/")} className="btn-analyze mt-5 rounded-xl px-5 py-2.5 text-sm font-semibold text-white">
            Search another profile
          </button>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg">
      <Navbar username={analytics.profile.username} />
      <main className="mx-auto max-w-7xl px-5 py-8 sm:px-8 sm:py-10">
        <div className="grid gap-6 lg:grid-cols-[1fr_28rem] lg:items-end">
          <div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => navigate(`/dashboard/${analytics.profile.username}`)}
                className="glass rounded-xl p-2 text-[#96B6DD] transition hover:bg-white/10 hover:text-white"
                aria-label="Back to dashboard"
                title="Back to dashboard"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
              <p className="flex items-center gap-2 text-sm text-[#96B6DD]">
                <FolderGit2 className="h-4 w-4" /> Portfolio
              </p>
            </div>
            <h1 className="mt-2 font-display text-3xl font-semibold text-primary">All repositories</h1>
            <p className="mt-2 text-sm text-secondary">
              {repositories.length} of {analytics.repositories.length} public repositories for @{analytics.profile.username}
            </p>
          </div>


        </div>

        <section className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="glass rounded-3xl p-6 sm:p-7 lg:col-span-1 lg:min-h-[calc(100vh-11rem)]">
            <SectionTitle
              title="Repository Activity"
              subtitle="Overall maintenance and activity summary."
            />
            <ActivitySummary activity={analytics.repository_activity} />
          </div>

          <div className="glass rounded-3xl p-6 sm:p-7 lg:col-span-2">
            <SectionTitle
              title="Top repositories"
              subtitle="Highest repository health scores across this portfolio."
            />
            {topRepositories.length ? (
              <ResponsiveContainer width="100%" height={360}>
                <BarChart data={topRepositories} margin={{ top: 10, right: 12, left: -20, bottom: 52 }}>
                  <CartesianGrid vertical={false} stroke="rgba(255,255,255,0.08)" />
                  <XAxis
                    dataKey="name"
                    interval={0}
                    angle={-28}
                    textAnchor="end"
                    tick={{ fill: "#8f92a1", fontSize: 12 }}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    domain={[0, 100]}
                    tick={{ fill: "#8f92a1", fontSize: 12 }}
                    tickLine={false}
                    axisLine={false}
                    label={{ value: "Repo score", angle: -90, position: "insideLeft", fill: "#8f92a1", fontSize: 12 }}
                  />
                  <Tooltip
                    cursor={{ fill: "rgba(255,255,255,0.04)" }}
                    contentStyle={{ background: "#1d1828", border: "1px solid rgba(255,255,255,0.15)", borderRadius: "12px" }}
                    labelStyle={{ color: "#c9cbd5" }}
                    formatter={(value) => [`${value}/100`, "Health score"]}
                  />
                  <Bar dataKey="score" fill="#9D4EF4" radius={[7, 7, 0, 0]} maxBarSize={52} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <p className="flex h-[360px] items-center justify-center text-sm text-muted">No repository health scores are available yet.</p>
            )}
          </div>
        </section>

        {repositories.length ? (
          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {repositories.map((repo) => (
              <RepositoryPreview key={repo.id ?? repo.name} repo={repo} username={analytics.profile.username} />
            ))}
          </div>
        ) : (
          <p className="mt-12 text-center text-secondary">No repositories match your search.</p>
        )}
      </main>
    </div>
  );
}
