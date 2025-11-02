import { useState } from "react";
import { Heart, MessageSquare, Eye, Clock, Users, ThumbsUp, Award, TrendingUp, X } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Progress } from "../ui/progress";
import { Badge } from "../ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { motion } from "motion/react";

interface StudentEngagementPageProps {
  user: any;
}

// Function to generate personalized engagement data based on department and performance
function getPersonalizedEngagementData(user: any) {
  const performanceBonus = Math.round((user.cgpa - 7.0) * 10); // Bonus based on CGPA above 7.0
  
  const departmentSubjects = {
    "Computer Science": [
      { subject: "Data Structures", participation: Math.min(100, 70 + performanceBonus + Math.random() * 15), discussions: Math.round(15 + performanceBonus * 0.8 + Math.random() * 10), likes: Math.round(25 + performanceBonus * 1.2 + Math.random() * 20) },
      { subject: "Database Systems", participation: Math.min(100, 75 + performanceBonus + Math.random() * 12), discussions: Math.round(12 + performanceBonus * 0.6 + Math.random() * 8), likes: Math.round(22 + performanceBonus * 1.0 + Math.random() * 16) },
      { subject: "Computer Networks", participation: Math.min(100, 65 + performanceBonus + Math.random() * 18), discussions: Math.round(8 + performanceBonus * 0.5 + Math.random() * 6), likes: Math.round(15 + performanceBonus * 0.8 + Math.random() * 12) },
      { subject: "Software Engineering", participation: Math.min(100, 72 + performanceBonus + Math.random() * 14), discussions: Math.round(14 + performanceBonus * 0.7 + Math.random() * 9), likes: Math.round(28 + performanceBonus * 1.1 + Math.random() * 18) }
    ],
    "Electronics": [
      { subject: "Digital Signal Processing", participation: Math.min(100, 68 + performanceBonus + Math.random() * 16), discussions: Math.round(13 + performanceBonus * 0.7 + Math.random() * 8), likes: Math.round(24 + performanceBonus * 1.1 + Math.random() * 17) },
      { subject: "VLSI Design", participation: Math.min(100, 73 + performanceBonus + Math.random() * 13), discussions: Math.round(10 + performanceBonus * 0.6 + Math.random() * 7), likes: Math.round(19 + performanceBonus * 0.9 + Math.random() * 14) },
      { subject: "Communication Systems", participation: Math.min(100, 71 + performanceBonus + Math.random() * 14), discussions: Math.round(16 + performanceBonus * 0.8 + Math.random() * 9), likes: Math.round(31 + performanceBonus * 1.2 + Math.random() * 19) },
      { subject: "Microprocessors", participation: Math.min(100, 66 + performanceBonus + Math.random() * 17), discussions: Math.round(11 + performanceBonus * 0.5 + Math.random() * 6), likes: Math.round(21 + performanceBonus * 1.0 + Math.random() * 15) }
    ],
    "Mechanical": [
      { subject: "Thermodynamics", participation: Math.min(100, 69 + performanceBonus + Math.random() * 15), discussions: Math.round(12 + performanceBonus * 0.6 + Math.random() * 8), likes: Math.round(23 + performanceBonus * 1.0 + Math.random() * 16) },
      { subject: "Fluid Mechanics", participation: Math.min(100, 64 + performanceBonus + Math.random() * 18), discussions: Math.round(9 + performanceBonus * 0.5 + Math.random() * 6), likes: Math.round(17 + performanceBonus * 0.8 + Math.random() * 13) },
      { subject: "Machine Design", participation: Math.min(100, 74 + performanceBonus + Math.random() * 12), discussions: Math.round(15 + performanceBonus * 0.7 + Math.random() * 9), likes: Math.round(29 + performanceBonus * 1.1 + Math.random() * 18) },
      { subject: "Manufacturing Processes", participation: Math.min(100, 67 + performanceBonus + Math.random() * 16), discussions: Math.round(13 + performanceBonus * 0.6 + Math.random() * 8), likes: Math.round(25 + performanceBonus * 1.0 + Math.random() * 17) }
    ],
    "Information Technology": [
      { subject: "Web Development", participation: Math.min(100, 76 + performanceBonus + Math.random() * 11), discussions: Math.round(18 + performanceBonus * 0.9 + Math.random() * 10), likes: Math.round(35 + performanceBonus * 1.3 + Math.random() * 20) },
      { subject: "Database Systems", participation: Math.min(100, 72 + performanceBonus + Math.random() * 14), discussions: Math.round(14 + performanceBonus * 0.7 + Math.random() * 8), likes: Math.round(27 + performanceBonus * 1.1 + Math.random() * 17) },
      { subject: "Cybersecurity", participation: Math.min(100, 70 + performanceBonus + Math.random() * 15), discussions: Math.round(16 + performanceBonus * 0.8 + Math.random() * 9), likes: Math.round(30 + performanceBonus * 1.2 + Math.random() * 18) },
      { subject: "Cloud Computing", participation: Math.min(100, 74 + performanceBonus + Math.random() * 13), discussions: Math.round(12 + performanceBonus * 0.6 + Math.random() * 7), likes: Math.round(24 + performanceBonus * 1.0 + Math.random() * 16) }
    ],
    "Civil": [
      { subject: "Structural Engineering", participation: Math.min(100, 68 + performanceBonus + Math.random() * 16), discussions: Math.round(11 + performanceBonus * 0.6 + Math.random() * 7), likes: Math.round(22 + performanceBonus * 1.0 + Math.random() * 15) },
      { subject: "Environmental Engineering", participation: Math.min(100, 65 + performanceBonus + Math.random() * 17), discussions: Math.round(13 + performanceBonus * 0.7 + Math.random() * 8), likes: Math.round(26 + performanceBonus * 1.1 + Math.random() * 17) },
      { subject: "Geotechnical Engineering", participation: Math.min(100, 71 + performanceBonus + Math.random() * 14), discussions: Math.round(15 + performanceBonus * 0.8 + Math.random() * 9), likes: Math.round(28 + performanceBonus * 1.1 + Math.random() * 18) },
      { subject: "Construction Management", participation: Math.min(100, 66 + performanceBonus + Math.random() * 17), discussions: Math.round(10 + performanceBonus * 0.5 + Math.random() * 6), likes: Math.round(20 + performanceBonus * 0.9 + Math.random() * 14) }
    ]
  };
  
  return departmentSubjects[user.department] || [];
}

