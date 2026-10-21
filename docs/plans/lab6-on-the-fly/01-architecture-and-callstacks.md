# Architecture & Call Stack Traces: On The Fly (Lab 6)

## System Architecture Overview

The application follows a client-server architecture:
- **Client**: Vite + React single-page application (`/src`)
- **Server API**: Express HTTP REST API handling endpoints (`/api/trips`, `/api/destinations`, `/api/trips-destinations`, `/api/activities`)
- **Database**: PostgreSQL (`db_onthefly`) hosted on Render storing relational tables (`trips`, `destinations`, `trips_destinations`, `activities`).

---

## Complete Multi-Tier Call Stack Traces

### 1. Read All Trips & Destinations (`App.jsx` -> `useEffect`)

```
Execution Call Stack Trace:
└── [Project] On The Fly Client-Server System
    ├── [Configuration/Env] API_HOST = "http://localhost:3000" / express backend proxy
    └── [Folder] src/
        └── [File] src/App.jsx
            └── [Component] App (React Functional Component)
                └── [Method] useEffect()
                    ├── [Variable State Shift] Inbound Component Mount Event
                    ├── [Method] fetchTrips()
                    │   ├── [Variable State Shift] Initial state: trips = []
                    │   ├── [Method] fetch('/api/trips', { method: 'GET' })
                    │   │   └── [Project] Express Backend API Endpoint: GET /api/trips
                    │   │       └── [Database] SQL Query: SELECT * FROM trips ORDER BY id ASC
                    │   ├── [Variable State Shift] Inbound Response Data: data = [{ id: 1, title: 'Trip to Paris', description: 'Summer trip', img_url: '...', num_days: 5, start_date: '2026-06-01', end_date: '2026-06-06', total_cost: 1500.00 }]
                    │   └── [Method] setTrips(data)
                    │       └── [Variable State Shift] State Mutated: trips = [{ id: 1, title: 'Trip to Paris', ... }]
                    └── [Method] fetchDestinations()
                        ├── [Variable State Shift] Initial state: destinations = []
                        ├── [Method] fetch('/api/destinations', { method: 'GET' })
                        │   └── [Project] Express Backend API Endpoint: GET /api/destinations
                        │       └── [Database] SQL Query: SELECT * FROM destinations ORDER BY id ASC
                        ├── [Variable State Shift] Inbound Response Data: data = [{ id: 10, destination: 'Paris', description: 'City of Lights', city: 'Paris', country: 'France', img_url: '...', flag_img_url: '...' }]
                        └── [Method] setDestinations(data)
                            └── [Variable State Shift] State Mutated: destinations = [{ id: 10, destination: 'Paris', ... }]
```

---

### 2. Create a Trip (`CreateTrip.jsx` -> `createTrip`)

```
Execution Call Stack Trace:
└── [Project] On The Fly Client-Server System
    ├── [Configuration/Env] Header 'Content-Type': 'application/json'
    └── [Folder] src/pages/
        └── [File] src/pages/CreateTrip.jsx
            └── [Component] CreateTrip (React Functional Component)
                └── [Method] createTrip(event: SyntheticEvent)
                    ├── [Variable State Shift] Inbound State: trip = { id: 0, title: 'Tokyo Adventure', description: 'Explore Japan', img_url: 'http://example.com/tokyo.jpg', num_days: 7, start_date: '2026-09-01', end_date: '2026-09-08', total_cost: 2500.00 }
                    ├── [Variable State Shift] Construct options = { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: '{"id":0,"title":"Tokyo Adventure","description":"Explore Japan","img_url":"http://example.com/tokyo.jpg","num_days":7,"start_date":"2026-09-01","end_date":"2026-09-08","total_cost":2500}' }
                    ├── [Method] fetch('/api/trips', options)
                    │   └── [Project] Express Backend API Endpoint: POST /api/trips
                    │       └── [Database] SQL Query: INSERT INTO trips (title, description, img_url, num_days, start_date, end_date, total_cost) VALUES (...) RETURNING *
                    └── [Method] window.location.href = '/'
                        └── [Variable State Shift] Browser URL updated: window.location.href = 'http://localhost:5173/'
```

---

### 3. Update an Existing Trip (`EditTrip.jsx` -> `updatePost`)

