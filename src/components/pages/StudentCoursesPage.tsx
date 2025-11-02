import { useState } from "react";
import { BookOpen, Clock, Users, Award, Play, ArrowLeft, Calendar, FileText, Video, CheckCircle, Target, TrendingUp, ArrowUp, BarChart3 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";
import { ScrollArea } from "../ui/scroll-area";

interface StudentCoursesPageProps {
  user: any;
}

// Get department-specific courses for students
const getDepartmentCourses = (department: string, semester: number) => {
  const allCourses = {
    "Computer Science": [
      {
        id: 1,
        name: "Data Structures & Algorithms",
        code: "CS301",
        instructor: "Prof. Suresh Iyer",
        progress: 85,
        grade: "A",
        status: "In Progress",
        totalHours: 40,
        completedHours: 34,
        nextClass: "Tomorrow, 10:00 AM",
        assignments: 3,
        color: "blue"
      },
      {
        id: 2,
        name: "Database Management Systems",
        code: "CS401",
        instructor: "Dr. Shalini Nair",
        progress: 78,
        grade: "B+",
        status: "In Progress",
        totalHours: 45,
        completedHours: 35,
        nextClass: "Tuesday, 2:00 PM",
        assignments: 2,
        color: "green"
      },
      {
        id: 3,
        name: "Software Engineering",
        code: "CS302",
        instructor: "Prof. Suresh Iyer",
        progress: 92,
        grade: "A+",
        status: "Nearly Complete",
        totalHours: 38,
        completedHours: 35,
        nextClass: "Friday, 11:00 AM",
        assignments: 1,
        color: "purple"
      },
      {
        id: 4,
        name: "Computer Networks",
        code: "CS303",
        instructor: "Dr. Shalini Nair",
        progress: 65,
        grade: "B",
        status: "In Progress",
        totalHours: 42,
        completedHours: 27,
        nextClass: "Monday, 4:00 PM",
        assignments: 4,
        color: "orange"
      }
    ],
    "Electronics": [
      {
        id: 5,
        name: "Digital Signal Processing",
        code: "EC301",
        instructor: "Dr. Anjali Reddy",
        progress: 88,
        grade: "A",
        status: "In Progress",
        totalHours: 40,
        completedHours: 35,
        nextClass: "Tomorrow, 9:00 AM",
        assignments: 2,
        color: "blue"
      },
      {
        id: 6,
        name: "VLSI Design",
        code: "EC401",
        instructor: "Prof. Ramesh Babu",
        progress: 76,
        grade: "B+",
        status: "In Progress",
        totalHours: 45,
        completedHours: 34,
        nextClass: "Tuesday, 11:00 AM",
        assignments: 3,
        color: "green"
      },
      {
        id: 7,
        name: "Communication Systems",
        code: "EC302",
        instructor: "Dr. Anjali Reddy",
        progress: 95,
        grade: "A+",
        status: "Nearly Complete",
        totalHours: 38,
        completedHours: 36,
        nextClass: "Friday, 3:00 PM",
        assignments: 1,
        color: "purple"
      },
      {
        id: 8,
        name: "Microprocessors",
        code: "EC303",
        instructor: "Prof. Ramesh Babu",
        progress: 72,
        grade: "B",
        status: "In Progress",
        totalHours: 42,
        completedHours: 30,
        nextClass: "Monday, 2:00 PM",
        assignments: 3,
        color: "orange"
      }
    ],
    "Mechanical": [
      {
        id: 9,
        name: "Thermodynamics",
        code: "ME301",
        instructor: "Prof. Rajeev Menon",
        progress: 82,
        grade: "A-",
        status: "In Progress",
        totalHours: 40,
        completedHours: 33,
        nextClass: "Tomorrow, 10:00 AM",
        assignments: 2,
        color: "blue"
      },
      {
        id: 10,
        name: "Fluid Mechanics",
        code: "ME401",
        instructor: "Prof. Arvind Rao",
        progress: 74,
        grade: "B+",
        status: "In Progress",
        totalHours: 45,
        completedHours: 33,
        nextClass: "Tuesday, 1:00 PM",
        assignments: 3,
        color: "green"
      },
      {
        id: 11,
        name: "Machine Design",
        code: "ME302",
        instructor: "Prof. Rajeev Menon",
        progress: 89,
        grade: "A",
        status: "Nearly Complete",
        totalHours: 38,
        completedHours: 34,
        nextClass: "Friday, 3:30 PM",
        assignments: 1,
        color: "purple"
      },
      {
        id: 12,
        name: "Heat Transfer",
        code: "ME303",
        instructor: "Prof. Arvind Rao",
        progress: 68,
        grade: "B",
        status: "In Progress",
        totalHours: 42,
        completedHours: 29,
        nextClass: "Monday, 11:00 AM",
        assignments: 4,
        color: "orange"
      }
    ],
    "Information Technology": [
      {
        id: 13,
        name: "Web Development",
        code: "IT301",
        instructor: "Dr. Kavita Sharma",
        progress: 91,
        grade: "A+",
        status: "Nearly Complete",
        totalHours: 40,
        completedHours: 36,
        nextClass: "Tomorrow, 9:30 AM",
        assignments: 1,
        color: "blue"
      },
      {
        id: 14,
        name: "Database Systems",
        code: "IT401",
        instructor: "Dr. Neeta Verma",
        progress: 79,
        grade: "B+",
        status: "In Progress",
        totalHours: 45,
        completedHours: 35,
        nextClass: "Tuesday, 2:00 PM",
        assignments: 2,
        color: "green"
      },
      {
        id: 15,
        name: "Cybersecurity",
        code: "IT302",
        instructor: "Dr. Kavita Sharma",
        progress: 85,
        grade: "A-",
        status: "In Progress",
        totalHours: 38,
        completedHours: 32,
        nextClass: "Friday, 4:00 PM",
        assignments: 2,
        color: "purple"
      },
      {
        id: 16,
        name: "Cloud Computing",
        code: "IT303",
        instructor: "Dr. Neeta Verma",
        progress: 71,
        grade: "B",
        status: "In Progress",
        totalHours: 42,
        completedHours: 30,
        nextClass: "Monday, 1:00 PM",
        assignments: 3,
        color: "orange"
      }
    ],
    "Civil": [
      {
        id: 17,
        name: "Structural Engineering",
        code: "CE301",
        instructor: "Prof. Manoj Gupta",
        progress: 84,
        grade: "A-",
        status: "In Progress",
        totalHours: 40,
        completedHours: 34,
        nextClass: "Tomorrow, 8:00 AM",
        assignments: 2,
        color: "blue"
      },
      {
        id: 18,
        name: "Environmental Engineering",
        code: "CE401",
        instructor: "Dr. Meena Das",
        progress: 77,
        grade: "B+",
        status: "In Progress",
        totalHours: 45,
        completedHours: 35,
        nextClass: "Tuesday, 11:00 AM",
        assignments: 3,
        color: "green"
      },
      {
        id: 19,
        name: "Construction Management",
        code: "CE302",
        instructor: "Prof. Manoj Gupta",
        progress: 90,
        grade: "A",
        status: "Nearly Complete",
        totalHours: 38,
        completedHours: 34,
        nextClass: "Friday, 2:30 PM",
        assignments: 1,
        color: "purple"
      },
      {
        id: 20,
        name: "Geotechnical Engineering",
        code: "CE303",
        instructor: "Dr. Meena Das",
        progress: 69,
        grade: "B",
        status: "In Progress",
        totalHours: 42,
        completedHours: 29,
        nextClass: "Monday, 9:00 AM",
        assignments: 4,
        color: "orange"
      }
    ]
  };

  return allCourses[department] || [];
};

// Comprehensive course details for all courses
const getAllCourseDetails = () => {
  return {
    // Computer Science Courses
    1: {
      syllabus: [
        { module: "Module 1: Introduction to Data Structures", topics: ["Arrays", "Linked Lists", "Stacks", "Queues"], completed: true },
        { module: "Module 2: Trees and Graphs", topics: ["Binary Trees", "BST", "Graph Traversal", "Spanning Trees"], completed: true },
        { module: "Module 3: Advanced Structures", topics: ["AVL Trees", "B-Trees", "Hash Tables", "Heaps"], completed: false },
        { module: "Module 4: Algorithm Analysis", topics: ["Sorting", "Searching", "Dynamic Programming", "Greedy Algorithms"], completed: false }
      ],
      assignments: [
        { title: "Array and Linked List Implementation", dueDate: "2024-01-20", status: "submitted", grade: "A" },
        { title: "Binary Tree Operations", dueDate: "2024-01-25", status: "pending", grade: null },
        { title: "Graph Algorithms Project", dueDate: "2024-02-01", status: "upcoming", grade: null }
      ],
      resources: [
        { title: "Data Structures Textbook Chapter 1-4", type: "PDF", size: "3.2 MB" },
        { title: "Algorithm Visualization Videos", type: "Video", duration: "2.5 hours" },
        { title: "Practice Problems Collection", type: "Document", size: "1.8 MB" }
      ],
      schedule: [
        { day: "Monday", time: "10:00 AM - 11:30 AM", room: "Lab 204", type: "Lecture" },
        { day: "Wednesday", time: "10:00 AM - 11:30 AM", room: "Lab 204", type: "Lab" },
        { day: "Friday", time: "2:00 PM - 3:30 PM", room: "Room 301", type: "Tutorial" }
      ]
    },
    2: {
      syllabus: [
        { module: "Module 1: Database Fundamentals", topics: ["Relational Model", "SQL Basics", "Database Design"], completed: true },
        { module: "Module 2: Advanced SQL", topics: ["Joins", "Subqueries", "Views", "Stored Procedures"], completed: true },
        { module: "Module 3: Normalization", topics: ["1NF", "2NF", "3NF", "BCNF"], completed: false },
        { module: "Module 4: Transaction Management", topics: ["ACID Properties", "Concurrency", "Recovery"], completed: false }
      ],
      assignments: [
        { title: "Database Design Project", dueDate: "2024-01-22", status: "submitted", grade: "B+" },
        { title: "SQL Query Optimization", dueDate: "2024-01-28", status: "pending", grade: null },
        { title: "Transaction Processing Lab", dueDate: "2024-02-05", status: "upcoming", grade: null }
      ],
      resources: [
        { title: "Database Systems Textbook", type: "PDF", size: "4.1 MB" },
        { title: "SQL Tutorial Series", type: "Video", duration: "3 hours" },
        { title: "Practice Database Schema", type: "SQL", size: "2.3 MB" }
      ],
      schedule: [
        { day: "Tuesday", time: "2:00 PM - 3:30 PM", room: "Room 301", type: "Lecture" },
        { day: "Thursday", time: "2:00 PM - 3:30 PM", room: "Lab 302", type: "Lab" }
      ]
    },
    // Electronics Courses
    5: {
      syllabus: [
        { module: "Module 1: Signals and Systems", topics: ["Continuous Signals", "Discrete Signals", "Fourier Transform"], completed: true },
        { module: "Module 2: Digital Filters", topics: ["FIR Filters", "IIR Filters", "Filter Design"], completed: true },
        { module: "Module 3: FFT and Applications", topics: ["Fast Fourier Transform", "DFT", "Spectral Analysis"], completed: false },
        { module: "Module 4: Advanced DSP", topics: ["Adaptive Filters", "Multirate Processing", "Applications"], completed: false }
      ],
      assignments: [
        { title: "Signal Analysis Lab", dueDate: "2024-01-21", status: "submitted", grade: "A" },
        { title: "Digital Filter Design", dueDate: "2024-01-26", status: "pending", grade: null },
        { title: "FFT Implementation Project", dueDate: "2024-02-02", status: "upcoming", grade: null }
      ],
      resources: [
        { title: "Digital Signal Processing Textbook", type: "PDF", size: "5.2 MB" },
        { title: "MATLAB DSP Toolbox Tutorials", type: "Video", duration: "4 hours" },
        { title: "Signal Processing Code Examples", type: "ZIP", size: "3.1 MB" }
      ],
      schedule: [
        { day: "Monday", time: "9:00 AM - 10:30 AM", room: "Lab 301", type: "Lecture" },
        { day: "Wednesday", time: "9:00 AM - 10:30 AM", room: "Lab 301", type: "Lab" },
        { day: "Friday", time: "11:00 AM - 12:30 PM", room: "Room 401", type: "Tutorial" }
      ]
    },
    // Add more course details as needed...
    // For brevity, I'll include a few more key examples
    9: {
      syllabus: [
        { module: "Module 1: Basic Concepts", topics: ["Temperature", "Heat", "Work", "Properties"], completed: true },
        { module: "Module 2: First Law", topics: ["Internal Energy", "Enthalpy", "Heat Engines"], completed: true },
        { module: "Module 3: Second Law", topics: ["Entropy", "Carnot Cycle", "Refrigeration"], completed: false },
        { module: "Module 4: Advanced Cycles", topics: ["Gas Turbines", "Steam Cycles", "Combined Cycles"], completed: false }
      ],
      assignments: [
        { title: "Heat Engine Analysis", dueDate: "2024-01-23", status: "submitted", grade: "A-" },
        { title: "Entropy Calculations", dueDate: "2024-01-29", status: "pending", grade: null },
        { title: "Cycle Optimization Project", dueDate: "2024-02-06", status: "upcoming", grade: null }
      ],
      resources: [
        { title: "Thermodynamics Fundamentals", type: "PDF", size: "4.8 MB" },
        { title: "Thermal Systems Video Lectures", type: "Video", duration: "3.5 hours" },
        { title: "Property Tables and Charts", type: "PDF", size: "2.7 MB" }
      ],
      schedule: [
        { day: "Monday", time: "10:00 AM - 11:30 AM", room: "Room 501", type: "Lecture" },
        { day: "Wednesday", time: "10:00 AM - 11:30 AM", room: "Room 501", type: "Tutorial" },
        { day: "Friday", time: "1:00 PM - 2:30 PM", room: "Lab 504", type: "Lab" }
      ]
    },
    13: {
      syllabus: [
        { module: "Module 1: Frontend Basics", topics: ["HTML5", "CSS3", "JavaScript ES6", "Responsive Design"], completed: true },
        { module: "Module 2: React Development", topics: ["Components", "State Management", "Hooks", "Router"], completed: true },
        { module: "Module 3: Backend Integration", topics: ["APIs", "Node.js", "Express", "Authentication"], completed: false },
        { module: "Module 4: Deployment", topics: ["Cloud Platforms", "CI/CD", "Performance", "Security"], completed: false }
      ],
      assignments: [
        { title: "Interactive Web Portfolio", dueDate: "2024-01-24", status: "submitted", grade: "A+" },
        { title: "React E-commerce App", dueDate: "2024-01-30", status: "pending", grade: null },
        { title: "Full-Stack Project", dueDate: "2024-02-07", status: "upcoming", grade: null }
      ],
      resources: [
        { title: "Modern Web Development Guide", type: "PDF", size: "3.6 MB" },
        { title: "React Development Course", type: "Video", duration: "5 hours" },
        { title: "Code Templates and Examples", type: "ZIP", size: "4.2 MB" }
      ],
      schedule: [
        { day: "Monday", time: "9:30 AM - 11:00 AM", room: "Lab 601", type: "Lecture" },
        { day: "Wednesday", time: "9:30 AM - 11:00 AM", room: "Lab 601", type: "Lab" },
        { day: "Friday", time: "2:00 PM - 3:30 PM", room: "Lab 602", type: "Project Work" }
      ]
    },
    17: {
      syllabus: [
        { module: "Module 1: Structural Analysis", topics: ["Load Analysis", "Stress Distribution", "Beam Theory"], completed: true },
        { module: "Module 2: Steel Design", topics: ["Steel Properties", "Connection Design", "Frame Analysis"], completed: true },
        { module: "Module 3: Concrete Design", topics: ["RCC Basics", "Slab Design", "Column Design"], completed: false },
        { module: "Module 4: Advanced Topics", topics: ["Seismic Design", "Wind Loads", "Foundation Design"], completed: false }
      ],
      assignments: [
        { title: "Beam Design Project", dueDate: "2024-01-25", status: "submitted", grade: "A-" },
        { title: "Steel Frame Analysis", dueDate: "2024-01-31", status: "pending", grade: null },
        { title: "Building Design Project", dueDate: "2024-02-08", status: "upcoming", grade: null }
      ],
      resources: [
        { title: "Structural Engineering Handbook", type: "PDF", size: "6.1 MB" },
        { title: "CAD Design Software Tutorials", type: "Video", duration: "4.5 hours" },
        { title: "Design Codes and Standards", type: "PDF", size: "3.8 MB" }
      ],
      schedule: [
        { day: "Monday", time: "8:00 AM - 9:30 AM", room: "Room 701", type: "Lecture" },
        { day: "Wednesday", time: "8:00 AM - 9:30 AM", room: "Room 701", type: "Tutorial" },
        { day: "Friday", time: "10:00 AM - 11:30 AM", room: "Lab 702", type: "Design Lab" }
      ]
    }
  };
};

export function StudentCoursesPage({ user }: StudentCoursesPageProps) {
  const [selectedCourse, setSelectedCourse] = useState<number | null>(null);
  const [selectedDialog, setSelectedDialog] = useState<string | null>(null);
  
  // Get courses specific to the student's department
  const enrolledCourses = getDepartmentCourses(user.department, user.semester);
  const allCourseDetails = getAllCourseDetails();
  
  // Calculate metrics
  const totalCourses = enrolledCourses.length;
  const completedCourses = enrolledCourses.filter(c => c.status === 'Completed').length;
  const totalHoursCompleted = enrolledCourses.reduce((sum, course) => sum + course.completedHours, 0);
  const avgProgress = Math.round(enrolledCourses.reduce((sum, course) => sum + course.progress, 0) / enrolledCourses.length);

  if (selectedCourse) {
    const course = enrolledCourses.find(c => c.id === selectedCourse);
    const details = allCourseDetails[selectedCourse as keyof typeof allCourseDetails];
    
    if (!details) {
      // Default course details if specific details aren't available
      const defaultDetails = {
        syllabus: [
          { module: "Module 1: Introduction", topics: ["Basic Concepts", "Fundamentals"], completed: true },
          { module: "Module 2: Core Topics", topics: ["Advanced Concepts", "Applications"], completed: false },
          { module: "Module 3: Practical Applications", topics: ["Projects", "Case Studies"], completed: false },
          { module: "Module 4: Advanced Topics", topics: ["Research", "Future Trends"], completed: false }
        ],
        assignments: [
          { title: "Assignment 1", dueDate: "2024-01-25", status: "submitted", grade: "A" },
          { title: "Assignment 2", dueDate: "2024-02-01", status: "pending", grade: null },
          { title: "Final Project", dueDate: "2024-02-15", status: "upcoming", grade: null }
        ],
        resources: [
          { title: "Course Textbook", type: "PDF", size: "3.0 MB" },
          { title: "Video Lectures", type: "Video", duration: "2 hours" },
          { title: "Reference Materials", type: "Document", size: "1.5 MB" }
        ],
        schedule: [
          { day: "Monday", time: "10:00 AM - 11:30 AM", room: "Room 101", type: "Lecture" },
          { day: "Wednesday", time: "10:00 AM - 11:30 AM", room: "Room 101", type: "Tutorial" }
        ]
      };
      
      return (
        <>
          {/* Header */}
          <header className="bg-dark-bg border-b border-dark-color px-8 py-8">
            <div className="flex items-center space-x-4">
              <Button 
                onClick={() => setSelectedCourse(null)}
                className="dark-button-secondary"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Courses
              </Button>
              <div>
                <h1 className="text-3xl font-bold text-dark-primary">{course?.name}</h1>
                <p className="text-dark-secondary mt-2">{course?.code} • {course?.instructor}</p>
              </div>
            </div>
          </header>

          {/* Course Details */}
          <main className="flex-1 overflow-auto p-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
              <Card className="bg-dark-card border-dark-color">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Target className="w-8 h-8 text-blue-400" />
                  </div>
                  <p className="text-2xl font-bold text-dark-primary">{course?.progress}%</p>
                  <p className="text-sm text-dark-secondary">Course Progress</p>
                </CardContent>
              </Card>
              
              <Card className="bg-dark-card border-dark-color">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Award className="w-8 h-8 text-green-400" />
                  </div>
                  <p className="text-2xl font-bold text-dark-primary">{course?.grade}</p>
                  <p className="text-sm text-dark-secondary">Current Grade</p>
                </CardContent>
              </Card>
              
              <Card className="bg-dark-card border-dark-color">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Clock className="w-8 h-8 text-purple-400" />
                  </div>
                  <p className="text-2xl font-bold text-dark-primary">{course?.completedHours}h</p>
                  <p className="text-sm text-dark-secondary">Hours Completed</p>
                </CardContent>
              </Card>
            </div>

            <Tabs defaultValue="syllabus" className="space-y-6">
              <TabsList className="bg-dark-card border border-dark-color">
                <TabsTrigger value="syllabus" className="data-[state=active]:bg-dark-hover">Syllabus</TabsTrigger>
                <TabsTrigger value="assignments" className="data-[state=active]:bg-dark-hover">Assignments</TabsTrigger>
                <TabsTrigger value="resources" className="data-[state=active]:bg-dark-hover">Resources</TabsTrigger>
                <TabsTrigger value="schedule" className="data-[state=active]:bg-dark-hover">Schedule</TabsTrigger>
              </TabsList>

              <TabsContent value="syllabus">
                <Card className="bg-dark-card border-dark-color">
                  <CardHeader>
                    <CardTitle className="text-dark-primary">Course Syllabus</CardTitle>
                    <CardDescription className="text-dark-secondary">Track your progress through course modules</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {defaultDetails.syllabus.map((module, index) => (
                      <div key={index} className="p-4 bg-dark-hover rounded-lg">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-semibold text-dark-primary">{module.module}</h4>
                          <Badge className={module.completed ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}>
                            {module.completed ? 'Completed' : 'In Progress'}
                          </Badge>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {module.topics.map((topic, topicIndex) => (
                            <Badge key={topicIndex} className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                              {topic}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="assignments">
                <Card className="bg-dark-card border-dark-color">
                  <CardHeader>
                    <CardTitle className="text-dark-primary">Course Assignments</CardTitle>
                    <CardDescription className="text-dark-secondary">Track assignment submissions and grades</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {defaultDetails.assignments.map((assignment, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-dark-hover rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            assignment.status === 'submitted' ? 'bg-green-500/20' :
                            assignment.status === 'pending' ? 'bg-yellow-500/20' :
                            'bg-blue-500/20'
                          }`}>
                            <FileText className={`w-4 h-4 ${
                              assignment.status === 'submitted' ? 'text-green-400' :
                              assignment.status === 'pending' ? 'text-yellow-400' :
                              'text-blue-400'
                            }`} />
                          </div>
                          <div>
                            <p className="font-medium text-dark-primary">{assignment.title}</p>
                            <p className="text-sm text-dark-secondary">Due: {assignment.dueDate}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {assignment.grade && (
                            <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                              Grade: {assignment.grade}
                            </Badge>
                          )}
                          <Badge className={`${
                            assignment.status === 'submitted' ? 'bg-green-500/20 text-green-400' :
                            assignment.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' :
                            'bg-blue-500/20 text-blue-400'
                          }`}>
                            {assignment.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="resources">
                <Card className="bg-dark-card border-dark-color">
                  <CardHeader>
                    <CardTitle className="text-dark-primary">Course Resources</CardTitle>
                    <CardDescription className="text-dark-secondary">Access study materials and references</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {defaultDetails.resources.map((resource, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-dark-hover rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center">
                            {resource.type === 'Video' ? 
                              <Video className="w-4 h-4 text-blue-400" /> :
                              <FileText className="w-4 h-4 text-blue-400" />
                            }
                          </div>
                          <div>
                            <p className="font-medium text-dark-primary">{resource.title}</p>
                            <p className="text-sm text-dark-secondary">
                              {resource.size || resource.duration}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">
                            {resource.type}
                          </Badge>
                          <Button className="dark-button-primary">
                            {resource.type === 'Video' ? 'Watch' : 'Download'}
                          </Button>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="schedule">
                <Card className="bg-dark-card border-dark-color">
                  <CardHeader>
                    <CardTitle className="text-dark-primary">Class Schedule</CardTitle>
                    <CardDescription className="text-dark-secondary">Weekly class timings and locations</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {defaultDetails.schedule.map((session, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-dark-hover rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center">
                            <Calendar className="w-4 h-4 text-green-400" />
                          </div>
                          <div>
                            <p className="font-medium text-dark-primary">{session.day}</p>
                            <p className="text-sm text-dark-secondary">{session.time}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                            {session.room}
                          </Badge>
                          <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">
                            {session.type}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </main>
        </>
      );
    }
    
    return (
      <>
        {/* Header */}
        <header className="bg-dark-bg border-b border-dark-color px-8 py-8">
          <div className="flex items-center space-x-4">
            <Button 
              onClick={() => setSelectedCourse(null)}
              className="dark-button-secondary"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Courses
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-dark-primary">{course?.name}</h1>
              <p className="text-dark-secondary mt-2">{course?.code} • {course?.instructor}</p>
            </div>
          </div>
        </header>

        {/* Course Details */}
        <main className="flex-1 overflow-auto p-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            <Card className="bg-dark-card border-dark-color">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="w-8 h-8 text-blue-400" />
                </div>
                <p className="text-2xl font-bold text-dark-primary">{course?.progress}%</p>
                <p className="text-sm text-dark-secondary">Course Progress</p>
              </CardContent>
            </Card>
            
            <Card className="bg-dark-card border-dark-color">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-green-400" />
                </div>
                <p className="text-2xl font-bold text-dark-primary">{course?.grade}</p>
                <p className="text-sm text-dark-secondary">Current Grade</p>
              </CardContent>
            </Card>
            
            <Card className="bg-dark-card border-dark-color">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-8 h-8 text-purple-400" />
                </div>
                <p className="text-2xl font-bold text-dark-primary">{course?.completedHours}h</p>
                <p className="text-sm text-dark-secondary">Hours Completed</p>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="syllabus" className="space-y-6">
            <TabsList className="bg-dark-card border border-dark-color">
              <TabsTrigger value="syllabus" className="data-[state=active]:bg-dark-hover">Syllabus</TabsTrigger>
              <TabsTrigger value="assignments" className="data-[state=active]:bg-dark-hover">Assignments</TabsTrigger>
              <TabsTrigger value="resources" className="data-[state=active]:bg-dark-hover">Resources</TabsTrigger>
              <TabsTrigger value="schedule" className="data-[state=active]:bg-dark-hover">Schedule</TabsTrigger>
            </TabsList>

            <TabsContent value="syllabus">
              <Card className="bg-dark-card border-dark-color">
                <CardHeader>
                  <CardTitle className="text-dark-primary">Course Syllabus</CardTitle>
                  <CardDescription className="text-dark-secondary">Track your progress through course modules</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {details?.syllabus.map((module, index) => (
                    <div key={index} className="p-4 bg-dark-hover rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-semibold text-dark-primary">{module.module}</h4>
                        <Badge className={module.completed ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}>
                          {module.completed ? 'Completed' : 'In Progress'}
                        </Badge>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {module.topics.map((topic, topicIndex) => (
                          <Badge key={topicIndex} className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                            {topic}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="assignments">
              <Card className="bg-dark-card border-dark-color">
                <CardHeader>
                  <CardTitle className="text-dark-primary">Course Assignments</CardTitle>
                  <CardDescription className="text-dark-secondary">Track assignment submissions and grades</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {details?.assignments.map((assignment, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-dark-hover rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          assignment.status === 'submitted' ? 'bg-green-500/20' :
                          assignment.status === 'pending' ? 'bg-yellow-500/20' :
                          'bg-blue-500/20'
                        }`}>
                          <FileText className={`w-4 h-4 ${
                            assignment.status === 'submitted' ? 'text-green-400' :
                            assignment.status === 'pending' ? 'text-yellow-400' :
                            'text-blue-400'
                          }`} />
                        </div>
                        <div>
                          <p className="font-medium text-dark-primary">{assignment.title}</p>
                          <p className="text-sm text-dark-secondary">Due: {assignment.dueDate}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {assignment.grade && (
                          <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                            Grade: {assignment.grade}
                          </Badge>
                        )}
                        <Badge className={`${
                          assignment.status === 'submitted' ? 'bg-green-500/20 text-green-400' :
                          assignment.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' :
                          'bg-blue-500/20 text-blue-400'
                        }`}>
                          {assignment.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="resources">
              <Card className="bg-dark-card border-dark-color">
                <CardHeader>
                  <CardTitle className="text-dark-primary">Course Resources</CardTitle>
                  <CardDescription className="text-dark-secondary">Access study materials and references</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {details?.resources.map((resource, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-dark-hover rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center">
                          {resource.type === 'Video' ? 
                            <Video className="w-4 h-4 text-blue-400" /> :
                            <FileText className="w-4 h-4 text-blue-400" />
                          }
                        </div>
                        <div>
                          <p className="font-medium text-dark-primary">{resource.title}</p>
                          <p className="text-sm text-dark-secondary">
                            {resource.size || resource.duration}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">
                          {resource.type}
                        </Badge>
                        <Button className="dark-button-primary">
                          {resource.type === 'Video' ? 'Watch' : 'Download'}
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="schedule">
              <Card className="bg-dark-card border-dark-color">
                <CardHeader>
                  <CardTitle className="text-dark-primary">Class Schedule</CardTitle>
                  <CardDescription className="text-dark-secondary">Weekly class timings and locations</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {details?.schedule.map((session, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-dark-hover rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center">
                          <Calendar className="w-4 h-4 text-green-400" />
                        </div>
                        <div>
                          <p className="font-medium text-dark-primary">{session.day}</p>
                          <p className="text-sm text-dark-secondary">{session.time}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                          {session.room}
                        </Badge>
                        <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">
                          {session.type}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </>
    );
  }

  return (
    <>
      {/* Header */}
      <header className="bg-dark-bg border-b border-dark-color px-8 py-8 animate-fade-in">
        <div className="flex items-center justify-between">
          <div className="animate-slide-in-left">
            <h1 className="text-3xl font-bold text-dark-primary">My Courses</h1>
            <p className="text-dark-secondary mt-2">Track your {user.department} course progress and access materials</p>
          </div>
          <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 px-4 py-2 animate-scale-in">
            {enrolledCourses.filter(c => c.status !== 'Completed').length} Active Courses
          </Badge>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-auto p-8 space-y-8">
        {/* Quick Stats - Enhanced with clickable metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card 
            className="bg-dark-card border-dark-color cursor-pointer hover-lift hover-glow transition-all duration-300 group animate-fade-in"
            onClick={() => setSelectedDialog('total-courses')}
          >
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center mx-auto mb-3 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                <BookOpen className="w-6 h-6 text-blue-400" />
              </div>
              <p className="text-3xl font-bold text-dark-primary transition-colors duration-300 group-hover:text-blue-400">{totalCourses}</p>
              <p className="text-sm text-dark-secondary mt-1">Total Courses</p>
              <div className="mt-3 pt-3 border-t border-dark-border opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-xs text-dark-secondary">Click for details →</p>
              </div>
            </CardContent>
          </Card>

          <Card 
            className="bg-dark-card border-dark-color cursor-pointer hover-lift hover-glow transition-all duration-300 group animate-fade-in"
            style={{ animationDelay: '0.1s' }}
            onClick={() => setSelectedDialog('completed-courses')}
          >
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center mx-auto mb-3 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                <Award className="w-6 h-6 text-green-400" />
              </div>
              <p className="text-3xl font-bold text-dark-primary transition-colors duration-300 group-hover:text-green-400">{completedCourses}</p>
              <p className="text-sm text-dark-secondary mt-1">Completed</p>
              <div className="mt-3 pt-3 border-t border-dark-border opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-xs text-dark-secondary">Click for details →</p>
              </div>
            </CardContent>
          </Card>

          <Card 
            className="bg-dark-card border-dark-color cursor-pointer hover-lift hover-glow transition-all duration-300 group animate-fade-in"
            style={{ animationDelay: '0.2s' }}
            onClick={() => setSelectedDialog('hours-completed')}
          >
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-orange-500/10 rounded-xl flex items-center justify-center mx-auto mb-3 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                <Clock className="w-6 h-6 text-orange-400" />
              </div>
              <p className="text-3xl font-bold text-dark-primary transition-colors duration-300 group-hover:text-orange-400">{totalHoursCompleted}</p>
              <p className="text-sm text-dark-secondary mt-1">Hours Completed</p>
              <div className="mt-3 pt-3 border-t border-dark-border opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-xs text-dark-secondary">Click for details →</p>
              </div>
            </CardContent>
          </Card>

          <Card 
            className="bg-dark-card border-dark-color cursor-pointer hover-lift hover-glow transition-all duration-300 group animate-fade-in"
            style={{ animationDelay: '0.3s' }}
            onClick={() => setSelectedDialog('avg-progress')}
          >
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center mx-auto mb-3 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                <TrendingUp className="w-6 h-6 text-purple-400" />
              </div>
              <p className="text-3xl font-bold text-dark-primary transition-colors duration-300 group-hover:text-purple-400">{avgProgress}%</p>
              <p className="text-sm text-dark-secondary mt-1">Avg Progress</p>
              <div className="mt-3 pt-3 border-t border-dark-border opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-xs text-dark-secondary">Click for details →</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Course Cards Grid - Enhanced with animations */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {enrolledCourses.map((course, index) => (
            <Card 
              key={course.id} 
              className="bg-dark-card border-dark-color hover:border-dark-cta transition-all duration-300 hover-lift animate-slide-up"
              style={{ animationDelay: `${0.4 + index * 0.1}s` }}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-dark-primary">{course.name}</CardTitle>
                    <CardDescription className="text-dark-secondary mt-1">
                      {course.code} • {course.instructor}
                    </CardDescription>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className={`${
                      course.status === 'Completed' 
                        ? 'bg-green-500/20 text-green-400 border-green-500/30'
                        : course.status === 'Nearly Complete'
                        ? 'bg-blue-500/20 text-blue-400 border-blue-500/30'
                        : 'bg-orange-500/20 text-orange-400 border-orange-500/30'
                    }`}>
                      {course.status}
                    </Badge>
                    {course.grade && (
                      <div className="flex items-center space-x-1">
                        <Award className="w-4 h-4 text-yellow-400" />
                        <span className="font-bold text-dark-primary">{course.grade}</span>
                      </div>
                    )}
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Progress */}
                <div className="space-y-2 group/progress">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-dark-secondary">Progress</span>
                    <span className="text-sm font-medium text-dark-primary">{course.progress}%</span>
                  </div>
                  <Progress value={course.progress} className="h-2 group-hover/progress:h-3 transition-all" />
                </div>

                {/* Course Stats */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2 p-2 rounded hover:bg-dark-hover transition-colors">
                    <Clock className="w-4 h-4 text-dark-secondary" />
                    <span className="text-sm text-dark-secondary">
                      {course.completedHours}/{course.totalHours} hours
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 p-2 rounded hover:bg-dark-hover transition-colors">
                    <BookOpen className="w-4 h-4 text-dark-secondary" />
                    <span className="text-sm text-dark-secondary">
                      {course.assignments} assignments
                    </span>
                  </div>
                </div>

                {/* Next Class */}
                <div className="p-3 bg-dark-hover rounded-lg hover:bg-dark-table-hover transition-colors">
                  <p className="text-xs text-dark-secondary mb-1">Next Class</p>
                  <p className="text-sm text-dark-primary font-medium">{course.nextClass}</p>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center space-x-2">
                  <Button className="flex-1 dark-button-primary hover-lift">
                    <Play className="w-4 h-4 mr-2" />
                    Continue Learning
                  </Button>
                  <Button 
                    onClick={() => setSelectedCourse(course.id)}
                    className="dark-button-secondary hover-lift"
                  >
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>

      {/* Dialogs for metric details */}
      <Dialog open={selectedDialog === 'total-courses'} onOpenChange={(open) => !open && setSelectedDialog(null)}>
        <DialogContent className="bg-dark-card border-dark-color max-w-2xl animate-scale-in">
          <DialogHeader>
            <DialogTitle className="text-dark-primary flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-blue-400" />
              Total Courses Overview
            </DialogTitle>
            <DialogDescription className="text-dark-secondary">
              Complete breakdown of all your enrolled courses
            </DialogDescription>
          </DialogHeader>
          <ScrollArea className="max-h-[500px] pr-4">
            <div className="space-y-4 mt-4">
              <div className="p-6 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-lg text-center border border-blue-500/20 hover-lift">
                <div className="text-5xl font-bold text-dark-primary animate-bounce-in">{totalCourses}</div>
                <div className="text-sm text-dark-secondary mt-2">Total Enrolled Courses</div>
                <Badge className="mt-3 bg-blue-500/20 text-blue-400">
                  {user.department} - Semester {user.semester}
                </Badge>
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                <div className="p-4 bg-dark-hover rounded-lg text-center hover-lift cursor-pointer group">
                  <div className="text-2xl font-bold text-orange-400 group-hover:scale-110 transition-transform">
                    {enrolledCourses.filter(c => c.status === 'In Progress').length}
                  </div>
                  <div className="text-xs text-dark-secondary mt-1">In Progress</div>
                  <Progress value={70} className="h-1 mt-2" />
                </div>
                <div className="p-4 bg-dark-hover rounded-lg text-center hover-lift cursor-pointer group">
                  <div className="text-2xl font-bold text-blue-400 group-hover:scale-110 transition-transform">
                    {enrolledCourses.filter(c => c.status === 'Nearly Complete').length}
                  </div>
                  <div className="text-xs text-dark-secondary mt-1">Nearly Complete</div>
                  <Progress value={90} className="h-1 mt-2" />
                </div>
                <div className="p-4 bg-dark-hover rounded-lg text-center hover-lift cursor-pointer group">
                  <div className="text-2xl font-bold text-green-400 group-hover:scale-110 transition-transform">
                    {enrolledCourses.filter(c => c.status === 'Completed').length}
                  </div>
                  <div className="text-xs text-dark-secondary mt-1">Completed</div>
                  <Progress value={100} className="h-1 mt-2" />
                </div>
              </div>
              
              <div className="space-y-2">
                <h4 className="text-dark-primary font-semibold mb-3">Course Details</h4>
                {enrolledCourses.map((course, index) => (
                  <div key={index} className="p-3 bg-dark-hover rounded-lg hover-lift hover-glow cursor-pointer transition-all group">
                    <div className="flex justify-between items-center mb-2">
                      <div>
                        <span className="text-dark-primary font-medium group-hover:text-blue-400 transition-colors">{course.name}</span>
                        <p className="text-xs text-dark-secondary">{course.code} • {course.instructor}</p>
                      </div>
                      <Badge className={
                        course.status === 'Completed' ? 'bg-green-500/20 text-green-400' :
                        course.status === 'Nearly Complete' ? 'bg-blue-500/20 text-blue-400' :
                        'bg-orange-500/20 text-orange-400'
                      }>
                        {course.progress}%
                      </Badge>
                    </div>
                    <Progress value={course.progress} className="h-1 group-hover:h-2 transition-all" />
                  </div>
                ))}
              </div>
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>

      <Dialog open={selectedDialog === 'completed-courses'} onOpenChange={(open) => !open && setSelectedDialog(null)}>
        <DialogContent className="bg-dark-card border-dark-color max-w-2xl animate-scale-in">
          <DialogHeader>
            <DialogTitle className="text-dark-primary flex items-center gap-2">
              <Award className="w-5 h-5 text-green-400" />
              Completed Courses
            </DialogTitle>
            <DialogDescription className="text-dark-secondary">
              Your achievements and completed course details
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div className="p-6 bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-lg text-center border border-green-500/20 hover-lift">
              <div className="text-5xl font-bold text-dark-primary animate-bounce-in">{completedCourses}</div>
              <div className="text-sm text-dark-secondary mt-2">Courses Completed</div>
              <Badge className="mt-3 bg-green-500/20 text-green-400">
                <CheckCircle className="w-3 h-3 mr-1" />
                {Math.round((completedCourses / totalCourses) * 100)}% Completion Rate
              </Badge>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-dark-hover rounded-lg hover-lift cursor-pointer group">
                <div className="text-xl font-bold text-green-400 group-hover:scale-110 transition-transform">
                  {enrolledCourses.filter(c => c.grade && c.grade.includes('A')).length}
                </div>
                <div className="text-xs text-dark-secondary mt-1">A Grades</div>
                <p className="text-xs text-green-400 mt-2">Excellent Performance</p>
              </div>
              <div className="p-4 bg-dark-hover rounded-lg hover-lift cursor-pointer group">
                <div className="text-xl font-bold text-blue-400 group-hover:scale-110 transition-transform">
                  {enrolledCourses.filter(c => c.grade && c.grade.includes('B')).length}
                </div>
                <div className="text-xs text-dark-secondary mt-1">B Grades</div>
                <p className="text-xs text-blue-400 mt-2">Good Performance</p>
              </div>
            </div>
            
            {completedCourses > 0 ? (
              <div className="space-y-2">
                <h4 className="text-dark-primary font-semibold mb-3">Completed Course List</h4>
                {enrolledCourses.filter(c => c.status === 'Completed').map((course, index) => (
                  <div key={index} className="p-4 bg-dark-hover rounded-lg hover-lift hover-glow cursor-pointer transition-all group">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="text-dark-primary font-semibold group-hover:text-green-400 transition-colors">{course.name}</h4>
                        <p className="text-sm text-dark-secondary">{course.code}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className="bg-green-500/20 text-green-400">
                          Grade: {course.grade}
                        </Badge>
                        <CheckCircle className="w-5 h-5 text-green-400" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-6 bg-dark-hover rounded-lg text-center">
                <p className="text-dark-secondary">No courses completed yet. Keep working hard!</p>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={selectedDialog === 'hours-completed'} onOpenChange={(open) => !open && setSelectedDialog(null)}>
        <DialogContent className="bg-dark-card border-dark-color max-w-2xl animate-scale-in">
          <DialogHeader>
            <DialogTitle className="text-dark-primary flex items-center gap-2">
              <Clock className="w-5 h-5 text-orange-400" />
              Learning Hours Breakdown
            </DialogTitle>
            <DialogDescription className="text-dark-secondary">
              Detailed analysis of your study time investment
            </DialogDescription>
          </DialogHeader>
          <ScrollArea className="max-h-[500px] pr-4">
            <div className="space-y-4 mt-4">
              <div className="p-6 bg-gradient-to-br from-orange-500/10 to-amber-500/10 rounded-lg text-center border border-orange-500/20 hover-lift">
                <div className="text-5xl font-bold text-dark-primary animate-bounce-in">{totalHoursCompleted}h</div>
                <div className="text-sm text-dark-secondary mt-2">Total Hours Completed</div>
                <Badge className="mt-3 bg-orange-500/20 text-orange-400">
                  <ArrowUp className="w-3 h-3 mr-1" />
                  Average {Math.round(totalHoursCompleted / totalCourses)} hours per course
                </Badge>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-dark-hover rounded-lg hover-lift cursor-pointer group">
                  <div className="text-xl font-bold text-orange-400 group-hover:scale-110 transition-transform">
                    {enrolledCourses.reduce((sum, c) => sum + c.totalHours, 0)}h
                  </div>
                  <div className="text-xs text-dark-secondary mt-1">Total Required</div>
                  <Progress value={(totalHoursCompleted / enrolledCourses.reduce((sum, c) => sum + c.totalHours, 0)) * 100} className="h-1 mt-2" />
                </div>
                <div className="p-4 bg-dark-hover rounded-lg hover-lift cursor-pointer group">
                  <div className="text-xl font-bold text-blue-400 group-hover:scale-110 transition-transform">
                    {enrolledCourses.reduce((sum, c) => sum + c.totalHours, 0) - totalHoursCompleted}h
                  </div>
                  <div className="text-xs text-dark-secondary mt-1">Remaining</div>
                  <Progress value={((enrolledCourses.reduce((sum, c) => sum + c.totalHours, 0) - totalHoursCompleted) / enrolledCourses.reduce((sum, c) => sum + c.totalHours, 0)) * 100} className="h-1 mt-2" />
                </div>
              </div>
              
              <div className="space-y-2">
                <h4 className="text-dark-primary font-semibold mb-3">Hours by Course</h4>
                {enrolledCourses.map((course, index) => (
                  <div key={index} className="p-3 bg-dark-hover rounded-lg hover-lift hover-glow cursor-pointer transition-all group">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-dark-primary group-hover:text-orange-400 transition-colors">{course.name}</span>
                      <Badge className="bg-orange-500/20 text-orange-400">
                        {course.completedHours}/{course.totalHours}h
                      </Badge>
                    </div>
                    <Progress value={(course.completedHours / course.totalHours) * 100} className="h-1 group-hover:h-2 transition-all" />
                  </div>
                ))}
              </div>
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>

      <Dialog open={selectedDialog === 'avg-progress'} onOpenChange={(open) => !open && setSelectedDialog(null)}>
        <DialogContent className="bg-dark-card border-dark-color max-w-2xl animate-scale-in">
          <DialogHeader>
            <DialogTitle className="text-dark-primary flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-purple-400" />
              Average Progress Analysis
            </DialogTitle>
            <DialogDescription className="text-dark-secondary">
              Overall performance and progress tracking
            </DialogDescription>
          </DialogHeader>
          <ScrollArea className="max-h-[500px] pr-4">
            <div className="space-y-4 mt-4">
              <div className="p-6 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-lg text-center border border-purple-500/20 hover-lift">
                <div className="text-5xl font-bold text-dark-primary animate-bounce-in">{avgProgress}%</div>
                <div className="text-sm text-dark-secondary mt-2">Average Course Progress</div>
                <Badge className="mt-3 bg-purple-500/20 text-purple-400">
                  {avgProgress >= 80 ? 'Excellent Progress!' : avgProgress >= 60 ? 'Good Progress' : 'Keep Going!'}
                </Badge>
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                <div className="p-4 bg-dark-hover rounded-lg text-center hover-lift cursor-pointer group">
                  <div className="text-xl font-bold text-purple-400 group-hover:scale-110 transition-transform">
                    {Math.max(...enrolledCourses.map(c => c.progress))}%
                  </div>
                  <div className="text-xs text-dark-secondary mt-1">Highest</div>
                </div>
                <div className="p-4 bg-dark-hover rounded-lg text-center hover-lift cursor-pointer group">
                  <div className="text-xl font-bold text-purple-400 group-hover:scale-110 transition-transform">
                    {avgProgress}%
                  </div>
                  <div className="text-xs text-dark-secondary mt-1">Average</div>
                </div>
                <div className="p-4 bg-dark-hover rounded-lg text-center hover-lift cursor-pointer group">
                  <div className="text-xl font-bold text-purple-400 group-hover:scale-110 transition-transform">
                    {Math.min(...enrolledCourses.map(c => c.progress))}%
                  </div>
                  <div className="text-xs text-dark-secondary mt-1">Lowest</div>
                </div>
              </div>
              
              <div className="space-y-2">
                <h4 className="text-dark-primary font-semibold mb-3">Progress by Course</h4>
                {enrolledCourses
                  .sort((a, b) => b.progress - a.progress)
                  .map((course, index) => (
                    <div key={index} className="p-3 bg-dark-hover rounded-lg hover-lift hover-glow cursor-pointer transition-all group">
                      <div className="flex justify-between items-center mb-2">
                        <div>
                          <span className="text-dark-primary font-medium group-hover:text-purple-400 transition-colors">{course.name}</span>
                          <p className="text-xs text-dark-secondary">{course.code}</p>
                        </div>
                        <Badge className={
                          course.progress >= 90 ? 'bg-green-500/20 text-green-400' :
                          course.progress >= 75 ? 'bg-blue-500/20 text-blue-400' :
                          course.progress >= 60 ? 'bg-orange-500/20 text-orange-400' :
                          'bg-red-500/20 text-red-400'
                        }>
                          {course.progress}%
                        </Badge>
                      </div>
                      <Progress value={course.progress} className="h-1 group-hover:h-2 transition-all" />
                    </div>
                  ))}
              </div>
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </>
  );
}