def generate_developer_insights(
    profile,
    repositories,
    language_analysis,
    repository_statistics,
    repository_activity,
):
    strengths = []
    improvements = []

    total_repositories = len(repositories)
    total_stars = repository_statistics.get("total_stars", 0)
    average_stars = repository_statistics.get("average_stars", 0)
    followers = profile.get("followers", 0)
    activity_level = repository_activity.get("activity_level", "Inactive")

    # Strengths

    if total_stars >= 100:
        strengths.append("Strong Open Source Presence")

    if activity_level in ["Very Active", "Active"]:
        strengths.append("Highly Active Maintainer")

    if len(language_analysis) >= 5:
        strengths.append("Technology Generalist")

    if average_stars >= 50:
        strengths.append("Creates Popular Projects")

    if followers >= 100:
        strengths.append("Growing Developer Community")

    described = sum(
        1
        for repo in repositories
        if repo.get("description")
    )

    if total_repositories > 0 and described >= total_repositories * 0.7:
        strengths.append("Well Documented Repositories")

    # Improvements

    if followers < 50:
        improvements.append("Increase community engagement")

    if (
        total_repositories > 0
        and described < total_repositories * 0.5
    ):
        improvements.append("Add descriptions to more repositories")

    if activity_level in ["Occasionally Active", "Inactive"]:
        improvements.append("Maintain repositories more consistently")

    # Developer type

    if total_stars >= 10000:
        developer_type = "Open Source Legend"

    elif total_stars >= 1000:
        developer_type = "Open Source Expert"

    elif total_stars >= 100:
        developer_type = "Experienced Developer"

    else:
        developer_type = "Emerging Developer"

    # Main insights

    primary_insight = (
        strengths[0]
        if strengths
        else "Early Stage Developer"
    )

    secondary_insights = strengths[1:4]

    # Summary

    if strengths:
        summary = (
            f"This developer is an {developer_type.lower()} "
            f"with strengths in {', '.join(strengths[:3]).lower()}."
        )
    else:
        summary = (
            "This developer is building their GitHub profile "
            "and has good potential for future growth."
        )

    return {
        "developer_type": developer_type,
        "primary_insight": primary_insight,
        "secondary_insights": secondary_insights,
        "improvements": improvements,
        "summary": summary,
    }