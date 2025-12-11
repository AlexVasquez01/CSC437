AV Fantasy Football League – CSC437 Final Project

This project is my final submission for CSC437
It is a fully deployed Single-Page Application (SPA) built with:

Lit (components + views)

@calpoly/mustang (MVU store, routing, auth, forms)

Node/Express backend with a REST API

MongoDB database

Production deployment on csse.dev

Live App
https://avasqu50.csse.dev/app

Running / Deployment Notes
On the VPS, the server is started using:
nohup npm -w server run start:app &
No environment variables or secrets are stored in GitHub.
The .env file exists only on the VPS.

Branch for Grading: main