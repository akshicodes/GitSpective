from fastapi import APIRouter
from ..services.github_service import get_repositories
from ..analytics.repository_statistics import calculate_repository_statistics

router = APIRouter()

@router.get("/repository-statistics/{username}")
def repository_statistics(username: str):

    repositories = get_repositories(username)

    if repositories is None:
        return {
            "status": "error",
            "message": "GitHub user not found.",
            "data": {}
        }

    statistics = calculate_repository_statistics(repositories)

    return {
        "status": "success",
        "message": "Repository statistics generated successfully.",
        "data": statistics
    }