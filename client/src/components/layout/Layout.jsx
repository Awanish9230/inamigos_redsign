import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import DonationModal from './DonationModal';

const Layout = () => {
  return (
    <div className="min-h-screen w-full flex flex-col relative">
      <Navbar />
      <main className="flex-grow w-full relative z-10">
        <Outlet />
      </main>
      <Footer />
      <DonationModal />
    </div>
  );
};

export default Layout;
