const BASE_URL = "http://127.0.0.1:8000";

export async function getAnalytics(username) {
  const response = await fetch(
    `${BASE_URL}/analytics/${username}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch GitHub analytics.");
  }

  return await response.json();
}