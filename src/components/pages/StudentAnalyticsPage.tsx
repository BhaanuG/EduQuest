import { useState } from "react";
import { BarChart3, TrendingUp, PieChart, Calendar, Clock, Target, ArrowUp, Activity, BookOpen } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Progress } from "../ui/progress";
import { Badge } from "../ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";
import { ScrollArea } from "../ui/scroll-area";

interface StudentAnalyticsPageProps {
  user: any;
}

// Function to generate UNIQUE insights per student based on their roll number
function getUniquePerformanceInsights(user: any) {
  const rollHash = parseInt(user.rollNo.slice(-4)) % 10;
  
  const insightVariations = [
    [
      "Your consistency in submitting assignments has improved by 15% this month",
      "Evening study sessions show 22% higher retention rate",
      "Your problem-solving speed increased by 18% in recent quizzes"
    ],
    [
      "Interactive learning activities boost your performance by 25%",
      "Early morning study hours correlate with 20% better quiz scores",
      "Peer collaboration improved your assignment quality by 30%"
    ],
    [
      "Video-based learning materials improve your retention by 28%",
      "Weekend study sessions show 19% better concentration levels",
      "Practice tests have increased your accuracy by 24%"
    ],
    [
      "Your engagement in discussions has boosted comprehension by 21%",
      "Hands-on practical work improves your learning efficiency by 26%",
      "Regular review sessions enhance retention by 17%"
    ],
    [
      "Reading course materials beforehand increases participation by 23%",
      "Your note-taking strategy has improved recall by 20%",
      "Group study sessions boost your confidence by 27%"
    ],
    [
      "Breaking study time into focused intervals improved productivity by 29%",
      "Visual learning aids enhance your understanding by 22%",
      "Taking short breaks between topics increases retention by 18%"
    ],
    [
      "Your analytical thinking skills improved by 25% this semester",
      "Project-based learning aligns perfectly with your learning style",
      "Concept mapping techniques boosted comprehension by 21%"
    ],
    [
      "Your time management skills show 24% improvement",
      "Active recall practice increased memory retention by 26%",
      "Explaining concepts to others enhanced your understanding by 19%"
    ],
    [
      "Your problem-solving approach has become 23% more efficient",
      "Lab sessions significantly boost your practical understanding",
      "Regular practice improves your speed and accuracy by 20%"
    ],
    [
      "Your critical thinking abilities have grown by 22%",
      "Self-assessment practices improved learning outcomes by 25%",
      "Connecting theory to real-world examples enhances retention by 18%"
    ]
  ];
  
  return insightVariations[rollHash];
}

