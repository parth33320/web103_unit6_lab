# On The Fly Context

A React frontend web application for browsing, creating, updating, and deleting trips, associating destinations with trips, adding activities to trips, and voting on trip activities.

## Language

**Trip**:
A planned travel itinerary containing a title, description, image URL, start date, end date, total cost, and duration in days.
_Avoid_: Vacation, itinerary, booking

**Destination**:
A location available to be added to trips, containing a destination name, description, city, country, image URL, and flag image URL.
_Avoid_: Location, place, stop

**Activity**:
An entertainment option or event assigned to a specific trip that group members can vote on.
_Avoid_: Event, excursion, thing to do

**TripDestination**:
A join table record associating a specific destination with a specific trip.
_Avoid_: Trip-destination link, destination association

**Vote**:
An upvote incremented on an activity option for a trip to help group members reach consensus.
_Avoid_: Like, thumbs up

## Relationships

- A **Trip** has zero or more **TripDestinations**
- A **Destination** can belong to many **Trips** via **TripDestinations**
- A **Trip** has zero or more **Activities**
- An **Activity** belongs to exactly one **Trip** and tracks a **Vote** count (`num_votes`)
