import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const Notification = ({ message, type, duration, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (message) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
        if (onClose) onClose(); // Trigger onClose callback after hiding
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [message, duration, onClose]);

  if (!isVisible || !message) return null;

  const typeStyles = {
    success: 'bg-green-100 text-green-800 border-green-400',
    error: 'bg-red-100 text-red-800 border-red-400',
  };

  return (
    <div
      className={`fixed top-4 right-4 max-w-sm w-full p-4 border rounded-md shadow-md transition-transform transform ${
        typeStyles[type] || 'bg-gray-100 text-gray-800 border-gray-400'
      }`}
    >
      <p className="text-sm">{message}</p>
    </div>
  );
};

Notification.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['success', 'error']),
  duration: PropTypes.number,
  onClose: PropTypes.func,
};

Notification.defaultProps = {
  type: 'success',
  duration: 3000,
  onClose: null,
};

export default Notification;
