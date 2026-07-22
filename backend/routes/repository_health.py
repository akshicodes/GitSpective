from fastapi import APIRouter

from backend.services.github_service import get_repositories
from backend.analytics.repository_health import calculate_repository_health

router = APIRouter()


@router.get("/repository-health/{username}")
def repository_health(username: str):

    repositories = get_repositories(username)

    if repositories is None:
        return {
            "status": "error",
            "message": "GitHub user not found.",
            "data": {}
        }

    report = calculate_repository_health(repositories)

    return {
        "status": "success",
        "message": "Repository health calculated successfully.",
        "data": report
    }