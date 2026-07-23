import requests

BASE_URL = "https://api.github.com"


def get_profile(username): # fetch profile details from GitHub.

    url = f"{BASE_URL}/users/{username}"

    try:
        response = requests.get(url, timeout=10)
    except requests.RequestException:
        return None

    if response.status_code != 200:
        return None

    data = response.json()

    return {
        "name": data.get("name"),
        "username": data.get("login"),
        "avatar": data.get("avatar_url"),
        "bio": data.get("bio"),
        "followers": data.get("followers"),
        "following": data.get("following"),
        "public_repos": data.get("public_repos"),
        "company": data.get("company"),
        "location": data.get("location"),
        "blog": data.get("blog"),
        "joined": data.get("created_at")
    }


def get_repositories(username):
    """Fetch all public repositories of a GitHub user."""

    url = f"{BASE_URL}/users/{username}/repos"
    repositories = []

    try:
        for page in range(1, 101):
            response = requests.get(
                url,
                params={"per_page": 100, "page": page, "sort": "updated"},
                timeout=10,
            )
            if response.status_code != 200:
                return None

            page_repositories = response.json()
            repositories.extend(page_repositories)
            if len(page_repositories) < 100:
                break
    except requests.RequestException:
        return None
    repo_list = []

    for repo in repositories:

        license_info = repo.get("license")

        repo_list.append({
            "name": repo.get("name"),
            "description": repo.get("description"),
            "language": repo.get("language"),

            "stars": repo.get("stargazers_count"),
            "forks": repo.get("forks_count"),
            "watchers": repo.get("watchers_count"),

            "fork": repo.get("fork"),
            "archived": repo.get("archived"),

            "topics": repo.get("topics", []),

            "homepage": repo.get("homepage"),

            "license": (
                license_info.get("name")
                if license_info
                else None
            ),

            "has_issues": repo.get("has_issues"),
            "has_wiki": repo.get("has_wiki"),

            "default_branch": repo.get("default_branch"),

            "created_at": repo.get("created_at"),
            "updated_at": repo.get("updated_at"),
        })

    return repo_list
