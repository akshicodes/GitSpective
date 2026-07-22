def calculate_repository_statistics(repositories):

    total_repositories = len(repositories)

    original_repositories = 0
    forked_repositories = 0
    archived_repositories = 0

    total_stars = 0
    total_forks = 0

    most_starred_repo = None
    most_forked_repo = None

    max_stars = -1
    max_forks = -1

    for repo in repositories:

        if repo["fork"]:
            forked_repositories += 1
        else:
            original_repositories += 1

        if repo["archived"]:
            archived_repositories += 1

        total_stars += repo["stars"]
        total_forks += repo["forks"]

        if repo["stars"] > max_stars:
            max_stars = repo["stars"]
            most_starred_repo = repo["name"]

        if repo["forks"] > max_forks:
            max_forks = repo["forks"]
            most_forked_repo = repo["name"]

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

    return {
        "total_repositories": total_repositories,
        "original_repositories": original_repositories,
        "forked_repositories": forked_repositories,
        "archived_repositories": archived_repositories,
        "total_stars": total_stars,
        "total_forks": total_forks,
        "average_stars": round(average_stars, 2),
        "average_forks": round(average_forks, 2),
        "most_starred_repo": most_starred_repo,
        "most_forked_repo": most_forked_repo,
    }