import { useEffect, useState } from 'react';
import { getUserDetailById, getVideosByGrade } from '../../api/list';
import { getYtThumbnail } from '../../api/create';

const Dashboard = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [videos, setVideos] = useState([]); // Store all recommended videos
  const [thumbnails, setThumbnails] = useState([]); // Store all generated thumbnails

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
        const videoList = videoResponse.data;

        if (videoList.length > 0) {
          setVideos(videoList);
          console.log({videoList})
          // Extract URLs and fetch thumbnails
          const urls = videoList.map((video) => video.url);
          const thumbnailResponse = await getYtThumbnail(urls); // Assuming getYtThumbnail handles multiple URLs
          setThumbnails(thumbnailResponse.data); // Save the thumbnails
        } else {
          console.log('No videos found for the user grade.');
        }
      } catch (error) {
        console.error('Error fetching user details or videos:', error);
        // Redirect to login if not authenticated
        // window.location.href = '/login';
      }
    };

    fetchUserDataAndVideos();
  }, []);

  if (!userDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Welcome, {userDetails.name}!</h1>
      <p>Grade: {userDetails.grade}</p>
      <p>Medium: {userDetails.medium}</p>
      <h1>Recommended Videos</h1>
      <ul>
        {videos.map((video, index) => (
          <li key={video.id}>
            <p>Title: {video.title}</p>
            <p>Topic: {video.topic}</p>
            <a href={video.url} target="_blank" rel="noopener noreferrer">
              Watch Video
            </a>
            {thumbnails[index] && (
              <div>
                <img src={thumbnails[index].thumbnails.high} alt={`Thumbnail of ${video.title}`} />
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
