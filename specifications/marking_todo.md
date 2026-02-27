# US-05 Specification — Mark a Todo Complete / Incomplete

## What This Feature Is
User toggles a todo's status between `PENDING` and `COMPLETED` directly from the list or detail view — no edit form required.

---

## The Full User Journey

1. User sees the todo list, each row showing a status badge (`Pending` or `Completed`) and a toggle button (e.g. a checkbox or "Mark Complete" / "Mark Incomplete" button).
2. User clicks the toggle button on any todo row.
3. Button enters a brief loading state (spinner or disabled) to prevent double-clicks.
4. `PATCH /api/todos/{id}/toggle` is sent — no request body needed, the backend flips the status automatically.
5. On success, the status badge on that row updates instantly (`Pending` → `Completed` or vice versa).
6. A completed todo's title renders with a strikethrough style; an incomplete todo renders normally.
7. The summary counter updates immediately to reflect the new pending and completed counts.
8. A toast notification appears — "Marked as completed!" or "Marked as pending!" — and auto-dismisses after 3 seconds.
9. On failure, the toggle reverts to its previous state and a red error banner says "Something went wrong. Please try again."

---

## Edge Cases

| Scenario | Behaviour |
|----------|-----------|
| User double-clicks the toggle | Second click is ignored while the first request is in flight |
| Todo deleted before toggle completes | Backend returns `404`; error banner shows "This todo no longer exists." |
| Network failure | Toggle reverts visually, error banner shown, no state change persisted |
| Toggling a `COMPLETED` todo | Status flips back to `PENDING`, strikethrough removed, counter updates |

---

## What the Backend Does

- Accepts `id` as a path variable: `PATCH /api/todos/{id}/toggle`.
- Reads the current status and flips it: `PENDING` → `COMPLETED`, `COMPLETED` → `PENDING`.
- Updates `updatedAt` to the current UTC time.
- Returns `200 OK` with the full updated todo object.
- Returns `404 Not Found` if the ID does not exist.

---

## Definition of Done

- [ ] Toggle button is visible on every todo row in the list.
- [ ] Clicking the toggle fires `PATCH /api/todos/{id}/toggle` with no body.
- [ ] Status badge updates instantly on success without a page reload.
- [ ] Completed todos show a strikethrough title; incomplete todos show normal title.
- [ ] Summary counter updates immediately after every toggle.
- [ ] Toast appears with the correct message and auto-dismisses after 3 seconds.
- [ ] Double-clicks are safely ignored while the request is in flight.
- [ ] Network or server errors revert the visual state and show an error banner.