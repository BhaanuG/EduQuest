import { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import { Search, Filter, Download, Users, Mail, GraduationCap, Award, X, User, Phone, MapPin, Calendar, TrendingUp, BarChart3, Plus, Save, Edit2, Trash2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";
import { ScrollArea } from "../ui/scroll-area";
import { STUDENTS_DATA, Student } from "../StudentData";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Label } from "../ui/label";
import { toast } from "sonner@2.0.3";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "../ui/alert-dialog";

interface TeacherStudentsPageProps {
  user: any;
}

// Generate attendance percentage for each student
const generateAttendancePercentage = (rollNo: string) => {
  const seed = parseInt(rollNo.slice(-3));
  return Math.min(95, Math.max(75, 80 + (seed % 16)));
};

// Generate performance rating based on CGPA
const getPerformanceRating = (cgpa: number) => {
  if (cgpa >= 9.0) return "Outstanding";
  if (cgpa >= 8.5) return "Excellent";
  if (cgpa >= 8.0) return "Very Good";
  if (cgpa >= 7.5) return "Good";
  if (cgpa >= 7.0) return "Satisfactory";
  return "Needs Improvement";
};

// LocalStorage functions
const STORAGE_KEY = "eduquest_custom_students";
const DELETED_STUDENTS_KEY = "eduquest_deleted_students";
const EDITED_STUDENTS_KEY = "eduquest_edited_students";

const loadCustomStudents = (): Student[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error("Error loading custom students:", error);
    return [];
  }
};

const saveCustomStudents = (students: Student[]) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(students));
  } catch (error) {
    console.error("Error saving custom students:", error);
  }
};

