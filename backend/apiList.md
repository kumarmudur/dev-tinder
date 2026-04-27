# DevTinder API's

# authRouter
- POST / signup
- POST / login
- POST / logout

# profileRouter
- GET / profile/view
- GET / connections
- GET / requests/received
- GET / feed 

- PATCH / profile/edit
- PATCH / profile/password 

# connectionRequestRouter
- POST / request/send/interested/:userId
- POST / request/send/ignored/:userId

- POST / request/review/accepted/:requestId
- POST / request/review/rejected/:requestId

# userRouter
- GEt / user/requests/received


Status: ignore, interested, accepted, rejected.