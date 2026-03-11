/*
  API Service

  Purpose:
  Handle all backend requests from the frontend.
*/

import axios from "axios";

/*
  Create axios instance.

  This defines the backend server URL.
*/
const api = axios.create({
  baseURL: "http://localhost:5000/api"
});

/*
  Function: analyzeRepository

  Sends GitHub repo URL to backend.
*/
export const analyzeRepository = async (repoUrl) => {

  const response = await api.post("/repo/analyze", {
    repoUrl
  });

  return response.data;

};
/*
  Semantic Search API
*/
export const searchCode = async (question) => {

  const response = await api.post("/search", {
    question
  });

  return response.data;

};
export default api;