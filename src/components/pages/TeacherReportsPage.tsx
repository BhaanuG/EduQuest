import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { FileText, BarChart3, Download, Calendar, Users, TrendingUp, Filter, Eye, CheckCircle2, Clock, Target } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Progress } from "../ui/progress";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";
import { ScrollArea } from "../ui/scroll-area";
import { STUDENTS_DATA } from "../StudentData";

interface TeacherReportsPageProps {
  user: any;
}

const classPerformanceData = [
  { class: "Data Structures", avgScore: 87, totalStudents: 45, passRate: 96, highestScore: 98, lowestScore: 65, median: 88 },
  { class: "Database Systems", avgScore: 92, totalStudents: 42, passRate: 100, highestScore: 100, lowestScore: 78, median: 93 },
  { class: "Computer Networks", avgScore: 78, totalStudents: 38, passRate: 89, highestScore: 95, lowestScore: 58, median: 79 },
  { class: "Software Engineering", avgScore: 85, totalStudents: 40, passRate: 95, highestScore: 97, lowestScore: 68, median: 86 }
];

const attendanceData = [
  { month: "Sep", attendance: 92, present: 165, absent: 14, totalClasses: 20 },
  { month: "Oct", attendance: 89, present: 158, absent: 19, totalClasses: 20 },
  { month: "Nov", attendance: 94, present: 171, absent: 11, totalClasses: 20 },
  { month: "Dec", attendance: 91, present: 164, absent: 16, totalClasses: 20 },
  { month: "Jan", attendance: 88, present: 156, absent: 21, totalClasses: 20 }
];

const recentReports = [
  {
    id: 1,
    title: "Mid-Semester Performance Report",
    type: "Academic Performance",
    generatedDate: "2024-01-10",
    status: "Ready",
    fileSize: "2.4 MB",
    downloads: 5,
    viewCount: 12
  },
  {
    id: 2,
    title: "Attendance Summary - December 2023",
    type: "Attendance",
    generatedDate: "2024-01-05",
    status: "Ready",
    fileSize: "1.8 MB",
    downloads: 3,
    viewCount: 8
  },
  {
    id: 3,
    title: "Assignment Submission Analysis",
    type: "Academic Performance",
    generatedDate: "2024-01-03",
    status: "Ready",
    fileSize: "3.2 MB",
    downloads: 7,
    viewCount: 15
  },
  {
    id: 4,
    title: "Course Completion Statistics",
    type: "Course Progress",
    generatedDate: "2023-12-28",
    status: "Ready",
    fileSize: "1.5 MB",
    downloads: 4,
    viewCount: 9
  }
];

const reportTemplates = [
  {
    name: "Student Performance Report",
    description: "Comprehensive analysis of student academic performance",
    dataPoints: ["Grades", "Assignments", "Quizzes", "Participation"],
    estimatedTime: "5 minutes"
  },
  {
    name: "Class Attendance Report",
    description: "Detailed attendance tracking and analysis",
    dataPoints: ["Daily Attendance", "Trends", "Absenteeism Patterns"],
    estimatedTime: "3 minutes"
  },
  {
    name: "Course Progress Report",
    description: "Track course completion and module progress",
    dataPoints: ["Module Completion", "Timeline Analysis", "Learning Outcomes"],
    estimatedTime: "4 minutes"
  },
  {
    name: "Assignment Analysis Report",
    description: "Analyze assignment submission patterns and scores",
    dataPoints: ["Submission Rates", "Score Distribution", "Late Submissions"],
    estimatedTime: "6 minutes"
  }
];

