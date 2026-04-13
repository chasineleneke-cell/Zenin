import React from 'react';
import { FileText, Calendar, CheckSquare, Clock } from 'lucide-react';
import useStore from '../../store/useStore';
import PageTransition from '../../components/PageTransition';

const LecturerDashboard = () => {
  const user = useStore(state => state.user);
  const pendingRegs = useStore(state => state.pendingRegistrations).filter(r => r.status === 'Pending');

  return (
    <PageTransition>
      <div className="space-y-6">
        
        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-amber-600 to-orange-600 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full transform translate-x-1/2 -translate-y-1/2"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h2 className="text-3xl font-bold mb-2">Welcome Back, {user?.name}</h2>
              <p className="text-orange-100 max-w-xl text-lg font-light">
                You have {pendingRegs.length} pending course registrations to review today.
              </p>
            </div>
            
            <div className="flex gap-4 bg-white/10 p-4 rounded-2xl backdrop-blur-sm">
              <div className="text-center px-4 border-r border-white/20">
                <p className="text-3xl font-bold">{user?.assignedCourses?.length || 0}</p>
                <p className="text-orange-200 text-sm">Active Courses</p>
              </div>
              <div className="text-center px-4">
                <p className="text-3xl font-bold">142</p>
                <p className="text-orange-200 text-sm">Total Students</p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700/50 shadow-sm transition-colors">
            <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 rounded-xl flex items-center justify-center mb-4">
              <CheckSquare className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-2">Pending Approvals</h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm mb-4">Review student requests to join your assigned courses.</p>
            <span className="inline-block px-3 py-1 bg-rose-50 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 text-xs font-bold rounded-full">
              {pendingRegs.length} Action Required
            </span>
          </div>

          <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700/50 shadow-sm transition-colors">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-xl flex items-center justify-center mb-4">
              <FileText className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-2">Grade Submissions</h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm mb-4">Input and publish continuous assessment scores for students.</p>
            <span className="inline-block px-3 py-1 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 text-xs font-bold rounded-full">
              Open
            </span>
          </div>

          <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700/50 shadow-sm transition-colors">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-xl flex items-center justify-center mb-4">
              <Calendar className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-2">Next Lecture</h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm mb-4">CSC 401 - Advanced Algorithms</p>
            <div className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-300 font-medium bg-slate-50 dark:bg-slate-700/50 p-2 rounded-lg inline-flex">
              <Clock className="w-4 h-4 text-purple-500" />
              Today, 2:00 PM
            </div>
          </div>
        </div>

      </div>
    </PageTransition>
  );
};

export default LecturerDashboard;
