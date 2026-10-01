# Instalink — REST API (Backend)

> The Node.js / Express API powering Instalink: users, posts, stories, friends, notifications, history and push delivery.

**[Salman Mohamed — Mobile Developer](https://salman-portfolio-roan.vercel.app/project/instalink)**

🔗 Frontend repo: [`<link-to-instalink-frontend-repo>`](https://github.com/salman7355/instaLink-frontend)

---

## Table of Contents

1. [Overview](#1-overview)
2. [Tech Stack](#2-tech-stack)
3. [Features](#3-features)
4. [The Process](#4-the-process-how-i-built-it)
5. [What I've Learned](#5-what-ive-learned)
6. [How It Can Be Improved](#6-how-it-can-be-improved)
7. [Running the Project](#7-running-the-project)
8. [Project Video](#8-project-video)

---

## 1. Overview

This is the backend for the Instalink mobile app. The mobile client sends requests to an **Express server**, which mounts a **route aggregator** that dispatches each request to the right feature module. Each module follows a **Routes → Controller → Service** layering, and services persist data to **PostgreSQL**. Notifications are stored in the database and delivered to devices through the **Expo Push Service**.

### Architecture

![Instalink backend architecture](./docs/instalinkBE.png)



### Project layers

| Layer | Modules |
| --- | --- |
| **API Entry** | Express server (`index.mjs`), route aggregator (`routes/index.mjs`) |
| **Identity** | User routes → user controller → user service |
| **Social Content** | Post, Story and Friend routes / controllers / services |
| **Engagement** | Notification and History routes / controllers / services |
| **External Services** | Notification sender (`Notification.mjs`) → Expo Push Service |
| **Persistence** | PostgreSQL via `db.mjs` |

---

## 2. Tech Stack

- **Node.js** with **ES Modules** (`.mjs`)
- **Express** for routing and HTTP handling
- **PostgreSQL** as the primary database (connection in `db.mjs`)
- **Expo Push Notifications** (Expo Push Service) for mobile push delivery
- Layered architecture: **Routes → Controllers → Services**

---

## 3. Features

**Identity**
- User routes, controller and service for account and profile data
- User service is reused by other modules to *load actors* (the user performing an action) when building notifications

**Social content**
- **Posts** – create, read and write posts; post logic lives in `postService.mjs`
- **Stories** – story routes, controller and service
- **Friends** – friend routes, controller and service (friend actions)
- Post and friend actions load the acting user(s) and **record notifications**, then **send pushes**

**Engagement**
- **Notifications** – routes, controller and service to manage and store notifications; includes a *sample push* endpoint for testing
- **History** – routes, controller and service to read and write activity history

**Push delivery**
- A dedicated notification sender hands messages to the Expo Push Service, which delivers them to devices

---

## 4. The Process (How I Built It)


1. **Set up the Express server** and a single route aggregator so every feature mounts under one entry point.
2. **Designed the PostgreSQL schema** and created a shared `db.mjs` connection module.
3. **Built the Identity module** (users) first, since other features depend on knowing the actor.
4. **Added Social Content** – posts, stories and friends, each split into routes, controller and service to keep HTTP code separate from business logic.
5. **Added Engagement** – notifications and history stored in the database.
6. **Integrated Expo push notifications** – created a notification sender and connected it to post and friend actions.
7. **Tested with the mobile client** and iterated on response shapes with the frontend.

---

## 5. What I've Learned


- Separating **routes, controllers and services** keeps code testable and easy to extend.
- A **route aggregator** makes it simple to add new features without touching the server bootstrap.
- Reusing services across modules (e.g. user service loading actors) reduces duplication, but needs care to avoid tight coupling.
- Push notifications require storing both the **notification record** and delivering the **push**, and handling failures gracefully.
- Designing relational data (users, posts, friends, notifications, history) in PostgreSQL.

---

## 6. How It Can Be Improved

- Add **authentication middleware** (JWT) and role/permission checks
- Input **validation** (e.g. Zod / Joi) and centralised error handling
- Rate limiting, helmet and CORS hardening
- **Pagination** on feeds, comments and notifications
- Background **job queue** for push delivery with retries
- **WebSockets** for real-time chat
- Automated tests (unit + integration) and CI/CD
- API documentation with **OpenAPI / Swagger**
- Database migrations tooling and indexing for performance
- Dockerize the app and database

---

## 7. Running the Project

### Prerequisites
- Node.js (LTS)
- PostgreSQL (local or hosted)
- An Expo account/project if you want to test push notifications

### Steps

```bash
# 1. Clone the repository
git clone <your-backend-repo-url>
cd instalink-backend

# 2. Install dependencies
npm install

# 3. Configure environment variables
cp .env.example .env

# 4. Create the database and run your schema/migrations
#    (add the command or SQL file you use here)

# 5. Start the server
npm run start:dev
# or: node index.mjs
```

### Environment variables

> Adjust names to match your code.

```env
PORT=3000
DATABASE_URL=postgres://<user>:<password>@<host>:5432/<database>
EXPO_ACCESS_TOKEN=   # optional, if your Expo project requires it
```


### API areas

| Prefix (adjust to your routes) | Module |
| --- | --- |
| `/users` | Identity |
| `/posts` | Posts |
| `/stories` | Stories |
| `/friends` | Friends |
| `/notifications` | Notifications (incl. sample push) |
| `/history` | History |
---

## Author

**Salman Mohamed** — Mobile Developer
🌐 [Portfolio](https://salman-portfolio-roan.vercel.app/project/instalink)
