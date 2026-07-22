from datetime import datetime, timezone


def calculate_repository_activity(repositories):
    """
    Analyze repository maintenance activity.
    """

    today = datetime.now(timezone.utc)

    active_repositories = 0
    inactive_repositories = 0

    latest_update_days = None

    for repo in repositories:

        updated_at = repo.get("updated_at")

        if not updated_at:
            continue

        updated = datetime.strptime(
            updated_at,
            "%Y-%m-%dT%H:%M:%SZ"
        ).replace(tzinfo=timezone.utc)

        days_since_update = (today - updated).days

        if latest_update_days is None or days_since_update < latest_update_days:
            latest_update_days = days_since_update

        if days_since_update <= 90:
            active_repositories += 1
        else:
            inactive_repositories += 1

    total_repositories = active_repositories + inactive_repositories

    maintenance_consistency = (
        round((active_repositories / total_repositories) * 100)
        if total_repositories > 0
        else 0
    )

    if maintenance_consistency >= 90:
        activity_level = "Very Active"
    elif maintenance_consistency >= 70:
        activity_level = "Active"
    elif maintenance_consistency >= 50:
        activity_level = "Moderately Active"
    elif maintenance_consistency >= 25:
        activity_level = "Occasionally Active"
    else:
        activity_level = "Inactive"

    if maintenance_consistency >= 70:
        summary = (
            "Repositories are updated consistently and demonstrate active development."
        )
    elif maintenance_consistency >= 40:
        summary = (
            "Repository activity is moderate. More frequent updates would improve maintenance."
        )
    else:
        summary = (
            "Most repositories appear inactive. Regular maintenance is recommended."
        )

    return {
        "activity_level": activity_level,
        "maintenance_consistency": maintenance_consistency,

        "total_repositories": total_repositories,
        "active_repositories": active_repositories,
        "inactive_repositories": inactive_repositories,

        "last_activity_days_ago": latest_update_days,

        "summary": summary,
    }