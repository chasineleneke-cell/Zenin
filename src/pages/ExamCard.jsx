import React from 'react';
import PageTransition from '../components/PageTransition';
import useStore from '../store/useStore';
import { User, QrCode, Printer } from 'lucide-react';
import logoSrc from '../assets/naub-logo.png';

const ExamCard = () => {
  const user = useStore(state => state.user);

  return (
    <PageTransition>
      <div className="space-y-6 max-w-4xl mx-auto">
        <div className="flex justify-between items-center bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700">
          <div>
            <h2 className="text-xl font-bold text-slate-800 dark:text-white">Exam Clearance Card</h2>
            <p className="text-sm text-slate-500">First Semester 2025/2026</p>
          </div>
          <button className="btn-primary flex items-center gap-2">
            <Printer className="w-5 h-5" /> Print Card
          </button>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg border-2 border-slate-200 dark:border-slate-700 p-8 relative overflow-hidden">
          {/* Watermark */}
          <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
            <img src={logoSrc} alt="watermark" className="w-96" />
          </div>

          <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start">
            <div className="w-32 h-32 flex-shrink-0 bg-slate-100 dark:bg-slate-700 rounded-lg overflow-hidden border-4 border-white dark:border-slate-600 shadow-md">
              {user?.avatar ? (
                <img src={user.avatar} alt="Student" className="w-full h-full object-cover" />
              ) : (
                <User className="w-full h-full p-4 text-slate-400" />
              )}
            </div>
            
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8">
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Full Name</p>
                <p className="font-medium text-lg text-slate-800 dark:text-white">{user?.name}</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Matriculation No.</p>
                <p className="font-bold text-lg text-primary-600 dark:text-primary-400">{user?.matricNo}</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Level</p>
                <p className="font-medium text-slate-800 dark:text-white">300L</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Department</p>
                <p className="font-medium text-slate-800 dark:text-white">Computer Science</p>
              </div>
              <div className="sm:col-span-2 pt-4 border-t border-slate-100 dark:border-slate-700">
                <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span> CLEARED FOR ALL COMPULSORY EXAMS
                </p>
              </div>
            </div>

            <div className="flex-shrink-0 bg-slate-50 dark:bg-slate-900 p-3 rounded-lg border border-slate-200 dark:border-slate-700">
              <QrCode className="w-24 h-24 text-slate-800 dark:text-slate-200" />
              <p className="text-[10px] text-center mt-2 text-slate-500">Scan to Verify</p>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default ExamCard;
