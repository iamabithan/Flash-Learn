import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTachometerAlt, FaSpa, FaSignOutAlt } from 'react-icons/fa';
import ConfirmationModal from './Model';

function Sidebar() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await localStorage.removeItem('authToken');
      console.log('User logged out successfully');
      window.location.href = '/login'; // Redirect to login page
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <div className='relative'>
      {/* Hamburger button for smaller screens */}
      <button
        className='md:hidden p-4 pl-0 text-slate-800 fixed top-4 left-4 rounded-full z-50'
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        <FaBars size={24} />
      </button>

      {/* Sidebar */}
      <div
        className={`bg-slate-700 text-gray-100 fixed top-0 left-0 h-full p-5 shadow-lg z-40 transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out md:translate-x-0 md:relative md:w-64`}
      >
        <h1 className='text-white text-2xl font-bold mb-6 mt-8'>Student Sidebar</h1>
        <div className='flex flex-col space-y-4'>
          <Link
            to='/dashboard'
            className='flex items-center text-lg px-4 py-2 space-x-3 rounded-md hover:bg-slate-600 transition-all duration-300'
            onClick={() => setIsSidebarOpen(false)}
          >
            <FaTachometerAlt />
            <span>Dashboard</span>
          </Link>
          <Link
            to='/relax'
            className='flex items-center text-lg px-4 py-2 space-x-3 rounded-md hover:bg-slate-600 transition-all duration-300'
            onClick={() => setIsSidebarOpen(false)}
          >
            <FaSpa />
            <span>Relax</span>
          </Link>
          <button
            className='flex items-center text-lg px-4 py-2 space-x-3 rounded-md hover:bg-red-600 transition-all duration-300'
            onClick={() => {
              setIsSidebarOpen(false);
              setIsModalOpen(true);
            }}
          >
            <FaSignOutAlt />
            <span>Logout</span>
          </button>
        </div>
        <ConfirmationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onConfirm={handleLogout} />
      </div>

      {/* Overlay for smaller screens */}
      {isSidebarOpen && <div className='fixed inset-0 bg-black bg-opacity-50 md:hidden z-30' onClick={() => setIsSidebarOpen(false)}></div>}
    </div>
  );
}

export default Sidebar;