```
Execution Call Stack Trace:
└── [Project] On The Fly Client-Server System
    ├── [Configuration/Env] Route Parameter: id = "1"
    └── [Folder] src/pages/
        └── [File] src/pages/EditTrip.jsx
            └── [Component] EditTrip (React Functional Component)
                └── [Method] updatePost(event: SyntheticEvent)
                    ├── [Variable State Shift] Inbound State: post = { id: 1, title: 'Updated Trip to Paris', description: 'Revised description', img_url: '...', num_days: 6, start_date: '2026-06-01', end_date: '2026-06-07', total_cost: 1800.00 }
                    ├── [Variable State Shift] Construct options = { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: '{"id":1,"title":"Updated Trip to Paris",...}' }
                    ├── [Method] fetch('/api/trips/1', options)
                    │   └── [Project] Express Backend API Endpoint: PATCH /api/trips/:id
                    │       └── [Database] SQL Query: UPDATE trips SET title=$1, description=$2, img_url=$3, num_days=$4, start_date=$5, end_date=$6, total_cost=$7 WHERE id=1 RETURNING *
                    └── [Method] window.location.href = '/'
                        └── [Variable State Shift] Browser URL updated: window.location.href = 'http://localhost:5173/'
```

---

### 4. Delete a Trip (`EditTrip.jsx` -> `deletePost`)

```
Execution Call Stack Trace:
└── [Project] On The Fly Client-Server System
    ├── [Configuration/Env] Route Parameter: id = "1"
    └── [Folder] src/pages/
        └── [File] src/pages/EditTrip.jsx
            └── [Component] EditTrip (React Functional Component)
                └── [Method] deletePost(event: SyntheticEvent)
                    ├── [Variable State Shift] Target ID: id = 1
                    ├── [Variable State Shift] Construct options = { method: 'DELETE' }
                    ├── [Method] fetch('/api/trips/1', options)
                    │   └── [Project] Express Backend API Endpoint: DELETE /api/trips/:id
                    │       └── [Database] SQL Query: DELETE FROM trips WHERE id=1
                    └── [Method] window.location.href = '/'
                        └── [Variable State Shift] Browser URL updated: window.location.href = 'http://localhost:5173/'
```

---

### 5. Create Destination (`CreateDestination.jsx` -> `createDestination`)

```
Execution Call Stack Trace:
└── [Project] On The Fly Client-Server System
    ├── [Configuration/Env] Header 'Content-Type': 'application/json'
    └── [Folder] src/pages/
        └── [File] src/pages/CreateDestination.jsx
            └── [Component] CreateDestination (React Functional Component)
                └── [Method] createDestination(event: SyntheticEvent)
                    ├── [Variable State Shift] Inbound State: destination = { destination: 'Kyoto', description: 'Ancient temples', city: 'Kyoto', country: 'Japan', img_url: '...', flag_img_url: '...' }
                    ├── [Variable State Shift] Construct options = { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: '{"destination":"Kyoto",...}' }
                    ├── [Method] fetch('/api/destinations', options)
                    │   └── [Project] Express Backend API Endpoint: POST /api/destinations
                    │       └── [Database] SQL Query: INSERT INTO destinations (destination, description, city, country, img_url, flag_img_url) VALUES (...) RETURNING *
                    └── [Method] window.location.href = '/destinations'
                        └── [Variable State Shift] Browser URL updated: window.location.href = 'http://localhost:5173/destinations'
```

---

### 6. Associate Destination with Trip (`AddTripOptionCard.jsx` -> `addToTrip`)

```
Execution Call Stack Trace:
└── [Project] On The Fly Client-Server System
    ├── [Configuration/Env] Route Parameter: destination_id = "10"
    └── [Folder] src/components/
        └── [File] src/components/AddTripOptionCard.jsx
            └── [Component] AddTripOptionCard (React Functional Component)
                └── [Method] addToTrip(event: SyntheticEvent)
                    ├── [Variable State Shift] Inbound Props & Params: props.id = 1 (trip_id), destination_id = "10"
                    ├── [Variable State Shift] Construct options = { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: '{"trip_id":1,"destination_id":"10"}' }
                    ├── [Method] fetch('/api/trips-destinations', options)
                    │   └── [Project] Express Backend API Endpoint: POST /api/trips-destinations
                    │       └── [Database] SQL Query: INSERT INTO trips_destinations (trip_id, destination_id) VALUES (1, 10) RETURNING *
                    └── [Method] window.location.href = '/'
                        └── [Variable State Shift] Browser URL updated: window.location.href = 'http://localhost:5173/'
```

