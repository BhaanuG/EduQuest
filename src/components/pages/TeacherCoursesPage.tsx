import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { BookOpen, Users, Calendar, FileText, Settings, Plus, Clock, Award, TrendingUp, Edit, Save, X, CheckCircle, AlertCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { ScrollArea } from "../ui/scroll-area";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface TeacherCoursesPageProps {
  user: any;
}

// Department-specific course data
const getDepartmentCourses = (department: string) => {
  const allCourses = {
    "Computer Science": [
      {
        id: 1,
        name: "Data Structures & Algorithms",
        code: "CS301",
        semester: "6th Semester",
        students: 25,
        credits: 4,
        schedule: ["Mon 10:00-11:30", "Wed 10:00-11:30", "Fri 2:00-3:30"],
        room: "Lab 204",
        avgAttendance: 92,
        avgPerformance: 87,
        assignments: 8,
        completedLectures: 24,
        totalLectures: 30,
        status: "Active"
      },
      {
        id: 2,
        name: "Database Management Systems",
        code: "CS401",
        semester: "8th Semester", 
        students: 22,
        credits: 4,
        schedule: ["Tue 2:00-3:30", "Thu 2:00-3:30"],
        room: "Room 301",
        avgAttendance: 89,
        avgPerformance: 92,
        assignments: 6,
        completedLectures: 22,
        totalLectures: 28,
        status: "Active"
      },
      {
        id: 3,
        name: "Software Engineering",
        code: "CS303",
        semester: "6th Semester",
        students: 20,
        credits: 3,
        schedule: ["Mon 2:00-3:30", "Wed 11:00-12:30"],
        room: "Room 205",
        avgAttendance: 85,
        avgPerformance: 78,
        assignments: 5,
        completedLectures: 18,
        totalLectures: 24,
        status: "Active"
      }
    ],
    "Electronics": [
      {
        id: 4,
        name: "Digital Signal Processing",
        code: "EC301",
        semester: "6th Semester",
        students: 18,
        credits: 4,
        schedule: ["Mon 9:00-10:30", "Wed 9:00-10:30", "Fri 11:00-12:30"],
        room: "Lab 301",
        avgAttendance: 90,
        avgPerformance: 85,
        assignments: 7,
        completedLectures: 20,
        totalLectures: 26,
        status: "Active"
      },
      {
        id: 5,
        name: "VLSI Design",
        code: "EC401",
        semester: "8th Semester",
        students: 16,
        credits: 4,
        schedule: ["Tue 11:00-12:30", "Thu 11:00-12:30"],
        room: "Lab 302",
        avgAttendance: 87,
        avgPerformance: 89,
        assignments: 6,
        completedLectures: 18,
        totalLectures: 24,
        status: "Active"
      },
      {
        id: 6,
        name: "Communication Systems",
        code: "EC302",
        semester: "6th Semester",
        students: 20,
        credits: 3,
        schedule: ["Mon 3:00-4:30", "Wed 3:00-4:30"],
        room: "Room 401",
        avgAttendance: 88,
        avgPerformance: 82,
        assignments: 5,
        completedLectures: 16,
        totalLectures: 22,
        status: "Active"
      }
    ],
    "Mechanical": [
      {
        id: 7,
        name: "Thermodynamics",
        code: "ME301",
        semester: "6th Semester",
        students: 24,
        credits: 4,
        schedule: ["Mon 10:00-11:30", "Wed 10:00-11:30", "Fri 1:00-2:30"],
        room: "Room 501",
        avgAttendance: 91,
        avgPerformance: 84,
        assignments: 7,
        completedLectures: 22,
        totalLectures: 28,
        status: "Active"
      },
      {
        id: 8,
        name: "Fluid Mechanics",
        code: "ME401",
        semester: "8th Semester",
        students: 22,
        credits: 4,
        schedule: ["Tue 1:00-2:30", "Thu 1:00-2:30"],
        room: "Lab 504",
        avgAttendance: 86,
        avgPerformance: 87,
        assignments: 6,
        completedLectures: 19,
        totalLectures: 25,
        status: "Active"
      },
      {
        id: 9,
        name: "Machine Design",
        code: "ME302",
        semester: "6th Semester",
        students: 18,
        credits: 3,
        schedule: ["Mon 3:30-5:00", "Wed 3:30-5:00"],
        room: "Room 502",
        avgAttendance: 89,
        avgPerformance: 81,
        assignments: 5,
        completedLectures: 17,
        totalLectures: 23,
        status: "Active"
      }
    ],
    "Information Technology": [
      {
        id: 10,
        name: "Web Development",
        code: "IT301",
        semester: "6th Semester",
        students: 20,
        credits: 4,
        schedule: ["Mon 9:30-11:00", "Wed 9:30-11:00", "Fri 2:00-3:30"],
        room: "Lab 601",
        avgAttendance: 93,
        avgPerformance: 90,
        assignments: 8,
        completedLectures: 25,
        totalLectures: 30,
        status: "Active"
      },
      {
        id: 11,
        name: "Database Systems",
        code: "IT401",
        semester: "8th Semester",
        students: 18,
        credits: 4,
        schedule: ["Tue 2:00-3:30", "Thu 2:00-3:30"],
        room: "Lab 602",
        avgAttendance: 88,
        avgPerformance: 86,
        assignments: 6,
        completedLectures: 21,
        totalLectures: 27,
        status: "Active"
      },
      {
        id: 12,
        name: "Cybersecurity",
        code: "IT302",
        semester: "6th Semester",
        students: 16,
        credits: 3,
        schedule: ["Mon 4:00-5:30", "Wed 4:00-5:30"],
        room: "Room 603",
        avgAttendance: 85,
        avgPerformance: 83,
        assignments: 5,
        completedLectures: 16,
        totalLectures: 22,
        status: "Active"
      }
    ],
    "Civil": [
      {
        id: 13,
        name: "Structural Engineering",
        code: "CE301",
        semester: "6th Semester",
        students: 22,
        credits: 4,
        schedule: ["Mon 8:00-9:30", "Wed 8:00-9:30", "Fri 10:00-11:30"],
        room: "Room 701",
        avgAttendance: 90,
        avgPerformance: 85,
        assignments: 7,
        completedLectures: 23,
        totalLectures: 29,
        status: "Active"
      },
      {
        id: 14,
        name: "Environmental Engineering",
        code: "CE401",
        semester: "8th Semester",
        students: 20,
        credits: 4,
        schedule: ["Tue 11:00-12:30", "Thu 11:00-12:30"],
        room: "Lab 702",
        avgAttendance: 87,
        avgPerformance: 88,
        assignments: 6,
        completedLectures: 20,
        totalLectures: 26,
        status: "Active"
      },
      {
        id: 15,
        name: "Construction Management",
        code: "CE302",
        semester: "6th Semester",
        students: 18,
        credits: 3,
        schedule: ["Mon 2:30-4:00", "Wed 2:30-4:00"],
        room: "Room 703",
        avgAttendance: 89,
        avgPerformance: 82,
        assignments: 5,
        completedLectures: 18,
        totalLectures: 24,
        status: "Active"
      }
    ]
  };

  return allCourses[department] || [];
};

// Get department-specific upcoming classes
const getDepartmentUpcomingClasses = (department: string) => {
  const allUpcomingClasses = {
    "Computer Science": [
      { course: "Data Structures & Algorithms", time: "Today, 10:00 AM", room: "Lab 204", topic: "Binary Search Trees", duration: "90 min" },
      { course: "Database Management Systems", time: "Today, 2:00 PM", room: "Room 301", topic: "Query Optimization", duration: "90 min" },
      { course: "Software Engineering", time: "Tomorrow, 2:00 PM", room: "Room 205", topic: "Design Patterns", duration: "90 min" }
    ],
    "Electronics": [
      { course: "Digital Signal Processing", time: "Today, 9:00 AM", room: "Lab 301", topic: "FFT Algorithms", duration: "90 min" },
      { course: "VLSI Design", time: "Today, 11:00 AM", room: "Lab 302", topic: "Layout Verification", duration: "90 min" },
      { course: "Communication Systems", time: "Tomorrow, 3:00 PM", room: "Room 401", topic: "Modulation Techniques", duration: "90 min" }
    ],
    "Mechanical": [
      { course: "Thermodynamics", time: "Today, 10:00 AM", room: "Room 501", topic: "Heat Engines", duration: "90 min" },
      { course: "Fluid Mechanics", time: "Today, 1:00 PM", room: "Lab 504", topic: "Boundary Layer Theory", duration: "90 min" },
      { course: "Machine Design", time: "Tomorrow, 3:30 PM", room: "Room 502", topic: "Gear Design", duration: "90 min" }
    ],
    "Information Technology": [
      { course: "Web Development", time: "Today, 9:30 AM", room: "Lab 601", topic: "React Components", duration: "90 min" },
      { course: "Database Systems", time: "Today, 2:00 PM", room: "Lab 602", topic: "Index Optimization", duration: "90 min" },
      { course: "Cybersecurity", time: "Tomorrow, 4:00 PM", room: "Room 603", topic: "Network Security", duration: "90 min" }
    ],
    "Civil": [
      { course: "Structural Engineering", time: "Today, 8:00 AM", room: "Room 701", topic: "Steel Design", duration: "90 min" },
      { course: "Environmental Engineering", time: "Today, 11:00 AM", room: "Lab 702", topic: "Water Treatment", duration: "90 min" },
      { course: "Construction Management", time: "Tomorrow, 2:30 PM", room: "Room 703", topic: "Project Planning", duration: "90 min" }
    ]
  };

  return allUpcomingClasses[department] || [];
};

export function TeacherCoursesPage({ user }: TeacherCoursesPageProps) {
  const [selectedCourse, setSelectedCourse] = useState<any>(null);
  const [showSettings, setShowSettings] = useState(false);
  const [showManageCourse, setShowManageCourse] = useState(false);
  const [selectedDialog, setSelectedDialog] = useState<string | null>(null);
  const [selectedClass, setSelectedClass] = useState<any>(null);
  const [showClassDetails, setShowClassDetails] = useState(false);

  const teachingCourses = getDepartmentCourses(user.department);
  const upcomingClasses = getDepartmentUpcomingClasses(user.department);

  const totalStudents = teachingCourses.reduce((sum, course) => sum + course.students, 0);
  const avgAttendance = teachingCourses.length > 0 ? Math.round(teachingCourses.reduce((sum, course) => sum + course.avgAttendance, 0) / teachingCourses.length) : 0;
  const avgPerformance = teachingCourses.length > 0 ? Math.round(teachingCourses.reduce((sum, course) => sum + course.avgPerformance, 0) / teachingCourses.length) : 0;
  const totalCredits = teachingCourses.reduce((sum, course) => sum + course.credits, 0);

  const recentActivities = [
    { action: `Updated course material for ${teachingCourses[0]?.name || 'course'}`, time: "2 hours ago", type: "content" },
    { action: `Graded assignments for ${teachingCourses[1]?.name || 'course'}`, time: "5 hours ago", type: "grading" },
    { action: `Posted announcement in ${teachingCourses[2]?.name || 'course'}`, time: "1 day ago", type: "announcement" },
    { action: `Scheduled exam for ${teachingCourses[0]?.name || 'course'}`, time: "2 days ago", type: "exam" }
  ];

  const handleManageCourse = (course: any) => {
    setSelectedCourse(course);
    setShowManageCourse(true);
  };

  const handleCourseSettings = (course: any) => {
    setSelectedCourse(course);
    setShowSettings(true);
  };

  const handleViewClassDetails = (classInfo: any) => {
    setSelectedClass(classInfo);
    setShowClassDetails(true);
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
            <h1 className="text-3xl font-bold text-dark-primary">Registered Courses</h1>
            <p className="text-dark-secondary mt-2">Manage your {user.department} department courses</p>
          </motion.div>
          <motion.div 
            className="flex items-center space-x-4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 px-4 py-2">
              <BookOpen className="w-4 h-4 mr-2" />
              {teachingCourses.length} Active Courses
            </Badge>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button className="dark-button-primary">
                <Plus className="w-4 h-4 mr-2" />
                Add Course
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="flex-1 overflow-auto p-8 space-y-8">
        {/* Overview Stats */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-4 gap-6"
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
              onClick={() => setSelectedDialog('total-students')}
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
              onClick={() => setSelectedDialog('avg-attendance')}
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-dark-secondary">Avg Attendance</p>
                    <motion.p 
                      className="text-3xl font-bold text-dark-primary"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.4 }}
                    >
                      {avgAttendance}%
                    </motion.p>
                  </div>
                  <motion.div 
                    className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center"
                    whileHover={{ scale: 1.2 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Calendar className="w-6 h-6 text-green-400" />
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
              onClick={() => setSelectedDialog('avg-performance')}
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-dark-secondary">Avg Performance</p>
                    <motion.p 
                      className="text-3xl font-bold text-dark-primary"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.5 }}
                    >
                      {avgPerformance}%
                    </motion.p>
                  </div>
                  <motion.div 
                    className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center"
                    whileHover={{ rotate: -360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <TrendingUp className="w-6 h-6 text-purple-400" />
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
              onClick={() => setSelectedDialog('teaching-credits')}
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-dark-secondary">Teaching Credits</p>
                    <motion.p 
                      className="text-3xl font-bold text-dark-primary"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.6 }}
                    >
                      {totalCredits}
                    </motion.p>
                  </div>
                  <motion.div 
                    className="w-12 h-12 rounded-xl bg-orange-500/20 flex items-center justify-center"
                    whileHover={{ scale: 1.2 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Award className="w-6 h-6 text-orange-400" />
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        {/* Course Cards */}
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {teachingCourses.map((course, index) => (
            <motion.div
              key={course.id}
              variants={itemVariants}
              whileHover={{ scale: 1.02, y: -5 }}
            >
              <Card className="bg-dark-card border-dark-color hover:border-dark-cta transition-colors">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-dark-primary">{course.name}</CardTitle>
                      <CardDescription className="text-dark-secondary mt-1">
                        {course.code} • {course.semester} • {course.credits} Credits
                      </CardDescription>
                    </div>
                    <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                      {course.status}
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Course Progress */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-dark-secondary">Course Progress</span>
                      <span className="text-sm text-dark-primary">
                        {course.completedLectures}/{course.totalLectures} lectures
                      </span>
                    </div>
                    <Progress value={(course.completedLectures / course.totalLectures) * 100} className="h-2" />
                  </div>

                  {/* Course Stats */}
                  <motion.div 
                    className="grid grid-cols-3 gap-4 text-center"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <motion.div variants={itemVariants} className="p-3 bg-dark-hover rounded-lg">
                      <p className="text-xl font-bold text-dark-primary">{course.students}</p>
                      <p className="text-xs text-dark-secondary">Students</p>
                    </motion.div>
                    <motion.div variants={itemVariants} className="p-3 bg-dark-hover rounded-lg">
                      <p className="text-xl font-bold text-dark-primary">{course.avgAttendance}%</p>
                      <p className="text-xs text-dark-secondary">Attendance</p>
                    </motion.div>
                    <motion.div variants={itemVariants} className="p-3 bg-dark-hover rounded-lg">
                      <p className="text-xl font-bold text-dark-primary">{course.avgPerformance}%</p>
                      <p className="text-xs text-dark-secondary">Performance</p>
                    </motion.div>
                  </motion.div>

                  {/* Schedule */}
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-dark-primary">Schedule</p>
                    <div className="flex flex-wrap gap-2">
                      {course.schedule.map((time, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.2, delay: idx * 0.05 }}
                        >
                          <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 text-xs">
                            {time}
                          </Badge>
                        </motion.div>
                      ))}
                    </div>
                    <p className="text-xs text-dark-secondary">Room: {course.room}</p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center space-x-2 pt-4 border-t border-dark-color">
                    <motion.div 
                      className="flex-1"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button 
                        className="w-full dark-button-primary"
                        onClick={() => handleManageCourse(course)}
                      >
                        <FileText className="w-4 h-4 mr-2" />
                        Manage Course
                      </Button>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                      <Button 
                        className="dark-button-secondary"
                        onClick={() => handleCourseSettings(course)}
                      >
                        <Settings className="w-4 h-4" />
                      </Button>
                    </motion.div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upcoming Classes */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <Card className="bg-dark-card border-dark-color">
              <CardHeader>
                <CardTitle className="text-dark-primary flex items-center">
                  <Clock className="w-5 h-5 mr-2" />
                  Upcoming Classes
                </CardTitle>
                <CardDescription className="text-dark-secondary">Your next scheduled classes</CardDescription>
              </CardHeader>
              <CardContent>
                <motion.div 
                  className="space-y-4"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {upcomingClasses.map((cls, index) => (
                    <motion.div 
                      key={index} 
                      className="flex items-center justify-between p-4 bg-dark-hover rounded-lg"
                      variants={itemVariants}
                      whileHover={{ x: 5 }}
                    >
                      <div className="flex items-center space-x-4">
                        <motion.div 
                          className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center"
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.5 }}
                        >
                          <Clock className="w-4 h-4 text-blue-400" />
                        </motion.div>
                        <div>
                          <p className="font-medium text-dark-primary">{cls.course}</p>
                          <p className="text-sm text-dark-secondary">{cls.time} • {cls.room}</p>
                          <p className="text-xs text-blue-400">Topic: {cls.topic}</p>
                        </div>
                      </div>
                      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                        <Button 
                          size="sm" 
                          className="dark-button-secondary"
                          onClick={() => handleViewClassDetails(cls)}
                        >
                          View Details
                        </Button>
                      </motion.div>
                    </motion.div>
                  ))}
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Recent Activities */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <Card className="bg-dark-card border-dark-color">
              <CardHeader>
                <CardTitle className="text-dark-primary">Recent Activities</CardTitle>
                <CardDescription className="text-dark-secondary">Your latest course-related actions</CardDescription>
              </CardHeader>
              <CardContent>
                <motion.div 
                  className="space-y-4"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {recentActivities.map((activity, index) => (
                    <motion.div 
                      key={index} 
                      className="flex items-center space-x-4 p-4 bg-dark-hover rounded-lg"
                      variants={itemVariants}
                      whileHover={{ x: 5 }}
                    >
                      <motion.div 
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          activity.type === 'grading' ? 'bg-green-500/20' :
                          activity.type === 'content' ? 'bg-blue-500/20' :
                          activity.type === 'announcement' ? 'bg-purple-500/20' :
                          'bg-orange-500/20'
                        }`}
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                      >
                        <FileText className={`w-4 h-4 ${
                          activity.type === 'grading' ? 'text-green-400' :
                          activity.type === 'content' ? 'text-blue-400' :
                          activity.type === 'announcement' ? 'text-purple-400' :
                          'text-orange-400'
                        }`} />
                      </motion.div>
                      <div className="flex-1">
                        <p className="font-medium text-dark-primary">{activity.action}</p>
                        <p className="text-sm text-dark-secondary">{activity.time}</p>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.9 }}
          whileHover={{ scale: 1.01 }}
        >
          <Card className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-blue-500/30">
            <CardContent className="p-6">
              <div className="text-center space-y-4">
                <h3 className="text-xl font-semibold text-dark-primary">Quick Actions</h3>
                <p className="text-dark-secondary">
                  Frequently used course management tools for {user.department} department
                </p>
                <motion.div 
                  className="flex items-center justify-center space-x-4"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <motion.div variants={itemVariants} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button className="dark-button-primary">
                      <FileText className="w-4 h-4 mr-2" />
                      Create Assignment
                    </Button>
                  </motion.div>
                  <motion.div variants={itemVariants} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button className="dark-button-secondary">
                      <Calendar className="w-4 h-4 mr-2" />
                      Schedule Exam
                    </Button>
                  </motion.div>
                  <motion.div variants={itemVariants} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button className="dark-button-secondary">
                      <Users className="w-4 h-4 mr-2" />
                      View Students
                    </Button>
                  </motion.div>
                </motion.div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </main>

      {/* Dialogs */}
      {/* Total Students Dialog */}
      <Dialog open={selectedDialog === 'total-students'} onOpenChange={(open) => !open && setSelectedDialog(null)}>
        <DialogContent className="max-w-3xl max-h-[80vh] bg-dark-card border-dark-color">
          <DialogHeader>
            <DialogTitle className="text-dark-primary flex items-center">
              <Users className="w-6 h-6 mr-2 text-blue-400" />
              Total Students Breakdown
            </DialogTitle>
            <DialogDescription className="text-dark-secondary">
              Student distribution across all your courses
            </DialogDescription>
          </DialogHeader>
          <ScrollArea className="h-[500px] pr-4">
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="p-4 bg-dark-hover rounded-lg text-center">
                  <p className="text-3xl font-bold text-blue-400">{totalStudents}</p>
                  <p className="text-sm text-dark-secondary mt-1">Total Students</p>
                </div>
                <div className="p-4 bg-dark-hover rounded-lg text-center">
                  <p className="text-3xl font-bold text-green-400">{teachingCourses.length}</p>
                  <p className="text-sm text-dark-secondary mt-1">Active Courses</p>
                </div>
                <div className="p-4 bg-dark-hover rounded-lg text-center">
                  <p className="text-3xl font-bold text-purple-400">
                    {Math.round(totalStudents / teachingCourses.length)}
                  </p>
                  <p className="text-sm text-dark-secondary mt-1">Avg per Course</p>
                </div>
              </div>

              {teachingCourses.map((course, index) => (
                <motion.div
                  key={course.id}
                  className="p-4 bg-dark-hover rounded-lg"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-dark-primary">{course.name}</h4>
                    <Badge className="bg-blue-500/20 text-blue-400">
                      {course.students} students
                    </Badge>
                  </div>
                  <p className="text-sm text-dark-secondary">{course.code} • {course.semester}</p>
                  <Progress value={(course.students / Math.max(...teachingCourses.map(c => c.students))) * 100} className="h-2 mt-2" />
                </motion.div>
              ))}
            </motion.div>
          </ScrollArea>
        </DialogContent>
      </Dialog>

      {/* Avg Attendance Dialog */}
      <Dialog open={selectedDialog === 'avg-attendance'} onOpenChange={(open) => !open && setSelectedDialog(null)}>
        <DialogContent className="max-w-4xl max-h-[80vh] bg-dark-card border-dark-color">
          <DialogHeader>
            <DialogTitle className="text-dark-primary flex items-center">
              <Calendar className="w-6 h-6 mr-2 text-green-400" />
              Average Attendance Analytics
            </DialogTitle>
            <DialogDescription className="text-dark-secondary">
              Attendance metrics across all your courses
            </DialogDescription>
          </DialogHeader>
          <ScrollArea className="h-[600px] pr-4">
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="p-6 bg-green-500/10 border border-green-500/30 rounded-lg text-center">
                <motion.div 
                  className="text-5xl font-bold text-green-400"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  {avgAttendance}%
                </motion.div>
                <p className="text-sm text-dark-secondary mt-2">Overall Average Attendance</p>
              </div>

              <div className="p-4 bg-dark-hover rounded-lg">
                <h3 className="font-semibold text-dark-primary mb-4">Course-wise Attendance</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={teachingCourses}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="code" stroke="#94A3B8" />
                    <YAxis stroke="#94A3B8" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1E293B', 
                        border: '1px solid #374151',
                        borderRadius: '8px',
                        color: '#FFFFFF'
                      }} 
                    />
                    <Bar dataKey="avgAttendance" fill="#10B981" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {teachingCourses.map((course, index) => (
                <motion.div
                  key={course.id}
                  className="p-4 bg-dark-hover rounded-lg"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-dark-primary">{course.name}</span>
                    <Badge className={`${
                      course.avgAttendance >= 90 ? 'bg-green-500/20 text-green-400' :
                      course.avgAttendance >= 85 ? 'bg-blue-500/20 text-blue-400' :
                      'bg-orange-500/20 text-orange-400'
                    }`}>
                      {course.avgAttendance}%
                    </Badge>
                  </div>
                  <Progress value={course.avgAttendance} className="h-2" />
                </motion.div>
              ))}
            </motion.div>
          </ScrollArea>
        </DialogContent>
      </Dialog>

      {/* Avg Performance Dialog */}
      <Dialog open={selectedDialog === 'avg-performance'} onOpenChange={(open) => !open && setSelectedDialog(null)}>
        <DialogContent className="max-w-4xl max-h-[80vh] bg-dark-card border-dark-color">
          <DialogHeader>
            <DialogTitle className="text-dark-primary flex items-center">
              <TrendingUp className="w-6 h-6 mr-2 text-purple-400" />
              Average Performance Metrics
            </DialogTitle>
            <DialogDescription className="text-dark-secondary">
              Student performance across all your courses
            </DialogDescription>
          </DialogHeader>
          <ScrollArea className="h-[600px] pr-4">
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="p-6 bg-purple-500/10 border border-purple-500/30 rounded-lg text-center">
                <motion.div 
                  className="text-5xl font-bold text-purple-400"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  {avgPerformance}%
                </motion.div>
                <p className="text-sm text-dark-secondary mt-2">Overall Average Performance</p>
              </div>

              <div className="p-4 bg-dark-hover rounded-lg">
                <h3 className="font-semibold text-dark-primary mb-4">Course-wise Performance</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={teachingCourses}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="code" stroke="#94A3B8" />
                    <YAxis stroke="#94A3B8" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1E293B', 
                        border: '1px solid #374151',
                        borderRadius: '8px',
                        color: '#FFFFFF'
                      }} 
                    />
                    <Bar dataKey="avgPerformance" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {teachingCourses.map((course, index) => (
                <motion.div
                  key={course.id}
                  className="p-4 bg-dark-hover rounded-lg"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-dark-primary">{course.name}</span>
                    <Badge className={`${
                      course.avgPerformance >= 90 ? 'bg-green-500/20 text-green-400' :
                      course.avgPerformance >= 80 ? 'bg-blue-500/20 text-blue-400' :
                      'bg-orange-500/20 text-orange-400'
                    }`}>
                      {course.avgPerformance}%
                    </Badge>
                  </div>
                  <Progress value={course.avgPerformance} className="h-2" />
                </motion.div>
              ))}
            </motion.div>
          </ScrollArea>
        </DialogContent>
      </Dialog>

      {/* Teaching Credits Dialog */}
      <Dialog open={selectedDialog === 'teaching-credits'} onOpenChange={(open) => !open && setSelectedDialog(null)}>
        <DialogContent className="max-w-2xl bg-dark-card border-dark-color">
          <DialogHeader>
            <DialogTitle className="text-dark-primary flex items-center">
              <Award className="w-6 h-6 mr-2 text-orange-400" />
              Teaching Credits Breakdown
            </DialogTitle>
            <DialogDescription className="text-dark-secondary">
              Credit distribution across all courses
            </DialogDescription>
          </DialogHeader>
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="p-6 bg-orange-500/10 border border-orange-500/30 rounded-lg text-center">
              <motion.div 
                className="text-5xl font-bold text-orange-400"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                {totalCredits}
              </motion.div>
              <p className="text-sm text-dark-secondary mt-2">Total Teaching Credits</p>
            </div>

            <div className="space-y-3">
              {teachingCourses.map((course, index) => (
                <motion.div
                  key={course.id}
                  className="flex items-center justify-between p-3 bg-dark-hover rounded-lg"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <div>
                    <p className="font-medium text-dark-primary">{course.name}</p>
                    <p className="text-sm text-dark-secondary">{course.code}</p>
                  </div>
                  <Badge className="bg-orange-500/20 text-orange-400">
                    {course.credits} credits
                  </Badge>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </DialogContent>
      </Dialog>

      {/* Class Details Dialog */}
      <Dialog open={showClassDetails} onOpenChange={setShowClassDetails}>
        <DialogContent className="max-w-2xl bg-dark-card border-dark-color">
          <DialogHeader>
            <DialogTitle className="text-dark-primary flex items-center">
              <Clock className="w-6 h-6 mr-2 text-blue-400" />
              Class Details
            </DialogTitle>
            <DialogDescription className="text-dark-secondary">
              Comprehensive information about the upcoming class
            </DialogDescription>
          </DialogHeader>
          {selectedClass && (
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                <h3 className="text-xl font-bold text-dark-primary">{selectedClass.course}</h3>
                <p className="text-dark-secondary mt-1">Topic: {selectedClass.topic}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-dark-hover rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <Clock className="w-4 h-4 text-blue-400" />
                    <p className="text-sm text-dark-secondary">Time</p>
                  </div>
                  <p className="font-semibold text-dark-primary">{selectedClass.time}</p>
                </div>
                <div className="p-4 bg-dark-hover rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <Calendar className="w-4 h-4 text-green-400" />
                    <p className="text-sm text-dark-secondary">Duration</p>
                  </div>
                  <p className="font-semibold text-dark-primary">{selectedClass.duration}</p>
                </div>
                <div className="p-4 bg-dark-hover rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <FileText className="w-4 h-4 text-purple-400" />
                    <p className="text-sm text-dark-secondary">Room</p>
                  </div>
                  <p className="font-semibold text-dark-primary">{selectedClass.room}</p>
                </div>
                <div className="p-4 bg-dark-hover rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <p className="text-sm text-dark-secondary">Status</p>
                  </div>
                  <p className="font-semibold text-green-400">Scheduled</p>
                </div>
              </div>

              <div className="p-4 bg-dark-hover rounded-lg">
                <h4 className="font-semibold text-dark-primary mb-2">Class Objectives</h4>
                <ul className="space-y-1 text-sm text-dark-secondary">
                  <li>• Introduce core concepts of {selectedClass.topic}</li>
                  <li>• Provide practical examples and demonstrations</li>
                  <li>• Q&A session with students</li>
                  <li>• Assign homework for next class</li>
                </ul>
              </div>

              <div className="flex gap-3">
                <Button className="dark-button-primary flex-1">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Mark as Completed
                </Button>
                <Button className="dark-button-secondary flex-1">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Class
                </Button>
              </div>
            </motion.div>
          )}
        </DialogContent>
      </Dialog>

      {/* Manage Course Dialog (keeping existing) */}
      <Dialog open={showManageCourse} onOpenChange={setShowManageCourse}>
        <DialogContent className="max-w-4xl bg-dark-card border-dark-color">
          <DialogHeader>
            <DialogTitle className="text-dark-primary text-2xl">
              Manage Course: {selectedCourse?.name}
            </DialogTitle>
            <DialogDescription className="text-dark-secondary">
              Comprehensive course management and content organization
            </DialogDescription>
          </DialogHeader>

          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList className="bg-dark-hover border border-dark-color">
              <TabsTrigger value="overview" className="data-[state=active]:bg-dark-card">Overview</TabsTrigger>
              <TabsTrigger value="content" className="data-[state=active]:bg-dark-card">Content</TabsTrigger>
              <TabsTrigger value="assignments" className="data-[state=active]:bg-dark-card">Assignments</TabsTrigger>
              <TabsTrigger value="students" className="data-[state=active]:bg-dark-card">Students</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <div className="grid grid-cols-2 gap-6">
                <Card className="bg-dark-hover border-dark-color">
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-dark-primary mb-2">Course Information</h3>
                    <div className="space-y-2 text-sm">
                      <p className="text-dark-secondary">Code: <span className="text-dark-primary">{selectedCourse?.code}</span></p>
                      <p className="text-dark-secondary">Credits: <span className="text-dark-primary">{selectedCourse?.credits}</span></p>
                      <p className="text-dark-secondary">Room: <span className="text-dark-primary">{selectedCourse?.room}</span></p>
                      <p className="text-dark-secondary">Students: <span className="text-dark-primary">{selectedCourse?.students}</span></p>
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-dark-hover border-dark-color">
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-dark-primary mb-2">Performance Metrics</h3>
                    <div className="space-y-2 text-sm">
                      <p className="text-dark-secondary">Attendance: <span className="text-green-400">{selectedCourse?.avgAttendance}%</span></p>
                      <p className="text-dark-secondary">Performance: <span className="text-blue-400">{selectedCourse?.avgPerformance}%</span></p>
                      <p className="text-dark-secondary">Assignments: <span className="text-dark-primary">{selectedCourse?.assignments}</span></p>
                      <p className="text-dark-secondary">Progress: <span className="text-purple-400">{selectedCourse?.completedLectures}/{selectedCourse?.totalLectures}</span></p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="content" className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-dark-primary">Course Materials</h3>
                  <Button className="dark-button-primary">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Material
                  </Button>
                </div>
                <div className="grid gap-3">
                  {[1, 2, 3].map((item) => (
                    <Card key={item} className="bg-dark-hover border-dark-color p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-dark-primary">Lecture {item}: Introduction to Topic</p>
                          <p className="text-sm text-dark-secondary">Added 2 days ago</p>
                        </div>
                        <Button size="sm" className="dark-button-secondary">
                          <Edit className="w-3 h-3" />
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="assignments" className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-dark-primary">Assignments & Exams</h3>
                  <Button className="dark-button-primary">
                    <Plus className="w-4 h-4 mr-2" />
                    Create Assignment
                  </Button>
                </div>
                <div className="grid gap-3">
                  {[1, 2, 3].map((item) => (
                    <Card key={item} className="bg-dark-hover border-dark-color p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-dark-primary">Assignment {item}</p>
                          <p className="text-sm text-dark-secondary">Due: Next week • {Math.floor(Math.random() * 30) + 10} submissions</p>
                        </div>
                        <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                          Active
                        </Badge>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="students" className="space-y-4">
              <div className="space-y-4">
                <h3 className="font-semibold text-dark-primary">Enrolled Students</h3>
                <div className="grid gap-3">
                  {[1, 2, 3, 4].map((item) => (
                    <Card key={item} className="bg-dark-hover border-dark-color p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-dark-primary">Student Name {item}</p>
                          <p className="text-sm text-dark-secondary">Roll: CS202100{item} • CGPA: {(8.0 + Math.random()).toFixed(1)}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                            {85 + Math.floor(Math.random() * 15)}%
                          </Badge>
                          <Button size="sm" className="dark-button-secondary">
                            View Profile
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>

      {/* Course Settings Dialog (keeping existing) */}
      <Dialog open={showSettings} onOpenChange={setShowSettings}>
        <DialogContent className="max-w-2xl bg-dark-card border-dark-color">
          <DialogHeader>
            <DialogTitle className="text-dark-primary">
              Course Settings: {selectedCourse?.name}
            </DialogTitle>
            <DialogDescription className="text-dark-secondary">
              Configure course preferences and settings
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="courseName" className="text-dark-primary">Course Name</Label>
                <Input
                  id="courseName"
                  defaultValue={selectedCourse?.name}
                  className="bg-dark-bg border-dark-color text-dark-primary"
                />
              </div>
              <div>
                <Label htmlFor="courseCode" className="text-dark-primary">Course Code</Label>
                <Input
                  id="courseCode"
                  defaultValue={selectedCourse?.code}
                  className="bg-dark-bg border-dark-color text-dark-primary"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="credits" className="text-dark-primary">Credits</Label>
                <Input
                  id="credits"
                  type="number"
                  defaultValue={selectedCourse?.credits}
                  className="bg-dark-bg border-dark-color text-dark-primary"
                />
              </div>
              <div>
                <Label htmlFor="room" className="text-dark-primary">Room</Label>
                <Input
                  id="room"
                  defaultValue={selectedCourse?.room}
                  className="bg-dark-bg border-dark-color text-dark-primary"
                />
              </div>
              <div>
                <Label htmlFor="semester" className="text-dark-primary">Semester</Label>
                <Select defaultValue={selectedCourse?.semester}>
                  <SelectTrigger className="bg-dark-bg border-dark-color text-dark-primary">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-dark-card border-dark-color">
                    <SelectItem value="6th Semester">6th Semester</SelectItem>
                    <SelectItem value="7th Semester">7th Semester</SelectItem>
                    <SelectItem value="8th Semester">8th Semester</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="description" className="text-dark-primary">Course Description</Label>
              <Textarea
                id="description"
                placeholder="Enter course description..."
                className="bg-dark-bg border-dark-color text-dark-primary"
                rows={4}
              />
            </div>

            <div className="flex items-center space-x-4 pt-4 border-t border-dark-color">
              <Button className="dark-button-primary flex-1">
                <Save className="w-4 h-4 mr-2" />
                Save Settings
              </Button>
              <Button 
                className="dark-button-secondary"
                onClick={() => setShowSettings(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
