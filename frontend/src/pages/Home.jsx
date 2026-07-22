import { useState } from "react";
import { getProfile } from "../services/githubAPI";
function Home() {
    const [username, setUsername] = useState("");
    const [profile, setProfile] = useState(null);

    async function handleAnalyze() {
    console.log("Analyze button clicked");
        if (!username.trim()) {
        alert("Please enter a GitHub username.");
        return;
    }

    try {
        const data = await getProfile(username);

        console.log(data);
         // Save the profile in state
        setProfile(data.data);
    } catch (error) {
        console.error(error);
    }
}

console.log(profile);

    return (
        <div className="min-h-screen flex flex-col justify-center items-center">

            <h1 className="text-5xl font-bold">
                GitHub Developer Analytics
            </h1>

            <input
                type="text"
                placeholder="Enter GitHub Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="border rounded p-3 mt-6 w-80"
            />

            {
    profile && (
        <div className="mt-8 border rounded-lg p-6 w-96">

            <img
                src={profile.avatar}
                alt={profile.name}
                className="w-24 h-24 rounded-full mx-auto"
            />

            <h2 className="text-2xl font-bold text-center mt-4">
                {profile.name}
            </h2>

            <p className="text-center text-gray-600">
                @{profile.username}
            </p>

            <p className="mt-4 text-center">
                {profile.bio}
            </p>

            <div className="mt-4 space-y-2">
                <p>Followers: {profile.followers}</p>
                <p>Following: {profile.following}</p>
                <p>Public Repositories: {profile.public_repos}</p>
            </div>

            <a
                href={`https://github.com/${profile.username}`}
                target="_blank"
                rel="noreferrer"
                className="block text-center text-blue-600 mt-4"
            >
                View GitHub Profile
            </a>

        </div>
    )
}

            <button
                onClick={handleAnalyze}
                className="bg-black text-white px-6 py-3 rounded mt-4"
            >
                Analyze
            </button>

        </div>
    );
}

export default Home;