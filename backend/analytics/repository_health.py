from datetime import datetime, timezone


def calculate_repository_health(repositories):

    repository_health = []

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


        if repo["description"]:
            score += 10
            breakdown["documentation"] += 10
            strengths.append("Repository has a clear description.")
        else:
            suggestions.append("Add a meaningful repository description.")

        if repo["topics"]:
            score += 10
            breakdown["documentation"] += 10
            strengths.append("Repository uses relevant topics.")
        else:
            suggestions.append("Add GitHub topics for discoverability.")

        if repo["homepage"]:
            score += 5
            breakdown["documentation"] += 5
            strengths.append("Repository includes a project homepage.")
        else:
            suggestions.append("Add a homepage or live demo link.")

        

        updated = datetime.strptime(
            repo["updated_at"],
            "%Y-%m-%dT%H:%M:%SZ"
        ).replace(tzinfo=timezone.utc)

        days = (datetime.now(timezone.utc) - updated).days

        if days <= 30:
            score += 20
            breakdown["maintenance"] += 20
            strengths.append("Repository has been updated recently.")
        else:
            suggestions.append("Update the repository more frequently.")

        if not repo["archived"]:
            score += 10
            breakdown["maintenance"] += 10
            strengths.append("Repository is actively maintained.")

        

        if repo["stars"] >= 10:
            score += 10
            breakdown["community"] += 10
            strengths.append("Repository has community interest.")
        else:
            suggestions.append("Promote the repository to gain stars.")

        if repo["forks"] >= 5:
            score += 5
            breakdown["community"] += 5

        if repo["watchers"] >= 5:
            score += 5
            breakdown["community"] += 5

        

        if repo["license"]:
            score += 10
            breakdown["quality"] += 10
            strengths.append("Repository includes an open-source license.")

        elif not repo["fork"]:
            suggestions.append(
                "Consider adding an open-source LICENSE file."
            )
        else:
            suggestions.append("Add a LICENSE file.")

        if repo["has_issues"]:
            score += 5
            breakdown["quality"] += 5

        if repo["has_wiki"]:
            score += 5
            breakdown["quality"] += 5

        if repo["default_branch"]:
            score += 5
            breakdown["quality"] += 5

        # ---------------------------------
        # Status
        # ---------------------------------

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

            "repository": repo["name"],

            "health_score": score,

            "health_status": status,

            "strengths": strengths,

            "suggestions": suggestions,

            "breakdown": breakdown
        })

    repository_health.sort(
        key=lambda x: x["health_score"],
        reverse=True
    )

    return repository_health