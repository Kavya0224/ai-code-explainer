/*
  Main Express Application

  Purpose:
  This file initializes the backend server
  and connects all routes and middleware.
*/

const express = require("express");
const cors = require("cors");

/*
  Import route modules
*/
const repoRoutes = require("./routes/repoRoutes");
const searchRoutes = require("./routes/searchRoutes");

/*
  Create Express application
*/
const app = express();

/*
  Middleware

  express.json()
  Allows backend to read JSON body from requests
*/
app.use(express.json());

/*
  Enable CORS

  This allows the frontend (React app)
  to communicate with the backend.
*/
app.use(cors());

/*
  API Routes
*/

/*
  Repository Analysis

  Endpoint:
  POST /api/repo/analyze
*/
app.use("/api/repo", repoRoutes);

/*
  Semantic Code Search

  Endpoint:
  POST /api/search
*/
app.use("/api/search", searchRoutes);

/*
  Health Check Route

  Useful to test if server is running
*/
app.get("/", (req, res) => {

  res.json({
    message: "AI Codebase Explainer API is running"
  });

});

/*
  Export app

  The server file will import this.
*/
module.exports = app;