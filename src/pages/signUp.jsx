import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import InputField from '../components/Input'; // Assuming you have a reusable InputField component
import Button from '../components/Button'; // Assuming you have a reusable Button component
import { Link} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import InputDropdown from '../components/DropDown';

const SignUp = () => {
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm password is required'),
  });


  return (
    <div>
      <div className='min-h-screen flex items-center justify-center bg-gray-100'>
        <div className='w-full max-w-md p-8 bg-white rounded-lg shadow-md'>
          <h1 className='text-2xl font-bold text-center mb-6 text-gray-800'>Sign Up</h1>
          <Formik
            initialValues={{ email: '', password: '', confirmPassword: '' }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              // console.log("values",values); // Log form values
              navigate('/userdetail'); // Navigate after submission
            }}
          >
            {({ errors, touched, handleChange, handleBlur, values }) => (
              <Form>
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
