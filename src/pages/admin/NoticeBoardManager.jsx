import React, { useState } from 'react';
import { Megaphone, Bell, Send, Trash2, Clock } from 'lucide-react';
import PageTransition from '../../components/PageTransition';
import Toast from '../../components/Toast';

const NoticeBoardManager = () => {
  const [notices, setNotices] = useState([
    { id: 1, date: "Oct 12", title: "Resumption for First Semester", text: "All students are expected to resume and commence registration.", tag: "Important", active: true },
    { id: 2, date: "Oct 08", title: "Hostel Allocation Portal Opens", text: "The portal for hostel bed space booking opens at 12:00 PM.", tag: "Accommodation", active: true },
    { id: 3, date: "Sep 28", title: "Late Registration Penalty", text: "Late registration incurs a ₦5,000 extra fee.", tag: "Fees", active: false },
  ]);

  const [newTitle, setNewTitle] = useState('');
  const [newText, setNewText] = useState('');
  const [newTag, setNewTag] = useState('Important');
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  const handleBroadcast = (e) => {
    e.preventDefault();
    if (!newTitle || !newText) return;

    const newNotice = {
      id: Date.now(),
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      title: newTitle,
      text: newText,
      tag: newTag,
      active: true
    };
    
    setNotices([newNotice, ...notices]);
    setNewTitle('');
    setNewText('');
    setToast({ show: true, message: 'Notice Broadcasted Successfully!', type: 'success' });
  };

  const handleDelete = (id) => {
    setNotices(notices.filter(n => n.id !== id));
  };

  return (
    <PageTransition>
      <div className="space-y-6 max-w-6xl mx-auto">
        <div className="mb-2">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Notice Board Manager</h2>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Broadcast direct announcements, alerts, and deadline reminders to all student dashboards.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Broadcaster Form */}
          <div className="lg:col-span-1">
            <form onSubmit={handleBroadcast} className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700/50 sticky top-6">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100 dark:border-slate-700/50">
                <div className="bg-emerald-50 dark:bg-emerald-900/30 p-2 rounded-xl text-emerald-600 dark:text-emerald-400">
                  <Megaphone className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-slate-800 dark:text-white">New Broadcast</h3>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Announcement Title</label>
                  <input 
                    type="text" 
                    required
                    value={newTitle}
                    onChange={e => setNewTitle(e.target.value)}
                    placeholder="e.g., Emergency Maintenance"
                    className="w-full px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Categorization Tag</label>
                  <select 
                    value={newTag}
                    onChange={e => setNewTag(e.target.value)}
                    className="w-full px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="Important">Important</option>
                    <option value="Academic">Academic</option>
                    <option value="Fees">Fees & Finance</option>
                    <option value="Accommodation">Accommodation</option>
                    <option value="Event">Event</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Notice Content</label>
                  <textarea 
                    rows="4" 
                    required
                    value={newText}
                    onChange={e => setNewText(e.target.value)}
                    placeholder="Provide full details here..."
                    className="w-full px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  ></textarea>
                </div>

                <button type="submit" className="w-full mt-2 flex items-center justify-center gap-2 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-emerald-500/20">
                  <Send className="w-5 h-5" /> Broadcast Now
                </button>
              </div>
            </form>
          </div>

          {/* Active Notices Log */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="font-bold text-slate-800 dark:text-white flex items-center gap-2 mb-2">
              <Bell className="w-5 h-5 text-slate-400" /> Active System Notices
            </h3>
            
            {notices.map((notice) => (
              <div key={notice.id} className={`bg-white dark:bg-slate-800 p-5 rounded-2xl shadow-sm border ${notice.active ? 'border-emerald-500/30 dark:border-emerald-500/20' : 'border-slate-100 dark:border-slate-700/50'} relative group transition-all hover:shadow-md`}>
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-xs font-bold text-slate-400 flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" /> {notice.date}
                      </span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400 uppercase tracking-wider">
                        {notice.tag}
                      </span>
                      {!notice.active && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-500 dark:bg-slate-700 uppercase tracking-wider">
                          Archived
                        </span>
                      )}
                    </div>
                    <h4 className="text-lg font-bold text-slate-800 dark:text-slate-100">{notice.title}</h4>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 pr-12 leading-relaxed">{notice.text}</p>
                  </div>
                  
                  <button 
                    onClick={() => handleDelete(notice.id)}
                    className="p-2 text-rose-400 hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-900/30 rounded-xl transition-all absolute top-4 right-4 opacity-0 group-hover:opacity-100"
                    title="Delete Notice"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
            {notices.length === 0 && (
              <div className="p-12 text-center text-slate-500 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-2xl">
                No active notices running.
              </div>
            )}
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

export default NoticeBoardManager;
