def generate_developer_insights(
    profile,
    repositories,
    language_analysis,
    repository_statistics,
    repository_activity
):
    strengths = []
    improvements = []

    # -------------------------
    # Strengths
    # -------------------------

    if repository_statistics["total_stars"] >= 100:
        strengths.append("Strong Open Source Presence")

    if repository_activity["activity_level"] in ["Very Active", "Active"]:
        strengths.append("Highly Active Maintainer")

    if len(language_analysis) >= 5:
        strengths.append("Technology Generalist")

    if repository_statistics["average_stars"] >= 50:
        strengths.append("Creates Popular Projects")

    if profile["followers"] >= 100:
        strengths.append("Growing Developer Community")

    described = sum(
        1 for repo in repositories
        if repo["description"]
    )

    if described >= len(repositories) * 0.7:
        strengths.append("Well Documented Repositories")

    # -------------------------
    # Improvements
    # -------------------------

    if profile["followers"] < 50:
        improvements.append("Increase community engagement")

    if described < len(repositories) * 0.5:
        improvements.append("Add descriptions to more repositories")

    if repository_activity["activity_level"] in ["Occasionally Active", "Inactive"]:
        improvements.append("Maintain repositories more consistently")

    # -------------------------
    # Developer Type
    # -------------------------

    if repository_statistics["total_stars"] >= 10000:
        developer_type = "Open Source Legend"

    elif repository_statistics["total_stars"] >= 1000:
        developer_type = "Open Source Expert"

    elif repository_statistics["total_stars"] >= 100:
        developer_type = "Experienced Developer"

    else:
        developer_type = "Emerging Developer"

    # -------------------------
    # Primary Insight
    # -------------------------

    if strengths:
        primary_insight = strengths[0]
    else:
        primary_insight = "Early Stage Developer"

    secondary_insights = strengths[1:4]

    # -------------------------
    # Summary
    # -------------------------

    if strengths:
        summary = (
            f"This developer is an {developer_type.lower()} "
            f"with strengths in {', '.join(strengths[:3]).lower()}."
        )
    else:
        summary = (
            "This developer is building their GitHub profile and has good potential for future growth."
        )

    # -------------------------
    # Return Result
    # -------------------------

# print("Strengths:", strengths)
# print("Improvements:", improvements)
    return {
        "developer_type": developer_type,
        "primary_insight": primary_insight,
        "secondary_insights": secondary_insights,
        "improvements": improvements,
        "summary": summary
    }