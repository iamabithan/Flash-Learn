import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import InputField from '../components/Input'; // Assuming you have a reusable InputField component
import Button from '../components/Button'; // Assuming you have a reusable Button component
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import InputDropdown from '../components/DropDown';
import { postSignUpnRequestData } from '../../api/create';
import Notification from '../components/Status';
import logo from '../assets/sns-logo.png';
import './styles.css'

const SignUp = () => {
  const navigate = useNavigate();
  const [notification, setNotification] = useState({
    message: '',
    type: 'success',
  });

  // Validation schema for the form
  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    grade: Yup.string().required('Grade is required'),
    medium: Yup.string().required('Medium is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm password is required'),
  });

  return (
    <div>
      {/* Notification Component */}
      <Notification
        message={notification.message}
        type={notification.type}
        duration={3000}
        onClose={() => setNotification({ message: '', type: 'success' })}
      />

      <div className='min-h-screen flex flex-col lg:flex-row items-center justify-around bg-gray-100 w-full p-4'>
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
        <div className='w-full max-w-md p-8 bg-white rounded-lg shadow-md mr-0 lg-mr-40 glassy-card'>
          <h1 className='text-2xl font-bold text-center mb-6 text-gray-800'>Sign Up</h1>
          <Formik
            initialValues={{
              name: '',
              email: '',
              grade: '',
              medium: '',
              password: '',
              confirmPassword: '', // Included for validation only
            }}
            validationSchema={validationSchema}
            onSubmit={async (values, { setSubmitting }) => {
              try {
                // Exclude confirmPassword from the final payload
                const { confirmPassword, ...payload } = values;

                await postSignUpnRequestData(payload); // Send the data

                // Show success notification
                setNotification({
                  message: 'User created successfully!',
                  type: 'success',
                });

                // Navigate to user detail page on success
                setTimeout(() => {
                  navigate('/login');
                }, 3000);
              } catch (error) {
                console.error('Error during sign up:', error);

                // Show error notification
                setNotification({
                  message: 'Failed to create user. Please try again.',
                  type: 'error',
                });
              } finally {
                setSubmitting(false);
              }
            }}
          >
            {({ errors, touched, handleChange, handleBlur, values, setFieldValue }) => (
              <Form>
                <InputField
                  type='text'
                  name='name'
                  placeholder='Enter your name'
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.name && errors.name}
                />

                {/* Grade Dropdown */}
                <InputDropdown
                  options={['6', '7', '8', '9', '10','11', '12']}
                  onSelect={(selectedOption) => setFieldValue('grade', selectedOption)}
                  placeholder='Select your grade'
                  error={touched.grade && errors.grade}
                />

                {/* Medium Dropdown */}
                <InputDropdown
                  options={['Tamil', 'English']}
                  onSelect={(selectedOption) => setFieldValue('medium', selectedOption)}
                  placeholder='Select your medium'
                  error={touched.medium && errors.medium}
                />

                <InputField
                  type='email'
                  name='email'
                  placeholder='Email'
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.email && errors.email}
                />

                <InputField
                  type='password'
                  name='password'
                  placeholder='Password'
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.password && errors.password}
                />

                <InputField
                  type='password'
                  name='confirmPassword'
                  placeholder='Confirm Password'
                  value={values.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.confirmPassword && errors.confirmPassword}
                />

                <Button type='submit'>Sign Up</Button>
              </Form>
            )}
          </Formik>

          <div className='text-sm flex justify-center pt-3'>
            Already have an account?&nbsp;
            <Link to='/login' className='text-blue-500 hover:underline'>
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
