import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Navbar from "../components/Navbar/Navbar";
import AnalyticsOverview from "../components/AnalyticsOverview/AnalyticsOverview";
import { useAnalytics } from "../context/AnalyticsContext";
import { getAnalytics } from "../services/githubAPI";

export default function Analytics() {
  const { username } = useParams();
  const navigate = useNavigate();
  const { analytics, setAnalytics } = useAnalytics();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (analytics?.profile?.username?.toLowerCase() === username?.toLowerCase()) {
      setLoading(false);
      return;
    }
    let active = true;
    getAnalytics(username)
      .then((data) => active && setAnalytics(data))
      .catch((requestError) => active && setError(requestError.message || "Unable to load analytics."))
      .finally(() => active && setLoading(false));
    return () => { active = false; };
  }, [analytics?.profile?.username, setAnalytics, username]);

  if (loading) return <div className="min-h-screen bg-bg" />;

  if (error || !analytics) {
    return <div className="min-h-screen bg-bg"><Navbar username={username} /><main className="mx-auto max-w-7xl px-5 py-16 text-center text-[#EA4C89] sm:px-8">{error || "No analytics data is available."}</main></div>;
  }

  return (
    <div className="min-h-screen bg-bg">
      <Navbar username={analytics.profile.username} />
      <main className="mx-auto max-w-7xl px-5 py-8 sm:px-8 sm:py-10">
        <button
          type="button"
          onClick={() => navigate(`/dashboard/${analytics.profile.username}`)}
          className="mb-5 inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm font-medium text-secondary transition hover:border-white/20 hover:bg-white/10 hover:text-white"
          aria-label="Back to dashboard"
          title="Back to dashboard"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to dashboard
        </button>
        <AnalyticsOverview analytics={analytics} />
        <footer className="mt-14 border-t border-white/10 pt-6 text-center text-[12.5px] text-muted">GitSpective — GitHub, explained beautifully.</footer>
      </main>
    </div>
  );
}
