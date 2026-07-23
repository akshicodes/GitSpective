const BASE_URL = "http://127.0.0.1:8000";

// ---------------------------------------------------------------------------
// Helper
// ---------------------------------------------------------------------------

async function apiFetch(path) {
  const response = await fetch(`${BASE_URL}${path}`);
  if (!response.ok) {
    const detail = await response.json().catch(() => ({}));
    throw new Error(detail?.detail ?? `Request failed: ${response.status}`);
  }
  return response.json();
}

// ---------------------------------------------------------------------------
// Bundled analytics (used by Landing → Dashboard flow)
// ---------------------------------------------------------------------------

/** GET /analytics/{username} — full analytics bundle */
export async function getAnalytics(username) {
  return apiFetch(`/analytics/${username}`);
}

// ---------------------------------------------------------------------------
// Individual endpoints
// ---------------------------------------------------------------------------

/** GET /profile/{username} — basic GitHub profile */
export async function getProfile(username) {
  return apiFetch(`/profile/${username}`);
}

/** GET /repositories/{username} — list of public repositories */
export async function getRepositories(username) {
  return apiFetch(`/repositories/${username}`);
}

/** GET /languages/{username} — language analysis (name → count map) */
export async function getLanguages(username) {
  return apiFetch(`/languages/${username}`);
}

/** GET /impact-score/{username} — computed impact score + breakdown */
export async function getImpactScore(username) {
  return apiFetch(`/impact-score/${username}`);
}

/** GET /repository-statistics/{username} — aggregate stats across all repos */
export async function getRepositoryStatistics(username) {
  return apiFetch(`/repository-statistics/${username}`);
}

/** GET /repository-growth/{username} — { year: repoCount } map */
export async function getRepositoryGrowth(username) {
  return apiFetch(`/repository-growth/${username}`);
}

/** GET /repository-activity/{username} — overall maintenance activity summary */
export async function getRepositoryActivity(username) {
  return apiFetch(`/repository-activity/${username}`);
}

/** GET /repository-health/{username} — per-repo health scores + breakdown */
export async function getRepositoryHealth(username) {
  return apiFetch(`/repository-health/${username}`);
}

/** GET /developer-insights/{username} — developer type, insights, improvements */
export async function getDeveloperInsights(username) {
  return apiFetch(`/developer-insights/${username}`);
}