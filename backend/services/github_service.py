import requests

BASE_URL = "https://api.github.com"


def get_profile(username): # fetch profile details from GitHub.

    url = f"{BASE_URL}/users/{username}"

    response = requests.get(url)

    if response.status_code != 200:
        return None

    data = response.json()

    return {
        "name": data["name"],
        "username": data["login"],
        "avatar": data["avatar_url"],
        "bio": data["bio"],
        "followers": data["followers"],
        "following": data["following"],
        "public_repos": data["public_repos"],
        "company": data["company"],
        "location": data["location"],
        "blog": data["blog"],
        "joined": data["created_at"]
    }


def get_repositories(username): #Fetch all public repositories of a GitHub user.

    url = f"{BASE_URL}/users/{username}/repos"

    response = requests.get(url)

    if response.status_code != 200:
        return None

    repositories = response.json()

    repo_list = []

    for repo in repositories:
      repo_list.append({
    "name": repo["name"],
    "description": repo["description"],
    "language": repo["language"],

    "stars": repo["stargazers_count"],
    "forks": repo["forks_count"],
    "watchers": repo["watchers_count"],

    "fork": repo["fork"],
    "archived": repo["archived"],

    "topics": repo["topics"],

    "homepage": repo["homepage"],

    "license": (
        repo["license"]["name"]
        if repo["license"]
        else None
    ),

    "has_issues": repo["has_issues"],
    "has_wiki": repo["has_wiki"],

    "default_branch": repo["default_branch"],

    "created_at": repo["created_at"],
    "updated_at": repo["updated_at"]
})

    return repo_list