const loadDeletedStudents = (): string[] => {
  try {
    const stored = localStorage.getItem(DELETED_STUDENTS_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error("Error loading deleted students:", error);
    return [];
  }
};

const saveDeletedStudents = (rollNos: string[]) => {
  try {
    localStorage.setItem(DELETED_STUDENTS_KEY, JSON.stringify(rollNos));
  } catch (error) {
    console.error("Error saving deleted students:", error);
  }
};

const loadEditedStudents = (): Student[] => {
  try {
    const stored = localStorage.getItem(EDITED_STUDENTS_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error("Error loading edited students:", error);
    return [];
  }
};

const saveEditedStudents = (students: Student[]) => {
  try {
    localStorage.setItem(EDITED_STUDENTS_KEY, JSON.stringify(students));
  } catch (error) {
    console.error("Error saving edited students:", error);
  }
};

export function TeacherStudentsPage({ user }: TeacherStudentsPageProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [selectedSemester, setSelectedSemester] = useState("all");
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [showProfile, setShowProfile] = useState(false);
  const [showHighPerformers, setShowHighPerformers] = useState(false);
  const [showCGPAGraph, setShowCGPAGraph] = useState(false);
  const [showAddStudent, setShowAddStudent] = useState(false);
  const [showEditStudent, setShowEditStudent] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState<Student | null>(null);
  const [customStudents, setCustomStudents] = useState<Student[]>([]);
  const [deletedStudents, setDeletedStudents] = useState<string[]>([]);
  const [editedStudents, setEditedStudents] = useState<Student[]>([]);
  
  const studentsListRef = useRef<HTMLDivElement>(null);

  // Load custom, deleted, and edited students on mount
  useEffect(() => {
    setCustomStudents(loadCustomStudents());
    setDeletedStudents(loadDeletedStudents());
    setEditedStudents(loadEditedStudents());
  }, []);

  // Form state for new student
  const [newStudent, setNewStudent] = useState<Student>({
    rollNo: "",
    name: "",
    password: "",
    cgpa: 0,
    semester: 1,
    department: "",
    email: ""
  });

  // Combine default and custom students, applying edits and filtering deleted
  const allStudents = [
    // Original students (not deleted, and replace with edited version if exists)
    ...STUDENTS_DATA
      .filter(s => !deletedStudents.includes(s.rollNo))
      .map(s => {
        const editedVersion = editedStudents.find(es => es.rollNo === s.rollNo);
        return editedVersion || s;
      }),
    // Custom added students (not deleted)
    ...customStudents.filter(s => !deletedStudents.includes(s.rollNo))
  ];

  const departments = Array.from(new Set(allStudents.map(student => student.department)));
  const semesters = Array.from(new Set(allStudents.map(student => student.semester))).sort();

  const filteredStudents = allStudents.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.rollNo.includes(searchTerm);
    const matchesDepartment = selectedDepartment === "all" || student.department === selectedDepartment;
    const matchesSemester = selectedSemester === "all" || student.semester.toString() === selectedSemester;
    
    return matchesSearch && matchesDepartment && matchesSemester;
  });

  const totalStudents = allStudents.length;
  const highPerformers = allStudents.filter(student => student.cgpa >= 8.5).length;
  const highPerformersList = allStudents.filter(student => student.cgpa >= 8.5);
  const averageCGPA = (allStudents.reduce((sum, student) => sum + student.cgpa, 0) / totalStudents).toFixed(2);

  const cgpaRanges = [
    { range: "9.0-10.0", count: allStudents.filter(s => s.cgpa >= 9.0).length, color: "#10B981" },
    { range: "8.5-8.9", count: allStudents.filter(s => s.cgpa >= 8.5 && s.cgpa < 9.0).length, color: "#3B82F6" },
    { range: "8.0-8.4", count: allStudents.filter(s => s.cgpa >= 8.0 && s.cgpa < 8.5).length, color: "#8B5CF6" },
    { range: "7.5-7.9", count: allStudents.filter(s => s.cgpa >= 7.5 && s.cgpa < 8.0).length, color: "#F59E0B" },
    { range: "7.0-7.4", count: allStudents.filter(s => s.cgpa >= 7.0 && s.cgpa < 7.5).length, color: "#EF4444" },
    { range: "<7.0", count: allStudents.filter(s => s.cgpa < 7.0).length, color: "#DC2626" }
  ];

  const handleViewProfile = (student: Student) => {
    setSelectedStudent(student);
    setShowProfile(true);
  };

  const handleSendMail = (student: Student) => {
    window.open(`mailto:${student.email}?subject=Regarding Academic Progress&body=Dear ${student.name},%0D%0A%0D%0ARegards,%0D%0A${user.name}`, '_blank');
  };

  const scrollToStudentsList = () => {
    studentsListRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleNewStudentChange = (field: keyof Student, value: string | number) => {
    setNewStudent(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const generatePassword = (rollNo: string) => {
    if (rollNo.length >= 3) {
      const lastThree = rollNo.slice(-3);
      return `Student@${lastThree}`;
    }
    return "";
  };

  const generateEmail = (name: string) => {
    if (name) {
      const emailName = name.toLowerCase().replace(/\s+/g, '.');
      return `${emailName}@eduquest.edu`;
    }
    return "";
  };

  const validateForm = () => {
    if (!newStudent.rollNo || newStudent.rollNo.length < 10) {
      toast.error("Please enter a valid roll number (minimum 10 characters)");
      return false;
    }
    
    // Check for duplicate roll number (only when adding, not editing)
    if (!showEditStudent && allStudents.some(s => s.rollNo === newStudent.rollNo)) {
      toast.error("A student with this roll number already exists!");
      return false;
    }

    if (!newStudent.name || newStudent.name.trim().length < 3) {
      toast.error("Please enter a valid name (minimum 3 characters)");
      return false;
    }

    if (!newStudent.department || newStudent.department === "") {
      toast.error("Please select a department");
      return false;
    }

    if (newStudent.semester < 1 || newStudent.semester > 8) {
      toast.error("Please enter a valid semester (1-8)");
      return false;
    }

    if (newStudent.cgpa < 0 || newStudent.cgpa > 10) {
      toast.error("Please enter a valid CGPA (0-10)");
      return false;
    }

    return true;
  };

  const handleAddStudent = () => {
    if (!validateForm()) return;

    const studentToAdd: Student = {
      ...newStudent,
      password: newStudent.password || generatePassword(newStudent.rollNo),
      email: newStudent.email || generateEmail(newStudent.name)
    };

    const updatedCustomStudents = [...customStudents, studentToAdd];
    setCustomStudents(updatedCustomStudents);
    saveCustomStudents(updatedCustomStudents);

    toast.success(`Student ${studentToAdd.name} added successfully!`);
    
    setNewStudent({
      rollNo: "",
      name: "",
      password: "",
      cgpa: 0,
      semester: 1,
      department: "",
      email: ""
    });
    
    setShowAddStudent(false);
  };

  const handleEditClick = (student: Student) => {
    setNewStudent(student);
    setShowEditStudent(true);
  };

  const handleUpdateStudent = () => {
    if (!validateForm()) return;

    const isOriginalStudent = STUDENTS_DATA.some(s => s.rollNo === newStudent.rollNo);
    const isCustomStudent = customStudents.some(s => s.rollNo === newStudent.rollNo);

    if (isOriginalStudent) {
      // Update edited students list
      const updatedEditedStudents = editedStudents.filter(s => s.rollNo !== newStudent.rollNo);
      updatedEditedStudents.push(newStudent);
      setEditedStudents(updatedEditedStudents);
      saveEditedStudents(updatedEditedStudents);
    } else if (isCustomStudent) {
      // Update custom students list
      const updatedCustomStudents = customStudents.map(s => 
        s.rollNo === newStudent.rollNo ? newStudent : s
      );
      setCustomStudents(updatedCustomStudents);
      saveCustomStudents(updatedCustomStudents);
    }

    toast.success(`Student ${newStudent.name} updated successfully!`);
    
    setNewStudent({
      rollNo: "",
      name: "",
      password: "",
      cgpa: 0,
      semester: 1,
      department: "",
      email: ""
    });
    
    setShowEditStudent(false);
  };

  const handleDeleteClick = (student: Student) => {
    setStudentToDelete(student);
    setShowDeleteConfirm(true);
  };

  const handleDeleteConfirm = () => {
    if (!studentToDelete) return;

    const isOriginalStudent = STUDENTS_DATA.some(s => s.rollNo === studentToDelete.rollNo);
    const isCustomStudent = customStudents.some(s => s.rollNo === studentToDelete.rollNo);

    if (isOriginalStudent) {
      // Add to deleted students list
      const updatedDeletedStudents = [...deletedStudents, studentToDelete.rollNo];
      setDeletedStudents(updatedDeletedStudents);
      saveDeletedStudents(updatedDeletedStudents);

      // Also remove from edited students if it exists there
      const updatedEditedStudents = editedStudents.filter(s => s.rollNo !== studentToDelete.rollNo);
      setEditedStudents(updatedEditedStudents);
      saveEditedStudents(updatedEditedStudents);
    } else if (isCustomStudent) {
      // Remove from custom students
      const updatedCustomStudents = customStudents.filter(s => s.rollNo !== studentToDelete.rollNo);
      setCustomStudents(updatedCustomStudents);
      saveCustomStudents(updatedCustomStudents);
    }

    toast.success(`Student ${studentToDelete.name} deleted successfully!`);
    
    setStudentToDelete(null);
    setShowDeleteConfirm(false);
  };

  const isCustomStudent = (rollNo: string) => {
    return customStudents.some(s => s.rollNo === rollNo);
  };

  const isEditedStudent = (rollNo: string) => {
    return editedStudents.some(s => s.rollNo === rollNo);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <>
      {/* Header */}
      <motion.header 
        className="bg-dark-bg border-b border-dark-color px-8 py-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h1 className="text-3xl font-bold text-dark-primary">Student Management</h1>
            <p className="text-dark-secondary mt-2">Manage and track student performance</p>
          </motion.div>
          <motion.div
            className="flex items-center space-x-3"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button 
                className="dark-button-primary"
                onClick={() => {
                  setNewStudent({
                    rollNo: "",
                    name: "",
                    password: "",
                    cgpa: 0,
                    semester: 1,
                    department: "",
                    email: ""
                  });
                  setShowAddStudent(true);
                }}
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Student
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button className="dark-button-secondary">
                <Download className="w-4 h-4 mr-2" />
                Export Students
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="flex-1 overflow-auto p-8 space-y-8">
        {/* Summary Cards */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.98 }}
          >
            <Card 
              className="bg-dark-card border-dark-color cursor-pointer"
              onClick={scrollToStudentsList}
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-dark-secondary">Total Students</p>
                    <motion.p 
                      className="text-3xl font-bold text-dark-primary"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                    >
                      {totalStudents}
                    </motion.p>
                    {customStudents.length > 0 && (
                      <p className="text-xs text-green-400 mt-1">
                        +{customStudents.length} custom added
                      </p>
                    )}
                  </div>
                  <motion.div 
                    className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Users className="w-6 h-6 text-blue-400" />
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.98 }}
          >
            <Card 
              className="bg-dark-card border-dark-color cursor-pointer"
              onClick={() => setShowHighPerformers(true)}
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-dark-secondary">High Performers (8.5+ CGPA)</p>
                    <motion.p 
                      className="text-3xl font-bold text-dark-primary"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.4 }}
                    >
                      {highPerformers}
                    </motion.p>
                  </div>
                  <motion.div 
                    className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center"
                    whileHover={{ scale: 1.2 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Award className="w-6 h-6 text-green-400" />
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.98 }}
          >
            <Card 
              className="bg-dark-card border-dark-color cursor-pointer"
              onClick={() => setShowCGPAGraph(true)}
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-dark-secondary">Average CGPA</p>
                    <motion.p 
                      className="text-3xl font-bold text-dark-primary"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.5 }}
                    >
                      {averageCGPA}
                    </motion.p>
                  </div>
                  <motion.div 
                    className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center"
                    whileHover={{ rotate: -360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <GraduationCap className="w-6 h-6 text-purple-400" />
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        {/* Filters and Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Card className="bg-dark-card border-dark-color">
            <CardHeader>
              <CardTitle className="text-dark-primary">Student Directory</CardTitle>
              <CardDescription className="text-dark-secondary">Search and filter students</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-4 gap-4"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <motion.div variants={itemVariants} className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-dark-secondary w-4 h-4" />
                  <Input
                    placeholder="Search by name or roll number..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-dark-bg border-dark-color text-dark-primary"
                  />
                </motion.div>
                
                <motion.div variants={itemVariants}>
                  <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                    <SelectTrigger className="bg-dark-bg border-dark-color text-dark-primary">
                      <SelectValue placeholder="Select Department" />
                    </SelectTrigger>
                    <SelectContent className="bg-dark-card border-dark-color">
                      <SelectItem value="all">All Departments</SelectItem>
                      {departments.map(dept => (
                        <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <Select value={selectedSemester} onValueChange={setSelectedSemester}>
                    <SelectTrigger className="bg-dark-bg border-dark-color text-dark-primary">
                      <SelectValue placeholder="Select Semester" />
                    </SelectTrigger>
                    <SelectContent className="bg-dark-card border-dark-color">
                      <SelectItem value="all">All Semesters</SelectItem>
                      {semesters.map(sem => (
                        <SelectItem key={sem} value={sem.toString()}>Semester {sem}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </motion.div>

                <motion.div 
                  variants={itemVariants}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button className="dark-button-secondary w-full">
                    <Filter className="w-4 h-4 mr-2" />
                    Advanced Filters
                  </Button>
                </motion.div>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Students Table */}
        <motion.div
          ref={studentsListRef}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <Card className="bg-dark-card border-dark-color">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-dark-color hover:bg-dark-hover">
                      <TableHead className="text-dark-secondary">Roll Number</TableHead>
                      <TableHead className="text-dark-secondary">Name</TableHead>
                      <TableHead className="text-dark-secondary">Department</TableHead>
                      <TableHead className="text-dark-secondary">Semester</TableHead>
                      <TableHead className="text-dark-secondary">CGPA</TableHead>
                      <TableHead className="text-dark-secondary">Performance</TableHead>
                      <TableHead className="text-dark-secondary">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredStudents.map((student, index) => (
                      <motion.tr 
                        key={student.rollNo}
                        className="border-dark-color hover:bg-dark-hover"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        whileHover={{ x: 5 }}
                      >
                        <TableCell className="text-dark-primary font-medium">
                          {student.rollNo}
                          {isCustomStudent(student.rollNo) && (
                            <Badge className="ml-2 bg-green-500/20 text-green-400 border-green-500/30 text-xs">
                              New
                            </Badge>
                          )}
                          {isEditedStudent(student.rollNo) && (
                            <Badge className="ml-2 bg-blue-500/20 text-blue-400 border-blue-500/30 text-xs">
                              Edited
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell className="text-dark-primary">{student.name}</TableCell>
                        <TableCell className="text-dark-secondary">{student.department}</TableCell>
                        <TableCell className="text-dark-secondary">{student.semester}</TableCell>
                        <TableCell className="text-dark-primary font-semibold">{student.cgpa}</TableCell>
                        <TableCell>
                          <Badge 
                            className={`${
                              student.cgpa >= 9.0 
                                ? 'bg-green-500/20 text-green-400 border-green-500/30'
                                : student.cgpa >= 8.0
                                ? 'bg-blue-500/20 text-blue-400 border-blue-500/30'
                                : student.cgpa >= 7.0
                                ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
                                : 'bg-red-500/20 text-red-400 border-red-500/30'
                            }`}
                          >
                            {student.cgpa >= 9.0 ? 'Excellent' : 
                             student.cgpa >= 8.0 ? 'Good' : 
                             student.cgpa >= 7.0 ? 'Average' : 'Needs Attention'}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                              <Button 
                                size="sm" 
                                className="dark-button-secondary"
                                onClick={() => handleSendMail(student)}
                              >
                                <Mail className="w-3 h-3" />
                              </Button>
                            </motion.div>
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                              <Button 
                                size="sm" 
                                className="dark-button-secondary"
                                onClick={() => handleViewProfile(student)}
                              >
                                View
                              </Button>
                            </motion.div>
                            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                              <Button 
                                size="sm" 
                                className="dark-button-secondary"
                                onClick={() => handleEditClick(student)}
                              >
                                <Edit2 className="w-3 h-3" />
                              </Button>
                            </motion.div>
                            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                              <Button 
                                size="sm" 
                                variant="outline"
                                className="border-red-500/30 text-red-400 hover:bg-red-500/10"
                                onClick={() => handleDeleteClick(student)}
                              >
                                <Trash2 className="w-3 h-3" />
                              </Button>
                            </motion.div>
                          </div>
                        </TableCell>
                      </motion.tr>
                    ))}
                  </TableBody>
                </Table>
              </div>
              
              {filteredStudents.length === 0 && (
                <motion.div 
                  className="text-center py-12"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <Users className="w-12 h-12 text-dark-secondary mx-auto mb-4" />
                  <p className="text-dark-secondary">No students found matching your criteria.</p>
                </motion.div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </main>

      {/* Add/Edit Student Dialog */}
      <Dialog open={showAddStudent || showEditStudent} onOpenChange={(open) => {
        if (!open) {
          setShowAddStudent(false);
          setShowEditStudent(false);
        }
      }}>
        <DialogContent className="max-w-2xl bg-dark-card border-dark-color">
          <DialogHeader>
            <DialogTitle className="text-dark-primary flex items-center">
              {showEditStudent ? <Edit2 className="w-6 h-6 mr-2 text-blue-400" /> : <Plus className="w-6 h-6 mr-2 text-blue-400" />}
              {showEditStudent ? 'Edit Student' : 'Add New Student'}
            </DialogTitle>
            <DialogDescription className="text-dark-secondary">
              {showEditStudent ? 'Update student details below.' : 'Fill in the student details. Password and email will be auto-generated if not provided.'}
            </DialogDescription>
          </DialogHeader>
          
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="rollNo" className="text-dark-primary">
                  Roll Number <span className="text-red-400">*</span>
                </Label>
                <Input
                  id="rollNo"
                  placeholder="e.g., 1000030101"
                  value={newStudent.rollNo}
                  onChange={(e) => handleNewStudentChange('rollNo', e.target.value)}
                  disabled={showEditStudent}
                  className="bg-dark-bg border-dark-color text-dark-primary"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="name" className="text-dark-primary">
                  Full Name <span className="text-red-400">*</span>
                </Label>
                <Input
                  id="name"
                  placeholder="e.g., John Doe"
                  value={newStudent.name}
                  onChange={(e) => handleNewStudentChange('name', e.target.value)}
                  className="bg-dark-bg border-dark-color text-dark-primary"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="department" className="text-dark-primary">
                  Department <span className="text-red-400">*</span>
                </Label>
                <Select 
                  value={newStudent.department} 
                  onValueChange={(value) => handleNewStudentChange('department', value)}
                >
                  <SelectTrigger className="bg-dark-bg border-dark-color text-dark-primary">
                    <SelectValue placeholder="Select Department" />
                  </SelectTrigger>
                  <SelectContent className="bg-dark-card border-dark-color">
                    <SelectItem value="Computer Science">Computer Science</SelectItem>
                    <SelectItem value="Electronics">Electronics</SelectItem>
                    <SelectItem value="Mechanical">Mechanical</SelectItem>
                    <SelectItem value="Information Technology">Information Technology</SelectItem>
                    <SelectItem value="Civil">Civil</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="semester" className="text-dark-primary">
                  Semester <span className="text-red-400">*</span>
                </Label>
                <Input
                  id="semester"
                  type="number"
                  min="1"
                  max="8"
                  placeholder="1-8"
                  value={newStudent.semester || ''}
                  onChange={(e) => handleNewStudentChange('semester', parseInt(e.target.value) || 1)}
                  className="bg-dark-bg border-dark-color text-dark-primary"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="cgpa" className="text-dark-primary">
                  CGPA <span className="text-red-400">*</span>
                </Label>
                <Input
                  id="cgpa"
                  type="number"
                  step="0.1"
                  min="0"
                  max="10"
                  placeholder="0.0 - 10.0"
                  value={newStudent.cgpa || ''}
                  onChange={(e) => handleNewStudentChange('cgpa', parseFloat(e.target.value) || 0)}
                  className="bg-dark-bg border-dark-color text-dark-primary"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-dark-primary">
                  Password (Optional)
                </Label>
                <Input
                  id="password"
                  placeholder="Auto-generated if empty"
                  value={newStudent.password}
                  onChange={(e) => handleNewStudentChange('password', e.target.value)}
                  className="bg-dark-bg border-dark-color text-dark-primary"
                />
                {newStudent.rollNo && !newStudent.password && (
                  <p className="text-xs text-dark-secondary">
                    Will be: {generatePassword(newStudent.rollNo)}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-dark-primary">
                Email (Optional)
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Auto-generated if empty"
                value={newStudent.email}
                onChange={(e) => handleNewStudentChange('email', e.target.value)}
                className="bg-dark-bg border-dark-color text-dark-primary"
              />
              {newStudent.name && !newStudent.email && (
                <p className="text-xs text-dark-secondary">
                  Will be: {generateEmail(newStudent.name)}
                </p>
              )}
            </div>

            <div className="flex items-center space-x-3 pt-4 border-t border-dark-color">
              <motion.div 
                className="flex-1"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button 
                  onClick={showEditStudent ? handleUpdateStudent : handleAddStudent}
                  className="dark-button-primary w-full"
                >
                  <Save className="w-4 h-4 mr-2" />
                  {showEditStudent ? 'Update Student' : 'Add Student'}
                </Button>
              </motion.div>
              <motion.div 
                className="flex-1"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button 
                  onClick={() => {
                    setShowAddStudent(false);
                    setShowEditStudent(false);
                  }}
                  className="dark-button-secondary w-full"
                >
                  Cancel
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
        <AlertDialogContent className="bg-dark-card border-dark-color">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-dark-primary">Are you sure?</AlertDialogTitle>
            <AlertDialogDescription className="text-dark-secondary">
              This will permanently delete the student <span className="font-semibold text-dark-primary">{studentToDelete?.name}</span> (Roll No: {studentToDelete?.rollNo}).
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="dark-button-secondary">Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDeleteConfirm}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Student Profile Dialog - keeping existing code */}
      <Dialog open={showProfile} onOpenChange={setShowProfile}>
        <DialogContent className="max-w-2xl bg-dark-card border-dark-color">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <div>
                <DialogTitle className="text-dark-primary text-2xl">Student Profile</DialogTitle>
                <DialogDescription className="text-dark-secondary">
                  Detailed information about the student
                </DialogDescription>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setShowProfile(false)}
                className="text-dark-secondary hover:text-dark-primary"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </DialogHeader>
          
          {selectedStudent && (
            <motion.div 
              className="space-y-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {/* Student Header */}
              <div className="flex items-center space-x-6">
                <motion.div 
                  className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <span className="text-white text-2xl font-bold">
                    {selectedStudent.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </motion.div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-dark-primary">{selectedStudent.name}</h3>
                  <p className="text-dark-secondary">Roll No: {selectedStudent.rollNo}</p>
                  <div className="flex items-center space-x-4 mt-2">
                    <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                      {selectedStudent.department}
                    </Badge>
                    <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                      Semester {selectedStudent.semester}
                    </Badge>
                    {isCustomStudent(selectedStudent.rollNo) && (
                      <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">
                        Custom Added
                      </Badge>
                    )}
                    {isEditedStudent(selectedStudent.rollNo) && (
                      <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30">
                        Edited
                      </Badge>
                    )}
                  </div>
                </div>
              </div>

              {/* Academic Information */}
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <motion.div variants={itemVariants}>
                  <Card className="bg-dark-hover border-dark-color">
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-purple-500/20 rounded-full flex items-center justify-center">
                          <GraduationCap className="w-5 h-5 text-purple-400" />
                        </div>
                        <div>
                          <p className="text-sm text-dark-secondary">Current CGPA</p>
                          <p className="text-2xl font-bold text-dark-primary">{selectedStudent.cgpa}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <Card className="bg-dark-hover border-dark-color">
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center">
                          <TrendingUp className="w-5 h-5 text-green-400" />
                        </div>
                        <div>
                          <p className="text-sm text-dark-secondary">Performance</p>
                          <p className="text-lg font-bold text-dark-primary">{getPerformanceRating(selectedStudent.cgpa)}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <Card className="bg-dark-hover border-dark-color">
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center">
                          <Calendar className="w-5 h-5 text-blue-400" />
                        </div>
                        <div>
                          <p className="text-sm text-dark-secondary">Attendance</p>
                          <p className="text-lg font-bold text-dark-primary">{generateAttendancePercentage(selectedStudent.rollNo)}%</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <Card className="bg-dark-hover border-dark-color">
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-orange-500/20 rounded-full flex items-center justify-center">
                          <Mail className="w-5 h-5 text-orange-400" />
                        </div>
                        <div>
                          <p className="text-sm text-dark-secondary">Email</p>
                          <p className="text-sm font-medium text-dark-primary">{selectedStudent.email}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>

              {/* Contact Actions */}
              <div className="space-y-4 pt-4 border-t border-dark-color">
                <div className="flex items-center space-x-4">
                  <motion.div 
                    className="flex-1"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button 
                      className="dark-button-primary w-full"
                      onClick={() => handleSendMail(selectedStudent)}
                    >
                      <Mail className="w-4 h-4 mr-2" />
                      Send Email
                    </Button>
                  </motion.div>
                  <motion.div 
                    className="flex-1"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button className="dark-button-secondary w-full">
                      <Phone className="w-4 h-4 mr-2" />
                      Contact Parent
                    </Button>
                  </motion.div>
                </div>

                {/* Edit and Delete Actions - Available for all students */}
                <div className="flex items-center space-x-4">
                  <motion.div 
                    className="flex-1"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button 
                      className="dark-button-secondary w-full"
                      onClick={() => {
                        setNewStudent(selectedStudent);
                        setShowProfile(false);
                        setShowEditStudent(true);
                      }}
                    >
                      <Edit2 className="w-4 h-4 mr-2" />
                      Edit Profile
                    </Button>
                  </motion.div>
                  <motion.div 
                    className="flex-1"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button 
                      variant="outline"
                      className="w-full border-red-500/30 text-red-400 hover:bg-red-500/10"
                      onClick={() => {
                        setStudentToDelete(selectedStudent);
                        setShowProfile(false);
                        setShowDeleteConfirm(true);
                      }}
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete Student
                    </Button>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )}
        </DialogContent>
      </Dialog>

      {/* High Performers & CGPA Graph Dialogs - keeping existing implementations */}
      {/* ... (keeping the existing dialog code for high performers and CGPA graph) ... */}
    </>
  );
}
