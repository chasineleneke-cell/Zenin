import { create } from 'zustand';
import { 
  studentData as student, 
  adminData as admin,
  lecturers,
  availableCourses as initialCourses,
  pendingRegistrations as initialPendingRegs,
  feesHistory as initialFeesHistory,
  totalFees as initialTotalFees,
  amountPaid as initialAmountPaid,
  amountPending as initialAmountPending,
  hostelRooms as initialHostels,
  academicCalendar as initialCalendar
} from '../mock-data/db';

const useStore = create((set, get) => ({
  // UI State
  sidebarOpen: false,
  setSidebarOpen: (isOpen) => set({ sidebarOpen: isOpen }),

  // Authentication State
  user: null, // Starts null, simulating unauthenticated state
  
  // Staff Roles Management
  staffDirectory: lecturers,
  updateStaffRole: (lecturerId, appointments, advisorForLevel) => set((state) => {
    const updatedDirectory = state.staffDirectory.map(staff => 
      staff.id === lecturerId 
        ? { ...staff, appointments, advisorForLevel: advisorForLevel || null }
        : staff
    );

    // If the Admin updates their own role (or lecturer's role while logged in), sync user
    const updatedUser = state.user?.id === lecturerId 
      ? { ...state.user, appointments, advisorForLevel: advisorForLevel || null } 
      : state.user;

    return { staffDirectory: updatedDirectory, user: updatedUser };
  }),
  login: (matricNo, password) => {
    // Basic mock multi-role authentication logic
    if (password === 'password123') {
      if (matricNo === student.id) {
        set({ user: student });
        return { success: true, role: 'student' };
      } else if (matricNo === admin.id) {
        set({ user: admin });
        return { success: true, role: 'admin' };
      } 
      
      const foundLecturer = get().staffDirectory.find(l => l.id === matricNo);
      if (foundLecturer) {
        set({ user: foundLecturer });
        return { success: true, role: 'lecturer' };
      }
    }
    return { success: false, role: null };
  },
  logout: () => set({ user: null, registeredCourses: [] }),
  updateUser: (updates) => set((state) => ({ 
    user: state.user ? { ...state.user, ...updates } : null 
  })),

  // Notifications State
  notifications: [
    {
      id: 1,
      title: "Course Registration Open",
      message: "Second semester registration is now open. Please register your courses.",
      type: "info",
      time: "2 hours ago",
      isRead: false
    },
    {
      id: 2,
      title: "Fee Payment Reminder",
      message: "Your outstanding balance of ₦45,000 is due by next week.",
      type: "warning",
      time: "1 day ago",
      isRead: false
    },
    {
      id: 3,
      title: "System Update",
      message: "Portal maintenance scheduled for midnight.",
      type: "system",
      time: "2 days ago",
      isRead: true
    }
  ],
  markNotificationAsRead: (id) => set((state) => ({
    notifications: state.notifications.map(n => 
      n.id === id ? { ...n, isRead: true } : n
    )
  })),
  clearNotifications: () => set({ notifications: [] }),

  // Theme State
  theme: localStorage.getItem('theme') || 
         (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'),
  toggleTheme: () => set((state) => {
    const newTheme = state.theme === 'light' ? 'dark' : 'light';
    localStorage.setItem('theme', newTheme);
    return { theme: newTheme };
  }),

  // Course Registration State
  availableCourses: initialCourses,
  registeredCourses: [],
  registerCourse: (course) => set((state) => {
    // Check if course is already registered
    if (!state.registeredCourses.find(c => c.code === course.code)) {
      return { registeredCourses: [...state.registeredCourses, course] };
    }
    return state;
  }),
  dropCourse: (courseCode) => set((state) => ({
    registeredCourses: state.registeredCourses.filter(c => c.code !== courseCode)
  })),
  clearCourses: () => set({ registeredCourses: [] }),

  // Lecturer - Course Approval State
  pendingRegistrations: initialPendingRegs,
  approveRegistration: (regId) => set((state) => ({
    pendingRegistrations: state.pendingRegistrations.map(reg => 
      reg.id === regId ? { ...reg, status: 'Approved' } : reg
    )
  })),
  rejectRegistration: (regId) => set((state) => ({
    pendingRegistrations: state.pendingRegistrations.map(reg => 
      reg.id === regId ? { ...reg, status: 'Rejected' } : reg
    )
  })),

  // Fees State
  feesHistory: initialFeesHistory,
  totalFees: initialTotalFees,
  amountPaid: initialAmountPaid,
  amountPending: initialAmountPending,
  
  payFee: (feeId) => set((state) => {
    const updatedHistory = state.feesHistory.map(fee => {
      if (fee.id === feeId && fee.status === 'Pending') {
        const currentDate = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
        return { ...fee, status: 'Paid', dueDate: currentDate };
      }
      return fee;
    });

    const feeToPay = state.feesHistory.find(f => f.id === feeId);
    
    if (feeToPay && feeToPay.status === 'Pending') {
      // Also update user's outstanding fees if needed
      const updatedUser = state.user ? {
        ...state.user,
        outstandingFees: Math.max(0, state.user.outstandingFees - feeToPay.amount)
      } : null;

      return {
        feesHistory: updatedHistory,
        amountPaid: state.amountPaid + feeToPay.amount,
        amountPending: state.amountPending - feeToPay.amount,
        user: updatedUser
      };
    }
    return state;
  }),

  // Hostel State
  hostels: initialHostels,
  bookRoom: (roomId) => set((state) => {
    const roomToBook = state.hostels.find(r => r.id === roomId);
    if (!roomToBook || roomToBook.status !== 'Available') return state;

    const updatedHostels = state.hostels.map(room => {
      if (room.id === roomId) {
        const newOccupants = room.occupants + 1;
        return { 
          ...room, 
          occupants: newOccupants, 
          status: newOccupants >= room.capacity ? 'Full' : 'Available' 
        };
      }
      return room;
    });

    return {
      hostels: updatedHostels,
      user: state.user ? { ...state.user, hostelRoom: roomToBook } : null,
      feesHistory: [
        ...state.feesHistory,
        {
          id: Date.now(),
          description: `Hostel Accommodation (${roomToBook.number})`,
          amount: roomToBook.price,
          dueDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
          status: 'Paid'
        }
      ],
      amountPaid: state.amountPaid + roomToBook.price,
      totalFees: state.totalFees + roomToBook.price
    };
  }),

  // Academic Calendar State
  calendarEvents: initialCalendar,
  addCalendarEvent: (event) => set((state) => ({
    calendarEvents: [...state.calendarEvents, { ...event, id: Date.now() }]
  })),
  deleteCalendarEvent: (id) => set((state) => ({
    calendarEvents: state.calendarEvents.filter(e => e.id !== id)
  }))
}));

export default useStore;
