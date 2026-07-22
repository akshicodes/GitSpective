from fastapi import APIRouter
from ..services.github_service import get_profile

router = APIRouter()


@router.get("/profile/{username}")
def profile(username: str):

    profile_data = get_profile(username)

    if profile_data is None:
        return {
            "status": "error",
            "message": "GitHub user not found.",
            "data": {}
        }

    return {
        "status": "success",
        "message": "Profile fetched successfully.",
        "data": profile_data
    }