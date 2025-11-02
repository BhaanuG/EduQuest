import { useState } from "react";
import { Mail, Inbox, Send, Star, Trash2, Search, Reply, Archive, MoreVertical, Paperclip } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { ScrollArea } from "../ui/scroll-area";

interface StudentMailsPageProps {
  user: any;
}

// Function to generate department-specific emails
function getDepartmentEmails(user: any) {
  const rollNoSeed = parseInt(user.rollNo.slice(-3));
  const baseDate = new Date();
  
  const departmentEmails = {
    "Computer Science": [
      {
        id: rollNoSeed + 1,
        from: "Dr. Sarah Johnson",
        email: "sarah.johnson@eduquest.edu",
        subject: "Data Structures Lab Submission Deadline Extended",
        preview: "The deadline for Lab Assignment 5 has been extended to next Monday...",
        time: new Date(baseDate.getTime() - (rollNoSeed % 5 + 1) * 60 * 60 * 1000).toLocaleString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }),
        date: new Date(baseDate.getTime() - (rollNoSeed % 5 + 1) * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        isRead: rollNoSeed % 3 === 0,
        isStarred: rollNoSeed % 4 === 0,
        hasAttachment: true,
        body: "Dear Students,\n\nI'm writing to inform you that the deadline for Lab Assignment 5 (Binary Search Tree Implementation) has been extended to next Monday at 11:59 PM.\n\nThis extension is granted considering the upcoming midterm exams. Please use this extra time to ensure quality submissions.\n\nBest regards,\nDr. Sarah Johnson"
      },
      {
        id: rollNoSeed + 2,
        from: "Prof. Michael Chen",
        email: "michael.chen@eduquest.edu",
        subject: "Database Management Systems - Guest Lecture Announcement",
        preview: "We have a guest lecture scheduled on Advanced Query Optimization...",
        time: new Date(baseDate.getTime() - (rollNoSeed % 10 + 5) * 60 * 60 * 1000).toLocaleString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }),
        date: new Date(baseDate.getTime() - (rollNoSeed % 10 + 5) * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        isRead: rollNoSeed % 2 === 0,
        isStarred: false,
        hasAttachment: false,
        body: "Hello Class,\n\nWe have a special guest lecture next Thursday from Mr. James Rodriguez, Senior Database Architect at TechCorp.\n\nTopic: Advanced Query Optimization in Enterprise Systems\nTime: Thursday, 2:00 PM - 3:30 PM\nVenue: Lecture Hall 101\n\nAttendance is mandatory.\n\nRegards,\nProf. Michael Chen"
      },
      {
        id: rollNoSeed + 3,
        from: "CS Department Office",
        email: "cs.office@eduquest.edu",
        subject: "Hackathon Registration Open - TechFest 2025",
        preview: "Register now for the annual TechFest Hackathon with prizes worth $10,000...",
        time: new Date(baseDate.getTime() - (rollNoSeed % 15 + 10) * 60 * 60 * 1000).toLocaleString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }),
        date: new Date(baseDate.getTime() - (rollNoSeed % 15 + 10) * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        isRead: true,
        isStarred: rollNoSeed % 3 === 0,
        hasAttachment: true,
        body: "Dear CS Students,\n\nWe're excited to announce that registration is now open for TechFest 2025 Hackathon!\n\nEvent Details:\n- Date: March 15-17, 2025\n- Prize Pool: $10,000\n- Categories: AI/ML, Web Dev, Mobile Apps\n\nRegister at: techfest.eduquest.edu\nDeadline: February 28, 2025\n\nDon't miss this opportunity!\n\nCS Department"
      },
      {
        id: rollNoSeed + 4,
        from: "Prof. Emily Williams",
        email: "emily.williams@eduquest.edu",
        subject: "Software Engineering Project Group Formation",
        preview: "Please form your project groups of 4-5 students by this Friday...",
        time: new Date(baseDate.getTime() - 24 * 60 * 60 * 1000).toLocaleString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }),
        date: new Date(baseDate.getTime() - 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        isRead: rollNoSeed % 5 === 0,
        isStarred: false,
        hasAttachment: false,
        body: "Dear Students,\n\nPlease form your project groups (4-5 members) for the Software Engineering course project by this Friday.\n\nSubmit your group details on the course portal including:\n- Group name\n- Member names and roll numbers\n- Preferred project domain\n\nLate submissions will not be accepted.\n\nBest,\nProf. Emily Williams"
      }
    ],
    "Electronics": [
      {
        id: rollNoSeed + 1,
        from: "Dr. Rajesh Kumar",
        email: "rajesh.kumar@eduquest.edu",
        subject: "DSP Lab Equipment Booking Available",
        preview: "Lab equipment booking is now open for your filter design projects...",
        time: new Date(baseDate.getTime() - (rollNoSeed % 5 + 1) * 60 * 60 * 1000).toLocaleString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }),
        date: new Date(baseDate.getTime() - (rollNoSeed % 5 + 1) * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        isRead: rollNoSeed % 3 === 0,
        isStarred: rollNoSeed % 4 === 0,
        hasAttachment: true,
        body: "Dear Students,\n\nLab equipment booking is now available for your DSP filter design projects.\n\nAvailable Equipment:\n- Oscilloscopes\n- Signal Generators\n- Spectrum Analyzers\n\nBook your slots at: ecelab.eduquest.edu\n\nDr. Rajesh Kumar"
      },
      {
        id: rollNoSeed + 2,
        from: "Prof. Anita Desai",
        email: "anita.desai@eduquest.edu",
        subject: "VLSI Design Workshop - Industry Expert Session",
        preview: "Join us for a 2-day workshop on advanced VLSI design techniques...",
        time: new Date(baseDate.getTime() - (rollNoSeed % 10 + 5) * 60 * 60 * 1000).toLocaleString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }),
        date: new Date(baseDate.getTime() - (rollNoSeed % 10 + 5) * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        isRead: rollNoSeed % 2 === 0,
        isStarred: false,
        hasAttachment: false,
        body: "Hello Class,\n\nWe're organizing a 2-day VLSI Design Workshop with industry experts from Intel.\n\nDates: March 10-11, 2025\nTopics: CMOS Design, Layout Optimization\nRegistration: Free for ECE students\n\nLimited seats available!\n\nProf. Anita Desai"
      },
      {
        id: rollNoSeed + 3,
        from: "ECE Department",
        email: "ece.dept@eduquest.edu",
        subject: "Communication Systems Lab Schedule Change",
        preview: "Important: Lab timings have been rescheduled due to equipment maintenance...",
        time: new Date(baseDate.getTime() - (rollNoSeed % 15 + 10) * 60 * 60 * 1000).toLocaleString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }),
        date: new Date(baseDate.getTime() - (rollNoSeed % 15 + 10) * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        isRead: false,
        isStarred: rollNoSeed % 3 === 0,
        hasAttachment: false,
        body: "Dear Students,\n\nDue to equipment maintenance, Communication Systems lab timings have been rescheduled:\n\nOld Time: Tuesday 2-5 PM\nNew Time: Wednesday 3-6 PM\n\nEffective from next week.\n\nECE Department"
      },
      {
        id: rollNoSeed + 4,
        from: "Dr. Vikram Singh",
        email: "vikram.singh@eduquest.edu",
        subject: "Microprocessor Project Evaluation Schedule",
        preview: "Your project demonstrations are scheduled for next week...",
        time: new Date(baseDate.getTime() - 24 * 60 * 60 * 1000).toLocaleString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }),
        date: new Date(baseDate.getTime() - 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        isRead: rollNoSeed % 5 === 0,
        isStarred: true,
        hasAttachment: true,
        body: "Dear Students,\n\nYour Microprocessor project demonstrations are scheduled for next week.\n\nCheck the schedule: microprocessor.eduquest.edu/schedule\n\nEnsure your projects are ready. Late presentations will receive grade penalties.\n\nDr. Vikram Singh"
      }
    ],
    "Mechanical": [
      {
        id: rollNoSeed + 1,
        from: "Dr. Amit Patel",
        email: "amit.patel@eduquest.edu",
        subject: "Thermodynamics Assignment Clarifications",
        preview: "Some students had questions about Problem 3.5 in the assignment...",
        time: new Date(baseDate.getTime() - (rollNoSeed % 5 + 1) * 60 * 60 * 1000).toLocaleString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }),
        date: new Date(baseDate.getTime() - (rollNoSeed % 5 + 1) * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        isRead: rollNoSeed % 3 === 0,
        isStarred: rollNoSeed % 4 === 0,
        hasAttachment: true,
        body: "Dear Students,\n\nRegarding Problem 3.5 in the Thermodynamics assignment - assume isentropic process conditions.\n\nAttached is a reference document for additional clarity.\n\nOffice hours: Monday/Wednesday 3-5 PM\n\nDr. Amit Patel"
      },
      {
        id: rollNoSeed + 2,
        from: "Prof. Priya Sharma",
        email: "priya.sharma@eduquest.edu",
        subject: "Machine Design Project CAD Software Training",
        preview: "Mandatory CAD software training session this Friday...",
        time: new Date(baseDate.getTime() - (rollNoSeed % 10 + 5) * 60 * 60 * 1000).toLocaleString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }),
        date: new Date(baseDate.getTime() - (rollNoSeed % 10 + 5) * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        isRead: rollNoSeed % 2 === 0,
        isStarred: false,
        hasAttachment: false,
        body: "Hello Class,\n\nMandatory CAD software (SolidWorks) training for your Machine Design projects:\n\nDate: Friday, 2:00 PM\nVenue: CAD Lab 2\nDuration: 2 hours\n\nBring your laptops.\n\nProf. Priya Sharma"
      },
      {
        id: rollNoSeed + 3,
        from: "Mechanical Dept Office",
        email: "mech.office@eduquest.edu",
        subject: "Industrial Visit to Manufacturing Plant",
        preview: "Exciting opportunity: Visit to TechManufacturing Corp next month...",
        time: new Date(baseDate.getTime() - (rollNoSeed % 15 + 10) * 60 * 60 * 1000).toLocaleString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }),
        date: new Date(baseDate.getTime() - (rollNoSeed % 15 + 10) * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        isRead: true,
        isStarred: rollNoSeed % 3 === 0,
        hasAttachment: false,
        body: "Dear Mechanical Engineering Students,\n\nWe've organized an industrial visit to TechManufacturing Corp.\n\nDate: March 20, 2025\nTopics: CNC Machining, Quality Control\nCost: $25 per student\n\nRegister by March 1st.\n\nMechanical Department"
      },
      {
        id: rollNoSeed + 4,
        from: "Dr. Ramesh Gupta",
        email: "ramesh.gupta@eduquest.edu",
        subject: "Fluid Mechanics Lab Report Submission",
        preview: "Lab reports for experiments 5-7 are due this Friday...",
        time: new Date(baseDate.getTime() - 24 * 60 * 60 * 1000).toLocaleString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }),
        date: new Date(baseDate.getTime() - 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        isRead: rollNoSeed % 5 === 0,
        isStarred: false,
        hasAttachment: true,
        body: "Dear Students,\n\nLab reports for experiments 5-7 (Bernoulli's theorem, flow measurement, pipe friction) are due this Friday by 5 PM.\n\nSubmit via course portal only.\n\nDr. Ramesh Gupta"
      }
    ],
    "Information Technology": [
      {
        id: rollNoSeed + 1,
        from: "Prof. Lisa Anderson",
        email: "lisa.anderson@eduquest.edu",
        subject: "Web Development Project Demo Day",
        preview: "Your project demos are scheduled - check your assigned time slots...",
        time: new Date(baseDate.getTime() - (rollNoSeed % 5 + 1) * 60 * 60 * 1000).toLocaleString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }),
        date: new Date(baseDate.getTime() - (rollNoSeed % 5 + 1) * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        isRead: rollNoSeed % 3 === 0,
        isStarred: rollNoSeed % 4 === 0,
        hasAttachment: true,
        body: "Dear Students,\n\nYour Web Development project demonstrations are scheduled for next Tuesday.\n\nEnsure your projects are:\n- Deployed online\n- Responsive\n- Well-documented\n\nCheck schedule: webdev.eduquest.edu\n\nProf. Lisa Anderson"
      },
      {
        id: rollNoSeed + 2,
        from: "Dr. Kevin Brown",
        email: "kevin.brown@eduquest.edu",
        subject: "Cybersecurity Workshop - Ethical Hacking Basics",
        preview: "Free workshop on ethical hacking and penetration testing...",
        time: new Date(baseDate.getTime() - (rollNoSeed % 10 + 5) * 60 * 60 * 1000).toLocaleString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }),
        date: new Date(baseDate.getTime() - (rollNoSeed % 10 + 5) * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        isRead: rollNoSeed % 2 === 0,
        isStarred: true,
        hasAttachment: false,
        body: "Hello IT Students,\n\nJoin our Cybersecurity workshop:\n\nTopic: Ethical Hacking Basics\nDate: Saturday, 10 AM - 4 PM\nVenue: Computer Lab 3\n\nCertification provided!\n\nRegister: security.eduquest.edu\n\nDr. Kevin Brown"
      },
      {
        id: rollNoSeed + 3,
        from: "IT Department",
        email: "it.dept@eduquest.edu",
        subject: "Cloud Computing AWS Credits Available",
        preview: "Free AWS credits for your cloud computing projects...",
        time: new Date(baseDate.getTime() - (rollNoSeed % 15 + 10) * 60 * 60 * 1000).toLocaleString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }),
        date: new Date(baseDate.getTime() - (rollNoSeed % 15 + 10) * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        isRead: false,
        isStarred: rollNoSeed % 3 === 0,
        hasAttachment: true,
        body: "Dear IT Students,\n\nWe've partnered with AWS to provide free credits for your Cloud Computing projects.\n\nEach student gets:\n- $100 AWS credits\n- Access to AWS training resources\n\nClaim your credits: cloud.eduquest.edu\n\nIT Department"
      },
      {
        id: rollNoSeed + 4,
        from: "Prof. Rachel Green",
        email: "rachel.green@eduquest.edu",
        subject: "Database Systems - Query Optimization Quiz",
        preview: "Online quiz on query optimization this Thursday...",
        time: new Date(baseDate.getTime() - 24 * 60 * 60 * 1000).toLocaleString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }),
        date: new Date(baseDate.getTime() - 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        isRead: rollNoSeed % 5 === 0,
        isStarred: false,
        hasAttachment: false,
        body: "Dear Students,\n\nOnline quiz on Query Optimization:\n\nDate: Thursday\nTime: 3:00 PM\nDuration: 30 minutes\n\nTopics: Indexing, Join algorithms, Cost estimation\n\nProf. Rachel Green"
      }
    ],
    "Civil": [
      {
        id: rollNoSeed + 1,
        from: "Dr. Suresh Reddy",
        email: "suresh.reddy@eduquest.edu",
        subject: "Structural Engineering Site Visit Announcement",
        preview: "Field visit to ongoing construction site next week...",
        time: new Date(baseDate.getTime() - (rollNoSeed % 5 + 1) * 60 * 60 * 1000).toLocaleString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }),
        date: new Date(baseDate.getTime() - (rollNoSeed % 5 + 1) * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        isRead: rollNoSeed % 3 === 0,
        isStarred: rollNoSeed % 4 === 0,
        hasAttachment: true,
        body: "Dear Students,\n\nWe've arranged a site visit to a high-rise construction project.\n\nDate: Next Tuesday\nMeeting Point: Main Gate, 8 AM\nDress Code: Safety gear provided\n\nMandatory attendance.\n\nDr. Suresh Reddy"
      },
      {
        id: rollNoSeed + 2,
        from: "Prof. Kavita Menon",
        email: "kavita.menon@eduquest.edu",
        subject: "Environmental Engineering Lab Safety Training",
        preview: "Mandatory safety training before lab work begins...",
        time: new Date(baseDate.getTime() - (rollNoSeed % 10 + 5) * 60 * 60 * 1000).toLocaleString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }),
        date: new Date(baseDate.getTime() - (rollNoSeed % 10 + 5) * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        isRead: rollNoSeed % 2 === 0,
        isStarred: false,
        hasAttachment: false,
        body: "Hello Class,\n\nMandatory lab safety training:\n\nDate: Friday, 11 AM\nVenue: Environmental Lab\nTopics: Chemical handling, Waste disposal\n\nNo lab access without this training.\n\nProf. Kavita Menon"
      },
      {
        id: rollNoSeed + 3,
        from: "Civil Engineering Dept",
        email: "civil.dept@eduquest.edu",
        subject: "Geotechnical Engineering Soil Testing Schedule",
        preview: "Soil sample testing schedule for your lab projects...",
        time: new Date(baseDate.getTime() - (rollNoSeed % 15 + 10) * 60 * 60 * 1000).toLocaleString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }),
        date: new Date(baseDate.getTime() - (rollNoSeed % 15 + 10) * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        isRead: true,
        isStarred: rollNoSeed % 3 === 0,
        hasAttachment: true,
        body: "Dear Civil Engineering Students,\n\nSoil testing lab schedule is now available.\n\nTests include:\n- Atterberg limits\n- Compaction tests\n- Shear strength\n\nBook your slots: geotech.eduquest.edu\n\nCivil Department"
      },
      {
        id: rollNoSeed + 4,
        from: "Dr. Arun Kumar",
        email: "arun.kumar@eduquest.edu",
        subject: "Construction Management Project Submission Guidelines",
        preview: "Detailed guidelines for your semester project submissions...",
        time: new Date(baseDate.getTime() - 24 * 60 * 60 * 1000).toLocaleString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }),
        date: new Date(baseDate.getTime() - 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        isRead: rollNoSeed % 5 === 0,
        isStarred: false,
        hasAttachment: true,
        body: "Dear Students,\n\nProject submission requirements:\n\n1. Project report (PDF)\n2. Cost estimation spreadsheet\n3. Schedule (MS Project/Primavera)\n4. Presentation (PPT)\n\nDeadline: March 25, 2025\n\nDr. Arun Kumar"
      }
    ]
  };

  return departmentEmails[user.department] || [];
}

