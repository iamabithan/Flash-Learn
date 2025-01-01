// Import required configurations and Axios
import { hostConfig } from '../src/config/index'; // Host environment configurations
import axios from 'axios';

// Create an Axios instance with the base URL
const axiosInstance = axios.create({
  baseURL: hostConfig.API_URL, // Dynamic base URL from environment config
  timeout: 5000, // Optional: Set timeout for requests
  headers: {
    'Content-Type': 'application/json',
  },
});

// Helper function for GET requests
export const getRequest = async (urlKey, params = {}) => {
  try {
    // Make sure the baseURL and endpoint are concatenated properly
    const response = await axiosInstance.get(`${urlKey}`, { params });
    return response.data;
  } catch (error) {
    handleError(error);
  }
};


// Helper function for POST requests
export const postRequest = async (urlKey, data = {}) => {
  try {
    const response = await axiosInstance.post(`${urlKey}`, data);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// Helper function for PUT requests
export const putRequest = async (urlKey, data = {}) => {
  try {
    const response = await axiosInstance.put(`${urlKey}`, { data });
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// Helper function for DELETE requests
export const deleteRequest = async (urlKey) => {
  try {
    const response = await axiosInstance.delete(`${urlKey}`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// File upload example
export const uploadFileRequest = async (urlKey, file) => {
  try {
    const formData = new FormData();
    formData.append('file', file);

    const response = await axiosInstance.post(`${urlKey}`, { data } ,{
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// Centralized error handling
const handleError = (error) => {
  console.error('API Error:', error.response?.data || error.message);
  throw error.response?.data || error.message;
};
