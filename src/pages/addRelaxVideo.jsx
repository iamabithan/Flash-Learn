import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import InputDropdown from '../components/DropDown';
import { addRelaxVideo } from '../../api/create';
import InputField from '../components/Input';
import Button from '../components/Button';
import Notification from '../components/Status';

const AddRelaxVideo = () => {
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
        await addRelaxVideo(values);
        setNotification({ message: 'Video added successfully!', type: 'success' });
        resetForm();
      } catch (error) {
        setNotification({ message: 'Failed to add video.', type: 'error' });
      }
    },
  });

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-purple-700 text-white p-6">
        <h1 className="text-3xl font-bold">Relax Video Management</h1>
      </header>

      {/* Form Container */}
      <div className="max-w-4xl mx-auto mt-8 bg-white shadow-md rounded-lg p-8">
        <h2 className="text-2xl font-bold mb-4 text-center">Add Relax Video</h2>
        
        {notification.message && (
          <Notification
            message={notification.message}
            type={notification.type}
            duration={3000}
            onClose={() => setNotification({ message: '', type: '' })}
          />
        )}
        
        <form onSubmit={formik.handleSubmit} className="space-y-6">
          <InputField
            type="text"
            name="subject"
            placeholder="Enter subject"
            value={formik.values.subject}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.subject && formik.errors.subject}
          />

          <InputDropdown
            options={['1', '6', '7', '8', '9', '10']}
            onSelect={(selectedOption) => formik.setFieldValue('grade', selectedOption)}
            placeholder="Select your grade"
            error={formik.touched.grade && formik.errors.grade}
          />

          <InputField
            type="text"
            name="language"
            placeholder="Enter language"
            value={formik.values.language}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.language && formik.errors.language}
          />

          <InputField
            type="text"
            name="topic"
            placeholder="Enter topic"
            value={formik.values.topic}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.topic && formik.errors.topic}
          />

          <InputField
            type="text"
            name="title"
            placeholder="Enter title"
            value={formik.values.title}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.title && formik.errors.title}
          />

          <InputField
            type="text"
            name="url"
            placeholder="Enter video URL"
            value={formik.values.url}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.url && formik.errors.url}
          />

          <InputField
            type="text"
            name="duration"
            placeholder="Enter duration"
            value={formik.values.duration}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.duration && formik.errors.duration}
          />

          <div className="flex space-x-4">
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddRelaxVideo;
