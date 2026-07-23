import { FolderGit2, Users, UserPlus, Star } from "lucide-react";

const ICONS = {
  repositories: FolderGit2,
  followers: Users,
  following: UserPlus,
  stars: Star,
};

export default function StatsCard({ stat }) {
  const Icon = ICONS[stat.key] ?? FolderGit2;

  return (
    <div className="glass hover-lift rounded-2xl p-5">
      <div className="flex items-center justify-between">
        <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-[#96B6DD]">
          <Icon className="h-4.5 w-4.5" strokeWidth={1.75} />
        </span>
      </div>
      <p className="mt-4 font-display text-2xl font-semibold tracking-tight text-primary">
        {stat.value.toLocaleString()}
      </p>
      <p className="mt-0.5 text-[13px] text-muted">{stat.label}</p>
    </div>
  );
}
