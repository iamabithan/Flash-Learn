import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './SideBar';

function Layout() {
  return (
    <div className='flex min-h-screen w-full'>
 
        <Sidebar />
     
      <div className='flex-1'>
        <main className='main-content bg-muted/40'>
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Layout;
