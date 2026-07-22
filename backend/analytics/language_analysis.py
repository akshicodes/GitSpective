from collections import Counter


def analyze_languages(repositories):

    language_counter = Counter()

    for repo in repositories:

        language = repo.get("language")

        if language:
            language_counter[language] += 1

    return dict(language_counter)