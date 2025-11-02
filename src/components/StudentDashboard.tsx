import { useState } from "react";
import { 
  BarChart3, 
  FileText, 
  BookOpen, 
  Settings, 
  Brain, 
  Heart, 
  Quote, 
  Search, 
  Zap, 
  HelpCircle, 
  Puzzle, 
  User,
  LogOut,
  MessageCircle,
  Trophy,
  Target,
  TrendingUp,
  Mail,
  Calendar as CalendarIcon
} from "lucide-react";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { StudentDashboardPage } from "./pages/StudentDashboardPage";
import { StudentCoursesPage } from "./pages/StudentCoursesPage";
import { StudentProgressPage } from "./pages/StudentProgressPage";
import { StudentEngagementPage } from "./pages/StudentEngagementPage";
import { StudentResourcesPage } from "./pages/StudentResourcesPage";
import { StudentActivityPage } from "./pages/StudentActivityPage";
import { StudentGroupChatPage } from "./pages/StudentGroupChatPage";
import { StudentAnalyticsPage } from "./pages/StudentAnalyticsPage";
import { StudentAssignmentsPage } from "./pages/StudentAssignmentsPage";
import { StudentAttendancePage } from "./pages/StudentAttendancePage";
import { StudentHelpCenterPage } from "./pages/StudentHelpCenterPage";
import { StudentIntegrationsPage } from "./pages/StudentIntegrationsPage";
import { StudentMyAccountPage } from "./pages/StudentMyAccountPage";
import { StudentMailsPage } from "./pages/StudentMailsPage";
import { StudentCalendarPage } from "./pages/StudentCalendarPage";

const mainNavItems = [
  { icon: BarChart3, label: "Dashboard", active: true },
  { icon: FileText, label: "Analytics" },
  { icon: BookOpen, label: "Courses" },
  { icon: Settings, label: "Upcoming Assignments" },
];

const learningItems = [
  { icon: Brain, label: "Progress" },
  { icon: Heart, label: "Engagement" },
  { icon: Quote, label: "Resources" },
];

const performanceItems = [
  { icon: Search, label: "Attendance" },
  { icon: Zap, label: "Activity" },
];

const otherItems = [
  { icon: Mail, label: "Mails" },
  { icon: CalendarIcon, label: "Calendar" },
  { icon: MessageCircle, label: "Group Chat" },
  { icon: HelpCircle, label: "Help Center" },
  { icon: Puzzle, label: "Integrations" },
  { icon: User, label: "My Account" },
];

interface StudentDashboardProps {
  user: any;
  onLogout: () => void;
}

export function StudentDashboard({ user, onLogout }: StudentDashboardProps) {
  const [activePage, setActivePage] = useState("Dashboard");

  const renderNavItem = (item: any, isActive: boolean) => {
    const Icon = item.icon;
    return (
      <button
        key={item.label}
        onClick={() => setActivePage(item.label)}
        className={`dark-nav-item w-full text-left ${
          isActive ? "dark-nav-item-active" : ""
        }`}
      >
        <Icon className={`w-5 h-5 ${isActive ? "text-dark-primary" : "text-dark-secondary"}`} />
        <span>{item.label}</span>
      </button>
    );
  };

  const renderContent = () => {
    switch (activePage) {
      case "Dashboard":
        return <StudentDashboardPage user={user} />;
      case "Analytics":
        return <StudentAnalyticsPage user={user} />;
      case "Courses":
        return <StudentCoursesPage user={user} />;
      case "Upcoming Assignments":
        return <StudentAssignmentsPage user={user} />;
      case "Progress":
        return <StudentProgressPage user={user} />;
      case "Engagement":
        return <StudentEngagementPage user={user} />;
      case "Resources":
        return <StudentResourcesPage user={user} />;
      case "Attendance":
        return <StudentAttendancePage user={user} />;
      case "Activity":
        return <StudentActivityPage user={user} />;
      case "Mails":
        return <StudentMailsPage user={user} />;
      case "Calendar":
        return <StudentCalendarPage user={user} />;
      case "Group Chat":
        return <StudentGroupChatPage user={user} />;
      case "Help Center":
        return <StudentHelpCenterPage user={user} />;
      case "Integrations":
        return <StudentIntegrationsPage user={user} />;
      case "My Account":
        return <StudentMyAccountPage user={user} />;
      default:
        return <StudentDashboardPage user={user} />;
    }
  };

  return (
    <div className="flex h-screen bg-dark-bg" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
      {/* Sidebar */}
      <div className="w-72 bg-dark-bg border-r border-dark-color flex flex-col">
        {/* Logo */}
        <div className="p-8 border-b border-dark-color">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-green-500 rounded-2xl flex items-center justify-center dark-shadow-lg relative overflow-hidden">
              <span className="text-white font-bold text-lg relative z-10">EQ</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-dark-primary font-[Marcellus_SC]">EduQuest Path</h1>
              <p className="text-xs text-dark-secondary font-medium">Student Portal</p>
            </div>
          </div>
        </div>

        {/* User Info */}
        <div className="p-6 border-b border-dark-color">
          <div className="space-y-2">
            <h3 className="font-semibold text-dark-primary">{user.name}</h3>
            <p className="text-sm text-dark-secondary">{user.rollNo}</p>
            <div className="flex items-center space-x-2">
              <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                CGPA: {user.cgpa}/10.0
              </Badge>
              <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                Sem {user.semester}
              </Badge>
            </div>
            <p className="text-xs text-dark-secondary">{user.department}</p>
          </div>
        </div>
        
        {/* Navigation */}
        <nav className="flex-1 p-6 space-y-8 overflow-y-auto">
          {/* Main Navigation */}
          <div className="space-y-2">
            {mainNavItems.map((item) => renderNavItem(item, activePage === item.label))}
          </div>

          <Separator style={{ backgroundColor: '#374151' }} />

          {/* Learning Group */}
          <div className="space-y-4">
            <div className="px-4">
              <h3 className="text-xs font-bold text-dark-secondary uppercase tracking-widest">Learning</h3>
            </div>
            <div className="space-y-2">
              {learningItems.map((item) => renderNavItem(item, activePage === item.label))}
            </div>
          </div>

          <Separator style={{ backgroundColor: '#374151' }} />

          {/* Performance Group */}
          <div className="space-y-4">
            <div className="px-4">
              <h3 className="text-xs font-bold text-dark-secondary uppercase tracking-widest">Performance</h3>
            </div>
            <div className="space-y-2">
              {performanceItems.map((item) => renderNavItem(item, activePage === item.label))}
            </div>
          </div>

          <Separator style={{ backgroundColor: '#374151' }} />

          {/* Other */}
          <div className="space-y-4">
            <div className="px-4">
              <h3 className="text-xs font-bold text-dark-secondary uppercase tracking-widest">Other</h3>
            </div>
            <div className="space-y-2">
              {otherItems.map((item) => renderNavItem(item, activePage === item.label))}
            </div>
          </div>
        </nav>

        {/* Logout Button */}
        <div className="p-6 border-t border-dark-color">
          <Button 
            onClick={onLogout}
            className="w-full dark-button-secondary flex items-center justify-center space-x-2"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {renderContent()}
      </div>
    </div>
  );
}