# US-01 Specification — Create a New Todo

## What This Feature Is
User types a title (+ optional description) and submits — a new PENDING todo appears instantly at the top of the list.

---

## The Full User Journey

1. Browser loads the page showing the form, todo list, and a `X pending · Y completed` summary counter.
2. Form has a required title input, optional description textarea, and an "Add Todo" button.
3. User types a title into the title field.
4. User optionally types a description.
5. User clicks "Add Todo" or presses Enter from the title field.
6. Client validates — if title is empty/whitespace, field turns red with "Title is required." and submission stops.
7. Button changes to "Adding…" and both fields disable to prevent double-submission.
8. `POST /api/todos` is sent with `{ title, description }` — backend assigns status, ID, and timestamps.
9. On success, new todo card inserts at the top, counter increments, form clears, title field refocuses, and a "Todo added!" toast appears for 3 seconds.
10. On failure, form re-enables, input is preserved, and a red error banner says "Something went wrong. Please try again."

---

## Edge Cases

| Scenario | Behaviour |
|----------|-----------|
| Whitespace-only title | Caught client-side, shows "Title is required.", no request sent |
| Title > 255 chars | Input hard-capped at 255, extra characters cannot be typed |
| Description > 1000 chars | Textarea hard-capped at 1000 |
| Duplicate title | Allowed — two todos with identical titles is valid |
| Enter in description | Inserts a newline, does not submit the form |
| Network failure | Form re-enables, error banner shown, user input preserved |

---

## What the Backend Does

- Trims the title; rejects with `400` if empty after trim (server-side safety net).
- Saves with status `PENDING`, both timestamps set to current UTC, ID auto-generated.
- Returns `201 Created` with the full saved todo object.

---

## Definition of Done

- [ ] New todo appears at top of list without a page reload.
- [ ] Empty/whitespace title is rejected before the request fires.
- [ ] Title capped at 255 chars, description at 1000 — enforced in the input itself.
- [ ] Button disables during request; form clears and refocuses on success.
- [ ] Counter updates immediately; success toast auto-dismisses after 3 seconds.
- [ ] Errors show a non-destructive banner and preserve user input.