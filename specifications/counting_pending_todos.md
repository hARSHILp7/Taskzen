# US-08 Specification — See Pending vs Completed Count

## What This Feature Is
A summary counter at the top of the page always shows the live count of pending and completed todos — updating instantly after every create, toggle, or delete action.

---

## The Full User Journey

1. User opens the app and the summary counter loads alongside the todo list, showing `X pending · Y completed`.
2. The initial counts are derived from the same `GET /api/todos` response that populates the list — no separate request needed.
3. Counter displays `0 pending · 0 completed` when no todos exist, alongside the empty-state message.
4. User creates a new todo — pending count increments by 1 immediately without a page reload.
5. User marks a todo complete — pending count decrements by 1 and completed count increments by 1 immediately.
6. User marks a completed todo incomplete — completed count decrements by 1 and pending count increments by 1 immediately.
7. User deletes a pending todo — pending count decrements by 1 immediately.
8. User deletes a completed todo — completed count decrements by 1 immediately.
9. Counter always stays in sync with the list — there is no state where the counts disagree with what is shown.

---

## Edge Cases

| Scenario | Behaviour |
|----------|-----------|
| All todos are completed | Counter shows `0 pending · Y completed` |
| All todos are pending | Counter shows `X pending · 0 completed` |
| No todos exist | Counter shows `0 pending · 0 completed` |
| API returns an error on load | Counter shows `-- pending · -- completed` as a fallback |
| Rapid successive toggles | Each action updates the counter correctly in the order responses arrive |

---

## What the Backend Does

- The `GET /api/todos` response includes `totalPending` and `totalCompleted` fields in its top-level payload alongside the paginated `content[]`.
- These counts reflect the **total** across all pages — not just the current page.
- On every mutating action (create, toggle, delete), the response includes the updated todo only — the frontend recalculates the counts locally from the known state.

---

## Definition of Done

- [ ] Counter shows `X pending · Y completed` on every page load.
- [ ] Counts reflect totals across all pages, not just the current page.
- [ ] Counter updates immediately after a todo is created (pending +1).
- [ ] Counter updates immediately after a todo is toggled (pending/completed ±1 each).
- [ ] Counter updates immediately after a todo is deleted (correct count -1).
- [ ] Counter shows `0 pending · 0 completed` when the list is empty.
- [ ] Counter shows a graceful fallback (`--`) if the initial load fails.
- [ ] Counter never requires a page reload to stay accurate.