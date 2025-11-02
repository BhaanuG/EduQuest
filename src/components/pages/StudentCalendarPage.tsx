import { useState } from "react";
import { Calendar as CalendarIcon, Clock, MapPin, Users, BookOpen, FileText, Award, AlertCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import { motion } from "motion/react";

interface StudentCalendarPageProps {
  user: any;
}

// Function to generate personalized important dates
function getPersonalizedDates(user: any) {
  const rollNoSeed = parseInt(user.rollNo.slice(-3));
  const baseDate = new Date();
  
  const departmentDates = {
    "Computer Science": [
      {
        id: rollNoSeed + 1,
        title: "Data Structures Midterm Exam",
        date: new Date(baseDate.getTime() + (7 + rollNoSeed % 5) * 24 * 60 * 60 * 1000),
        time: "10:00 AM - 12:00 PM",
        location: "Examination Hall A",
        type: "exam",
        description: "Midterm examination covering topics 1-6",
        instructor: "Dr. Sarah Johnson"
      },
      {
        id: rollNoSeed + 2,
        title: "Database Project Presentation",
        date: new Date(baseDate.getTime() + (14 + rollNoSeed % 3) * 24 * 60 * 60 * 1000),
        time: "2:00 PM - 5:00 PM",
        location: "Seminar Hall 101",
        type: "presentation",
        description: "Final project demonstrations",
        instructor: "Prof. Michael Chen"
      },
      {
        id: rollNoSeed + 3,
        title: "Hackathon TechFest 2025",
        date: new Date(baseDate.getTime() + (21 + rollNoSeed % 7) * 24 * 60 * 60 * 1000),
        time: "9:00 AM - 9:00 PM",
        location: "Innovation Center",
        type: "event",
        description: "24-hour coding competition",
        instructor: "CS Department"
      },
      {
        id: rollNoSeed + 4,
        title: "Software Engineering Assignment Due",
        date: new Date(baseDate.getTime() + (10 + rollNoSeed % 4) * 24 * 60 * 60 * 1000),
        time: "11:59 PM",
        location: "Online Submission",
        type: "deadline",
        description: "UML diagrams and design document",
        instructor: "Prof. Emily Williams"
      },
      {
        id: rollNoSeed + 5,
        title: "Guest Lecture: AI in Industry",
        date: new Date(baseDate.getTime() + (5 + rollNoSeed % 3) * 24 * 60 * 60 * 1000),
        time: "3:00 PM - 4:30 PM",
        location: "Auditorium",
        type: "lecture",
        description: "Industry expert talk on AI applications",
        instructor: "External Speaker"
      }
    ],
    "Electronics": [
      {
        id: rollNoSeed + 1,
        title: "DSP Lab Practical Exam",
        date: new Date(baseDate.getTime() + (8 + rollNoSeed % 5) * 24 * 60 * 60 * 1000),
        time: "9:00 AM - 12:00 PM",
        location: "DSP Lab",
        type: "exam",
        description: "Filter design and implementation",
        instructor: "Dr. Rajesh Kumar"
      },
      {
        id: rollNoSeed + 2,
        title: "VLSI Workshop Registration Deadline",
        date: new Date(baseDate.getTime() + (3 + rollNoSeed % 2) * 24 * 60 * 60 * 1000),
        time: "5:00 PM",
        location: "Online",
        type: "deadline",
        description: "Last date to register for workshop",
        instructor: "Prof. Anita Desai"
      },
      {
        id: rollNoSeed + 3,
        title: "Communication Systems Quiz",
        date: new Date(baseDate.getTime() + (6 + rollNoSeed % 4) * 24 * 60 * 60 * 1000),
        time: "11:00 AM - 11:30 AM",
        location: "Lecture Hall 2",
        type: "exam",
        description: "Modulation techniques quiz",
        instructor: "Dr. Vikram Singh"
      },
      {
        id: rollNoSeed + 4,
        title: "Microprocessor Project Demo",
        date: new Date(baseDate.getTime() + (15 + rollNoSeed % 6) * 24 * 60 * 60 * 1000),
        time: "2:00 PM - 5:00 PM",
        location: "Microprocessor Lab",
        type: "presentation",
        description: "8086 project demonstrations",
        instructor: "Prof. Anita Desai"
      },
      {
        id: rollNoSeed + 5,
        title: "Electronics Symposium",
        date: new Date(baseDate.getTime() + (20 + rollNoSeed % 7) * 24 * 60 * 60 * 1000),
        time: "10:00 AM - 4:00 PM",
        location: "Convention Center",
        type: "event",
        description: "Annual electronics department event",
        instructor: "ECE Department"
      }
    ],
    "Mechanical": [
      {
        id: rollNoSeed + 1,
        title: "Thermodynamics Final Exam",
        date: new Date(baseDate.getTime() + (12 + rollNoSeed % 5) * 24 * 60 * 60 * 1000),
        time: "1:00 PM - 4:00 PM",
        location: "Exam Hall B",
        type: "exam",
        description: "Comprehensive final examination",
        instructor: "Dr. Amit Patel"
      },
      {
        id: rollNoSeed + 2,
        title: "CAD Software Training Session",
        date: new Date(baseDate.getTime() + (4 + rollNoSeed % 3) * 24 * 60 * 60 * 1000),
        time: "2:00 PM - 4:00 PM",
        location: "CAD Lab 2",
        type: "lecture",
        description: "SolidWorks advanced features",
        instructor: "Prof. Priya Sharma"
      },
      {
        id: rollNoSeed + 3,
        title: "Industrial Visit to Manufacturing Plant",
        date: new Date(baseDate.getTime() + (18 + rollNoSeed % 6) * 24 * 60 * 60 * 1000),
        time: "8:00 AM - 5:00 PM",
        location: "TechManufacturing Corp",
        type: "event",
        description: "Field visit to industrial facility",
        instructor: "Mechanical Department"
      },
      {
        id: rollNoSeed + 4,
        title: "Fluid Mechanics Lab Report Due",
        date: new Date(baseDate.getTime() + (5 + rollNoSeed % 3) * 24 * 60 * 60 * 1000),
        time: "5:00 PM",
        location: "Online Portal",
        type: "deadline",
        description: "Experiments 5-7 reports",
        instructor: "Dr. Ramesh Gupta"
      },
      {
        id: rollNoSeed + 5,
        title: "Machine Design Viva Voce",
        date: new Date(baseDate.getTime() + (16 + rollNoSeed % 5) * 24 * 60 * 60 * 1000),
        time: "10:00 AM - 1:00 PM",
        location: "Faculty Office",
        type: "exam",
        description: "Project oral examination",
        instructor: "Prof. Priya Sharma"
      }
    ],
    "Information Technology": [
      {
        id: rollNoSeed + 1,
        title: "Web Development Project Demo Day",
        date: new Date(baseDate.getTime() + (9 + rollNoSeed % 4) * 24 * 60 * 60 * 1000),
        time: "10:00 AM - 4:00 PM",
        location: "Computer Lab 1",
        type: "presentation",
        description: "Full-stack project presentations",
        instructor: "Prof. Lisa Anderson"
      },
      {
        id: rollNoSeed + 2,
        title: "Cybersecurity Workshop",
        date: new Date(baseDate.getTime() + (11 + rollNoSeed % 5) * 24 * 60 * 60 * 1000),
        time: "10:00 AM - 4:00 PM",
        location: "Computer Lab 3",
        type: "lecture",
        description: "Ethical hacking basics with certification",
        instructor: "Dr. Kevin Brown"
      },
      {
        id: rollNoSeed + 3,
        title: "Database Systems Quiz",
        date: new Date(baseDate.getTime() + (6 + rollNoSeed % 3) * 24 * 60 * 60 * 1000),
        time: "3:00 PM - 3:30 PM",
        location: "Online Portal",
        type: "exam",
        description: "Query optimization quiz",
        instructor: "Prof. Rachel Green"
      },
      {
        id: rollNoSeed + 4,
        title: "Cloud Computing Assignment Due",
        date: new Date(baseDate.getTime() + (8 + rollNoSeed % 4) * 24 * 60 * 60 * 1000),
        time: "11:59 PM",
        location: "AWS Academy Portal",
        type: "deadline",
        description: "Cloud deployment project",
        instructor: "Dr. Kevin Brown"
      },
      {
        id: rollNoSeed + 5,
        title: "IT Career Fair",
        date: new Date(baseDate.getTime() + (25 + rollNoSeed % 7) * 24 * 60 * 60 * 1000),
        time: "9:00 AM - 5:00 PM",
        location: "Campus Arena",
        type: "event",
        description: "Meet recruiters from top tech companies",
        instructor: "Placement Cell"
      }
    ],
    "Civil": [
      {
        id: rollNoSeed + 1,
        title: "Structural Engineering Site Visit",
        date: new Date(baseDate.getTime() + (7 + rollNoSeed % 4) * 24 * 60 * 60 * 1000),
        time: "8:00 AM - 2:00 PM",
        location: "Construction Site A",
        type: "event",
        description: "High-rise building inspection",
        instructor: "Dr. Suresh Reddy"
      },
      {
        id: rollNoSeed + 2,
        title: "Environmental Lab Safety Training",
        date: new Date(baseDate.getTime() + (4 + rollNoSeed % 2) * 24 * 60 * 60 * 1000),
        time: "11:00 AM - 1:00 PM",
        location: "Environmental Lab",
        type: "lecture",
        description: "Mandatory safety certification",
        instructor: "Prof. Kavita Menon"
      },
      {
        id: rollNoSeed + 3,
        title: "Geotechnical Lab Practical Exam",
        date: new Date(baseDate.getTime() + (13 + rollNoSeed % 5) * 24 * 60 * 60 * 1000),
        time: "9:00 AM - 12:00 PM",
        location: "Geotechnical Lab",
        type: "exam",
        description: "Soil testing procedures",
        instructor: "Dr. Arun Kumar"
      },
      {
        id: rollNoSeed + 4,
        title: "Construction Management Project Due",
        date: new Date(baseDate.getTime() + (19 + rollNoSeed % 6) * 24 * 60 * 60 * 1000),
        time: "5:00 PM",
        location: "Course Portal",
        type: "deadline",
        description: "Complete project documentation",
        instructor: "Dr. Arun Kumar"
      },
      {
        id: rollNoSeed + 5,
        title: "Civil Engineering Seminar",
        date: new Date(baseDate.getTime() + (22 + rollNoSeed % 7) * 24 * 60 * 60 * 1000),
        time: "2:00 PM - 5:00 PM",
        location: "Seminar Hall",
        type: "event",
        description: "Sustainable construction practices",
        instructor: "Civil Department"
      }
    ]
  };

  return (departmentDates[user.department] || []).sort((a, b) => a.date.getTime() - b.date.getTime());
}

export function StudentCalendarPage({ user }: StudentCalendarPageProps) {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  
  // Get personalized dates for this student
  const importantDates = getPersonalizedDates(user);
  
  // Get events for selected date
  const getEventsForDate = (selectedDate: Date | undefined) => {
    if (!selectedDate) return [];
    return importantDates.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate.toDateString() === selectedDate.toDateString();
    });
  };
  
  const eventsOnSelectedDate = getEventsForDate(date);
  
  // Check if a date has events
  const hasEvents = (checkDate: Date) => {
    return importantDates.some(event => {
      const eventDate = new Date(event.date);
      return eventDate.toDateString() === checkDate.toDateString();
    });
  };
  
  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'exam': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'deadline': return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      case 'presentation': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'lecture': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'event': return 'bg-green-500/20 text-green-400 border-green-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'exam': return FileText;
      case 'deadline': return AlertCircle;
      case 'presentation': return Users;
      case 'lecture': return BookOpen;
      case 'event': return Award;
      default: return CalendarIcon;
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long',
      year: 'numeric',
      month: 'long', 
      day: 'numeric' 
    });
  };

  const getDaysUntil = (eventDate: Date) => {
    const today = new Date();
    const diffTime = eventDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return "Past";
    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Tomorrow";
    return `In ${diffDays} days`;
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
              Academic Calendar
            </motion.h1>
            <motion.p 
              className="text-dark-secondary mt-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              Your personalized schedule and important dates - {user.department}
            </motion.p>
          </div>
          <motion.div 
            className="flex items-center space-x-4"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 px-4 py-2">
              <CalendarIcon className="w-4 h-4 mr-2" />
              {importantDates.filter(d => d.date > new Date()).length} Upcoming
            </Badge>
          </motion.div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="flex-1 overflow-auto p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Calendar Widget */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <Card className="bg-dark-card border-dark-color">
                <CardHeader>
                  <CardTitle className="text-dark-primary">Calendar</CardTitle>
                  <CardDescription className="text-dark-secondary">Select a date to view events</CardDescription>
                </CardHeader>
                <CardContent>
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="rounded-md border border-dark-color"
                    modifiers={{
                      hasEvent: (day) => hasEvents(day)
                    }}
                    modifiersClassNames={{
                      hasEvent: "bg-blue-500/20 text-blue-400 font-bold rounded-full"
                    }}
                  />
                  {eventsOnSelectedDate.length > 0 && (
                    <motion.div 
                      className="mt-4 p-3 bg-dark-hover rounded-lg border border-dark-cta"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <p className="text-sm font-semibold text-dark-primary mb-2">
                        {eventsOnSelectedDate.length} event{eventsOnSelectedDate.length > 1 ? 's' : ''} on {date?.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </p>
                      {eventsOnSelectedDate.map(event => (
                        <div key={event.id} className="text-xs text-dark-secondary mt-1">
                          • {event.title}
                        </div>
                      ))}
                    </motion.div>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <Card className="bg-dark-card border-dark-color mt-6">
                <CardHeader>
                  <CardTitle className="text-dark-primary">Quick Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <motion.div 
                    className="flex items-center justify-between"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7, duration: 0.4 }}
                    whileHover={{ x: 5 }}
                  >
                    <div className="flex items-center space-x-2">
                      <FileText className="w-4 h-4 text-red-400" />
                      <span className="text-dark-secondary">Exams</span>
                    </div>
                    <Badge className="bg-red-500/20 text-red-400 border-red-500/30">
                      {importantDates.filter(d => d.type === 'exam').length}
                    </Badge>
                  </motion.div>
                  <motion.div 
                    className="flex items-center justify-between"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.75, duration: 0.4 }}
                    whileHover={{ x: 5 }}
                  >
                    <div className="flex items-center space-x-2">
                      <AlertCircle className="w-4 h-4 text-orange-400" />
                      <span className="text-dark-secondary">Deadlines</span>
                    </div>
                    <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30">
                      {importantDates.filter(d => d.type === 'deadline').length}
                    </Badge>
                  </motion.div>
                  <motion.div 
                    className="flex items-center justify-between"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8, duration: 0.4 }}
                    whileHover={{ x: 5 }}
                  >
                    <div className="flex items-center space-x-2">
                      <Users className="w-4 h-4 text-purple-400" />
                      <span className="text-dark-secondary">Presentations</span>
                    </div>
                    <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">
                      {importantDates.filter(d => d.type === 'presentation').length}
                    </Badge>
                  </motion.div>
                  <motion.div 
                    className="flex items-center justify-between"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.85, duration: 0.4 }}
                    whileHover={{ x: 5 }}
                  >
                    <div className="flex items-center space-x-2">
                      <Award className="w-4 h-4 text-green-400" />
                      <span className="text-dark-secondary">Events</span>
                    </div>
                    <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                      {importantDates.filter(d => d.type === 'event').length}
                    </Badge>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Events List */}
          <div className="lg:col-span-2 space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <Card className="bg-dark-card border-dark-color">
                <CardHeader>
                  <CardTitle className="text-dark-primary">Upcoming Events</CardTitle>
                  <CardDescription className="text-dark-secondary">Your scheduled activities and important dates</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {importantDates.map((event, index) => {
                    const Icon = getEventIcon(event.type);
                    const isUpcoming = event.date > new Date();
                    
                    return (
                      <motion.div
                        key={event.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 + index * 0.05, duration: 0.4 }}
                        whileHover={{ scale: 1.01, x: 5 }}
                        onClick={() => setSelectedEvent(event)}
                        className={`p-6 rounded-lg border transition-all cursor-pointer ${
                          selectedEvent?.id === event.id
                            ? 'bg-dark-hover border-dark-cta'
                            : isUpcoming
                            ? 'bg-dark-hover border-dark-color hover:border-dark-cta/50'
                            : 'bg-dark-card border-dark-color opacity-60'
                        }`}
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-start space-x-3 flex-1">
                            <div className={`w-10 h-10 rounded-lg ${getEventTypeColor(event.type).replace('text-', 'bg-').replace('/20', '/10')} flex items-center justify-center flex-shrink-0`}>
                              <Icon className={`w-5 h-5 ${getEventTypeColor(event.type).split(' ')[1]}`} />
                            </div>
                            <div className="flex-1">
                              <h3 className="font-semibold text-dark-primary mb-1">{event.title}</h3>
                              <p className="text-sm text-dark-secondary mb-2">{event.description}</p>
                              <div className="flex flex-wrap items-center gap-4 text-sm text-dark-secondary">
                                <div className="flex items-center space-x-1">
                                  <CalendarIcon className="w-4 h-4" />
                                  <span>{formatDate(event.date)}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <Clock className="w-4 h-4" />
                                  <span>{event.time}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <MapPin className="w-4 h-4" />
                                  <span>{event.location}</span>
                                </div>
                              </div>
                              <div className="mt-2 flex items-center space-x-2">
                                <span className="text-xs text-dark-secondary">Instructor:</span>
                                <span className="text-xs text-dark-primary">{event.instructor}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-col items-end space-y-2">
                            <Badge className={getEventTypeColor(event.type)}>
                              {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                            </Badge>
                            <Badge className={`${
                              getDaysUntil(event.date) === 'Today' || getDaysUntil(event.date) === 'Tomorrow'
                                ? 'bg-red-500/20 text-red-400 border-red-500/30'
                                : 'bg-blue-500/20 text-blue-400 border-blue-500/30'
                            }`}>
                              {getDaysUntil(event.date)}
                            </Badge>
                          </div>
                        </div>
                        
                        {selectedEvent?.id === event.id && (
                          <motion.div 
                            className="mt-4 pt-4 border-t border-dark-color flex space-x-2"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            transition={{ duration: 0.3 }}
                          >
                            <Button size="sm" className="dark-button-primary">
                              <CalendarIcon className="w-4 h-4 mr-2" />
                              Add to Calendar
                            </Button>
                            <Button size="sm" variant="outline" className="border-dark-color text-dark-secondary hover:bg-dark-hover">
                              Set Reminder
                            </Button>
                          </motion.div>
                        )}
                      </motion.div>
                    );
                  })}
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </main>
    </>
  );
}