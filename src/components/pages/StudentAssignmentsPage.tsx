import { useState } from "react";
import { Calendar, Clock, FileText, CheckCircle, AlertCircle, Plus } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

interface StudentAssignmentsPageProps {
  user: any;
}

// Function to generate personalized assignments based on student data
function getPersonalizedAssignments(user: any) {
  const rollNoSeed = parseInt(user.rollNo.slice(-3)); // Use last 3 digits as seed
  const baseDate = new Date();
  
  const departmentAssignments = {
    "Computer Science": [
      {
        id: rollNoSeed + 1,
        title: `Advanced DSA Lab Assignment ${user.semester}`,
        subject: "Data Structures & Algorithms",
        dueDate: new Date(baseDate.getTime() + (2 + rollNoSeed % 3) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        dueTime: "11:59 PM",
        priority: user.cgpa >= 8.5 ? "Medium" : "High",
        status: rollNoSeed % 3 === 0 ? "Completed" : rollNoSeed % 3 === 1 ? "In Progress" : "Pending",
        description: "Implement advanced tree data structures with optimization",
        points: 50,
        submissions: Math.floor(rollNoSeed % 30 + 15),
        totalStudents: 45
      },
      {
        id: rollNoSeed + 2,
        title: `Database Design Project ${user.semester}.${rollNoSeed % 5 + 1}`,
        subject: "Database Management Systems",
        dueDate: new Date(baseDate.getTime() + (5 + rollNoSeed % 4) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        dueTime: "5:00 PM",
        priority: "Medium",
        status: rollNoSeed % 4 === 0 ? "Completed" : "Pending",
        description: "Design normalized database schema for e-commerce platform",
        points: 40,
        submissions: Math.floor(rollNoSeed % 25 + 10),
        totalStudents: 42
      },
      {
        id: rollNoSeed + 3,
        title: `Network Security Analysis - Student ${rollNoSeed}`,
        subject: "Computer Networks",
        dueDate: new Date(baseDate.getTime() + (8 + rollNoSeed % 5) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        dueTime: "2:00 PM",
        priority: user.cgpa >= 9.0 ? "Low" : "Medium",
        status: "Not Started",
        description: "Analyze network vulnerabilities and propose solutions",
        points: 35,
        submissions: Math.floor(rollNoSeed % 20 + 5),
        totalStudents: 38
      }
    ],
    "Electronics": [
      {
        id: rollNoSeed + 1,
        title: `DSP Filter Design Lab ${user.semester}`,
        subject: "Digital Signal Processing",
        dueDate: new Date(baseDate.getTime() + (3 + rollNoSeed % 3) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        dueTime: "11:59 PM",
        priority: user.cgpa >= 8.5 ? "Medium" : "High",
        status: rollNoSeed % 3 === 0 ? "Completed" : "In Progress",
        description: "Design and implement digital filters using MATLAB",
        points: 45,
        submissions: Math.floor(rollNoSeed % 28 + 12),
        totalStudents: 40
      },
      {
        id: rollNoSeed + 2,
        title: `VLSI Circuit Project ${rollNoSeed}`,
        subject: "VLSI Design",
        dueDate: new Date(baseDate.getTime() + (6 + rollNoSeed % 4) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        dueTime: "4:30 PM",
        priority: "Medium",
        status: rollNoSeed % 4 === 0 ? "Completed" : "Pending",
        description: "Design CMOS logic circuits with optimization",
        points: 50,
        submissions: Math.floor(rollNoSeed % 22 + 8),
        totalStudents: 35
      },
      {
        id: rollNoSeed + 3,
        title: `Communication System Analysis - ${user.name.split(' ')[0]}`,
        subject: "Communication Systems",
        dueDate: new Date(baseDate.getTime() + (9 + rollNoSeed % 5) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        dueTime: "6:00 PM",
        priority: "Low",
        status: "Not Started",
        description: "Analyze modulation techniques and their applications",
        points: 40,
        submissions: Math.floor(rollNoSeed % 18 + 6),
        totalStudents: 33
      }
    ],
    "Mechanical": [
      {
        id: rollNoSeed + 1,
        title: `Thermal Analysis Assignment ${user.semester}`,
        subject: "Thermodynamics",
        dueDate: new Date(baseDate.getTime() + (2 + rollNoSeed % 3) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        dueTime: "11:59 PM",
        priority: user.cgpa >= 8.5 ? "Medium" : "High",
        status: rollNoSeed % 3 === 0 ? "In Progress" : "Pending",
        description: "Perform thermal analysis of heat exchangers",
        points: 45,
        submissions: Math.floor(rollNoSeed % 26 + 14),
        totalStudents: 42
      },
      {
        id: rollNoSeed + 2,
        title: `Fluid Mechanics Simulation ${rollNoSeed}`,
        subject: "Fluid Mechanics",
        dueDate: new Date(baseDate.getTime() + (7 + rollNoSeed % 4) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        dueTime: "3:30 PM",
        priority: "Medium",
        status: rollNoSeed % 4 === 0 ? "Completed" : "Pending",
        description: "CFD simulation of fluid flow over objects",
        points: 50,
        submissions: Math.floor(rollNoSeed % 24 + 10),
        totalStudents: 38
      },
      {
        id: rollNoSeed + 3,
        title: `Machine Design Project - ${user.name.split(' ')[1]}`,
        subject: "Machine Design",
        dueDate: new Date(baseDate.getTime() + (10 + rollNoSeed % 5) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        dueTime: "5:00 PM",
        priority: "Low",
        status: "Not Started",
        description: "Design mechanical components with stress analysis",
        points: 55,
        submissions: Math.floor(rollNoSeed % 20 + 7),
        totalStudents: 36
      }
    ],
    "Information Technology": [
      {
        id: rollNoSeed + 1,
        title: `Web Application Project ${user.semester}`,
        subject: "Web Development",
        dueDate: new Date(baseDate.getTime() + (3 + rollNoSeed % 3) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        dueTime: "11:59 PM",
        priority: user.cgpa >= 8.5 ? "Medium" : "High",
        status: rollNoSeed % 3 === 0 ? "In Progress" : "Pending",
        description: "Build full-stack web application with modern frameworks",
        points: 60,
        submissions: Math.floor(rollNoSeed % 32 + 18),
        totalStudents: 50
      },
      {
        id: rollNoSeed + 2,
        title: `Cybersecurity Audit Report ${rollNoSeed}`,
        subject: "Cybersecurity",
        dueDate: new Date(baseDate.getTime() + (5 + rollNoSeed % 4) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        dueTime: "6:00 PM",
        priority: "Medium",
        status: rollNoSeed % 4 === 0 ? "Completed" : "Pending",
        description: "Conduct security assessment of web applications",
        points: 45,
        submissions: Math.floor(rollNoSeed % 27 + 12),
        totalStudents: 44
      },
      {
        id: rollNoSeed + 3,
        title: `Cloud Migration Strategy - ${user.name.split(' ')[0]}`,
        subject: "Cloud Computing",
        dueDate: new Date(baseDate.getTime() + (8 + rollNoSeed % 5) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        dueTime: "4:00 PM",
        priority: "Low",
        status: "Not Started",
        description: "Design cloud migration plan for enterprise applications",
        points: 50,
        submissions: Math.floor(rollNoSeed % 23 + 9),
        totalStudents: 41
      }
    ],
    "Civil": [
      {
        id: rollNoSeed + 1,
        title: `Structural Design Assignment ${user.semester}`,
        subject: "Structural Engineering",
        dueDate: new Date(baseDate.getTime() + (2 + rollNoSeed % 3) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        dueTime: "11:59 PM",
        priority: user.cgpa >= 8.5 ? "Medium" : "High",
        status: rollNoSeed % 3 === 0 ? "In Progress" : "Pending",
        description: "Design reinforced concrete beam structures",
        points: 50,
        submissions: Math.floor(rollNoSeed % 25 + 13),
        totalStudents: 39
      },
      {
        id: rollNoSeed + 2,
        title: `Environmental Impact Study ${rollNoSeed}`,
        subject: "Environmental Engineering",
        dueDate: new Date(baseDate.getTime() + (6 + rollNoSeed % 4) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        dueTime: "5:30 PM",
        priority: "Medium",
        status: rollNoSeed % 4 === 0 ? "Completed" : "Pending",
        description: "Assess environmental impact of construction projects",
        points: 40,
        submissions: Math.floor(rollNoSeed % 21 + 8),
        totalStudents: 35
      },
      {
        id: rollNoSeed + 3,
        title: `Geotechnical Investigation - ${user.name.split(' ')[1]}`,
        subject: "Geotechnical Engineering",
        dueDate: new Date(baseDate.getTime() + (9 + rollNoSeed % 5) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        dueTime: "3:00 PM",
        priority: "Low",
        status: "Not Started",
        description: "Soil analysis and foundation design recommendations",
        points: 45,
        submissions: Math.floor(rollNoSeed % 19 + 6),
        totalStudents: 32
      }
    ]
  };

  return departmentAssignments[user.department] || [];
}

// Function to generate completed assignments for student
function getCompletedAssignments(user: any) {
  const rollNoSeed = parseInt(user.rollNo.slice(-3));
  const baseDate = new Date();
  
  const completedCount = Math.floor(rollNoSeed % 5 + 3); // 3-7 completed assignments
  const completed = [];
  
  for (let i = 0; i < completedCount; i++) {
    const daysAgo = Math.floor(rollNoSeed % 30 + 10 + i * 5);
    const grade = user.cgpa >= 9.0 ? (rollNoSeed % 2 === 0 ? "A+" : "A") : 
                 user.cgpa >= 8.5 ? (rollNoSeed % 3 === 0 ? "A" : "A-") : 
                 user.cgpa >= 8.0 ? (rollNoSeed % 2 === 0 ? "A-" : "B+") : "B+";
    
    completed.push({
      id: rollNoSeed + i + 100,
      title: `Assignment ${i + 1} - ${user.department.split(' ')[0]} Focus`,
      subject: rollNoSeed % 2 === 0 ? "Database Systems" : "Data Structures",
      submittedDate: new Date(baseDate.getTime() - daysAgo * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      grade: grade,
      points: Math.floor(rollNoSeed % 20 + 35 + i * 2),
      feedback: user.cgpa >= 8.5 ? "Excellent work! Great attention to detail." : "Good effort. Keep improving.",
      status: "Graded"
    });
  }
  
  return completed;
}

export function StudentAssignmentsPage({ user }: StudentAssignmentsPageProps) {
  const [activeTab, setActiveTab] = useState("upcoming");
  
  // Get personalized assignments for this student
  const upcomingAssignments = getPersonalizedAssignments(user);
  const completedAssignments = getCompletedAssignments(user);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const getDaysUntilDue = (dueDate: string) => {
    const due = new Date(dueDate);
    const today = new Date();
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return "Overdue";
    if (diffDays === 0) return "Due Today";
    if (diffDays === 1) return "Due Tomorrow";
    return `${diffDays} days left`;
  };

  return (
    <>
      {/* Header */}
      <header className="bg-dark-bg border-b border-dark-color px-8 py-8 animate-fade-in">
        <div className="flex items-center justify-between">
          <div className="animate-slide-in-left">
            <h1 className="text-3xl font-bold text-dark-primary">My Assignments</h1>
            <p className="text-dark-secondary mt-2">Track and manage your assignments - {user.department}</p>
          </div>
          <div className="flex items-center space-x-4 animate-slide-in-right">
            <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 px-4 py-2">
              <FileText className="w-4 h-4 mr-2" />
              {upcomingAssignments.length} Pending
            </Badge>
            <Button className="dark-button-primary hover-lift">
              <Plus className="w-4 h-4 mr-2" />
              Submit Assignment
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-auto p-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-dark-card border-dark-color animate-scale-in">
            <TabsTrigger value="upcoming" className="data-[state=active]:bg-dark-hover data-[state=active]:text-dark-primary">
              Upcoming ({upcomingAssignments.length})
            </TabsTrigger>
            <TabsTrigger value="completed" className="data-[state=active]:bg-dark-hover data-[state=active]:text-dark-primary">
              Completed ({completedAssignments.length})
            </TabsTrigger>
            <TabsTrigger value="overdue" className="data-[state=active]:bg-dark-hover data-[state=active]:text-dark-primary">
              Overdue (0)
            </TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="space-y-6">
            <div className="grid gap-6">
              {upcomingAssignments.map((assignment, index) => (
                <Card 
                  key={assignment.id} 
                  className="bg-dark-card border-dark-color hover-lift hover-glow transition-all duration-300 animate-slide-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <CardTitle className="text-dark-primary">{assignment.title}</CardTitle>
                        <CardDescription className="text-dark-secondary">
                          {assignment.subject} • {assignment.points} points
                        </CardDescription>
                      </div>
                      <Badge 
                        className={`${
                          assignment.priority === 'High' 
                            ? 'bg-red-500/20 text-red-400 border-red-500/30'
                            : assignment.priority === 'Medium'
                            ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
                            : 'bg-blue-500/20 text-blue-400 border-blue-500/30'
                        } animate-bounce-in`}
                      >
                        {assignment.priority} Priority
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-dark-secondary">{assignment.description}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-6">
                        <div className="flex items-center space-x-2 group">
                          <Calendar className="w-4 h-4 text-dark-secondary group-hover:text-blue-400 transition-colors" />
                          <span className="text-sm text-dark-secondary group-hover:text-blue-400 transition-colors">
                            Due: {formatDate(assignment.dueDate)}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2 group">
                          <Clock className="w-4 h-4 text-dark-secondary group-hover:text-orange-400 transition-colors" />
                          <span className="text-sm text-dark-secondary group-hover:text-orange-400 transition-colors">
                            {assignment.dueTime}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-4">
                        <span className="text-sm text-dark-secondary">
                          {assignment.submissions}/{assignment.totalStudents} submitted
                        </span>
                        <Badge 
                          className={`${
                            assignment.status === 'Completed' 
                              ? 'bg-green-500/20 text-green-400 border-green-500/30'
                              : assignment.status === 'In Progress'
                              ? 'bg-orange-500/20 text-orange-400 border-orange-500/30'
                              : 'bg-gray-500/20 text-gray-400 border-gray-500/30'
                          }`}
                        >
                          {assignment.status}
                        </Badge>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-dark-color">
                      <span className="text-sm font-medium text-dark-primary">
                        {getDaysUntilDue(assignment.dueDate)}
                      </span>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" className="border-dark-color text-dark-secondary hover:bg-dark-hover hover-lift">
                          View Details
                        </Button>
                        <Button size="sm" className="dark-button-primary hover-lift">
                          {assignment.status === 'Completed' ? 'Resubmit' : 'Start Assignment'}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="completed" className="space-y-6">
            <div className="grid gap-6">
              {completedAssignments.map((assignment, index) => (
                <Card 
                  key={assignment.id} 
                  className="bg-dark-card border-dark-color hover-lift hover-glow transition-all duration-300 animate-slide-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <CardTitle className="text-dark-primary">{assignment.title}</CardTitle>
                        <CardDescription className="text-dark-secondary">
                          {assignment.subject} • {assignment.points} points
                        </CardDescription>
                      </div>
                      <div className="flex items-center space-x-2 animate-bounce-in">
                        <CheckCircle className="w-5 h-5 text-green-400" />
                        <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                          Grade: {assignment.grade}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 group">
                        <Calendar className="w-4 h-4 text-dark-secondary group-hover:text-green-400 transition-colors" />
                        <span className="text-sm text-dark-secondary group-hover:text-green-400 transition-colors">
                          Submitted: {formatDate(assignment.submittedDate)}
                        </span>
                      </div>
                      <span className="text-sm text-dark-secondary">{assignment.feedback}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="overdue" className="space-y-6">
            <div className="text-center py-12 animate-scale-in">
              <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4 animate-bounce-in" />
              <h3 className="text-xl font-semibold text-dark-primary mb-2">No Overdue Assignments!</h3>
              <p className="text-dark-secondary">Great job staying on top of your assignments, {user.name.split(' ')[0]}!</p>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </>
  );
}