// Function to generate personalized study time data based on department and performance
function getPersonalizedStudyTimeData(user: any) {
  const performanceMultiplier = user.cgpa / 10;
  
  const departmentSubjects = {
    "Computer Science": [
      { subject: "Data Structures", hours: Math.round(40 + performanceMultiplier * 15), target: 50, percentage: Math.round((40 + performanceMultiplier * 15) / 50 * 100) },
      { subject: "Database Systems", hours: Math.round(35 + performanceMultiplier * 12), target: 40, percentage: Math.round((35 + performanceMultiplier * 12) / 40 * 100) },
      { subject: "Computer Networks", hours: Math.round(30 + performanceMultiplier * 18), target: 45, percentage: Math.round((30 + performanceMultiplier * 18) / 45 * 100) },
      { subject: "Software Engineering", hours: Math.round(38 + performanceMultiplier * 10), target: 42, percentage: Math.round((38 + performanceMultiplier * 10) / 42 * 100) }
    ],
    "Electronics": [
      { subject: "Digital Signal Processing", hours: Math.round(42 + performanceMultiplier * 12), target: 48, percentage: Math.round((42 + performanceMultiplier * 12) / 48 * 100) },
      { subject: "VLSI Design", hours: Math.round(36 + performanceMultiplier * 15), target: 45, percentage: Math.round((36 + performanceMultiplier * 15) / 45 * 100) },
      { subject: "Communication Systems", hours: Math.round(33 + performanceMultiplier * 14), target: 40, percentage: Math.round((33 + performanceMultiplier * 14) / 40 * 100) },
      { subject: "Microprocessors", hours: Math.round(39 + performanceMultiplier * 11), target: 44, percentage: Math.round((39 + performanceMultiplier * 11) / 44 * 100) }
    ],
    "Mechanical": [
      { subject: "Thermodynamics", hours: Math.round(38 + performanceMultiplier * 16), target: 46, percentage: Math.round((38 + performanceMultiplier * 16) / 46 * 100) },
      { subject: "Fluid Mechanics", hours: Math.round(34 + performanceMultiplier * 14), target: 42, percentage: Math.round((34 + performanceMultiplier * 14) / 42 * 100) },
      { subject: "Machine Design", hours: Math.round(41 + performanceMultiplier * 12), target: 48, percentage: Math.round((41 + performanceMultiplier * 12) / 48 * 100) },
      { subject: "Manufacturing Processes", hours: Math.round(36 + performanceMultiplier * 13), target: 44, percentage: Math.round((36 + performanceMultiplier * 13) / 44 * 100) }
    ],
    "Information Technology": [
      { subject: "Web Development", hours: Math.round(43 + performanceMultiplier * 12), target: 50, percentage: Math.round((43 + performanceMultiplier * 12) / 50 * 100) },
      { subject: "Database Systems", hours: Math.round(37 + performanceMultiplier * 11), target: 42, percentage: Math.round((37 + performanceMultiplier * 11) / 42 * 100) },
      { subject: "Cybersecurity", hours: Math.round(35 + performanceMultiplier * 15), target: 45, percentage: Math.round((35 + performanceMultiplier * 15) / 45 * 100) },
      { subject: "Cloud Computing", hours: Math.round(40 + performanceMultiplier * 10), target: 46, percentage: Math.round((40 + performanceMultiplier * 10) / 46 * 100) }
    ],
    "Civil": [
      { subject: "Structural Engineering", hours: Math.round(39 + performanceMultiplier * 14), target: 47, percentage: Math.round((39 + performanceMultiplier * 14) / 47 * 100) },
      { subject: "Environmental Engineering", hours: Math.round(32 + performanceMultiplier * 16), target: 43, percentage: Math.round((32 + performanceMultiplier * 16) / 43 * 100) },
      { subject: "Geotechnical Engineering", hours: Math.round(37 + performanceMultiplier * 13), target: 45, percentage: Math.round((37 + performanceMultiplier * 13) / 45 * 100) },
      { subject: "Construction Management", hours: Math.round(35 + performanceMultiplier * 12), target: 41, percentage: Math.round((35 + performanceMultiplier * 12) / 41 * 100) }
    ]
  };
  
  return departmentSubjects[user.department] || [];
}

// Function to generate personalized weekly progress
function getPersonalizedWeeklyProgress(user: any) {
  const basePerformance = Math.round(user.cgpa * 10);
  const variation = 8; // Weekly variation
  
  return [
    { week: "Week 1", completed: Math.max(60, Math.min(100, basePerformance - variation + Math.random() * 5)) },
    { week: "Week 2", completed: Math.max(60, Math.min(100, basePerformance + Math.random() * 8)) },
    { week: "Week 3", completed: Math.max(60, Math.min(100, basePerformance - variation/2 + Math.random() * 6)) },
    { week: "Week 4", completed: Math.max(60, Math.min(100, basePerformance + variation + Math.random() * 4)) }
  ];
}

// Function to generate personalized performance metrics
function getPersonalizedPerformanceMetrics(user: any) {
  const performanceLevel = user.cgpa >= 9.0 ? 'excellent' : user.cgpa >= 8.5 ? 'very_good' : user.cgpa >= 8.0 ? 'good' : 'average';
  
  const baseMetrics = {
    excellent: { completion: 97, studyHours: 7.2, quiz: 94, participation: 28 },
    very_good: { completion: 93, studyHours: 6.8, quiz: 89, participation: 24 },
    good: { completion: 88, studyHours: 6.2, quiz: 84, participation: 20 },
    average: { completion: 82, studyHours: 5.6, quiz: 78, participation: 16 }
  };
  
  const metrics = baseMetrics[performanceLevel];
  
  return [
    { label: "Assignment Completion Rate", value: `${metrics.completion}%`, trend: `+${(Math.random() * 4 + 1).toFixed(1)}%`, color: "green" },
    { label: "Average Study Hours/Day", value: metrics.studyHours.toString(), trend: `+${(Math.random() * 1.2 + 0.3).toFixed(1)}`, color: "blue" },
    { label: "Quiz Performance", value: `${metrics.quiz}%`, trend: `+${(Math.random() * 6 + 2).toFixed(1)}%`, color: "purple" },
    { label: "Discussion Participation", value: metrics.participation.toString(), trend: `+${Math.round(Math.random() * 8 + 3)}`, color: "orange" }
  ];
}

