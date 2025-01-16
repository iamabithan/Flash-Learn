import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getVideo } from '../../api/list';
import { getYtThumbnail } from '../../api/create';

const AllVideos = () => {
  const [videos, setVideos] = useState([]);
  const [filteredVideos, setFilteredVideos] = useState([]);
  const [thumbnails, setThumbnails] = useState([]);
  const [error, setError] = useState(null);
  const [selectedGrade, setSelectedGrade] = useState('All'); // State for selected grade filter
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const videoResponse = await getVideo();
        const videoList = videoResponse.data;

        setVideos(videoList);
        setFilteredVideos(videoList);

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

    fetchVideos();
  }, []);

  useEffect(() => {
    // Filter videos based on selected grade
    if (selectedGrade === 'All') {
      setFilteredVideos(videos);
    } else {
      setFilteredVideos(videos.filter((video) => video.grade === selectedGrade));
    }
  }, [selectedGrade, videos]);

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

  const handleVideoClick = (video) => {
    navigate('/content', { state: { video } });
  };

  return (
    <div>
      <div className="p-6 flex-1">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-semibold text-gray-800">All Videos</h2>
          <select
            className="px-4 pl-2 py-2 bg-white border border-gray-300 rounded shadow focus:outline-none focus:ring focus:border-blue-300"
            value={selectedGrade}
            onChange={(e) => setSelectedGrade(e.target.value)}
          >
            <option value="All">All Grades</option>
            {Array.from(new Set(videos.map((video) => video.grade)))
              .filter((grade) => grade)
              .map((grade) => (
                <option key={grade} value={grade}>
                  {grade}
                </option>
              ))}
          </select>
        </div>
        <p className="text-gray-600 mt-2">Videos you have uploaded.</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mt-6">
          {filteredVideos.map((video, index) => (
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
                <p className="text-sm text-gray-600">Grade: {video.grade || 'Unknown Grade'}</p>
                <div className="mt-4 flex items-center justify-between">
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
  );
};

export default AllVideos;
