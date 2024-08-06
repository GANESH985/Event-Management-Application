## Event Management Application
This repository contains the backend code for the Event Management Application. The backend is built using Node.js and MongoDB and is deployed on Render.

## Backend Deployment on Render

The backend of this application is deployed on Render. You can access it via the following link:
## https://event-management-application-1.onrender.com/api/events

## Deployment Steps

Follow these steps to deploy the backend on Render:

## Sign up and log in to Render:

Go to Render and sign up for an account.
Log in to your Render dashboard.
Create a new web service and connect your GitHub repository:

In the Render dashboard, click on the "New" button in the top right corner.
Select "Web Service" from the dropdown menu.
Connect your GitHub account and authorize Render to access your repositories.
Select the repository containing your backend code.
Configure build and start commands:

Build Command: npm install
Start Command: npm start

## Set environment variables:

Add necessary environment variables such as your MongoDB connection string, API keys, or any other secrets.

## Choose an appropriate plan and deploy your service:

Select a plan based on your needs (e.g., free, standard).
Click the "Create Web Service" button to start the deployment process.
Monitor the deployment process and verify your backend is running:

Render will pull your code from GitHub, install dependencies, and start your application.
Monitor the logs and ensure there are no errors.
Once the deployment is complete, you will receive a URL for your backend service.


## API Documentation
Authentication
Register a new user
## POST /api/auth/register

## Description: Register a new user.
Request Body:

{
  "email": "user@example.com",
  "password": "password123",
  "name": "John Doe"
}
Response:

{
  "_id": "user_id",
  "supabaseId": "supabase_user_id",
  "email": "user@example.com",
  "name": "John Doe"
}


Log in an existing user

## POST /api/auth/login

Description: Log in an existing user and create a session.
Request Body:

{
  "email": "user@example.com",
  "password": "password123"
}
Response:
{
  "user": {
    "_id": "user_id",
    "supabaseId": "supabase_user_id",
    "email": "user@example.com",
    "name": "John Doe"
  },
  "sessionId": "session_id"
}

## Error 400 Bad Request:
{
  "error": "Email not confirmed"
}

Events
Create a new event
## POST /api/events/

## Description: Create a new event.
Request Body:

{
  "userId": "user_id",
  "name": "Event Name",
  "date": "2023-08-01T00:00:00.000Z",
  "location": "New York",
  "description": "Event Description"
}
Response:
{
  "name": "Event Name",
  "date": "2023-08-01T00:00:00.000Z",
  "location": "New York",
  "description": "Event Description",
  "_id": "66ad1a4d0ce03039012f3f56",
  "__v": 0
}

## Retrieve all events for the logged-in user
## GET /api/events/

## Description: Retrieve all events for the logged-in user.
Query Parameters:
userId (required): The user's ID.
Response:
[
  {
    "_id": "event_id",
    "userId": "user_id",
    "name": "Event Name",
    "date": "2023-08-01T00:00:00.000Z",
    "location": "New York",
    "description": "Event Description"
  }
]

## Update an event by ID

## PUT /api/events/

Description: Update an event by ID.
Request Body:
{
  "name": "Updated Event Name",
  "date": "2023-08-02T00:00:00.000Z",
  "location": "Los Angeles",
  "description": "Updated Event Description"
}
Response:
{
  "_id": "event_id",
  "userId": "user_id",
  "name": "Updated Event Name",
  "date": "2023-08-02T00:00:00.000Z",
  "location": "Los Angeles",
  "description": "Updated Event Description"
}

## Delete an event by ID
## DELETE /api/events/

Description: Delete an event by ID.
Response:
{
  "message": "Event deleted"
}
Sessions
Retrieve all user sessions
GET /api/sessions

Description: Retrieve all user sessions.
Query Parameters:
userId (required): The user's ID.
Response:
[
  {
    "_id": "session_id",
    "userId": "user_id",
    "loginTime": "2023-08-01T00:00:00.000Z",
    "logoutTime": "2023-08-02T01:00:00.000Z",
    "ipAddress": "192.168.1.1"
  }
]

## Weather
Fetch weather information for a given location
## GET http://localhost:5002/api/events/weather?address=Lahore

Description: Fetch weather information for a given location.
Response:
json
Copy code
{
  "location": {
    "name": "New York",
    "region": "New York",
    "country": "United States"
  },
  "current": {
    "temp_c": 25.0,
    "temp_f": 77.0,
    "condition": {
      "text": "Partly cloudy",
      "icon": "//cdn.weatherapi.com/weather/64x64/day/116.png"
    }
  }
}
