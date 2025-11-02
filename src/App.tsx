import { useState } from "react";
import { PortalSelection } from "./components/PortalSelection";
import { StudentLogin } from "./components/StudentLogin";
import { TeacherLogin } from "./components/TeacherLogin";
import { StudentDashboard } from "./components/StudentDashboard";
import { TeacherDashboard } from "./components/TeacherDashboard";

export default function App() {
  const [currentView, setCurrentView] = useState<"portal-selection" | "student-login" | "teacher-login" | "student-dashboard" | "teacher-dashboard">("portal-selection");
  const [currentUser, setCurrentUser] = useState<any>(null);

  const handlePortalSelect = (portal: "student" | "teacher") => {
    if (portal === "student") {
      setCurrentView("student-login");
    } else {
      setCurrentView("teacher-login");
    }
  };

  const handleStudentLogin = (student: any) => {
    setCurrentUser(student);
    setCurrentView("student-dashboard");
  };

  const handleTeacherLogin = (teacher: any) => {
    setCurrentUser(teacher);
    setCurrentView("teacher-dashboard");
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentView("portal-selection");
  };

  switch (currentView) {
    case "portal-selection":
      return <PortalSelection onPortalSelect={handlePortalSelect} />;
    case "student-login":
      return <StudentLogin onLogin={handleStudentLogin} onBack={() => setCurrentView("portal-selection")} />;
    case "teacher-login":
      return <TeacherLogin onLogin={handleTeacherLogin} onBack={() => setCurrentView("portal-selection")} />;
    case "student-dashboard":
      return <StudentDashboard user={currentUser} onLogout={handleLogout} />;
    case "teacher-dashboard":
      return <TeacherDashboard user={currentUser} onLogout={handleLogout} />;
    default:
      return <PortalSelection onPortalSelect={handlePortalSelect} />;
  }
}