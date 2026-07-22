from collections import Counter

def calculate_repository_growth(repositories):

    yearly_growth = Counter()
    for repo in repositories:

        created_at = repo.get("created_at")
        if not created_at:
            continue
        year = created_at[:4]
        yearly_growth[year] += 1
    return dict(sorted(yearly_growth.items()))