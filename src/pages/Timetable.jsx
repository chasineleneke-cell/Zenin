import React from 'react';
import PageTransition from '../components/PageTransition';
import { Calendar as CalendarIcon, Clock, MapPin } from 'lucide-react';

const Timetable = () => {
  const schedule = [
    { day: "Monday", slots: [{ course: "CSC 301", time: "08:00 - 10:00", room: "LT 1" }, { course: "MTH 311", time: "12:00 - 14:00", room: "Science Block A" }] },
    { day: "Tuesday", slots: [{ course: "CSC 303", time: "10:00 - 12:00", room: "Cyber Lab" }] },
    { day: "Wednesday", slots: [{ course: "GNS 301", time: "08:00 - 10:00", room: "Main Auditorium" }, { course: "CSC 305", time: "14:00 - 16:00", room: "LT 3" }] },
    { day: "Thursday", slots: [{ course: "MTH 312", time: "09:00 - 11:00", room: "LT 2" }] },
    { day: "Friday", slots: [{ course: "CSC 311", time: "10:00 - 13:00", room: "Hardware Lab" }] },
  ];

  return (
    <PageTransition>
      <div className="space-y-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-primary-100 dark:bg-primary-900/30 p-3 rounded-xl text-primary-600 dark:text-primary-400">
            <CalendarIcon className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Lecture Timetable</h2>
            <p className="text-slate-500">First Semester 2025/2026</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {schedule.map((day, idx) => (
            <div key={idx} className="card p-4">
              <h3 className="font-bold text-lg text-slate-700 dark:text-slate-300 border-b border-slate-100 dark:border-slate-700 pb-2 mb-4">{day.day}</h3>
              <div className="space-y-4">
                {day.slots.length === 0 ? (
                  <p className="text-sm text-slate-400 italic">No classes</p>
                ) : (
                  day.slots.map((slot, i) => (
                    <div key={i} className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-lg border border-slate-100 dark:border-slate-700">
                      <p className="font-bold text-primary-600 dark:text-primary-400 mb-1">{slot.course}</p>
                      <p className="text-xs text-slate-500 flex items-center gap-1 mb-1"><Clock className="w-3 h-3" /> {slot.time}</p>
                      <p className="text-xs text-slate-500 flex items-center gap-1"><MapPin className="w-3 h-3" /> {slot.room}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageTransition>
  );
};

export default Timetable;
