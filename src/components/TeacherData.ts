export interface Teacher {
  id: string;
  name: string;
  password: string;
  email: string;
  department: string;
  designation: string;
  experience: number;
  specialization: string;
}

export const TEACHERS_DATA: Teacher[] = [
  { id: "2001", name: "Prof. Suresh Iyer", password: "Teacher@001", email: "suresh.iyer@eduquest.edu", department: "Computer Science", designation: "Professor", experience: 15, specialization: "Algorithms & Data Structures" },
  { id: "2002", name: "Dr. Anjali Reddy", password: "Teacher@002", email: "anjali.reddy@eduquest.edu", department: "Electronics", designation: "Associate Professor", experience: 12, specialization: "Digital Signal Processing" },
  { id: "2003", name: "Prof. Rajeev Menon", password: "Teacher@003", email: "rajeev.menon@eduquest.edu", department: "Mechanical", designation: "Professor", experience: 18, specialization: "Thermodynamics" },
  { id: "2004", name: "Dr. Kavita Sharma", password: "Teacher@004", email: "kavita.sharma@eduquest.edu", department: "Information Technology", designation: "Assistant Professor", experience: 8, specialization: "Database Systems" },
  { id: "2005", name: "Prof. Manoj Gupta", password: "Teacher@005", email: "manoj.gupta@eduquest.edu", department: "Civil", designation: "Professor", experience: 20, specialization: "Structural Engineering" },
  { id: "2006", name: "Dr. Shalini Nair", password: "Teacher@006", email: "shalini.nair@eduquest.edu", department: "Computer Science", designation: "Associate Professor", experience: 10, specialization: "Machine Learning" },
  { id: "2007", name: "Prof. Ramesh Babu", password: "Teacher@007", email: "ramesh.babu@eduquest.edu", department: "Electronics", designation: "Professor", experience: 22, specialization: "VLSI Design" },
  { id: "2008", name: "Dr. Neeta Verma", password: "Teacher@008", email: "neeta.verma@eduquest.edu", department: "Information Technology", designation: "Assistant Professor", experience: 6, specialization: "Cybersecurity" },
  { id: "2009", name: "Prof. Arvind Rao", password: "Teacher@009", email: "arvind.rao@eduquest.edu", department: "Mechanical", designation: "Associate Professor", experience: 14, specialization: "Fluid Mechanics" },
  { id: "2010", name: "Dr. Meena Das", password: "Teacher@010", email: "meena.das@eduquest.edu", department: "Civil", designation: "Assistant Professor", experience: 7, specialization: "Environmental Engineering" }
];

export function findTeacherById(id: string): Teacher | undefined {
  return TEACHERS_DATA.find(teacher => teacher.id === id);
}

export function authenticateTeacher(id: string, password: string): Teacher | null {
  const teacher = findTeacherById(id);
  if (teacher && teacher.password === password) {
    return teacher;
  }
  return null;
}