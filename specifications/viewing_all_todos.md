# US-02 Specification — View All Todos

## What This Feature Is
User lands on the page and immediately sees all todos listed newest first, with a live summary counter and an empty state if none exist.

---

## The Full User Journey

1. Browser loads the single HTML page and immediately fires `GET /api/todos?page=0&size=10&sort=createdAt,desc`.
2. While the request is in flight, a loading spinner appears in the list area.
3. On success, the list renders with each row showing: title, status badge (`Pending` / `Completed`), and created date.
4. The summary counter at the top shows `X pending · Y completed` based on the returned data.
5. If no todos exist, the list area shows "No todos yet — add one above!" instead of an empty list.
6. If more than 10 todos exist, pagination controls appear at the bottom — Previous / Page X of Y / Next.
7. User clicks "Next" or "Previous" to navigate pages — a new request fires with the updated `page` param.
8. On network or server failure, the list area shows a red error banner with "Failed to load todos. Please refresh."

---

## Edge Cases

| Scenario | Behaviour |
|----------|-----------|
| No todos in the database | Empty-state message shown instead of the list |
| Only 1 page of results | Pagination controls are hidden |
| User refreshes the page | Full list reloads from scratch via the same GET request |
| Server returns 500 | Error banner shown, spinner cleared, no list rendered |
| Very long title | Title truncates with `…` — full title visible on hover (tooltip) |

---

## What the Backend Does

- Accepts `page`, `size`, and `sort` query params with sensible defaults (`page=0`, `size=10`, `sort=createdAt,desc`).
- Returns a paginated response containing: `content[]`, `totalElements`, `totalPages`, `currentPage`.
- Each todo in `content` includes: `id`, `title`, `description`, `status`, `createdAt`, `updatedAt`.

---

## Definition of Done

- [ ] List loads automatically on page open with no user action required.
- [ ] Todos are ordered newest first by default.
- [ ] Each row shows title, status badge, and created date.
- [ ] Summary counter reflects accurate pending and completed counts.
- [ ] Empty state message shows when no todos exist.
- [ ] Pagination controls appear only when there is more than one page.
- [ ] Navigating pages fires a new request and re-renders the list.
- [ ] Load failure shows a non-destructive error banner.