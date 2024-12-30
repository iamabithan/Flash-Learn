import React from 'react';
import { BrowserRouter as Router, Routes, Route,Navigate } from 'react-router-dom';
import Login from './pages/login';
import Signup from './pages/signUp';
import Details from './pages/Details';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path='/userdetail' element={<Details />} />
      </Routes>
    </Router>
  );
};

export default App;
