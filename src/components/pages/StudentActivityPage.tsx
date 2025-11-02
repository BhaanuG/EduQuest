import { useState } from "react";
import { Zap, FileText, MessageSquare, Book, Clock, Calendar, CheckCircle, TrendingUp, Target, Award, Download, BarChart3 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";
import { motion } from "motion/react";

interface StudentActivityPageProps {
  user: any;
}

// Function to generate personalized recent activities
function getPersonalizedActivities(user: any) {
  const rollNoSeed = parseInt(user.rollNo.slice(-3));
  const baseDate = new Date();
  
  const departmentActivities = {
    "Computer Science": [
      {
        type: "assignment",
        title: `Submitted Advanced DSA Assignment ${user.semester}`,
        description: "Binary Search Tree with AVL balancing",
        subject: "Data Structures & Algorithms",
        points: user.cgpa >= 9.0 ? 15 : user.cgpa >= 8.5 ? 12 : 10
      },
      {
        type: "discussion",
        title: "Posted in Database Systems Forum",
        description: "Query optimization techniques discussion",
        subject: "Database Management Systems",
        points: 5
      },
      {
        type: "quiz",
        title: "Completed Computer Networks Quiz",
        description: "OSI Model and TCP/IP protocols",
        subject: "Computer Networks",
        points: user.cgpa >= 8.5 ? 18 : 15
      },
      {
        type: "resource",
        title: "Downloaded Software Engineering Materials",
        description: "Design patterns and UML diagrams",
        subject: "Software Engineering",
        points: 3
      }
    ],
    "Electronics": [
      {
        type: "assignment",
        title: `Submitted DSP Lab Assignment ${user.semester}`,
        description: "Digital filter design using MATLAB",
        subject: "Digital Signal Processing",
        points: user.cgpa >= 9.0 ? 16 : user.cgpa >= 8.5 ? 13 : 11
      },
      {
        type: "discussion",
        title: "Posted in VLSI Design Forum",
        description: "CMOS technology scaling discussion",
        subject: "VLSI Design",
        points: 6
      },
      {
        type: "quiz",
        title: "Completed Communication Systems Quiz",
        description: "Modulation techniques and applications",
        subject: "Communication Systems",
        points: user.cgpa >= 8.5 ? 17 : 14
      },
      {
        type: "resource",
        title: "Downloaded Microprocessor Lab Manual",
        description: "8086 assembly programming guide",
        subject: "Microprocessors",
        points: 2
      }
    ],
    "Mechanical": [
      {
        type: "assignment",
        title: `Submitted Thermal Analysis Project ${user.semester}`,
        description: "Heat exchanger design calculations",
        subject: "Thermodynamics",
        points: user.cgpa >= 9.0 ? 14 : user.cgpa >= 8.5 ? 11 : 9
      },
      {
        type: "discussion",
        title: "Posted in Fluid Mechanics Forum",
        description: "Bernoulli's equation applications",
        subject: "Fluid Mechanics",
        points: 4
      },
      {
        type: "quiz",
        title: "Completed Machine Design Quiz",
        description: "Shaft design and stress analysis",
        subject: "Machine Design",
        points: user.cgpa >= 8.5 ? 16 : 13
      },
      {
        type: "resource",
        title: "Downloaded Manufacturing Processes Guide",
        description: "CNC machining and tooling",
        subject: "Manufacturing Processes",
        points: 3
      }
    ],
    "Information Technology": [
      {
        type: "assignment",
        title: `Submitted Web Development Project ${user.semester}`,
        description: "Full-stack e-commerce application",
        subject: "Web Development",
        points: user.cgpa >= 9.0 ? 18 : user.cgpa >= 8.5 ? 15 : 12
      },
      {
        type: "discussion",
        title: "Posted in Cybersecurity Forum",
        description: "Web application security vulnerabilities",
        subject: "Cybersecurity",
        points: 7
      },
      {
        type: "quiz",
        title: "Completed Cloud Computing Quiz",
        description: "AWS services and deployment models",
        subject: "Cloud Computing",
        points: user.cgpa >= 8.5 ? 19 : 16
      },
      {
        type: "resource",
        title: "Downloaded Database Systems Resources",
        description: "NoSQL databases and scalability",
        subject: "Database Systems",
        points: 4
      }
    ],
    "Civil": [
      {
        type: "assignment",
        title: `Submitted Structural Design Project ${user.semester}`,
        description: "Reinforced concrete beam analysis",
        subject: "Structural Engineering",
        points: user.cgpa >= 9.0 ? 15 : user.cgpa >= 8.5 ? 12 : 10
      },
      {
        type: "discussion",
        title: "Posted in Environmental Engineering Forum",
        description: "Wastewater treatment processes",
        subject: "Environmental Engineering",
        points: 5
      },
      {
        type: "quiz",
        title: "Completed Geotechnical Engineering Quiz",
        description: "Soil mechanics and foundation design",
        subject: "Geotechnical Engineering",
        points: user.cgpa >= 8.5 ? 17 : 14
      },
      {
        type: "resource",
        title: "Downloaded Construction Management Guide",
        description: "Project scheduling and cost estimation",
        subject: "Construction Management",
        points: 3
      }
    ]
  };

  const activities = departmentActivities[user.department] || [];
  
  return activities.map((activity, index) => {
    const daysAgo = Math.floor((rollNoSeed + index * 7) % 15 + 1); // 1-15 days ago
    const hoursAgo = Math.floor((rollNoSeed + index * 3) % 12 + 1); // 1-12 hours ago within that day
    
    return {
      id: rollNoSeed + index + 1,
      type: activity.type,
      title: activity.title,
      description: activity.description,
      timestamp: new Date(baseDate.getTime() - daysAgo * 24 * 60 * 60 * 1000 - hoursAgo * 60 * 60 * 1000).toLocaleString('en-US', {
        year: 'numeric',
        month: '2-digit', 
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      }),
      subject: activity.subject,
      status: rollNoSeed % 3 === index % 3 ? "completed" : "active",
      points: activity.points
    };
  });
}

// Function to generate weekly activity data
function getWeeklyActivity(user: any) {
  const rollNoSeed = parseInt(user.rollNo.slice(-3));
  const baseActivity = user.cgpa >= 9.0 ? 85 : user.cgpa >= 8.5 ? 75 : user.cgpa >= 8.0 ? 65 : 55;
  
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  
  return days.map((day, index) => {
    const variance = (rollNoSeed + index * 11) % 20 - 10; // -10 to +10 variance
    const activity = Math.max(20, Math.min(100, baseActivity + variance));
    
    return {
      day: day,
      activity: activity,
      assignments: Math.floor((rollNoSeed + index) % 4 + 1),
      discussions: Math.floor((rollNoSeed + index * 3) % 3 + 1),
      resources: Math.floor((rollNoSeed + index * 5) % 5 + 2)
    };
  });
}

// Function to generate engagement metrics
function getEngagementMetrics(user: any) {
  const rollNoSeed = parseInt(user.rollNo.slice(-3));
  const performanceMultiplier = user.cgpa >= 9.0 ? 1.3 : user.cgpa >= 8.5 ? 1.15 : user.cgpa >= 8.0 ? 1.0 : 0.85;
  
  return [
    {
      title: "Study Sessions",
      value: Math.floor((45 + (rollNoSeed % 20)) * performanceMultiplier),
      change: `+${(Math.random() * 15 + 5).toFixed(1)}%`,
      icon: Book,
      iconColor: "text-blue-400",
      isPositive: true
    },
    {
      title: "Discussion Posts",
      value: Math.floor((12 + (rollNoSeed % 8)) * performanceMultiplier),
      change: `+${(Math.random() * 20 + 10).toFixed(1)}%`,
      icon: MessageSquare,
      iconColor: "text-green-400", 
      isPositive: true
    },
    {
      title: "Resources Downloaded",
      value: Math.floor((28 + (rollNoSeed % 15)) * performanceMultiplier),
      change: `+${(Math.random() * 12 + 8).toFixed(1)}%`,
      icon: Download,
      iconColor: "text-purple-400",
      isPositive: true
    },
    {
      title: "Activity Points",
      value: Math.floor((150 + (rollNoSeed % 50)) * performanceMultiplier),
      change: `+${(Math.random() * 18 + 12).toFixed(1)}%`,
      icon: Award,
      iconColor: "text-orange-400",
      isPositive: true
    }
  ];
}

export function StudentActivityPage({ user }: StudentActivityPageProps) {
  // Get personalized data for this student
  const recentActivities = getPersonalizedActivities(user);
  const weeklyActivity = getWeeklyActivity(user);
  const engagementMetrics = getEngagementMetrics(user);
  
  const totalPoints = recentActivities.reduce((sum, activity) => sum + activity.points, 0);
  const avgActivity = Math.round(weeklyActivity.reduce((sum, day) => sum + day.activity, 0) / weeklyActivity.length);

  // Dialog states
  const [studySessionsOpen, setStudySessionsOpen] = useState(false);
  const [discussionPostsOpen, setDiscussionPostsOpen] = useState(false);
  const [resourcesDownloadedOpen, setResourcesDownloadedOpen] = useState(false);
  const [activityPointsOpen, setActivityPointsOpen] = useState(false);
  const [weeklyOverviewOpen, setWeeklyOverviewOpen] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState<any>(null);

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'assignment': return FileText;
      case 'discussion': return MessageSquare;
      case 'quiz': return CheckCircle;
      case 'resource': return Download;
      default: return Zap;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'assignment': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'discussion': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'quiz': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'resource': return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
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
          <div>
            <motion.h1 
              className="text-3xl font-bold text-dark-primary"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              Learning Activity
            </motion.h1>
            <motion.p 
              className="text-dark-secondary mt-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              Track your engagement and learning progress - {user.department}
            </motion.p>
          </div>
          <motion.div 
            className="flex items-center space-x-4"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30 px-4 py-2">
              <Zap className="w-4 h-4 mr-2" />
              {totalPoints} Points This Week
            </Badge>
            <Badge className="bg-green-500/20 text-green-400 border-green-500/30 px-4 py-2">
              <TrendingUp className="w-4 h-4 mr-2" />
              {avgActivity}% Avg Activity
            </Badge>
          </motion.div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="flex-1 overflow-auto p-8 space-y-8">
        {/* Engagement Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {engagementMetrics.map((metric, index) => {
            const Icon = metric.icon;
            const handleClick = () => {
              if (metric.title === "Study Sessions") setStudySessionsOpen(true);
              else if (metric.title === "Discussion Posts") setDiscussionPostsOpen(true);
              else if (metric.title === "Resources Downloaded") setResourcesDownloadedOpen(true);
              else if (metric.title === "Activity Points") setActivityPointsOpen(true);
            };
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * (index + 1), duration: 0.5 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Card 
                  className="bg-dark-card border-dark-color cursor-pointer transition-all hover:border-opacity-100 hover:shadow-lg"
                  style={{ borderColor: metric.iconColor.replace('text-', 'rgba(') + '50' }}
                  onClick={handleClick}
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
                          <span className="text-sm text-dark-secondary">this month</span>
                        </div>
                      </div>
                      <div className="w-12 h-12 rounded-xl bg-dark-hover flex items-center justify-center">
                        <Icon className={`w-6 h-6 ${metric.iconColor}`} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Weekly Activity Chart */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            whileHover={{ scale: 1.01 }}
          >
            <Card 
              className="bg-dark-card border-dark-color cursor-pointer transition-all hover:border-blue-500/50"
              onClick={() => setWeeklyOverviewOpen(true)}
            >
              <CardHeader>
                <CardTitle className="text-dark-primary">Weekly Activity Overview</CardTitle>
                <CardDescription className="text-dark-secondary">Your learning activity pattern this week (Click for details)</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={weeklyActivity}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="day" stroke="#94A3B8" />
                      <YAxis stroke="#94A3B8" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#1E293B', 
                          border: '1px solid #374151',
                          borderRadius: '8px' 
                        }}
                        labelStyle={{ color: '#FFFFFF' }}
                      />
                      <Bar dataKey="activity" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Activity Breakdown */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <Card className="bg-dark-card border-dark-color">
              <CardHeader>
                <CardTitle className="text-dark-primary">Activity Breakdown</CardTitle>
                <CardDescription className="text-dark-secondary">Distribution of your learning activities</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <motion.div 
                  className="space-y-4"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.4 }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-4 h-4 bg-blue-500 rounded"></div>
                      <span className="text-dark-primary">Assignments</span>
                    </div>
                    <span className="text-dark-secondary">
                      {weeklyActivity.reduce((sum, day) => sum + day.assignments, 0)}
                    </span>
                  </div>
                  <Progress value={75} className="h-2 bg-dark-bg" />
                </motion.div>

                <motion.div 
                  className="space-y-4"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7, duration: 0.4 }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-4 h-4 bg-green-500 rounded"></div>
                      <span className="text-dark-primary">Discussions</span>
                    </div>
                    <span className="text-dark-secondary">
                      {weeklyActivity.reduce((sum, day) => sum + day.discussions, 0)}
                    </span>
                  </div>
                  <Progress value={60} className="h-2 bg-dark-bg" />
                </motion.div>

                <motion.div 
                  className="space-y-4"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.4 }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-4 h-4 bg-orange-500 rounded"></div>
                      <span className="text-dark-primary">Resources</span>
                    </div>
                    <span className="text-dark-secondary">
                      {weeklyActivity.reduce((sum, day) => sum + day.resources, 0)}
                    </span>
                  </div>
                  <Progress value={85} className="h-2 bg-dark-bg" />
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Recent Activities */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.5 }}
        >
          <Card className="bg-dark-card border-dark-color">
            <CardHeader>
              <CardTitle className="text-dark-primary">Recent Activities</CardTitle>
              <CardDescription className="text-dark-secondary">Your latest learning activities and achievements (Click for details)</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => {
                  const Icon = getActivityIcon(activity.type);
                  return (
                    <motion.div 
                      key={activity.id} 
                      className="flex items-start space-x-4 p-4 bg-dark-hover rounded-lg cursor-pointer transition-all hover:bg-dark-card"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.0 + index * 0.05, duration: 0.4 }}
                      whileHover={{ scale: 1.01, x: 5 }}
                      onClick={() => setSelectedActivity(activity)}
                    >
                      <div className="w-10 h-10 bg-dark-card rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-dark-secondary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div className="space-y-1">
                            <h4 className="font-medium text-dark-primary">{activity.title}</h4>
                            <p className="text-sm text-dark-secondary">{activity.description}</p>
                            <div className="flex items-center space-x-4 text-xs text-dark-secondary">
                              <span>{activity.subject}</span>
                              <span>•</span>
                              <span>{activity.timestamp}</span>
                            </div>
                          </div>
                          <div className="flex items-center space-x-3 flex-shrink-0">
                            <Badge className={getActivityColor(activity.type)}>
                              +{activity.points} pts
                            </Badge>
                            <Badge className={`${activity.status === 'completed' ? 'bg-green-500/20 text-green-400 border-green-500/30' : 'bg-blue-500/20 text-blue-400 border-blue-500/30'}`}>
                              {activity.status === 'completed' ? (
                                <CheckCircle className="w-3 h-3 mr-1" />
                              ) : (
                                <Clock className="w-3 h-3 mr-1" />
                              )}
                              {activity.status === 'completed' ? 'Completed' : 'Active'}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Achievement Badge */}
        {user.cgpa >= 8.5 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.2, duration: 0.5 }}
          >
            <Card className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 border-purple-500/30">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                    <Award className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-dark-primary">High Achiever!</h3>
                    <p className="text-dark-secondary mt-1">
                      Excellent engagement, {user.name.split(' ')[0]}! Your CGPA of {user.cgpa}/10.0 reflects your consistent effort and participation.
                    </p>
                  </div>
                  <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30 px-4 py-2">
                    Active Learner
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </main>

      {/* Dialogs for Clickable Metrics */}
      {/* Study Sessions Dialog */}
      <Dialog open={studySessionsOpen} onOpenChange={setStudySessionsOpen}>
        <DialogContent className="bg-dark-card border-dark-color text-dark-primary max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center text-2xl">
              <Book className="w-6 h-6 mr-2 text-blue-400" />
              Study Sessions Details
            </DialogTitle>
            <DialogDescription className="text-dark-secondary">
              Complete overview of your study session activities
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6 mt-4">
            <div className="bg-dark-hover p-6 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h3 className="text-4xl font-bold text-blue-400">{engagementMetrics[0].value}</h3>
                  <p className="text-dark-secondary mt-1">Total Study Sessions</p>
                </div>
                <div className="w-16 h-16 rounded-xl bg-blue-500/20 flex items-center justify-center">
                  <Book className="w-8 h-8 text-blue-400" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="bg-dark-hover p-4 rounded-lg">
                <p className="text-sm text-dark-secondary mb-1">This Week</p>
                <p className="text-2xl font-bold text-dark-primary">{Math.floor(engagementMetrics[0].value / 4)}</p>
                <p className="text-xs text-dark-secondary mt-1">Sessions</p>
              </div>
              <div className="bg-dark-hover p-4 rounded-lg">
                <p className="text-sm text-dark-secondary mb-1">Avg Duration</p>
                <p className="text-2xl font-bold text-blue-400">2.5h</p>
                <p className="text-xs text-dark-secondary mt-1">Per session</p>
              </div>
              <div className="bg-dark-hover p-4 rounded-lg">
                <p className="text-sm text-dark-secondary mb-1">Total Hours</p>
                <p className="text-2xl font-bold text-green-400">{Math.floor(engagementMetrics[0].value * 2.5)}</p>
                <p className="text-xs text-dark-secondary mt-1">This month</p>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold text-dark-primary">Recent Study Sessions</h4>
              {recentActivities.filter(a => a.type === 'assignment' || a.type === 'quiz').map((activity, index) => (
                <div key={index} className="bg-dark-hover p-3 rounded-lg flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-dark-primary">{activity.subject}</p>
                    <p className="text-xs text-dark-secondary">{activity.timestamp}</p>
                  </div>
                  <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                    2-3 hours
                  </Badge>
                </div>
              ))}
            </div>

            <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 p-4 rounded-lg border border-blue-500/30">
              <h4 className="font-semibold text-dark-primary mb-2">Study Insights</h4>
              <ul className="space-y-2 text-sm text-dark-secondary">
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">✓</span>
                  <span>You're {engagementMetrics[0].change} more active compared to last month</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2">•</span>
                  <span>Most productive time: {Math.random() > 0.5 ? 'Evenings (6-9 PM)' : 'Mornings (9-11 AM)'}</span>
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
              <MessageSquare className="w-6 h-6 mr-2 text-green-400" />
              Discussion Posts Details
            </DialogTitle>
            <DialogDescription className="text-dark-secondary">
              Your forum participation and engagement metrics
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6 mt-4">
            <div className="bg-dark-hover p-6 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h3 className="text-4xl font-bold text-green-400">{engagementMetrics[1].value}</h3>
                  <p className="text-dark-secondary mt-1">Total Discussion Posts</p>
                </div>
                <div className="w-16 h-16 rounded-xl bg-green-500/20 flex items-center justify-center">
                  <MessageSquare className="w-8 h-8 text-green-400" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-dark-hover p-4 rounded-lg">
                <p className="text-sm text-dark-secondary mb-1">Replies Received</p>
                <p className="text-2xl font-bold text-dark-primary">{Math.floor(engagementMetrics[1].value * 3.5)}</p>
                <p className="text-xs text-dark-secondary mt-1">Total responses</p>
              </div>
              <div className="bg-dark-hover p-4 rounded-lg">
                <p className="text-sm text-dark-secondary mb-1">Likes</p>
                <p className="text-2xl font-bold text-green-400">{Math.floor(engagementMetrics[1].value * 5.2)}</p>
                <p className="text-xs text-dark-secondary mt-1">On your posts</p>
              </div>
              <div className="bg-dark-hover p-4 rounded-lg">
                <p className="text-sm text-dark-secondary mb-1">Most Active</p>
                <p className="text-lg font-bold text-blue-400">{user.department}</p>
                <p className="text-xs text-dark-secondary mt-1">Subject forum</p>
              </div>
              <div className="bg-dark-hover p-4 rounded-lg">
                <p className="text-sm text-dark-secondary mb-1">Helpful Marks</p>
                <p className="text-2xl font-bold text-purple-400">{Math.floor(engagementMetrics[1].value * 2.3)}</p>
                <p className="text-xs text-dark-secondary mt-1">Received</p>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold text-dark-primary">Recent Posts</h4>
              {recentActivities.filter(a => a.type === 'discussion').map((activity, index) => (
                <div key={index} className="bg-dark-hover p-3 rounded-lg">
                  <p className="text-sm font-medium text-dark-primary mb-1">{activity.title}</p>
                  <p className="text-xs text-dark-secondary mb-2">{activity.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-dark-secondary">{activity.timestamp}</span>
                    <div className="flex items-center space-x-2 text-xs">
                      <span className="text-green-400">{Math.floor(Math.random() * 10 + 5)} likes</span>
                      <span className="text-blue-400">{Math.floor(Math.random() * 5 + 2)} replies</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Resources Downloaded Dialog */}
      <Dialog open={resourcesDownloadedOpen} onOpenChange={setResourcesDownloadedOpen}>
        <DialogContent className="bg-dark-card border-dark-color text-dark-primary max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center text-2xl">
              <Download className="w-6 h-6 mr-2 text-purple-400" />
              Resources Downloaded Details
            </DialogTitle>
            <DialogDescription className="text-dark-secondary">
              Materials and resources you've accessed
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6 mt-4">
            <div className="bg-dark-hover p-6 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h3 className="text-4xl font-bold text-purple-400">{engagementMetrics[2].value}</h3>
                  <p className="text-dark-secondary mt-1">Total Resources Downloaded</p>
                </div>
                <div className="w-16 h-16 rounded-xl bg-purple-500/20 flex items-center justify-center">
                  <Download className="w-8 h-8 text-purple-400" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="bg-dark-hover p-4 rounded-lg text-center">
                <p className="text-2xl font-bold text-blue-400">{Math.floor(engagementMetrics[2].value * 0.4)}</p>
                <p className="text-xs text-dark-secondary mt-1">PDFs</p>
              </div>
              <div className="bg-dark-hover p-4 rounded-lg text-center">
                <p className="text-2xl font-bold text-green-400">{Math.floor(engagementMetrics[2].value * 0.35)}</p>
                <p className="text-xs text-dark-secondary mt-1">Videos</p>
              </div>
              <div className="bg-dark-hover p-4 rounded-lg text-center">
                <p className="text-2xl font-bold text-orange-400">{Math.floor(engagementMetrics[2].value * 0.25)}</p>
                <p className="text-xs text-dark-secondary mt-1">Documents</p>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold text-dark-primary">Recently Downloaded</h4>
              {recentActivities.filter(a => a.type === 'resource').map((activity, index) => (
                <div key={index} className="bg-dark-hover p-3 rounded-lg flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Download className="w-4 h-4 text-purple-400" />
                    <div>
                      <p className="text-sm font-medium text-dark-primary">{activity.title}</p>
                      <p className="text-xs text-dark-secondary">{activity.subject} • {activity.timestamp}</p>
                    </div>
                  </div>
                  <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">
                    PDF
                  </Badge>
                </div>
              ))}
            </div>

            <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 p-4 rounded-lg border border-purple-500/30">
              <h4 className="font-semibold text-dark-primary mb-2">Resource Insights</h4>
              <p className="text-sm text-dark-secondary">
                You're actively using learning resources with {engagementMetrics[2].change} increase this month. Keep accessing quality materials!
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Activity Points Dialog */}
      <Dialog open={activityPointsOpen} onOpenChange={setActivityPointsOpen}>
        <DialogContent className="bg-dark-card border-dark-color text-dark-primary max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center text-2xl">
              <Award className="w-6 h-6 mr-2 text-orange-400" />
              Activity Points Details
            </DialogTitle>
            <DialogDescription className="text-dark-secondary">
              Points earned through learning activities
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6 mt-4">
            <div className="bg-dark-hover p-6 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h3 className="text-4xl font-bold text-orange-400">{engagementMetrics[3].value}</h3>
                  <p className="text-dark-secondary mt-1">Total Activity Points</p>
                </div>
                <div className="w-16 h-16 rounded-xl bg-orange-500/20 flex items-center justify-center">
                  <Award className="w-8 h-8 text-orange-400" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-dark-hover p-4 rounded-lg">
                <p className="text-sm text-dark-secondary mb-1">This Week</p>
                <p className="text-2xl font-bold text-dark-primary">{totalPoints}</p>
                <p className="text-xs text-dark-secondary mt-1">Points earned</p>
              </div>
              <div className="bg-dark-hover p-4 rounded-lg">
                <p className="text-sm text-dark-secondary mb-1">Next Milestone</p>
                <p className="text-2xl font-bold text-purple-400">{Math.ceil(engagementMetrics[3].value / 100) * 100}</p>
                <p className="text-xs text-dark-secondary mt-1">{Math.ceil(engagementMetrics[3].value / 100) * 100 - engagementMetrics[3].value} to go</p>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold text-dark-primary">Points Breakdown</h4>
              {[
                { type: 'Assignments', points: Math.floor(totalPoints * 0.5), color: 'blue' },
                { type: 'Discussions', points: Math.floor(totalPoints * 0.2), color: 'green' },
                { type: 'Quizzes', points: Math.floor(totalPoints * 0.25), color: 'purple' },
                { type: 'Resources', points: Math.floor(totalPoints * 0.05), color: 'orange' }
              ].map((item, index) => (
                <div key={index} className="bg-dark-hover p-3 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-dark-primary">{item.type}</span>
                    <span className={`text-sm font-semibold text-${item.color}-400`}>+{item.points} pts</span>
                  </div>
                  <Progress value={(item.points / totalPoints) * 100} className="h-1.5" />
                </div>
              ))}
            </div>

            <div className="bg-gradient-to-r from-orange-500/10 to-yellow-500/10 p-4 rounded-lg border border-orange-500/30">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-dark-secondary">Progress to Milestone</p>
                  <p className="text-lg font-semibold text-dark-primary">{engagementMetrics[3].value} / {Math.ceil(engagementMetrics[3].value / 100) * 100} points</p>
                </div>
                <Target className="w-8 h-8 text-orange-400" />
              </div>
              <Progress value={(engagementMetrics[3].value % 100)} className="h-2 mt-3" />
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Weekly Overview Dialog */}
      <Dialog open={weeklyOverviewOpen} onOpenChange={setWeeklyOverviewOpen}>
        <DialogContent className="bg-dark-card border-dark-color text-dark-primary max-w-3xl">
          <DialogHeader>
            <DialogTitle className="flex items-center text-2xl">
              <BarChart3 className="w-6 h-6 mr-2 text-blue-400" />
              Weekly Activity Overview Analysis
            </DialogTitle>
            <DialogDescription className="text-dark-secondary">
              Detailed breakdown of your weekly learning pattern
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6 mt-4">
            <div className="bg-dark-hover p-4 rounded-lg">
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={weeklyActivity}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="day" stroke="#94A3B8" />
                  <YAxis stroke="#94A3B8" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1E293B', 
                      border: '1px solid #374151',
                      borderRadius: '8px' 
                    }}
                    labelStyle={{ color: '#FFFFFF' }}
                  />
                  <Bar dataKey="activity" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="bg-dark-hover p-4 rounded-lg text-center">
                <p className="text-sm text-dark-secondary mb-1">Average</p>
                <p className="text-2xl font-bold text-blue-400">{avgActivity}%</p>
                <p className="text-xs text-dark-secondary mt-1">Weekly activity</p>
              </div>
              <div className="bg-dark-hover p-4 rounded-lg text-center">
                <p className="text-sm text-dark-secondary mb-1">Most Active</p>
                <p className="text-2xl font-bold text-green-400">
                  {weeklyActivity.sort((a, b) => b.activity - a.activity)[0]?.day}
                </p>
                <p className="text-xs text-dark-secondary mt-1">
                  {Math.max(...weeklyActivity.map(d => d.activity))}% activity
                </p>
              </div>
              <div className="bg-dark-hover p-4 rounded-lg text-center">
                <p className="text-sm text-dark-secondary mb-1">Total Activities</p>
                <p className="text-2xl font-bold text-purple-400">
                  {weeklyActivity.reduce((sum, day) => sum + day.assignments + day.discussions + day.resources, 0)}
                </p>
                <p className="text-xs text-dark-secondary mt-1">This week</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-dark-hover p-4 rounded-lg">
                <h4 className="font-semibold text-dark-primary mb-3">Day-by-Day Breakdown</h4>
                <div className="space-y-2">
                  {weeklyActivity.map((day, index) => (
                    <div key={index} className="flex items-center justify-between text-sm">
                      <span className="text-dark-primary">{day.day}</span>
                      <div className="flex items-center space-x-3">
                        <Progress value={day.activity} className="h-1.5 w-20" />
                        <span className="text-blue-400 font-semibold w-12">{day.activity}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-dark-hover p-4 rounded-lg">
                <h4 className="font-semibold text-dark-primary mb-3">Activity Types</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-blue-500 rounded"></div>
                      <span className="text-sm text-dark-primary">Assignments</span>
                    </div>
                    <span className="text-sm font-semibold text-blue-400">
                      {weeklyActivity.reduce((sum, day) => sum + day.assignments, 0)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-green-500 rounded"></div>
                      <span className="text-sm text-dark-primary">Discussions</span>
                    </div>
                    <span className="text-sm font-semibold text-green-400">
                      {weeklyActivity.reduce((sum, day) => sum + day.discussions, 0)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-orange-500 rounded"></div>
                      <span className="text-sm text-dark-primary">Resources</span>
                    </div>
                    <span className="text-sm font-semibold text-orange-400">
                      {weeklyActivity.reduce((sum, day) => sum + day.resources, 0)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 p-4 rounded-lg border border-blue-500/30">
              <h4 className="font-semibold text-dark-primary mb-2">Weekly Insights</h4>
              <ul className="space-y-2 text-sm text-dark-secondary">
                <li className="flex items-start">
                  <TrendingUp className="w-4 h-4 mr-2 text-green-400 mt-0.5" />
                  <span>Your most productive day is {weeklyActivity.sort((a, b) => b.activity - a.activity)[0]?.day}</span>
                </li>
                <li className="flex items-start">
                  <Clock className="w-4 h-4 mr-2 text-blue-400 mt-0.5" />
                  <span>Consistent activity pattern throughout the week</span>
                </li>
                <li className="flex items-start">
                  <Target className="w-4 h-4 mr-2 text-purple-400 mt-0.5" />
                  <span>Keep maintaining this balanced approach across different activities</span>
                </li>
              </ul>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Selected Activity Dialog */}
      <Dialog open={!!selectedActivity} onOpenChange={() => setSelectedActivity(null)}>
        <DialogContent className="bg-dark-card border-dark-color text-dark-primary max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center text-2xl">
              {selectedActivity && (() => {
                const Icon = getActivityIcon(selectedActivity.type);
                return <Icon className="w-6 h-6 mr-2 text-blue-400" />;
              })()}
              Activity Details
            </DialogTitle>
            <DialogDescription className="text-dark-secondary">
              Complete information about this learning activity
            </DialogDescription>
          </DialogHeader>
          {selectedActivity && (
            <div className="space-y-6 mt-4">
              <div className="bg-dark-hover p-6 rounded-lg">
                <h3 className="text-xl font-bold text-dark-primary mb-2">{selectedActivity.title}</h3>
                <p className="text-dark-secondary">{selectedActivity.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-dark-hover p-4 rounded-lg">
                  <p className="text-sm text-dark-secondary mb-1">Subject</p>
                  <p className="text-lg font-bold text-dark-primary">{selectedActivity.subject}</p>
                </div>
                <div className="bg-dark-hover p-4 rounded-lg">
                  <p className="text-sm text-dark-secondary mb-1">Status</p>
                  <Badge className={`${selectedActivity.status === 'completed' ? 'bg-green-500/20 text-green-400 border-green-500/30' : 'bg-blue-500/20 text-blue-400 border-blue-500/30'}`}>
                    {selectedActivity.status === 'completed' ? (
                      <CheckCircle className="w-3 h-3 mr-1" />
                    ) : (
                      <Clock className="w-3 h-3 mr-1" />
                    )}
                    {selectedActivity.status === 'completed' ? 'Completed' : 'Active'}
                  </Badge>
                </div>
                <div className="bg-dark-hover p-4 rounded-lg">
                  <p className="text-sm text-dark-secondary mb-1">Points Earned</p>
                  <p className="text-2xl font-bold text-orange-400">+{selectedActivity.points}</p>
                </div>
                <div className="bg-dark-hover p-4 rounded-lg">
                  <p className="text-sm text-dark-secondary mb-1">Timestamp</p>
                  <p className="text-sm font-medium text-dark-primary">{selectedActivity.timestamp}</p>
                </div>
              </div>

              <div className="bg-dark-hover p-4 rounded-lg">
                <h4 className="font-semibold text-dark-primary mb-3">Activity Type</h4>
                <Badge className={getActivityColor(selectedActivity.type)}>
                  {selectedActivity.type.charAt(0).toUpperCase() + selectedActivity.type.slice(1)}
                </Badge>
              </div>

              <div className="bg-gradient-to-r from-blue-500/10 to-green-500/10 p-4 rounded-lg border border-blue-500/30">
                <h4 className="font-semibold text-dark-primary mb-2">Activity Impact</h4>
                <p className="text-sm text-dark-secondary">
                  This activity contributed {selectedActivity.points} points to your total score and helped improve your {selectedActivity.subject} engagement.
                  {selectedActivity.status === 'completed' && ' Great job on completing this!'}
                </p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}