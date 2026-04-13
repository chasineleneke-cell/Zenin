import React from 'react';
import { Users, FileText, Activity } from 'lucide-react';
import PageTransition from '../../components/PageTransition';

const AdminDashboard = () => {
  return (
    <PageTransition>
      <div className="space-y-6">
        
        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-rose-500 opacity-10 rounded-full transform translate-x-1/2 -translate-y-1/2 blur-2xl"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h2 className="text-3xl font-bold mb-2">Administrator Portal</h2>
              <p className="text-slate-300 max-w-xl text-lg font-light">
                Overview of university wide statistics and health.
              </p>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700/50 shadow-sm flex items-start gap-4 transition-colors">
            <div className="w-12 h-12 bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 rounded-xl flex items-center justify-center shrink-0">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Total Enrolled Students</p>
              <h3 className="text-2xl font-bold text-slate-800 dark:text-white">12,450</h3>
              <p className="text-xs text-emerald-500 font-medium mt-1">+12% from last semester</p>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700/50 shadow-sm flex items-start gap-4 transition-colors">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-xl flex items-center justify-center shrink-0">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Registration Status</p>
              <h3 className="text-2xl font-bold text-slate-800 dark:text-white">Active</h3>
              <p className="text-xs text-slate-400 font-medium mt-1">Portal closes in 14 days</p>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700/50 shadow-sm flex items-start gap-4 transition-colors">
            <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-xl flex items-center justify-center shrink-0">
              <Activity className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">System Uptime</p>
              <h3 className="text-2xl font-bold text-slate-800 dark:text-white">99.9%</h3>
              <p className="text-xs text-slate-400 font-medium mt-1">All services operational</p>
            </div>
          </div>
        </div>

      </div>
    </PageTransition>
  );
};

export default AdminDashboard;
