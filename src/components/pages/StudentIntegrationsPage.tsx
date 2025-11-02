import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Puzzle, CheckCircle, Settings, Plus, Globe, Smartphone, Calendar, FileText, X, Clock, Shield, Zap, Users, Database } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Switch } from "../ui/switch";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

interface StudentIntegrationsPageProps {
  user: any;
}

const availableIntegrations = [
  {
    id: 1,
    name: "Google Calendar",
    description: "Sync your class schedules and assignment deadlines with Google Calendar",
    icon: Calendar,
    category: "Productivity",
    connected: true,
    features: ["Class Schedule Sync", "Assignment Reminders", "Exam Notifications"],
    setupTime: "2 minutes",
    dataAccess: "Calendar events, class schedules, assignment deadlines",
    permissions: ["Read calendar events", "Create calendar events", "Modify calendar events"],
    lastSync: "2024-01-15 10:30 AM",
    syncFrequency: "Every 15 minutes",
    benefits: ["Never miss a deadline", "Automatic schedule updates", "Smart reminders"]
  },
  {
    id: 2,
    name: "Microsoft Office 365",
    description: "Access and edit documents directly from the learning platform",
    icon: FileText,
    category: "Documents",
    connected: false,
    features: ["Document Editing", "OneDrive Integration", "Teams Collaboration"],
    setupTime: "5 minutes",
    dataAccess: "Document files, OneDrive storage, Teams channels",
    permissions: ["Read files", "Create files", "Edit files", "Share files"],
    lastSync: "Not connected",
    syncFrequency: "Real-time",
    benefits: ["Seamless document editing", "Cloud storage access", "Team collaboration"]
  },
  {
    id: 3,
    name: "Mobile App",
    description: "Get notifications and access courses on your mobile device",
    icon: Smartphone,
    category: "Mobile",
    connected: true,
    features: ["Push Notifications", "Offline Reading", "Quick Access"],
    setupTime: "1 minute",
    dataAccess: "All platform data, notifications, course materials",
    permissions: ["Send notifications", "Access device storage", "Background sync"],
    lastSync: "2024-01-15 11:45 AM",
    syncFrequency: "Real-time",
    benefits: ["Learn on the go", "Offline access", "Instant notifications"]
  },
  {
    id: 4,
    name: "Zoom Integration",
    description: "Join virtual classes directly from the platform",
    icon: Globe,
    category: "Communication",
    connected: false,
    features: ["One-click Join", "Recording Access", "Attendance Tracking"],
    setupTime: "3 minutes",
    dataAccess: "Meeting links, recordings, attendance data",
    permissions: ["Join meetings", "Access recordings", "View participants"],
    lastSync: "Not connected",
    syncFrequency: "On-demand",
    benefits: ["Quick meeting access", "Automatic attendance", "Recording storage"]
  },
  {
    id: 5,
    name: "Slack Integration",
    description: "Receive notifications and updates in your Slack workspace",
    icon: Users,
    category: "Communication",
    connected: false,
    features: ["Channel Notifications", "Direct Messages", "Assignment Alerts"],
    setupTime: "4 minutes",
    dataAccess: "Workspace channels, direct messages, user profile",
    permissions: ["Post messages", "Read channels", "Send notifications"],
    lastSync: "Not connected",
    syncFrequency: "Real-time",
    benefits: ["Team communication", "Instant updates", "Centralized notifications"]
  },
  {
    id: 6,
    name: "GitHub Integration",
    description: "Link your GitHub repositories for coding assignments",
    icon: Database,
    category: "Productivity",
    connected: false,
    features: ["Repository Sync", "Code Review", "Automatic Submission"],
    setupTime: "3 minutes",
    dataAccess: "Public and private repositories, commits, pull requests",
    permissions: ["Read repositories", "Create commits", "Submit assignments"],
    lastSync: "Not connected",
    syncFrequency: "On-demand",
    benefits: ["Automated submissions", "Version control", "Code review"]
  }
];

