import { useState } from "react";
import { BookOpen, FileText, Video, Link, Download, Search, Filter, Star, Eye, Calendar } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { motion } from "motion/react";

interface StudentResourcesPageProps {
  user: any;
}

// Function to generate department-specific study materials
function getDepartmentStudyMaterials(user: any) {
  const departmentMaterials = {
    "Computer Science": [
      {
        id: 1,
        title: "Data Structures Complete Guide",
        type: "PDF",
        subject: "Data Structures & Algorithms",
        author: "Prof. Suresh Iyer",
        size: "2.4 MB",
        uploadDate: "2024-01-10",
        downloads: 156,
        rating: 4.8,
        description: "Comprehensive guide covering all major data structures with examples and exercises"
      },
      {
        id: 2,
        title: "Database Design Principles",
        type: "Video",
        subject: "Database Management Systems",
        author: "Dr. Kavita Sharma",
        duration: "45 min",
        uploadDate: "2024-01-08",
        views: 234,
        rating: 4.6,
        description: "Video lecture on database normalization and design principles"
      },
      {
        id: 3,
        title: "Advanced Algorithms Handbook",
        type: "PDF",
        subject: "Algorithm Design",
        author: "Prof. Rajesh Kumar",
        size: "3.1 MB",
        uploadDate: "2024-01-12",
        downloads: 143,
        rating: 4.9,
        description: "Advanced algorithmic concepts with complexity analysis and optimization techniques"
      },
      {
        id: 4,
        title: "Object-Oriented Programming Masterclass",
        type: "Video",
        subject: "Software Engineering",
        author: "Dr. Priya Mehta",
        duration: "1h 20min",
        uploadDate: "2024-01-06",
        views: 198,
        rating: 4.7,
        description: "Complete guide to OOP principles and design patterns"
      }
    ],
    "Electronics": [
      {
        id: 1,
        title: "Digital Signal Processing Fundamentals",
        type: "PDF",
        subject: "Digital Signal Processing",
        author: "Prof. Arun Reddy",
        size: "2.8 MB",
        uploadDate: "2024-01-10",
        downloads: 124,
        rating: 4.7,
        description: "Complete guide to DSP concepts, filters, and transforms"
      },
      {
        id: 2,
        title: "VLSI Design Workshop",
        type: "Video",
        subject: "VLSI Design",
        author: "Dr. Sunita Nair",
        duration: "55 min",
        uploadDate: "2024-01-08",
        views: 167,
        rating: 4.5,
        description: "Hands-on workshop covering VLSI design flow and tools"
      },
      {
        id: 3,
        title: "Communication Systems Reference",
        type: "Document",
        subject: "Communication Systems",
        author: "Prof. Vikram Sharma",
        size: "2.1 MB",
        uploadDate: "2024-01-05",
        downloads: 98,
        rating: 4.4,
        description: "Comprehensive reference for analog and digital communication"
      },
      {
        id: 4,
        title: "Microprocessor Programming Guide",
        type: "PDF",
        subject: "Microprocessors",
        author: "Dr. Kavitha Iyer",
        size: "1.9 MB",
        uploadDate: "2024-01-07",
        downloads: 112,
        rating: 4.6,
        description: "Assembly language programming and microprocessor architecture"
      }
    ],
    "Mechanical": [
      {
        id: 1,
        title: "Thermodynamics Problem Solver",
        type: "PDF",
        subject: "Thermodynamics",
        author: "Prof. Rajesh Gupta",
        size: "2.6 MB",
        uploadDate: "2024-01-10",
        downloads: 134,
        rating: 4.8,
        description: "Step-by-step solutions to complex thermodynamics problems"
      },
      {
        id: 2,
        title: "Fluid Mechanics Laboratory",
        type: "Video",
        subject: "Fluid Mechanics",
        author: "Dr. Neha Patel",
        duration: "1h 15min",
        uploadDate: "2024-01-08",
        views: 156,
        rating: 4.5,
        description: "Virtual lab experiments in fluid mechanics with analysis"
      },
      {
        id: 3,
        title: "Machine Design Handbook",
        type: "Document",
        subject: "Machine Design",
        author: "Prof. Kiran Kumar",
        size: "3.4 MB",
        uploadDate: "2024-01-05",
        downloads: 89,
        rating: 4.7,
        description: "Comprehensive machine element design with calculations"
      },
      {
        id: 4,
        title: "Manufacturing Processes Guide",
        type: "PDF",
        subject: "Manufacturing Processes",
        author: "Dr. Anjali Das",
        size: "2.3 MB",
        uploadDate: "2024-01-07",
        downloads: 102,
        rating: 4.6,
        description: "Modern manufacturing techniques and process optimization"
      }
    ],
    "Information Technology": [
      {
        id: 1,
        title: "Full Stack Web Development",
        type: "PDF",
        subject: "Web Development",
        author: "Prof. Arjun Verma",
        size: "3.2 MB",
        uploadDate: "2024-01-10",
        downloads: 189,
        rating: 4.9,
        description: "Complete guide to modern web development frameworks and tools"
      },
      {
        id: 2,
        title: "Cybersecurity Essentials",
        type: "Video",
        subject: "Cybersecurity",
        author: "Dr. Meera Joshi",
        duration: "1h 30min",
        uploadDate: "2024-01-08",
        views: 278,
        rating: 4.8,
        description: "Essential cybersecurity concepts and practical implementations"
      },
      {
        id: 3,
        title: "Cloud Computing Architecture",
        type: "Document",
        subject: "Cloud Computing",
        author: "Prof. Siddharth Menon",
        size: "2.7 MB",
        uploadDate: "2024-01-05",
        downloads: 167,
        rating: 4.7,
        description: "Cloud service models, deployment strategies, and case studies"
      },
      {
        id: 4,
        title: "Database Optimization Techniques",
        type: "PDF",
        subject: "Database Systems",
        author: "Dr. Kavya Iyer",
        size: "2.1 MB",
        uploadDate: "2024-01-07",
        downloads: 145,
        rating: 4.6,
        description: "Advanced database optimization and performance tuning"
      }
    ],
    "Civil": [
      {
        id: 1,
        title: "Structural Analysis Methods",
        type: "PDF",
        subject: "Structural Engineering",
        author: "Prof. Rahul Mehta",
        size: "2.9 MB",
        uploadDate: "2024-01-10",
        downloads: 118,
        rating: 4.7,
        description: "Advanced structural analysis techniques and software tools"
      },
      {
        id: 2,
        title: "Environmental Impact Assessment",
        type: "Video",
        subject: "Environmental Engineering",
        author: "Dr. Aishwarya Roy",
        duration: "50 min",
        uploadDate: "2024-01-08",
        views: 142,
        rating: 4.5,
        description: "Environmental assessment procedures and case studies"
      },
      {
        id: 3,
        title: "Geotechnical Investigation Guide",
        type: "Document",
        subject: "Geotechnical Engineering",
        author: "Prof. Harsh Agarwal",
        size: "2.4 MB",
        uploadDate: "2024-01-05",
        downloads: 76,
        rating: 4.4,
        description: "Soil investigation methods and foundation design principles"
      },
      {
        id: 4,
        title: "Construction Project Management",
        type: "PDF",
        subject: "Construction Management",
        author: "Dr. Jyoti Dubey",
        size: "2.8 MB",
        uploadDate: "2024-01-07",
        downloads: 95,
        rating: 4.6,
        description: "Modern project management techniques for construction industry"
      }
    ]
  };
  
  return departmentMaterials[user.department] || [];
}

