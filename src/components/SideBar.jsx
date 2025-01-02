import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ConfirmationModal from './Model';

function Sidebar() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await localStorage.removeItem("authToken")
      console.log('User logged out successfully');
      // Redirect or handle post-logout actions
      window.location.href = '/login'; // Example redirect to login page
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <div className="bg-slate-800 w-64 h-screen p-5 shadow-lg">
      <h1 className="text-white text-2xl font-bold mb-6">Student Sidebar</h1>
      <div className="flex flex-col space-y-4">
        <Link
          to="/dashboard"
          className="text-white text-lg px-4 py-2 rounded-md hover:bg-slate-700 hover:scale-105 transform transition-all duration-300"
        >
          Dashboard
        </Link>
        <Link
          to="/relax"
          className="text-white text-lg px-4 py-2 rounded-md hover:bg-slate-700 hover:scale-105 transform transition-all duration-300"
        >
          Relax
        </Link>
        <button
          className="text-white text-lg px-4 py-2 flex justify-start rounded-md hover:bg-red-600 hover:scale-105 transform transition-all duration-300"
          onClick={() => setIsModalOpen(true)}
        >
          Logout
        </button>
      </div>
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleLogout}
      />
    </div>
  );
}

export default Sidebar;
