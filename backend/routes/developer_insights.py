from fastapi import APIRouter

from backend.services.github_service import (
    get_profile,
    get_repositories,
)

from backend.analytics.language_analysis import analyze_languages
from backend.analytics.repository_statistics import calculate_repository_statistics
from backend.analytics.repository_activity import calculate_repository_activity
from backend.analytics.developer_insights import generate_developer_insights

router = APIRouter()


@router.get("/developer-insights/{username}")
def developer_insights(username: str):

    profile = get_profile(username)
    repositories = get_repositories(username)

    if profile is None or repositories is None:
        return {
            "status": "error",
            "message": "GitHub user not found.",
            "data": {}
        }

    languages = analyze_languages(repositories)
    statistics = calculate_repository_statistics(repositories)
    activity = calculate_repository_activity(repositories)

    insights = generate_developer_insights(
        profile,
        repositories,
        languages,
        statistics,
        activity
    )

    return {
        "status": "success",
        "message": "Developer insights generated successfully.",
        "data": insights
    }