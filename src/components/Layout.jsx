import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import Sidebar from './SideBar';

function Layout() {
  return (
    <div className='flex min-h-screen w-full'>
      {/* Admin sidebar */}
      <Sidebar />

      <div className='flex flex-1 flex-col'>
        {/* Admin Header */}
        {/* <AdminHeader setOpen={setOpenSidebar} /> */}
        <main className='flex-1 flex bg-muted/40 p-4  md:p-6'>
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Layout;
