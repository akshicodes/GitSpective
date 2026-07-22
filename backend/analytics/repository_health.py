from datetime import datetime, timezone


def calculate_repository_health(repositories):
    """
    Analyze the health of each repository.
    """

    repository_health = []

    today = datetime.now(timezone.utc)

    for repo in repositories:

        score = 0

        strengths = []
        suggestions = []

        breakdown = {
            "documentation": 0,
            "maintenance": 0,
            "community": 0,
            "quality": 0
        }

        # -------------------------
        # Documentation
        # -------------------------

        if repo.get("description"):
            score += 10
            breakdown["documentation"] += 10
            strengths.append("Repository has a clear description.")
        else:
            suggestions.append("Add a meaningful repository description.")

        if repo.get("topics"):
            score += 10
            breakdown["documentation"] += 10
            strengths.append("Repository uses relevant topics.")
        else:
            suggestions.append("Add GitHub topics for better discoverability.")

        if repo.get("homepage"):
            score += 5
            breakdown["documentation"] += 5
            strengths.append("Repository includes a project homepage.")
        else:
            suggestions.append("Add a homepage or live demo link.")

        # -------------------------
        # Maintenance
        # -------------------------

        updated_at = repo.get("updated_at")

        if updated_at:

            updated = datetime.strptime(
                updated_at,
                "%Y-%m-%dT%H:%M:%SZ"
            ).replace(tzinfo=timezone.utc)

            days = (today - updated).days

            if days <= 30:
                score += 20
                breakdown["maintenance"] += 20
                strengths.append("Repository has been updated recently.")
            else:
                suggestions.append("Update the repository more frequently.")

        if not repo.get("archived"):
            score += 10
            breakdown["maintenance"] += 10
            strengths.append("Repository is actively maintained.")
        else:
            suggestions.append("Repository is archived.")

        # -------------------------
        # Community
        # -------------------------

        stars = repo.get("stars", 0)
        forks = repo.get("forks", 0)
        watchers = repo.get("watchers", 0)

        if stars >= 10:
            score += 10
            breakdown["community"] += 10
            strengths.append("Repository has community interest.")
        else:
            suggestions.append("Promote the repository to gain more stars.")

        if forks >= 5:
            score += 5
            breakdown["community"] += 5

        if watchers >= 5:
            score += 5
            breakdown["community"] += 5

        # -------------------------
        # Quality
        # -------------------------

        if repo.get("license"):
            score += 10
            breakdown["quality"] += 10
            strengths.append("Repository includes an open-source license.")
        else:
            suggestions.append("Add an open-source LICENSE file.")

        if repo.get("has_issues"):
            score += 5
            breakdown["quality"] += 5

        if repo.get("has_wiki"):
            score += 5
            breakdown["quality"] += 5

        if repo.get("default_branch"):
            score += 5
            breakdown["quality"] += 5

        # -------------------------
        # Health Status
        # -------------------------

        if score >= 90:
            status = "Excellent"
        elif score >= 75:
            status = "Very Good"
        elif score >= 60:
            status = "Good"
        elif score >= 40:
            status = "Developing"
        else:
            status = "Getting Started"

        repository_health.append({

            "repository": repo.get("name"),

            "health_score": score,

            "health_status": status,

            "strengths": strengths,

            "suggestions": suggestions,

            "breakdown": breakdown

        })

    repository_health.sort(
        key=lambda repository: repository["health_score"],
        reverse=True
    )

    return repository_health