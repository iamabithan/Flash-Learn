import axios from 'axios';
import { useEffect, useState } from 'react';
import { getUserDetailById } from '../../api/list';

const Dashboard = () => {
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem('authToken');

        if (!token) {
          console.log('User is not authenticated.');
          throw new Error('User is not authenticated.');
        }

        // Decode the user ID from the token
        const payload = JSON.parse(atob(token.split('.')[1]));
        const userId = payload.user_id;

        // Fetch user details from the API
        const response = await getUserDetailById(userId); // Add 'await' here
        setUserDetails(response.data);
      } catch (error) {
        console.error('Error fetching user details:', error);
        // Redirect to login if not authenticated
        window.location.href = '/login';
      }
    };

    fetchUserDetails();
  }, []);

  if (!userDetails) {
    return <div>Loading...</div>;
  }
  console.log({ userDetails });

  return (
    <div>
      <h1>Welcome, {userDetails.name}!</h1>
      <p>Grade: {userDetails.grade}</p>
      <p>Medium: {userDetails.medium}</p>
    </div>
  );
};

export default Dashboard;
