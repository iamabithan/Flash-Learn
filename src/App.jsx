import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/login';
import Signup from './pages/signUp';
import Dashboard from './pages/Courses';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';
import Relax from './pages/relax';

const App = () => {
  const authToken = localStorage.getItem('authToken');

  return (
    <Router>
      <Routes>
        <Route path='/login' element={authToken ? <Navigate to='/dashboard' replace /> : <Login />} />
        <Route path='/signup' element={authToken ? <Navigate to='/dashboard' replace /> : <Signup />} />
        <Route path='/' element={<Navigate to={authToken ? '/dashboard' : '/login'} replace />} />

        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/relax' element={<Relax />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
