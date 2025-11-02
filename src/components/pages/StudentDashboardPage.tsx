import { useState } from "react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Trophy, Target, BookOpen, MessageSquare, Download, TrendingUp, GraduationCap, Award } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";
import { ScrollArea } from "../ui/scroll-area";
import { Progress } from "../ui/progress";

interface StudentDashboardPageProps {
  user: any;
}

// Function to generate personalized student metrics based on CGPA and department
function getPersonalizedMetrics(user: any) {
  const performanceLevel = user.cgpa >= 9.0 ? 'excellent' : user.cgpa >= 8.5 ? 'very_good' : user.cgpa >= 8.0 ? 'good' : 'average';
  
  const baseMetrics = {
    excellent: { completion: 95, engagement: 92, interactions: 2800 },
    very_good: { completion: 90, engagement: 88, interactions: 2400 },
    good: { completion: 85, engagement: 82, interactions: 2000 },
    average: { completion: 78, engagement: 75, interactions: 1600 }
  };
  
  const metrics = baseMetrics[performanceLevel];
  const gradeMapping = user.cgpa >= 9.0 ? 'A+' : user.cgpa >= 8.5 ? 'A' : user.cgpa >= 8.0 ? 'A-' : user.cgpa >= 7.5 ? 'B+' : 'B';
  
  return [
    {
      title: "Course Completion Rate",
      value: `${metrics.completion}%`,
      change: `+${(Math.random() * 10 + 5).toFixed(1)}%`,
      icon: BookOpen,
      iconColor: "text-blue-400",
      isPositive: true
    },
    {
      title: "Engagement Score", 
      value: `${metrics.engagement}%`,
      change: `+${(Math.random() * 15 + 8).toFixed(1)}%`,
      icon: Target,
      iconColor: "text-green-400",
      isPositive: true
    },
    {
      title: "Average Grade",
      value: gradeMapping,
      change: user.cgpa >= 8.5 ? "+0.3" : "+0.2",
      icon: Trophy,
      iconColor: "text-orange-400",
      isPositive: true
    },
    {
      title: "Study Interactions",
      value: metrics.interactions.toLocaleString(),
      change: `+${(Math.random() * 25 + 15).toFixed(1)}%`,
      icon: MessageSquare,
      iconColor: "text-purple-400",
      isPositive: true
    },
  ];
}

