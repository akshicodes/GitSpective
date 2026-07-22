from fastapi import APIRouter
from ..services.github_service import get_repositories

router = APIRouter()


@router.get("/repositories/{username}")
def repositories(username: str):

    repo_data = get_repositories(username)

    if repo_data is None:
        return {
            "status": "error",
            "message": "Repositories not found.",
            "data": {}
        }

    return {
        "status": "success",
        "message": "Repositories fetched successfully.",
        "data": repo_data
    }
