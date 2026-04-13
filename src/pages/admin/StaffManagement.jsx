import React, { useState } from 'react';
import { ShieldCheck, UserCheck, Edit3, Save, X } from 'lucide-react';
import useStore from '../../store/useStore';
import PageTransition from '../../components/PageTransition';
import Toast from '../../components/Toast';

const StaffManagement = () => {
  const staffDirectory = useStore(state => state.staffDirectory);
  const updateStaffRole = useStore(state => state.updateStaffRole);

  const [editingId, setEditingId] = useState(null);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
  
  // Local edit states
  const [editAppointments, setEditAppointments] = useState([]);
  const [editLevel, setEditLevel] = useState('');

  const startEditing = (staff) => {
    setEditingId(staff.id);
    setEditAppointments([...(staff.appointments || [])]);
    setEditLevel(staff.advisorForLevel || '100 Level');
  };

  const handleToggleAppointment = (role) => {
    if (editAppointments.includes(role)) {
      setEditAppointments(editAppointments.filter(r => r !== role));
    } else {
      setEditAppointments([...editAppointments, role]);
    }
  };

  const saveChanges = (staffId, staffName) => {
    // If they aren't marked as Level Advisor, nullify the level assigned
    const finalLevel = editAppointments.includes('Level Advisor') ? editLevel : null;
    
    updateStaffRole(staffId, editAppointments, finalLevel);
    
    setEditingId(null);
    setToast({ show: true, type: 'success', message: `${staffName}'s security clearance updated successfully.` });
  };

  return (
    <PageTransition>
      <div className="space-y-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-2">
          <div>
            <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Staff Management & Clearances</h2>
            <p className="text-slate-500 dark:text-slate-400 mt-1">Assign HOD and Level Advisor privileges. Modifications take effect immediately.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {staffDirectory.map(staff => (
            <div key={staff.id} className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700/50 shadow-sm overflow-hidden flex flex-col group relative">
              
              <div className="p-6 flex-1">
                <div className="flex items-start justify-between mb-4">
                  <img src={staff.avatar} alt={staff.name} className="w-14 h-14 rounded-full bg-slate-100 dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700 object-cover" />
                  
                  {!editingId || editingId !== staff.id ? (
                    <button 
                      onClick={() => startEditing(staff)}
                      className="p-2 text-slate-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/30 hover:text-emerald-600 rounded-xl transition-colors"
                      title="Edit Security Roles"
                    >
                      <Edit3 className="w-5 h-5" />
                    </button>
                  ) : null}
                </div>

                <div className="mb-4">
                  <h3 className="text-lg font-bold text-slate-800 dark:text-white flex items-center gap-2">
                    {staff.name}
                    {staff.appointments?.includes('HOD') && <ShieldCheck className="w-4 h-4 text-emerald-500" title="Head of Department" />}
                    {staff.appointments?.includes('Level Advisor') && <UserCheck className="w-4 h-4 text-blue-500" title="Level Advisor" />}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{staff.email}</p>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Department:</span>
                    <span className="font-semibold text-slate-700 dark:text-slate-300">{staff.department}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">System ID:</span>
                    <span className="font-mono bg-slate-100 dark:bg-slate-700 px-1.5 py-0.5 rounded text-xs">{staff.id}</span>
                  </div>
                </div>

                {editingId === staff.id ? (
                  <div className="bg-slate-50 dark:bg-slate-800/80 p-4 rounded-xl border border-slate-200 dark:border-slate-700 mt-4 space-y-4">
                    <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Modify Clearances</h4>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Set as HOD</span>
                      <button 
                        onClick={() => handleToggleAppointment('HOD')}
                        className={`w-10 h-6 rounded-full transition-colors relative ${editAppointments.includes('HOD') ? 'bg-emerald-500' : 'bg-slate-300 dark:bg-slate-600'}`}
                      >
                        <span className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all duration-200 ${editAppointments.includes('HOD') ? 'left-5' : 'left-1'}`} />
                      </button>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Level Advisor Status</span>
                        <button 
                          onClick={() => handleToggleAppointment('Level Advisor')}
                          className={`w-10 h-6 rounded-full transition-colors relative ${editAppointments.includes('Level Advisor') ? 'bg-blue-500' : 'bg-slate-300 dark:bg-slate-600'}`}
                        >
                          <span className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all duration-200 ${editAppointments.includes('Level Advisor') ? 'left-5' : 'left-1'}`} />
                        </button>
                      </div>
                      
                      {editAppointments.includes('Level Advisor') && (
                        <select 
                          value={editLevel}
                          onChange={(e) => setEditLevel(e.target.value)}
                          className="w-full mt-2 text-sm px-3 py-2 border border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="100 Level">100 Level</option>
                          <option value="200 Level">200 Level</option>
                          <option value="300 Level">300 Level</option>
                          <option value="400 Level">400 Level</option>
                        </select>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-700/50">
                    <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Active Roles</h4>
                    <div className="flex flex-wrap gap-2">
                      {staff.appointments?.length > 0 ? staff.appointments.map(role => (
                        <span key={role} className={`px-2 py-1 text-[10px] font-bold uppercase rounded-md tracking-wider ${
                          role === 'HOD' ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-800' : 
                          'bg-blue-50 text-blue-600 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800'
                        }`}>
                          {role} {role === 'Level Advisor' && `(${staff.advisorForLevel})`}
                        </span>
                      )) : (
                        <span className="px-2 py-1 text-[10px] font-bold uppercase rounded-md tracking-wider bg-slate-100 dark:bg-slate-800 text-slate-500 border border-slate-200 dark:border-slate-700">Standard Lecturer</span>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Editing Action Footer */}
              {editingId === staff.id && (
                <div className="bg-slate-50 dark:bg-slate-800 p-4 border-t border-slate-200 dark:border-slate-700 flex gap-3">
                  <button 
                    onClick={() => setEditingId(null)}
                    className="flex-1 py-2 text-sm font-bold text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={() => saveChanges(staff.id, staff.name)}
                    className="flex-1 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm font-bold transition-all shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-1.5"
                  >
                    <Save className="w-4 h-4" /> Save
                  </button>
                </div>
              )}
            </div>
          ))}
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

export default StaffManagement;