// Function to generate department-specific courses for student
function getDepartmentCourses(user: any) {
  const departmentCourses = {
    "Computer Science": [
      { name: "Data Structures & Algorithms", progress: Math.min(95, user.cgpa * 10 + Math.random() * 10), grade: user.cgpa >= 9.0 ? "A+" : user.cgpa >= 8.5 ? "A" : "A-", status: "In Progress", color: "blue" },
      { name: "Database Management Systems", progress: Math.min(100, user.cgpa * 11 + Math.random() * 8), grade: user.cgpa >= 8.8 ? "A+" : user.cgpa >= 8.0 ? "A" : "B+", status: "Completed", color: "green" },
      { name: "Computer Networks", progress: Math.min(90, user.cgpa * 9 + Math.random() * 12), grade: user.cgpa >= 8.5 ? "A" : user.cgpa >= 8.0 ? "B+" : "B", status: "In Progress", color: "orange" },
      { name: "Software Engineering", progress: Math.min(98, user.cgpa * 10.5 + Math.random() * 7), grade: user.cgpa >= 9.0 ? "A+" : user.cgpa >= 8.2 ? "A" : "A-", status: "Completed", color: "purple" },
    ],
    "Electronics": [
      { name: "Digital Signal Processing", progress: Math.min(92, user.cgpa * 10 + Math.random() * 8), grade: user.cgpa >= 9.0 ? "A+" : user.cgpa >= 8.5 ? "A" : "A-", status: "In Progress", color: "blue" },
      { name: "VLSI Design", progress: Math.min(88, user.cgpa * 9.5 + Math.random() * 10), grade: user.cgpa >= 8.8 ? "A+" : user.cgpa >= 8.0 ? "A" : "B+", status: "In Progress", color: "orange" },
      { name: "Communication Systems", progress: Math.min(95, user.cgpa * 11 + Math.random() * 5), grade: user.cgpa >= 9.0 ? "A+" : user.cgpa >= 8.2 ? "A" : "A-", status: "Completed", color: "green" },
      { name: "Microprocessors", progress: Math.min(90, user.cgpa * 10.2 + Math.random() * 8), grade: user.cgpa >= 8.5 ? "A" : user.cgpa >= 8.0 ? "B+" : "B", status: "In Progress", color: "purple" },
    ],
    "Mechanical": [
      { name: "Thermodynamics", progress: Math.min(89, user.cgpa * 10 + Math.random() * 9), grade: user.cgpa >= 9.0 ? "A+" : user.cgpa >= 8.5 ? "A" : "A-", status: "In Progress", color: "blue" },
      { name: "Fluid Mechanics", progress: Math.min(85, user.cgpa * 9.8 + Math.random() * 8), grade: user.cgpa >= 8.8 ? "A+" : user.cgpa >= 8.0 ? "A" : "B+", status: "In Progress", color: "orange" },
      { name: "Machine Design", progress: Math.min(93, user.cgpa * 10.5 + Math.random() * 7), grade: user.cgpa >= 9.0 ? "A+" : user.cgpa >= 8.2 ? "A" : "A-", status: "Completed", color: "green" },
      { name: "Manufacturing Processes", progress: Math.min(87, user.cgpa * 9.5 + Math.random() * 10), grade: user.cgpa >= 8.5 ? "A" : user.cgpa >= 8.0 ? "B+" : "B", status: "In Progress", color: "purple" },
    ],
    "Information Technology": [
      { name: "Web Development", progress: Math.min(96, user.cgpa * 10.8 + Math.random() * 6), grade: user.cgpa >= 9.0 ? "A+" : user.cgpa >= 8.5 ? "A" : "A-", status: "In Progress", color: "blue" },
      { name: "Database Systems", progress: Math.min(94, user.cgpa * 10.5 + Math.random() * 8), grade: user.cgpa >= 8.8 ? "A+" : user.cgpa >= 8.0 ? "A" : "B+", status: "Completed", color: "green" },
      { name: "Cybersecurity", progress: Math.min(88, user.cgpa * 9.8 + Math.random() * 10), grade: user.cgpa >= 8.5 ? "A" : user.cgpa >= 8.0 ? "B+" : "B", status: "In Progress", color: "orange" },
      { name: "Cloud Computing", progress: Math.min(91, user.cgpa * 10.2 + Math.random() * 8), grade: user.cgpa >= 9.0 ? "A+" : user.cgpa >= 8.2 ? "A" : "A-", status: "In Progress", color: "purple" },
    ],
    "Civil": [
      { name: "Structural Engineering", progress: Math.min(86, user.cgpa * 9.8 + Math.random() * 8), grade: user.cgpa >= 9.0 ? "A+" : user.cgpa >= 8.5 ? "A" : "A-", status: "In Progress", color: "blue" },
      { name: "Environmental Engineering", progress: Math.min(82, user.cgpa * 9.5 + Math.random() * 10), grade: user.cgpa >= 8.8 ? "A+" : user.cgpa >= 8.0 ? "A" : "B+", status: "In Progress", color: "orange" },
      { name: "Geotechnical Engineering", progress: Math.min(90, user.cgpa * 10.2 + Math.random() * 8), grade: user.cgpa >= 9.0 ? "A+" : user.cgpa >= 8.2 ? "A" : "A-", status: "Completed", color: "green" },
      { name: "Construction Management", progress: Math.min(84, user.cgpa * 9.6 + Math.random() * 9), grade: user.cgpa >= 8.5 ? "A" : user.cgpa >= 8.0 ? "B+" : "B", status: "In Progress", color: "purple" },
    ]
  };
  
  return departmentCourses[user.department] || [];
}

