# 🚀 Backend API Endpoints

This document describes the REST API endpoints available in the **GitSpective** backend.

> **Base URL**
>
> ```
> http://localhost:8000
> ```

---

# 1. Profile API

### Endpoint

```http
GET /profile/{username}
```

### Description

Fetches the basic GitHub profile information of a user.

### Returns

- Name
- Username
- Avatar
- Bio
- Followers
- Following
- Public Repositories
- Company
- Location
- Website
- Joined Date

---

# 2. Repository API

### Endpoint

```http
GET /repositories/{username}
```

### Description

Retrieves all public repositories of a GitHub user along with repository metadata.

### Returns

- Repository Name
- Description
- Language
- Stars
- Forks
- Topics
- License
- Homepage
- Watchers
- Created Date
- Updated Date
- Repository Status

---

# 3. Language Analysis API

### Endpoint

```http
GET /languages/{username}
```

### Description

Analyzes the programming languages used across all repositories.

### Returns

- Language Distribution
- Technology Usage Count

---

# 4. Repository Statistics API

### Endpoint

```http
GET /repository-statistics/{username}
```

### Description

Provides overall repository statistics for the user.

### Returns

- Total Repositories
- Original Repositories
- Forked Repositories
- Archived Repositories
- Total Stars
- Total Forks
- Average Stars
- Average Forks
- Most Starred Repository
- Most Forked Repository

---

# 5. Repository Growth API

### Endpoint

```http
GET /repository-growth/{username}
```

### Description

Shows repository creation growth over the years.

### Returns

- Year-wise Repository Count

---

# 6. Repository Activity API

### Endpoint

```http
GET /repository-activity/{username}
```

### Description

Analyzes repository maintenance and development activity.

### Returns

- Activity Level
- Maintenance Consistency
- Active Repositories
- Inactive Repositories
- Last Activity
- Activity Summary

---

# 7. Repository Health API

### Endpoint

```http
GET /repository-health/{username}
```

### Description

Evaluates each repository and assigns a custom health score based on documentation, maintenance, and quality indicators.

### Returns

For every repository:

- Health Score
- Health Status
- Strengths
- Improvement Suggestions
- Score Breakdown

---

# 8. Impact Score API

### Endpoint

```http
GET /impact-score/{username}
```

### Description

Calculates a custom GitHub Impact Score using multiple analytics metrics.

### Returns

- Overall Impact Score
- Impact Level
- Score Summary
- Score Breakdown
- Community Metrics
- Repository Metrics

---

# 9. Developer Insights API

### Endpoint

```http
GET /developer-insights/{username}
```

### Description

Generates human-readable insights about the developer based on repository activity and profile analytics.

### Returns

- Developer Type
- Primary Insight
- Secondary Insights
- Improvement Suggestions
- Personalized Summary

---

# 10. Unified Analytics API ⭐

### Endpoint

```http
GET /analytics/{username}
```

### Description

Returns the complete analytics report in a single API call.

This endpoint aggregates all analytics modules and is the recommended endpoint for the frontend dashboard.

### Returns

- Profile Information
- Repository List
- Language Analysis
- Repository Statistics
- Repository Growth
- Repository Activity
- Repository Health
- Impact Score
- Developer Insights

---

# Recommended Frontend Endpoint

For building the frontend dashboard, use:

```http
GET /analytics/{username}
```

This endpoint provides all required data in one response, eliminating the need for multiple API requests and simplifying frontend integration.