# US-06 Specification — Delete a Todo

## What This Feature Is
User permanently deletes a todo from the list or detail view after confirming — the item is removed instantly with no undo.

---

## The Full User Journey

1. User sees a "Delete" button on each todo row in the list (or on the detail view).
2. User clicks "Delete" — a confirmation prompt appears: "Are you sure you want to delete this todo? This cannot be undone."
3. Prompt offers two options: "Confirm" and "Cancel".
4. If user clicks "Cancel", the prompt closes and nothing changes.
5. If user clicks "Confirm", the "Confirm" button enters a loading state ("Deleting…") and becomes unclickable.
6. `DELETE /api/todos/{id}` is sent to the backend.
7. On success, the todo row is removed from the list instantly without a page reload.
8. The summary counter updates immediately to reflect the removed todo.
9. A "Todo deleted!" toast appears and auto-dismisses after 3 seconds.
10. On failure, the confirmation prompt closes, the todo remains in the list, and a red error banner says "Something went wrong. Please try again."

---

## Edge Cases

| Scenario | Behaviour |
|----------|-----------|
| User clicks Cancel on the prompt | Prompt closes, todo remains, no request sent |
| Todo already deleted before confirm | Backend returns `404`; error banner shows "This todo no longer exists." and row is removed from UI |
| User is on the detail view when deleting | On success, user is redirected back to the list automatically |
| Network failure mid-delete | Prompt closes, todo remains, error banner shown |
| Last todo on a page is deleted | Pagination adjusts — user is moved to the previous page if current page is now empty |

---

## What the Backend Does

- Accepts `id` as a path variable: `DELETE /api/todos/{id}`.
- Permanently removes the record from the database (hard delete — no soft delete).
- Returns `204 No Content` on success with no response body.
- Returns `404 Not Found` if the ID does not exist.

---

## Definition of Done

- [ ] Delete button is visible on every todo row and on the detail view.
- [ ] Clicking Delete shows a confirmation prompt before any request is sent.
- [ ] Cancelling the prompt closes it with no changes made.
- [ ] Confirming fires `DELETE /api/todos/{id}` and disables the confirm button during the request.
- [ ] Deleted todo is removed from the list instantly without a page reload.
- [ ] Summary counter updates immediately after deletion.
- [ ] Success toast appears and auto-dismisses after 3 seconds.
- [ ] Deleting from the detail view redirects the user back to the list.
- [ ] A `404` from the backend shows "This todo no longer exists." and removes the row from the UI.
- [ ] Network or server errors show a non-destructive error banner and leave the todo intact.