// Function to generate personalized assignments based on department and semester
function getPersonalizedAssignments(user: any) {
  const departmentAssignments = {
    "Computer Science": [
      { title: `DSA Lab Assignment ${user.semester}`, subject: "Data Structures", dueDate: user.cgpa >= 8.5 ? "2 days" : "Tomorrow", priority: "High" },
      { title: "Database Design Project", subject: "Database Systems", dueDate: "5 days", priority: "Medium" },
      { title: "Network Protocol Analysis", subject: "Computer Networks", dueDate: "1 week", priority: user.cgpa >= 9.0 ? "Low" : "Medium" },
    ],
    "Electronics": [
      { title: `DSP Filter Design Lab ${user.semester}`, subject: "Digital Signal Processing", dueDate: user.cgpa >= 8.5 ? "3 days" : "Tomorrow", priority: "High" },
      { title: "VLSI Circuit Project", subject: "VLSI Design", dueDate: "4 days", priority: "Medium" },
      { title: "Communication System Report", subject: "Communication Systems", dueDate: "1 week", priority: user.cgpa >= 9.0 ? "Low" : "Medium" },
    ],
    "Mechanical": [
      { title: `Thermal Analysis Assignment ${user.semester}`, subject: "Thermodynamics", dueDate: user.cgpa >= 8.5 ? "2 days" : "Tomorrow", priority: "High" },
      { title: "Fluid Flow Simulation", subject: "Fluid Mechanics", dueDate: "6 days", priority: "Medium" },
      { title: "Machine Component Design", subject: "Machine Design", dueDate: "1 week", priority: user.cgpa >= 9.0 ? "Low" : "Medium" },
    ],
    "Information Technology": [
      { title: `Web Application Project ${user.semester}`, subject: "Web Development", dueDate: user.cgpa >= 8.5 ? "3 days" : "Tomorrow", priority: "High" },
      { title: "Security Audit Report", subject: "Cybersecurity", dueDate: "4 days", priority: "Medium" },
      { title: "Cloud Migration Plan", subject: "Cloud Computing", dueDate: "1 week", priority: user.cgpa >= 9.0 ? "Low" : "Medium" },
    ],
    "Civil": [
      { title: `Structural Design Assignment ${user.semester}`, subject: "Structural Engineering", dueDate: user.cgpa >= 8.5 ? "2 days" : "Tomorrow", priority: "High" },
      { title: "Environmental Impact Study", subject: "Environmental Engineering", dueDate: "5 days", priority: "Medium" },
      { title: "Site Investigation Report", subject: "Geotechnical Engineering", dueDate: "1 week", priority: user.cgpa >= 9.0 ? "Low" : "Medium" },
    ]
  };
  
  return departmentAssignments[user.department] || [];
}

