// userRole.js

import {verifyUser}  from '../../api/create'; // Assuming verifyUser fetches user details

let currentUserRole = null; // This will hold the user role

// Function to get the current user role
export const getCurrentUserRole = () => currentUserRole;

// Function to fetch and set the current user role from localStorage and API
export const fetchUserRole = async () => {
  try {
    const token = localStorage.getItem('authToken');
    if (!token) {
      throw new Error('User is not authenticated.');
    }

    const payload = JSON.parse(atob(token.split('.')[1]));
    const uid = payload.user_id;

    // Fetch user details from the API
    const userResponse = await verifyUser(uid);

    // Handle user role logic based on the response
    if (userResponse === 'user') {
      currentUserRole = 'user';
    } else {
      const userData = userResponse?.adminDetails;
      if (!userData) {
        throw new Error('Invalid user data received.');
      }

      currentUserRole = userData.role === 'admin' ? 'admin' : 'user';
    }
  } catch (error) {
    console.error('Error fetching user role:', error);
    throw error; // Re-throw the error for handling in other components
  }
};
