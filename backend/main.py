from fastapi import FastAPI
from backend.routes.profile import router as profile_router
from backend.routes.repositories import router as repository_router
from backend.routes.languages import router as language_router
from backend.routes.impact_score import router as impact_router
from backend.routes.analytics import router as analytics_router
from fastapi.middleware.cors import CORSMiddleware
from backend.routes.repository_statistics import router as repository_statistics_router
from backend.routes.repository_growth import router as repository_growth_router
from backend.routes.repository_activity import router as repository_activity_router
from backend.routes.repository_health import router as repository_health_router
from backend.routes.developer_insights import (
    router as developer_insights_router
)





app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def home():
    return {
        "message": "GitHub Developer Analytics API is running!"
    }


@app.get("/health")
def health():
    return {
        "status": "success",
        "message": "Backend is healthy."
    }


app.include_router(profile_router)
app.include_router(repository_router)
app.include_router(language_router)
app.include_router(impact_router)
app.include_router(analytics_router)
app.include_router(repository_statistics_router)
app.include_router(repository_growth_router)
app.include_router(repository_activity_router)
app.include_router(repository_health_router)
app.include_router(developer_insights_router)
