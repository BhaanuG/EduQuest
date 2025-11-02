import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus, FileText, Users, Calendar, Clock, CheckCircle, AlertCircle, Edit, Trash2, Download, TrendingUp } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Progress } from "../ui/progress";
import { ScrollArea } from "../ui/scroll-area";

interface TeacherAssignmentsPageProps {
  user: any;
}

// Generate demo assignments with completion statistics
function getDemoAssignments(user: any) {
  if (!user || !user.id) return [];
  
  const teacherIdSeed = parseInt(user.id.slice(-2));
  const baseDate = new Date();
  const subject = user.specialization || user.department;
  
  return [
    {
      id: teacherIdSeed + 1,
      title: `${subject} Lab Assignment ${teacherIdSeed % 5 + 1}`,
      description: "Complete practical exercises and submit lab report",
      dueDate: new Date(baseDate.getTime() + (5 + teacherIdSeed % 3) * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      totalStudents: user.department === "Computer Science" ? 45 : user.department === "Electronics" ? 42 : user.department === "Mechanical" ? 40 : user.department === "Information Technology" ? 48 : 38,
      submitted: Math.floor(((teacherIdSeed + 1) * 7) % 30 + 15),
      points: 50,
      status: "active"
    },
    {
      id: teacherIdSeed + 2,
      title: `Midterm Project - ${subject}`,
      description: "Group project submission with documentation",
      dueDate: new Date(baseDate.getTime() + (10 + teacherIdSeed % 4) * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      totalStudents: user.department === "Computer Science" ? 45 : user.department === "Electronics" ? 42 : user.department === "Mechanical" ? 40 : user.department === "Information Technology" ? 48 : 38,
      submitted: Math.floor(((teacherIdSeed + 2) * 5) % 20 + 10),
      points: 100,
      status: "active"
    },
    {
      id: teacherIdSeed + 3,
      title: "Weekly Quiz - Chapter 5",
      description: "Online multiple choice quiz on recent topics",
      dueDate: new Date(baseDate.getTime() + (3 + teacherIdSeed % 2) * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      totalStudents: user.department === "Computer Science" ? 45 : user.department === "Electronics" ? 42 : user.department === "Mechanical" ? 40 : user.department === "Information Technology" ? 48 : 38,
      submitted: Math.floor(((teacherIdSeed + 3) * 9) % 35 + 20),
      points: 20,
      status: "active"
    },
    {
      id: teacherIdSeed + 4,
      title: `Case Study Analysis - ${user.department}`,
      description: "Analyze real-world case study and provide solutions",
      dueDate: new Date(baseDate.getTime() - (2 + teacherIdSeed % 2) * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      totalStudents: user.department === "Computer Science" ? 45 : user.department === "Electronics" ? 42 : user.department === "Mechanical" ? 40 : user.department === "Information Technology" ? 48 : 38,
      submitted: Math.floor(((teacherIdSeed + 4) * 8) % 10 + 35),
      points: 75,
      status: "grading"
    },
    {
      id: teacherIdSeed + 5,
      title: "Research Paper Review",
      description: "Critical review of assigned research paper",
      dueDate: new Date(baseDate.getTime() - (7 + teacherIdSeed % 3) * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      totalStudents: user.department === "Computer Science" ? 45 : user.department === "Electronics" ? 42 : user.department === "Mechanical" ? 40 : user.department === "Information Technology" ? 48 : 38,
      submitted: user.department === "Computer Science" ? 45 : user.department === "Electronics" ? 42 : user.department === "Mechanical" ? 40 : user.department === "Information Technology" ? 48 : 38,
      points: 30,
      status: "completed"
    },
  ];
}

export function TeacherAssignmentsPage({ user }: TeacherAssignmentsPageProps) {
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [selectedDialog, setSelectedDialog] = useState<string | null>(null);
  const [newAssignment, setNewAssignment] = useState({
    title: "",
    description: "",
    dueDate: "",
    points: ""
  });
  
  const assignments = getDemoAssignments(user);
  
  const totalAssignments = assignments.length;
  const activeAssignments = assignments.filter(a => a.status === 'active');
  const gradingAssignments = assignments.filter(a => a.status === 'grading');
  const completedAssignments = assignments.filter(a => a.status === 'completed');
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'grading': return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      case 'completed': return 'bg-green-500/20 text-green-400 border-green-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const handleCreateAssignment = () => {
    console.log("Creating assignment:", newAssignment);
    setShowCreateDialog(false);
    setNewAssignment({ title: "", description: "", dueDate: "", points: "" });
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
            <h1 className="text-3xl font-bold text-dark-primary">Assignments</h1>
            <p className="text-dark-secondary mt-2">Manage and track course assignments - {user.subject}</p>
          </motion.div>
          <motion.div 
            className="flex items-center space-x-4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 px-4 py-2">
              <FileText className="w-4 h-4 mr-2" />
              {activeAssignments.length} Active
            </Badge>
            <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
              <DialogTrigger asChild>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button className="dark-button-primary">
                    <Plus className="w-4 h-4 mr-2" />
                    Create Assignment
                  </Button>
                </motion.div>
              </DialogTrigger>
              <DialogContent className="bg-dark-card border-dark-color">
                <DialogHeader>
                  <DialogTitle className="text-dark-primary">Create New Assignment</DialogTitle>
                  <DialogDescription className="text-dark-secondary">
                    Add a new assignment for your students
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="title" className="text-dark-primary">Assignment Title</Label>
                    <Input
                      id="title"
                      placeholder="Enter assignment title"
                      value={newAssignment.title}
                      onChange={(e) => setNewAssignment({...newAssignment, title: e.target.value})}
                      className="bg-dark-bg border-dark-color text-dark-primary"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description" className="text-dark-primary">Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Enter assignment description"
                      value={newAssignment.description}
                      onChange={(e) => setNewAssignment({...newAssignment, description: e.target.value})}
                      className="bg-dark-bg border-dark-color text-dark-primary"
                      rows={3}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="dueDate" className="text-dark-primary">Due Date</Label>
                      <Input
                        id="dueDate"
                        type="date"
                        value={newAssignment.dueDate}
                        onChange={(e) => setNewAssignment({...newAssignment, dueDate: e.target.value})}
                        className="bg-dark-bg border-dark-color text-dark-primary"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="points" className="text-dark-primary">Points</Label>
                      <Input
                        id="points"
                        type="number"
                        placeholder="100"
                        value={newAssignment.points}
                        onChange={(e) => setNewAssignment({...newAssignment, points: e.target.value})}
                        className="bg-dark-bg border-dark-color text-dark-primary"
                      />
                    </div>
                  </div>
                  <Button 
                    onClick={handleCreateAssignment}
                    className="w-full dark-button-primary mt-4"
                  >
                    Create Assignment
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </motion.div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="flex-1 overflow-auto p-8 space-y-6">
        {/* Stats Cards */}
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
              onClick={() => setSelectedDialog('total-assignments')}
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-dark-secondary">Total Assignments</p>
                    <motion.p 
                      className="text-3xl font-bold text-dark-primary mt-2"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                    >
                      {totalAssignments}
                    </motion.p>
                  </div>
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <FileText className="w-8 h-8 text-blue-400" />
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
              onClick={() => setSelectedDialog('active')}
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-dark-secondary">Active</p>
                    <motion.p 
                      className="text-3xl font-bold text-dark-primary mt-2"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.4 }}
                    >
                      {activeAssignments.length}
                    </motion.p>
                  </div>
                  <motion.div
                    whileHover={{ scale: 1.2 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Clock className="w-8 h-8 text-blue-400" />
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
              onClick={() => setSelectedDialog('grading')}
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-dark-secondary">Grading</p>
                    <motion.p 
                      className="text-3xl font-bold text-dark-primary mt-2"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.5 }}
                    >
                      {gradingAssignments.length}
                    </motion.p>
                  </div>
                  <motion.div
                    whileHover={{ rotate: -360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <AlertCircle className="w-8 h-8 text-orange-400" />
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
              onClick={() => setSelectedDialog('completed')}
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-dark-secondary">Completed</p>
                    <motion.p 
                      className="text-3xl font-bold text-dark-primary mt-2"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.6 }}
                    >
                      {completedAssignments.length}
                    </motion.p>
                  </div>
                  <motion.div
                    whileHover={{ scale: 1.2 }}
                    transition={{ duration: 0.3 }}
                  >
                    <CheckCircle className="w-8 h-8 text-green-400" />
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        {/* Assignments List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <Card className="bg-dark-card border-dark-color">
            <CardHeader>
              <CardTitle className="text-dark-primary">All Assignments</CardTitle>
              <CardDescription className="text-dark-secondary">Manage your course assignments and track submissions</CardDescription>
            </CardHeader>
            <CardContent>
              <motion.div 
                className="space-y-4"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {assignments.map((assignment, index) => {
                  const completionRate = (assignment.submitted / assignment.totalStudents) * 100;
                  
                  return (
                    <motion.div
                      key={assignment.id}
                      className="p-6 bg-dark-hover rounded-lg border border-dark-color"
                      variants={itemVariants}
                      whileHover={{ x: 5 }}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="font-semibold text-dark-primary">{assignment.title}</h3>
                            <Badge className={getStatusColor(assignment.status)}>
                              {assignment.status.charAt(0).toUpperCase() + assignment.status.slice(1)}
                            </Badge>
                          </div>
                          <p className="text-sm text-dark-secondary mb-3">{assignment.description}</p>
                          <div className="flex items-center space-x-6 text-sm text-dark-secondary">
                            <div className="flex items-center space-x-2">
                              <Calendar className="w-4 h-4" />
                              <span>Due: {assignment.dueDate}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <FileText className="w-4 h-4" />
                              <span>{assignment.points} points</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Users className="w-4 h-4" />
                              <span>{assignment.submitted}/{assignment.totalStudents} submitted</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                            <Button variant="outline" size="sm" className="border-dark-color text-dark-secondary hover:bg-dark-card">
                              <Edit className="w-4 h-4" />
                            </Button>
                          </motion.div>
                          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                            <Button variant="outline" size="sm" className="border-dark-color text-dark-secondary hover:bg-dark-card">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </motion.div>
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-dark-secondary">Submission Progress</span>
                          <span className="text-dark-primary font-medium">{completionRate.toFixed(0)}%</span>
                        </div>
                        <Progress value={completionRate} className="h-2 bg-dark-bg" />
                      </div>

                      <div className="mt-4 flex space-x-2">
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                          <Button size="sm" className="dark-button-primary">
                            View Submissions
                          </Button>
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                          <Button size="sm" variant="outline" className="border-dark-color text-dark-secondary hover:bg-dark-card">
                            Download Reports
                          </Button>
                        </motion.div>
                        {assignment.status === 'grading' && (
                          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Button size="sm" variant="outline" className="border-orange-500/30 text-orange-400 hover:bg-orange-500/10">
                              Start Grading
                            </Button>
                          </motion.div>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </main>

      {/* Dialogs */}
      {/* Total Assignments Dialog */}
      <Dialog open={selectedDialog === 'total-assignments'} onOpenChange={(open) => !open && setSelectedDialog(null)}>
        <DialogContent className="max-w-3xl max-h-[80vh] bg-dark-card border-dark-color">
          <DialogHeader>
            <DialogTitle className="text-dark-primary flex items-center">
              <FileText className="w-6 h-6 mr-2 text-blue-400" />
              Total Assignments Overview
            </DialogTitle>
            <DialogDescription className="text-dark-secondary">
              Complete breakdown of all your assignments
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
                  <p className="text-3xl font-bold text-blue-400">{totalAssignments}</p>
                  <p className="text-sm text-dark-secondary mt-1">Total Assignments</p>
                </div>
                <div className="p-4 bg-dark-hover rounded-lg text-center">
                  <p className="text-3xl font-bold text-green-400">
                    {Math.round((assignments.reduce((sum, a) => sum + a.submitted, 0) / assignments.reduce((sum, a) => sum + a.totalStudents, 0)) * 100)}%
                  </p>
                  <p className="text-sm text-dark-secondary mt-1">Avg Submission Rate</p>
                </div>
                <div className="p-4 bg-dark-hover rounded-lg text-center">
                  <p className="text-3xl font-bold text-purple-400">
                    {assignments.reduce((sum, a) => sum + a.points, 0)}
                  </p>
                  <p className="text-sm text-dark-secondary mt-1">Total Points</p>
                </div>
              </div>

              {assignments.map((assignment, index) => (
                <motion.div
                  key={assignment.id}
                  className="p-4 bg-dark-hover rounded-lg"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-dark-primary">{assignment.title}</h4>
                    <Badge className={getStatusColor(assignment.status)}>
                      {assignment.status}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-sm">
                    <div className="p-2 bg-dark-bg rounded text-center">
                      <p className="text-xs text-dark-secondary">Submitted</p>
                      <p className="font-bold text-green-400">{assignment.submitted}/{assignment.totalStudents}</p>
                    </div>
                    <div className="p-2 bg-dark-bg rounded text-center">
                      <p className="text-xs text-dark-secondary">Points</p>
                      <p className="font-bold text-blue-400">{assignment.points}</p>
                    </div>
                    <div className="p-2 bg-dark-bg rounded text-center">
                      <p className="text-xs text-dark-secondary">Due Date</p>
                      <p className="font-bold text-orange-400">{assignment.dueDate}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </ScrollArea>
        </DialogContent>
      </Dialog>

      {/* Active Assignments Dialog */}
      <Dialog open={selectedDialog === 'active'} onOpenChange={(open) => !open && setSelectedDialog(null)}>
        <DialogContent className="max-w-3xl max-h-[80vh] bg-dark-card border-dark-color">
          <DialogHeader>
            <DialogTitle className="text-dark-primary flex items-center">
              <Clock className="w-6 h-6 mr-2 text-blue-400" />
              Active Assignments
            </DialogTitle>
            <DialogDescription className="text-dark-secondary">
              Currently ongoing assignments with pending submissions
            </DialogDescription>
          </DialogHeader>
          <ScrollArea className="h-[500px] pr-4">
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg text-center">
                <p className="text-3xl font-bold text-blue-400">{activeAssignments.length}</p>
                <p className="text-sm text-dark-secondary mt-1">Active Assignments</p>
              </div>

              {activeAssignments.map((assignment, index) => (
                <motion.div
                  key={assignment.id}
                  className="p-4 bg-dark-hover rounded-lg"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h4 className="font-semibold text-dark-primary">{assignment.title}</h4>
                      <p className="text-sm text-dark-secondary mt-1">{assignment.description}</p>
                    </div>
                    <Badge className="bg-blue-500/20 text-blue-400">Active</Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="p-2 bg-dark-bg rounded">
                      <p className="text-dark-secondary">Due Date</p>
                      <p className="font-bold text-dark-primary">{assignment.dueDate}</p>
                    </div>
                    <div className="p-2 bg-dark-bg rounded">
                      <p className="text-dark-secondary">Submissions</p>
                      <p className="font-bold text-dark-primary">{assignment.submitted}/{assignment.totalStudents}</p>
                    </div>
                  </div>
                  <Progress value={(assignment.submitted / assignment.totalStudents) * 100} className="h-2 mt-3" />
                </motion.div>
              ))}
            </motion.div>
          </ScrollArea>
        </DialogContent>
      </Dialog>

      {/* Grading Dialog */}
      <Dialog open={selectedDialog === 'grading'} onOpenChange={(open) => !open && setSelectedDialog(null)}>
        <DialogContent className="max-w-3xl max-h-[80vh] bg-dark-card border-dark-color">
          <DialogHeader>
            <DialogTitle className="text-dark-primary flex items-center">
              <AlertCircle className="w-6 h-6 mr-2 text-orange-400" />
              Assignments in Grading
            </DialogTitle>
            <DialogDescription className="text-dark-secondary">
              Assignments awaiting your evaluation and grading
            </DialogDescription>
          </DialogHeader>
          <ScrollArea className="h-[500px] pr-4">
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="p-4 bg-orange-500/10 border border-orange-500/30 rounded-lg text-center">
                <p className="text-3xl font-bold text-orange-400">{gradingAssignments.length}</p>
                <p className="text-sm text-dark-secondary mt-1">Awaiting Grading</p>
              </div>

              {gradingAssignments.map((assignment, index) => (
                <motion.div
                  key={assignment.id}
                  className="p-4 bg-dark-hover rounded-lg border border-orange-500/30"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h4 className="font-semibold text-dark-primary">{assignment.title}</h4>
                      <p className="text-sm text-dark-secondary mt-1">{assignment.description}</p>
                    </div>
                    <Badge className="bg-orange-500/20 text-orange-400">Grading</Badge>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-sm mb-3">
                    <div className="p-2 bg-dark-bg rounded text-center">
                      <p className="text-xs text-dark-secondary">Submissions</p>
                      <p className="font-bold text-green-400">{assignment.submitted}</p>
                    </div>
                    <div className="p-2 bg-dark-bg rounded text-center">
                      <p className="text-xs text-dark-secondary">Points</p>
                      <p className="font-bold text-blue-400">{assignment.points}</p>
                    </div>
                    <div className="p-2 bg-dark-bg rounded text-center">
                      <p className="text-xs text-dark-secondary">Due Date</p>
                      <p className="font-bold text-orange-400 text-xs">{assignment.dueDate}</p>
                    </div>
                  </div>
                  <Button size="sm" className="w-full dark-button-primary">
                    Start Grading
                  </Button>
                </motion.div>
              ))}
            </motion.div>
          </ScrollArea>
        </DialogContent>
      </Dialog>

      {/* Completed Dialog */}
      <Dialog open={selectedDialog === 'completed'} onOpenChange={(open) => !open && setSelectedDialog(null)}>
        <DialogContent className="max-w-3xl max-h-[80vh] bg-dark-card border-dark-color">
          <DialogHeader>
            <DialogTitle className="text-dark-primary flex items-center">
              <CheckCircle className="w-6 h-6 mr-2 text-green-400" />
              Completed Assignments
            </DialogTitle>
            <DialogDescription className="text-dark-secondary">
              Fully graded assignments with all submissions evaluated
            </DialogDescription>
          </DialogHeader>
          <ScrollArea className="h-[500px] pr-4">
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg text-center">
                <p className="text-3xl font-bold text-green-400">{completedAssignments.length}</p>
                <p className="text-sm text-dark-secondary mt-1">Completed Assignments</p>
              </div>

              {completedAssignments.map((assignment, index) => (
                <motion.div
                  key={assignment.id}
                  className="p-4 bg-dark-hover rounded-lg border border-green-500/30"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h4 className="font-semibold text-dark-primary">{assignment.title}</h4>
                      <p className="text-sm text-dark-secondary mt-1">{assignment.description}</p>
                    </div>
                    <Badge className="bg-green-500/20 text-green-400">Completed</Badge>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-sm mb-3">
                    <div className="p-2 bg-dark-bg rounded text-center">
                      <p className="text-xs text-dark-secondary">Submissions</p>
                      <p className="font-bold text-green-400">{assignment.submitted}/{assignment.totalStudents}</p>
                    </div>
                    <div className="p-2 bg-dark-bg rounded text-center">
                      <p className="text-xs text-dark-secondary">Points</p>
                      <p className="font-bold text-blue-400">{assignment.points}</p>
                    </div>
                    <div className="p-2 bg-dark-bg rounded text-center">
                      <p className="text-xs text-dark-secondary">Completion</p>
                      <p className="font-bold text-purple-400">100%</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" className="flex-1 dark-button-secondary">
                      <Download className="w-3 h-3 mr-1" />
                      Report
                    </Button>
                    <Button size="sm" className="flex-1 dark-button-secondary">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      Analytics
                    </Button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </>
  );
}
