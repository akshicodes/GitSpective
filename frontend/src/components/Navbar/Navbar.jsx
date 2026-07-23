import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { LayoutDashboard, FolderGit2, BarChart3, Menu, X } from "lucide-react";
import GitHubMark from "../GitHubMark";

const NAV_ITEMS = [
  { label: "Dashboard", icon: LayoutDashboard, path: "dashboard" },
  { label: "Repositories", icon: FolderGit2, path: "repositories" },
  { label: "Analytics", icon: BarChart3, path: "analytics" },
];

export default function Navbar({ username }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const navigateTo = (path) => {
    if (path && username) {
      navigate(`/${path}/${encodeURIComponent(username)}`);
      setOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-bg/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 sm:px-8">

        <div className="flex min-w-0 items-center gap-3 sm:gap-5">
          <a href="/" className="flex shrink-0 items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/15 bg-white/5">
              <GitHubMark className="h-4 w-4 text-primary" />
            </span>
            <span className="font-display text-[15px] font-semibold tracking-tight text-primary">
              GitSpective
            </span>
          </a>

          <span className="hidden h-5 w-px bg-white/10 sm:block" aria-hidden="true" />

          <div className="hidden min-w-0 items-center gap-2 text-sm text-muted sm:flex">
            <span>Viewing profile</span>
            <span className="truncate rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 font-medium text-secondary">
              @{username}
            </span>
          </div>
        </div>


        <nav className="hidden items-center gap-1 rounded-full border border-white/10 bg-white/5 p-1 md:flex">
          {NAV_ITEMS.map(({ label, icon: Icon, path }) => {
            const active = pathname.startsWith(`/${path}/`);
            return (
            <button
              key={label}
              type="button"
              aria-current={active ? "page" : undefined}
              onClick={() => {
                navigateTo(path);
              }}
              className={`flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors ${
                active
                  ? "bg-white/10 text-primary"
                  : "text-muted hover:text-secondary"
              }`}
            >
              <Icon className="h-3.5 w-3.5" strokeWidth={2} />
              {label}
            </button>
            );
          })}
        </nav>


        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-secondary md:hidden"
          aria-expanded={open}
          aria-label="Toggle navigation menu"
        >
          {open ? <X className="h-4.5 w-4.5" /> : <Menu className="h-4.5 w-4.5" />}
        </button>
      </div>


      {open && (
        <div className="border-t border-white/10 px-5 pb-4 pt-2 md:hidden">
          <p className="mb-3 text-sm text-muted">
            Viewing{" "}
            <span className="font-medium text-secondary">@{username}</span>
          </p>
          <nav className="flex flex-col gap-1">
            {NAV_ITEMS.map(({ label, icon: Icon, path }) => {
              const active = pathname.startsWith(`/${path}/`);
              return (
              <button
                key={label}
                type="button"
                aria-current={active ? "page" : undefined}
                onClick={() => {
                  navigateTo(path);
                }}
                className={`flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-left text-sm font-medium transition-colors ${
                  active
                    ? "bg-white/10 text-primary"
                    : "text-muted hover:text-secondary"
                }`}
              >
                <Icon className="h-4 w-4" strokeWidth={2} />
                {label}
              </button>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}