// Function to generate personalized weekly engagement
function getPersonalizedWeeklyEngagement(user: any) {
  const baseEngagement = Math.round(user.cgpa * 9);
  const variation = 10;
  
  return [
    { week: "Week 1", score: Math.max(50, Math.min(100, baseEngagement - variation + Math.random() * 8)) },
    { week: "Week 2", score: Math.max(50, Math.min(100, baseEngagement + Math.random() * 10)) },
    { week: "Week 3", score: Math.max(50, Math.min(100, baseEngagement - variation/2 + Math.random() * 9)) },
    { week: "Week 4", score: Math.max(50, Math.min(100, baseEngagement + variation + Math.random() * 6)) }
  ];
}

// Function to generate personalized engagement breakdown
function getPersonalizedEngagementBreakdown(user: any) {
  const performanceLevel = user.cgpa >= 9.0 ? 'excellent' : user.cgpa >= 8.5 ? 'very_good' : user.cgpa >= 8.0 ? 'good' : 'average';
  
  const breakdowns = {
    excellent: [
      { name: "Discussion Posts", value: 40, color: "#3B82F6" },
      { name: "Assignment Submissions", value: 30, color: "#10B981" },
      { name: "Quiz Participation", value: 15, color: "#F59E0B" },
      { name: "Peer Interactions", value: 10, color: "#8B5CF6" },
      { name: "Resource Sharing", value: 5, color: "#EF4444" }
    ],
    very_good: [
      { name: "Discussion Posts", value: 35, color: "#3B82F6" },
      { name: "Assignment Submissions", value: 28, color: "#10B981" },
      { name: "Quiz Participation", value: 18, color: "#F59E0B" },
      { name: "Peer Interactions", value: 12, color: "#8B5CF6" },
      { name: "Resource Sharing", value: 7, color: "#EF4444" }
    ],
    good: [
      { name: "Discussion Posts", value: 30, color: "#3B82F6" },
      { name: "Assignment Submissions", value: 25, color: "#10B981" },
      { name: "Quiz Participation", value: 20, color: "#F59E0B" },
      { name: "Peer Interactions", value: 15, color: "#8B5CF6" },
      { name: "Resource Sharing", value: 10, color: "#EF4444" }
    ],
    average: [
      { name: "Assignment Submissions", value: 30, color: "#10B981" },
      { name: "Discussion Posts", value: 25, color: "#3B82F6" },
      { name: "Quiz Participation", value: 25, color: "#F59E0B" },
      { name: "Peer Interactions", value: 15, color: "#8B5CF6" },
      { name: "Resource Sharing", value: 5, color: "#EF4444" }
    ]
  };
  
  return breakdowns[performanceLevel];
}

