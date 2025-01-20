import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserDetailById, getVideosByGrade } from '../../api/list';
import { getYtThumbnail } from '../../api/create';

const Dashboard = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [videos, setVideos] = useState([]);
  const [thumbnails, setThumbnails] = useState([]);
  const [error, setError] = useState(null); // State to track errors
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
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err.message || 'Something went wrong.');
      }
    };

    fetchUserDataAndVideos();
  }, []);

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-6 rounded shadow-md text-center">
          <h1 className="text-2xl font-bold text-red-600">Error</h1>
          <p className="mt-2 text-gray-600">{error}</p>
          <button
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={() => {
              setError(null);
              window.location.reload();
            }}
          >
            Retry
          </button>
          <button
            className="mt-4 ml-2 px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
            onClick={() => navigate('/login')}
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  if (!userDetails) {
    return <div>Loading...</div>;
  }

  const handleVideoClick = (video) => {
    navigate('/content', { state: { video } });
  };

  return (
    <div className="flex">
      {/* Sidebar Space */}
      <div className="w-64 fixed h-screen bg-gray-900 text-white shadow-lg hidden md:flex"></div>

      {/* Main Content */}
      <div className="flex-1 ml-64">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white p-6">
          <h1 className="text-4xl font-bold">Welcome, {userDetails.name}!</h1>
          {/* <p className="mt-2 text-lg">
            Grade: <span className="font-medium">{userDetails.grade}</span>
          </p>
          <p className="text-lg">
            Medium: <span className="font-medium">{userDetails.medium}</span>
          </p> */}
        </div>

        {/* Recommended Videos Section */}
        <div className="p-6">
          <h2 className="text-3xl font-semibold text-gray-800">Recommended Videos</h2>
          <p className="text-gray-600 mt-2">Explore curated content just for you based on your preferences.</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {videos.map((video, index) => (
              <div
                key={video.id}
                className="bg-white shadow-md rounded-lg overflow-hidden transform transition hover:scale-105 hover:shadow-lg"
                onClick={() => handleVideoClick(video)}
              >
                <img
                  src={thumbnails[index]?.thumbnails?.high || 'https://via.placeholder.com/400x250'}
                  alt={video.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800">{video.title}</h3>
                  <p className="text-sm text-gray-600 mt-2">Topic: {video.topic || 'Unknown Topic'}</p>
                  <p className="text-sm text-gray-600">Duration: {video.duration || 'Unknown Duration'}</p>

                  <div className="mt-4 flex items-center justify-between">
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                      {video.badge || 'Recommended'}
                    </span>
                    <button className="text-sm text-blue-600 font-medium hover:underline">
                      View Video
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
