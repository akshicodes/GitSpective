import requests
import os
from datetime import datetime, timezone
from concurrent.futures import ThreadPoolExecutor
from urllib.parse import parse_qs, urlparse

BASE_URL = "https://api.github.com"


def get_contribution_calendar(username):
    """Fetch a user's GitHub contribution calendar for every active year.

    GitHub exposes the full calendar only through GraphQL, which requires a
    personal access token. Public REST events are limited to recent activity.
    """

    token = os.getenv("GITHUB_TOKEN")
    if not token:
        return {"available": False, "calendars": [], "reason": "GITHUB_TOKEN is not configured."}

    headers = {
        "Accept": "application/vnd.github+json",
        "Authorization": f"Bearer {token}",
    }
    years_query = """
      query($login: String!) {
        user(login: $login) {
          contributionsCollection { contributionYears }
        }
      }
    """
    calendar_query = """
      query($login: String!, $from: DateTime!, $to: DateTime!) {
        user(login: $login) {
          contributionsCollection(from: $from, to: $to) {
            contributionCalendar {
              totalContributions
              weeks {
                contributionDays { date contributionCount contributionLevel }
              }
            }
          }
        }
      }
    """

    try:
        years_response = requests.post(
            f"{BASE_URL}/graphql",
            json={"query": years_query, "variables": {"login": username}},
            headers=headers,
            timeout=15,
        )
        years_payload = years_response.json()
        years = years_payload.get("data", {}).get("user", {}).get("contributionsCollection", {}).get("contributionYears", [])
        if years_response.status_code != 200 or not years:
            return {"available": False, "calendars": [], "reason": "GitHub contribution history could not be loaded."}

        current_year = datetime.now(timezone.utc).year

        def fetch_calendar(year):
            to_date = f"{year}-12-31T23:59:59Z" if year < current_year else datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")
            response = requests.post(
                f"{BASE_URL}/graphql",
                json={
                    "query": calendar_query,
                    "variables": {
                        "login": username,
                        "from": f"{year}-01-01T00:00:00Z",
                        "to": to_date,
                    },
                },
                headers=headers,
                timeout=15,
            )
            payload = response.json()
            calendar = payload.get("data", {}).get("user", {}).get("contributionsCollection", {}).get("contributionCalendar")
            if response.status_code == 200 and calendar:
                return {"year": year, **calendar}
            return None

        with ThreadPoolExecutor(max_workers=min(4, len(years))) as executor:
            calendars = [
                calendar
                for calendar in executor.map(fetch_calendar, sorted(years))
                if calendar is not None
            ]
    except (requests.RequestException, ValueError):
        return {"available": False, "calendars": [], "reason": "GitHub contribution history could not be loaded."}

    return {
        "available": bool(calendars),
        "calendars": calendars,
        "reason": None if calendars else "GitHub contribution history could not be loaded.",
    }


def _get_repository_commit_count(username, repository):
    """Count commits authored by a user in one public repository."""

    try:
        response = requests.get(
            f"{BASE_URL}/repos/{username}/{repository}/commits",
            params={"author": username, "per_page": 1},
            timeout=10,
        )
    except requests.RequestException:
        return None
    if response.status_code == 409:
        return 0
    if response.status_code != 200:
        return None

    last_page_url = response.links.get("last", {}).get("url")
    if last_page_url:
        return int(parse_qs(urlparse(last_page_url).query).get("page", [1])[0])
    return len(response.json())


def get_commit_statistics(username, repositories):
    """Return the public commits authored by a GitHub user when available."""

    try:
        response = requests.get(
            f"{BASE_URL}/search/commits",
            params={"q": f"author:{username}", "per_page": 1},
            headers={"Accept": "application/vnd.github+json"},
            timeout=10,
        )
    except requests.RequestException:
        response = None

    if response is not None and response.status_code == 200:
        return {"total_commits": response.json().get("total_count", 0), "available": True}
    with ThreadPoolExecutor(max_workers=min(6, len(repositories) or 1)) as executor:
        commit_counts = executor.map(
            lambda repository: _get_repository_commit_count(
                username, repository.get("name")
            ),
            repositories,
        )
        successful_counts = [count for count in commit_counts if count is not None]

    total_commits = sum(successful_counts)
    queried_repositories = len(successful_counts)

    return {
        "total_commits": total_commits,
        "available": queried_repositories > 0,
        "partial": queried_repositories < len(repositories),
    }


def get_public_commit_activity(username):
    """Build recent daily commit counts from GitHub's public push-event feed."""

    daily_activity = {}
    try:
        for page in range(1, 4):
            response = requests.get(
                f"{BASE_URL}/users/{username}/events/public",
                params={"per_page": 100, "page": page},
                timeout=10,
            )
            if response.status_code != 200:
                return {"daily_activity": {}, "available": False}

            events = response.json()
            for event in events:
                if event.get("type") != "PushEvent":
                    continue
                day = event.get("created_at", "")[:10]
                if not day:
                    continue
                commit_count = len(event.get("payload", {}).get("commits", []))
                daily_activity[day] = daily_activity.get(day, 0) + max(commit_count, 1)

            if len(events) < 100:
                break
    except requests.RequestException:
        return {"daily_activity": {}, "available": False}

    return {"daily_activity": daily_activity, "available": True}


def get_profile(username):

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
