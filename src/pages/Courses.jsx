import { useEffect, useState } from 'react';
import { getUserDetailById, getVideosByGrade } from '../../api/list';

const Dashboard = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [recommendedVideo, setRecommendedVideo] = useState(null);

  useEffect(() => {
    const fetchUserDataAndVideos = async () => {
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
        const userResponse = await getUserDetailById(userId);
        const userDetails = userResponse.data;
        setUserDetails(userDetails);

        // Fetch recommended videos by grade
        const videoResponse = await getVideosByGrade(userDetails.grade);
        if (videoResponse.data.length > 0) {
          // Assuming you want the first video as the recommended one
          setRecommendedVideo(videoResponse.data[0]);
        } else {
          console.log('No videos found for the user grade.');
        }
      } catch (error) {
        console.error('Error fetching user details or videos:', error);
        // Redirect to login if not authenticated
        window.location.href = '/login';
      }
    };

    fetchUserDataAndVideos();
  }, []);

  if (!userDetails || !recommendedVideo) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Welcome, {userDetails.name}!</h1>
      <p>Grade: {userDetails.grade}</p>
      <p>Medium: {userDetails.medium}</p>
      <h1>Recommended Video</h1>
      <p>Title: {recommendedVideo.title}</p>
      <p>Topic: {recommendedVideo.topic}</p>
      <a href={recommendedVideo.url} target="_blank" rel="noopener noreferrer">
        Watch Video
      </a>
    </div>
  );
};

export default Dashboard;
