# 🚀 GitHub Developer Analytics

> Transform any GitHub profile into meaningful developer insights through intelligent analytics, repository health scoring, impact measurement, and interactive visualizations.


---

## 📖 Overview

GitHub Developer Analytics is a full-stack analytics platform that fetches public GitHub data and converts it into actionable developer insights.

Instead of only displaying profile information, the application evaluates repository quality, developer activity, technology diversity, community engagement, and overall impact using a custom analytics engine.

The backend has been fully implemented using **FastAPI**, while the frontend dashboard is currently under development using **React**.

---

## ✨ Current Features (Backend)

### 👤 Profile Analysis
- Fetch GitHub profile information
- Avatar, bio, followers & following
- Public repository count
- Company, location & website
- Account creation date

---

### 📂 Repository Analysis
- Fetch all public repositories
- Repository language
- Stars & forks
- Topics
- License
- Homepage
- Watchers
- Repository status
- Created & updated dates

---

### 💻 Language Analysis
- Programming language distribution
- Technology diversity calculation
- Primary language identification

---

### 📊 Repository Statistics
- Total repositories
- Original repositories
- Forked repositories
- Archived repositories
- Total stars
- Total forks
- Average stars
- Average forks
- Most starred repository
- Most forked repository

---

### 📈 Repository Growth
Analyze repository creation over time.

Example:

```json
{
    "2024": 4,
    "2025": 9,
    "2026": 5
}
```

---

### 🔥 Repository Activity
Evaluate overall development consistency.

Metrics include:

- Activity level
- Active repositories
- Inactive repositories
- Maintenance consistency
- Last activity
- Activity summary

---

### ❤️ Repository Health Score

Each repository receives a health score based on:

- Documentation
- Maintenance
- Community engagement
- Code quality indicators

Example:

```
Health Score : 65

Strengths
✔ Description
✔ Topics
✔ Active Maintenance

Suggestions
• Add Homepage
• Add LICENSE
• Improve Community Reach
```

---

### 🎯 Impact Score

A custom scoring algorithm evaluates overall GitHub influence using:

- Repository Health
- Development Activity
- Community Engagement
- Technology Diversity
- Repository Portfolio

Example:

```
Impact Score
━━━━━━━━━━━━━━
Repository Health     19
Activity              25
Community              1
Technology             2
Portfolio              4

Overall Score         51
```

---

### 💡 Developer Insights

Automatically generates:

- Developer Type
- Primary Strength
- Secondary Insights
- Improvement Suggestions
- Personalized Summary

Example:

```
Developer Type
Emerging Developer

Primary Insight
Highly Active Maintainer

Suggestion
Increase community engagement.
```

---

### 🌐 Unified Analytics API

A single endpoint returns complete analytics.

```
GET /analytics/{username}
```

Returns:

- Profile
- Repository List
- Language Analysis
- Repository Statistics
- Repository Growth
- Repository Activity
- Repository Health
- Impact Score
- Developer Insights

---

# 🛠 Tech Stack

## Backend

- Python
- FastAPI
- Requests
- GitHub REST API
- Uvicorn

## Frontend (In Progress)

- React
- Vite
- Axios
- Tailwind CSS
- Recharts / Chart.js *(planned)*

---

# 📁 Project Structure

```
GitHub-Developer-Analytics/
│
├── backend/
│   ├── analytics/
│   ├── routes/
│   ├── services/
│   └── main.py
│
├── frontend/      🚧
│
├── README.md
├── PRD.md
└── ARCHITECTURE.md
```

---

# 🚀 API Endpoints

| Method | Endpoint | Description |
|----------|-------------------------------|---------------------------|
| GET | `/profile/{username}` | GitHub Profile |
| GET | `/repositories/{username}` | Repository Details |
| GET | `/languages/{username}` | Language Analysis |
| GET | `/repository-statistics/{username}` | Repository Statistics |
| GET | `/repository-growth/{username}` | Repository Growth |
| GET | `/repository-activity/{username}` | Activity Analysis |
| GET | `/repository-health/{username}` | Repository Health |
| GET | `/impact-score/{username}` | Impact Score |
| GET | `/developer-insights/{username}` | AI-like Insights |
| GET | `/analytics/{username}` | Complete Analytics |

---


# 🧠 Why This Project?

Most GitHub profile viewers only display profile information.

This project goes further by analyzing repositories and generating meaningful developer insights, making it useful for:

- Students
- Recruiters
- Hiring Managers
- Open Source Contributors
- Developers looking to evaluate their GitHub profile

---

# 🏗 Current Progress

| Module | Status |
|---------|--------|
| Backend API | ✅ Complete |
| Analytics Engine | ✅ Complete |
| Impact Score | ✅ Complete |
| Repository Health | ✅ Complete |
| Developer Insights | ✅ Complete |
| Frontend Dashboard | 🚧 In Progress |
| Charts & Visualizations | 🚧 In Progress |
| Deployment | ⏳ Planned |

---


## ⭐ If you like this project...

Consider giving it a **star** to support the project and future development!

> **⚠️ Project Status:** Backend Complete ✅ | Frontend Dashboard In Progress 🚧