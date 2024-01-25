import {apiClient, axiosInstance} from './apiClient'
import axios from 'axios';

// // Set JWT token as a cookie
// export const setAuthTokenCookie = (token) => {
//   console.log("here", token);
//   Cookies.set("jwtToken", token, {
//     expires: 7, // 1 week in days
//   });
// };

// // Remove JWT token cookie
// export const removeAuthTokenCookie = () => {
//   Cookies.remove("jwtToken", { path: "/" });
// };

// // Get JWT token from cookie
// export const getAuthTokenFromCookie = () => {
//   return Cookies.get("jwtToken") || null;
// };

// export const handleLogin = async (email, password) => {
//   console.log("coming here", email, password);
//   console.log(axiosInstance);
//   try {
//     // Make a request to Strapi for authentication
//     const response = await axiosInstance.post("/auth/local", {
//       identifier: email,
//       password,
//     });

//     console.log(response)

//     if (response.status !== 200) {
//       throw new Error("Login failed");
//     }

//     const token = response.data.jwt; // Adjust the property name based on Strapi's response

//     // Set the token as a cookie
//     console.log("setting token", token);
//     setAuthTokenCookie(token);

//     // Redirect or perform other actions after successful login
//     console.log("Login successful");

//     // Return an object indicating success
//     return { success: true };
//   } catch (error) {
//     console.error("Login error:", error);

//     // Return an object indicating failure
//     return { success: true, error: error.message };
//   }
// };

// export const handleLogout = () => {
//   // Clear the authToken cookie
//   removeAuthTokenCookie();

//   // Redirect or perform other actions as needed
// };
       
const authService = {

  
  async login(email, password) {


    console.log("Here", apiClient)
    const response = await axiosInstance.post("/api/authentication/login", {
      identifier: email,
      password,
    });

    console.log(response)

    const data = response.data;

    console.log('data >>>>>>', data)

    if (data.userData) {
      return data;
    } else {
      throw new Error("Login failed");
    }
  },

  async logout() {
    await apiClient.post("/api/logout");
  },

  async checkAuthStatus() {
    try {
      const response = await apiClient.get("/api/current-user");

      if (response.status === 200) {
        return response.data;
      }
      throw new Error("Not authenticated");
    } catch (error) {
      console.error("Error checking auth status:", error);
      throw error;
    }
  },

  async register(username, email, password) {
    const response = await apiClient.post("/auth/local/register", {
      username,
      email,
      password,
    });
    return response.data;
  },
};

export default authService;
