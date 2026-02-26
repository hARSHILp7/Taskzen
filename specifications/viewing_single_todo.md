# US-03 Specification — View a Single Todo

## What This Feature Is
User clicks on a todo from the list and sees its full details — title, description, status, and both timestamps — in a detail view.

---

## The Full User Journey

1. User sees the todo list on the main page and clicks on a todo's title or a "View" button on its row.
2. The app fires `GET /api/todos/{id}` for the selected todo.
3. While the request is in flight, a loading spinner appears in the detail area.
4. On success, the detail view renders showing: title, description (or "No description" if empty), status badge, created date, and last updated date.
5. A "Back to List" button is visible, allowing the user to return to the list without a page reload.
6. If the todo ID does not exist, a friendly "Todo not found." message is shown with a "Back to List" link.
7. On network or server failure, a red error banner shows "Failed to load todo. Please try again."

---

## Edge Cases

| Scenario | Behaviour |
|----------|-----------|
| Todo has no description | Detail view shows "No description provided." in muted text |
| ID in URL does not exist | Shows "Todo not found." with a back link, no crash |
| User navigates directly to URL | App loads the detail view directly via the same GET request |
| Server returns 500 | Error banner shown, detail area cleared, back link still accessible |

---

## What the Backend Does

- Accepts the todo `id` as a path variable: `GET /api/todos/{id}`.
- Returns `200 OK` with the full todo object: `id`, `title`, `description`, `status`, `createdAt`, `updatedAt`.
- Returns `404 Not Found` with an error message if the ID does not exist.

---

## Definition of Done

- [ ] Clicking a todo in the list opens its detail view.
- [ ] Detail view shows title, description, status badge, createdAt, and updatedAt.
- [ ] Missing description shows a graceful fallback message.
- [ ] A "Back to List" button returns the user to the list without a reload.
- [ ] Non-existent ID shows a "Todo not found." message, not a crash.
- [ ] Load failure shows a non-destructive error banner.