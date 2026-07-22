from fastapi import APIRouter

from ..services.github_service import get_repositories
from ..analytics.language_analysis import analyze_languages

router = APIRouter()


@router.get("/languages/{username}")
def languages(username: str):

    repositories = get_repositories(username)

    if repositories is None:
        return {
            "status": "error",
            "message": "Repositories not found.",
            "data": {}
        }

    language_data = analyze_languages(repositories)

    return {
        "status": "success",
        "message": "Language analysis completed.",
        "data": language_data
    }