const connectedApps = [
  {
    name: "Google Calendar",
    status: "Active",
    lastSync: "2024-01-15 10:30 AM",
    dataShared: "Class schedules, assignments",
    syncCount: 1247,
    dataVolume: "12.4 MB",
    uptime: "99.9%",
    errors: 0,
    connectedOn: "2023-08-15",
    nextSync: "2024-01-15 10:45 AM"
  },
  {
    name: "EduQuest Mobile App",
    status: "Active",
    lastSync: "2024-01-15 11:45 AM",
    dataShared: "All platform data",
    syncCount: 3421,
    dataVolume: "156.8 MB",
    uptime: "99.7%",
    errors: 2,
    connectedOn: "2023-08-10",
    nextSync: "Real-time"
  }
];

const integrationCategories = [
  { name: "All", count: availableIntegrations.length, icon: Puzzle, color: "blue" },
  { name: "Productivity", count: availableIntegrations.filter(i => i.category === "Productivity").length, icon: Zap, color: "purple" },
  { name: "Documents", count: availableIntegrations.filter(i => i.category === "Documents").length, icon: FileText, color: "green" },
  { name: "Mobile", count: availableIntegrations.filter(i => i.category === "Mobile").length, icon: Smartphone, color: "orange" },
  { name: "Communication", count: availableIntegrations.filter(i => i.category === "Communication").length, icon: Globe, color: "pink" }
];

