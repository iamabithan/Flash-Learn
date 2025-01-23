import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './SideBar';
import '../pages/styles.css';

function Layout() {
  return (
    <div className='flex min-h-screen w-full'>
      {/* Sidebar */}
      <div className=' md:block md:w-64 text-white transition-all duration-300'>
        <Sidebar />
      </div>
      {/* Main Content */}
      <div className='flex-1 background'>
        <main className='main-content bg-muted/40'>
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Layout;
