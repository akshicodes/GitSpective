from fastapi import APIRouter

from backend.services.github_service import (
    get_profile,
    get_repositories,
)

from backend.analytics.language_analysis import analyze_languages
from backend.analytics.impact_score import calculate_impact_score
from backend.analytics.repository_statistics import calculate_repository_statistics
from backend.analytics.repository_growth import calculate_repository_growth
from backend.analytics.repository_activity import calculate_repository_activity
from backend.analytics.repository_health import calculate_repository_health
from backend.analytics.developer_insights import generate_developer_insights

router = APIRouter()


@router.get("/analytics/{username}")
def analytics(username: str):

    profile = get_profile(username)
    repositories = get_repositories(username)

    if profile is None or repositories is None:
        return {
            "status": "error",
            "message": "GitHub user not found.",
            "data": {}
        }
    

    # Generate all analytics
    language_analysis = analyze_languages(repositories)


    repository_statistics = calculate_repository_statistics(
            repositories
        )

    repository_growth = calculate_repository_growth(
            repositories
        )

    repository_activity = calculate_repository_activity(
            repositories
        )

    repository_health = calculate_repository_health(
            repositories
        )

    developer_insights = generate_developer_insights(
            profile,
            repositories,
            language_analysis,
            repository_statistics,
            repository_activity
        )
    impact_score = calculate_impact_score(
    profile,
    repositories,
    language_analysis,
    repository_health,
    repository_activity,
)

   

    return {
        "status": "success",
        "message": "Analytics generated successfully.",
        "data": {
            "profile": profile,
            "repositories": repositories,
            "language_analysis": language_analysis,
            "impact_score": impact_score,
            "repository_statistics": repository_statistics,
            "repository_growth": repository_growth,
            "repository_activity": repository_activity,
            "repository_health": repository_health,
            "developer_insights": developer_insights
        }
    }