# 📝 Todo App — Full Learning Plan

> **Stack:** Plain HTML + CSS + JavaScript (Frontend) · Spring Boot + Spring Data JPA (Backend) · PostgreSQL (Database)

---

## 📚 Table of Contents

- [Project Overview](#project-overview)
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