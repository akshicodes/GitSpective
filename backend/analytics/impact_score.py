def calculate_impact_score(
    profile,
    repositories,
    language_analysis,
    repository_health,
    repository_activity,
):

    score = 0
    breakdown = {}

    total_stars = 0
    total_forks = 0

    for repo in repositories:
        total_stars += repo["stars"]
        total_forks += repo["forks"]

    followers = profile["followers"]
    total_repositories = profile["public_repos"]

    # -----------------------------
    # Repository Health (35)
    # -----------------------------

    average_health = (
        sum(repo["health_score"] for repo in repository_health)
        / len(repository_health)
    )

    health_score = round((average_health / 100) * 35)

    score += health_score

    breakdown["repository_health"] = health_score


    activity_level = repository_activity["activity_level"]

    if activity_level == "Very Active":
        activity_score = 25

    elif activity_level == "Active":
        activity_score = 20

    elif activity_level == "Moderately Active":
        activity_score = 15

    elif activity_level == "Occasionally Active":
        activity_score = 8

    else:
        activity_score = 0

    score += activity_score

    breakdown["activity"] = activity_score


        # -----------------------------
    # Community (20)
    # -----------------------------

    community_score = 0

    # Stars (8)
    if total_stars >= 100:
        community_score += 8
    elif total_stars >= 50:
        community_score += 6
    elif total_stars >= 20:
        community_score += 4
    elif total_stars >= 5:
        community_score += 2

    # Forks (5)
    if total_forks >= 50:
        community_score += 5
    elif total_forks >= 20:
        community_score += 4
    elif total_forks >= 10:
        community_score += 3
    elif total_forks >= 5:
        community_score += 2
    elif total_forks >= 1:
        community_score += 1

    # Followers (7)
    if followers >= 100:
        community_score += 7
    elif followers >= 50:
        community_score += 5
    elif followers >= 20:
        community_score += 3
    elif followers >= 10:
        community_score += 2
    elif followers >= 5:
        community_score += 1

    score += community_score

    breakdown["community"] = community_score



    # -----------------------------
    # Technology Diversity (10)
    # -----------------------------

    technology_score = 0

    language_count = len(language_analysis)

    if language_count >= 6:
        technology_score = 10

    elif language_count >= 5:
        technology_score = 8

    elif language_count >= 4:
        technology_score = 6

    elif language_count >= 3:
        technology_score = 4

    elif language_count >= 2:
        technology_score = 2

    score += technology_score

    breakdown["technology_diversity"] = technology_score

    # -----------------------------
    # Repository Portfolio (10)
    # -----------------------------

    portfolio_score = 0

    if total_repositories >= 20:
        portfolio_score = 10

    elif total_repositories >= 15:
        portfolio_score = 8

    elif total_repositories >= 10:
        portfolio_score = 6

    elif total_repositories >= 5:
        portfolio_score = 4

    elif total_repositories >= 2:
        portfolio_score = 2

    score += portfolio_score

    breakdown["repository_portfolio"] = portfolio_score

    # -----------------------------
    # Impact Level
    # -----------------------------

    if score >= 90:
        impact_level = "Exceptional"

    elif score >= 75:
        impact_level = "Strong"

    elif score >= 60:
        impact_level = "Growing"

    elif score >= 40:
        impact_level = "Developing"

    else:
        impact_level = "Beginner"


        # -----------------------------
    # Summary
    # -----------------------------

    summary = ""

    if score >= 75:
        summary = (
            "Strong GitHub profile with well-maintained repositories, "
            "consistent activity, and a growing technical portfolio."
        )

    elif score >= 60:
        summary = (
            "Shows consistent development activity with good repository "
            "maintenance and opportunities to increase community engagement."
        )

    elif score >= 40:
        summary = (
            "An emerging developer building projects consistently. "
            "Improving documentation, community engagement, and portfolio "
            "growth will further increase overall impact."
        )

    else:
        summary = (
            "Early-stage GitHub profile with room to expand projects, "
            "activity, and open-source engagement."
        )

    return {
    "impact_score": score,
    "impact_level": impact_level,
    "summary": summary,

    "breakdown": breakdown,

    "total_stars": total_stars,
    "total_forks": total_forks,
    "followers": followers,
    "repositories": total_repositories
}