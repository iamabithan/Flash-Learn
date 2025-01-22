import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaBars, FaTachometerAlt, FaSpa, FaSignOutAlt, FaUsers, FaVideo } from "react-icons/fa";
import ConfirmationModal from "./Model";

function Sidebar() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [userRole, setUserRole] = useState("");
  const location = useLocation(); // Get the current route path

  useEffect(() => {
    const getRole = async () => {
      try {
        const role = await localStorage.getItem("role");
        setUserRole(role || "");
        console.log({ role });
      } catch {
        console.log("Failed to get the user role");
      }
    };

    getRole();
  }, []);

  const handleLogout = async () => {
    try {
      await localStorage.removeItem('authToken');
      await localStorage.removeItem('role');
      console.log('User logged out successfully');
      window.location.href = '/'; // Redirect to login page
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const renderLinks = () => {
    const links = userRole === "admin" 
      ? [
          { to: "/users", icon: <FaUsers size={20} />, label: "Users" },
          { to: "/add-video", icon: <FaVideo size={20} />, label: "Add Video" },
          { to: "/add-relax-video", icon: <FaSpa size={20} />, label: "Add Relax Video" },
          { to: "/all-videos", icon: <FaVideo size={20} />, label: "All Videos" },
        ]
      : [
          { to: "/dashboard", icon: <FaTachometerAlt size={20} />, label: "Dashboard" },
          { to: "/relax", icon: <FaSpa size={20} />, label: "Relax" },
        ];

    return links.map((link) => (
      <Link
        key={link.to}
        to={link.to}
        className={`flex items-center p-3 rounded-lg transition-colors duration-300 ${
          location.pathname === link.to
            ? "bg-white text-gray-900 font-bold shadow-md"
            : "text-gray-200 hover:bg-gray-700 hover:text-white"
        }`}
        onClick={() => setIsSidebarOpen(false)}
      >
        <span className="mr-3">{link.icon}</span>
        <span className="text-lg">{link.label}</span>
      </Link>
    ));
  };

  return (
    <div className="relative">
      <button
        className="md:hidden p-3 text-white fixed top-4 left-1 rounded-full z-50 transition-transform duration-300"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        <FaBars size={24} />
      </button>
      <div
        className={`fixed top-0 left-0 h-screen ${
          userRole === "admin" ? "bg-gray-900" : "bg-gray-900"
        } text-white shadow-lg z-40 transform ${
          isSidebarOpen ? "translate-x-0" : "md:translate-x-0 -translate-x-full"
        } transition-transform duration-300 md:translate-x-0 md:w-64 overflow-y-auto`}
      >
        {/* Sidebar Header */}
        <div className="p-6 border-b border-gray-700 ml-9 md:ml-0">
          <h1 className="text-3xl font-semibold text-gray-100">
            {userRole === "admin" ? "Admin Panel" : "Student Portal"}
          </h1>
          <p className="text-sm text-gray-400">
            {userRole === "admin" ? "Manage the platform" : "Your learning companion"}
          </p>
        </div>

        {/* Navigation Links */}
        <nav className="mt-6 flex flex-col space-y-4 px-4 ml-9 md:ml-0">
          {renderLinks()}
          <button
            className="flex items-center p-3 rounded-lg text-gray-200 hover:bg-red-600 hover:text-white transition-colors duration-300"
            onClick={() => {
              setIsSidebarOpen(false);
              setIsModalOpen(true);
            }}
          >
            <FaSignOutAlt size={20} className="mr-3" />
            <span className="text-lg">Logout</span>
          </button>
        </nav>

        {/* Footer */}
        <div className="absolute bottom-6 left-6">
          <p className="text-sm text-gray-600">
            © 2025 <span className="text-gray-400">3 Dot Studios</span>
          </p>
        </div>  
      </div>

      {/* Overlay for Small Screens */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 md:hidden z-30"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleLogout}
      />
    </div>
  );
}

export default Sidebar;
