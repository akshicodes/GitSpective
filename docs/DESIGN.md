# 🎨 GitSpective — Frontend Design System & UI Specification

Version: 1.0
Status: UI Planning
Author: Sonakshi Sutradhar

---

# Vision

GitSpective should not feel like another GitHub profile viewer.

It should feel like a premium SaaS analytics platform that transforms a GitHub profile into a visual story.

Users should experience:

> Search → Analysis → Insights → Actionable Recommendations

instead of simply browsing profile information.

The design philosophy is inspired by modern SaaS products like Linear, Vercel, Arc Browser, Notion, and Raycast while maintaining its own colorful identity.

---

# Design Principles

### 1. Clean

Minimal UI with generous whitespace.

Never overload a screen.

---

### 2. Premium

Every component should feel polished.

Use:

- Glass Morphism
- Soft shadows
- Smooth gradients
- Large rounded corners
- Modern typography
- Micro interactions

---

### 3. Data First

The UI exists to explain GitHub data.

Every graph and card should answer a question.

---

### 4. Storytelling

Instead of dumping numbers, every page should tell a story.

Dashboard

↓

Who is this developer?

Repositories

↓

How healthy are their projects?

Analytics

↓

What do the numbers actually mean?

---

# Visual Identity

## Theme

Modern SaaS

Glass Morphism

Dark Theme

Gradient Lighting

Colorful Accents

---

# Color Palette

## Background

#0F0B1A

---

## Card Background

rgba(255,255,255,0.08)

---

## Glass Border

rgba(255,255,255,0.15)

---

## Accent Colors

Primary Blue

#96B6DD

Primary Pink

#EA4C89

Primary Purple

#9D4EF4

Dark Purple

#261E3B

---

## Text

Primary

#FFFFFF

Secondary

#C9CBD5

Muted

#8F92A1

---

# Typography

## Headings

Space Grotesk

Fallback

Inter

---

## Body

Inter

---

# Border Radius

Cards

24px

Buttons

18px

Inputs

18px

Profile Images

Circular

---

# Shadows

Soft Shadows Only

No harsh shadows.

Use layered shadows with blur.

---

# Background Design

The landing page should not have a flat background.

Instead use:

Large blurred gradient blobs.

Composition

Blue Blob

Pink Blob

Purple Glow

Noise Overlay

This creates depth without distraction.

---

# Landing Page

Purpose

Welcome users.

Encourage them to analyze any GitHub profile.

---

## Layout

Centered Hero

Contains

GitHub Logo

↓

GitSpective

↓

GitHub Profile Analytics

↓

Headline

↓

Subtitle

↓

Search Bar

---

## Headline

Primary

A New Perspective on GitHub

Alternative

Know Your GitHub.

Beyond Stars.
Beyond Followers.

Alternative

Every Repository
Tells a Story.

---

## Subtitle

Your GitHub,
Explained Beautifully.

---

## Search Component

Large rounded glass search bar.

Contains

Search Icon

Username Input

Analyze Button

Button uses

Pink → Purple gradient.

---

# Navigation

Once analysis begins:

Top Navigation

Viewing Profile

@

username

----------------------------------

Dashboard

Repositories

Analytics

---

# Application Pages

Landing Page

↓

Dashboard

↓

Repositories

↓

Analytics

---

# Dashboard

Purpose

Answer

Who is this developer?

---

## Section 1

Profile Card

Displays

Avatar

Full Name

Username

Bio

Location

Company

Website

Joined Date

GitHub Profile Button

---

## Section 2

Quick Stats

Cards

Followers

Following

Public Repositories

---

## Section 3

Developer Insights

Large horizontal card.

Displays

Primary Insight

Suggestions

Improvement Recommendations

---

## Section 4

Impact Score

Displays

Overall Score

Impact Level

Summary

Example

51

Developing

An emerging developer building projects consistently...

---

# Repositories Page

Purpose

Answer

How good are this developer's repositories?

---

## Section 1

Repository Summary

Cards

Total Repositories

Original

Forked

Archived

Stars

Forks

---

## Section 2

Repository Health Leaderboard

Shows

Top repositories ranked by

Health Score

Descending

---

## Section 3

Repository Cards

Each repository card contains

Repository Name

Description

Language

Stars

Forks

Topics

Homepage

License

Last Updated

Health Score

Health Status

Strengths

Suggestions

---

## Section 4

Repository Timeline

Timeline showing repository creation over years.

---

## Section 5

Repository Languages

Technology tags for every repository.

---

# Analytics Page

Purpose

Answer

What story does the data tell?

---

## Section 1

Impact Score Gauge

Large radial indicator.

Displays

Score

Level

---

## Section 2

Impact Breakdown

Horizontal progress bars.

Repository Health

Activity

Community

Technology Diversity

Repository Portfolio

---

## Section 3

Language Distribution

Pie Chart

Uses

Language Analysis

---

## Section 4

Repository Growth

Bar Chart

Year-wise repository creation.

---

## Section 5

Repository Activity

Displays

Activity Level

Maintenance Consistency

Last Updated

Active Repositories

Inactive Repositories

Summary

---

## Section 6

Developer Insights

Displays

Developer Type

Primary Insight

Secondary Insights

Improvements

Summary

---

## Section 7

Repository Health Distribution

Chart showing

Excellent

Very Good

Good

Developing

Getting Started

---

## Section 8

Recommendation Summary

Aggregate all repository suggestions.

Example

Add LICENSE

Add Homepage

Improve Documentation

Add Topics

---

# Component Hierarchy

App

│

Landing Page

│

Dashboard

├── ProfileCard

├── QuickStats

├── DeveloperInsights

├── ImpactScore

│

Repositories

├── RepositorySummary

├── HealthLeaderboard

├── RepositoryCards

├── RepositoryTimeline

│

Analytics

├── ImpactGauge

├── BreakdownChart

├── LanguageChart

├── GrowthChart

├── ActivityCard

├── HealthDistribution

├── RecommendationPanel

---

# Animations

Landing

Fade Up

Scale

Slide

Dashboard

Cards animate sequentially.

Charts animate when loaded.

Buttons slightly scale on hover.

Background blobs float slowly.

Transitions should be subtle.

---

# UX Flow

Landing

↓

Enter Username

↓

Analyze

↓

Loading Animation

↓

Dashboard

↓

Repositories

↓

Analytics

---

# Responsive Design

Desktop

3-column layout.

Tablet

2-column layout.

Mobile

Single-column layout.

Navigation collapses into a menu.

---

# Design Goals

The application should feel:

✓ Modern

✓ Premium

✓ Minimal

✓ Intelligent

✓ Fast

✓ Interactive

✓ Professional

The first impression should be:

"This looks like a real SaaS product."

instead of

"This looks like a student dashboard."

---

# Future Enhancements

Dark / Light Mode

Search History

Compare Two GitHub Profiles

Export PDF Report

Animated Score Evolution

Repository Filtering

Repository Search

Share Analytics

Live Deployment

User Authentication

Saved Reports

---

# Final Design Philosophy

GitSpective is not a GitHub profile viewer.

It is a GitHub Intelligence Platform.

Instead of displaying data, it explains data.

Instead of showing repositories, it evaluates them.

Instead of counting stars, it measures developer impact.