const externalResources = [
  {
    id: 1,
    title: "GeeksforGeeks - Data Structures",
    type: "Website",
    url: "https://geeksforgeeks.org/data-structures",
    category: "Practice Problems",
    description: "Comprehensive collection of data structure problems and solutions"
  },
  {
    id: 2,
    title: "MIT OpenCourseWare - Algorithms",
    type: "Online Course",
    url: "https://ocw.mit.edu/algorithms",
    category: "Video Lectures",
    description: "Free online course on algorithms from MIT"
  },
  {
    id: 3,
    title: "Oracle Database Documentation",
    type: "Documentation",
    url: "https://docs.oracle.com/database",
    category: "Reference",
    description: "Official documentation for Oracle Database systems"
  },
  {
    id: 4,
    title: "Coursera - Computer Networks",
    type: "Online Course",
    url: "https://coursera.org/computer-networks",
    category: "Video Lectures",
    description: "University-level course on computer networking fundamentals"
  }
];

const myLibrary = [
  { title: "Algorithms Textbook - Chapter 5", type: "Bookmark", saved: "2024-01-12" },
  { title: "Database ER Diagram Examples", type: "Downloaded", saved: "2024-01-10" },
  { title: "Network Security Notes", type: "Favorite", saved: "2024-01-08" },
  { title: "Software Design Patterns", type: "Downloaded", saved: "2024-01-05" }
];

