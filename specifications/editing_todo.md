# US-04 Specification — Edit a Todo

## What This Feature Is
User opens an existing todo, changes its title or description, and saves — the updated values persist and `updatedAt` refreshes.

---

## The Full User Journey

1. User clicks an "Edit" button on a todo row in the list or on the todo's detail view.
2. The app fires `GET /api/todos/{id}` to fetch the latest values before populating the form.
3. An edit form appears pre-filled with the current title and description.
4. User edits the title, description, or both.
5. User clicks "Save Changes" or presses Enter from the title field.
6. Client validates — if title is empty/whitespace, field turns red with "Title is required." and submission stops.
7. Button changes to "Saving…" and both fields disable to prevent double-submission.
8. `PUT /api/todos/{id}` is sent with `{ title, description }` — status is not included (edited separately via toggle).
9. On success, the updated todo reflects the new values, `updatedAt` refreshes, a "Todo updated!" toast appears for 3 seconds, and the user is returned to the list or detail view.
10. On failure, the form re-enables, input is preserved, and a red error banner says "Something went wrong. Please try again."
11. User can click "Cancel" at any time to discard changes and return to the previous view with no request sent.

---

## Edge Cases

| Scenario | Behaviour |
|----------|-----------|
| Whitespace-only title | Caught client-side, shows "Title is required.", no request sent |
| Title > 255 chars | Input hard-capped at 255, extra characters cannot be typed |
| Description > 1000 chars | Textarea hard-capped at 1000 |
| No changes made, user clicks Save | Request still fires and backend updates `updatedAt` normally |
| Todo deleted by another action before saving | Backend returns `404`; form shows "This todo no longer exists." |
| Network failure mid-save | Form re-enables, error banner shown, user input preserved |

---

## What the Backend Does

- Accepts `id` as a path variable and `{ title, description }` in the request body.
- Trims the title; rejects with `400` if empty after trim (server-side safety net).
- Updates only `title`, `description`, and `updatedAt` — `status` and `createdAt` are never modified here.
- Returns `200 OK` with the full updated todo object.
- Returns `404 Not Found` if the ID does not exist.

---

## Definition of Done

- [ ] Edit form opens pre-filled with the todo's current title and description.
- [ ] Status field is not present in the edit form — it cannot be changed here.
- [ ] Empty/whitespace title is rejected before the request fires.
- [ ] Title capped at 255 chars, description at 1000 — enforced in the input itself.
- [ ] Button disables during the request and re-enables after.
- [ ] On success, updated values are reflected immediately and `updatedAt` is refreshed.
- [ ] Success toast appears and auto-dismisses after 3 seconds.
- [ ] Cancel button discards changes and returns to the previous view with no request sent.
- [ ] Errors show a non-destructive banner and preserve user input.
- [ ] A `404` from the backend shows "This todo no longer exists." to the user.