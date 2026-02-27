# US-07 Specification — See Todos Sorted by Creation Date

## What This Feature Is
Todos are always listed newest first by default — no user action required, sorting is automatic and consistent across page loads and pagination.

---

## The Full User Journey

1. User opens the app and the list loads automatically sorted by `createdAt` descending (newest at the top).
2. The sort order is applied on the backend — the frontend simply renders whatever order the API returns.
3. Every page of paginated results respects the same sort order — page 2 continues from where page 1 left off, still newest first.
4. When a new todo is created, it appears at the very top of the list (position 1, page 1) since it has the most recent `createdAt`.
5. When a todo is edited, its position in the list does not change — sort is by `createdAt`, not `updatedAt`.
6. When a todo is deleted, the remaining todos stay in their current order with no re-shuffling surprise.
7. No sort controls are shown to the user in this module — the order is fixed and not configurable.

---

## Edge Cases

| Scenario | Behaviour |
|----------|-----------|
| Two todos created at the exact same millisecond | Backend falls back to sorting by `id` ascending as a tiebreaker |
| User edits a todo | Position in list unchanged — sort is by `createdAt`, not `updatedAt` |
| User navigates to page 2 | Results continue newest-first from where page 1 ended |
| Only one todo exists | List shows that single item with no pagination |

---

## What the Backend Does

- Applies `ORDER BY created_at DESC, id ASC` on all list queries as the default and only sort.
- Accepts `sort=createdAt,desc` as a query param but also defaults to it if not provided.
- Sorting is consistent across all pages of paginated results.

---

## Definition of Done

- [ ] List always loads sorted newest first with no user action required.
- [ ] Sort order is applied on the backend, not the frontend.
- [ ] All paginated pages respect the same `createdAt DESC` sort order.
- [ ] Newly created todos appear at the top of page 1 immediately.
- [ ] Editing a todo does not change its position in the list.
- [ ] No sort UI controls are exposed to the user in this module.
- [ ] Ties at the same millisecond are broken by `id ASC`.