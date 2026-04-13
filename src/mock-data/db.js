export const studentData = {
  id: "STU/2023/001",
  name: "Femi Martins",
  email: "femi.martins@university.edu.ng",
  department: "Computer Science",
  faculty: "Science",
  level: "300 Level",
  program: "B.Sc. Computer Science",
  cgpa: 4.0,
  semesterGpa: 3.90,
  registeredCourses: 8,
  creditsCompleted: 120,
  outstandingFees: 0,
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Femi",
  role: "student",
  carryOvers: ["CSC 201"]
};

export const adminData = {
  id: "admin",
  name: "System Administrator",
  email: "admin@university.edu.ng",
  department: "IT Services",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Admin",
  role: "admin"
};

export const lecturers = [
  {
    id: "advisor",
    name: "Dr. Adebayo",
    email: "adebayo@university.edu.ng",
    department: "Computer Science",
    faculty: "Science",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Adebayo",
    role: "lecturer",
    assignedCourses: ["CSC 301", "MTH 301"],
    appointments: ["Level Advisor"],
    advisorForLevel: "300 Level"
  },
  {
    id: "hod",
    name: "Prof. Johnson",
    email: "johnson@university.edu.ng",
    department: "Computer Science",
    faculty: "Science",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Johnson",
    role: "lecturer",
    assignedCourses: ["CSC 401"],
    appointments: ["HOD"]
  },
  {
    id: "lecturer",
    name: "Dr. Williams",
    email: "williams@university.edu.ng",
    department: "Computer Science",
    faculty: "Science",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Williams",
    role: "lecturer",
    assignedCourses: ["CSC 201"],
    appointments: []
  }
];

export const gpaTrend = [
  { semester: '100L 1st', gpa: 3.5 },
  { semester: '100L 2nd', gpa: 3.6 },
  { semester: '200L 1st', gpa: 3.8 },
  { semester: '200L 2nd', gpa: 3.9 },
  { semester: '300L 1st', gpa: 4.0 },
];

export const registeredCourses = [
  { code: "CSC 301", title: "Data Structures", units: 3, score: 85, grade: "A" },
  { code: "CSC 302", title: "Operating Systems", units: 4, score: 78, grade: "B+" },
  { code: "CSC 303", title: "Computer Architecture", units: 3, score: 92, grade: "A+" },
  { code: "CSC 304", title: "Theory of Computation", units: 3, score: 88, grade: "A" },
  { code: "MTH 301", title: "Advanced Calculus", units: 3, score: 72, grade: "B" },
];

export const availableCourses = [
  { id: 9, code: "CSC 201", title: "Intro to Programming", units: 3, lecturer: "Dr. Williams" },
  { id: 1, code: "CSC 401", title: "Advanced Algorithms", units: 3, lecturer: "Dr. Adebayo" },
  { id: 2, code: "CSC 402", title: "Database Systems", units: 3, lecturer: "Prof. Johnson" },
  { id: 3, code: "CSC 403", title: "Software Engineering", units: 4, lecturer: "Dr. Williams" },
  { id: 4, code: "CSC 404", title: "Computer Networks", units: 3, lecturer: "Dr. Brown" },
  { id: 5, code: "CSC 405", title: "Artificial Intelligence", units: 4, lecturer: "Prof. Davis" },
  { id: 6, code: "CSC 406", title: "Web Technologies", units: 3, lecturer: "Dr. Miller" },
  { id: 7, code: "MTH 401", title: "Numerical Methods", units: 3, lecturer: "Prof. Wilson" },
  { id: 8, code: "CSC 407", title: "Cybersecurity", units: 3, lecturer: "Dr. Anderson" },
];