export function StudentMailsPage({ user }: StudentMailsPageProps) {
  const [selectedMail, setSelectedMail] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState("");
  
  // Get personalized emails for this student
  const emails = getDepartmentEmails(user);
  
  const filteredEmails = emails.filter(email => 
    email.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
    email.from.toLowerCase().includes(searchQuery.toLowerCase()) ||
    email.preview.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      {/* Header */}
      <header className="bg-dark-bg border-b border-dark-color px-8 py-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-dark-primary">Mails</h1>
            <p className="text-dark-secondary mt-2">Your department emails and notifications - {user.department}</p>
          </div>
          <div className="flex items-center space-x-4">
            <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 px-4 py-2">
              <Inbox className="w-4 h-4 mr-2" />
              {emails.filter(e => !e.isRead).length} Unread
            </Badge>
            <Button className="dark-button-primary">
              <Send className="w-4 h-4 mr-2" />
              Compose
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-hidden flex">
        {/* Email List Sidebar */}
        <div className="w-2/5 border-r border-dark-color bg-dark-bg flex flex-col">
          {/* Search Bar */}
          <div className="p-4 border-b border-dark-color">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-dark-secondary" />
              <Input
                placeholder="Search emails..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-dark-card border-dark-color text-dark-primary"
              />
            </div>
          </div>

          {/* Email List */}
          <ScrollArea className="flex-1">
            <div className="space-y-1 p-2">
              {filteredEmails.map((email) => (
                <div
                  key={email.id}
                  onClick={() => setSelectedMail(email)}
                  className={`p-4 rounded-lg cursor-pointer transition-colors ${
                    selectedMail?.id === email.id 
                      ? 'bg-dark-hover border border-dark-cta' 
                      : email.isRead 
                      ? 'bg-dark-card hover:bg-dark-hover' 
                      : 'bg-dark-card hover:bg-dark-hover border-l-2 border-l-blue-500'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-2 flex-1 min-w-0">
                      <Mail className={`w-4 h-4 flex-shrink-0 ${email.isRead ? 'text-dark-secondary' : 'text-blue-400'}`} />
                      <span className={`font-medium truncate ${email.isRead ? 'text-dark-secondary' : 'text-dark-primary'}`}>
                        {email.from}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2 flex-shrink-0">
                      {email.hasAttachment && <Paperclip className="w-3 h-3 text-dark-secondary" />}
                      {email.isStarred && <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />}
                      <span className="text-xs text-dark-secondary">{email.time}</span>
                    </div>
                  </div>
                  <h4 className={`font-medium mb-1 ${email.isRead ? 'text-dark-secondary' : 'text-dark-primary'}`}>
                    {email.subject}
                  </h4>
                  <p className="text-sm text-dark-secondary line-clamp-2">
                    {email.preview}
                  </p>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Email Content */}
        <div className="flex-1 bg-dark-bg overflow-auto">
          {selectedMail ? (
            <div className="h-full flex flex-col">
              {/* Email Header */}
              <div className="p-8 border-b border-dark-color">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-2xl font-bold text-dark-primary mb-2">{selectedMail.subject}</h2>
                    <div className="flex items-center space-x-4 text-sm">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-semibold">
                            {selectedMail.from.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <p className="text-dark-primary font-medium">{selectedMail.from}</p>
                          <p className="text-dark-secondary text-xs">{selectedMail.email}</p>
                        </div>
                      </div>
                      <span className="text-dark-secondary">•</span>
                      <span className="text-dark-secondary">{selectedMail.date} at {selectedMail.time}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm" className="border-dark-color text-dark-secondary hover:bg-dark-hover">
                      <Star className={`w-4 h-4 ${selectedMail.isStarred ? 'fill-yellow-400 text-yellow-400' : ''}`} />
                    </Button>
                    <Button variant="outline" size="sm" className="border-dark-color text-dark-secondary hover:bg-dark-hover">
                      <Archive className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm" className="border-dark-color text-dark-secondary hover:bg-dark-hover">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm" className="border-dark-color text-dark-secondary hover:bg-dark-hover">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {selectedMail.hasAttachment && (
                  <div className="flex items-center space-x-2 p-3 bg-dark-card rounded-lg border border-dark-color">
                    <Paperclip className="w-4 h-4 text-dark-secondary" />
                    <span className="text-sm text-dark-primary">Attachment.pdf</span>
                    <span className="text-xs text-dark-secondary">(245 KB)</span>
                  </div>
                )}
              </div>

              {/* Email Body */}
              <div className="flex-1 p-8">
                <div className="max-w-3xl">
                  <pre className="whitespace-pre-wrap font-sans text-dark-primary leading-relaxed">
                    {selectedMail.body}
                  </pre>
                </div>
              </div>

              {/* Reply Section */}
              <div className="p-8 border-t border-dark-color">
                <Button className="dark-button-primary">
                  <Reply className="w-4 h-4 mr-2" />
                  Reply
                </Button>
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center">
              <div className="text-center">
                <Mail className="w-16 h-16 text-dark-secondary mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-dark-primary mb-2">Select an email</h3>
                <p className="text-dark-secondary">Choose an email from the list to view its contents</p>
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
}