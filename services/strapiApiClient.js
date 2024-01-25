// strapiApiClient.js
import axios from 'axios';
import { getAuthTokenFromCookie } from './authService'; // Adjust the path accordingly

const strapiApiKey = process.env.NEXT_PUBLIC_STRAPI_API_KEY;
const strapiApiUrl = process.env.NEXT_PUBLIC_STRAPI_API_BASE_URL;


const strapiApiClient = axios.create({
  baseURL: strapiApiUrl,
  // Add other default configurations here
  headers: { Authorization: `Bearer ${strapiApiKey}` },
  'Content-Type': 'application/json' 
});

// Function to set the JWT token for subsequent requests
export const setAuthToken = (token) => {
    if (token) {
      strapiApiClient.defaults.headers["Authorization"] = `Bearer ${token}`;
    } else {
      strapiApiClient.defaults.headers[
        "Authorization"
      ] = `Bearer ${strapiApiKey}`;
    }
  };

// Add an interceptor to set the JWT token in the request headers
// strapiApiClient.interceptors.request.use(
//   (config) => {
//     const token = getAuthTokenFromCookie();
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

export default strapiApiClient;
