import React, { useState, useEffect } from 'react';
import axios from 'axios';

const VideoApp = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch videos from the backend
  const fetchVideos = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:3000/api/videoplayer'); // Adjust route if needed
      setVideos(response.data);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch videos.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  return (
    <div>
      <h1>Video App</h1>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {videos.map((video) => (
          <li key={video.id}>
            {video.title} - <a href={video.url} target="_blank" rel="noreferrer">Watch</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VideoApp;
