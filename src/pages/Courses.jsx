import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserDetailById, getVideosByGrade } from '../../api/list';
import { getYtThumbnail } from '../../api/create';
import CoursesCard from '../components/CoursesCard'; // Adjust the path as needed

const Dashboard = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [videos, setVideos] = useState([]);
  const [thumbnails, setThumbnails] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserDataAndVideos = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (!token) throw new Error('User is not authenticated.');

        const payload = JSON.parse(atob(token.split('.')[1]));
        const userId = payload.user_id;

        const userResponse = await getUserDetailById(userId);
        setUserDetails(userResponse.data);

        const videoResponse = await getVideosByGrade(userResponse.data.grade);
        const videoList = videoResponse.data;

        setVideos(videoList);
        if (videoList.length > 0) {
          const urls = videoList.map((video) => video.url);
          const thumbnailResponse = await getYtThumbnail(urls);
          setThumbnails(thumbnailResponse.data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        // Redirect if not authenticated
        window.location.href = '/login';
      }
    };

    fetchUserDataAndVideos();
  }, []);

  if (!userDetails) {
    return <div>Loading...</div>;
  }

  const handleVideoClick = (video) => {
    navigate('/content', { state: { video } });
  };

  return (
    <div className="flex flex-col">
      <div className="ml-2 p-4 flex-1">
        <h1 className="text-3xl font-bold">Welcome, {userDetails.name}!</h1>
        <p>Grade: {userDetails.grade}</p>
        <p>Medium: {userDetails.medium}</p>

        <h2 className="mt-6 text-2xl font-semibold">Recommended Videos</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
          {videos.map((video, index) => (
            <CoursesCard
              key={video.id}
              image={thumbnails[index]?.thumbnails?.high || 'https://via.placeholder.com/400x250'}
              // logo="https://via.placeholder.com/150x50" // Replace with a proper logo URL or data
              university={video.topic || 'Unknown Topic'}
              program={video.title}
              duration={`${video.duration || 'Unknown Duration'}`}
              badge={video.badge || 'Recommended'}
              linkText="View Video"
              onClick={() => handleVideoClick(video)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
