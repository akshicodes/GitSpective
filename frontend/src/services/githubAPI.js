const BASE_URL = import.meta.env.VITE_API_URL ?? "http://127.0.0.1:8000";

async function apiFetch(path) {
  let response;
  try {
    response = await fetch(`${BASE_URL}${path}`);
  } catch {
    throw new Error(
      "Cannot reach the analytics API. Start the backend at http://127.0.0.1:8000.",
    );
  }
  if (!response.ok) {
    const detail = await response.json().catch(() => ({}));
    throw new Error(detail?.detail ?? `Request failed: ${response.status}`);
  }
  return response.json();
}

export async function getAnalytics(username) {
  return apiFetch(`/analytics/${username}`);
}

export async function getProfile(username) {
  return apiFetch(`/profile/${username}`);
}

export async function getRepositories(username) {
  return apiFetch(`/repositories/${username}`);
}

export async function getLanguages(username) {
  return apiFetch(`/languages/${username}`);
}

export async function getImpactScore(username) {
  return apiFetch(`/impact-score/${username}`);
}

export async function getRepositoryStatistics(username) {
  return apiFetch(`/repository-statistics/${username}`);
}

export async function getRepositoryGrowth(username) {
  return apiFetch(`/repository-growth/${username}`);
}

export async function getRepositoryActivity(username) {
  return apiFetch(`/repository-activity/${username}`);
}

export async function getRepositoryHealth(username) {
  return apiFetch(`/repository-health/${username}`);
}

export async function getDeveloperInsights(username) {
  return apiFetch(`/developer-insights/${username}`);
}
