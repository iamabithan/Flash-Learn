import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTachometerAlt, FaSpa, FaSignOutAlt, FaUsers, FaVideo } from 'react-icons/fa';
import ConfirmationModal from './Model';
import { getCurrentUserRole, fetchUserRole } from './userRole'; // Assume this is a function that fetches the user's role.

function Sidebar() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [userRole, setUserRole] = useState('');

  const getRole = async () => {
    try {
      await fetchUserRole(); // Call fetchUserRole to determine the user's role
      const role = getCurrentUserRole();
      setUserRole(role);
      console.log({ role });
    } catch {
      console.log("Faild to get the user Role")
    }
  };
  getRole()
  const handleLogout = async () => {
    try {
      await localStorage.removeItem('authToken');
      console.log('User logged out successfully');
      window.location.href = '/login'; // Redirect to login page
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const renderLinks = () => {
    if (userRole === 'admin') {
      return (
        <>
          <Link
            to='/users'
            className='flex items-center p-3 rounded-lg text-gray-200 hover:bg-gray-700 hover:text-white transition-colors duration-300'
            onClick={() => setIsSidebarOpen(false)}
          >
            <FaUsers size={20} className='mr-3' />
            <span className='text-lg'>Users</span>
          </Link>
          <Link
            to='/add-video'
            className='flex items-center p-3 rounded-lg text-gray-200 hover:bg-gray-700 hover:text-white transition-colors duration-300'
            onClick={() => setIsSidebarOpen(false)}
          >
            <FaVideo size={20} className='mr-3' />
            <span className='text-lg'>Add Video</span>
          </Link>
          <Link
            to='/add-relax-video'
            className='flex items-center p-3 rounded-lg text-gray-200 hover:bg-gray-700 hover:text-white transition-colors duration-300'
            onClick={() => setIsSidebarOpen(false)}
          >
            <FaSpa size={20} className='mr-3' />
            <span className='text-lg'>Add Relax Video</span>
          </Link>
          <Link
            to='/all-videos'
            className='flex items-center p-3 rounded-lg text-gray-200 hover:bg-gray-700 hover:text-white transition-colors duration-300'
            onClick={() => setIsSidebarOpen(false)}
          >
            <FaVideo size={20} className='mr-3' />
            <span className='text-lg'>All Videos</span>
          </Link>
        </>
      );
    }

    return (
      <>
        <Link
          to='/dashboard'
          className='flex items-center p-3 rounded-lg text-gray-200 hover:bg-gray-700 hover:text-white transition-colors duration-300'
          onClick={() => setIsSidebarOpen(false)}
        >
          <FaTachometerAlt size={20} className='mr-3' />
          <span className='text-lg'>Dashboard</span>
        </Link>
        <Link
          to='/relax'
          className='flex items-center p-3 rounded-lg text-gray-200 hover:bg-gray-700 hover:text-white transition-colors duration-300'
          onClick={() => setIsSidebarOpen(false)}
        >
          <FaSpa size={20} className='mr-3' />
          <span className='text-lg'>Relax</span>
        </Link>
      </>
    );
  };

  return (
    <div className='relative'>
      {/* Hamburger Button */}
      <button
        className='md:hidden p-3 text-white bg-gray-800 hover:bg-gray-700 fixed top-4 left-4 rounded-full shadow-lg z-50 transition-transform duration-300'
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        <FaBars size={24} />
      </button>

      {/* Sidebar */}
    <div
      className={`fixed top-0 left-0 h-screen ${
        userRole === 'admin' ? 'bg-pink-600' : 'bg-gray-900'
      } text-white shadow-lg z-40 transform ${
        isSidebarOpen ? 'translate-x-0' : 'md:translate-x-0 -translate-x-full'
      } transition-transform duration-300 md:translate-x-0 md:w-64 overflow-y-auto`}
    >

        {/* Sidebar Header */}
        <div className='p-6 border-b border-gray-700'>
          <h1 className='text-3xl font-semibold text-gray-100'>{userRole === 'admin' ? 'Admin Panel' : 'Student Portal'}</h1>
          <p className='text-sm text-gray-400'>{userRole === 'admin' ? 'Manage the platform' : 'Your learning companion'}</p>
        </div>

        {/* Navigation Links */}
        <nav className='mt-6 flex flex-col space-y-4 px-4'>
          {renderLinks()}
          <button
            className='flex items-center p-3 rounded-lg text-gray-200 hover:bg-red-600 hover:text-white transition-colors duration-300'
            onClick={() => {
              setIsSidebarOpen(false);
              setIsModalOpen(true);
            }}
          >
            <FaSignOutAlt size={20} className='mr-3' />
            <span className='text-lg'>Logout</span>
          </button>
        </nav>

        {/* Footer */}
        <div className='absolute bottom-6 left-6'>
          <p className='text-sm text-gray-600'>
            © 2024 <span className='text-gray-400'>Your Company</span>
          </p>
        </div>
      </div>

      {/* Overlay for Small Screens */}
      {isSidebarOpen && <div className='fixed inset-0 bg-black bg-opacity-50 md:hidden z-30' onClick={() => setIsSidebarOpen(false)}></div>}

      {/* Confirmation Modal */}
      <ConfirmationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onConfirm={handleLogout} />
    </div>
  );
}

export default Sidebar;
