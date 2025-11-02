import { useState } from "react";
import { ArrowLeft, Eye, EyeOff, Users } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { authenticateTeacher } from "./TeacherData";

interface TeacherLoginProps {
  onLogin: (teacher: any) => void;
  onBack: () => void;
}

export function TeacherLogin({ onLogin, onBack }: TeacherLoginProps) {
  const [teacherId, setTeacherId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const teacher = authenticateTeacher(teacherId, password);
      if (teacher) {
        onLogin(teacher);
      } else {
        setError("Invalid teacher ID or password. Please try again.");
      }
    } catch (err) {
      setError("Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6" style={{ 
      fontFamily: 'Inter, system-ui, sans-serif',
      background: 'linear-gradient(to bottom right, #0f1922 0%, #1a2332 25%, #1e2a3a 50%, #1a3333 75%, #1e3a3a 100%)'
    }}>
      <div className="max-w-md w-full animate-fade-in">
        {/* Back Button */}
        <Button 
          variant="ghost" 
          onClick={onBack}
          className="mb-6 text-slate-300 hover:text-white hover:bg-slate-800/50 animate-slide-in-left"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Portal Selection
        </Button>

        {/* Login Card */}
        <Card className="bg-slate-900/60 backdrop-blur-sm border-slate-700/50 shadow-2xl shadow-black/50 animate-scale-in">
          <CardHeader className="text-center space-y-4">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-purple-500 rounded-2xl flex items-center justify-center mx-auto shadow-lg shadow-purple-500/30 animate-bounce-in">
              <Users className="w-8 h-8 text-white" />
            </div>
            <div className="animate-slide-up">
              <CardTitle className="text-2xl text-white">Teacher Portal</CardTitle>
              <CardDescription className="text-slate-300 mt-2">
                Enter your credentials to access the teacher dashboard
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            <form onSubmit={handleLogin} className="space-y-4">
              {/* Teacher ID */}
              <div className="space-y-2">
                <Label htmlFor="teacherId" className="text-white">Teacher ID</Label>
                <Input
                  id="teacherId"
                  type="text"
                  placeholder="Enter your teacher ID (e.g., 2001)"
                  value={teacherId}
                  onChange={(e) => setTeacherId(e.target.value)}
                  className="bg-slate-950/50 border-slate-700/50 text-white placeholder:text-slate-400 focus:border-cyan-500 focus:ring-cyan-500/50"
                  required
                />
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-white">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-slate-950/50 border-slate-700/50 text-white placeholder:text-slate-400 focus:border-cyan-500 focus:ring-cyan-500/50 pr-10"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-slate-400" />
                    ) : (
                      <Eye className="h-4 w-4 text-slate-400" />
                    )}
                  </Button>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                  <p className="text-red-400 text-sm">{error}</p>
                </div>
              )}

              {/* Login Button */}
              <Button 
                type="submit" 
                className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-3 rounded-xl shadow-lg shadow-cyan-600/30 transition-all"
                disabled={isLoading}
              >
                {isLoading ? "Signing In..." : "Sign In"}
              </Button>
            </form>

            {/* Help Text */}
            <div className="text-center space-y-2">
              <p className="text-xs text-slate-400">
                Need access? Contact{" "}
                <a href="mailto:admin@eduquest.edu" className="text-cyan-400 hover:text-cyan-300 hover:underline">
                  Administrator
                </a>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}