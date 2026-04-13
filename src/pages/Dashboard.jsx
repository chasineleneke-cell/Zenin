import React from 'react';
import { BookOpen, Award, AlertCircle, Clock, Bell, Calendar as CalendarIcon } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import useStore from '../store/useStore';
import PageTransition from '../components/PageTransition';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { gpaTrend } from '../mock-data/db';

const StatCard = ({ title, value, subtitle, icon: Icon, colorClass, gradientClass, onClick }) => (
  <motion.div 
    whileHover={{ y: -5, scale: onClick ? 1.05 : 1.02 }}
    onClick={onClick}
    transition={{ type: "spring", stiffness: 300, damping: 20 }}
    className={`card p-6 border-l-4 border-l-transparent transition-all duration-300 group ${onClick ? 'cursor-pointer hover:shadow-lg hover:border-l-primary-500' : 'hover:border-l-primary-500'}`}
  >
    <div className="flex items-start justify-between">
      <div>
        <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1 transition-colors duration-300">{title}</p>
        <h3 className="text-3xl font-bold text-slate-800 dark:text-white transition-colors duration-300">{value}</h3>
        {subtitle && <p className="text-xs text-slate-400 dark:text-slate-500 mt-2 transition-colors duration-300">{subtitle}</p>}
      </div>
      <div className={`p-3 rounded-xl ${gradientClass} text-white shadow-md transform group-hover:scale-110 transition-transform duration-300 ease-out`}>
        <Icon className="w-6 h-6" />
      </div>
    </div>
  </motion.div>
);

const Dashboard = () => {
  const user = useStore(state => state.user);
  const registeredCourses = useStore(state => state.registeredCourses);
  const navigate = useNavigate();

  const firstName = user?.name ? user.name.split(' ')[0] : 'Student';

  return (
    <PageTransition>
      <div className="space-y-6">
      
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-primary-800 to-primary-600 rounded-2xl p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full transform translate-x-1/2 -translate-y-1/4"></div>
        <div className="absolute bottom-0 left-10 w-32 h-32 bg-white opacity-10 rounded-full transform translate-y-1/2"></div>
        
        <div className="relative z-10">
          <h2 className="text-3xl font-bold mb-2">Welcome back, {firstName}! 👋</h2>
          <p className="text-primary-100 max-w-xl text-lg font-light">
            You have {registeredCourses.length} registered courses this semester. Your current CGPA is looking great!
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Current CGPA" 
          value={user.cgpa.toFixed(2)} 
          subtitle="Top 5% in faculty"
          icon={Award}
          gradientClass="bg-gradient-to-br from-purple-500 to-indigo-600"
          onClick={() => navigate('/results')}
        />
        <StatCard 
          title="Registered Courses" 
          value={registeredCourses.length} 
          subtitle="Second Semester"
          icon={BookOpen}
          gradientClass="bg-gradient-to-br from-primary-500 to-primary-700"
          onClick={() => navigate('/registration')}
        />
        <StatCard 
          title="Outstanding Courses" 
          value={user?.carryOvers?.length || "0"} 
          subtitle="Carryovers & Retakes"
          icon={AlertCircle}
          gradientClass="bg-gradient-to-br from-red-500 to-rose-600"
          onClick={() => navigate('/registration')}
        />
        <StatCard 
          title="Outstanding Fees" 
          value={`₦${user.outstandingFees.toLocaleString()}`} 
          subtitle="Fully cleared!"
          icon={Clock}
          gradientClass="bg-gradient-to-br from-emerald-500 to-teal-600"
          onClick={() => navigate('/fees')}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Performance Chart */}
        <div className="card p-6 lg:col-span-2 flex flex-col">
          <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-6 transition-colors duration-300">Academic Performance Trend</h3>
          <div className="h-72 w-full flex-1">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={gpaTrend} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorGpa" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="semester" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} />
                <YAxis domain={[0, 5]} axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Area type="monotone" dataKey="gpa" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorGpa)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="space-y-6">
          {/* Notice Board */}
          <div className="card p-6 border-t-4 border-t-primary-500">
            <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-4 transition-colors duration-300 flex items-center gap-2">
              <Bell className="w-5 h-5 text-primary-500" /> Notice Board
            </h3>
            <div className="space-y-4 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
              {[
                { date: "Oct 12", title: "Resumption for First Semester", text: "All students are expected to resume and commence registration.", tag: "Important" },
                { date: "Oct 08", title: "Hostel Allocation Portal Opens", text: "The portal for hostel bed space booking opens at 12:00 PM.", tag: "Accommodation" },
                { date: "Sep 28", title: "Late Registration Penalty", text: "Late registration incurs a ₦5,000 extra fee.", tag: "Fees" },
              ].map((notice, idx) => (
                <div key={idx} className="border-l-2 border-primary-300 pl-3 py-1">
                  <p className="text-[10px] font-bold text-slate-400 mb-1">{notice.date} • <span className="text-primary-500">{notice.tag}</span></p>
                  <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-200">{notice.title}</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">{notice.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Academic Calendar */}
          <div className="card p-6">
            <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-4 transition-colors duration-300 flex items-center gap-2">
              <CalendarIcon className="w-5 h-5 text-blue-500" /> Academic Calendar
            </h3>
            <div className="space-y-4">
              {useStore(state => state.calendarEvents).map((item, idx) => (
                <div key={idx} className="flex gap-4 items-start p-3 hover:bg-slate-50 dark:hover:bg-slate-700/30 rounded-xl transition-colors">
                  <div className={`mt-1 h-3 w-3 rounded-full ${item.color.split(' ')[1].replace('100', '400')} shadow-sm`}></div>
                  <div>
                    <h4 className="text-sm font-semibold text-slate-800 dark:text-white transition-colors duration-300">{item.title}</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 transition-colors duration-300">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    
      </div>
    </PageTransition>
  );
};

export default Dashboard;
