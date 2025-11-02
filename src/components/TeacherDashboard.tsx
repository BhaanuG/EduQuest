import { useState } from "react";
import { 
  BarChart3, 
  FileText, 
  TrendingUp, 
  Users, 
  BookOpen,
  User,
  LogOut,
  ClipboardList,
  Calendar as CalendarIcon
} from "lucide-react";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { TeacherDashboardPage } from "./pages/TeacherDashboardPage";
import { TeacherReportsPage } from "./pages/TeacherReportsPage";
import { TeacherProgressPage } from "./pages/TeacherProgressPage";
import { TeacherStudentsPage } from "./pages/TeacherStudentsPage";
import { TeacherCoursesPage } from "./pages/TeacherCoursesPage";
import { TeacherMyAccountPage } from "./pages/TeacherMyAccountPage";
import { TeacherAssignmentsPage } from "./pages/TeacherAssignmentsPage";
import { TeacherCalendarPage } from "./pages/TeacherCalendarPage";

const teacherNavItems = [
  { icon: BarChart3, label: "Dashboard", active: true },
  { icon: FileText, label: "Reports" },
  { icon: TrendingUp, label: "Progress" },
  { icon: Users, label: "Students" },
  { icon: BookOpen, label: "Registered Courses" },
  { icon: ClipboardList, label: "Assignments" },
  { icon: CalendarIcon, label: "Calendar" },
  { icon: User, label: "My Account" },
];

interface TeacherDashboardProps {
  user: any;
  onLogout: () => void;
}

export function TeacherDashboard({ user, onLogout }: TeacherDashboardProps) {
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
        return <TeacherDashboardPage user={user} />;
      case "Reports":
        return <TeacherReportsPage user={user} />;
      case "Progress":
        return <TeacherProgressPage user={user} />;
      case "Students":
        return <TeacherStudentsPage user={user} />;
      case "Registered Courses":
        return <TeacherCoursesPage user={user} />;
      case "Assignments":
        return <TeacherAssignmentsPage user={user} />;
      case "Calendar":
        return <TeacherCalendarPage user={user} />;
      case "My Account":
        return <TeacherMyAccountPage user={user} />;
      default:
        return <TeacherDashboardPage user={user} />;
    }
  };

  return (
    <div className="flex h-screen bg-dark-bg" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
      {/* Sidebar */}
      <div className="w-72 bg-dark-bg border-r border-dark-color flex flex-col">
        {/* Logo */}
        <div className="p-8 border-b border-dark-color">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-purple-500 rounded-2xl flex items-center justify-center dark-shadow-lg relative overflow-hidden">
              <span className="text-white font-bold text-lg relative z-10">EQ</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-dark-primary font-[Marcellus_SC]">EduQuest Path</h1>
              <p className="text-xs text-dark-secondary font-medium">Teacher Portal</p>
            </div>
          </div>
        </div>

        {/* User Info */}
        <div className="p-6 border-b border-dark-color">
          <div className="space-y-2">
            <h3 className="font-semibold text-dark-primary">{user.name}</h3>
            <p className="text-sm text-dark-secondary">{user.designation}</p>
            <p className="text-xs text-dark-secondary">{user.department} Department</p>
            <p className="text-xs text-dark-secondary">{user.email}</p>
          </div>
        </div>
        
        {/* Navigation */}
        <nav className="flex-1 p-6 space-y-8 overflow-y-auto">
          {/* Main Navigation */}
          <div className="space-y-2">
            {teacherNavItems.map((item) => renderNavItem(item, activePage === item.label))}
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