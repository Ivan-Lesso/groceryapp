# groceryapp

##Problem

* As part of the final take-home assignment at Bloc, I was faced with a problem to develop a real-time grocery app. The app would be used my multiple people and on multiple devices. Further, all the users had to be updated in real-time to make sure there is no duplicate effort in grocery shopping.

##Solution

* I chose to develop this app with the backend as the primary interface and adding some front-end enhancements to make the main UI more interactive. As such, I developed everything using Node + Express + Postgres and then added a front-end for the real-time interface using jQuery. The main challenge was to figure out how to do real-time updates.

* To do real-time updates, I initially thought of updating the screen every two seconds to make sure the information each user has is up to date. This presented a scalability issue as if there were million people using the app but only a few updates, the app would consume too much bandwidth.

* The most optimal solution to this problem that I found was to use Socket.io and update the UI ONLY when there was a change to the database.

##Technical Choices

* Node/Express - this was used for backend and I was able to scaffold from my previous Bloc apps
* Postgres - this was the most optimal database for an app like this
* Jasmin - can't go anywhere without writing the tests
* Passport - easy to use authentication and I was already acquainted with the implementation
* Heroku - no brainer for an easy deployment
* Socket.io - extremely easy to use real-time, event-based communication between clients/server.
* jQuery - lightweight front-end Javascript library to use for user UI and AJAX.

##Good-to-have's

* If I had more time, I would have definitely implemented a user sign-up, a log (so everyone can see the sequence of grocery shopping), grocery history, and private lists.
