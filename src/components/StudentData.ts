export interface Student {
  rollNo: string;
  name: string;
  password: string;
  cgpa: number;
  semester: number;
  department: string;
  email: string;
}

export const STUDENTS_DATA: Student[] = [
  { rollNo: "1000030001", name: "Aarav Sharma", password: "Student@001", cgpa: 8.7, semester: 6, department: "Computer Science", email: "aarav.sharma@eduquest.edu" },
  { rollNo: "1000030002", name: "Priya Reddy", password: "Student@002", cgpa: 9.2, semester: 6, department: "Electronics", email: "priya.reddy@eduquest.edu" },
  { rollNo: "1000030003", name: "Rohan Kumar", password: "Student@003", cgpa: 8.1, semester: 6, department: "Mechanical", email: "rohan.kumar@eduquest.edu" },
  { rollNo: "1000030004", name: "Sneha Patel", password: "Student@004", cgpa: 8.9, semester: 6, department: "Computer Science", email: "sneha.patel@eduquest.edu" },
  { rollNo: "1000030005", name: "Arjun Verma", password: "Student@005", cgpa: 8.4, semester: 6, department: "Civil", email: "arjun.verma@eduquest.edu" },
  { rollNo: "1000030006", name: "Kavya Iyer", password: "Student@006", cgpa: 9.1, semester: 6, department: "Information Technology", email: "kavya.iyer@eduquest.edu" },
  { rollNo: "1000030007", name: "Aditya Nair", password: "Student@007", cgpa: 8.3, semester: 6, department: "Electronics", email: "aditya.nair@eduquest.edu" },
  { rollNo: "1000030008", name: "Neha Gupta", password: "Student@008", cgpa: 8.8, semester: 6, department: "Computer Science", email: "neha.gupta@eduquest.edu" },
  { rollNo: "1000030009", name: "Kiran Das", password: "Student@009", cgpa: 8.2, semester: 6, department: "Mechanical", email: "kiran.das@eduquest.edu" },
  { rollNo: "1000030010", name: "Meera Joshi", password: "Student@010", cgpa: 9.0, semester: 6, department: "Information Technology", email: "meera.joshi@eduquest.edu" },
  { rollNo: "1000030011", name: "Rahul Mehta", password: "Student@011", cgpa: 8.6, semester: 6, department: "Civil", email: "rahul.mehta@eduquest.edu" },
  { rollNo: "1000030012", name: "Ananya Singh", password: "Student@012", cgpa: 8.9, semester: 6, department: "Computer Science", email: "ananya.singh@eduquest.edu" },
  { rollNo: "1000030013", name: "Vikram Rao", password: "Student@013", cgpa: 8.1, semester: 6, department: "Electronics", email: "vikram.rao@eduquest.edu" },
  { rollNo: "1000030014", name: "Pooja Mishra", password: "Student@014", cgpa: 8.7, semester: 6, department: "Mechanical", email: "pooja.mishra@eduquest.edu" },
  { rollNo: "1000030015", name: "Siddharth Menon", password: "Student@015", cgpa: 8.4, semester: 6, department: "Information Technology", email: "siddharth.menon@eduquest.edu" },
  { rollNo: "1000030016", name: "Ishita Ghosh", password: "Student@016", cgpa: 9.3, semester: 6, department: "Computer Science", email: "ishita.ghosh@eduquest.edu" },
  { rollNo: "1000030017", name: "Harsh Agarwal", password: "Student@017", cgpa: 8.2, semester: 6, department: "Civil", email: "harsh.agarwal@eduquest.edu" },
  { rollNo: "1000030018", name: "Divya Bansal", password: "Student@018", cgpa: 8.8, semester: 6, department: "Electronics", email: "divya.bansal@eduquest.edu" },
  { rollNo: "1000030019", name: "Nikhil Shetty", password: "Student@019", cgpa: 8.5, semester: 6, department: "Mechanical", email: "nikhil.shetty@eduquest.edu" },
  { rollNo: "1000030020", name: "Tanvi Kulkarni", password: "Student@020", cgpa: 9.1, semester: 6, department: "Information Technology", email: "tanvi.kulkarni@eduquest.edu" },
  { rollNo: "1000030021", name: "Suresh Yadav", password: "Student@021", cgpa: 8.3, semester: 5, department: "Computer Science", email: "suresh.yadav@eduquest.edu" },
  { rollNo: "1000030022", name: "Ritika Jha", password: "Student@022", cgpa: 8.9, semester: 5, department: "Electronics", email: "ritika.jha@eduquest.edu" },
  { rollNo: "1000030023", name: "Abhinav Saxena", password: "Student@023", cgpa: 8.1, semester: 5, department: "Civil", email: "abhinav.saxena@eduquest.edu" },
  { rollNo: "1000030024", name: "Shreya Pillai", password: "Student@024", cgpa: 8.7, semester: 5, department: "Mechanical", email: "shreya.pillai@eduquest.edu" },
  { rollNo: "1000030025", name: "Manish Thakur", password: "Student@025", cgpa: 8.4, semester: 5, department: "Information Technology", email: "manish.thakur@eduquest.edu" },
  { rollNo: "1000030026", name: "Lakshmi Narayan", password: "Student@026", cgpa: 9.2, semester: 5, department: "Computer Science", email: "lakshmi.narayan@eduquest.edu" },
  { rollNo: "1000030027", name: "Deepak Chatterjee", password: "Student@027", cgpa: 8.2, semester: 5, department: "Electronics", email: "deepak.chatterjee@eduquest.edu" },
  { rollNo: "1000030028", name: "Aishwarya Roy", password: "Student@028", cgpa: 8.8, semester: 5, department: "Civil", email: "aishwarya.roy@eduquest.edu" },
  { rollNo: "1000030029", name: "Karthik R", password: "Student@029", cgpa: 8.5, semester: 5, department: "Mechanical", email: "karthik.r@eduquest.edu" },
  { rollNo: "1000030030", name: "Bhavna Kaur", password: "Student@030", cgpa: 9.0, semester: 5, department: "Information Technology", email: "bhavna.kaur@eduquest.edu" },
  { rollNo: "1000030031", name: "Sanjay Malhotra", password: "Student@031", cgpa: 8.3, semester: 4, department: "Computer Science", email: "sanjay.malhotra@eduquest.edu" },
  { rollNo: "1000030032", name: "Simran Kaur", password: "Student@032", cgpa: 8.9, semester: 4, department: "Electronics", email: "simran.kaur@eduquest.edu" },
  { rollNo: "1000030033", name: "Vishal Singh", password: "Student@033", cgpa: 8.1, semester: 4, department: "Civil", email: "vishal.singh@eduquest.edu" },
  { rollNo: "1000030034", name: "Anjali Deshmukh", password: "Student@034", cgpa: 8.6, semester: 4, department: "Mechanical", email: "anjali.deshmukh@eduquest.edu" },
  { rollNo: "1000030035", name: "Prakash Naik", password: "Student@035", cgpa: 8.4, semester: 4, department: "Information Technology", email: "prakash.naik@eduquest.edu" },
  { rollNo: "1000030036", name: "Radhika Jain", password: "Student@036", cgpa: 9.1, semester: 4, department: "Computer Science", email: "radhika.jain@eduquest.edu" },
  { rollNo: "1000030037", name: "Amitabh Sinha", password: "Student@037", cgpa: 8.2, semester: 4, department: "Electronics", email: "amitabh.sinha@eduquest.edu" },
  { rollNo: "1000030038", name: "Jyoti Dubey", password: "Student@038", cgpa: 8.7, semester: 4, department: "Civil", email: "jyoti.dubey@eduquest.edu" },
  { rollNo: "1000030039", name: "Krishna Reddy", password: "Student@039", cgpa: 8.5, semester: 4, department: "Mechanical", email: "krishna.reddy@eduquest.edu" },
  { rollNo: "1000030040", name: "Monika Paul", password: "Student@040", cgpa: 8.8, semester: 4, department: "Information Technology", email: "monika.paul@eduquest.edu" },
  { rollNo: "1000030041", name: "Suraj Yadav", password: "Student@041", cgpa: 8.3, semester: 3, department: "Computer Science", email: "suraj.yadav@eduquest.edu" },
  { rollNo: "1000030042", name: "Preeti Chauhan", password: "Student@042", cgpa: 8.9, semester: 3, department: "Electronics", email: "preeti.chauhan@eduquest.edu" },
  { rollNo: "1000030043", name: "Gaurav Bhatia", password: "Student@043", cgpa: 8.1, semester: 3, department: "Civil", email: "gaurav.bhatia@eduquest.edu" },
  { rollNo: "1000030044", name: "Sonal Sen", password: "Student@044", cgpa: 8.6, semester: 3, department: "Mechanical", email: "sonal.sen@eduquest.edu" },
  { rollNo: "1000030045", name: "Rajeev Menon", password: "Student@045", cgpa: 8.4, semester: 3, department: "Information Technology", email: "rajeev.menon@eduquest.edu" },
  { rollNo: "1000030046", name: "Pallavi Das", password: "Student@046", cgpa: 9.2, semester: 3, department: "Computer Science", email: "pallavi.das@eduquest.edu" },
  { rollNo: "1000030047", name: "Aniket Joshi", password: "Student@047", cgpa: 8.2, semester: 3, department: "Electronics", email: "aniket.joshi@eduquest.edu" },
  { rollNo: "1000030048", name: "Smita Ghosh", password: "Student@048", cgpa: 8.7, semester: 3, department: "Civil", email: "smita.ghosh@eduquest.edu" },
  { rollNo: "1000030049", name: "Vivek Sharma", password: "Student@049", cgpa: 8.5, semester: 3, department: "Mechanical", email: "vivek.sharma@eduquest.edu" },
  { rollNo: "1000030050", name: "Shruti Pandey", password: "Student@050", cgpa: 8.8, semester: 3, department: "Information Technology", email: "shruti.pandey@eduquest.edu" },
  { rollNo: "1000030051", name: "Ashwin Pillai", password: "Student@051", cgpa: 8.3, semester: 2, department: "Computer Science", email: "ashwin.pillai@eduquest.edu" },
  { rollNo: "1000030052", name: "Komal Jain", password: "Student@052", cgpa: 8.9, semester: 2, department: "Electronics", email: "komal.jain@eduquest.edu" },
  { rollNo: "1000030053", name: "Parth Desai", password: "Student@053", cgpa: 8.1, semester: 2, department: "Civil", email: "parth.desai@eduquest.edu" },
  { rollNo: "1000030054", name: "Nisha Patil", password: "Student@054", cgpa: 8.6, semester: 2, department: "Mechanical", email: "nisha.patil@eduquest.edu" },
  { rollNo: "1000030055", name: "Raj Malhotra", password: "Student@055", cgpa: 8.4, semester: 2, department: "Information Technology", email: "raj.malhotra@eduquest.edu" },
  { rollNo: "1000030056", name: "Swati Agarwal", password: "Student@056", cgpa: 9.1, semester: 2, department: "Computer Science", email: "swati.agarwal@eduquest.edu" },
  { rollNo: "1000030057", name: "Arvind Gupta", password: "Student@057", cgpa: 8.2, semester: 2, department: "Electronics", email: "arvind.gupta@eduquest.edu" },
  { rollNo: "1000030058", name: "Rekha Nair", password: "Student@058", cgpa: 8.7, semester: 2, department: "Civil", email: "rekha.nair@eduquest.edu" },
  { rollNo: "1000030059", name: "Mohit Sharma", password: "Student@059", cgpa: 8.5, semester: 2, department: "Mechanical", email: "mohit.sharma@eduquest.edu" },
  { rollNo: "1000030060", name: "Chitra Rao", password: "Student@060", cgpa: 8.8, semester: 2, department: "Information Technology", email: "chitra.rao@eduquest.edu" },
  { rollNo: "1000030061", name: "Tarun Khanna", password: "Student@061", cgpa: 8.3, semester: 1, department: "Computer Science", email: "tarun.khanna@eduquest.edu" },
  { rollNo: "1000030062", name: "Vidya Iyer", password: "Student@062", cgpa: 8.9, semester: 1, department: "Electronics", email: "vidya.iyer@eduquest.edu" },
  { rollNo: "1000030063", name: "Ajay Singh", password: "Student@063", cgpa: 8.1, semester: 1, department: "Civil", email: "ajay.singh@eduquest.edu" },
  { rollNo: "1000030064", name: "Sunita Devi", password: "Student@064", cgpa: 8.6, semester: 1, department: "Mechanical", email: "sunita.devi@eduquest.edu" },
  { rollNo: "1000030065", name: "Ramesh Babu", password: "Student@065", cgpa: 8.4, semester: 1, department: "Information Technology", email: "ramesh.babu@eduquest.edu" },
  { rollNo: "1000030066", name: "Kiran Kumari", password: "Student@066", cgpa: 9.2, semester: 1, department: "Computer Science", email: "kiran.kumari@eduquest.edu" },
  { rollNo: "1000030067", name: "Shivam Yadav", password: "Student@067", cgpa: 8.2, semester: 1, department: "Electronics", email: "shivam.yadav@eduquest.edu" },
  { rollNo: "1000030068", name: "Lalita Patel", password: "Student@068", cgpa: 8.7, semester: 1, department: "Civil", email: "lalita.patel@eduquest.edu" },
  { rollNo: "1000030069", name: "Dinesh Kumar", password: "Student@069", cgpa: 8.5, semester: 1, department: "Mechanical", email: "dinesh.kumar@eduquest.edu" },
  { rollNo: "1000030070", name: "Geeta Rani", password: "Student@070", cgpa: 8.8, semester: 1, department: "Information Technology", email: "geeta.rani@eduquest.edu" },
  { rollNo: "1000030071", name: "Yash Saxena", password: "Student@071", cgpa: 8.3, semester: 8, department: "Computer Science", email: "yash.saxena@eduquest.edu" },
  { rollNo: "1000030072", name: "Seema Sinha", password: "Student@072", cgpa: 8.9, semester: 8, department: "Electronics", email: "seema.sinha@eduquest.edu" },
  { rollNo: "1000030073", name: "Akash Tiwari", password: "Student@073", cgpa: 8.1, semester: 8, department: "Civil", email: "akash.tiwari@eduquest.edu" },
  { rollNo: "1000030074", name: "Megha Sharma", password: "Student@074", cgpa: 8.6, semester: 8, department: "Mechanical", email: "megha.sharma@eduquest.edu" },
  { rollNo: "1000030075", name: "Pankaj Singh", password: "Student@075", cgpa: 8.4, semester: 8, department: "Information Technology", email: "pankaj.singh@eduquest.edu" },
  { rollNo: "1000030076", name: "Nandini Reddy", password: "Student@076", cgpa: 9.1, semester: 8, department: "Computer Science", email: "nandini.reddy@eduquest.edu" },
  { rollNo: "1000030077", name: "Ravi Shankar", password: "Student@077", cgpa: 8.2, semester: 8, department: "Electronics", email: "ravi.shankar@eduquest.edu" },
  { rollNo: "1000030078", name: "Maya Pillai", password: "Student@078", cgpa: 8.7, semester: 8, department: "Civil", email: "maya.pillai@eduquest.edu" },
  { rollNo: "1000030079", name: "Santosh Kumar", password: "Student@079", cgpa: 8.5, semester: 8, department: "Mechanical", email: "santosh.kumar@eduquest.edu" },
  { rollNo: "1000030080", name: "Usha Verma", password: "Student@080", cgpa: 8.8, semester: 8, department: "Information Technology", email: "usha.verma@eduquest.edu" },
  { rollNo: "1000030081", name: "Amit Mishra", password: "Student@081", cgpa: 8.3, semester: 7, department: "Computer Science", email: "amit.mishra@eduquest.edu" },
  { rollNo: "1000030082", name: "Shalini Iyer", password: "Student@082", cgpa: 8.9, semester: 7, department: "Electronics", email: "shalini.iyer@eduquest.edu" },
  { rollNo: "1000030083", name: "Lokesh Gupta", password: "Student@083", cgpa: 8.1, semester: 7, department: "Civil", email: "lokesh.gupta@eduquest.edu" },
  { rollNo: "1000030084", name: "Padmini Rao", password: "Student@084", cgpa: 8.6, semester: 7, department: "Mechanical", email: "padmini.rao@eduquest.edu" },
  { rollNo: "1000030085", name: "Chandan Das", password: "Student@085", cgpa: 8.4, semester: 7, department: "Information Technology", email: "chandan.das@eduquest.edu" },
  { rollNo: "1000030086", name: "Ankita Sharma", password: "Student@086", cgpa: 9.2, semester: 7, department: "Computer Science", email: "ankita.sharma@eduquest.edu" },
  { rollNo: "1000030087", name: "Mahesh Joshi", password: "Student@087", cgpa: 8.2, semester: 7, department: "Electronics", email: "mahesh.joshi@eduquest.edu" },
  { rollNo: "1000030088", name: "Sonia Gill", password: "Student@088", cgpa: 8.7, semester: 7, department: "Civil", email: "sonia.gill@eduquest.edu" },
  { rollNo: "1000030089", name: "Devendra Chauhan", password: "Student@089", cgpa: 8.5, semester: 7, department: "Mechanical", email: "devendra.chauhan@eduquest.edu" },
  { rollNo: "1000030090", name: "Rupali Sen", password: "Student@090", cgpa: 8.8, semester: 7, department: "Information Technology", email: "rupali.sen@eduquest.edu" },
  { rollNo: "1000030091", name: "Satish Reddy", password: "Student@091", cgpa: 8.3, semester: 6, department: "Computer Science", email: "satish.reddy@eduquest.edu" },
  { rollNo: "1000030092", name: "Anu Nair", password: "Student@092", cgpa: 8.9, semester: 6, department: "Electronics", email: "anu.nair@eduquest.edu" },
  { rollNo: "1000030093", name: "Ganesh Patil", password: "Student@093", cgpa: 8.1, semester: 6, department: "Civil", email: "ganesh.patil@eduquest.edu" },
  { rollNo: "1000030094", name: "Heena Khan", password: "Student@094", cgpa: 8.6, semester: 6, department: "Mechanical", email: "heena.khan@eduquest.edu" },
  { rollNo: "1000030095", name: "Narendra Sharma", password: "Student@095", cgpa: 8.4, semester: 6, department: "Information Technology", email: "narendra.sharma@eduquest.edu" },
  { rollNo: "1000030096", name: "Rupa Desai", password: "Student@096", cgpa: 9.1, semester: 6, department: "Computer Science", email: "rupa.desai@eduquest.edu" },
  { rollNo: "1000030097", name: "Sourav Banerjee", password: "Student@097", cgpa: 8.2, semester: 6, department: "Electronics", email: "sourav.banerjee@eduquest.edu" },
  { rollNo: "1000030098", name: "Kalpana Iyer", password: "Student@098", cgpa: 8.7, semester: 6, department: "Civil", email: "kalpana.iyer@eduquest.edu" },
  { rollNo: "1000030099", name: "Varun Choudhary", password: "Student@099", cgpa: 8.5, semester: 6, department: "Mechanical", email: "varun.choudhary@eduquest.edu" },
  { rollNo: "1000030100", name: "Madhuri Dixit", password: "Student@100", cgpa: 8.8, semester: 6, department: "Information Technology", email: "madhuri.dixit@eduquest.edu" }
];

// LocalStorage functions for custom students
const STORAGE_KEY = "eduquest_custom_students";

export const loadCustomStudents = (): Student[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error("Error loading custom students:", error);
    return [];
  }
};

// Get all students (default + custom)
export const getAllStudents = (): Student[] => {
  const customStudents = loadCustomStudents();
  return [...STUDENTS_DATA, ...customStudents];
};

export function findStudentByRollNo(rollNo: string): Student | undefined {
  const allStudents = getAllStudents();
  return allStudents.find(student => student.rollNo === rollNo);
}

export function authenticateStudent(rollNo: string, password: string): Student | null {
  const student = findStudentByRollNo(rollNo);
  if (student && student.password === password) {
    return student;
  }
  return null;
}