// Function to generate personalized recent activities
function getPersonalizedRecentActivities(user: any) {
  const departmentActivities = {
    "Computer Science": [
      { activity: `Posted in ${user.department} discussion forum`, type: "discussion", time: `${Math.floor(Math.random() * 8 + 1)} hours ago`, points: user.cgpa >= 8.5 ? 8 : 5 },
      { activity: "Submitted DSA assignment early", type: "assignment", time: "1 day ago", points: user.cgpa >= 9.0 ? 12 : 10 },
      { activity: "Helped classmate with programming concepts", type: "peer", time: "2 days ago", points: user.cgpa >= 8.0 ? 10 : 6 },
      { activity: "Shared coding notes for algorithms", type: "resource", time: "3 days ago", points: user.cgpa >= 8.5 ? 8 : 6 },
      { activity: "Participated in coding competition", type: "quiz", time: "4 days ago", points: user.cgpa >= 9.0 ? 15 : 12 }
    ],
    "Electronics": [
      { activity: `Posted in ${user.department} circuit design discussion`, type: "discussion", time: `${Math.floor(Math.random() * 8 + 1)} hours ago`, points: user.cgpa >= 8.5 ? 8 : 5 },
      { activity: "Submitted VLSI lab report early", type: "assignment", time: "1 day ago", points: user.cgpa >= 9.0 ? 12 : 10 },
      { activity: "Helped classmate with signal processing", type: "peer", time: "2 days ago", points: user.cgpa >= 8.0 ? 10 : 6 },
      { activity: "Shared circuit simulation files", type: "resource", time: "3 days ago", points: user.cgpa >= 8.5 ? 8 : 6 },
      { activity: "Participated in electronics quiz", type: "quiz", time: "4 days ago", points: user.cgpa >= 9.0 ? 15 : 12 }
    ],
    "Mechanical": [
      { activity: `Posted in ${user.department} design discussion`, type: "discussion", time: `${Math.floor(Math.random() * 8 + 1)} hours ago`, points: user.cgpa >= 8.5 ? 8 : 5 },
      { activity: "Submitted CAD design project early", type: "assignment", time: "1 day ago", points: user.cgpa >= 9.0 ? 12 : 10 },
      { activity: "Helped classmate with thermodynamics", type: "peer", time: "2 days ago", points: user.cgpa >= 8.0 ? 10 : 6 },
      { activity: "Shared engineering calculation sheets", type: "resource", time: "3 days ago", points: user.cgpa >= 8.5 ? 8 : 6 },
      { activity: "Participated in design competition", type: "quiz", time: "4 days ago", points: user.cgpa >= 9.0 ? 15 : 12 }
    ],
    "Information Technology": [
      { activity: `Posted in ${user.department} web dev discussion`, type: "discussion", time: `${Math.floor(Math.random() * 8 + 1)} hours ago`, points: user.cgpa >= 8.5 ? 8 : 5 },
      { activity: "Submitted web application project early", type: "assignment", time: "1 day ago", points: user.cgpa >= 9.0 ? 12 : 10 },
      { activity: "Helped classmate with database queries", type: "peer", time: "2 days ago", points: user.cgpa >= 8.0 ? 10 : 6 },
      { activity: "Shared cybersecurity resources", type: "resource", time: "3 days ago", points: user.cgpa >= 8.5 ? 8 : 6 },
      { activity: "Participated in hackathon", type: "quiz", time: "4 days ago", points: user.cgpa >= 9.0 ? 15 : 12 }
    ],
    "Civil": [
      { activity: `Posted in ${user.department} construction discussion`, type: "discussion", time: `${Math.floor(Math.random() * 8 + 1)} hours ago`, points: user.cgpa >= 8.5 ? 8 : 5 },
      { activity: "Submitted structural analysis early", type: "assignment", time: "1 day ago", points: user.cgpa >= 9.0 ? 12 : 10 },
      { activity: "Helped classmate with surveying", type: "peer", time: "2 days ago", points: user.cgpa >= 8.0 ? 10 : 6 },
      { activity: "Shared construction management notes", type: "resource", time: "3 days ago", points: user.cgpa >= 8.5 ? 8 : 6 },
      { activity: "Participated in civil engineering quiz", type: "quiz", time: "4 days ago", points: user.cgpa >= 9.0 ? 15 : 12 }
    ]
  };
  
  return departmentActivities[user.department] || [];
}

