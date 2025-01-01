import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import InputField from '../components/Input';
import Button from '../components/Button';
import { postLoginRequestData } from '../../api/create';
import Notification from '../components/Status'; // Assuming you have a reusable notification component

const Login = () => {
  const [notification, setNotification] = useState({ message: '', type: '' });
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const handleLogin = async (values) => {
    try {
      const response = await postLoginRequestData(values); // API call to login
      console.log(response)
      const { token } = response;

      localStorage.setItem('authToken', token); // Store token
      setNotification({ message: 'Login successful!', type: 'success' });

      setTimeout(() => navigate('/dashboard'), 1000); // Redirect after showing success message
    } catch (error) {
      console.error('Login error:', error);
      setNotification({ 
        message: error.response?.data?.message || 'Invalid email or password.', 
        type: 'error' 
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
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
              <Button type="submit" className="mt-4">Login</Button>
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
