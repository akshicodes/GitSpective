# GitSpective

> Turn a public GitHub profile into a clear, visual developer story.

GitSpective is a full-stack GitHub analytics dashboard that goes beyond profile viewing. Enter a GitHub username and the app collects public data, evaluates repository quality and activity, calculates a composite impact score, and presents practical strengths and opportunities in a polished responsive interface.

## Project overview

A GitHub profile contains useful signals, but raw stars, repository counts, and commit history are hard to interpret in isolation. GitSpective brings those signals together into an opinionated analytics experience for developers, recruiters, and technical communities.

The project combines a React analytics dashboard with a FastAPI service layer and reusable Python analytics modules. The frontend is built for exploration; the backend is built for clear separation of data retrieval, analysis, and API delivery.

## What it delivers

- Search and analyse any public GitHub username.
- Profile summary with followers, repositories, stars, and activity indicators.
- Repository health ranking based on documentation, maintenance, and community signals.
- Custom impact score with an interpretable score breakdown.
- Language distribution, technology diversity, and repository portfolio statistics.
- Activity and maintenance consistency analysis.
- Rule-based developer style, strengths, and growth opportunities.
- A year-selectable GitHub contribution graph, including totals and daily hover details.
- Responsive dashboard, repository, and analytics views with motion and visual hierarchy.

## Features

| Area | Highlights |
| --- | --- |
| Profile intelligence | Avatar, bio, social metrics, company, location, website, and account history |
| Repository analytics | Public repository inventory, stars, forks, licensing, topics, activity, and status |
| Repository health | Per-repository health score, strengths, suggestions, and health leaderboard |
| Activity analysis | Active versus inactive repositories, maintenance consistency, last activity, and summary |
| Impact scoring | Composite score built from health, activity, community, technology diversity, and portfolio factors |
| Developer insights | Developer style, summary, strengths, and actionable improvement opportunities |
| Contribution history | Interactive year selector, annual totals, and GitHub-style contribution heatmap |
| Portfolio snapshot | Top repositories, documentation coverage, archived/forked repository counts, and average health |

## Technology stack

| Layer | Technologies |
| --- | --- |
| Frontend | React 19, Vite, React Router, Tailwind CSS, Framer Motion |
| Data visualisation | Recharts, custom contribution heatmap |
| UI | Lucide React icons, responsive glassmorphism design system |
| Backend | Python, FastAPI, Uvicorn, Pydantic |
| Data access | Requests, GitHub REST API, GitHub GraphQL API for contribution calendars |
| Configuration | python-dotenv, environment variables |
| Tooling | npm, oxlint, Vite production builds |

## Application architecture

```text
GitHub username
      |
      v
React + Vite frontend  ----->  FastAPI API layer
                                      |
                                      v
                           GitHub service (REST / GraphQL)
                                      |
                                      v
                     Reusable analytics modules and score calculators
                                      |
                                      v
                         Unified analytics response for the dashboard
```

## Frontend structure

```text
frontend/
├── src/
│   ├── components/          # Reusable UI: profile, stats, insights, analytics, navigation
│   ├── context/             # Shared analytics state
│   ├── pages/               # Landing, Dashboard, Repositories, Repository, Analytics
│   ├── services/            # API client and request helpers
│   ├── App.jsx              # Routes and page composition
│   └── index.css            # Tailwind and shared visual styles
├── package.json
└── vite.config.js
```

The frontend uses a contextual analytics store so data fetched after a username search can be shared across the Dashboard, Repositories, and Analytics routes. Components are deliberately separated by responsibility to keep the visual system reusable and the pages easy to extend.

## Backend structure

```text
backend/
├── analytics/               # Pure analysis and scoring modules
│   ├── developer_insights.py
│   ├── impact_score.py
│   ├── language_analysis.py
│   ├── repository_activity.py
│   ├── repository_growth.py
│   ├── repository_health.py
│   └── repository_statistics.py
├── routes/                  # Focused FastAPI route handlers
├── services/
│   └── github_service.py    # GitHub REST/GraphQL integration and pagination
├── models/                  # API-facing data models
├── requirements.txt
└── main.py                  # App bootstrap, CORS, and router registration
```

