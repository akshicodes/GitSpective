/**
 * Static placeholder data for the Dashboard UI.
 *
 * Shape mirrors the fields documented in backend-endpoints.md (specifically
 * the unified `GET /analytics/{username}` response) so that wiring in the
 * real API later is a matter of swapping this import for a fetched object —
 * no component prop shapes should need to change.
 */

export const placeholderProfile = {
  name: "Akshita Sharma",
  username: "akshicodes",
  avatar: "https://avatars.githubusercontent.com/u/9919?v=4",
  bio: "Building developer tools with Python, React & FastAPI.",
  followers: 380,
  following: 122,
  publicRepos: 42,
  location: "Bengaluru, India",
  company: "Independent",
  website: "https://akshicodes.dev",
  joinedDate: "2019-06-14",
};

export const placeholderStats = [
  { key: "repositories", label: "Repositories", value: 42 },
  { key: "followers", label: "Followers", value: 380 },
  { key: "following", label: "Following", value: 122 },
  { key: "stars", label: "Stars", value: 615 },
];

export const placeholderImpactScore = {
  score: 86,
  maxScore: 100,
  level: "Advanced Developer",
  summary:
    "Consistently ships well-documented, actively maintained projects with strong community engagement.",
};

export const placeholderInsights = [
  { id: 1, text: "Strong open-source contributor" },
  { id: 2, text: "Active maintainer" },
  { id: 3, text: "Uses multiple languages fluently" },
  { id: 4, text: "Good repository quality" },
  { id: 5, text: "Consistent activity over time" },
];

export const placeholderActivity = [
  { id: 1, action: "Updated", target: "Portfolio", time: "2 days ago" },
  { id: 2, action: "Created", target: "ML Project", time: "5 days ago" },
  { id: 3, action: "Starred", target: "vercel/next.js", time: "1 week ago" },
  { id: 4, action: "Opened PR on", target: "GitSpective", time: "2 weeks ago" },
];

export const placeholderRepositories = [
  {
    id: 1,
    name: "GitSpective",
    description: "Turns any public GitHub profile into meaningful developer insights.",
    language: "Python",
    stars: 128,
    forks: 24,
    health: "Excellent",
  },
  {
    id: 2,
    name: "MultiMind Arena",
    description: "A playground for comparing multiple LLM agents on shared tasks.",
    language: "TypeScript",
    stars: 96,
    forks: 18,
    health: "Very Good",
  },
  {
    id: 3,
    name: "Lead Follow-up System",
    description: "Automated lead tracking and follow-up scheduling for small teams.",
    language: "JavaScript",
    stars: 41,
    forks: 7,
    health: "Good",
  },
];
