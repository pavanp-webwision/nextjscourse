// api.js
import strapiApiClient from "./strapiApiClient";
import { apiClient, axiosInstance } from "./apiClient";

const API_BASE_URL = `${process.env.NEXT_PUBLIC_STRAPI_API_BASE_URL}/api`;

console.log(API_BASE_URL);

console.log(strapiApiClient)

// Example function to get a list of items
console.log(apiClient)
export const getCategory = async () => {
  try {
    const response = await axiosInstance.get(`/api/categories`);
    console.log("CATEGORY RESPONSE", response)
    return response.data;
  } catch (error) {
    console.error("Error fetching items:", error);
    throw error;
  }
};

// Example function to get a single item by ID
export const getCategoryById = async (itemId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/items/${itemId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching item by ID:", error);
    throw error;
  }
};

export const deleteQuery = async (table, id) => {
  try {
    const response = await strapiApiClient.delete(`${API_BASE_URL}/${table}/${id}`);
    console.log('delete response', response)
    return response
  } catch (error) {
    console.log(`Cannot delete from ${table}`);
    throw error;
  }
};

export const createQuery = async (table, val) => {

    console.log(val)
    try {
      const response = await strapiApiClient.post(`${API_BASE_URL}/${table}`, { data: { name: val.name } });
      
      if (response.status === 200) {
        console.log(`${table} created successfully:`, response.data);
        return response; // You can return the created category data if needed
      } else {
        console.error('Create request failed with status:', response.status);
        throw new Error(`${table} creation failed`);
      }
    } catch (error) {
      console.error(`Error creating ${table}:`, error);
      throw error;
    }
  };

// Add more functions for other API calls as needed
