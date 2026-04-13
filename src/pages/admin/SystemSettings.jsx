import React, { useState } from 'react';
import { ToggleLeft, ToggleRight, Save, Database, Shield, Globe } from 'lucide-react';
import PageTransition from '../../components/PageTransition';
import Toast from '../../components/Toast';

const SystemSettings = () => {
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
  
  // Mock Settings State
  const [settings, setSettings] = useState({
    registrationOpen: true,
    hostelBookingOpen: true,
    maintenanceMode: false,
    semester: '1st Semester, 2025/2026',
    maxCourseUnits: 24,
  });

  const toggleSetting = (key) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = () => {
    setToast({ show: true, type: 'success', message: 'System settings updated successfully.' });
  };

  return (
    <PageTransition>
      <div className="space-y-6 max-w-4xl mx-auto">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-800 dark:text-white">System Settings</h2>
            <p className="text-slate-500 dark:text-slate-400 mt-1">Configure global portal parameters and module availability.</p>
          </div>
          <button 
            onClick={handleSave}
            className="flex items-center gap-2 px-6 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-medium rounded-xl transition-colors shadow-md shadow-rose-500/20"
          >
            <Save className="w-5 h-5" />
            Save Changes
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="col-span-1 md:col-span-2 space-y-6">
            
            {/* Global Modules */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-700/50">
              <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-6 flex items-center gap-2">
                <Globe className="w-5 h-5 text-rose-500" />
                Global Modules
              </h3>
              
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-slate-800 dark:text-white">Course Registration</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">Allow students to register for courses.</p>
                  </div>
                  <button onClick={() => toggleSetting('registrationOpen')} className="text-slate-400 hover:text-rose-500 transition-colors">
                    {settings.registrationOpen ? <ToggleRight className="w-10 h-10 text-emerald-500" /> : <ToggleLeft className="w-10 h-10" />}
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-slate-800 dark:text-white">Hostel Allocation</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">Open the portal for room booking.</p>
                  </div>
                  <button onClick={() => toggleSetting('hostelBookingOpen')} className="text-slate-400 hover:text-rose-500 transition-colors">
                    {settings.hostelBookingOpen ? <ToggleRight className="w-10 h-10 text-emerald-500" /> : <ToggleLeft className="w-10 h-10" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Academic Config */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-700/50">
              <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-6 flex items-center gap-2">
                <Database className="w-5 h-5 text-indigo-500" />
                Academic Configuration
              </h3>
              
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Current Semester</label>
                  <input
                    type="text"
                    value={settings.semester}
                    onChange={(e) => setSettings({...settings, semester: e.target.value})}
                    className="block w-full px-4 py-2.5 border border-slate-200 dark:border-slate-700/50 rounded-lg text-slate-900 dark:text-white focus:ring-2 focus:ring-rose-500 focus:outline-none bg-slate-50 dark:bg-slate-900/50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Maximum Registration Units</label>
                  <input
                    type="number"
                    value={settings.maxCourseUnits}
                    onChange={(e) => setSettings({...settings, maxCourseUnits: Number(e.target.value)})}
                    className="block w-full px-4 py-2.5 border border-slate-200 dark:border-slate-700/50 rounded-lg text-slate-900 dark:text-white focus:ring-2 focus:ring-rose-500 focus:outline-none bg-slate-50 dark:bg-slate-900/50"
                  />
                  <p className="text-xs text-slate-500 mt-1.5">The maximum amount of units a student can take concurrently.</p>
                </div>
              </div>
            </div>

          </div>

          <div className="col-span-1">
            <div className="bg-rose-50 dark:bg-rose-900/10 rounded-2xl p-6 border border-rose-100 dark:border-rose-900/30">
              <h3 className="text-lg font-bold text-rose-800 dark:text-rose-400 mb-4 flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Danger Zone
              </h3>
              
              <div className="space-y-4">
                <div>
                  <p className="font-semibold text-rose-900 dark:text-rose-300 text-sm">Maintenance Mode</p>
                  <p className="text-xs text-rose-700/70 dark:text-rose-400/70 mt-1 mb-2">Block all non-admin logins immediately.</p>
                  <button 
                    onClick={() => toggleSetting('maintenanceMode')}
                    className={`w-full py-2.5 rounded-lg text-sm font-bold transition-colors ${
                      settings.maintenanceMode 
                        ? 'bg-rose-600 text-white' 
                        : 'bg-white/50 dark:bg-rose-950 border border-rose-200 dark:border-rose-800 text-rose-600 dark:text-rose-400 hover:bg-rose-100 dark:hover:bg-rose-900'
                    }`}
                  >
                    {settings.maintenanceMode ? 'Disable Maintenance' : 'Enable Maintenance'}
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>

      <Toast 
        message={toast.message} 
        type={toast.type} 
        isVisible={toast.show} 
        onClose={() => setToast({ ...toast, show: false })} 
      />
    </PageTransition>
  );
};

export default SystemSettings;
