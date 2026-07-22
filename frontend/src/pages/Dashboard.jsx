import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

/**
 * Placeholder only. Per the project brief, the dashboard/analytics
 * experience is a separate build — this route exists so the landing
 * page's navigation has somewhere real to land, wired to the recommended
 * backend endpoint (`GET /analytics/{username}`) once that page is built.
 */
export default function Dashboard() {
  const { username } = useParams();

  return (
    <main className="flex min-h-screen w-full items-center justify-center bg-bg px-6">
      <div className="glass max-w-md rounded-3xl px-8 py-10 text-center">
        <p className="font-display text-lg font-semibold text-white">
          Dashboard for <span className="text-gradient">@{username}</span>
        </p>
        <p className="mt-2 text-sm text-secondary">
          Not built yet — this is where GitSpective's analytics will render.
        </p>
        <Link
          to="/"
          className="mt-6 inline-flex items-center gap-1.5 text-sm text-secondary transition-colors hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to search
        </Link>
      </div>
    </main>
  );
}
