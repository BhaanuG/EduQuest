import { useState } from "react";
import { Search, HelpCircle, MessageCircle, Book, FileText, ChevronRight, Bug, Send, Phone, Mail, CheckCircle, Info, AlertCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { toast } from "sonner@2.0.3";
import { motion } from "motion/react";

interface StudentHelpCenterPageProps {
  user: any;
}

const faqItems = [
  {
    question: "How do I check my current CGPA?",
    answer: "You can view your current CGPA on the main dashboard or in the Progress section. It's also displayed in your profile.",
    detailedContent: {
      overview: "Your CGPA (Cumulative Grade Point Average) is a key metric that reflects your overall academic performance across all semesters.",
      steps: [
        "Navigate to the Dashboard from the main menu - your CGPA is displayed prominently at the top in a large card",
        "Alternatively, visit the Progress section from the sidebar to see detailed CGPA breakdowns",
        "In the Analytics page, you can view your CGPA trend over time with interactive charts",
        "Your My Account section also displays your current CGPA along with other personal details"
      ],
      additionalInfo: [
        "CGPA is calculated as the weighted average of grade points earned in all completed courses",
        "The system updates your CGPA automatically after each semester result is published",
        "You can download a detailed grade report from the Progress section",
        "CGPA is calculated on a 10.0 scale in this institution"
      ],
      tips: [
        "Regularly check your CGPA to track your academic progress",
        "Use the semester-wise breakdown to identify areas of improvement",
        "Compare your performance with previous semesters to measure growth"
      ]
    }
  },
  {
    question: "Where can I find my course schedules?",
    answer: "Course schedules are available in the Courses section. You can also see upcoming classes on your dashboard.",
    detailedContent: {
      overview: "Your course schedule contains all information about your enrolled courses, class timings, locations, and instructors.",
      steps: [
        "Click on 'Courses' in the main navigation sidebar",
        "You'll see all your enrolled courses for the current semester",
        "Each course card displays the course name, instructor, schedule, and location",
        "Click on any course to view detailed information including syllabus, announcements, and materials",
        "The Dashboard also shows your next 3 upcoming classes for quick reference"
      ],
      additionalInfo: [
        "Course schedules are organized by days of the week for easy viewing",
        "You can export your schedule to your personal calendar app",
        "Instructor office hours and contact information are available in each course detail page",
        "The Calendar page provides a comprehensive view of all classes, exams, and deadlines"
      ],
      tips: [
        "Set up notifications for upcoming classes to never miss a lecture",
        "Check the course page regularly for announcements and updates",
        "Use the Calendar view to plan your week effectively"
      ]
    }
  },
  {
    question: "How do I submit assignments?",
    answer: "Go to the Upcoming Assignments section, find your assignment, and click 'Submit Work' to upload your files.",
    detailedContent: {
      overview: "The assignment submission system allows you to upload your work, track deadlines, and receive feedback from instructors.",
      steps: [
        "Navigate to the 'Assignments' page from the sidebar",
        "Locate the assignment you want to submit in the 'Upcoming Assignments' section",
        "Click on the assignment card to open the detailed view",
        "Click the 'Submit Work' or 'Upload' button",
        "Select your file(s) from your device (supports PDF, DOCX, ZIP formats)",
        "Add any comments or notes for your instructor (optional)",
        "Review your submission and click 'Submit' to finalize",
        "You'll receive a confirmation message and email upon successful submission"
      ],
      additionalInfo: [
        "Maximum file size limit: 50MB per submission",
        "Supported formats: PDF, DOCX, TXT, ZIP, PNG, JPG",
        "You can resubmit assignments before the deadline - only the latest submission counts",
        "Late submissions may be penalized based on course policy",
        "Track your submission status in the 'Submitted Assignments' section"
      ],
      tips: [
        "Submit assignments well before the deadline to avoid last-minute technical issues",
        "Double-check your files before submitting to ensure you're uploading the correct version",
        "Keep a backup copy of your assignments on your local device",
        "Check the assignment requirements carefully before submitting"
      ]
    }
  },
  {
    question: "I can't log in to my account",
    answer: "Make sure you're using your correct roll number and password format (Student@last3digits). Contact IT support if issues persist.",
    detailedContent: {
      overview: "Login issues can occur due to incorrect credentials, system maintenance, or account-related problems. Here's how to resolve them.",
      steps: [
        "Verify your username: Use your complete roll number (e.g., CSE2024001)",
        "Check your password format: It should be 'Student@' followed by the last 3 digits of your roll number",
        "Example: For roll number CSE2024001, the password is Student@001",
        "Ensure Caps Lock is off and you're typing carefully",
        "Clear your browser cache and cookies, then try again",
        "Try using a different browser or device",
        "If still unable to login, use the 'Forgot Password' option on the login page"
      ],
      additionalInfo: [
        "First-time users must use the default password format mentioned above",
        "You can change your password after first login in the My Account section",
        "Accounts are automatically locked after 5 failed login attempts for security",
        "Locked accounts can be unlocked by contacting IT support",
        "System maintenance is usually scheduled on weekends - check announcements"
      ],
      tips: [
        "Change your default password immediately after first login for better security",
        "Use a strong, unique password that you can remember",
        "Never share your login credentials with anyone",
        "Bookmark the correct login page to avoid phishing attempts",
        "Contact IT Support: support@eduquest.edu or call +1 (555) 123-4567"
      ]
    }
  },
  {
    question: "How do I update my profile information?",
    answer: "Go to My Account section and click on 'Edit Profile' to update your personal information.",
    detailedContent: {
      overview: "Keeping your profile information up-to-date ensures you receive important communications and helps maintain accurate records.",
      steps: [
        "Click on your profile picture or name in the top navigation bar",
        "Select 'My Account' from the dropdown menu",
        "Scroll to the 'Personal Information' section",
        "Click the 'Edit Profile' button",
        "Update the fields you want to change (email, phone, address, etc.)",
        "Upload a new profile picture if desired (JPG, PNG, max 5MB)",
        "Click 'Save Changes' to update your information",
        "You'll receive a confirmation message once changes are saved"
      ],
      additionalInfo: [
        "Some fields like Roll Number, Name, and Department cannot be changed by students",
        "To modify restricted fields, submit a request to the Academic Office",
        "Email address updates require verification - check your email for confirmation link",
        "Profile changes are reflected across the system within 24 hours",
        "Your profile picture should be professional and appropriate"
      ],
      tips: [
        "Ensure your email address is correct to receive important notifications",
        "Keep your phone number updated for emergency communications",
        "Review and update your information at the start of each semester",
        "Add an alternate email address for backup communication"
      ]
    }
  }
];

const guideItems = [
  {
    title: "Getting Started with EduQuest Path",
    description: "Learn the basics of navigating the platform",
    steps: [
      "Log in with your roll number and password",
      "Explore the dashboard to see your overview",
      "Check the Courses section for your enrolled classes",
      "View upcoming assignments and deadlines"
    ]
  },
  {
    title: "Submitting Assignments",
    description: "Step-by-step guide to submit your work",
    steps: [
      "Navigate to Upcoming Assignments",
      "Click on the assignment you want to submit",
      "Upload your file(s) using the upload button",
      "Review your submission and click 'Submit'"
    ]
  },
  {
    title: "Checking Your Grades",
    description: "How to view your academic progress",
    steps: [
      "Go to the Progress or Analytics section",
      "View your CGPA and semester grades",
      "Check individual course performance",
      "Download grade reports if needed"
    ]
  }
];

export function StudentHelpCenterPage({ user }: StudentHelpCenterPageProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [showBugDialog, setShowBugDialog] = useState(false);
  const [showContactDialog, setShowContactDialog] = useState(false);
  const [showGuideDialog, setShowGuideDialog] = useState(false);
  const [showFaqDialog, setShowFaqDialog] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<any>(null);
  const [bugReport, setBugReport] = useState({
    title: "",
    description: "",
    category: "technical"
  });
  const [contactForm, setContactForm] = useState({
    subject: "",
    message: ""
  });

  const handleSubmitBug = () => {
    if (bugReport.title && bugReport.description) {
      toast.success("Bug report submitted successfully! We'll review it shortly.");
      setShowBugDialog(false);
      setBugReport({ title: "", description: "", category: "technical" });
    } else {
      toast.error("Please fill in all fields");
    }
  };

  const handleSubmitContact = () => {
    if (contactForm.subject && contactForm.message) {
      toast.success("Message sent successfully! We'll get back to you soon.");
      setShowContactDialog(false);
      setContactForm({ subject: "", message: "" });
    } else {
      toast.error("Please fill in all fields");
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
              Help Center
            </motion.h1>
            <motion.p 
              className="text-dark-secondary mt-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              Get support and find answers to your questions
            </motion.p>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 px-4 py-2">
              <HelpCircle className="w-4 h-4 mr-2" />
              Support Available
            </Badge>
          </motion.div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="flex-1 overflow-auto p-8 space-y-8">
        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <Card className="bg-dark-card border-dark-color">
            <CardContent className="p-6">
              <div className="text-center space-y-4">
                <h2 className="text-xl font-semibold text-dark-primary">How can we help you?</h2>
                <div className="relative max-w-md mx-auto">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-dark-secondary w-5 h-5" />
                  <Input
                    placeholder="Search for help articles..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-12 bg-dark-bg border-dark-color text-dark-primary"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Dialog open={showFaqDialog} onOpenChange={setShowFaqDialog}>
            <DialogTrigger asChild>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <Card className="bg-dark-card border-dark-color hover:border-dark-cta transition-colors cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 bg-blue-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <HelpCircle className="w-8 h-8 text-blue-400" />
                    </div>
                    <h3 className="font-semibold text-dark-primary mb-2">FAQs</h3>
                    <p className="text-sm text-dark-secondary">Find quick answers</p>
                  </CardContent>
                </Card>
              </motion.div>
            </DialogTrigger>
            <DialogContent className="bg-dark-card border-dark-color max-w-2xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-dark-primary">Frequently Asked Questions</DialogTitle>
                <DialogDescription className="text-dark-secondary">
                  Find answers to common questions
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                {faqItems.map((faq, index) => (
                  <Card key={index} className="bg-dark-hover border-dark-color">
                    <CardHeader>
                      <CardTitle className="text-base text-dark-primary">{faq.question}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-dark-secondary">{faq.answer}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </DialogContent>
          </Dialog>

          <Dialog open={showContactDialog} onOpenChange={setShowContactDialog}>
            <DialogTrigger asChild>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.5 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <Card className="bg-dark-card border-dark-color hover:border-dark-cta transition-colors cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 bg-green-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <MessageCircle className="w-8 h-8 text-green-400" />
                    </div>
                    <h3 className="font-semibold text-dark-primary mb-2">Contact Support</h3>
                    <p className="text-sm text-dark-secondary">Get personalized help</p>
                  </CardContent>
                </Card>
              </motion.div>
            </DialogTrigger>
            <DialogContent className="bg-dark-card border-dark-color">
              <DialogHeader>
                <DialogTitle className="text-dark-primary">Contact Support</DialogTitle>
                <DialogDescription className="text-dark-secondary">
                  Send us a message and we'll get back to you soon
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="subject" className="text-dark-primary">Subject</Label>
                  <Input
                    id="subject"
                    placeholder="What do you need help with?"
                    value={contactForm.subject}
                    onChange={(e) => setContactForm({...contactForm, subject: e.target.value})}
                    className="bg-dark-bg border-dark-color text-dark-primary"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message" className="text-dark-primary">Message</Label>
                  <Textarea
                    id="message"
                    placeholder="Describe your issue..."
                    value={contactForm.message}
                    onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                    className="bg-dark-bg border-dark-color text-dark-primary"
                    rows={5}
                  />
                </div>
                <div className="bg-dark-hover p-4 rounded-lg">
                  <p className="text-sm text-dark-secondary mb-2">Other ways to reach us:</p>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 text-sm">
                      <Mail className="w-4 h-4 text-blue-400" />
                      <span className="text-dark-primary">support@eduquest.edu</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <Phone className="w-4 h-4 text-green-400" />
                      <span className="text-dark-primary">+1 (555) 123-4567</span>
                    </div>
                  </div>
                </div>
                <Button onClick={handleSubmitContact} className="w-full dark-button-primary">
                  <Send className="w-4 h-4 mr-2" />
                  Send Message
                </Button>
              </div>
            </DialogContent>
          </Dialog>

          <Dialog open={showGuideDialog} onOpenChange={setShowGuideDialog}>
            <DialogTrigger asChild>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <Card className="bg-dark-card border-dark-color hover:border-dark-cta transition-colors cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 bg-purple-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Book className="w-8 h-8 text-purple-400" />
                    </div>
                    <h3 className="font-semibold text-dark-primary mb-2">User Guide</h3>
                    <p className="text-sm text-dark-secondary">Learn how to use</p>
                  </CardContent>
                </Card>
              </motion.div>
            </DialogTrigger>
            <DialogContent className="bg-dark-card border-dark-color max-w-2xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-dark-primary">User Guide</DialogTitle>
                <DialogDescription className="text-dark-secondary">
                  Learn how to use EduQuest Path effectively
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                {guideItems.map((guide, index) => (
                  <Card key={index} className="bg-dark-hover border-dark-color">
                    <CardHeader>
                      <CardTitle className="text-base text-dark-primary">{guide.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-dark-secondary mb-2">{guide.description}</p>
                      <ul className="space-y-1 text-sm text-dark-secondary">
                        {guide.steps.map((step, i) => (
                          <li key={i} className="flex items-start space-x-2">
                            <span className="text-blue-400">•</span>
                            <span>{step}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </DialogContent>
          </Dialog>

          <Dialog open={showBugDialog} onOpenChange={setShowBugDialog}>
            <DialogTrigger asChild>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.5 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <Card className="bg-dark-card border-dark-color hover:border-dark-cta transition-colors cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 bg-orange-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Bug className="w-8 h-8 text-orange-400" />
                    </div>
                    <h3 className="font-semibold text-dark-primary mb-2">Report a Bug</h3>
                    <p className="text-sm text-dark-secondary">Help us improve</p>
                  </CardContent>
                </Card>
              </motion.div>
            </DialogTrigger>
            <DialogContent className="bg-dark-card border-dark-color">
              <DialogHeader>
                <DialogTitle className="text-dark-primary">Report a Bug</DialogTitle>
                <DialogDescription className="text-dark-secondary">
                  Help us improve by reporting issues you encounter
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="bugTitle" className="text-dark-primary">Bug Title</Label>
                  <Input
                    id="bugTitle"
                    placeholder="Brief description of the issue"
                    value={bugReport.title}
                    onChange={(e) => setBugReport({...bugReport, title: e.target.value})}
                    className="bg-dark-bg border-dark-color text-dark-primary"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bugDescription" className="text-dark-primary">Description</Label>
                  <Textarea
                    id="bugDescription"
                    placeholder="Detailed description of the bug and steps to reproduce..."
                    value={bugReport.description}
                    onChange={(e) => setBugReport({...bugReport, description: e.target.value})}
                    className="bg-dark-bg border-dark-color text-dark-primary"
                    rows={5}
                  />
                </div>
                <div className="bg-dark-hover p-3 rounded-lg">
                  <p className="text-xs text-dark-secondary">
                    Your report will be reviewed by our technical team. Thank you for helping us improve EduQuest Path!
                  </p>
                </div>
                <Button onClick={handleSubmitBug} className="w-full dark-button-primary">
                  <Bug className="w-4 h-4 mr-2" />
                  Submit Bug Report
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Popular Articles */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.5 }}
        >
          <Card className="bg-dark-card border-dark-color">
            <CardHeader>
              <CardTitle className="text-dark-primary">Popular Help Articles</CardTitle>
              <CardDescription className="text-dark-secondary">Most viewed articles this month (Click to view full details)</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {faqItems.slice(0, 5).map((faq, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.1 + index * 0.05, duration: 0.4 }}
                    whileHover={{ scale: 1.01, x: 5 }}
                    onClick={() => setSelectedArticle(faq)}
                    className="p-4 bg-dark-hover rounded-lg border border-dark-color hover:border-dark-cta transition-colors cursor-pointer"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-dark-primary mb-1">{faq.question}</h4>
                        <p className="text-sm text-dark-secondary">{faq.answer}</p>
                      </div>
                      <ChevronRight className="w-5 h-5 text-dark-secondary flex-shrink-0" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </main>

      {/* Selected Article Dialog */}
      <Dialog open={!!selectedArticle} onOpenChange={() => setSelectedArticle(null)}>
        <DialogContent className="bg-dark-card border-dark-color text-dark-primary max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center text-2xl">
              <FileText className="w-6 h-6 mr-2 text-blue-400" />
              {selectedArticle?.question}
            </DialogTitle>
            <DialogDescription className="text-dark-secondary">
              Complete guide and detailed information
            </DialogDescription>
          </DialogHeader>
          {selectedArticle?.detailedContent && (
            <div className="space-y-6 mt-4">
              {/* Overview */}
              <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 p-5 rounded-lg border border-blue-500/30">
                <div className="flex items-start space-x-3">
                  <Info className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-dark-primary mb-2">Overview</h3>
                    <p className="text-dark-secondary">{selectedArticle.detailedContent.overview}</p>
                  </div>
                </div>
              </div>

              {/* Step-by-Step Guide */}
              <div className="bg-dark-hover p-5 rounded-lg">
                <h3 className="font-semibold text-dark-primary mb-4 flex items-center">
                  <CheckCircle className="w-5 h-5 mr-2 text-green-400" />
                  Step-by-Step Guide
                </h3>
                <div className="space-y-3">
                  {selectedArticle.detailedContent.steps.map((step: string, index: number) => (
                    <div key={index} className="flex items-start space-x-3 p-3 bg-dark-card rounded-lg">
                      <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                        <span className="text-xs font-semibold text-blue-400">{index + 1}</span>
                      </div>
                      <p className="text-dark-secondary flex-1">{step}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Additional Information */}
              <div className="bg-dark-hover p-5 rounded-lg">
                <h3 className="font-semibold text-dark-primary mb-4 flex items-center">
                  <AlertCircle className="w-5 h-5 mr-2 text-orange-400" />
                  Additional Information
                </h3>
                <ul className="space-y-2">
                  {selectedArticle.detailedContent.additionalInfo.map((info: string, index: number) => (
                    <li key={index} className="flex items-start space-x-2 text-dark-secondary">
                      <span className="text-orange-400 mt-1">•</span>
                      <span>{info}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tips & Best Practices */}
              <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 p-5 rounded-lg border border-green-500/30">
                <h3 className="font-semibold text-dark-primary mb-4 flex items-center">
                  <HelpCircle className="w-5 h-5 mr-2 text-green-400" />
                  Tips & Best Practices
                </h3>
                <ul className="space-y-2">
                  {selectedArticle.detailedContent.tips.map((tip: string, index: number) => (
                    <li key={index} className="flex items-start space-x-2 text-dark-secondary">
                      <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Support Contact */}
              <div className="bg-dark-hover p-5 rounded-lg border border-dark-color">
                <h3 className="font-semibold text-dark-primary mb-3">Still need help?</h3>
                <p className="text-sm text-dark-secondary mb-4">
                  If you couldn't find the answer you were looking for, our support team is here to help.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2 text-sm">
                    <Mail className="w-4 h-4 text-blue-400" />
                    <span className="text-dark-primary">support@eduquest.edu</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <Phone className="w-4 h-4 text-green-400" />
                    <span className="text-dark-primary">+1 (555) 123-4567</span>
                  </div>
                </div>
                <Button 
                  onClick={() => {
                    setSelectedArticle(null);
                    setShowContactDialog(true);
                  }}
                  className="w-full mt-4 dark-button-primary"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Contact Support
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}