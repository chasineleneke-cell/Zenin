import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import useStore from '../store/useStore';

const MainLayout = () => {
  const user = useStore((state) => state.user);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-300 overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col relative overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto overflow-x-hidden pt-16 pb-8 px-4 md:px-8">
          <div className="max-w-7xl mx-auto w-full max-w-[1400px] mt-6 animate-fade-in">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
