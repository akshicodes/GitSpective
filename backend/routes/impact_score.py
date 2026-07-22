from fastapi import APIRouter

from ..services.github_service import get_profile
from ..services.github_service import get_repositories

from ..analytics.impact_score import calculate_impact_score
from ..analytics.language_analysis import analyze_languages
from ..analytics.repository_health import calculate_repository_health
from ..analytics.repository_activity import calculate_repository_activity

router = APIRouter()


@router.get("/impact-score/{username}")
def impact_score(username: str):

    profile = get_profile(username)
    repositories = get_repositories(username)

    language_analysis = analyze_languages(repositories)

    repository_health = calculate_repository_health(repositories)

    repository_activity = calculate_repository_activity(repositories)   

    if profile is None or repositories is None:
        return {
            "status": "error",
            "message": "User not found.",
            "data": {}
        }

    score = calculate_impact_score(
    profile,
    repositories,
    language_analysis,
    repository_health,
    repository_activity,
)

    return {
        "status": "success",
        "message": "Impact score calculated successfully.",
        "data": score
    }