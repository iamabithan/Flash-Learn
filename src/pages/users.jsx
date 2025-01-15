import React, { useEffect, useState, useRef } from 'react';
import Table from '../components/Table'; // Import the table component
import { getAllUsers } from '../../api/list';
import { BsThreeDotsVertical } from 'react-icons/bs'; // Import the icon

const Users = () => {
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const modalRef = useRef();

  useEffect(() => {
    // Fetch users data when the component mounts
    const fetchData = async () => {
      const response = await getAllUsers();
      setUsers(Object.entries(response.data).map(([id, user]) => ({ id, ...user })));
    };

    fetchData();

    // Add event listener for clicks outside the modal
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setSelectedUserId(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleActionClick = (userId, action) => {
    switch (action) {
      case 'delete':
        console.log(`Deleting user with ID: ${userId}`);
        break;
      case 'assignAdmin':
        console.log(`Assigning admin privileges to user with ID: ${userId}`);
        break;
      default:
        break;
    }
    setSelectedUserId(null); // Close the modal after action
  };

  // Prepare headers and data for the table
  const headers = ['Name', 'Grade', 'Medium', 'Actions'];
  const data = users.map(user => ({
    Name: user.name,
    Grade: user.grade,
    Medium: user.medium,
    Actions: (
      <div className="relative inline-block">
        <button
          className="px-2 py-1 text-gray-600 hover:text-black flex items-center"
          onClick={() =>
            setSelectedUserId(selectedUserId === user.id ? null : user.id)
          }
        >
          <BsThreeDotsVertical size={20} />
        </button>
        {selectedUserId === user.id && (
          <div
            ref={modalRef}
            className="absolute bg-white shadow-lg rounded-md text-gray-700"
            style={{
              top: '35px', // Push the modal below the icon
              left: '0', // Align the modal horizontally with the button
              zIndex: 10, // Ensure it appears above other content
              width: '150px', // Define a standard width for the modal
            }}
          >
            <button
              className="block w-full px-4 py-2 text-sm hover:bg-gray-200"
              onClick={() => handleActionClick(user.id, 'delete')}
            >
              Delete
            </button>
            <button
              className="block w-full px-4 py-2 text-sm hover:bg-gray-200"
              onClick={() => handleActionClick(user.id, 'assignAdmin')}
            >
              Assign as Admin
            </button>
          </div>
        )}
      </div>
    ),
  }));

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Users</h1>
      <Table headers={headers} data={data} />
    </div>
  );
};

export default Users;
