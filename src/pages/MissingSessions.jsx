import React from 'react';
import PageTransition from '../components/PageTransition';
import { AlertTriangle, Send } from 'lucide-react';

const MissingSessions = () => {
  return (
    <PageTransition>
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/50 rounded-xl p-6 flex gap-4">
          <AlertTriangle className="w-8 h-8 text-amber-500 shrink-0" />
          <div>
            <h2 className="text-lg font-bold text-slate-800 dark:text-amber-500 mb-1">Declare Missing Sessions</h2>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Use this module to formally notify your department of an inability to attend mandatory lectures or exams due to health or logistics.
            </p>
          </div>
        </div>

        <form className="card p-6 space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Issue Type</label>
            <select className="w-full px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
              <option>Medical Emergency</option>
              <option>Logistics / Transport</option>
              <option>Bereavement</option>
              <option>Other</option>
            </select>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Course Code (if applicable)</label>
              <input type="text" placeholder="e.g. CSC 301" className="w-full px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Date of Absence</label>
              <input type="date" className="w-full px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Description & Reason</label>
            <textarea rows="4" placeholder="Provide detailed context..." className="w-full px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900"></textarea>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Supporting Evidence (Optional)</label>
            <input type="file" className="text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100" />
          </div>

          <button type="button" className="btn-primary w-full flex justify-center items-center gap-2 py-3">
            <Send className="w-4 h-4" /> Submit Declaration
          </button>
        </form>
      </div>
    </PageTransition>
  );
};

export default MissingSessions;
