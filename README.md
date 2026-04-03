# 📝 Todo App — Full Learning Plan

> **Stack:** Plain HTML + CSS + JavaScript (Frontend) · Spring Boot + Spring Data JPA (Backend) · PostgreSQL (Database)

---

## 📚 Table of Contents

- [Project Overview](#project-overview)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Project Setup](#project-setup)
- [Running the Project](#running-the-project)
- [Module Structure](#module-structure)
- [The 12 Phases](#the-12-phases)
- [Module 1: Core Todo (CRUD)](#module-1-core-todo-crud)
  - [Phase 1 — Requirements](#phase-1--requirements)
  - [Phase 2 — UX](#phase-2--ux)
  - [Phase 3 — Architecture Planning](#phase-3--architecture-planning)
  - [Phase 4 — Database Design](#phase-4--database-design)
  - [Phase 5 — Fine-grained Models](#phase-5--fine-grained-models)
  - [Phase 6 — Coarse-grained APIs](#phase-6--coarse-grained-apis)
  - [Phase 7 — API Unit Tests](#phase-7--api-unit-tests)
  - [Phase 8 — Basic UI Layout](#phase-8--basic-ui-layout)
  - [Phase 9 — Styling](#phase-9--styling)
  - [Phase 10 — UI Components](#phase-10--ui-components)
  - [Phase 11 — UI Unit Tests](#phase-11--ui-unit-tests)
  - [Phase 12 — Deploying the App](#phase-12--deploying-the-app)

---

## Project Overview

A full-stack Todo application built from scratch as a structured learning project. Every feature is developed module by module, each following the same 12-phase engineering discipline — from requirements through deployment.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | HTML, CSS, JavaScript |
| Build Tool | Vite |
| CSS Framework | Tailwind CSS |
| Icons | Font Awesome |
| Font | Inter (Google Fonts) |
| Backend | Java, Spring Boot |
| ORM | Spring Data JPA + Hibernate |
| Database | PostgreSQL |
| Build Tool | Maven |

---

## Prerequisites

Make sure the following are installed on your system before running the project.

### 1. Java 21
Check if installed:
```bash
java -version
```
If not installed, download from [adoptium.net](https://adoptium.net) and install Java 21 (LTS).

### 2. Node.js (v18 or higher)
Check if installed:
```bash
node -v
npm -v
```
If not installed, download from [nodejs.org](https://nodejs.org) (LTS version).

### 3. PostgreSQL (v15 or higher)
Check if installed:
```bash
psql --version
```
If not installed, download from [postgresql.org/download](https://www.postgresql.org/download) and install it. During installation:
- Set a password for the `postgres` user — **write this down**
- Keep the default port `5432`

### 4. Git
Check if installed:
```bash
git --version
```
If not installed, download from [git-scm.com](https://git-scm.com).

---

## Project Setup

### Step 1 — Clone the repository
```bash
git clone <your-repo-url>
cd Taskzen
```

### Step 2 — Create the database
Connect to PostgreSQL:

**Windows:**
```bash
& "C:\Program Files\PostgreSQL\17\bin\psql.exe" -U postgres
```

**Mac / Linux:**
```bash
psql -U postgres
```

Then create the database:
```sql
CREATE DATABASE taskzen;
\q
```

### Step 3 — Configure the database connection
Open `src/main/resources/application.properties` and update with your credentials:
```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/taskzen
spring.datasource.username=postgres
spring.datasource.password=YOUR_POSTGRES_PASSWORD
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
```
Replace `YOUR_POSTGRES_PASSWORD` with the password you set during PostgreSQL installation.

### Step 4 — Install frontend dependencies
```bash
cd frontend
npm install
```

---

## Running the Project

You need **two terminals** running at the same time.

### Terminal 1 — Start the backend (Spring Boot)

Navigate to the project root:

**Windows:**
```bash
cd Taskzen
.\mvnw.cmd spring-boot:run
```

**Mac / Linux:**
```bash
cd Taskzen
./mvnw spring-boot:run
```

Wait until you see:
```
Started TaskzenApplication in X seconds
```

Spring Boot runs on `http://localhost:8080`

### Terminal 2 — Start the frontend (Vite)

```bash
cd Taskzen/frontend
npm run dev
```

Vite runs on `http://localhost:5173`

### Open the app
Visit `http://localhost:5173` in your browser.

> **Note:** The frontend at `5173` automatically proxies all `/api/...` calls to Spring Boot at `8080` via `vite.config.js` — no CORS issues during development.

---

## Building for Production

To build the frontend and serve everything from Spring Boot on a single port:

```bash
cd frontend
npm run build
```

This compiles the frontend and drops the output into `src/main/resources/static/`. Then run Spring Boot and visit `http://localhost:8080`.

---

## Project Structure

```
Taskzen/
├── frontend/                          ← Vite frontend
│   ├── src/
│   │   ├── main.js                    ← JavaScript entry point
│   │   └── style.css                  ← Tailwind CSS styles
│   ├── index.html                     ← Main HTML file
│   ├── vite.config.js                 ← Vite config + API proxy
│   └── package.json
│
├── src/                               ← Spring Boot backend
│   └── main/
│       ├── java/com/taskzen/demo/
│       │   ├── TaskzenApplication.java
│       │   ├── TodoController.java
│       │   ├── TodoRepository.java
│       │   ├── Todo.java
│       │   └── DateTimeController.java
│       └── resources/
│           ├── application.properties ← DB config
│           └── static/                ← Production build output (auto-generated)
│
├── specifications/                    ← User story specs
├── pom.xml                            ← Maven dependencies
└── README.md
```

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/todos?sort=newest` | Get all todos (sorted) |
| `POST` | `/api/todos` | Create a new todo |
| `DELETE` | `/api/todos/{id}` | Delete a todo |
| `PATCH` | `/api/todos/{id}/toggle` | Toggle todo status |
| `PATCH` | `/api/todos/complete-all` | Mark all todos complete |
| `DELETE` | `/api/todos/delete-all` | Delete all todos |
| `GET` | `/api/datetime` | Get current day, date and time |

---

## Module Structure

| Module | Feature Area | Status |
|--------|-------------|--------|
| Module 1 | Core Todo (CRUD) | 🔄 In Progress |
| Module 2 | User Authentication | ⏳ Planned |
| Module 3 | Categories & Tags | ⏳ Planned |
| Module 4 | Due Dates & Reminders | ⏳ Planned |

---

## The 12 Phases

Every module follows these 12 phases in order:

| # | Phase | Deliverables |
|---|-------|-------------|
| 1 | **Requirements** | User stories, acceptance criteria, business rules |
| 2 | **UX** | User flows, screen inventory, wireframe descriptions, interaction notes |
| 3 | **Architecture Planning** | Component diagram, data flow, tech decisions, dependencies |
| 4 | **Database Design** | Tables, columns, types, constraints, indexes, relationships |
| 5 | **Fine-grained Models** | JPA entities, enums, embeddables, audit fields, validation annotations |
| 6 | **Coarse-grained APIs** | Endpoint contracts, request/response DTOs, pagination, error format |
| 7 | **API Unit Tests** | Service mocks, repository tests, edge cases, error paths |
| 8 | **Basic UI Layout** | Page skeleton, responsive grid, navigation |
| 9 | **Styling** | Bootstrap theme tokens, SCSS, responsive breakpoints |
| 10 | **UI Components** | Forms, tables, cards, alerts, loading states |
| 11 | **UI Unit Tests** | Component render tests, user interaction, mock API responses |
| 12 | **Deploying the App** | Build scripts, env configs, health checks, migration strategy |

---

## Module 1: Core Todo (CRUD)

---

### Phase 1 — Requirements

#### 1.1 User Stories

| ID | As a… | I want to… | So that… |
|----|-------|-----------|----------|
| US-01 | User | Create a new todo item with a title | I can track things I need to do |
| US-02 | User | View a list of all my todos | I can see everything at a glance |
| US-03 | User | View a single todo's details | I can read the full description |
| US-04 | User | Edit a todo's title or description | I can correct or update it |
| US-05 | User | Mark a todo as complete / incomplete | I can track my progress |
| US-06 | User | Delete a todo | I can remove things I no longer need |
| US-07 | User | See todos sorted by creation date (newest first) | The most recent work is visible immediately |
| US-08 | User | See how many todos are pending vs completed | I have a quick progress summary |

#### 1.2 Acceptance Criteria

**US-01 — Create Todo**
- Title is required; must be 1–255 characters
- Description is optional; max 1000 characters
- On success, the new todo appears at the top of the list
- Status defaults to `PENDING` on creation
- Duplicate titles are allowed (same title, different todo)

**US-02 — List Todos**
- Displays all todos, newest first (by `createdAt`)
- Each row shows: title, status badge, created date
- If no todos exist, a friendly empty-state message is shown
- List is paginated — default 10 items per page

**US-03 — View Single Todo**
- Shows title, description, status, createdAt, updatedAt
- If the ID does not exist, return a 404 error response

**US-04 — Edit Todo**
- Title and description can be updated
- Same validation rules as creation apply
- `updatedAt` timestamp refreshes on every save
- Status cannot be changed via the edit form (that's US-05)

**US-05 — Toggle Status**
- Status toggles between `PENDING` → `COMPLETED` → `PENDING`
- A completed todo shows a strikethrough style in the UI
- `updatedAt` refreshes on toggle

**US-06 — Delete Todo**
- User sees a confirmation prompt before deletion
- On confirm, todo is permanently removed (hard delete)
- On success, the list refreshes and shows a toast notification
- Deleting a non-existent ID returns a 404

**US-07 — Sort by Date**
- Default sort is `createdAt DESC` — no user input needed for Phase 1

**US-08 — Summary Count**
- A counter shows: `X pending · Y completed`
- Updates immediately after any create / toggle / delete action

#### 1.3 Business Rules

| ID | Rule |
|----|------|
| BR-01 | Title must not be blank or whitespace-only |
| BR-02 | Title max length: 255 characters |
| BR-03 | Description max length: 1000 characters |
| BR-04 | Status is an enum: `PENDING`, `COMPLETED` only |
| BR-05 | Default status on creation is always `PENDING` |
| BR-06 | `createdAt` is set once at creation and never modified |
| BR-07 | `updatedAt` is set at creation and updated on every change |
| BR-08 | IDs are system-generated (auto-increment Long); clients never supply them |
| BR-09 | Hard delete only — no soft delete / archive in this module |
| BR-10 | No authentication in this module — all todos are global |

#### 1.4 Out of Scope (Module 1)

- User accounts / ownership
- Due dates, priorities, tags
- Search or filtering
- Bulk operations
- Soft delete / undo

---

### Phase 2 — UX

> 🔜 Coming next — User flows, screen inventory, wireframe descriptions, interaction notes

---

### Phase 3 — Architecture Planning

> ⏳ Planned — Component diagram, data flow, tech decisions, dependencies

---

### Phase 4 — Database Design

> ⏳ Planned — Tables, columns, types, constraints, indexes, relationships

---

### Phase 5 — Fine-grained Models

> ⏳ Planned — JPA entities, enums, embeddables, audit fields, validation annotations

---

### Phase 6 — Coarse-grained APIs

> ⏳ Planned — Endpoint contracts, request/response DTOs, pagination, error format

---

### Phase 7 — API Unit Tests

> ⏳ Planned — Service mocks, repository tests, edge cases, error paths

---

### Phase 8 — Basic UI Layout

> ⏳ Planned — Page skeleton, responsive grid, navigation

---

### Phase 9 — Styling

> ⏳ Planned — Bootstrap theme tokens, SCSS, responsive breakpoints

---

### Phase 10 — UI Components

> ⏳ Planned — Forms, tables, cards, alerts, loading states

---

### Phase 11 — UI Unit Tests

> ⏳ Planned — Component render tests, user interaction, mock API responses

---

### Phase 12 — Deploying the App

> ⏳ Planned — Build scripts, env configs, health checks, migration strategy

---

*This README is a living document — each phase will be filled in as it is completed.*