import { useState } from "react";
import { Calendar, BarChart3, CheckCircle, XCircle, Clock, TrendingUp, Target, Award } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";
import { motion } from "motion/react";

interface StudentAttendancPageProps {
  user: any;
}

// Function to generate personalized attendance data based on student information
function getPersonalizedAttendanceData(user: any) {
  const rollNoSeed = parseInt(user.rollNo.slice(-3));
  const baseAttendance = user.cgpa >= 9.0 ? 95 : user.cgpa >= 8.5 ? 90 : user.cgpa >= 8.0 ? 85 : 80;
  
  const departmentSubjects = {
    "Computer Science": [
      "Data Structures & Algorithms",
      "Database Management Systems", 
      "Computer Networks",
      "Software Engineering"
    ],
    "Electronics": [
      "Digital Signal Processing",
      "VLSI Design",
      "Communication Systems", 
      "Microprocessors"
    ],
    "Mechanical": [
      "Thermodynamics",
      "Fluid Mechanics",
      "Machine Design",
      "Manufacturing Processes"
    ],
    "Information Technology": [
      "Web Development",
      "Database Systems",
      "Cybersecurity",
      "Cloud Computing"
    ],
    "Civil": [
      "Structural Engineering",
      "Environmental Engineering",
      "Geotechnical Engineering",
      "Construction Management"
    ]
  };
  
  const subjects = departmentSubjects[user.department] || [];
  
  return subjects.map((subject, index) => {
    const variance = (rollNoSeed + index * 13) % 8 - 4; // -4 to +4 variance
    const attendance = Math.max(75, Math.min(100, baseAttendance + variance));
    const totalClasses = 28 + (rollNoSeed + index) % 5; // 28-32 total classes
    const attendedClasses = Math.round((attendance / 100) * totalClasses);
    
    return {
      subject: subject,
      attended: attendedClasses,
      total: totalClasses,
      percentage: parseFloat(((attendedClasses / totalClasses) * 100).toFixed(1))
    };
  });
}

// Function to generate monthly attendance trend
function getMonthlyTrend(user: any) {
  const rollNoSeed = parseInt(user.rollNo.slice(-3));
  const baseAttendance = user.cgpa >= 9.0 ? 93 : user.cgpa >= 8.5 ? 89 : user.cgpa >= 8.0 ? 85 : 82;
  
  const months = ["Sep", "Oct", "Nov", "Dec", "Jan"];
  
  return months.map((month, index) => {
    const variance = (rollNoSeed + index * 7) % 6 - 3; // -3 to +3 variance
    const attendance = Math.max(75, Math.min(98, baseAttendance + variance));
    
    return {
      month: month,
      attendance: attendance
    };
  });
}

