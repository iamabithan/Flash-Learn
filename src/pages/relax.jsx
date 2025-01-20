import React, { useEffect, useState } from 'react';
import Relax from '../components/RelaxComponent.jsx';
import { getRelaxVideosByGrade, getUserDetailById } from '../../api/list.jsx';

const RelaxSection = () => {
  const [videos, setVideos] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (!token) throw new Error('User is not authenticated.');

        const payload = JSON.parse(atob(token.split('.')[1]));
        const userId = payload.user_id;

        // Fetch user details based on userId
        const userResponse = await getUserDetailById(userId);

        // Fetch videos based on the user's grade
        const videoResponse = await getRelaxVideosByGrade(userResponse.data.grade);

        // Assuming videoResponse.data[0].url is an array of video objects
        const videoList = videoResponse.data;  // This is an array of video objects

        // Extract the URL from each video object
        const videoUrls = videoList.map((video) => video.url); // Extract only the URL

        setVideos(videoUrls);  // Set the array of video URLs
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err.message || 'Something went wrong.');
      }
    };

    fetchVideos();
  }, []);

  return (
    <div className='h-screen overflow-y-scroll bg-gray-900 snap-y snap-mandatory'>
      {/* Error Handling */}
      {error && <div className="text-red-500 text-center">{error}</div>}

      {/* Video Mapping */}
      {videos && videos.length > 0 ? (
        videos.map((videoUrl, index) => (
          <Relax key={index} videoUrl={videoUrl} />
        ))
      ) : (
        <div className="text-center text-white">Loading videos...</div>
      )}
    </div>
  );
};

export default RelaxSection;
