def calculate_repository_growth(repositories):

    growth = {}

    for repo in repositories:

        year = repo["created_at"][:4]

        if year in growth:
            growth[year] += 1
        else:
            growth[year] = 1

    growth = dict(sorted(growth.items()))

    return growth