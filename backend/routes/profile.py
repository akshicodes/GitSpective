from fastapi import APIRouter, HTTPException
from ..services.github_service import get_profile

router = APIRouter()


@router.get("/profile/{username}")
def profile(username: str):

    profile_data = get_profile(username)

    if profile_data is None:
        raise HTTPException(
        status_code=404,
        detail="GitHub user not found."
    )

    return {
        "status": "success",
        "message": "Profile fetched successfully.",
        "data": profile_data
    }