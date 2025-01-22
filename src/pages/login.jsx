import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import InputField from '../components/Input';
import Button from '../components/Button';
import { postLoginRequestData, verifyUser } from '../../api/create';
import Notification from '../components/Status'; // Assuming you have a reusable notification component
import { fetchUserRole, getCurrentUserRole } from '../components/userRole';
import logo from '../assets/sns-logo.png';
import './styles.css';

const Login = () => {
  const [notification, setNotification] = useState({ message: '', type: '' });
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const handleLogin = async (values) => {
    try {
      const response = await postLoginRequestData(values);
      const { token } = response;
      localStorage.setItem('authToken', token);
      await fetchUserRole();
      const role = getCurrentUserRole();
      localStorage.setItem('role', role);

      setNotification({ message: 'Login successful!', type: 'success' });

      const payload = JSON.parse(atob(token.split('.')[1]));
      const uid = payload.user_id;

      await verifyUser(uid);

      setTimeout(() => {
        if (role === 'user') {
          navigate('/dashboard');
        } else if (role === 'admin') {
          navigate('/users');
        } else {
          setNotification({
            message: 'User role is not recognized.',
            type: 'error',
          });
        }
      }, 1000);
    } catch (error) {
      setNotification({
        message: error.response?.data?.message || 'Invalid email or password.',
        type: 'error',
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row items-center justify-around bg-gray-100 w-full p-4">
      {/* Left Section: Logo and Text */}
      <div className="flex items-center lg:items-center justify-center text-center lg:text-left p-6">
        <img 
          src={logo} 
          alt="Login" 
          className="h-80 w-55 lg:h-80 lg:w-55 rounded-full transition-transform transform mb-4"
        />
        <p className="text-3xl lg:text-5xl font-bold text-blue-800 tracking-wide">
          Flash <span className="text-blue-500">Learn</span>
        </p>
      </div>

      {/* Right Section: Login Form */}
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md glassy-card lg:ml-12 mt-6 lg:mt-0 mr-0 lg-mr-40">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">Login</h1>

        {notification.message && (
          <Notification
            message={notification.message}
            type={notification.type}
            duration={3000}
            onClose={() => setNotification({ message: '', type: '' })}
          />
        )}

        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={validationSchema}
          onSubmit={handleLogin}
        >
          {({ errors, touched, handleChange, handleBlur, values }) => (
            <Form>
              <InputField
                type="email"
                name="email"
                placeholder="Email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.email && errors.email}
              />
              <InputField
                type="password"
                name="password"
                placeholder="Password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.password && errors.password}
              />
              <Button type="submit" className="mt-4 w-full">Login</Button>
            </Form>
          )}
        </Formik>

        <div className="text-sm flex justify-center pt-3">
          Don't have an account?&nbsp;
          <Link to="/signup" className="text-blue-500 hover:underline">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
