const BASE_URL = "http://127.0.0.1:8000";

export async function getProfile(username) {
    const response = await fetch(`${BASE_URL}/profile/${username}`);

    if (!response.ok) {
        throw new Error("Failed to fetch profile.");
    }

    return await response.json();
}