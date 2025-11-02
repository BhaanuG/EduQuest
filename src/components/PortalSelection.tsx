import { GraduationCap, Users } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";

interface PortalSelectionProps {
  onPortalSelect: (portal: "student" | "teacher") => void;
}

export function PortalSelection({ onPortalSelect }: PortalSelectionProps) {
  return (
    <div className="min-h-screen flex items-center justify-center p-6" style={{ 
      fontFamily: 'Inter, system-ui, sans-serif',
      background: 'linear-gradient(to bottom right, #0f1922 0%, #1a2332 25%, #1e2a3a 50%, #1a3333 75%, #1e3a3a 100%)'
    }}>
      <div className="max-w-4xl w-full">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="flex items-center justify-center mb-6">
            <div className="w-32 h-32 bg-gradient-to-br from-blue-600 to-purple-500 rounded-3xl flex items-center justify-center shadow-2xl shadow-purple-500/50 relative overflow-hidden animate-bounce-in">
              <span className="text-white font-bold text-4xl relative z-10">EQ</span>
            </div>
          </div>
          <h1 className="text-4xl font-bold text-white mb-4 animate-slide-up">EduQuest Path</h1>
          <p className="text-xl text-slate-300 animate-slide-up" style={{ animationDelay: '0.2s' }}>Learning Management Platform</p>
        </div>

        {/* Portal Selection Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
          {/* Student Portal */}
          <Card className="bg-slate-900/60 backdrop-blur-sm border-slate-700/50 hover:border-green-500/50 hover:shadow-xl hover:shadow-green-500/10 transition-all duration-300 cursor-pointer group" onClick={() => onPortalSelect("student")}>
            <CardHeader className="text-center p-8">
              <div className="w-20 h-20 bg-gradient-to-br from-green-600 to-green-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-green-500/30">
                <GraduationCap className="w-10 h-10 text-white" />
              </div>
              <CardTitle className="text-2xl text-white">Student Portal</CardTitle>
              <CardDescription className="text-slate-300 mt-2">
                Access your courses, assignments, grades, and connect with classmates
              </CardDescription>
            </CardHeader>
            <CardContent className="p-8 pt-0">
              <Button className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-3 rounded-xl shadow-lg shadow-cyan-600/30 transition-all">
                Continue as Student
              </Button>
            </CardContent>
          </Card>

          {/* Teacher Portal */}
          <Card className="bg-slate-900/60 backdrop-blur-sm border-slate-700/50 hover:border-purple-500/50 hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-300 cursor-pointer group hover-lift animate-slide-in-right" onClick={() => onPortalSelect("teacher")}>
            <CardHeader className="text-center p-8">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-purple-500/30">
                <Users className="w-10 h-10 text-white" />
              </div>
              <CardTitle className="text-2xl text-white">Teacher Portal</CardTitle>
              <CardDescription className="text-slate-300 mt-2">
                Manage students, track progress, create assignments, and view analytics
              </CardDescription>
            </CardHeader>
            <CardContent className="p-8 pt-0">
              <Button className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-3 rounded-xl shadow-lg shadow-cyan-600/30 transition-all">
                Continue as Teacher
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <div className="text-center mt-12">
          <p className="text-sm text-slate-400">
            Need help? Contact support at{" "}
            <a href="mailto:support@eduquestpath.com" className="text-cyan-400 hover:text-cyan-300 hover:underline">
              support@eduquestpath.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}