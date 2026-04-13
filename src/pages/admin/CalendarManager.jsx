import React, { useState } from 'react';
import { Calendar as CalendarIcon, Plus, Trash2, CalendarDays, Flag, Clock } from 'lucide-react';
import useStore from '../../store/useStore';
import PageTransition from '../../components/PageTransition';

const CalendarManager = () => {
  const calendarEvents = useStore(state => state.calendarEvents);
  const addCalendarEvent = useStore(state => state.addCalendarEvent);
  const deleteCalendarEvent = useStore(state => state.deleteCalendarEvent);

  const [newEvent, setNewEvent] = useState({ title: '', time: '', type: 'Event' });

  const eventTypes = [
    { type: 'Event', color: 'text-blue-600 bg-blue-100', icon: CalendarDays },
    { type: 'Deadline', color: 'text-red-600 bg-red-100', icon: Clock },
    { type: 'Exam', color: 'text-orange-600 bg-orange-100', icon: Flag }
  ];

  const handleAddEvent = (e) => {
    e.preventDefault();
    if (!newEvent.title.trim() || !newEvent.time.trim()) return;

    const selectedType = eventTypes.find(t => t.type === newEvent.type);
    
    addCalendarEvent({
      title: newEvent.title,
      time: newEvent.time,
      type: newEvent.type,
      color: selectedType.color
    });

    setNewEvent({ title: '', time: '', type: 'Event' });
  };

  return (
    <PageTransition>
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-2">
          <div>
            <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Academic Calendar Management</h2>
            <p className="text-slate-500 dark:text-slate-400 mt-1">Add, edit, or remove global events broadcasted to the student dashboard.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Add New Event Form */}
          <div className="md:col-span-1">
            <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700/50 shadow-sm p-6 sticky top-6">
              <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
                <Plus className="w-5 h-5 text-emerald-500" /> New Event
              </h3>
              
              <form onSubmit={handleAddEvent} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Event Title</label>
                  <input 
                    type="text" 
                    required
                    value={newEvent.title}
                    onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                    placeholder="e.g. Matriculation Ceremony"
                    className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:text-white"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Date Segment</label>
                  <input 
                    type="text" 
                    required
                    value={newEvent.time}
                    onChange={(e) => setNewEvent({...newEvent, time: e.target.value})}
                    placeholder="e.g. Tomorrow, 11:59 PM or Nov 15"
                    className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:text-white"
                  />
                  <p className="text-[10px] text-slate-400 mt-1">Supports free-text phrasing for visual emphasis.</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Event Classification</label>
                  <div className="space-y-2">
                    {eventTypes.map((type) => {
                      const TypeIcon = type.icon;
                      return (
                        <label key={type.type} className={`flex items-center gap-3 p-3 border rounded-xl cursor-pointer transition-colors ${newEvent.type === type.type ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20' : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800'}`}>
                          <input 
                            type="radio" 
                            name="eventType" 
                            value={type.type}
                            checked={newEvent.type === type.type}
                            onChange={(e) => setNewEvent({...newEvent, type: e.target.value})}
                            className="sr-only"
                          />
                          <div className={`p-1.5 rounded-lg ${type.color.split(' ')[1]}`}>
                           <TypeIcon className={`w-4 h-4 ${type.color.split(' ')[0]}`} />
                          </div>
                          <span className="text-sm font-bold text-slate-800 dark:text-white">{type.type}</span>
                        </label>
                      )
                    })}
                  </div>
                </div>

                <button 
                  type="submit"
                  disabled={!newEvent.title.trim() || !newEvent.time.trim()}
                  className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg transition-colors flex items-center justify-center gap-2 mt-4 disabled:opacity-50"
                >
                  <Plus className="w-4 h-4" /> Publish Event
                </button>
              </form>
            </div>
          </div>

          {/* Active Global Events List */}
          <div className="md:col-span-2">
            <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700/50 shadow-sm p-2 sm:p-6">
              <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-6 px-4 sm:px-0 flex items-center gap-2">
                <CalendarIcon className="w-5 h-5 text-blue-500" /> Active Global Events
              </h3>
              
              <div className="space-y-3">
                {calendarEvents.length === 0 ? (
                  <div className="text-center py-12">
                    <CalendarDays className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                    <p className="text-slate-500 font-medium">The academic calendar is currently empty.</p>
                  </div>
                ) : (
                  calendarEvents.map((item) => (
                    <div key={item.id} className="group relative bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-700/50 p-4 rounded-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:shadow-md transition-all">
                      <div className="flex gap-4 items-start">
                        <div className={`mt-1 sm:mt-0 p-2 rounded-lg shrink-0 ${item.color.split(' ')[1]}`}>
                          {item.type === 'Deadline' ? <Clock className={`w-5 h-5 ${item.color.split(' ')[0]}`} /> :
                           item.type === 'Exam' ? <Flag className={`w-5 h-5 ${item.color.split(' ')[0]}`} /> :
                           <CalendarDays className={`w-5 h-5 ${item.color.split(' ')[0]}`} />}
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className={`text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full ${item.color}`}>{item.type}</span>
                            <span className="text-sm font-bold text-slate-500 dark:text-slate-400">{item.time}</span>
                          </div>
                          <h4 className="text-lg font-bold text-slate-800 dark:text-white">{item.title}</h4>
                        </div>
                      </div>
                      
                      <button 
                        onClick={() => deleteCalendarEvent(item.id)}
                        className="sm:opacity-0 group-hover:opacity-100 p-2 bg-rose-100 dark:bg-rose-900/30 text-rose-600 hover:bg-rose-200 rounded-lg transition-all"
                        title="Delete Event"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

        </div>
      </div>
    </PageTransition>
  );
};

export default CalendarManager;