The backend keeps GitHub retrieval separate from analytics logic. Each route can be consumed independently, while `GET /analytics/{username}` composes the full report used by the frontend.

## API endpoints

Base URL: `http://127.0.0.1:8000`

| Method | Endpoint | Purpose |
| --- | --- | --- |
| GET | `/` | API status message |
| GET | `/health` | Health check for the backend |
| GET | `/profile/{username}` | Public GitHub profile details |
| GET | `/repositories/{username}` | Public repositories and metadata |
| GET | `/languages/{username}` | Language distribution across repositories |
| GET | `/repository-statistics/{username}` | Portfolio totals, averages, stars, forks, and notable repositories |
| GET | `/repository-growth/{username}` | Year-by-year repository creation counts |
| GET | `/repository-activity/{username}` | Maintenance consistency and active/inactive repository analysis |
| GET | `/repository-health/{username}` | Per-repository health scores, strengths, and suggestions |
| GET | `/impact-score/{username}` | Composite impact score, level, and breakdown |
| GET | `/developer-insights/{username}` | Developer style, strengths, recommendations, and summary |
| GET | `/analytics/{username}` | Unified profile, repository, score, insight, commit, and contribution-calendar report |

### Example request

```bash
curl http://127.0.0.1:8000/analytics/octocat
```

For the frontend, the unified endpoint is the preferred integration point because it supplies the complete dashboard report in a single request.

## Getting started

### Prerequisites

- Python 3.10+
- Node.js 20+ and npm
- A GitHub personal access token for contribution-calendar data

### 1. Clone the repository

```bash
git clone <your-repository-url>
cd Github_Profile_Dashboard_Analysis
```

### 2. Configure and run the backend

```bash
python -m venv .venv
.venv\Scripts\activate          # Windows PowerShell
pip install -r backend/requirements.txt
```

Create `backend/.env`:

```env
GITHUB_TOKEN=your_github_personal_access_token
```

Then start FastAPI:

```bash
python -m uvicorn backend.main:app --reload
```

The API starts at `http://127.0.0.1:8000`, with interactive Swagger documentation available at `http://127.0.0.1:8000/docs`.

> The token enables GitHub GraphQL contribution calendars. Treat it as a secret and never commit `backend/.env`.

### 3. Run the frontend

```bash
cd frontend
npm install
npm run dev
```

Open the Vite URL shown in the terminal (normally `http://localhost:5173`).

### Frontend commands

```bash
npm run dev       # Start the development server
npm run build     # Create an optimised production build
npm run lint      # Lint the frontend source
npm run preview   # Preview the production build
```

## Why this project matters

GitSpective is designed to solve a real communication problem: a GitHub profile is rich in evidence, but difficult to read quickly. It turns that evidence into a clear conversation starter.

- **For developers:** identify strengths, portfolio gaps, and projects worth improving.
- **For recruiters and hiring teams:** quickly understand activity, project quality, technical breadth, and open-source presence.
- **For students and early-career engineers:** see concrete ways to make a public portfolio more credible and complete.
- **For technical evaluators:** use focused API endpoints or the unified report in other tools and workflows.

## Resume-ready engineering highlights

- Built a full-stack product rather than a static dashboard: React client, FastAPI API, external API integration, and reusable analytics logic.
- Designed a unified analytics endpoint that composes multiple independent analysis modules into one frontend-friendly response.
- Implemented GitHub REST pagination for complete repository retrieval and GitHub GraphQL queries for contribution calendars.
- Created explainable scoring systems for repository health and developer impact instead of presenting opaque metrics.
- Delivered a responsive, data-dense UI with reusable components, route-level navigation, client-side state sharing, and subtle motion.
- Included thoughtful empty states and fallbacks for unavailable GitHub data and token-dependent contribution history.

## Roadmap

- [ ] Compare two GitHub profiles side by side
- [ ] Export analytics reports as PDF
- [ ] Add repository filtering and search
- [ ] Save or share analysis reports
- [ ] Add deployed demo and production environment configuration

## License

This project is intended as a portfolio and learning project. Add a license file before distributing or accepting external contributions.

---

If GitSpective helped you think differently about GitHub profiles, consider giving the repository a star.