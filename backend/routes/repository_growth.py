from fastapi import APIRouter, HTTPException
from fastapi import APIRouter

from backend.services.github_service import get_repositories
from backend.analytics.repository_growth import calculate_repository_growth

router = APIRouter()

@router.get("/repository-growth/{username}")
def repository_growth(username: str):

    repositories = get_repositories(username)

    if repositories is None:
        raise HTTPException(
            status_code=404,
            detail="GitHub user not found."
        )

    growth = calculate_repository_growth(repositories)

    return {
        "status": "success",
        "message": "Repository growth generated successfully.",
        "data": growth
    }