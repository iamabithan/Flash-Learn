import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import InputField from "../components/Input"; // Reusable InputField component
import Button from "../components/Button"; // Reusable Button component
import { Link } from "react-router-dom";
import InputDropdown from "../components/DropDown"; // Reusable InputDropdown component

const Details = () => {
  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    class: Yup.string().required("Class is required"),
    medium: Yup.string().required("Medium is required"),
  });

  const handleSubmit = (values) => {
    console.log(values);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">Sign Up</h1>
        <Formik
          initialValues={{ name: "", class: "", medium: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, handleChange, handleBlur, values, setFieldValue }) => (
            <Form>
              {/* Name Input */}
              <InputField
                type="text"
                name="name"
                placeholder="Enter your name"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.name && errors.name}
              />

              {/* Class Dropdown */}
              <InputDropdown
                options={["6", "7", "8", "9", "10"]}
                onSelect={(selectedOption) => setFieldValue("class", selectedOption)}
                placeholder="Select your class"
                error={touched.class && errors.class}
              />

              {/* Medium Dropdown */}
              <InputDropdown
                options={["Tamil", "English"]}
                onSelect={(selectedOption) => setFieldValue("medium", selectedOption)}
                placeholder="Select your medium"
                error={touched.medium && errors.medium}
              />

              {/* Submit Button */}
              <Button type="submit">Sign Up</Button>
            </Form>
          )}
        </Formik>

        <div className="text-sm flex justify-center pt-3">
          Already have an account?&nbsp;
          <Link to="/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Details;
