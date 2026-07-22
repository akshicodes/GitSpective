def calculate_repository_statistics(repositories):

    total_repositories = len(repositories)
    original_repositories = 0
    forked_repositories = 0
    archived_repositories = 0
    total_stars = 0
    total_forks = 0
    total_watchers = 0
    most_starred_repo = None
    most_forked_repo = None
    most_watched_repo = None
    max_stars = -1
    max_forks = -1
    max_watchers = -1

    for repo in repositories:

        stars = repo.get("stars", 0)
        forks = repo.get("forks", 0)
        watchers = repo.get("watchers", 0)

        if repo.get("fork"):
            forked_repositories += 1
        else:
            original_repositories += 1

        if repo.get("archived"):
            archived_repositories += 1

        total_stars += stars
        total_forks += forks
        total_watchers += watchers

        if stars > max_stars:
            max_stars = stars
            most_starred_repo = repo.get("name")

        if forks > max_forks:
            max_forks = forks
            most_forked_repo = repo.get("name")

        if watchers > max_watchers:
            max_watchers = watchers
            most_watched_repo = repo.get("name")

    average_stars = (
        total_stars / total_repositories
        if total_repositories
        else 0
    )

    average_forks = (
        total_forks / total_repositories
        if total_repositories
        else 0
    )

    average_watchers = (
        total_watchers / total_repositories
        if total_repositories
        else 0
    )

    return {
        "total_repositories": total_repositories,
        "original_repositories": original_repositories,
        "forked_repositories": forked_repositories,
        "archived_repositories": archived_repositories,

        "total_stars": total_stars,
        "total_forks": total_forks,
        "total_watchers": total_watchers,

        "average_stars": round(average_stars, 2),
        "average_forks": round(average_forks, 2),
        "average_watchers": round(average_watchers, 2),

        "most_starred_repo": most_starred_repo,
        "most_forked_repo": most_forked_repo,
        "most_watched_repo": most_watched_repo,
    }