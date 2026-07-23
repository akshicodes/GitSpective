import { useState } from "react";
import { MapPin, Building2, Link2, ArrowUpRight } from "lucide-react";

export default function ProfileCard({ profile }) {
  const { name, username, avatar, bio, followers, following, publicRepos, location, company, website } =
    profile;
  const [avatarFailed, setAvatarFailed] = useState(false);
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div className="glass hover-lift rounded-3xl p-6 sm:p-7">
      <div className="flex flex-col items-center text-center">
        {avatarFailed ? (
          <div
            className="flex h-20 w-20 items-center justify-center rounded-full border border-white/15 bg-white/5 font-display text-lg font-semibold text-secondary"
            aria-label={`${name}'s avatar`}
          >
            {initials}
          </div>
        ) : (
          <img
            src={avatar}
            alt={`${name}'s GitHub avatar`}
            className="h-20 w-20 rounded-full border border-white/15 object-cover"
            loading="lazy"
            onError={() => setAvatarFailed(true)}
          />
        )}
        <h3 className="mt-4 font-display text-lg font-semibold text-primary">
          {name}
        </h3>
        <p className="text-sm text-muted">@{username}</p>
        {bio && (
          <p className="mt-3 text-[13.5px] leading-relaxed text-secondary">
            {bio}
          </p>
        )}
      </div>


      <div className="mt-6 grid grid-cols-3 divide-x divide-white/10 rounded-2xl border border-white/10 bg-white/[0.03] py-3.5">
        <MiniStat value={followers} label="Followers" />
        <MiniStat value={following} label="Following" />
        <MiniStat value={publicRepos} label="Repos" />
      </div>


      {(location || company || website) && (
        <div className="mt-5 space-y-2.5 border-t border-white/10 pt-5 text-[13.5px] text-secondary">
          {location && (
            <div className="flex items-center gap-2.5">
              <MapPin className="h-4 w-4 shrink-0 text-muted" strokeWidth={1.75} />
              <span>{location}</span>
            </div>
          )}
          {company && (
            <div className="flex items-center gap-2.5">
              <Building2 className="h-4 w-4 shrink-0 text-muted" strokeWidth={1.75} />
              <span>{company}</span>
            </div>
          )}
          {website && (
            <div className="flex items-center gap-2.5">
              <Link2 className="h-4 w-4 shrink-0 text-muted" strokeWidth={1.75} />
              <span className="truncate">{website.replace(/^https?:\/\//, "")}</span>
            </div>
          )}
        </div>
      )}

      <a
        href={`https://github.com/${encodeURIComponent(username)}`}
        target="_blank"
        rel="noreferrer"
        className="btn-analyze mt-6 flex w-full items-center justify-center gap-1.5 rounded-2xl py-2.5 font-display text-sm font-semibold text-white"
      >
        View GitHub profile
        <ArrowUpRight className="h-4 w-4" strokeWidth={2.25} />
      </a>
    </div>
  );
}

function MiniStat({ value, label }) {
  return (
    <div className="flex flex-col items-center px-1">
      <span className="font-display text-base font-semibold text-primary">
        {value.toLocaleString()}
      </span>
      <span className="text-[11.5px] text-muted">{label}</span>
    </div>
  );
}
