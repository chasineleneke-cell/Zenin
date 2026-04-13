import React, { useState, useRef } from 'react';
import useStore from '../store/useStore';
import { Mail, Phone, MapPin, Edit3, Shield, BookOpen, Save, X, Camera, Award, GraduationCap, Calendar, Zap, Fingerprint, AlertTriangle } from 'lucide-react';
import PageTransition from '../components/PageTransition';

const ProfileField = ({ label, value, icon: Icon }) => (
  <div className="flex items-start gap-4 p-4 rounded-xl border border-slate-100 dark:border-slate-700/50 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:shadow-sm hover:border-primary-200 dark:hover:border-primary-900 transition-all duration-300 group">
    {Icon && (
      <div className="p-2.5 rounded-lg bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 group-hover:scale-110 transition-transform duration-300">
        <Icon className="w-5 h-5" />
      </div>
    )}
    <div>
      <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1">{label}</p>
      <p className="font-semibold text-slate-800 dark:text-slate-200">{value}</p>
    </div>
  </div>
);

const Profile = () => {
  const user = useStore(state => state.user);
  const updateUser = useStore(state => state.updateUser);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    email: user?.email || '',
    phone: '+234 (0) 801 234 5678',
    address: 'Block A, Room 104\nNelson Mandela Hall,\nMain Campus.'
  });
  const fileInputRef = useRef(null);

  if (!user) return null;

  const handleAvatarClick = () => {
    if (isEditing) {
      fileInputRef.current?.click();
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateUser({ avatar: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    updateUser({ email: formData.email });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      email: user?.email || '',
      phone: '+234 (0) 801 234 5678',
      address: 'Block A, Room 104\nNelson Mandela Hall,\nMain Campus.'
    });
    setIsEditing(false);
  };

  const getAcademicStanding = (gpa) => {
    if (gpa >= 4.50) return { label: "First Class Honors", icon: Award, color: "text-amber-500" };
    if (gpa >= 3.50) return { label: "Second Class Upper", icon: Award, color: "text-emerald-500" };
    if (gpa >= 2.40) return { label: "Second Class Lower", icon: Award, color: "text-blue-500" };
    if (gpa >= 1.50) return { label: "Third Class / Pass", icon: Award, color: "text-orange-500" };
    return { label: "Probation", icon: AlertTriangle, color: "text-rose-600" };
  };

  const standing = getAcademicStanding(user.cgpa);

  return (
    <PageTransition>
      <div className="space-y-8 max-w-5xl mx-auto pb-12">
        
        {/* Stunning Header Banner */}
        <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/10 dark:border-slate-700/50">
          
          {/* Abstract Wave Gradient Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary-900 via-primary-700 to-primary-500">
            <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] mix-blend-overlay"></div>
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 blur-[100px] rounded-full mix-blend-overlay transform translate-x-1/3 -translate-y-1/3"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/20 blur-[80px] rounded-full mix-blend-overlay transform -translate-x-1/4 translate-y-1/4"></div>
          </div>

          <div className="relative z-10 p-8 sm:p-12 pb-24 sm:pb-32 flex flex-col sm:flex-row justify-between items-start">
            <div className="text-white">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-xs font-bold uppercase tracking-wider mb-4 shadow-lg">
                <Zap className="w-3 h-3 text-yellow-300" /> Authorized Student Access
              </span>
              <h1 className="text-3xl sm:text-5xl font-black tracking-tight mb-2 opacity-90">Personal Dossier</h1>
              <p className="text-primary-100 font-medium">Manage your academic and contact identities securely.</p>
            </div>
            
            {!isEditing && (
              <button 
                onClick={() => setIsEditing(true)}
                className="mt-6 sm:mt-0 flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-md px-5 py-2.5 rounded-xl font-bold transition-all shadow-xl hover:scale-105 active:scale-95"
              >
                <Edit3 className="w-5 h-5" /> Modify Profile
              </button>
            )}
          </div>
        </div>

        {/* Floating Identity Card */}
        <div className="px-4 sm:px-8 -mt-20 sm:-mt-28 relative z-20">
          <div className="glass-panel p-6 sm:p-8 flex flex-col md:flex-row gap-8 items-center md:items-start text-center md:text-left shadow-2xl ring-1 ring-black/5 dark:ring-white/10">
            <div className="relative group cursor-pointer shrink-0" onClick={handleAvatarClick}>
              <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-2xl border-4 border-white dark:border-slate-800 shadow-2xl overflow-hidden bg-slate-100 dark:bg-slate-800 transition-all duration-500 transform group-hover:-translate-y-2 group-hover:rotate-2">
                <img src={user.avatar} alt={user.name} className={`w-full h-full object-cover transition-opacity duration-300 ${isEditing ? 'opacity-40' : ''}`} />
                {isEditing && (
                  <div className="absolute inset-0 flex items-center justify-center flex-col text-slate-900 font-bold dark:text-white bg-white/30 dark:bg-black/30 backdrop-blur-sm">
                    <Camera className="w-10 h-10 mb-2 drop-shadow-md" />
                    <span className="text-sm tracking-widest uppercase drop-shadow-md">Upload</span>
                  </div>
                )}
              </div>
              <div className="absolute -bottom-3 -right-3 bg-emerald-500 text-white p-2 rounded-xl shadow-lg border-2 border-white dark:border-slate-800 transform rotate-12 transition-transform duration-300 group-hover:rotate-0">
                <Shield className="w-6 h-6" />
              </div>
              <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />
            </div>

            <div className="flex-1 w-full pt-2">
              <div className="flex flex-col sm:flex-row sm:justify-between items-center sm:items-start mb-4">
                <div>
                  <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-2">{user.name}</h2>
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-sm font-bold border border-slate-200 dark:border-slate-700">
                      <Fingerprint className="w-4 h-4 text-primary-500" /> {user.matricNo}
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-sm font-bold border border-emerald-200 dark:border-emerald-800/50">
                      Active Undergraduate
                    </span>
                  </div>
                </div>
                
                {isEditing && (
                  <div className="flex gap-2 mt-6 sm:mt-0 w-full sm:w-auto">
                    <button onClick={handleCancel} className="flex-1 sm:flex-none px-4 py-2 border-2 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 font-bold transition-all flex items-center justify-center gap-2 active:scale-95">
                      <X className="w-5 h-5" /> Cancel
                    </button>
                    <button onClick={handleSave} className="flex-1 sm:flex-none bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-xl font-bold shadow-lg shadow-primary-500/30 transition-all flex items-center justify-center gap-2 active:scale-95">
                      <Save className="w-5 h-5" /> Save
                    </button>
                  </div>
                )}
              </div>

              {/* Mini Stat Ribbon */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
                <div className={`bg-slate-50 dark:bg-slate-800/50 rounded-xl p-3 border border-slate-100 dark:border-slate-700 text-center sm:text-left transition-colors ${standing.label === 'Probation' ? 'border-rose-200 dark:border-rose-900/50 bg-rose-50 dark:bg-rose-900/10' : ''}`}>
                  <p className="text-[10px] uppercase font-bold text-slate-400 mb-1">Academic Standing</p>
                  <p className="font-bold text-slate-800 dark:text-slate-200 flex items-center justify-center sm:justify-start gap-2">
                    <standing.icon className={`w-4 h-4 ${standing.color}`} /> {standing.label}
                  </p>
                </div>
                <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-3 border border-slate-100 dark:border-slate-700 text-center sm:text-left transition-colors">
                  <p className="text-[10px] uppercase font-bold text-slate-400 mb-1">Cumulative GPA</p>
                  <p className="font-bold text-slate-800 dark:text-slate-200 flex items-center justify-center sm:justify-start gap-2">
                    <BookOpen className="w-4 h-4 text-primary-500" /> {user.cgpa.toFixed(2)}
                  </p>
                </div>
                <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-3 border border-slate-100 dark:border-slate-700 text-center sm:text-left transition-colors">
                  <p className="text-[10px] uppercase font-bold text-slate-400 mb-1">Current Level</p>
                  <p className="font-bold text-slate-800 dark:text-slate-200 flex items-center justify-center sm:justify-start gap-2">
                    <GraduationCap className="w-4 h-4 text-indigo-500" /> {user.level}
                  </p>
                </div>
                <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-3 border border-slate-100 dark:border-slate-700 text-center sm:text-left transition-colors">
                  <p className="text-[10px] uppercase font-bold text-slate-400 mb-1">Session Enrolled</p>
                  <p className="font-bold text-slate-800 dark:text-slate-200 flex items-center justify-center sm:justify-start gap-2">
                    <Calendar className="w-4 h-4 text-rose-500" /> 2025/2026
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Info Grids */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 px-4 sm:px-8 mt-8">
          
          {/* Academic Profile */}
          <div className="card p-8 border-t-4 border-t-primary-500 shadow-lg">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-3">
              <div className="p-2 bg-primary-100 dark:bg-primary-900/40 text-primary-600 dark:text-primary-400 rounded-lg">
                <BookOpen className="w-5 h-5" />
              </div>
              Official Academic Bio
            </h3>
            <div className="space-y-4">
              <ProfileField label="Faculty / College" value={user.faculty || 'Faculty of Computing & IT'} icon={GraduationCap} />
              <ProfileField label="Department" value={user.department} icon={MapPin} />
              <ProfileField label="Degree Program" value={user.program || 'B.Sc Computer Science'} icon={Award} />
              <ProfileField label="Registration Mode" value="Full-Time Stream A" icon={Fingerprint} />
            </div>
          </div>

          {/* Contact Details */}
          <div className="card p-8 border-t-4 border-t-amber-500 shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-5 dark:opacity-10 pointer-events-none">
              <Mail className="w-48 h-48 -rotate-12" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-3 relative z-10">
              <div className="p-2 bg-amber-100 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400 rounded-lg">
                <Phone className="w-5 h-5" />
              </div>
              Secure Communications
            </h3>
            
            <div className="space-y-6 relative z-10">
              {/* Email Block */}
              <div className="group">
                <label className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block mb-2">University Broadcast Email</label>
                <div className="flex shadow-sm rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 group-hover:border-primary-400 dark:group-hover:border-primary-500 transition-colors focus-within:ring-2 focus-within:ring-primary-500/20">
                  <div className="bg-slate-50 dark:bg-slate-800 px-4 py-3 border-r border-slate-200 dark:border-slate-700 flex items-center justify-center">
                    <Mail className="w-5 h-5 text-slate-400" />
                  </div>
                  {isEditing ? (
                    <input 
                      type="email" 
                      value={formData.email} 
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full px-4 py-3 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-medium focus:outline-none"
                    />
                  ) : (
                    <div className="w-full px-4 py-3 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-medium flex items-center">{formData.email}</div>
                  )}
                </div>
              </div>

              {/* Phone Block */}
              <div className="group">
                <label className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block mb-2">Primary Phone Number</label>
                <div className="flex shadow-sm rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 group-hover:border-primary-400 dark:group-hover:border-primary-500 transition-colors focus-within:ring-2 focus-within:ring-primary-500/20">
                  <div className="bg-slate-50 dark:bg-slate-800 px-4 py-3 border-r border-slate-200 dark:border-slate-700 flex items-center justify-center">
                    <Phone className="w-5 h-5 text-slate-400" />
                  </div>
                  {isEditing ? (
                    <input 
                      type="tel" 
                      value={formData.phone} 
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="w-full px-4 py-3 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-medium focus:outline-none"
                    />
                  ) : (
                    <div className="w-full px-4 py-3 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-medium flex items-center">{formData.phone}</div>
                  )}
                </div>
              </div>

              {/* Address Block */}
              <div className="group">
                <label className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block mb-2">Term Residency / Hostel</label>
                <div className="flex shadow-sm rounded-xl border border-slate-200 dark:border-slate-700 group-hover:border-primary-400 dark:group-hover:border-primary-500 transition-colors focus-within:ring-2 focus-within:ring-primary-500/20">
                  <div className="bg-slate-50 dark:bg-slate-800 px-4 py-3 border-r border-slate-200 dark:border-slate-700 flex items-start justify-center rounded-l-xl">
                    <MapPin className="w-5 h-5 text-slate-400 mt-0.5" />
                  </div>
                  {isEditing ? (
                    <textarea 
                      value={formData.address} 
                      onChange={(e) => setFormData({...formData, address: e.target.value})}
                      rows={3}
                      className="w-full px-4 py-3 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-medium focus:outline-none rounded-r-xl resize-none"
                    />
                  ) : (
                    <div className="w-full px-4 py-3 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-medium whitespace-pre-line rounded-r-xl leading-relaxed">{formData.address}</div>
                  )}
                </div>
              </div>
            </div>
            
          </div>

        </div>
        
      </div>
    </PageTransition>
  );
};

export default Profile;