export const pendingRegistrations = [
  { 
    id: 101, 
    studentName: "John Doe", 
    matricNo: "STU/2023/045", 
    level: "300 Level",
    status: "Pending", 
    requestedAt: "2 hours ago",
    totalUnits: 15,
    courses: [
      { code: "CSC 301", title: "Data Structures", units: 3, type: "Core" },
      { code: "CSC 303", title: "Computer Architecture", units: 3, type: "Core" },
      { code: "CSC 305", title: "Software Engineering", units: 4, type: "Core" },
      { code: "MTH 301", title: "Advanced Calculus", units: 3, type: "Elective" },
      { code: "GNS 301", title: "Entrepreneurship", units: 2, type: "Core" }
    ]
  },
  { 
    id: 102, 
    studentName: "Femi Martins", 
    matricNo: "STU/2023/001",
    level: "200 Level", 
    status: "Pending", 
    requestedAt: "1 day ago",
    totalUnits: 18,
    courses: [
      { code: "CSC 201", title: "Intro to Programming", units: 3, type: "Core" },
      { code: "CSC 203", title: "Systems Analysis", units: 3, type: "Core" },
      { code: "MTH 201", title: "Linear Algebra", units: 3, type: "Core" },
      { code: "PHY 205", title: "Digital Electronics", units: 3, type: "Core" },
      { code: "STA 201", title: "Statistics", units: 3, type: "Elective" },
      { code: "GST 201", title: "Peace Studies", units: 3, type: "Core" }
    ]
  }
];

export const feesHistory = [
  { id: 1, description: "Tuition Fee - First Semester", amount: 250000, dueDate: "Dec 15, 2025", status: "Paid" },
  { id: 2, description: "Library Fee", amount: 15000, dueDate: "Dec 15, 2025", status: "Paid" },
  { id: 3, description: "Sports & Recreation Fee", amount: 10000, dueDate: "March 20, 2026", status: "Pending" },
  { id: 4, description: "Laboratory Fee", amount: 20000, dueDate: "March 20, 2026", status: "Pending" },
];

export const totalFees = 295000;
export const amountPaid = 265000;
export const amountPending = 30000;

export const hostelRooms = [
  { id: 'O101', number: 'O101', type: 'Old Hostel (4-Man)', price: 30000, capacity: 4, occupants: 0, status: 'Available' },
  { id: 'O102', number: 'O102', type: 'Old Hostel (4-Man)', price: 30000, capacity: 4, occupants: 2, status: 'Available' },
  { id: 'O103', number: 'O103', type: 'Old Hostel (4-Man)', price: 30000, capacity: 4, occupants: 0, status: 'Available' },
  { id: 'A101', number: 'A101', type: '4-Man Room', price: 50000, capacity: 4, occupants: 4, status: 'Full' },
  { id: 'A102', number: 'A102', type: '4-Man Room', price: 50000, capacity: 4, occupants: 2, status: 'Available' },
  { id: 'A103', number: 'A103', type: '4-Man Room', price: 50000, capacity: 4, occupants: 0, status: 'Available' },
  { id: 'A104', number: 'A104', type: '4-Man Room', price: 50000, capacity: 4, occupants: 1, status: 'Available' },
  { id: 'A105', number: 'A105', type: '4-Man Room', price: 50000, capacity: 4, occupants: 3, status: 'Available' },
  { id: 'A106', number: 'A106', type: '4-Man Room', price: 50000, capacity: 4, occupants: 2, status: 'Available' },
  { id: 'B201', number: 'B201', type: '4-Man Room', price: 50000, capacity: 4, occupants: 0, status: 'Available' },
  { id: 'B202', number: 'B202', type: '4-Man Room', price: 50000, capacity: 4, occupants: 0, status: 'Available' },
];

export const academicCalendar = [
  { id: 1, title: "Course Registration Closes", time: "Tomorrow, 11:59 PM", type: "Deadline", color: "text-red-600 bg-red-100" },
  { id: 2, title: "Matriculation Ceremony", time: "Friday, 10:00 AM", type: "Event", color: "text-blue-600 bg-blue-100" },
  { id: 3, title: "First Semester Exams", time: "Nov 15 - Dec 02", type: "Exam", color: "text-orange-600 bg-orange-100" },
];
