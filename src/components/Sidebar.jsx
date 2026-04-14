import React from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  BookOpen, 
  FileText, 
  CreditCard, 
  User, 
  LogOut,
  Building,
  Library,
  CalendarDays,
  FolderOpen,
  ShieldCheck,
  AlertTriangle
} from 'lucide-react';
import useStore from '../store/useStore';
import logoSrc from '../assets/naub-logo.png';

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const logout = useStore(state => state.logout);
  const sidebarOpen = useStore(state => state.sidebarOpen);
  const setSidebarOpen = useStore(state => state.setSidebarOpen);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navGroups = [
    {
      title: "Core",
      links: [
        { path: '/dashboard', name: 'Dashboard', icon: LayoutDashboard },
        { path: '/profile', name: 'Profile', icon: User },
      ]
    },
    {
      title: "Academics",
      links: [
        { path: '/registration', name: 'Course Registration', icon: BookOpen },
        { path: '/results', name: 'Exam Results', icon: FileText },
        { path: '/timetable', name: 'Lecture Timetable', icon: CalendarDays },
      ]
    },
    {
      title: "e-Resources",
      links: [
        { path: '/courseware', name: 'Courseware', icon: FolderOpen },
        { path: '/library', name: 'Library Center', icon: Library },
        { path: '/exam-card', name: 'Exam Card', icon: ShieldCheck },
      ]
    },
    {
      title: "Student Services",
      links: [
        { path: '/fees', name: 'Fees & Payments', icon: CreditCard },
        { path: '/hostel', name: 'Hostels', icon: Building },
        { path: '/missing-sessions', name: 'Missing Sessions', icon: AlertTriangle },
      ]
    }
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-30 md:hidden animate-fade-in"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      <aside className={`fixed inset-y-0 left-0 w-64 bg-sidebar-bg text-white flex flex-col h-full shadow-2xl z-40 transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
      <div className="p-6 flex items-center gap-3">
        <div className="bg-white/90 p-1.5 rounded-lg shadow-lg border border-red-500/40">
          <img src={logoSrc} alt="NAUB Logo" className="h-8 w-auto object-contain" />
        </div>
        <div className="flex-1">
          <h2 className="text-sm font-bold tracking-tight leading-tight whitespace-nowrap">Nigerian Army<br/>University Biu</h2>
          <p className="text-xs text-red-400 font-medium mt-0.5">Student Area</p>
        </div>
      </div>
      
      <nav className="flex-1 px-4 py-6 space-y-6 overflow-y-auto">
        {navGroups.map((group, idx) => (
          <div key={idx}>
            <h3 className="px-4 text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">{group.title}</h3>
            <div className="space-y-1">
              {group.links.map((link) => {
                const Icon = link.icon;
                const isActive = location.pathname.startsWith(link.path);
                
                return (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    onClick={() => setSidebarOpen(false)}
                    className={`nav-item ${isActive ? 'active' : ''}`}
                  >
                    <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                    <span>{link.name}</span>
                  </NavLink>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-700/50">
        <button 
          onClick={handleLogout}
          className="w-full flex flex-row items-center space-x-3 px-4 py-3 rounded-lg text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition-colors duration-200"
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
    </>
  );
};

export default Sidebar;
