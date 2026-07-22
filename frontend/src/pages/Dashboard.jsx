import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { useAnalytics } from "../context/AnalyticsContext";

import Navbar from "../components/Navbar/Navbar";
import ProfileCard from "../components/ProfileCard/ProfileCard";
import StatsCard from "../components/StatsCard/StatsCard";
import ImpactScore from "../components/ImpactScore/ImpactScore";
import InsightCard from "../components/InsightCard/InsightCard";
import RecentActivity from "../components/RecentActivity/RecentActivity";
import RepositoryPreview from "../components/RepositoryPreview/RepositoryPreview";
import SectionTitle from "../components/SectionTitle/SectionTitle";

import {
  placeholderProfile,
  placeholderStats,
  placeholderImpactScore,
  placeholderInsights,
  placeholderActivity,
  placeholderRepositories,
} from "../data/placeholderData";

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0 },
};

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
  const { username: routeUsername } = useParams();
  const { analytics } = useAnalytics();

  if (!analytics) {
  return (
    <div className="min-h-screen flex items-center justify-center text-white">
      Loading analytics...
    </div>
  );
  }

// console.log(", analytics);
console.table(analytics.profile);
console.log("Dashboard Analytics:",analytics.repository_statistics);

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


const impactData = {
  score: analytics.impact_score.impact_score,
  maxScore: 100,
  level: analytics.impact_score.impact_level,
  summary: analytics.impact_score.summary,
};

  return (
    <div className="min-h-screen bg-bg">
      <Navbar username={profile.username} />

      <main className="mx-auto max-w-7xl px-5 py-8 sm:px-8 sm:py-10">
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
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {placeholderInsights.map((insight) => (
                  <InsightCard key={insight.id} insight={insight} />
                ))}
              </div>
            </motion.section>

            {/* Recent activity */}
            <motion.section
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5 }}
              className="glass hover-lift rounded-3xl p-6 sm:p-7"
            >
              <SectionTitle title="Recent activity" />
              <RecentActivity items={placeholderActivity} />
            </motion.section>

            {/* Repository highlights */}
            <motion.section
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5 }}
            >
              <SectionTitle
                title="Repository highlights"
                subtitle="A few projects worth a closer look."
              />
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {placeholderRepositories.map((repo) => (
                  <RepositoryPreview key={repo.id} repo={repo} />
                ))}
              </div>
            </motion.section>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-14 flex flex-col items-center gap-1 border-t border-white/10 pt-6 text-center text-[12.5px] text-muted sm:flex-row sm:justify-between">
          <span>GitSpective — GitHub, explained beautifully.</span>
          <span>Data shown is illustrative placeholder content.</span>
        </footer>
      </main>
    </div>
  );
}
