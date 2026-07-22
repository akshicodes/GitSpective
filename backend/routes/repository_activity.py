from fastapi import APIRouter

from backend.services.github_service import get_repositories
from backend.analytics.repository_activity import calculate_repository_activity

router = APIRouter()


@router.get("/repository-activity/{username}")
def repository_activity(username: str):

    repositories = get_repositories(username)

    if repositories is None:
        return {
            "status": "error",
            "message": "GitHub user not found.",
            "data": {}
        }

    activity = calculate_repository_activity(repositories)

    return {
        "status": "success",
        "message": "Repository activity generated successfully.",
        "data": activity
    }