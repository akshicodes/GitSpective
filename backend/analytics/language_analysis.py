def analyze_languages(repositories): #Counting how many repositories use each programming language.


    language_count = {}

    for repo in repositories:

        language = repo["language"]

        if language is None:
            continue

        if language in language_count:
            language_count[language] += 1

        else:
            language_count[language] = 1

    return language_count