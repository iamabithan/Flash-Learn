import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import InputDropdown from '../components/DropDown';
import { postAddVideo } from '../../api/create';
import InputField from '../components/Input';
import Button from '../components/Button';
import Notification from '../components/Status';

const AddVideo = () => {
  const [notification, setNotification] = useState({ message: '', type: '' });

  const formik = useFormik({
    initialValues: {
      subject: '',
      grade: '',
      language: '',
      topic: '',
      title: '',
      url: '',
      duration: '',
    },
    validationSchema: Yup.object({
      subject: Yup.string().required('Subject is required'),
      grade: Yup.string().required('Grade is required'),
      language: Yup.string().required('Language is required'),
      topic: Yup.string().required('Topic is required'),
      title: Yup.string().required('Title is required'),
      url: Yup.string().url('Invalid URL').required('URL is required'),
      duration: Yup.string().required('Duration is required'),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        await postAddVideo(values);
        setNotification({ message: 'Video added successfully!', type: 'success' });
        resetForm();
      } catch (error) {
        setNotification({ message: 'Failed to add video.', type: 'error' });
      }
    },
  });

  return (
    <div className="flex flex-col items-center bg-gradient-to-r from-blue-500 to-purple-500 text-white p-8 rounded-lg shadow-lg w-3/4 mx-auto max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Add Video</h1>
      {notification.message && (
        <Notification
          message={notification.message}
          type={notification.type}
          duration={3000}
          onClose={() => setNotification({ message: '', type: '' })}
        />
      )}
      <form className="w-full space-y-4" onSubmit={formik.handleSubmit}>
        <InputField
          type="text"
          name="subject"
          placeholder="Enter subject"
          value={formik.values.subject}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.subject && formik.errors.subject}
          className="w-full px-4 py-2 rounded-md text-black"
        />
        <InputDropdown
          options={[ '6', '7', '8', '9', '10', '11', '12']}
          onSelect={(selectedOption) => formik.setFieldValue('grade', selectedOption)}
          placeholder="Select your grade"
          error={formik.touched.grade && formik.errors.grade}
          className="w-full px-4 py-2 rounded-md text-black"
        />
        <InputField
          type="text"
          name="language"
          placeholder="Enter language"
          value={formik.values.language}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.language && formik.errors.language}
          className="w-full px-4 py-2 rounded-md text-black"
        />
        <InputField
          type="text"
          name="topic"
          placeholder="Enter topic"
          value={formik.values.topic}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.topic && formik.errors.topic}
          className="w-full px-4 py-2 rounded-md text-black"
        />
        <InputField
          type="text"
          name="title"
          placeholder="Enter title"
          value={formik.values.title}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.title && formik.errors.title}
          className="w-full px-4 py-2 rounded-md text-black"
        />
        <InputField
          type="text"
          name="url"
          placeholder="Enter video URL"
          value={formik.values.url}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.url && formik.errors.url}
          className="w-full px-4 py-2 rounded-md text-black"
        />
        <InputField
          type="text"
          name="duration"
          placeholder="Enter duration"
          value={formik.values.duration}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.duration && formik.errors.duration}
          className="w-full px-4 py-2 rounded-md text-black"
        />
        <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default AddVideo;