export function StudentResourcesPage({ user }: StudentResourcesPageProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTab, setSelectedTab] = useState("materials");
  
  // Get personalized study materials for this student's department
  const studyMaterials = getDepartmentStudyMaterials(user);

  const getTypeIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'pdf':
      case 'document':
        return <FileText className="w-4 h-4" />;
      case 'video':
        return <Video className="w-4 h-4" />;
      case 'website':
      case 'online course':
        return <Link className="w-4 h-4" />;
      default:
        return <BookOpen className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'pdf':
      case 'document':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'video':
        return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'website':
      case 'online course':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      default:
        return 'bg-green-500/20 text-green-400 border-green-500/30';
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
              Learning Resources
            </motion.h1>
            <motion.p 
              className="text-dark-secondary mt-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              Access study materials, references, and external resources
            </motion.p>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button className="dark-button-primary">
              <BookOpen className="w-4 h-4 mr-2" />
              Add Resource
            </Button>
          </motion.div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="flex-1 overflow-auto p-8">
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
          <motion.div 
            className="flex items-center justify-between"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <TabsList className="bg-dark-card border border-dark-color">
              <TabsTrigger value="materials" className="data-[state=active]:bg-dark-hover">
                Study Materials ({studyMaterials.length})
              </TabsTrigger>
              <TabsTrigger value="external" className="data-[state=active]:bg-dark-hover">
                External Resources ({externalResources.length})
              </TabsTrigger>
              <TabsTrigger value="library" className="data-[state=active]:bg-dark-hover">
                My Library ({myLibrary.length})
              </TabsTrigger>
            </TabsList>

            <div className="flex items-center space-x-4">
              <motion.div 
                className="relative"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-dark-secondary w-4 h-4" />
                <Input
                  placeholder="Search resources..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-dark-bg border-dark-color text-dark-primary w-64"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7, duration: 0.5 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button className="dark-button-secondary">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </Button>
              </motion.div>
            </div>
          </motion.div>

          {/* Study Materials */}
          <TabsContent value="materials" className="space-y-6">
            <div className="grid gap-6">
              {studyMaterials.map((material, index) => (
                <motion.div
                  key={material.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index, duration: 0.5 }}
                  whileHover={{ scale: 1.01, y: -2 }}
                >
                  <Card className="bg-dark-card border-dark-color hover:border-dark-cta transition-all hover:shadow-lg hover:shadow-blue-500/10">
                    <CardHeader className="pb-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-dark-primary flex items-center space-x-2">
                            {getTypeIcon(material.type)}
                            <span>{material.title}</span>
                          </CardTitle>
                          <CardDescription className="text-dark-secondary mt-1">
                            {material.subject} • by {material.author}
                          </CardDescription>
                        </div>
                        <Badge className={getTypeColor(material.type)}>
                          {material.type}
                        </Badge>
                      </div>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      <p className="text-sm text-dark-secondary">{material.description}</p>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-4 h-4 text-dark-secondary" />
                          <span className="text-dark-secondary">Uploaded: {material.uploadDate}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          {material.type === 'Video' ? (
                            <>
                              <Eye className="w-4 h-4 text-dark-secondary" />
                              <span className="text-dark-secondary">{material.views || material.downloads} views</span>
                            </>
                          ) : (
                            <>
                              <Download className="w-4 h-4 text-dark-secondary" />
                              <span className="text-dark-secondary">{material.downloads} downloads</span>
                            </>
                          )}
                        </div>
                        <div className="flex items-center space-x-2">
                          <Star className="w-4 h-4 text-yellow-400" />
                          <span className="text-dark-secondary">{material.rating}/5.0</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-dark-secondary">
                            {material.size || material.duration}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-dark-color">
                        <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                          {material.subject}
                        </Badge>
                        <div className="flex items-center space-x-2">
                          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Button className="dark-button-secondary">
                              <Star className="w-4 h-4 mr-2" />
                              Save
                            </Button>
                          </motion.div>
                          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Button className="dark-button-primary">
                              <Download className="w-4 h-4 mr-2" />
                              {material.type === 'Video' ? 'Watch' : 'Download'}
                            </Button>
                          </motion.div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          {/* External Resources */}
          <TabsContent value="external" className="space-y-6">
            <div className="grid gap-6">
              {externalResources.map((resource, index) => (
                <motion.div
                  key={resource.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index, duration: 0.5 }}
                  whileHover={{ scale: 1.01, y: -2 }}
                >
                  <Card className="bg-dark-card border-dark-color hover:border-dark-cta transition-all hover:shadow-lg hover:shadow-purple-500/10">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-semibold text-dark-primary flex items-center space-x-2 mb-2">
                            {getTypeIcon(resource.type)}
                            <span>{resource.title}</span>
                          </h3>
                          <p className="text-sm text-dark-secondary mb-4">{resource.description}</p>
                          <div className="flex items-center space-x-4">
                            <Badge className={getTypeColor(resource.type)}>
                              {resource.type}
                            </Badge>
                            <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">
                              {resource.category}
                            </Badge>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Button className="dark-button-secondary">
                              <Star className="w-4 h-4 mr-2" />
                              Save
                            </Button>
                          </motion.div>
                          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Button className="dark-button-primary">
                              <Link className="w-4 h-4 mr-2" />
                              Open
                            </Button>
                          </motion.div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          {/* My Library */}
          <TabsContent value="library" className="space-y-6">
            <div className="grid gap-4">
              {myLibrary.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index, duration: 0.5 }}
                  whileHover={{ scale: 1.01, x: 5 }}
                >
                  <Card className="bg-dark-card border-dark-color hover:border-blue-500/50 transition-all">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <motion.div 
                            className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center"
                            whileHover={{ rotate: 360 }}
                            transition={{ duration: 0.6 }}
                          >
                            <BookOpen className="w-4 h-4 text-blue-400" />
                          </motion.div>
                          <div>
                            <p className="font-medium text-dark-primary">{item.title}</p>
                            <p className="text-sm text-dark-secondary">Saved on {item.saved}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge className={`${
                            item.type === 'Favorite' ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' :
                            item.type === 'Downloaded' ? 'bg-green-500/20 text-green-400 border-green-500/30' :
                            'bg-blue-500/20 text-blue-400 border-blue-500/30'
                          }`}>
                            {item.type}
                          </Badge>
                          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Button size="sm" className="dark-button-secondary">
                              Open
                            </Button>
                          </motion.div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </>
  );
}