export function StudentAnalyticsPage({ user }: StudentAnalyticsPageProps) {
  const [selectedDialog, setSelectedDialog] = useState<string | null>(null);
  
  // Get personalized data for this student
  const studyTimeData = getPersonalizedStudyTimeData(user);
  const weeklyProgress = getPersonalizedWeeklyProgress(user);
  const performanceMetrics = getPersonalizedPerformanceMetrics(user);
  const uniqueInsights = getUniquePerformanceInsights(user);
  
  // Get unique metric colors based on student
  const getMetricColor = (index: number) => {
    const colors = ['green', 'blue', 'purple', 'orange'];
    return colors[index];
  };
  
  return (
    <>
      {/* Header */}
      <header className="bg-dark-bg border-b border-dark-color px-8 py-8 animate-fade-in">
        <div className="flex items-center justify-between">
          <div className="animate-slide-in-left">
            <h1 className="text-3xl font-bold text-dark-primary">Learning Analytics</h1>
            <p className="text-dark-secondary mt-2">Detailed insights into your academic performance</p>
          </div>
          <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 px-4 py-2 animate-scale-in">
            <BarChart3 className="w-4 h-4 mr-2" />
            Analytics Dashboard
          </Badge>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-auto p-8 space-y-8">
        {/* Performance Metrics - Enhanced with animations */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {performanceMetrics.map((metric, index) => {
            const color = getMetricColor(index);
            return (
              <Card 
                key={index} 
                className="bg-dark-card border-dark-color cursor-pointer hover-lift hover-glow transition-all duration-300 stagger-animation group"
                onClick={() => setSelectedDialog(metric.label.toLowerCase().replace(/\s+/g, '-').replace(/\//g, '-'))}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl bg-${color}-500/10 flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}>
                      {index === 0 && <Target className={`w-6 h-6 text-${color}-400`} />}
                      {index === 1 && <Clock className={`w-6 h-6 text-${color}-400`} />}
                      {index === 2 && <TrendingUp className={`w-6 h-6 text-${color}-400`} />}
                      {index === 3 && <PieChart className={`w-6 h-6 text-${color}-400`} />}
                    </div>
                    <Badge className={`bg-${color}-500/20 text-${color}-400 animate-bounce-in flex items-center gap-1`}>
                      <ArrowUp className="w-3 h-3" />
                      {metric.trend}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-sm text-dark-secondary mb-1">{metric.label}</p>
                    <p className="text-3xl font-bold text-dark-primary transition-all duration-300 group-hover:text-blue-400">{metric.value}</p>
                  </div>
                  <div className="mt-4 pt-4 border-t border-dark-border opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="text-xs text-dark-secondary">Click for details →</p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Study Time Distribution - Enhanced animations */}
          <Card className="bg-dark-card border-dark-color animate-slide-in-left hover-lift transition-all duration-300">
            <CardHeader>
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-blue-400" />
                <CardTitle className="text-dark-primary">Study Time Distribution</CardTitle>
              </div>
              <CardDescription className="text-dark-secondary">Hours spent per subject this month</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {studyTimeData.map((subject, index) => (
                <div key={index} className="space-y-2 group animate-fade-in" style={{ animationDelay: `${0.4 + index * 0.1}s` }}>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-dark-primary font-medium group-hover:text-blue-400 transition-colors">{subject.subject}</span>
                    <span className="text-dark-secondary">{subject.hours}h / {subject.target}h</span>
                  </div>
                  <div className="relative">
                    <Progress value={subject.percentage} className="h-2 transition-all duration-500 group-hover:h-3" />
                    <div className="absolute -top-6 right-0 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Badge className="bg-blue-500/20 text-blue-400 text-xs">{subject.percentage}%</Badge>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Weekly Progress - Enhanced animations */}
          <Card className="bg-dark-card border-dark-card animate-slide-in-right hover-lift transition-all duration-300">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-green-400" />
                <CardTitle className="text-dark-primary">Weekly Progress</CardTitle>
              </div>
              <CardDescription className="text-dark-secondary">Task completion rate per week</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {weeklyProgress.map((week, index) => (
                <div key={index} className="space-y-2 group animate-fade-in" style={{ animationDelay: `${0.4 + index * 0.1}s` }}>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-dark-primary font-medium group-hover:text-green-400 transition-colors">{week.week}</span>
                    <span className="text-dark-secondary">{week.completed.toFixed(0)}% complete</span>
                  </div>
                  <div className="relative">
                    <Progress value={week.completed} className="h-2 transition-all duration-500 group-hover:h-3" />
                    <div className="absolute -top-6 right-0 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Badge className="bg-green-500/20 text-green-400 text-xs">{week.completed.toFixed(0)}%</Badge>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Performance Insights - UNIQUE per student - Enhanced animations */}
        <Card className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-blue-500/30 animate-scale-in hover-glow transition-all duration-300">
          <CardHeader>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-purple-400" />
              <CardTitle className="text-dark-primary">Performance Insights</CardTitle>
            </div>
            <CardDescription className="text-dark-secondary">Personalized recommendations based on your learning patterns</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {uniqueInsights.map((insight, index) => (
                <div 
                  key={index} 
                  className="flex items-start space-x-3 p-4 bg-dark-hover rounded-lg hover:bg-dark-table-hover transition-all duration-300 hover-lift cursor-pointer group animate-slide-up"
                  style={{ animationDelay: `${0.6 + index * 0.1}s` }}
                >
                  <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 group-hover:scale-150 transition-transform duration-300" />
                  <p className="text-dark-primary flex-1 group-hover:text-blue-300 transition-colors">{insight}</p>
                  <Badge className="opacity-0 group-hover:opacity-100 transition-opacity bg-blue-500/20 text-blue-400 text-xs">
                    Insight #{index + 1}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>

      {/* Dialogs for metric details */}
      <Dialog open={selectedDialog === 'assignment-completion-rate'} onOpenChange={(open) => !open && setSelectedDialog(null)}>
        <DialogContent className="bg-dark-card border-dark-color max-w-2xl animate-scale-in">
          <DialogHeader>
            <DialogTitle className="text-dark-primary flex items-center gap-2">
              <Target className="w-5 h-5 text-green-400" />
              Assignment Completion Rate
            </DialogTitle>
            <DialogDescription className="text-dark-secondary">
              Detailed breakdown of your assignment submissions
            </DialogDescription>
          </DialogHeader>
          <ScrollArea className="max-h-[500px] pr-4">
            <div className="space-y-4 mt-4">
              <div className="p-6 bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-lg text-center border border-green-500/20 hover-lift">
                <div className="text-5xl font-bold text-dark-primary animate-bounce-in">{performanceMetrics[0].value}</div>
                <div className="text-sm text-dark-secondary mt-2">Overall Completion Rate</div>
                <Badge className="mt-3 bg-green-500/20 text-green-400">
                  <ArrowUp className="w-3 h-3 mr-1" />
                  {performanceMetrics[0].trend} from last month
                </Badge>
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                <div className="p-4 bg-dark-hover rounded-lg text-center hover-lift cursor-pointer group">
                  <div className="text-2xl font-bold text-green-400 group-hover:scale-110 transition-transform">On Time</div>
                  <div className="text-xl text-dark-primary mt-2">
                    {Math.round(parseInt(performanceMetrics[0].value) * 0.87)}%
                  </div>
                  <Progress value={87} className="h-1 mt-2" />
                </div>
                <div className="p-4 bg-dark-hover rounded-lg text-center hover-lift cursor-pointer group">
                  <div className="text-2xl font-bold text-yellow-400 group-hover:scale-110 transition-transform">Late</div>
                  <div className="text-xl text-dark-primary mt-2">
                    {Math.round(parseInt(performanceMetrics[0].value) * 0.10)}%
                  </div>
                  <Progress value={10} className="h-1 mt-2" />
                </div>
                <div className="p-4 bg-dark-hover rounded-lg text-center hover-lift cursor-pointer group">
                  <div className="text-2xl font-bold text-red-400 group-hover:scale-110 transition-transform">Missed</div>
                  <div className="text-xl text-dark-primary mt-2">
                    {Math.round(parseInt(performanceMetrics[0].value) * 0.03)}%
                  </div>
                  <Progress value={3} className="h-1 mt-2" />
                </div>
              </div>
              
              <div className="space-y-2">
                <h4 className="text-dark-primary font-semibold mb-3">Subject-wise Completion</h4>
                {studyTimeData.map((subject, index) => (
                  <div key={index} className="p-3 bg-dark-hover rounded-lg hover-lift hover-glow cursor-pointer transition-all group">
                    <div className="flex justify-between items-center">
                      <span className="text-dark-primary group-hover:text-green-400 transition-colors">{subject.subject}</span>
                      <Badge className="bg-green-500/20 text-green-400">
                        {Math.min(100, subject.percentage + 5)}%
                      </Badge>
                    </div>
                    <Progress value={Math.min(100, subject.percentage + 5)} className="h-1 mt-2" />
                  </div>
                ))}
              </div>
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>

      <Dialog open={selectedDialog === 'average-study-hours-day'} onOpenChange={(open) => !open && setSelectedDialog(null)}>
        <DialogContent className="bg-dark-card border-dark-color max-w-2xl animate-scale-in">
          <DialogHeader>
            <DialogTitle className="text-dark-primary flex items-center gap-2">
              <Clock className="w-5 h-5 text-blue-400" />
              Average Study Hours per Day
            </DialogTitle>
            <DialogDescription className="text-dark-secondary">
              Your daily study time analysis
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div className="p-6 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-lg text-center border border-blue-500/20 hover-lift">
              <div className="text-5xl font-bold text-dark-primary animate-bounce-in">{performanceMetrics[1].value}</div>
              <div className="text-sm text-dark-secondary mt-2">Hours per Day</div>
              <Badge className="mt-3 bg-blue-500/20 text-blue-400">
                <ArrowUp className="w-3 h-3 mr-1" />
                {performanceMetrics[1].trend} hours from last month
              </Badge>
            </div>
            
            <div className="space-y-3">
              <div className="p-4 bg-dark-hover rounded-lg hover-lift hover-glow cursor-pointer group transition-all">
                <div className="flex justify-between mb-2">
                  <span className="text-dark-primary group-hover:text-blue-400 transition-colors">Weekday Average</span>
                  <span className="text-blue-400 font-semibold">{(parseFloat(performanceMetrics[1].value) + 0.5).toFixed(1)}h</span>
                </div>
                <Progress value={75} className="h-2 group-hover:h-3 transition-all" />
              </div>
              
              <div className="p-4 bg-dark-hover rounded-lg hover-lift hover-glow cursor-pointer group transition-all">
                <div className="flex justify-between mb-2">
                  <span className="text-dark-primary group-hover:text-blue-400 transition-colors">Weekend Average</span>
                  <span className="text-blue-400 font-semibold">{(parseFloat(performanceMetrics[1].value) - 0.3).toFixed(1)}h</span>
                </div>
                <Progress value={65} className="h-2 group-hover:h-3 transition-all" />
              </div>
              
              <div className="p-4 bg-dark-hover rounded-lg hover-lift hover-glow cursor-pointer group transition-all">
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-dark-primary block font-medium group-hover:text-blue-400 transition-colors">Peak Study Time</span>
                    <span className="text-xs text-dark-secondary">Most productive hours</span>
                  </div>
                  <Badge className="bg-blue-500/20 text-blue-400">8:00 PM - 10:00 PM</Badge>
                </div>
              </div>
              
              <div className="p-4 bg-dark-hover rounded-lg hover-lift hover-glow cursor-pointer group transition-all">
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-dark-primary block font-medium group-hover:text-blue-400 transition-colors">Total Study Hours</span>
                    <span className="text-xs text-dark-secondary">This month</span>
                  </div>
                  <span className="text-2xl font-bold text-blue-400">{(parseFloat(performanceMetrics[1].value) * 30).toFixed(0)}h</span>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={selectedDialog === 'quiz-performance'} onOpenChange={(open) => !open && setSelectedDialog(null)}>
        <DialogContent className="bg-dark-card border-dark-color max-w-2xl animate-scale-in">
          <DialogHeader>
            <DialogTitle className="text-dark-primary flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-purple-400" />
              Quiz Performance
            </DialogTitle>
            <DialogDescription className="text-dark-secondary">
              Your quiz scores and improvements
            </DialogDescription>
          </DialogHeader>
          <ScrollArea className="h-[400px] pr-4">
            <div className="space-y-4 mt-4">
              <div className="p-6 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-lg text-center border border-purple-500/20 hover-lift">
                <div className="text-5xl font-bold text-dark-primary animate-bounce-in">{performanceMetrics[2].value}</div>
                <div className="text-sm text-dark-secondary mt-2">Average Quiz Score</div>
                <Badge className="mt-3 bg-purple-500/20 text-purple-400">
                  <ArrowUp className="w-3 h-3 mr-1" />
                  {performanceMetrics[2].trend} improvement
                </Badge>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-dark-hover rounded-lg text-center hover-lift cursor-pointer group">
                  <div className="text-xl font-bold text-purple-400 group-hover:scale-110 transition-transform">Highest</div>
                  <div className="text-2xl text-dark-primary mt-2">{Math.min(100, parseInt(performanceMetrics[2].value) + 5)}%</div>
                  <p className="text-xs text-dark-secondary mt-1">Best performance</p>
                </div>
                <div className="p-4 bg-dark-hover rounded-lg text-center hover-lift cursor-pointer group">
                  <div className="text-xl font-bold text-purple-400 group-hover:scale-110 transition-transform">Lowest</div>
                  <div className="text-2xl text-dark-primary mt-2">{Math.max(60, parseInt(performanceMetrics[2].value) - 12)}%</div>
                  <p className="text-xs text-dark-secondary mt-1">Room for improvement</p>
                </div>
              </div>
              
              <div className="space-y-2">
                <h4 className="text-dark-primary font-semibold mb-3">Subject-wise Performance</h4>
                {studyTimeData.map((subject, index) => (
                  <div key={index} className="p-4 bg-dark-hover rounded-lg hover-lift hover-glow cursor-pointer transition-all group">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="text-dark-primary font-semibold group-hover:text-purple-400 transition-colors">{subject.subject}</h4>
                        <p className="text-sm text-dark-secondary">Last 5 quizzes</p>
                      </div>
                      <Badge className="bg-purple-500/20 text-purple-400">
                        {Math.min(100, subject.percentage - 3)}%
                      </Badge>
                    </div>
                    <Progress value={Math.min(100, subject.percentage - 3)} className="h-2 mt-2 group-hover:h-3 transition-all" />
                  </div>
                ))}
              </div>
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>

      <Dialog open={selectedDialog === 'discussion-participation'} onOpenChange={(open) => !open && setSelectedDialog(null)}>
        <DialogContent className="bg-dark-card border-dark-color max-w-2xl animate-scale-in">
          <DialogHeader>
            <DialogTitle className="text-dark-primary flex items-center gap-2">
              <PieChart className="w-5 h-5 text-orange-400" />
              Discussion Participation
            </DialogTitle>
            <DialogDescription className="text-dark-secondary">
              Your engagement in class discussions and forums
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div className="p-6 bg-gradient-to-br from-orange-500/10 to-amber-500/10 rounded-lg text-center border border-orange-500/20 hover-lift">
              <div className="text-5xl font-bold text-dark-primary animate-bounce-in">{performanceMetrics[3].value}</div>
              <div className="text-sm text-dark-secondary mt-2">Total Contributions This Month</div>
              <Badge className="mt-3 bg-orange-500/20 text-orange-400">
                <ArrowUp className="w-3 h-3 mr-1" />
                {performanceMetrics[3].trend} more than last month
              </Badge>
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              <div className="p-4 bg-dark-hover rounded-lg text-center hover-lift cursor-pointer group">
                <div className="text-2xl font-bold text-orange-400 group-hover:scale-110 transition-transform">{Math.round(parseInt(performanceMetrics[3].value) * 0.6)}</div>
                <div className="text-xs text-dark-secondary mt-1">Posts Created</div>
                <Progress value={60} className="h-1 mt-2" />
              </div>
              <div className="p-4 bg-dark-hover rounded-lg text-center hover-lift cursor-pointer group">
                <div className="text-2xl font-bold text-orange-400 group-hover:scale-110 transition-transform">{Math.round(parseInt(performanceMetrics[3].value) * 0.3)}</div>
                <div className="text-xs text-dark-secondary mt-1">Replies</div>
                <Progress value={30} className="h-1 mt-2" />
              </div>
              <div className="p-4 bg-dark-hover rounded-lg text-center hover-lift cursor-pointer group">
                <div className="text-2xl font-bold text-orange-400 group-hover:scale-110 transition-transform">{Math.round(parseInt(performanceMetrics[3].value) * 0.1)}</div>
                <div className="text-xs text-dark-secondary mt-1">Questions Asked</div>
                <Progress value={10} className="h-1 mt-2" />
              </div>
            </div>
            
            <div className="p-4 bg-dark-hover rounded-lg hover-lift">
              <h4 className="text-dark-primary font-semibold mb-3">Most Active Subjects</h4>
              {studyTimeData.slice(0, 3).map((subject, index) => (
                <div key={index} className="flex justify-between items-center mb-2 p-2 hover:bg-dark-table-hover rounded transition-all cursor-pointer group">
                  <span className="text-dark-secondary group-hover:text-orange-400 transition-colors">{subject.subject}</span>
                  <Badge className="bg-orange-500/20 text-orange-400">
                    {Math.round(parseInt(performanceMetrics[3].value) * (0.4 - index * 0.1))} posts
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}