from fastapi import APIRouter, HTTPException

from backend.services.github_service import (
    get_profile,
    get_repositories,
    get_commit_statistics,
    get_contribution_calendar,
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

    if profile is None:
        raise HTTPException(
            status_code=404,
            detail="GitHub user not found."
        )

    repositories = get_repositories(username)

    if repositories is None:
        raise HTTPException(
            status_code=404,
            detail="Repositories could not be fetched."
        )
    

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

    commit_statistics = get_commit_statistics(username, repositories)
    contribution_calendar = get_contribution_calendar(username)

    impact_score = calculate_impact_score(
    profile,
    repositories,
    language_analysis,
    repository_health,
    repository_activity,
)
    developer_insights = generate_developer_insights(
            profile,
            repositories,
            language_analysis,
            repository_statistics,
            repository_activity
        )

   

    return {
            "profile": profile,
            "repositories": repositories,
            "language_analysis": language_analysis,
            "impact_score": impact_score,
            "repository_statistics": repository_statistics,
            "repository_growth": repository_growth,
            "repository_activity": repository_activity,
            "repository_health": repository_health,
            "commit_statistics": commit_statistics,
            "contribution_calendar": contribution_calendar,
            "developer_insights": developer_insights
        }
    
