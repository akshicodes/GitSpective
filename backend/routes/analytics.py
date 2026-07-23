from fastapi import APIRouter, HTTPException
from concurrent.futures import ThreadPoolExecutor
from threading import Lock
from time import monotonic

from backend.services.github_service import (
    get_profile,
    get_repositories,
    get_commit_statistics,
    get_contribution_calendar,
)

from backend.analytics.language_analysis import analyze_languages
from backend.analytics.impact_score import calculate_impact_score
from backend.analytics.repository_statistics import calculate_repository_statistics
from backend.analytics.repository_growth import calculate_repository_growth
from backend.analytics.repository_activity import calculate_repository_activity
from backend.analytics.repository_health import calculate_repository_health
from backend.analytics.developer_insights import generate_developer_insights

router = APIRouter()

ANALYTICS_CACHE_TTL_SECONDS = 300
analytics_cache = {}
analytics_cache_lock = Lock()


def get_cached_analytics(username):
    with analytics_cache_lock:
        cached = analytics_cache.get(username.lower())
        if cached is None:
            return None

        created_at, report = cached
        if monotonic() - created_at >= ANALYTICS_CACHE_TTL_SECONDS:
            analytics_cache.pop(username.lower(), None)
            return None

        return report


def cache_analytics(username, report):
    with analytics_cache_lock:
        analytics_cache[username.lower()] = (monotonic(), report)


@router.get("/analytics/{username}")
def analytics(username: str):
    cached_report = get_cached_analytics(username)
    if cached_report is not None:
        return cached_report

    with ThreadPoolExecutor(max_workers=2) as executor:
        profile_future = executor.submit(get_profile, username)
        repositories_future = executor.submit(get_repositories, username)
        profile = profile_future.result()
        repositories = repositories_future.result()

    if profile is None:
        raise HTTPException(
            status_code=404,
            detail="GitHub user not found."
        )

    if repositories is None:
        raise HTTPException(
            status_code=404,
            detail="Repositories could not be fetched."
        )
    language_analysis = analyze_languages(repositories)


    repository_statistics = calculate_repository_statistics(
            repositories
        )

    repository_growth = calculate_repository_growth(
            repositories
        )

    repository_activity = calculate_repository_activity(
            repositories
        )

    repository_health = calculate_repository_health(
            repositories
        )

    with ThreadPoolExecutor(max_workers=2) as executor:
        commit_statistics_future = executor.submit(
            get_commit_statistics, username, repositories
        )
        contribution_calendar_future = executor.submit(
            get_contribution_calendar, username)
        commit_statistics = commit_statistics_future.result()
        contribution_calendar = contribution_calendar_future.result()

    impact_score = calculate_impact_score(
    profile,
    repositories,
    language_analysis,
    repository_health,
    repository_activity,
)
    developer_insights = generate_developer_insights(
            profile,
            repositories,
            language_analysis,
            repository_statistics,
            repository_activity
        )



    report = {
            "profile": profile,
            "repositories": repositories,
            "language_analysis": language_analysis,
            "impact_score": impact_score,
            "repository_statistics": repository_statistics,
            "repository_growth": repository_growth,
            "repository_activity": repository_activity,
            "repository_health": repository_health,
            "commit_statistics": commit_statistics,
            "contribution_calendar": contribution_calendar,
            "developer_insights": developer_insights
        }

    cache_analytics(username, report)
    return report