---

### 7. Read Trip Details, Activities, & Destinations (`TripDetails.jsx` -> `useEffect`)

```
Execution Call Stack Trace:
└── [Project] On The Fly Client-Server System
    ├── [Configuration/Env] Route Parameter: id = "1"
    └── [Folder] src/pages/
        └── [File] src/pages/TripDetails.jsx
            └── [Component] TripDetails (React Functional Component)
                └── [Method] useEffect()
                    ├── [Variable State Shift] Filter data prop for id = 1 -> post = { id: 1, title: 'Trip to Paris', ... }
                    ├── [Method] fetchActivities()
                    │   ├── [Variable State Shift] Initial state: activities = []
                    │   ├── [Method] fetch('/api/activities/1', { method: 'GET' })
                    │   │   └── [Project] Express Backend API Endpoint: GET /api/activities/:trip_id
                    │   │       └── [Database] SQL Query: SELECT * FROM activities WHERE trip_id=1
                    │   ├── [Variable State Shift] Inbound Response Data: data = [{ id: 5, activity: 'Eiffel Tower Tour', num_votes: 3, trip_id: 1 }]
                    │   └── [Method] setActivities(data)
                    │       └── [Variable State Shift] State Mutated: activities = [{ id: 5, activity: 'Eiffel Tower Tour', num_votes: 3, trip_id: 1 }]
                    └── [Method] fetchDestinations()
                        ├── [Variable State Shift] Initial state: destinations = []
                        ├── [Method] fetch('/api/trips-destinations/destinations/1', { method: 'GET' })
                        │   └── [Project] Express Backend API Endpoint: GET /api/trips-destinations/destinations/:trip_id
                        │       └── [Database] SQL Query: SELECT d.* FROM destinations d JOIN trips_destinations td ON d.id = td.destination_id WHERE td.trip_id = 1
                        ├── [Variable State Shift] Inbound Response Data: data = [{ id: 10, destination: 'Paris', city: 'Paris', country: 'France' }]
                        └── [Method] setDestinations(data)
                            └── [Variable State Shift] State Mutated: destinations = [{ id: 10, destination: 'Paris', city: 'Paris', country: 'France' }]
```

---

### 8. Create Activity (`CreateActivity.jsx` -> `createActivity`)

```
Execution Call Stack Trace:
└── [Project] On The Fly Client-Server System
    ├── [Configuration/Env] Route Parameter: trip_id = "1"
    └── [Folder] src/pages/
        └── [File] src/pages/CreateActivity.jsx
            └── [Component] CreateActivity (React Functional Component)
                └── [Method] createActivity(event: SyntheticEvent)
                    ├── [Variable State Shift] Inbound State: activity = { activity: 'Visit Louvre Museum' }
                    ├── [Variable State Shift] Construct options = { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: '{"activity":"Visit Louvre Museum"}' }
                    ├── [Method] fetch('/api/activities/1', options)
                    │   └── [Project] Express Backend API Endpoint: POST /api/activities/:trip_id
                    │       └── [Database] SQL Query: INSERT INTO activities (activity, trip_id, num_votes) VALUES ('Visit Louvre Museum', 1, 0) RETURNING *
                    └── [Method] window.location.href = '/'
                        └── [Variable State Shift] Browser URL updated: window.location.href = 'http://localhost:5173/'
```

---

### 9. Upvote Activity (`ActivityBtn.jsx` -> `updateCount`)

```
Execution Call Stack Trace:
└── [Project] On The Fly Client-Server System
    ├── [Configuration/Env] Component Props: props.id = 5, props.num_votes = 3
    └── [Folder] src/components/
        └── [File] src/components/ActivityBtn.jsx
            └── [Component] ActivityBtn (React Functional Component)
                └── [Method] updateCount()
                    ├── [Variable State Shift] Inbound State: num_votes = 3
                    ├── [Variable State Shift] Construct options = { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: '{"num_votes":4}' }
                    ├── [Method] fetch('/api/activities/5', options)
                    │   └── [Project] Express Backend API Endpoint: PATCH /api/activities/:id
                    │       └── [Database] SQL Query: UPDATE activities SET num_votes = 4 WHERE id = 5 RETURNING *
                    └── [Method] setNumVotes((num_votes) => num_votes + 1)
                        └── [Variable State Shift] State Mutated: num_votes = 4
```