export function StudentEngagementPage({ user }: StudentEngagementPageProps) {
  // Get personalized data for this student
  const engagementData = getPersonalizedEngagementData(user);
  const weeklyEngagement = getPersonalizedWeeklyEngagement(user);
  const engagementBreakdown = getPersonalizedEngagementBreakdown(user);
  const recentActivities = getPersonalizedRecentActivities(user);
  
  const overallEngagement = engagementData.length > 0 ? Math.round(engagementData.reduce((sum, item) => sum + item.participation, 0) / engagementData.length) : 0;
  const totalDiscussions = engagementData.reduce((sum, item) => sum + item.discussions, 0);
  const totalLikes = engagementData.reduce((sum, item) => sum + item.likes, 0);
  const totalPoints = recentActivities.reduce((sum, activity) => sum + activity.points, 0);
  
  // Dialog states
  const [engagementScoreOpen, setEngagementScoreOpen] = useState(false);
  const [discussionPostsOpen, setDiscussionPostsOpen] = useState(false);
  const [likesReceivedOpen, setLikesReceivedOpen] = useState(false);
  const [engagementPointsOpen, setEngagementPointsOpen] = useState(false);
  const [breakdownOpen, setBreakdownOpen] = useState(false);

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
              Learning Engagement
            </motion.h1>
            <motion.p 
              className="text-dark-secondary mt-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              Track your active participation and community involvement
            </motion.p>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <Badge className="bg-pink-500/20 text-pink-400 border-pink-500/30 px-4 py-2">
              <Heart className="w-4 h-4 mr-2" />
              {overallEngagement}% Engaged
            </Badge>
          </motion.div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="flex-1 overflow-auto p-8 space-y-8">
        {/* Engagement Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Card 
              className="bg-dark-card border-dark-color cursor-pointer transition-all hover:border-pink-500/50 hover:shadow-lg hover:shadow-pink-500/20"
              onClick={() => setEngagementScoreOpen(true)}
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-dark-secondary">Engagement Score</p>
                    <p className="text-3xl font-bold text-dark-primary">{overallEngagement}%</p>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-pink-500/20 flex items-center justify-center">
                    <Heart className="w-6 h-6 text-pink-400" />
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
              onClick={() => setDiscussionPostsOpen(true)}
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-dark-secondary">Discussion Posts</p>
                    <p className="text-3xl font-bold text-dark-primary">{totalDiscussions}</p>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center">
                    <MessageSquare className="w-6 h-6 text-blue-400" />
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
              className="bg-dark-card border-dark-color cursor-pointer transition-all hover:border-green-500/50 hover:shadow-lg hover:shadow-green-500/20"
              onClick={() => setLikesReceivedOpen(true)}
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-dark-secondary">Likes Received</p>
                    <p className="text-3xl font-bold text-dark-primary">{totalLikes}</p>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center">
                    <ThumbsUp className="w-6 h-6 text-green-400" />
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
              className="bg-dark-card border-dark-color cursor-pointer transition-all hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-500/20"
              onClick={() => setEngagementPointsOpen(true)}
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-dark-secondary">Engagement Points</p>
                    <p className="text-3xl font-bold text-dark-primary">{totalPoints}</p>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center">
                    <Award className="w-6 h-6 text-purple-400" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Subject Engagement */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <Card className="bg-dark-card border-dark-color">
              <CardHeader>
                <CardTitle className="text-dark-primary">Subject-wise Engagement</CardTitle>
                <CardDescription className="text-dark-secondary">Your participation across different subjects</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {engagementData.map((item, index) => (
                  <motion.div 
                    key={index} 
                    className="space-y-2"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + index * 0.1, duration: 0.4 }}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-dark-primary">{item.subject}</span>
                      <span className="text-sm text-dark-secondary">{item.participation}%</span>
                    </div>
                    <Progress value={item.participation} className="h-2" />
                    <div className="flex items-center justify-between text-xs text-dark-secondary">
                      <span>{item.discussions} discussions</span>
                      <span>{item.likes} likes received</span>
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          {/* Engagement Breakdown */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            whileHover={{ scale: 1.01 }}
          >
            <Card 
              className="bg-dark-card border-dark-color cursor-pointer transition-all hover:border-blue-500/50"
              onClick={() => setBreakdownOpen(true)}
            >
              <CardHeader>
                <CardTitle className="text-dark-primary">Engagement Breakdown</CardTitle>
                <CardDescription className="text-dark-secondary">Distribution of your learning activities (Click for details)</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={engagementBreakdown}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {engagementBreakdown.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1E293B', 
                        border: '1px solid #374151',
                        borderRadius: '8px',
                        color: '#FFFFFF'
                      }} 
                    />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Weekly Engagement Trend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          <Card className="bg-dark-card border-dark-color">
            <CardHeader>
              <CardTitle className="text-dark-primary flex items-center">
                <TrendingUp className="w-5 h-5 mr-2" />
                Weekly Engagement Trend
              </CardTitle>
              <CardDescription className="text-dark-secondary">Your engagement pattern over the past month</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={weeklyEngagement}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="week" stroke="#94A3B8" />
                  <YAxis stroke="#94A3B8" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1E293B', 
                      border: '1px solid #374151',
                      borderRadius: '8px',
                      color: '#FFFFFF'
                    }} 
                  />
                  <Bar dataKey="score" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Recent Activities */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <Card className="bg-dark-card border-dark-color">
            <CardHeader>
              <CardTitle className="text-dark-primary">Recent Engagement Activities</CardTitle>
              <CardDescription className="text-dark-secondary">Your latest participation and contributions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <motion.div 
                    key={index} 
                    className="flex items-center justify-between p-4 bg-dark-hover rounded-lg"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.9 + index * 0.1, duration: 0.4 }}
                    whileHover={{ scale: 1.01, x: 5 }}
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        activity.type === 'discussion' ? 'bg-blue-500/20' :
                        activity.type === 'assignment' ? 'bg-green-500/20' :
                        activity.type === 'peer' ? 'bg-purple-500/20' :
                        activity.type === 'resource' ? 'bg-orange-500/20' :
                        'bg-pink-500/20'
                      }`}>
                        {activity.type === 'discussion' ? <MessageSquare className="w-4 h-4 text-blue-400" /> :
                         activity.type === 'assignment' ? <Award className="w-4 h-4 text-green-400" /> :
                         activity.type === 'peer' ? <Users className="w-4 h-4 text-purple-400" /> :
                         activity.type === 'resource' ? <Eye className="w-4 h-4 text-orange-400" /> :
                         <Clock className="w-4 h-4 text-pink-400" />}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-dark-primary">{activity.activity}</p>
                        <p className="text-sm text-dark-secondary">{activity.time}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
                        +{activity.points} pts
                      </Badge>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </main>

      {/* Dialogs for Clickable Metrics */}
      {/* Engagement Score Dialog */}
      <Dialog open={engagementScoreOpen} onOpenChange={setEngagementScoreOpen}>
        <DialogContent className="bg-dark-card border-dark-color text-dark-primary max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center text-2xl">
              <Heart className="w-6 h-6 mr-2 text-pink-400" />
              Engagement Score Details
            </DialogTitle>
            <DialogDescription className="text-dark-secondary">
              Comprehensive breakdown of your overall engagement score
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6 mt-4">
            <div className="bg-dark-hover p-6 rounded-lg">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-4xl font-bold text-pink-400">{overallEngagement}%</h3>
                  <p className="text-dark-secondary mt-1">Overall Engagement Score</p>
                </div>
                <div className="w-16 h-16 rounded-xl bg-pink-500/20 flex items-center justify-center">
                  <Heart className="w-8 h-8 text-pink-400" />
                </div>
              </div>
              <Progress value={overallEngagement} className="h-3" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-dark-hover p-4 rounded-lg">
                <p className="text-sm text-dark-secondary mb-1">Average Participation</p>
                <p className="text-2xl font-bold text-dark-primary">{overallEngagement}%</p>
                <p className="text-xs text-dark-secondary mt-1">Across all subjects</p>
              </div>
              <div className="bg-dark-hover p-4 rounded-lg">
                <p className="text-sm text-dark-secondary mb-1">Active Subjects</p>
                <p className="text-2xl font-bold text-dark-primary">{engagementData.length}</p>
                <p className="text-xs text-dark-secondary mt-1">Currently enrolled</p>
              </div>
              <div className="bg-dark-hover p-4 rounded-lg">
                <p className="text-sm text-dark-secondary mb-1">Engagement Rank</p>
                <p className="text-2xl font-bold text-dark-primary">Top {Math.max(5, Math.floor((100 - overallEngagement) / 2))}%</p>
                <p className="text-xs text-dark-secondary mt-1">In your department</p>
              </div>
              <div className="bg-dark-hover p-4 rounded-lg">
                <p className="text-sm text-dark-secondary mb-1">Consistency Score</p>
                <p className="text-2xl font-bold text-dark-primary">{Math.min(100, overallEngagement + Math.floor(Math.random() * 10))}%</p>
                <p className="text-xs text-dark-secondary mt-1">Regularity in participation</p>
              </div>
            </div>

            <div className="bg-dark-hover p-4 rounded-lg">
              <h4 className="font-semibold mb-3 text-dark-primary">Engagement Insights</h4>
              <ul className="space-y-2 text-sm text-dark-secondary">
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">✓</span>
                  <span>You're {overallEngagement >= 75 ? 'highly engaged' : 'moderately engaged'} compared to your peers</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2">•</span>
                  <span>Your engagement has {Math.random() > 0.5 ? 'increased' : 'remained stable'} over the past month</span>
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-400 mr-2">★</span>
                  <span>Most active in {engagementData.sort((a, b) => b.participation - a.participation)[0]?.subject || 'N/A'}</span>
                </li>
              </ul>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Discussion Posts Dialog */}
      <Dialog open={discussionPostsOpen} onOpenChange={setDiscussionPostsOpen}>
        <DialogContent className="bg-dark-card border-dark-color text-dark-primary max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center text-2xl">
              <MessageSquare className="w-6 h-6 mr-2 text-blue-400" />
              Discussion Posts Details
            </DialogTitle>
            <DialogDescription className="text-dark-secondary">
              Complete overview of your discussion forum participation
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6 mt-4">
            <div className="bg-dark-hover p-6 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h3 className="text-4xl font-bold text-blue-400">{totalDiscussions}</h3>
                  <p className="text-dark-secondary mt-1">Total Discussion Posts</p>
                </div>
                <div className="w-16 h-16 rounded-xl bg-blue-500/20 flex items-center justify-center">
                  <MessageSquare className="w-8 h-8 text-blue-400" />
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold text-dark-primary">Subject-wise Breakdown</h4>
              {engagementData.map((item, index) => (
                <div key={index} className="bg-dark-hover p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-dark-primary">{item.subject}</span>
                    <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                      {item.discussions} posts
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm text-dark-secondary">
                    <span>{Math.round((item.discussions / totalDiscussions) * 100)}% of total posts</span>
                    <span>{item.likes} likes received</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="bg-dark-hover p-4 rounded-lg text-center">
                <p className="text-2xl font-bold text-green-400">{Math.floor(totalDiscussions * 0.8)}</p>
                <p className="text-xs text-dark-secondary mt-1">Replies Received</p>
              </div>
              <div className="bg-dark-hover p-4 rounded-lg text-center">
                <p className="text-2xl font-bold text-purple-400">{Math.floor(totalDiscussions * 1.2)}</p>
                <p className="text-xs text-dark-secondary mt-1">Views</p>
              </div>
              <div className="bg-dark-hover p-4 rounded-lg text-center">
                <p className="text-2xl font-bold text-yellow-400">{Math.floor(totalDiscussions * 0.6)}</p>
                <p className="text-xs text-dark-secondary mt-1">Helpful Marks</p>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Likes Received Dialog */}
      <Dialog open={likesReceivedOpen} onOpenChange={setLikesReceivedOpen}>
        <DialogContent className="bg-dark-card border-dark-color text-dark-primary max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center text-2xl">
              <ThumbsUp className="w-6 h-6 mr-2 text-green-400" />
              Likes Received Details
            </DialogTitle>
            <DialogDescription className="text-dark-secondary">
              Recognition and appreciation from your peers
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6 mt-4">
            <div className="bg-dark-hover p-6 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h3 className="text-4xl font-bold text-green-400">{totalLikes}</h3>
                  <p className="text-dark-secondary mt-1">Total Likes Received</p>
                </div>
                <div className="w-16 h-16 rounded-xl bg-green-500/20 flex items-center justify-center">
                  <ThumbsUp className="w-8 h-8 text-green-400" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-dark-hover p-4 rounded-lg">
                <p className="text-sm text-dark-secondary mb-1">Average per Post</p>
                <p className="text-2xl font-bold text-dark-primary">{(totalLikes / totalDiscussions).toFixed(1)}</p>
                <p className="text-xs text-dark-secondary mt-1">Likes per discussion</p>
              </div>
              <div className="bg-dark-hover p-4 rounded-lg">
                <p className="text-sm text-dark-secondary mb-1">Peak Performance</p>
                <p className="text-2xl font-bold text-dark-primary">{Math.max(...engagementData.map(d => d.likes))}</p>
                <p className="text-xs text-dark-secondary mt-1">Most likes on a subject</p>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold text-dark-primary">Likes by Subject</h4>
              {engagementData.map((item, index) => (
                <div key={index} className="bg-dark-hover p-3 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-dark-primary">{item.subject}</span>
                    <span className="text-sm text-green-400 font-semibold">{item.likes} likes</span>
                  </div>
                  <Progress value={(item.likes / totalLikes) * 100} className="h-1.5" />
                </div>
              ))}
            </div>

            <div className="bg-dark-hover p-4 rounded-lg">
              <h4 className="font-semibold mb-2 text-dark-primary">Recognition Level</h4>
              <p className="text-sm text-dark-secondary">
                With {totalLikes} likes, you're in the <span className="text-green-400 font-semibold">
                  {totalLikes > 100 ? 'Top 10%' : totalLikes > 75 ? 'Top 20%' : 'Top 30%'}
                </span> most appreciated contributors in your class!
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Engagement Points Dialog */}
      <Dialog open={engagementPointsOpen} onOpenChange={setEngagementPointsOpen}>
        <DialogContent className="bg-dark-card border-dark-color text-dark-primary max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center text-2xl">
              <Award className="w-6 h-6 mr-2 text-purple-400" />
              Engagement Points Details
            </DialogTitle>
            <DialogDescription className="text-dark-secondary">
              Points earned through various learning activities
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6 mt-4">
            <div className="bg-dark-hover p-6 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h3 className="text-4xl font-bold text-purple-400">{totalPoints}</h3>
                  <p className="text-dark-secondary mt-1">Total Engagement Points</p>
                </div>
                <div className="w-16 h-16 rounded-xl bg-purple-500/20 flex items-center justify-center">
                  <Award className="w-8 h-8 text-purple-400" />
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold text-dark-primary">Points Breakdown by Activity</h4>
              {recentActivities.map((activity, index) => (
                <div key={index} className="bg-dark-hover p-4 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        activity.type === 'discussion' ? 'bg-blue-500/20' :
                        activity.type === 'assignment' ? 'bg-green-500/20' :
                        activity.type === 'peer' ? 'bg-purple-500/20' :
                        activity.type === 'resource' ? 'bg-orange-500/20' :
                        'bg-pink-500/20'
                      }`}>
                        {activity.type === 'discussion' ? <MessageSquare className="w-4 h-4 text-blue-400" /> :
                         activity.type === 'assignment' ? <Award className="w-4 h-4 text-green-400" /> :
                         activity.type === 'peer' ? <Users className="w-4 h-4 text-purple-400" /> :
                         activity.type === 'resource' ? <Eye className="w-4 h-4 text-orange-400" /> :
                         <Clock className="w-4 h-4 text-pink-400" />}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-dark-primary">{activity.activity}</p>
                        <p className="text-xs text-dark-secondary">{activity.time}</p>
                      </div>
                    </div>
                    <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
                      +{activity.points} pts
                    </Badge>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="bg-dark-hover p-4 rounded-lg text-center">
                <p className="text-2xl font-bold text-blue-400">{recentActivities.filter(a => a.type === 'discussion').reduce((sum, a) => sum + a.points, 0)}</p>
                <p className="text-xs text-dark-secondary mt-1">Discussion Points</p>
              </div>
              <div className="bg-dark-hover p-4 rounded-lg text-center">
                <p className="text-2xl font-bold text-green-400">{recentActivities.filter(a => a.type === 'assignment').reduce((sum, a) => sum + a.points, 0)}</p>
                <p className="text-xs text-dark-secondary mt-1">Assignment Points</p>
              </div>
              <div className="bg-dark-hover p-4 rounded-lg text-center">
                <p className="text-2xl font-bold text-purple-400">{recentActivities.filter(a => a.type === 'peer').reduce((sum, a) => sum + a.points, 0)}</p>
                <p className="text-xs text-dark-secondary mt-1">Collaboration Points</p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 p-4 rounded-lg border border-purple-500/30">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-dark-secondary">Next Milestone</p>
                  <p className="text-lg font-semibold text-dark-primary">{Math.ceil(totalPoints / 100) * 100} points</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-purple-400">{Math.ceil(totalPoints / 100) * 100 - totalPoints}</p>
                  <p className="text-xs text-dark-secondary">points to go</p>
                </div>
              </div>
              <Progress value={(totalPoints % 100)} className="h-2 mt-3" />
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Engagement Breakdown Dialog */}
      <Dialog open={breakdownOpen} onOpenChange={setBreakdownOpen}>
        <DialogContent className="bg-dark-card border-dark-color text-dark-primary max-w-3xl">
          <DialogHeader>
            <DialogTitle className="flex items-center text-2xl">
              <TrendingUp className="w-6 h-6 mr-2 text-blue-400" />
              Detailed Engagement Breakdown
            </DialogTitle>
            <DialogDescription className="text-dark-secondary">
              Comprehensive analysis of your learning activity distribution
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6 mt-4">
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-dark-hover p-4 rounded-lg">
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={engagementBreakdown}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {engagementBreakdown.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1E293B', 
                        border: '1px solid #374151',
                        borderRadius: '8px',
                        color: '#FFFFFF'
                      }} 
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              
              <div className="space-y-3">
                {engagementBreakdown.map((item, index) => (
                  <div key={index} className="bg-dark-hover p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                        <span className="text-sm font-medium text-dark-primary">{item.name}</span>
                      </div>
                      <span className="text-sm font-semibold" style={{ color: item.color }}>{item.value}%</span>
                    </div>
                    <Progress value={item.value} className="h-1.5" />
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {engagementBreakdown.map((item, index) => (
                <div key={index} className="bg-dark-hover p-4 rounded-lg border" style={{ borderColor: `${item.color}40` }}>
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${item.color}20` }}>
                      {item.name.includes('Discussion') ? <MessageSquare className="w-5 h-5" style={{ color: item.color }} /> :
                       item.name.includes('Assignment') ? <Award className="w-5 h-5" style={{ color: item.color }} /> :
                       item.name.includes('Quiz') ? <Clock className="w-5 h-5" style={{ color: item.color }} /> :
                       item.name.includes('Peer') ? <Users className="w-5 h-5" style={{ color: item.color }} /> :
                       <Eye className="w-5 h-5" style={{ color: item.color }} />}
                    </div>
                    <div>
                      <h4 className="font-semibold text-dark-primary">{item.name}</h4>
                      <p className="text-2xl font-bold" style={{ color: item.color }}>{item.value}%</p>
                    </div>
                  </div>
                  <p className="text-xs text-dark-secondary">
                    {item.name.includes('Discussion') ? `${Math.round(totalDiscussions * item.value / 100)} posts contributed to discussions` :
                     item.name.includes('Assignment') ? `${Math.round(item.value / 5)} assignments submitted early` :
                     item.name.includes('Quiz') ? `${Math.round(item.value / 3)} quiz participations` :
                     item.name.includes('Peer') ? `${Math.round(item.value / 2)} peer interactions` :
                     `${Math.round(item.value)} resources shared`}
                  </p>
                </div>
              ))}
            </div>

            <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 p-6 rounded-lg border border-blue-500/30">
              <h4 className="font-semibold text-dark-primary mb-3">Key Insights</h4>
              <ul className="space-y-2 text-sm text-dark-secondary">
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2">•</span>
                  <span>Your primary engagement comes from {engagementBreakdown.sort((a, b) => b.value - a.value)[0].name.toLowerCase()}</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">•</span>
                  <span>You have a well-balanced engagement profile across different activities</span>
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-400 mr-2">•</span>
                  <span>Consider increasing {engagementBreakdown.sort((a, b) => a.value - b.value)[0].name.toLowerCase()} for more well-rounded participation</span>
                </li>
              </ul>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}