// Function to generate recent attendance records
function getRecentAttendance(user: any) {
  const rollNoSeed = parseInt(user.rollNo.slice(-3));
  const baseDate = new Date();
  const subjects = {
    "Computer Science": ["Data Structures", "Database Systems", "Computer Networks", "Software Engineering"],
    "Electronics": ["DSP", "VLSI Design", "Communication Systems", "Microprocessors"],
    "Mechanical": ["Thermodynamics", "Fluid Mechanics", "Machine Design", "Manufacturing"],
    "Information Technology": ["Web Development", "Database Systems", "Cybersecurity", "Cloud Computing"],
    "Civil": ["Structural Engineering", "Environmental Eng", "Geotechnical", "Construction Mgmt"]
  }[user.department] || [];
  
  const records = [];
  
  for (let i = 0; i < 8; i++) {
    const daysAgo = i + 1;
    const subject = subjects[i % subjects.length];
    const attendanceChance = user.cgpa >= 9.0 ? 0.95 : user.cgpa >= 8.5 ? 0.90 : user.cgpa >= 8.0 ? 0.85 : 0.80;
    const isPresent = ((rollNoSeed + i * 11) % 100) < (attendanceChance * 100);
    const timeSlots = ["10:00 AM - 11:30 AM", "2:00 PM - 3:30 PM", "11:00 AM - 12:30 PM", "3:00 PM - 4:30 PM"];
    
    records.push({
      date: new Date(baseDate.getTime() - daysAgo * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      subject: subject,
      status: isPresent ? "Present" : "Absent",
      time: timeSlots[i % timeSlots.length]
    });
  }
  
  return records;
}

export function StudentAttendancePage({ user }: StudentAttendancPageProps) {
  // Get personalized data for this student
  const attendanceData = getPersonalizedAttendanceData(user);
  const monthlyTrend = getMonthlyTrend(user);
  const recentAttendance = getRecentAttendance(user);
  
  const overallAttendance = Math.round(
    attendanceData.reduce((sum, item) => sum + item.percentage, 0) / attendanceData.length
  );

  const totalClasses = attendanceData.reduce((sum, item) => sum + item.total, 0);
  const attendedClasses = attendanceData.reduce((sum, item) => sum + item.attended, 0);

  // Dialog states
  const [overallAttendanceOpen, setOverallAttendanceOpen] = useState(false);
  const [classesAttendedOpen, setClassesAttendedOpen] = useState(false);
  const [thisMonthOpen, setThisMonthOpen] = useState(false);
  const [attendanceStatusOpen, setAttendanceStatusOpen] = useState(false);
  const [monthlyTrendOpen, setMonthlyTrendOpen] = useState(false);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
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
          <div>
            <motion.h1 
              className="text-3xl font-bold text-dark-primary"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              Attendance Tracking
            </motion.h1>
            <motion.p 
              className="text-dark-secondary mt-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              Monitor your class attendance and patterns - {user.department}
            </motion.p>
          </div>
          <motion.div 
            className="flex items-center space-x-4"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <Badge className="bg-green-500/20 text-green-400 border-green-500/30 px-4 py-2">
              <CheckCircle className="w-4 h-4 mr-2" />
              Overall: {overallAttendance}%
            </Badge>
            <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 px-4 py-2">
              <Calendar className="w-4 h-4 mr-2" />
              {attendedClasses}/{totalClasses} Classes
            </Badge>
          </motion.div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="flex-1 overflow-auto p-8 space-y-8">
        {/* Attendance Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Card 
              className="bg-dark-card border-dark-color cursor-pointer transition-all hover:border-green-500/50 hover:shadow-lg hover:shadow-green-500/20"
              onClick={() => setOverallAttendanceOpen(true)}
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <p className="text-sm text-dark-secondary">Overall Attendance</p>
                    <p className="text-3xl font-bold text-dark-primary">{overallAttendance}%</p>
                    <div className="flex items-center space-x-2">
                      <TrendingUp className={`w-4 h-4 ${overallAttendance >= 85 ? 'text-dark-positive' : 'text-dark-negative'}`} />
                      <span className={`text-sm font-medium ${overallAttendance >= 85 ? 'text-dark-positive' : 'text-dark-negative'}`}>
                        {overallAttendance >= user.cgpa * 10 ? '+2.3%' : '-1.2%'}
                      </span>
                      <span className="text-sm text-dark-secondary">vs target</span>
                    </div>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-dark-hover flex items-center justify-center">
                    <BarChart3 className="w-6 h-6 text-green-400" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Card 
              className="bg-dark-card border-dark-color cursor-pointer transition-all hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/20"
              onClick={() => setClassesAttendedOpen(true)}
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <p className="text-sm text-dark-secondary">Classes Attended</p>
                    <p className="text-3xl font-bold text-dark-primary">{attendedClasses}</p>
                    <p className="text-sm text-dark-secondary">out of {totalClasses} classes</p>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-dark-hover flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-blue-400" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Card 
              className="bg-dark-card border-dark-color cursor-pointer transition-all hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-500/20"
              onClick={() => setThisMonthOpen(true)}
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <p className="text-sm text-dark-secondary">This Month</p>
                    <p className="text-3xl font-bold text-dark-primary">{monthlyTrend[monthlyTrend.length - 1]?.attendance}%</p>
                    <p className="text-sm text-dark-secondary">Current month attendance</p>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-dark-hover flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-purple-400" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Card 
              className="bg-dark-card border-dark-color cursor-pointer transition-all hover:border-orange-500/50 hover:shadow-lg hover:shadow-orange-500/20"
              onClick={() => setAttendanceStatusOpen(true)}
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <p className="text-sm text-dark-secondary">Attendance Status</p>
                    <p className="text-3xl font-bold text-dark-primary">
                      {overallAttendance >= 85 ? "Good" : overallAttendance >= 75 ? "Fair" : "Low"}
                    </p>
                    <p className="text-sm text-dark-secondary">
                      {overallAttendance >= 85 ? "Above requirement" : "Needs improvement"}
                    </p>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-dark-hover flex items-center justify-center">
                    {overallAttendance >= 85 ? 
                      <CheckCircle className="w-6 h-6 text-green-400" /> :
                      <XCircle className="w-6 h-6 text-red-400" />
                    }
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Subject-wise Attendance */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <Card className="bg-dark-card border-dark-color">
              <CardHeader>
                <CardTitle className="text-dark-primary">Subject-wise Attendance</CardTitle>
                <CardDescription className="text-dark-secondary">Your attendance breakdown by subject</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {attendanceData.map((item, index) => (
                    <motion.div 
                      key={index} 
                      className="space-y-2"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 + index * 0.1, duration: 0.4 }}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-dark-primary">{item.subject}</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-dark-secondary">{item.attended}/{item.total}</span>
                          <Badge className={`${item.percentage >= 85 ? 'bg-green-500/20 text-green-400 border-green-500/30' : item.percentage >= 75 ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' : 'bg-red-500/20 text-red-400 border-red-500/30'}`}>
                            {item.percentage}%
                          </Badge>
                        </div>
                      </div>
                      <Progress 
                        value={item.percentage} 
                        className="h-2 bg-dark-bg"
                      />
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Monthly Trend */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            whileHover={{ scale: 1.01 }}
          >
            <Card 
              className="bg-dark-card border-dark-color cursor-pointer transition-all hover:border-blue-500/50"
              onClick={() => setMonthlyTrendOpen(true)}
            >
              <CardHeader>
                <CardTitle className="text-dark-primary">Monthly Attendance Trend</CardTitle>
                <CardDescription className="text-dark-secondary">Your attendance pattern over months (Click for details)</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={monthlyTrend}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="month" stroke="#94A3B8" />
                      <YAxis stroke="#94A3B8" domain={[70, 100]} />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#1E293B', 
                          border: '1px solid #374151',
                          borderRadius: '8px' 
                        }}
                        labelStyle={{ color: '#FFFFFF' }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="attendance" 
                        stroke="#3B82F6" 
                        strokeWidth={3}
                        dot={{ fill: '#3B82F6', strokeWidth: 2, r: 6 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Recent Attendance Records */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          <Card className="bg-dark-card border-dark-color">
            <CardHeader>
              <CardTitle className="text-dark-primary">Recent Attendance Records</CardTitle>
              <CardDescription className="text-dark-secondary">Your latest class attendance history</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentAttendance.map((record, index) => (
                  <motion.div 
                    key={index} 
                    className="flex items-center justify-between p-4 bg-dark-hover rounded-lg"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 + index * 0.05, duration: 0.4 }}
                    whileHover={{ scale: 1.01, x: 5 }}
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`w-3 h-3 rounded-full ${record.status === 'Present' ? 'bg-green-400' : 'bg-red-400'}`}></div>
                      <div>
                        <p className="font-medium text-dark-primary">{record.subject}</p>
                        <p className="text-sm text-dark-secondary">{formatDate(record.date)} • {record.time}</p>
                      </div>
                    </div>
                    <Badge className={`${record.status === 'Present' ? 'bg-green-500/20 text-green-400 border-green-500/30' : 'bg-red-500/20 text-red-400 border-red-500/30'}`}>
                      {record.status === 'Present' ? (
                        <CheckCircle className="w-4 h-4 mr-1" />
                      ) : (
                        <XCircle className="w-4 h-4 mr-1" />
                      )}
                      {record.status}
                    </Badge>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Attendance Goals */}
        {overallAttendance < 85 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.9, duration: 0.5 }}
          >
            <Card className="bg-gradient-to-r from-orange-500/10 to-red-500/10 border-orange-500/30">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                    <TrendingUp className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-dark-primary">Attendance Alert</h3>
                    <p className="text-dark-secondary mt-1">
                      Your attendance is {overallAttendance}%. You need {85 - overallAttendance}% more to reach the minimum requirement of 85%.
                    </p>
                  </div>
                  <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30 px-4 py-2">
                    Action Required
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </main>

      {/* Dialogs for Clickable Metrics */}
      {/* Overall Attendance Dialog */}
      <Dialog open={overallAttendanceOpen} onOpenChange={setOverallAttendanceOpen}>
        <DialogContent className="bg-dark-card border-dark-color text-dark-primary max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center text-2xl">
              <BarChart3 className="w-6 h-6 mr-2 text-green-400" />
              Overall Attendance Details
            </DialogTitle>
            <DialogDescription className="text-dark-secondary">
              Comprehensive breakdown of your attendance across all subjects
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6 mt-4">
            <div className="bg-dark-hover p-6 rounded-lg">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-4xl font-bold text-green-400">{overallAttendance}%</h3>
                  <p className="text-dark-secondary mt-1">Overall Attendance Rate</p>
                </div>
                <div className="w-16 h-16 rounded-xl bg-green-500/20 flex items-center justify-center">
                  <BarChart3 className="w-8 h-8 text-green-400" />
                </div>
              </div>
              <Progress value={overallAttendance} className="h-3" />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="bg-dark-hover p-4 rounded-lg">
                <p className="text-sm text-dark-secondary mb-1">Total Classes</p>
                <p className="text-2xl font-bold text-dark-primary">{totalClasses}</p>
                <p className="text-xs text-dark-secondary mt-1">Scheduled</p>
              </div>
              <div className="bg-dark-hover p-4 rounded-lg">
                <p className="text-sm text-dark-secondary mb-1">Attended</p>
                <p className="text-2xl font-bold text-green-400">{attendedClasses}</p>
                <p className="text-xs text-dark-secondary mt-1">Present</p>
              </div>
              <div className="bg-dark-hover p-4 rounded-lg">
                <p className="text-sm text-dark-secondary mb-1">Missed</p>
                <p className="text-2xl font-bold text-red-400">{totalClasses - attendedClasses}</p>
                <p className="text-xs text-dark-secondary mt-1">Absent</p>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold text-dark-primary">Subject-wise Breakdown</h4>
              {attendanceData.map((item, index) => (
                <div key={index} className="bg-dark-hover p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-dark-primary">{item.subject}</span>
                    <Badge className={`${item.percentage >= 85 ? 'bg-green-500/20 text-green-400 border-green-500/30' : item.percentage >= 75 ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' : 'bg-red-500/20 text-red-400 border-red-500/30'}`}>
                      {item.percentage}%
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm text-dark-secondary mb-2">
                    <span>{item.attended} / {item.total} classes</span>
                    <span>{item.total - item.attended} missed</span>
                  </div>
                  <Progress value={item.percentage} className="h-1.5" />
                </div>
              ))}
            </div>

            <div className="bg-dark-hover p-4 rounded-lg">
              <h4 className="font-semibold mb-2 text-dark-primary">Attendance Insights</h4>
              <ul className="space-y-2 text-sm text-dark-secondary">
                <li className="flex items-start">
                  <span className={`${overallAttendance >= 85 ? 'text-green-400' : 'text-yellow-400'} mr-2`}>
                    {overallAttendance >= 85 ? '✓' : '⚠'}
                  </span>
                  <span>Your attendance is {overallAttendance >= 85 ? 'above' : 'below'} the minimum requirement of 85%</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2">•</span>
                  <span>Best attendance: {attendanceData.sort((a, b) => b.percentage - a.percentage)[0]?.subject} ({attendanceData.sort((a, b) => b.percentage - a.percentage)[0]?.percentage}%)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-400 mr-2">•</span>
                  <span>Needs attention: {attendanceData.sort((a, b) => a.percentage - b.percentage)[0]?.subject} ({attendanceData.sort((a, b) => a.percentage - b.percentage)[0]?.percentage}%)</span>
                </li>
              </ul>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Classes Attended Dialog */}
      <Dialog open={classesAttendedOpen} onOpenChange={setClassesAttendedOpen}>
        <DialogContent className="bg-dark-card border-dark-color text-dark-primary max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center text-2xl">
              <CheckCircle className="w-6 h-6 mr-2 text-blue-400" />
              Classes Attended Details
            </DialogTitle>
            <DialogDescription className="text-dark-secondary">
              Complete overview of your class participation
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6 mt-4">
            <div className="bg-dark-hover p-6 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h3 className="text-4xl font-bold text-blue-400">{attendedClasses}/{totalClasses}</h3>
                  <p className="text-dark-secondary mt-1">Classes Attended</p>
                </div>
                <div className="w-16 h-16 rounded-xl bg-blue-500/20 flex items-center justify-center">
                  <CheckCircle className="w-8 h-8 text-blue-400" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-dark-hover p-4 rounded-lg">
                <p className="text-sm text-dark-secondary mb-1">This Week</p>
                <p className="text-2xl font-bold text-dark-primary">{Math.floor(attendedClasses / 5)}</p>
                <p className="text-xs text-dark-secondary mt-1">Classes attended</p>
              </div>
              <div className="bg-dark-hover p-4 rounded-lg">
                <p className="text-sm text-dark-secondary mb-1">This Month</p>
                <p className="text-2xl font-bold text-dark-primary">{Math.floor(attendedClasses / 1.5)}</p>
                <p className="text-xs text-dark-secondary mt-1">Classes attended</p>
              </div>
              <div className="bg-dark-hover p-4 rounded-lg">
                <p className="text-sm text-dark-secondary mb-1">Consecutive</p>
                <p className="text-2xl font-bold text-green-400">{Math.floor(attendedClasses / 10)}</p>
                <p className="text-xs text-dark-secondary mt-1">Days present</p>
              </div>
              <div className="bg-dark-hover p-4 rounded-lg">
                <p className="text-sm text-dark-secondary mb-1">Perfect Weeks</p>
                <p className="text-2xl font-bold text-purple-400">{Math.floor(attendedClasses / 20)}</p>
                <p className="text-xs text-dark-secondary mt-1">100% attendance</p>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold text-dark-primary">Recent Attendance</h4>
              {recentAttendance.slice(0, 5).map((record, index) => (
                <div key={index} className="bg-dark-hover p-3 rounded-lg flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-2 h-2 rounded-full ${record.status === 'Present' ? 'bg-green-400' : 'bg-red-400'}`}></div>
                    <div>
                      <p className="text-sm font-medium text-dark-primary">{record.subject}</p>
                      <p className="text-xs text-dark-secondary">{formatDate(record.date)} • {record.time}</p>
                    </div>
                  </div>
                  <Badge className={`${record.status === 'Present' ? 'bg-green-500/20 text-green-400 border-green-500/30' : 'bg-red-500/20 text-red-400 border-red-500/30'}`}>
                    {record.status}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* This Month Dialog */}
      <Dialog open={thisMonthOpen} onOpenChange={setThisMonthOpen}>
        <DialogContent className="bg-dark-card border-dark-color text-dark-primary max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center text-2xl">
              <Calendar className="w-6 h-6 mr-2 text-purple-400" />
              This Month's Attendance
            </DialogTitle>
            <DialogDescription className="text-dark-secondary">
              Current month attendance analysis and trends
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6 mt-4">
            <div className="bg-dark-hover p-6 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h3 className="text-4xl font-bold text-purple-400">{monthlyTrend[monthlyTrend.length - 1]?.attendance}%</h3>
                  <p className="text-dark-secondary mt-1">{monthlyTrend[monthlyTrend.length - 1]?.month} Attendance</p>
                </div>
                <div className="w-16 h-16 rounded-xl bg-purple-500/20 flex items-center justify-center">
                  <Calendar className="w-8 h-8 text-purple-400" />
                </div>
              </div>
              <Progress value={monthlyTrend[monthlyTrend.length - 1]?.attendance} className="h-3" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-dark-hover p-4 rounded-lg">
                <p className="text-sm text-dark-secondary mb-1">Monthly Average</p>
                <p className="text-2xl font-bold text-dark-primary">
                  {Math.round(monthlyTrend.reduce((sum, m) => sum + m.attendance, 0) / monthlyTrend.length)}%
                </p>
                <p className="text-xs text-dark-secondary mt-1">Across all months</p>
              </div>
              <div className="bg-dark-hover p-4 rounded-lg">
                <p className="text-sm text-dark-secondary mb-1">Best Month</p>
                <p className="text-2xl font-bold text-green-400">
                  {Math.max(...monthlyTrend.map(m => m.attendance))}%
                </p>
                <p className="text-xs text-dark-secondary mt-1">{monthlyTrend.sort((a, b) => b.attendance - a.attendance)[0]?.month}</p>
              </div>
              <div className="bg-dark-hover p-4 rounded-lg">
                <p className="text-sm text-dark-secondary mb-1">Trend</p>
                <p className="text-2xl font-bold text-blue-400">
                  {monthlyTrend[monthlyTrend.length - 1]?.attendance > monthlyTrend[monthlyTrend.length - 2]?.attendance ? '↑' : '↓'}
                  {Math.abs(monthlyTrend[monthlyTrend.length - 1]?.attendance - monthlyTrend[monthlyTrend.length - 2]?.attendance).toFixed(1)}%
                </p>
                <p className="text-xs text-dark-secondary mt-1">From last month</p>
              </div>
              <div className="bg-dark-hover p-4 rounded-lg">
                <p className="text-sm text-dark-secondary mb-1">Classes This Month</p>
                <p className="text-2xl font-bold text-orange-400">{Math.floor(totalClasses / 5)}</p>
                <p className="text-xs text-dark-secondary mt-1">Total conducted</p>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold text-dark-primary">Monthly Comparison</h4>
              {monthlyTrend.map((month, index) => (
                <div key={index} className="bg-dark-hover p-3 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-dark-primary">{month.month}</span>
                    <span className="text-sm font-semibold text-purple-400">{month.attendance}%</span>
                  </div>
                  <Progress value={month.attendance} className="h-1.5" />
                </div>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Attendance Status Dialog */}
      <Dialog open={attendanceStatusOpen} onOpenChange={setAttendanceStatusOpen}>
        <DialogContent className="bg-dark-card border-dark-color text-dark-primary max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center text-2xl">
              {overallAttendance >= 85 ? 
                <CheckCircle className="w-6 h-6 mr-2 text-green-400" /> :
                <XCircle className="w-6 h-6 mr-2 text-orange-400" />
              }
              Attendance Status
            </DialogTitle>
            <DialogDescription className="text-dark-secondary">
              Current attendance status and recommendations
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6 mt-4">
            <div className={`bg-dark-hover p-6 rounded-lg border ${overallAttendance >= 85 ? 'border-green-500/30' : 'border-orange-500/30'}`}>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-4xl font-bold text-dark-primary">
                    {overallAttendance >= 85 ? "Good" : overallAttendance >= 75 ? "Fair" : "Low"}
                  </h3>
                  <p className="text-dark-secondary mt-1">Current Status</p>
                </div>
                <div className={`w-16 h-16 rounded-xl flex items-center justify-center ${overallAttendance >= 85 ? 'bg-green-500/20' : 'bg-orange-500/20'}`}>
                  {overallAttendance >= 85 ? 
                    <CheckCircle className="w-8 h-8 text-green-400" /> :
                    <TrendingUp className="w-8 h-8 text-orange-400" />
                  }
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-dark-hover p-4 rounded-lg">
                <p className="text-sm text-dark-secondary mb-1">Requirement</p>
                <p className="text-2xl font-bold text-dark-primary">85%</p>
                <p className="text-xs text-dark-secondary mt-1">Minimum needed</p>
              </div>
              <div className="bg-dark-hover p-4 rounded-lg">
                <p className="text-sm text-dark-secondary mb-1">Your Score</p>
                <p className="text-2xl font-bold text-blue-400">{overallAttendance}%</p>
                <p className="text-xs text-dark-secondary mt-1">
                  {overallAttendance >= 85 ? `+${overallAttendance - 85}% above` : `${85 - overallAttendance}% below`}
                </p>
              </div>
            </div>

            {overallAttendance < 85 && (
              <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 p-4 rounded-lg border border-orange-500/30">
                <h4 className="font-semibold text-dark-primary mb-3">Action Required</h4>
                <p className="text-sm text-dark-secondary mb-3">
                  To reach 85% attendance, you need to attend {Math.ceil((0.85 * totalClasses - attendedClasses) / (1 - 0.85))} consecutive classes without any absences.
                </p>
                <div className="bg-dark-hover p-3 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-dark-secondary">Classes needed to attend:</span>
                    <span className="font-bold text-orange-400">{Math.ceil((0.85 * totalClasses - attendedClasses) / (1 - 0.85))}</span>
                  </div>
                  <Progress value={50} className="h-2" />
                </div>
              </div>
            )}

            <div className="bg-dark-hover p-4 rounded-lg">
              <h4 className="font-semibold mb-3 text-dark-primary">Status Insights</h4>
              <ul className="space-y-2 text-sm text-dark-secondary">
                {overallAttendance >= 85 ? (
                  <>
                    <li className="flex items-start">
                      <span className="text-green-400 mr-2">✓</span>
                      <span>Excellent! You've met the minimum attendance requirement</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-400 mr-2">•</span>
                      <span>You can miss up to {Math.floor((overallAttendance - 85) * totalClasses / 100)} more classes</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-purple-400 mr-2">★</span>
                      <span>Keep maintaining this consistent attendance pattern</span>
                    </li>
                  </>
                ) : (
                  <>
                    <li className="flex items-start">
                      <span className="text-orange-400 mr-2">⚠</span>
                      <span>Your attendance is below the required 85% threshold</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-400 mr-2">!</span>
                      <span>You need to improve attendance in {attendanceData.filter(d => d.percentage < 85).length} subjects</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-400 mr-2">•</span>
                      <span>Focus on maintaining 100% attendance for the next few weeks</span>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Monthly Trend Dialog */}
      <Dialog open={monthlyTrendOpen} onOpenChange={setMonthlyTrendOpen}>
        <DialogContent className="bg-dark-card border-dark-color text-dark-primary max-w-3xl">
          <DialogHeader>
            <DialogTitle className="flex items-center text-2xl">
              <TrendingUp className="w-6 h-6 mr-2 text-blue-400" />
              Monthly Attendance Trend Analysis
            </DialogTitle>
            <DialogDescription className="text-dark-secondary">
              Detailed analysis of your attendance pattern over time
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6 mt-4">
            <div className="bg-dark-hover p-4 rounded-lg">
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={monthlyTrend}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="month" stroke="#94A3B8" />
                  <YAxis stroke="#94A3B8" domain={[70, 100]} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1E293B', 
                      border: '1px solid #374151',
                      borderRadius: '8px' 
                    }}
                    labelStyle={{ color: '#FFFFFF' }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="attendance" 
                    stroke="#3B82F6" 
                    strokeWidth={3}
                    dot={{ fill: '#3B82F6', strokeWidth: 2, r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="bg-dark-hover p-4 rounded-lg text-center">
                <p className="text-sm text-dark-secondary mb-1">Average</p>
                <p className="text-2xl font-bold text-blue-400">
                  {Math.round(monthlyTrend.reduce((sum, m) => sum + m.attendance, 0) / monthlyTrend.length)}%
                </p>
                <p className="text-xs text-dark-secondary mt-1">Overall</p>
              </div>
              <div className="bg-dark-hover p-4 rounded-lg text-center">
                <p className="text-sm text-dark-secondary mb-1">Highest</p>
                <p className="text-2xl font-bold text-green-400">
                  {Math.max(...monthlyTrend.map(m => m.attendance))}%
                </p>
                <p className="text-xs text-dark-secondary mt-1">{monthlyTrend.sort((a, b) => b.attendance - a.attendance)[0]?.month}</p>
              </div>
              <div className="bg-dark-hover p-4 rounded-lg text-center">
                <p className="text-sm text-dark-secondary mb-1">Lowest</p>
                <p className="text-2xl font-bold text-red-400">
                  {Math.min(...monthlyTrend.map(m => m.attendance))}%
                </p>
                <p className="text-xs text-dark-secondary mt-1">{monthlyTrend.sort((a, b) => a.attendance - b.attendance)[0]?.month}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-dark-hover p-4 rounded-lg">
                <h4 className="font-semibold text-dark-primary mb-3">Month-by-Month</h4>
                <div className="space-y-3">
                  {monthlyTrend.map((month, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 rounded-full bg-blue-400"></div>
                        <span className="text-sm font-medium text-dark-primary">{month.month}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Progress value={month.attendance} className="h-1.5 w-20" />
                        <span className="text-sm font-semibold text-blue-400 w-12">{month.attendance}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-dark-hover p-4 rounded-lg">
                <h4 className="font-semibold text-dark-primary mb-3">Trend Analysis</h4>
                <ul className="space-y-3 text-sm text-dark-secondary">
                  <li className="flex items-start">
                    <Target className="w-4 h-4 mr-2 text-blue-400 mt-0.5" />
                    <span>
                      {monthlyTrend[monthlyTrend.length - 1]?.attendance > monthlyTrend[0]?.attendance 
                        ? `Improved by ${(monthlyTrend[monthlyTrend.length - 1]?.attendance - monthlyTrend[0]?.attendance).toFixed(1)}% since ${monthlyTrend[0]?.month}`
                        : `Decreased by ${(monthlyTrend[0]?.attendance - monthlyTrend[monthlyTrend.length - 1]?.attendance).toFixed(1)}% since ${monthlyTrend[0]?.month}`
                      }
                    </span>
                  </li>
                  <li className="flex items-start">
                    <Award className="w-4 h-4 mr-2 text-green-400 mt-0.5" />
                    <span>
                      Best performance in {monthlyTrend.sort((a, b) => b.attendance - a.attendance)[0]?.month} with {Math.max(...monthlyTrend.map(m => m.attendance))}% attendance
                    </span>
                  </li>
                  <li className="flex items-start">
                    <TrendingUp className="w-4 h-4 mr-2 text-purple-400 mt-0.5" />
                    <span>
                      {monthlyTrend.filter((m, i) => i > 0 && m.attendance > monthlyTrend[i - 1].attendance).length} months showed improvement
                    </span>
                  </li>
                  <li className="flex items-start">
                    <Clock className="w-4 h-4 mr-2 text-orange-400 mt-0.5" />
                    <span>
                      Consistently {monthlyTrend.filter(m => m.attendance >= 85).length >= monthlyTrend.length / 2 ? 'above' : 'meeting'} attendance targets
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 p-4 rounded-lg border border-blue-500/30">
              <h4 className="font-semibold text-dark-primary mb-2">Key Insights</h4>
              <p className="text-sm text-dark-secondary">
                Your attendance trend shows {monthlyTrend[monthlyTrend.length - 1]?.attendance > monthlyTrend[monthlyTrend.length - 2]?.attendance ? 'positive momentum' : 'room for improvement'}. 
                {monthlyTrend.filter(m => m.attendance >= 85).length === monthlyTrend.length 
                  ? ' You\'ve maintained excellent attendance throughout all months!' 
                  : ` Focus on the upcoming months to maintain consistency and reach the ${85 - monthlyTrend[monthlyTrend.length - 1]?.attendance > 0 ? '85% target' : 'higher goals'}.`
                }
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}