export function StudentDashboardPage({ user }: StudentDashboardPageProps) {
  const [selectedDialog, setSelectedDialog] = useState<string | null>(null);
  
  // Get personalized data for this student
  const studentMetrics = getPersonalizedMetrics(user);
  const recentCourses = getDepartmentCourses(user);
  const upcomingAssignments = getPersonalizedAssignments(user);

  return (
    <>
      {/* Header */}
      <header className="bg-dark-bg border-b border-dark-color px-8 py-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-dark-primary">Welcome back, {user.name.split(' ')[0]}!</h1>
            <p className="text-dark-secondary mt-2">Here's your learning progress overview</p>
          </div>
          <div className="flex items-center space-x-4">
            <Badge className="bg-green-500/20 text-green-400 border-green-500/30 px-4 py-2">
              <GraduationCap className="w-4 h-4 mr-2" />
              CGPA: {user.cgpa}/10.0
            </Badge>
            <Button className="dark-button-primary">
              <Download className="w-4 h-4 mr-2" />
              Download Transcript
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-auto p-8 space-y-8">
        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {studentMetrics.map((metric, index) => {
            const Icon = metric.icon;
            const dialogKey = metric.title.toLowerCase().replace(/\s+/g, '-');
            return (
              <Card 
                key={index} 
                className="bg-dark-card border-dark-color cursor-pointer hover-lift stagger-animation"
                onClick={() => setSelectedDialog(dialogKey)}
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-2">
                      <p className="text-sm text-dark-secondary">{metric.title}</p>
                      <p className="text-3xl font-bold text-dark-primary">{metric.value}</p>
                      <div className="flex items-center space-x-2">
                        <TrendingUp className={`w-4 h-4 ${metric.isPositive ? 'text-dark-positive' : 'text-dark-negative'}`} />
                        <span className={`text-sm font-medium ${metric.isPositive ? 'text-dark-positive' : 'text-dark-negative'}`}>
                          {metric.change}
                        </span>
                        <span className="text-sm text-dark-secondary">vs last month</span>
                      </div>
                    </div>
                    <div className={`w-12 h-12 rounded-xl bg-dark-hover flex items-center justify-center`}>
                      <Icon className={`w-6 h-6 ${metric.iconColor}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Courses */}
          <Card className="bg-dark-card border-dark-color animate-slide-in-left">
            <CardHeader>
              <CardTitle className="text-dark-primary">Current Courses</CardTitle>
              <CardDescription className="text-dark-secondary">Your enrolled courses this semester</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentCourses.map((course, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-dark-hover rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium text-dark-primary">{course.name}</h4>
                    <div className="flex items-center space-x-4 mt-2">
                      <div className="flex items-center space-x-2">
                        <div className="w-20 bg-dark-bg rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full bg-${course.color}-500`}
                            style={{ width: `${course.progress}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-dark-secondary">{course.progress}%</span>
                      </div>
                      <Badge className={`${course.status === 'Completed' ? 'bg-green-500/20 text-green-400 border-green-500/30' : 'bg-blue-500/20 text-blue-400 border-blue-500/30'}`}>
                        {course.status}
                      </Badge>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-1">
                      <Award className="w-4 h-4 text-yellow-400" />
                      <span className="font-bold text-dark-primary">{course.grade}</span>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Upcoming Assignments */}
          <Card className="bg-dark-card border-dark-color animate-slide-in-right">
            <CardHeader>
              <CardTitle className="text-dark-primary">Upcoming Assignments</CardTitle>
              <CardDescription className="text-dark-secondary">Assignments and deadlines to track</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {upcomingAssignments.map((assignment, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-dark-hover rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium text-dark-primary">{assignment.title}</h4>
                    <p className="text-sm text-dark-secondary mt-1">{assignment.subject}</p>
                  </div>
                  <div className="text-right space-y-1">
                    <p className="text-sm text-dark-primary">Due in {assignment.dueDate}</p>
                    <Badge 
                      className={`${
                        assignment.priority === 'High' 
                          ? 'bg-red-500/20 text-red-400 border-red-500/30'
                          : assignment.priority === 'Medium'
                          ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
                          : 'bg-blue-500/20 text-blue-400 border-blue-500/30'
                      }`}
                    >
                      {assignment.priority}
                    </Badge>
                  </div>
                </div>
              ))}
              <Button 
                className="w-full dark-button-secondary mt-4"
                onClick={() => setSelectedDialog('all-assignments')}
              >
                View All Assignments
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* CGPA Achievement */}
        {user.cgpa >= 8.0 && (
          <Card className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border-green-500/30">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center">
                  <Trophy className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-dark-primary">Excellent Performance!</h3>
                  <p className="text-dark-secondary mt-1">
                    Congratulations! Your CGPA of {user.cgpa}/10.0 is above 8.0. Keep up the great work!
                  </p>
                </div>
                <Badge className="bg-green-500/20 text-green-400 border-green-500/30 px-4 py-2">
                  Top Performer
                </Badge>
              </div>
            </CardContent>
          </Card>
        )}
      </main>

      {/* Dialogs for metric details */}
      <Dialog open={selectedDialog === 'course-completion-rate'} onOpenChange={(open) => !open && setSelectedDialog(null)}>
        <DialogContent className="bg-dark-card border-dark-color max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-dark-primary">Course Completion Rate</DialogTitle>
            <DialogDescription className="text-dark-secondary">
              Detailed breakdown of your course completion progress
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            {recentCourses.map((course, index) => (
              <div key={index} className="p-4 bg-dark-hover rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-dark-primary">{course.name}</h4>
                  <Badge className={course.status === 'Completed' ? 'bg-green-500/20 text-green-400' : 'bg-blue-500/20 text-blue-400'}>
                    {course.status}
                  </Badge>
                </div>
                <Progress value={course.progress} className="h-2 mb-2" />
                <div className="flex justify-between text-sm text-dark-secondary">
                  <span>{course.progress}% Complete</span>
                  <span>Grade: {course.grade}</span>
                </div>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={selectedDialog === 'engagement-score'} onOpenChange={(open) => !open && setSelectedDialog(null)}>
        <DialogContent className="bg-dark-card border-dark-color max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-dark-primary">Engagement Score</DialogTitle>
            <DialogDescription className="text-dark-secondary">
              Your learning activity and engagement metrics
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6 mt-4">
            <div className="p-6 bg-dark-hover rounded-lg text-center">
              <div className="text-5xl font-bold text-dark-primary">{studentMetrics[1].value}</div>
              <div className="text-sm text-dark-secondary mt-2">Overall Engagement</div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="p-4 bg-dark-hover rounded-lg text-center">
                <div className="text-2xl font-bold text-blue-400">92%</div>
                <div className="text-xs text-dark-secondary mt-1">Class Participation</div>
              </div>
              <div className="p-4 bg-dark-hover rounded-lg text-center">
                <div className="text-2xl font-bold text-green-400">88%</div>
                <div className="text-xs text-dark-secondary mt-1">Assignment Submission</div>
              </div>
              <div className="p-4 bg-dark-hover rounded-lg text-center">
                <div className="text-2xl font-bold text-purple-400">85%</div>
                <div className="text-xs text-dark-secondary mt-1">Resource Usage</div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={selectedDialog === 'average-grade'} onOpenChange={(open) => !open && setSelectedDialog(null)}>
        <DialogContent className="bg-dark-card border-dark-color max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-dark-primary">Average Grade</DialogTitle>
            <DialogDescription className="text-dark-secondary">
              Your grades across all enrolled courses
            </DialogDescription>
          </DialogHeader>
          <ScrollArea className="h-[400px] pr-4">
            <div className="space-y-3 mt-4">
              {recentCourses.map((course, index) => (
                <div key={index} className="p-4 bg-dark-hover rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-dark-primary">{course.name}</h4>
                      <p className="text-sm text-dark-secondary mt-1">Progress: {course.progress}%</p>
                    </div>
                    <div className="text-right">
                      <Badge className="bg-yellow-500/20 text-yellow-400 text-lg px-3 py-1">
                        {course.grade}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>

      <Dialog open={selectedDialog === 'study-interactions'} onOpenChange={(open) => !open && setSelectedDialog(null)}>
        <DialogContent className="bg-dark-card border-dark-color max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-dark-primary">Study Interactions</DialogTitle>
            <DialogDescription className="text-dark-secondary">
              Your study activities and platform interactions
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div className="p-6 bg-dark-hover rounded-lg text-center">
              <div className="text-5xl font-bold text-dark-primary">{studentMetrics[3].value}</div>
              <div className="text-sm text-dark-secondary mt-2">Total Interactions This Month</div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-dark-hover rounded-lg">
                <div className="text-xl font-bold text-blue-400">1,250</div>
                <div className="text-xs text-dark-secondary mt-1">Course Views</div>
              </div>
              <div className="p-4 bg-dark-hover rounded-lg">
                <div className="text-xl font-bold text-green-400">450</div>
                <div className="text-xs text-dark-secondary mt-1">Assignments Submitted</div>
              </div>
              <div className="p-4 bg-dark-hover rounded-lg">
                <div className="text-xl font-bold text-purple-400">680</div>
                <div className="text-xs text-dark-secondary mt-1">Forum Posts</div>
              </div>
              <div className="p-4 bg-dark-hover rounded-lg">
                <div className="text-xl font-bold text-orange-400">420</div>
                <div className="text-xs text-dark-secondary mt-1">Resource Downloads</div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* All Assignments Dialog */}
      <Dialog open={selectedDialog === 'all-assignments'} onOpenChange={(open) => !open && setSelectedDialog(null)}>
        <DialogContent className="bg-dark-card border-dark-color max-w-3xl max-h-[80vh]">
          <DialogHeader>
            <DialogTitle className="text-dark-primary">All Upcoming Assignments</DialogTitle>
            <DialogDescription className="text-dark-secondary">
              Complete list of your assignments with deadlines
            </DialogDescription>
          </DialogHeader>
          <ScrollArea className="h-[500px] pr-4">
            <div className="space-y-3">
              {upcomingAssignments.map((assignment, index) => (
                <div key={index} className="p-4 bg-dark-hover rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h4 className="font-semibold text-dark-primary">{assignment.title}</h4>
                      <p className="text-sm text-dark-secondary mt-1">{assignment.subject}</p>
                      <p className="text-xs text-dark-secondary mt-1">Due in {assignment.dueDate}</p>
                    </div>
                    <Badge className={
                      assignment.priority === 'High' ? 'bg-red-500/20 text-red-400' :
                      assignment.priority === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-blue-500/20 text-blue-400'
                    }>
                      {assignment.priority}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </>
  );
}