export function StudentIntegrationsPage({ user }: StudentIntegrationsPageProps) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [integrations, setIntegrations] = useState(availableIntegrations);
  const [selectedIntegration, setSelectedIntegration] = useState<any>(null);
  const [selectedConnectedApp, setSelectedConnectedApp] = useState<any>(null);
  const [selectedCategoryDetail, setSelectedCategoryDetail] = useState<any>(null);
  const [showAvailableDialog, setShowAvailableDialog] = useState(false);
  const [showConnectedDialog, setShowConnectedDialog] = useState(false);

  const toggleIntegration = (id: number) => {
    setIntegrations(integrations.map(integration => 
      integration.id === id 
        ? { ...integration, connected: !integration.connected }
        : integration
    ));
  };

  const filteredIntegrations = selectedCategory === "All" 
    ? integrations 
    : integrations.filter(integration => integration.category === selectedCategory);

  const connectedCount = integrations.filter(i => i.connected).length;

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

  const cardHoverVariants = {
    hover: {
      scale: 1.02,
      transition: {
        duration: 0.2
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
            <h1 className="text-3xl font-bold text-dark-primary">Integrations</h1>
            <p className="text-dark-secondary mt-2">Connect your favorite apps and services</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30 px-4 py-2">
              <Puzzle className="w-4 h-4 mr-2" />
              {connectedCount} Connected
            </Badge>
          </motion.div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="flex-1 overflow-auto p-8 space-y-8">
        {/* Integration Stats */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            variants={itemVariants}
            whileHover="hover"
          >
            <Card 
              className="bg-dark-card border-dark-color cursor-pointer"
              onClick={() => setShowAvailableDialog(true)}
            >
              <CardContent className="p-6">
                <motion.div 
                  className="flex items-center justify-between"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <div>
                    <p className="text-sm text-dark-secondary">Available Integrations</p>
                    <motion.p 
                      className="text-3xl font-bold text-dark-primary"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                    >
                      {integrations.length}
                    </motion.p>
                  </div>
                  <motion.div 
                    className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Puzzle className="w-6 h-6 text-blue-400" />
                  </motion.div>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            variants={itemVariants}
            whileHover="hover"
          >
            <Card 
              className="bg-dark-card border-dark-color cursor-pointer"
              onClick={() => setShowConnectedDialog(true)}
            >
              <CardContent className="p-6">
                <motion.div 
                  className="flex items-center justify-between"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <div>
                    <p className="text-sm text-dark-secondary">Connected Apps</p>
                    <motion.p 
                      className="text-3xl font-bold text-dark-primary"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.4 }}
                    >
                      {connectedCount}
                    </motion.p>
                  </div>
                  <motion.div 
                    className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center"
                    whileHover={{ scale: 1.2 }}
                    transition={{ duration: 0.3 }}
                  >
                    <CheckCircle className="w-6 h-6 text-green-400" />
                  </motion.div>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            variants={itemVariants}
            whileHover="hover"
          >
            <Card 
              className="bg-dark-card border-dark-color cursor-pointer"
              onClick={() => {
                const categoryStats = integrationCategories.slice(1); // Exclude "All"
                setSelectedCategoryDetail({ categories: categoryStats });
              }}
            >
              <CardContent className="p-6">
                <motion.div 
                  className="flex items-center justify-between"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <div>
                    <p className="text-sm text-dark-secondary">Categories</p>
                    <motion.p 
                      className="text-3xl font-bold text-dark-primary"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.5 }}
                    >
                      {integrationCategories.length - 1}
                    </motion.p>
                  </div>
                  <motion.div 
                    className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center"
                    whileHover={{ rotate: -360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Settings className="w-6 h-6 text-purple-400" />
                  </motion.div>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Card className="bg-dark-card border-dark-color">
            <CardContent className="p-6">
              <div className="flex flex-wrap gap-2">
                {integrationCategories.map((category, index) => {
                  const Icon = category.icon;
                  return (
                    <motion.div
                      key={category.name}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: 0.7 + index * 0.1 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        onClick={() => setSelectedCategory(category.name)}
                        className={`${
                          selectedCategory === category.name
                            ? 'dark-button-primary'
                            : 'dark-button-secondary'
                        }`}
                      >
                        <Icon className="w-4 h-4 mr-2" />
                        {category.name} ({category.count})
                      </Button>
                    </motion.div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Available Integrations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <Card className="bg-dark-card border-dark-color">
            <CardHeader>
              <CardTitle className="text-dark-primary">Available Integrations</CardTitle>
              <CardDescription className="text-dark-secondary">
                Connect apps to enhance your learning experience
              </CardDescription>
            </CardHeader>
            <CardContent>
              <motion.div 
                className="grid gap-6"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <AnimatePresence mode="wait">
                  {filteredIntegrations.map((integration, index) => {
                    const Icon = integration.icon;
                    return (
                      <motion.div 
                        key={integration.id}
                        variants={itemVariants}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        whileHover={{ scale: 1.02, x: 10 }}
                        className="flex items-start space-x-4 p-6 bg-dark-hover rounded-lg cursor-pointer"
                        onClick={() => setSelectedIntegration(integration)}
                      >
                        <motion.div 
                          className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0"
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.5 }}
                        >
                          <Icon className="w-6 h-6 text-blue-400" />
                        </motion.div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h3 className="font-semibold text-dark-primary flex items-center space-x-2">
                                <span>{integration.name}</span>
                                {integration.connected && (
                                  <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ duration: 0.3 }}
                                  >
                                    <CheckCircle className="w-4 h-4 text-green-400" />
                                  </motion.div>
                                )}
                              </h3>
                              <p className="text-sm text-dark-secondary mt-1">{integration.description}</p>
                            </div>
                            <div className="flex items-center space-x-4">
                              <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                                {integration.category}
                              </Badge>
                              <Switch
                                checked={integration.connected}
                                onCheckedChange={() => toggleIntegration(integration.id)}
                              />
                            </div>
                          </div>
                          
                          <div className="space-y-3">
                            <div>
                              <p className="text-sm font-medium text-dark-primary mb-2">Features:</p>
                              <div className="flex flex-wrap gap-2">
                                {integration.features.map((feature, index) => (
                                  <motion.div
                                    key={index}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.2, delay: index * 0.05 }}
                                  >
                                    <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30 text-xs">
                                      {feature}
                                    </Badge>
                                  </motion.div>
                                ))}
                              </div>
                            </div>
                            
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-dark-secondary flex items-center">
                                <Clock className="w-4 h-4 mr-1" />
                                Setup time: {integration.setupTime}
                              </span>
                              {!integration.connected ? (
                                <Button 
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    toggleIntegration(integration.id);
                                  }}
                                  className="dark-button-primary"
                                >
                                  <Plus className="w-4 h-4 mr-2" />
                                  Connect
                                </Button>
                              ) : (
                                <Button 
                                  className="dark-button-secondary"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <Settings className="w-4 h-4 mr-2" />
                                  Configure
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Connected Apps Management */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.9 }}
        >
          <Card className="bg-dark-card border-dark-color">
            <CardHeader>
              <CardTitle className="text-dark-primary">Connected Apps</CardTitle>
              <CardDescription className="text-dark-secondary">
                Manage your connected applications and data sharing
              </CardDescription>
            </CardHeader>
            <CardContent>
              <motion.div 
                className="space-y-4"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {connectedApps.map((app, index) => (
                  <motion.div 
                    key={index}
                    variants={itemVariants}
                    whileHover={{ scale: 1.02, x: 10 }}
                    className="flex items-center justify-between p-4 bg-dark-hover rounded-lg cursor-pointer"
                    onClick={() => setSelectedConnectedApp(app)}
                  >
                    <div className="flex items-center space-x-4">
                      <motion.div 
                        className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center"
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                      >
                        <CheckCircle className="w-4 h-4 text-green-400" />
                      </motion.div>
                      <div>
                        <p className="font-medium text-dark-primary">{app.name}</p>
                        <p className="text-sm text-dark-secondary">Last sync: {app.lastSync}</p>
                        <p className="text-xs text-dark-secondary">Data shared: {app.dataShared}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                        {app.status}
                      </Badge>
                      <Button 
                        size="sm" 
                        className="dark-button-secondary"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Settings className="w-4 h-4 mr-2" />
                        Manage
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Integration Tips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.0 }}
        >
          <Card className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 border-purple-500/30">
            <CardContent className="p-6">
              <motion.div 
                className="space-y-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 1.1 }}
              >
                <h3 className="text-xl font-semibold text-dark-primary">Integration Tips</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <motion.div 
                    className="space-y-2"
                    whileHover={{ scale: 1.05 }}
                  >
                    <h4 className="font-medium text-dark-primary">Productivity Boost</h4>
                    <p className="text-sm text-dark-secondary">
                      Connect Google Calendar to automatically sync your class schedules and never miss an assignment deadline.
                    </p>
                  </motion.div>
                  <motion.div 
                    className="space-y-2"
                    whileHover={{ scale: 1.05 }}
                  >
                    <h4 className="font-medium text-dark-primary">Stay Connected</h4>
                    <p className="text-sm text-dark-secondary">
                      Install the mobile app to receive instant notifications about grades, announcements, and updates.
                    </p>
                  </motion.div>
                </div>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </main>

      {/* Available Integrations Dialog */}
      <Dialog open={showAvailableDialog} onOpenChange={setShowAvailableDialog}>
        <DialogContent className="bg-dark-card border-dark-color text-dark-primary max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center text-2xl">
              <Puzzle className="w-6 h-6 mr-2 text-blue-400" />
              Available Integrations Overview
            </DialogTitle>
            <DialogDescription className="text-dark-secondary">
              Comprehensive list of all available integration options
            </DialogDescription>
          </DialogHeader>
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-dark-hover rounded-lg">
                <p className="text-sm text-dark-secondary">Total Available</p>
                <p className="text-3xl font-bold text-blue-400">{integrations.length}</p>
              </div>
              <div className="p-4 bg-dark-hover rounded-lg">
                <p className="text-sm text-dark-secondary">Not Connected</p>
                <p className="text-3xl font-bold text-orange-400">
                  {integrations.length - connectedCount}
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold text-dark-primary">All Integrations</h4>
              {integrations.map((integration) => {
                const Icon = integration.icon;
                return (
                  <motion.div
                    key={integration.id}
                    className="flex items-center justify-between p-3 bg-dark-hover rounded-lg"
                    whileHover={{ x: 5 }}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center">
                        <Icon className="w-5 h-5 text-blue-400" />
                      </div>
                      <div>
                        <p className="font-medium text-dark-primary">{integration.name}</p>
                        <p className="text-xs text-dark-secondary">{integration.category}</p>
                      </div>
                    </div>
                    <Badge className={`${
                      integration.connected 
                        ? 'bg-green-500/20 text-green-400 border-green-500/30'
                        : 'bg-gray-500/20 text-gray-400 border-gray-500/30'
                    }`}>
                      {integration.connected ? 'Connected' : 'Available'}
                    </Badge>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </DialogContent>
      </Dialog>

      {/* Integration Details Dialog */}
      <Dialog open={!!selectedIntegration} onOpenChange={() => setSelectedIntegration(null)}>
        <DialogContent className="bg-dark-card border-dark-color text-dark-primary max-w-2xl max-h-[80vh] overflow-y-auto">
          {selectedIntegration && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center text-2xl">
                  {(() => {
                    const Icon = selectedIntegration.icon;
                    return <Icon className="w-6 h-6 mr-2 text-blue-400" />;
                  })()}
                  {selectedIntegration.name}
                </DialogTitle>
                <DialogDescription className="text-dark-secondary">
                  {selectedIntegration.description}
                </DialogDescription>
              </DialogHeader>
              <motion.div 
                className="space-y-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {/* Status */}
                <div className="flex items-center justify-between p-4 bg-dark-hover rounded-lg">
                  <span className="text-dark-secondary">Connection Status</span>
                  <Badge className={`${
                    selectedIntegration.connected
                      ? 'bg-green-500/20 text-green-400 border-green-500/30'
                      : 'bg-gray-500/20 text-gray-400 border-gray-500/30'
                  }`}>
                    {selectedIntegration.connected ? 'Connected' : 'Not Connected'}
                  </Badge>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-dark-hover rounded-lg">
                    <p className="text-sm text-dark-secondary mb-1">Category</p>
                    <p className="font-semibold text-dark-primary">{selectedIntegration.category}</p>
                  </div>
                  <div className="p-4 bg-dark-hover rounded-lg">
                    <p className="text-sm text-dark-secondary mb-1">Setup Time</p>
                    <p className="font-semibold text-dark-primary">{selectedIntegration.setupTime}</p>
                  </div>
                  <div className="p-4 bg-dark-hover rounded-lg col-span-2">
                    <p className="text-sm text-dark-secondary mb-1">Sync Frequency</p>
                    <p className="font-semibold text-dark-primary">{selectedIntegration.syncFrequency}</p>
                  </div>
                </div>

                {/* Features */}
                <div>
                  <h4 className="font-semibold text-dark-primary mb-3">Features</h4>
                  <div className="space-y-2">
                    {selectedIntegration.features.map((feature: string, index: number) => (
                      <div key={index} className="flex items-center space-x-2 p-2 bg-dark-hover rounded-lg">
                        <CheckCircle className="w-4 h-4 text-green-400" />
                        <span className="text-sm text-dark-secondary">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Benefits */}
                <div>
                  <h4 className="font-semibold text-dark-primary mb-3">Benefits</h4>
                  <div className="space-y-2">
                    {selectedIntegration.benefits.map((benefit: string, index: number) => (
                      <div key={index} className="flex items-center space-x-2 p-2 bg-dark-hover rounded-lg">
                        <Zap className="w-4 h-4 text-yellow-400" />
                        <span className="text-sm text-dark-secondary">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Permissions */}
                <div>
                  <h4 className="font-semibold text-dark-primary mb-3 flex items-center">
                    <Shield className="w-4 h-4 mr-2 text-purple-400" />
                    Required Permissions
                  </h4>
                  <div className="space-y-2">
                    {selectedIntegration.permissions.map((permission: string, index: number) => (
                      <div key={index} className="flex items-center space-x-2 p-2 bg-dark-hover rounded-lg">
                        <Shield className="w-4 h-4 text-purple-400" />
                        <span className="text-sm text-dark-secondary">{permission}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Data Access */}
                <div className="p-4 bg-purple-500/10 border border-purple-500/30 rounded-lg">
                  <h4 className="font-semibold text-dark-primary mb-2">Data Access</h4>
                  <p className="text-sm text-dark-secondary">{selectedIntegration.dataAccess}</p>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  {!selectedIntegration.connected ? (
                    <Button 
                      onClick={() => {
                        toggleIntegration(selectedIntegration.id);
                        setSelectedIntegration(null);
                      }}
                      className="dark-button-primary flex-1"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Connect Now
                    </Button>
                  ) : (
                    <>
                      <Button className="dark-button-secondary flex-1">
                        <Settings className="w-4 h-4 mr-2" />
                        Configure
                      </Button>
                      <Button 
                        onClick={() => {
                          toggleIntegration(selectedIntegration.id);
                          setSelectedIntegration(null);
                        }}
                        className="dark-button-secondary"
                      >
                        Disconnect
                      </Button>
                    </>
                  )}
                </div>
              </motion.div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Connected App Details Dialog */}
      <Dialog open={!!selectedConnectedApp} onOpenChange={() => setSelectedConnectedApp(null)}>
        <DialogContent className="bg-dark-card border-dark-color text-dark-primary max-w-2xl max-h-[80vh] overflow-y-auto">
          {selectedConnectedApp && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center text-2xl">
                  <CheckCircle className="w-6 h-6 mr-2 text-green-400" />
                  {selectedConnectedApp.name}
                </DialogTitle>
                <DialogDescription className="text-dark-secondary">
                  Connection details and statistics
                </DialogDescription>
              </DialogHeader>
              <motion.div 
                className="space-y-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {/* Status Banner */}
                <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <span className="font-semibold text-dark-primary">Status: {selectedConnectedApp.status}</span>
                    </div>
                    <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                      Uptime: {selectedConnectedApp.uptime}
                    </Badge>
                  </div>
                </div>

                {/* Statistics Grid */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-dark-hover rounded-lg">
                    <p className="text-sm text-dark-secondary mb-1">Total Syncs</p>
                    <p className="text-2xl font-bold text-blue-400">{selectedConnectedApp.syncCount.toLocaleString()}</p>
                  </div>
                  <div className="p-4 bg-dark-hover rounded-lg">
                    <p className="text-sm text-dark-secondary mb-1">Data Volume</p>
                    <p className="text-2xl font-bold text-purple-400">{selectedConnectedApp.dataVolume}</p>
                  </div>
                  <div className="p-4 bg-dark-hover rounded-lg">
                    <p className="text-sm text-dark-secondary mb-1">Errors</p>
                    <p className="text-2xl font-bold text-orange-400">{selectedConnectedApp.errors}</p>
                  </div>
                  <div className="p-4 bg-dark-hover rounded-lg">
                    <p className="text-sm text-dark-secondary mb-1">Connected Since</p>
                    <p className="text-lg font-bold text-green-400">{selectedConnectedApp.connectedOn}</p>
                  </div>
                </div>

                {/* Sync Information */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-dark-primary">Sync Information</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-3 bg-dark-hover rounded-lg">
                      <span className="text-sm text-dark-secondary">Last Sync</span>
                      <span className="font-medium text-dark-primary">{selectedConnectedApp.lastSync}</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-dark-hover rounded-lg">
                      <span className="text-sm text-dark-secondary">Next Sync</span>
                      <span className="font-medium text-dark-primary">{selectedConnectedApp.nextSync}</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-dark-hover rounded-lg">
                      <span className="text-sm text-dark-secondary">Data Shared</span>
                      <span className="font-medium text-dark-primary">{selectedConnectedApp.dataShared}</span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="grid grid-cols-2 gap-3">
                  <Button className="dark-button-secondary">
                    <Settings className="w-4 h-4 mr-2" />
                    Configure
                  </Button>
                  <Button className="dark-button-primary">
                    Sync Now
                  </Button>
                </div>
              </motion.div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Connected Apps Overview Dialog */}
      <Dialog open={showConnectedDialog} onOpenChange={setShowConnectedDialog}>
        <DialogContent className="bg-dark-card border-dark-color text-dark-primary max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center text-2xl">
              <CheckCircle className="w-6 h-6 mr-2 text-green-400" />
              Connected Apps Overview
            </DialogTitle>
            <DialogDescription className="text-dark-secondary">
              Summary of all your connected applications
            </DialogDescription>
          </DialogHeader>
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="grid grid-cols-3 gap-4">
              <div className="p-4 bg-dark-hover rounded-lg">
                <p className="text-sm text-dark-secondary">Total Connected</p>
                <p className="text-3xl font-bold text-green-400">{connectedCount}</p>
              </div>
              <div className="p-4 bg-dark-hover rounded-lg">
                <p className="text-sm text-dark-secondary">Total Syncs</p>
                <p className="text-3xl font-bold text-blue-400">
                  {connectedApps.reduce((sum, app) => sum + app.syncCount, 0).toLocaleString()}
                </p>
              </div>
              <div className="p-4 bg-dark-hover rounded-lg">
                <p className="text-sm text-dark-secondary">Total Errors</p>
                <p className="text-3xl font-bold text-orange-400">
                  {connectedApps.reduce((sum, app) => sum + app.errors, 0)}
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold text-dark-primary">Connected Applications</h4>
              {connectedApps.map((app, index) => (
                <motion.div
                  key={index}
                  className="p-4 bg-dark-hover rounded-lg space-y-2"
                  whileHover={{ x: 5 }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                      <span className="font-semibold text-dark-primary">{app.name}</span>
                    </div>
                    <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                      {app.status}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="text-dark-secondary">Syncs: </span>
                      <span className="text-dark-primary font-medium">{app.syncCount.toLocaleString()}</span>
                    </div>
                    <div>
                      <span className="text-dark-secondary">Volume: </span>
                      <span className="text-dark-primary font-medium">{app.dataVolume}</span>
                    </div>
                    <div>
                      <span className="text-dark-secondary">Uptime: </span>
                      <span className="text-dark-primary font-medium">{app.uptime}</span>
                    </div>
                    <div>
                      <span className="text-dark-secondary">Errors: </span>
                      <span className="text-dark-primary font-medium">{app.errors}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </DialogContent>
      </Dialog>

      {/* Categories Detail Dialog */}
      <Dialog open={!!selectedCategoryDetail} onOpenChange={() => setSelectedCategoryDetail(null)}>
        <DialogContent className="bg-dark-card border-dark-color text-dark-primary max-w-2xl max-h-[80vh] overflow-y-auto">
          {selectedCategoryDetail && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center text-2xl">
                  <Settings className="w-6 h-6 mr-2 text-purple-400" />
                  Integration Categories
                </DialogTitle>
                <DialogDescription className="text-dark-secondary">
                  Breakdown of integrations by category
                </DialogDescription>
              </DialogHeader>
              <motion.div 
                className="space-y-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-dark-hover rounded-lg">
                    <p className="text-sm text-dark-secondary">Total Categories</p>
                    <p className="text-3xl font-bold text-purple-400">
                      {selectedCategoryDetail.categories.length}
                    </p>
                  </div>
                  <div className="p-4 bg-dark-hover rounded-lg">
                    <p className="text-sm text-dark-secondary">Total Integrations</p>
                    <p className="text-3xl font-bold text-blue-400">
                      {integrations.length}
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold text-dark-primary">Category Breakdown</h4>
                  {selectedCategoryDetail.categories.map((category: any, index: number) => {
                    const Icon = category.icon;
                    const categoryIntegrations = integrations.filter(i => i.category === category.name);
                    const connectedInCategory = categoryIntegrations.filter(i => i.connected).length;
                    
                    return (
                      <motion.div
                        key={index}
                        className="p-4 bg-dark-hover rounded-lg"
                        whileHover={{ x: 5 }}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            <div className={`w-10 h-10 bg-${category.color}-500/20 rounded-full flex items-center justify-center`}>
                              <Icon className={`w-5 h-5 text-${category.color}-400`} />
                            </div>
                            <div>
                              <p className="font-semibold text-dark-primary">{category.name}</p>
                              <p className="text-xs text-dark-secondary">
                                {category.count} {category.count === 1 ? 'integration' : 'integrations'}
                              </p>
                            </div>
                          </div>
                          <Badge className={`bg-${category.color}-500/20 text-${category.color}-400 border-${category.color}-500/30`}>
                            {connectedInCategory} Connected
                          </Badge>
                        </div>
                        <div className="space-y-1">
                          {categoryIntegrations.map((integration) => (
                            <div key={integration.id} className="text-sm text-dark-secondary flex items-center justify-between">
                              <span>• {integration.name}</span>
                              {integration.connected && (
                                <CheckCircle className="w-3 h-3 text-green-400" />
                              )}
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