export function TeacherReportsPage({ user }: TeacherReportsPageProps) {
  const [selectedTab, setSelectedTab] = useState("overview");
  const [selectedDialog, setSelectedDialog] = useState<string | null>(null);
  const [selectedChartData, setSelectedChartData] = useState<any>(null);

  const totalStudents = classPerformanceData.reduce((sum, cls) => sum + cls.totalStudents, 0);
  const avgClassScore = Math.round(classPerformanceData.reduce((sum, cls) => sum + cls.avgScore, 0) / classPerformanceData.length);
  const overallPassRate = Math.round(classPerformanceData.reduce((sum, cls) => sum + cls.passRate, 0) / classPerformanceData.length);
  
  // Get students from teacher's department
  const departmentStudents = STUDENTS_DATA.filter(s => s.department === user.department);

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
            <h1 className="text-3xl font-bold text-dark-primary">Academic Reports</h1>
            <p className="text-dark-secondary mt-2">Generate and analyze comprehensive academic reports</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button className="dark-button-primary">
              <FileText className="w-4 h-4 mr-2" />
              Generate New Report
            </Button>
          </motion.div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="flex-1 overflow-auto p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <TabsList className="bg-dark-card border border-dark-color">
                <TabsTrigger value="overview" className="data-[state=active]:bg-dark-hover">
                  Overview
                </TabsTrigger>
                <TabsTrigger value="generate" className="data-[state=active]:bg-dark-hover">
                  Generate Reports
                </TabsTrigger>
                <TabsTrigger value="history" className="data-[state=active]:bg-dark-hover">
                  Report History
                </TabsTrigger>
              </TabsList>
            </motion.div>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              {/* Key Metrics */}
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
                            transition={{ duration: 0.5, delay: 0.5 }}
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
                    onClick={() => setSelectedDialog('average-score')}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-dark-secondary">Average Score</p>
                          <motion.p 
                            className="text-3xl font-bold text-dark-primary"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.5, delay: 0.6 }}
                          >
                            {avgClassScore}%
                          </motion.p>
                        </div>
                        <motion.div 
                          className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center"
                          whileHover={{ scale: 1.2 }}
                          transition={{ duration: 0.3 }}
                        >
                          <BarChart3 className="w-6 h-6 text-green-400" />
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
                    onClick={() => setSelectedDialog('pass-rate')}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-dark-secondary">Pass Rate</p>
                          <motion.p 
                            className="text-3xl font-bold text-dark-primary"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.5, delay: 0.7 }}
                          >
                            {overallPassRate}%
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
                    onClick={() => setSelectedDialog('reports-generated')}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-dark-secondary">Reports Generated</p>
                          <motion.p 
                            className="text-3xl font-bold text-dark-primary"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.5, delay: 0.8 }}
                          >
                            {recentReports.length}
                          </motion.p>
                        </div>
                        <motion.div 
                          className="w-12 h-12 rounded-xl bg-orange-500/20 flex items-center justify-center"
                          whileHover={{ scale: 1.2 }}
                          transition={{ duration: 0.3 }}
                        >
                          <FileText className="w-6 h-6 text-orange-400" />
                        </motion.div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Class Performance */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  <Card 
                    className="bg-dark-card border-dark-color cursor-pointer hover:border-blue-500/50 transition-all"
                    onClick={() => {
                      setSelectedChartData(classPerformanceData);
                      setSelectedDialog('class-performance-chart');
                    }}
                  >
                    <CardHeader>
                      <CardTitle className="text-dark-primary">Class Performance Overview</CardTitle>
                      <CardDescription className="text-dark-secondary">Click to view detailed metrics</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={classPerformanceData}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                          <XAxis dataKey="class" stroke="#94A3B8" />
                          <YAxis stroke="#94A3B8" />
                          <Tooltip 
                            contentStyle={{ 
                              backgroundColor: '#1E293B', 
                              border: '1px solid #374151',
                              borderRadius: '8px',
                              color: '#FFFFFF'
                            }} 
                          />
                          <Bar dataKey="avgScore" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Attendance Trend */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  <Card 
                    className="bg-dark-card border-dark-color cursor-pointer hover:border-green-500/50 transition-all"
                    onClick={() => {
                      setSelectedChartData(attendanceData);
                      setSelectedDialog('attendance-chart');
                    }}
                  >
                    <CardHeader>
                      <CardTitle className="text-dark-primary">Attendance Trend</CardTitle>
                      <CardDescription className="text-dark-secondary">Click to view detailed analytics</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={attendanceData}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                          <XAxis dataKey="month" stroke="#94A3B8" />
                          <YAxis stroke="#94A3B8" />
                          <Tooltip 
                            contentStyle={{ 
                              backgroundColor: '#1E293B', 
                              border: '1px solid #374151',
                              borderRadius: '8px',
                              color: '#FFFFFF'
                            }} 
                          />
                          <Line type="monotone" dataKey="attendance" stroke="#10B981" strokeWidth={3} dot={{ fill: '#10B981', r: 6 }} />
                        </LineChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>

              {/* Recent Reports Summary */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
              >
                <Card className="bg-dark-card border-dark-color">
                  <CardHeader>
                    <CardTitle className="text-dark-primary">Recent Reports</CardTitle>
                    <CardDescription className="text-dark-secondary">Latest generated reports</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <motion.div 
                      className="space-y-4"
                      variants={containerVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      {recentReports.slice(0, 3).map((report, index) => (
                        <motion.div 
                          key={report.id} 
                          className="flex items-center justify-between p-4 bg-dark-hover rounded-lg"
                          variants={itemVariants}
                          whileHover={{ x: 5 }}
                        >
                          <div className="flex items-center space-x-4">
                            <motion.div 
                              className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center"
                              whileHover={{ rotate: 360 }}
                              transition={{ duration: 0.5 }}
                            >
                              <FileText className="w-4 h-4 text-purple-400" />
                            </motion.div>
                            <div>
                              <p className="font-medium text-dark-primary">{report.title}</p>
                              <p className="text-sm text-dark-secondary">{report.generatedDate}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                              {report.status}
                            </Badge>
                            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                              <Button size="sm" className="dark-button-secondary">
                                <Download className="w-4 h-4 mr-2" />
                                Download
                              </Button>
                            </motion.div>
                          </div>
                        </motion.div>
                      ))}
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            {/* Generate Reports Tab */}
            <TabsContent value="generate" className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="bg-dark-card border-dark-color">
                  <CardHeader>
                    <CardTitle className="text-dark-primary">Report Templates</CardTitle>
                    <CardDescription className="text-dark-secondary">Choose from pre-configured report templates</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <motion.div 
                      className="grid gap-6"
                      variants={containerVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      {reportTemplates.map((template, index) => (
                        <motion.div 
                          key={index} 
                          className="p-6 bg-dark-hover rounded-lg"
                          variants={itemVariants}
                          whileHover={{ x: 5 }}
                        >
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                              <h3 className="font-semibold text-dark-primary mb-2">{template.name}</h3>
                              <p className="text-sm text-dark-secondary mb-3">{template.description}</p>
                              <div className="flex flex-wrap gap-2 mb-3">
                                {template.dataPoints.map((point, pointIndex) => (
                                  <motion.div
                                    key={pointIndex}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.2, delay: pointIndex * 0.05 }}
                                  >
                                    <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 text-xs">
                                      {point}
                                    </Badge>
                                  </motion.div>
                                ))}
                              </div>
                              <p className="text-xs text-dark-secondary flex items-center">
                                <Clock className="w-3 h-3 mr-1" />
                                Estimated generation time: {template.estimatedTime}
                              </p>
                            </div>
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                              <Button className="dark-button-primary">
                                <FileText className="w-4 h-4 mr-2" />
                                Generate
                              </Button>
                            </motion.div>
                          </div>
                        </motion.div>
                      ))}
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            {/* Report History Tab */}
            <TabsContent value="history" className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="bg-dark-card border-dark-color">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-dark-primary">Generated Reports</CardTitle>
                        <CardDescription className="text-dark-secondary">View and download your previously generated reports</CardDescription>
                      </div>
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button className="dark-button-secondary">
                          <Filter className="w-4 h-4 mr-2" />
                          Filter
                        </Button>
                      </motion.div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <motion.div 
                      className="space-y-4"
                      variants={containerVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      {recentReports.map((report, index) => (
                        <motion.div 
                          key={report.id} 
                          className="flex items-center justify-between p-4 bg-dark-hover rounded-lg"
                          variants={itemVariants}
                          whileHover={{ x: 5 }}
                        >
                          <div className="flex items-center space-x-4">
                            <motion.div 
                              className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center"
                              whileHover={{ rotate: 360 }}
                              transition={{ duration: 0.5 }}
                            >
                              <FileText className="w-5 h-5 text-blue-400" />
                            </motion.div>
                            <div className="flex-1">
                              <h4 className="font-medium text-dark-primary">{report.title}</h4>
                              <p className="text-sm text-dark-secondary">Generated on {report.generatedDate} • {report.fileSize}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">
                              {report.type}
                            </Badge>
                            <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                              {report.status}
                            </Badge>
                            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                              <Button size="sm" className="dark-button-secondary">
                                <Eye className="w-4 h-4 mr-2" />
                                View
                              </Button>
                            </motion.div>
                            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                              <Button size="sm" className="dark-button-primary">
                                <Download className="w-4 h-4 mr-2" />
                                Download
                              </Button>
                            </motion.div>
                          </div>
                        </motion.div>
                      ))}
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </main>

      {/* Dialogs */}
      {/* Total Students Dialog */}
      <Dialog open={selectedDialog === 'total-students'} onOpenChange={(open) => !open && setSelectedDialog(null)}>
        <DialogContent className="bg-dark-card border-dark-color max-w-3xl max-h-[80vh]">
          <DialogHeader>
            <DialogTitle className="text-dark-primary flex items-center">
              <Users className="w-6 h-6 mr-2 text-blue-400" />
              Total Students Details
            </DialogTitle>
            <DialogDescription className="text-dark-secondary">
              Complete breakdown of all students across your classes
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
                  <p className="text-2xl font-bold text-blue-400">{totalStudents}</p>
                  <p className="text-sm text-dark-secondary mt-1">Total Students</p>
                </div>
                <div className="p-4 bg-dark-hover rounded-lg text-center">
                  <p className="text-2xl font-bold text-green-400">{classPerformanceData.length}</p>
                  <p className="text-sm text-dark-secondary mt-1">Classes</p>
                </div>
                <div className="p-4 bg-dark-hover rounded-lg text-center">
                  <p className="text-2xl font-bold text-purple-400">
                    {Math.round(totalStudents / classPerformanceData.length)}
                  </p>
                  <p className="text-sm text-dark-secondary mt-1">Avg per Class</p>
                </div>
              </div>
              
              {classPerformanceData.map((cls, index) => (
                <motion.div
                  key={index}
                  className="p-4 bg-dark-hover rounded-lg"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-dark-primary">{cls.class}</h4>
                    <Badge className="bg-blue-500/20 text-blue-400">
                      {cls.totalStudents} students
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-dark-secondary">Average Score:</span>
                      <span className="text-dark-primary font-medium">{cls.avgScore}%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-dark-secondary">Pass Rate:</span>
                      <span className="text-dark-primary font-medium">{cls.passRate}%</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </ScrollArea>
        </DialogContent>
      </Dialog>

      {/* Average Score Dialog */}
      <Dialog open={selectedDialog === 'average-score'} onOpenChange={(open) => !open && setSelectedDialog(null)}>
        <DialogContent className="bg-dark-card border-dark-color max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-dark-primary flex items-center">
              <BarChart3 className="w-6 h-6 mr-2 text-green-400" />
              Average Score Analysis
            </DialogTitle>
            <DialogDescription className="text-dark-secondary">
              Detailed breakdown of class performance
            </DialogDescription>
          </DialogHeader>
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="p-6 bg-dark-hover rounded-lg text-center">
              <motion.div 
                className="text-5xl font-bold text-green-400"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                {avgClassScore}%
              </motion.div>
              <p className="text-sm text-dark-secondary mt-2">Overall Average Score</p>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold text-dark-primary">Class-wise Scores</h4>
              {classPerformanceData.map((cls, index) => (
                <motion.div
                  key={index}
                  className="p-3 bg-dark-hover rounded-lg"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-dark-primary">{cls.class}</span>
                    <span className="text-lg font-bold text-dark-primary">{cls.avgScore}%</span>
                  </div>
                  <Progress value={cls.avgScore} className="h-2" />
                  <div className="grid grid-cols-3 gap-2 mt-2 text-xs text-dark-secondary">
                    <div>Highest: {cls.highestScore}%</div>
                    <div>Median: {cls.median}%</div>
                    <div>Lowest: {cls.lowestScore}%</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </DialogContent>
      </Dialog>

      {/* Pass Rate Dialog */}
      <Dialog open={selectedDialog === 'pass-rate'} onOpenChange={(open) => !open && setSelectedDialog(null)}>
        <DialogContent className="bg-dark-card border-dark-color max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-dark-primary flex items-center">
              <TrendingUp className="w-6 h-6 mr-2 text-purple-400" />
              Pass Rate Statistics
            </DialogTitle>
            <DialogDescription className="text-dark-secondary">
              Student success rates across all classes
            </DialogDescription>
          </DialogHeader>
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="p-6 bg-purple-500/10 border border-purple-500/30 rounded-lg text-center">
              <motion.div 
                className="text-5xl font-bold text-purple-400"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                {overallPassRate}%
              </motion.div>
              <p className="text-sm text-dark-secondary mt-2">Overall Pass Rate</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-dark-hover rounded-lg text-center">
                <CheckCircle2 className="w-8 h-8 text-green-400 mx-auto mb-2" />
                <p className="text-2xl font-bold text-green-400">
                  {Math.round(totalStudents * overallPassRate / 100)}
                </p>
                <p className="text-sm text-dark-secondary">Students Passed</p>
              </div>
              <div className="p-4 bg-dark-hover rounded-lg text-center">
                <Target className="w-8 h-8 text-orange-400 mx-auto mb-2" />
                <p className="text-2xl font-bold text-orange-400">
                  {totalStudents - Math.round(totalStudents * overallPassRate / 100)}
                </p>
                <p className="text-sm text-dark-secondary">Need Support</p>
              </div>
            </div>

            <div className="space-y-3">
              {classPerformanceData.map((cls, index) => (
                <motion.div
                  key={index}
                  className="p-3 bg-dark-hover rounded-lg"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-dark-primary">{cls.class}</span>
                    <Badge className={`${
                      cls.passRate >= 95 ? 'bg-green-500/20 text-green-400' :
                      cls.passRate >= 85 ? 'bg-blue-500/20 text-blue-400' :
                      'bg-orange-500/20 text-orange-400'
                    }`}>
                      {cls.passRate}% Pass Rate
                    </Badge>
                  </div>
                  <Progress value={cls.passRate} className="h-2" />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </DialogContent>
      </Dialog>

      {/* Reports Generated Dialog */}
      <Dialog open={selectedDialog === 'reports-generated'} onOpenChange={(open) => !open && setSelectedDialog(null)}>
        <DialogContent className="bg-dark-card border-dark-color max-w-3xl max-h-[80vh]">
          <DialogHeader>
            <DialogTitle className="text-dark-primary flex items-center">
              <FileText className="w-6 h-6 mr-2 text-orange-400" />
              Reports Generated
            </DialogTitle>
            <DialogDescription className="text-dark-secondary">
              All generated reports with download statistics
            </DialogDescription>
          </DialogHeader>
          <ScrollArea className="h-[500px] pr-4">
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {recentReports.map((report, index) => (
                <motion.div
                  key={report.id}
                  className="p-4 bg-dark-hover rounded-lg"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h4 className="font-semibold text-dark-primary">{report.title}</h4>
                      <p className="text-sm text-dark-secondary mt-1">
                        Generated on {report.generatedDate}
                      </p>
                    </div>
                    <Badge className="bg-green-500/20 text-green-400">
                      {report.status}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-4 gap-2 mb-3 text-sm">
                    <div className="p-2 bg-dark-bg rounded">
                      <span className="text-dark-secondary">Type: </span>
                      <span className="text-dark-primary font-medium">{report.type}</span>
                    </div>
                    <div className="p-2 bg-dark-bg rounded">
                      <span className="text-dark-secondary">Size: </span>
                      <span className="text-dark-primary font-medium">{report.fileSize}</span>
                    </div>
                    <div className="p-2 bg-dark-bg rounded">
                      <span className="text-dark-secondary">Downloads: </span>
                      <span className="text-dark-primary font-medium">{report.downloads}</span>
                    </div>
                    <div className="p-2 bg-dark-bg rounded">
                      <span className="text-dark-secondary">Views: </span>
                      <span className="text-dark-primary font-medium">{report.viewCount}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" className="dark-button-secondary flex-1">
                      <Eye className="w-3 h-3 mr-1" />
                      View
                    </Button>
                    <Button size="sm" className="dark-button-primary flex-1">
                      <Download className="w-3 h-3 mr-1" />
                      Download
                    </Button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </ScrollArea>
        </DialogContent>
      </Dialog>

      {/* Class Performance Chart Dialog */}
      <Dialog open={selectedDialog === 'class-performance-chart'} onOpenChange={(open) => !open && setSelectedDialog(null)}>
        <DialogContent className="bg-dark-card border-dark-color max-w-4xl max-h-[80vh]">
          <DialogHeader>
            <DialogTitle className="text-dark-primary">Class Performance Overview - Detailed View</DialogTitle>
            <DialogDescription className="text-dark-secondary">
              Comprehensive performance metrics for all classes
            </DialogDescription>
          </DialogHeader>
          <ScrollArea className="h-[600px] pr-4">
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={classPerformanceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="class" stroke="#94A3B8" />
                  <YAxis stroke="#94A3B8" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1E293B', 
                      border: '1px solid #374151',
                      borderRadius: '8px',
                      color: '#FFFFFF'
                    }} 
                  />
                  <Bar dataKey="avgScore" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="passRate" fill="#10B981" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>

              <div className="space-y-4">
                {classPerformanceData.map((cls, index) => (
                  <motion.div
                    key={index}
                    className="p-4 bg-dark-hover rounded-lg"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <h4 className="font-semibold text-dark-primary mb-3">{cls.class}</h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      <div className="p-3 bg-dark-bg rounded">
                        <p className="text-xs text-dark-secondary">Total Students</p>
                        <p className="text-xl font-bold text-blue-400">{cls.totalStudents}</p>
                      </div>
                      <div className="p-3 bg-dark-bg rounded">
                        <p className="text-xs text-dark-secondary">Average Score</p>
                        <p className="text-xl font-bold text-green-400">{cls.avgScore}%</p>
                      </div>
                      <div className="p-3 bg-dark-bg rounded">
                        <p className="text-xs text-dark-secondary">Pass Rate</p>
                        <p className="text-xl font-bold text-purple-400">{cls.passRate}%</p>
                      </div>
                      <div className="p-3 bg-dark-bg rounded">
                        <p className="text-xs text-dark-secondary">Highest Score</p>
                        <p className="text-xl font-bold text-green-400">{cls.highestScore}%</p>
                      </div>
                      <div className="p-3 bg-dark-bg rounded">
                        <p className="text-xs text-dark-secondary">Median Score</p>
                        <p className="text-xl font-bold text-blue-400">{cls.median}%</p>
                      </div>
                      <div className="p-3 bg-dark-bg rounded">
                        <p className="text-xs text-dark-secondary">Lowest Score</p>
                        <p className="text-xl font-bold text-orange-400">{cls.lowestScore}%</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </ScrollArea>
        </DialogContent>
      </Dialog>

      {/* Attendance Chart Dialog */}
      <Dialog open={selectedDialog === 'attendance-chart'} onOpenChange={(open) => !open && setSelectedDialog(null)}>
        <DialogContent className="bg-dark-card border-dark-color max-w-4xl max-h-[80vh]">
          <DialogHeader>
            <DialogTitle className="text-dark-primary">Attendance Trend - Detailed Analytics</DialogTitle>
            <DialogDescription className="text-dark-secondary">
              Monthly attendance patterns and statistics
            </DialogDescription>
          </DialogHeader>
          <ScrollArea className="h-[600px] pr-4">
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <ResponsiveContainer width="100%" height={350}>
                <LineChart data={attendanceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="month" stroke="#94A3B8" />
                  <YAxis stroke="#94A3B8" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1E293B', 
                      border: '1px solid #374151',
                      borderRadius: '8px',
                      color: '#FFFFFF'
                    }} 
                  />
                  <Line type="monotone" dataKey="attendance" stroke="#10B981" strokeWidth={3} dot={{ fill: '#10B981', r: 6 }} />
                </LineChart>
              </ResponsiveContainer>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="p-4 bg-dark-hover rounded-lg text-center">
                  <p className="text-3xl font-bold text-green-400">
                    {Math.round(attendanceData.reduce((sum, d) => sum + d.attendance, 0) / attendanceData.length)}%
                  </p>
                  <p className="text-sm text-dark-secondary mt-1">Average Attendance</p>
                </div>
                <div className="p-4 bg-dark-hover rounded-lg text-center">
                  <p className="text-3xl font-bold text-blue-400">
                    {attendanceData.reduce((sum, d) => sum + d.totalClasses, 0)}
                  </p>
                  <p className="text-sm text-dark-secondary mt-1">Total Classes</p>
                </div>
              </div>

              <div className="space-y-3">
                {attendanceData.map((data, index) => (
                  <motion.div
                    key={index}
                    className="p-4 bg-dark-hover rounded-lg"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold text-dark-primary">{data.month}</h4>
                      <Badge className={`${
                        data.attendance >= 92 ? 'bg-green-500/20 text-green-400' :
                        data.attendance >= 85 ? 'bg-blue-500/20 text-blue-400' :
                        'bg-orange-500/20 text-orange-400'
                      }`}>
                        {data.attendance}%
                      </Badge>
                    </div>
                    <Progress value={data.attendance} className="h-2 mb-3" />
                    <div className="grid grid-cols-3 gap-2 text-sm">
                      <div className="p-2 bg-dark-bg rounded text-center">
                        <p className="text-xs text-dark-secondary">Present</p>
                        <p className="font-bold text-green-400">{data.present}</p>
                      </div>
                      <div className="p-2 bg-dark-bg rounded text-center">
                        <p className="text-xs text-dark-secondary">Absent</p>
                        <p className="font-bold text-red-400">{data.absent}</p>
                      </div>
                      <div className="p-2 bg-dark-bg rounded text-center">
                        <p className="text-xs text-dark-secondary">Total Classes</p>
                        <p className="font-bold text-blue-400">{data.totalClasses}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </>
  );
}
