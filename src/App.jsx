import React from 'react';
import { BrowserRouter as Router, Routes, Route,Navigate } from 'react-router-dom';
import Login from './pages/login';
import Signup from './pages/signUp';
import Dashboard from './pages/Courses';
import ProtectedRoute from './components/ProtectedRoute'


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>

      </Routes>
    </Router>
  );
};

export default App;
