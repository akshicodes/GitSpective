import { useAnalytics } from "../context/AnalyticsContext";
import { getAnalytics } from "../services/githubAPI";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, ArrowRight, Sparkles } from "lucide-react";
import CommitGraphField from "../components/CommitGraphField";
import GitHubMark from "../components/GitHubMark";

const FEATURES = [
  "Repository Health",
  "Impact Score",
  "Growth Analytics",
];

export default function Landing() {
  const [username, setUsername] = useState("");
const [error, setError] = useState("");
const navigate = useNavigate();

const { setAnalytics } = useAnalytics();

  async function handleAnalyze(e) {
    e.preventDefault();
    const trimmed = username.trim();

    if (!trimmed) {
      setError("Enter a GitHub username to continue.");
      return;
    }

    setError("");

  try {
  const response = await getAnalytics(trimmed);

  console.log("Analytics Response:", response);
  setAnalytics(response);
  navigate(`/dashboard/${encodeURIComponent(trimmed)}`);
  console.log("Saved Analytics:", response);
  
  } catch (err) {
  console.error(err);
  setError("Unable to fetch GitHub profile.");
  }
  }

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-bg">
      {/* Ambient background: color blobs + commit-graph texture */}
      <div className="absolute inset-0">
        <div
          className="blob blob-animate -left-32 -top-32 h-[420px] w-[420px]"
          style={{ background: "#9D4EF4" }}
        />
        <div
          className="blob blob-animate-slow -right-24 top-10 h-[380px] w-[380px]"
          style={{ background: "#EA4C89" }}
        />
        <div
          className="blob blob-animate bottom-[-10rem] left-1/3 h-[460px] w-[460px]"
          style={{ background: "#96B6DD" }}
        />
        <CommitGraphField />
        {/* Vignette so the card stays readable over the blobs */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(15,11,26,0.2) 0%, rgba(15,11,26,0.75) 70%, rgba(15,11,26,0.95) 100%)",
          }}
        />
      </div>

      {/* Centered content */}
      <div className="relative z-10 flex min-h-screen w-full items-center justify-center px-5 py-16 sm:px-8">
        <motion.section
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="glass w-full max-w-xl rounded-[28px] px-7 py-10 shadow-[0_20px_70px_-20px_rgba(0,0,0,0.6)] sm:rounded-[32px] sm:px-12 sm:py-14"
        >
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/15 bg-white/5"
          >
            <GitHubMark className="h-7 w-7 text-white" />
          </motion.div>

          {/* Project name + tagline */}
          <div className="text-center">
            <h1
              className="font-display text-2xl font-semibold tracking-tight text-white sm:text-[1.75rem]"
            >
              GitSpective
            </h1>
            <p className="mt-1.5 flex items-center justify-center gap-1.5 text-[13px] font-medium uppercase tracking-[0.14em] text-secondary/80">
              <Sparkles className="h-3.5 w-3.5 text-[#96B6DD]" strokeWidth={2} />
              GitHub Profile Analytics
            </p>
          </div>

          {/* Hero heading + subtitle */}
          <div className="mx-auto mt-9 max-w-md text-center sm:mt-11">
            <h2 className="font-display text-[2.1rem] font-semibold leading-[1.12] tracking-tight text-white sm:text-[2.6rem]">
              A new <span className="text-gradient">perspective</span> on GitHub
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-secondary sm:text-base">
              Your GitHub, explained beautifully.
            </p>
          </div>

          {/* Search */}
          <form onSubmit={handleAnalyze} className="mx-auto mt-9 max-w-md sm:mt-10" noValidate>
            <div className="glass-input flex flex-col gap-2 rounded-2xl p-2 sm:flex-row sm:items-center sm:gap-0">
              <div className="flex flex-1 items-center gap-2.5 px-3 py-2.5 sm:py-2">
                <Search className="h-4.5 w-4.5 shrink-0 text-secondary/70" strokeWidth={2} />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                    if (error) setError("");
                  }}
                  placeholder="Enter GitHub username..."
                  aria-label="GitHub username"
                  aria-invalid={Boolean(error)}
                  className="w-full bg-transparent font-body text-[15px] text-white placeholder:text-secondary/50 focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="btn-analyze flex shrink-0 items-center justify-center gap-1.5 rounded-xl px-5 py-2.5 font-display text-[14px] font-semibold text-white sm:py-2.5"
              >
                Analyze
                <ArrowRight className="h-4 w-4" strokeWidth={2.25} />
              </button>
            </div>

            <div className="mt-2 min-h-[1.25rem] px-1 text-left">
              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-[13px] text-[#EA4C89]"
                  role="alert"
                >
                  {error}
                </motion.p>
              )}
            </div>
          </form>

          {/* Feature strip */}
          <div className="mx-auto mt-2 flex max-w-md flex-wrap items-center justify-center gap-x-5 gap-y-2 sm:mt-3">
            {FEATURES.map((feature, i) => (
              <span
                key={feature}
                className="flex items-center gap-2 text-[12.5px] text-secondary/70"
              >
                {i > 0 && <span className="hidden h-1 w-1 rounded-full bg-white/20 sm:block" />}
                {feature}
              </span>
            ))}
          </div>
        </motion.section>
      </div>
    </main>
  );
}
