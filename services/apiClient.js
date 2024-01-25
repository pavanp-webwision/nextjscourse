// utils/apiClient.js
import axios from "axios";
import cookie from "cookie";

// Create an axios instance with withCredentials enabled
const axiosInstance = axios.create({
  withCredentials: true,
  baseURL: "http://localhost:1337",
});

// Serialize the cookies to the headers
const serializeCookie = (name, value, options) => {
  return cookie.serialize(name, value, options);
};

// Create a global variable for the user data
let user = null;

// Create a function that handles the authentication logic
const apiClient = (callback) => {
  // Intercept the responses and set or remove the jwt cookie and the user data
  axiosInstance.interceptors.response.use(
    (response) => {
      console.log("RESPONSE", response);

      // If the response is from the login endpoint, set the jwt cookie and the user data
      if (response.config.url === "api/authentiction/login") {
        const { jwt, userData } = response.data;
        // Assuming the server is correctly setting the Set-Cookie header
        user = userData;
      }

      // If the response is from the logout endpoint, remove the jwt cookie and the user data
      if (response.config.url === "/auth/logout") {
        // Assuming the server is correctly setting the Set-Cookie header
        user = null;
      }

      // Use the callback to set or get the user data
      callback(user);
      return response;
    },
    (error) => {
      // If the response is an unauthorized error, remove the jwt cookie and the user data
      if (error.response && error.response.status === 401) {
        // Assuming the server is correctly setting the Set-Cookie header
        user = null;
      }

      // Use the callback to set or get the user data
      callback(user);
      return Promise.reject(error);
    }
  );
};

export { apiClient, axiosInstance };
