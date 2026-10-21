# On The Fly ✈️ - Unit 6 Lab: Frontend Integration

This repository contains the frontend React client for **On The Fly**, connecting UI components to backend Express API routes for complete CRUD operations on Trips, Destinations, and Activities.

---

## Lab 6 Architecture & Scenario Comparison

Below is an architectural scenario explanation comparing a successful implementation against a specific technical failure mode during activity upvoting.

### Example: Successful Upvote Implementation with Full Persistence

- **Step 1 (Input)**: At timestamp `2026-10-21T14:00:00.000Z`, the user clicks the `<button className='activityBtn' id={5} onClick={updateCount}>` component on the `TripDetails` page (`/trip/get/1`) displaying activity `"Eiffel Tower Tour"` with initial state `num_votes = 3`.
- **Step 2 (Output)**: At timestamp `2026-10-21T14:00:00.100Z`, the `updateCount` event handler constructs `options` with `method: 'PATCH'`, `headers: {'Content-Type': 'application/json'}`, and stringified payload `body: JSON.stringify({num_votes: num_votes + 1})` where `num_votes` evaluates to `3 + 1 = 4`.
- **Step 3 (Input)**: At timestamp `2026-10-21T14:00:00.200Z`, `updateCount` invokes `fetch('/api/activities/5', options)` sending the HTTP `PATCH` request to the Express backend API and PostgreSQL database layer to persist the updated vote count.
- **Step 4 (Output)**: At timestamp `2026-10-21T14:00:00.300Z`, `updateCount` calls `setNumVotes((num_votes) => num_votes + 1)` updating client component state `num_votes` from `3` to `4`, re-rendering `<button className='activityBtn'>` UI text to `"Eiffel Tower Tour △ 4 Upvotes"`.

**Explanation:**
At timestamp `2026-10-21T14:00:00.300Z`, calling `setNumVotes((num_votes) => num_votes + 1)` updates client component state `num_votes` from `3` to `4` following the dispatched `fetch('/api/activities/5', options)` HTTP PATCH request, which confirms a successful implementation of full client-server data synchronization and database persistence.

---

### Counterexample: Failure Mode (Unpersisted Client State Drift / Backend Request Bypass)

- **Step 1 (Input)**: At timestamp `2026-10-21T14:00:00.000Z`, the user clicks the `<button className='activityBtn' id={5} onClick={updateCount}>` component on the `TripDetails` page (`/trip/get/1`) displaying activity `"Eiffel Tower Tour"` with initial state `num_votes = 3`.
- **Step 2 (Output)**: At timestamp `2026-10-21T14:00:00.100Z`, the `updateCount` event handler constructs `options` with `method: 'PATCH'`, `headers: {'Content-Type': 'application/json'}`, and stringified payload `body: JSON.stringify({num_votes: num_votes + 1})` where `num_votes` evaluates to `3 + 1 = 4`.
- **Step 3 (Input)**: At timestamp `2026-10-21T14:00:00.200Z`, `updateCount` fails to invoke `fetch('/api/activities/5', options)`, bypassing the HTTP `PATCH` request to the Express backend API and database layer due to a missing network dispatch call.
- **Step 4 (Output)**: At timestamp `2026-10-21T14:00:00.300Z`, `updateCount` calls `setNumVotes((num_votes) => num_votes + 1)` updating client component state `num_votes` from `3` to `4` in isolation, re-rendering `<button className='activityBtn'>` UI text to `"Eiffel Tower Tour △ 4 Upvotes"` while the database vote count remains stuck at `3`.

**Explanation:**
At timestamp `2026-10-21T14:00:00.300Z`, calling `setNumVotes((num_votes) => num_votes + 1)` updates client component state `num_votes` from `3` to `4` without a prior `fetch('/api/activities/5', options)` request, which confirms the specific failure mode of unpersisted client state drift where local UI state updates while database persistence is completely bypassed.

---

## Lab Features Implemented

1. **Read All Trips**: Fetches trips from `/api/trips` and displays them on `/`.
2. **Create Trip**: Sends `POST` request to `/api/trips` with form payload.
3. **Update & Delete Trip**: Sends `PATCH` and `DELETE` requests to `/api/trips/:id`.
4. **Create Destination**: Sends `POST` request to `/api/destinations`.
5. **Get All Destinations**: Fetches destinations from `/api/destinations` and displays on `/destinations`.
6. **Add Destination to Trip**: Sends `POST` request to `/api/trips-destinations` with `{ trip_id, destination_id }`.
7. **Show Trip Details, Activities, & Destinations**: Fetches `/api/activities/:id` and `/api/trips-destinations/destinations/:id`.
8. **Create Activity**: Sends `POST` request to `/api/activities/:trip_id`.
9. **Upvote Activity**: Sends `PATCH` request to `/api/activities/:id` and updates local vote count.
