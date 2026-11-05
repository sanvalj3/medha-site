// Shared site content. Edit here to change contact details, stats, students, FAQs, etc.
import coursesJson from './courses.json';

export const contact = {
  phone: '+917349475807',
  phoneLabel: '+91 73494 75807',
  counsellingPhone: '+917204740084',
  counsellingPhoneLabel: '+91 72047 40084',
  whatsapp: '917349475807',
  email: 'medhaittechnologies@gmail.com',
  website: 'www.medhatrainings.com',
  city: 'Marathahalli, Bengaluru',
  address: 'Medha IT Technologies, Marathahalli, Bengaluru, Karnataka, India',
  mapQuery: 'Medha IT Technologies Marathahalli Bengaluru',
};

export const social = [
  { name: 'Facebook', href: 'https://www.facebook.com/profile.php?id=61590331512842' },
  { name: 'Instagram', href: 'https://www.instagram.com/medhaittechnologies?igsh=b2dtNGk5OG5hMTNw' },
  { name: 'LinkedIn', href: 'https://www.linkedin.com/in/medha-it-technologies-1aa943413/' },
  { name: 'YouTube', href: 'https://www.youtube.com/@MedhaITTechnologies' },
];

export const stats = [
  { value: '850', suffix: '+', label: 'Students placed' },
  { value: '20k', suffix: '+', label: 'Students trained' },
  { value: '50', suffix: '+', label: 'Industry experts' },
  { value: '15', suffix: '+', label: 'Professional courses' },
  { value: '13', suffix: '+', label: 'Years of excellence' },
];

export type Course = {
  slug: string; title: string; code: string; cat: 'sap' | 'dev' | 'data' | 'cloud' | 'biz';
  duration: string | null; highlight: string; demo: string; summary: string;
  paras: string[]; features: string[]; roles: string[]; phone: string | null;
};
export const courses = coursesJson as Course[];

// Short card text for each course (home + course listing)
export const courseBlurb: Record<string, string> = {
  'sap-all-modules-training': 'FICO, MM, SD, ABAP and S/4HANA with real business scenarios.',
  'java-full-stack': 'Core & Advanced Java, Spring Boot, REST APIs and front end.',
  'python-full-stack-training': 'Python, Django, databases and deployable web apps.',
  'full-stack-web-development-2': 'HTML, CSS, JavaScript, back end, APIs and Git.',
  'angular-development-training': 'TypeScript, components, routing and API integration.',
  'artificial-intelligence-training': 'Machine learning, deep learning and generative AI.',
  'data-science-training': 'Statistics, Python, ML models and real datasets.',
  'data-analytics-training-2': 'Excel, SQL, Python and dashboards for business decisions.',
  'power-bi-training': 'Data modelling, DAX and interactive business reports.',
  'aws-devops-training': 'AWS cloud services, CI/CD, Docker and Kubernetes.',
  'devops': 'Git, Jenkins, Docker, Kubernetes, Terraform and Ansible.',
  'software-testing-training': 'Manual testing, Selenium automation and test frameworks.',
  'digital-marketing-training': 'SEO, social media marketing and Google Ads campaigns.',
  'salesforce-training-in-hyderabad': 'CRM administration, automation and Apex development.',
};

// Courses shown on the Home page (in this order)
export const homeCourses = [
  'sap-all-modules-training', 'java-full-stack', 'python-full-stack-training', 'artificial-intelligence-training',
  'data-science-training', 'data-analytics-training-2', 'aws-devops-training', 'angular-development-training',
  'software-testing-training', 'digital-marketing-training', 'salesforce-training-in-hyderabad', 'power-bi-training',
];

export const categories = [
  { id: 'sap', label: 'SAP' },
  { id: 'dev', label: 'Development' },
  { id: 'data', label: 'Data & AI' },
  { id: 'cloud', label: 'Cloud & Testing' },
  { id: 'biz', label: 'Business' },
] as const;

// Options in the "Book your free demo" form
export const demoCourses = [
  'SAP All Modules Training', 'SAP FICO Training', 'SAP MM Training', 'SAP SD Training', 'SAP ABAP Training',
  'Java Full Stack Training', 'Python Full Stack Training', 'Advanced AI Training', 'Data Science Training',
  'Data Analytics Training', 'AWS & DevOps Training', 'Angular Development Training', 'Software Testing Training',
  'Digital Marketing Training', 'Salesforce Training', 'Power BI Training',
];

// Placed students. `photo` is a file name in src/assets/students/ (or null).
export const students = [
  { name: 'Guru Teja', role: 'SAP FICO Senior Consultant', company: 'Philips', lpa: '32', photo: 'Guru_Teja_passport_size_photo.png' },
  { name: 'Oleti Pavan Kumar', role: 'Senior Fund Analyst', company: 'PwC', lpa: '15', photo: 'Oleti-Pavan-Kumar.jpeg' },
  { name: 'G. Jagadish', role: 'Senior Analyst', company: 'HSBC', lpa: '11', photo: 'G-Jagadish.jpeg' },
  { name: 'Komali', role: 'Senior Analyst', company: 'Honeywell', lpa: '9.5', photo: 'Komali.png' },
  { name: 'Bhanu Prakash', role: 'Senior Analyst', company: 'Consero', lpa: '8', photo: 'Bhanu-Prakash.png' },
  { name: 'K Arun Kumar', role: 'Senior Analyst', company: 'Deloitte', lpa: '8', photo: 'K-Arun-Kumar.jpeg' },
  { name: 'Prabhu Kiran', role: 'R2R Accountant', company: 'ANSR', lpa: '7.6', photo: 'Prabhu-Kiran.jpeg' },
  { name: 'Jilledi Mohan', role: 'Assistant Manager', company: 'PepsiCo', lpa: '7', photo: 'Jilledi-Mohan.jpeg', pos: 'center' },
  { name: 'Hemalatha', role: 'Senior Analyst', company: 'KPMG', lpa: '6.87', photo: 'Hemalatha.png' },
  { name: 'Pannuru Sriramulu Chetty Mounika', role: 'R2R Analyst', company: 'Mynd Integrated Solutions', lpa: '6.5', photo: 'Pannuru-Sriramulu-Chetty-Mounika.jpeg' },
  { name: 'Teja', role: 'R2R Ops Analyst', company: 'Danatra Travel', lpa: '6.2', photo: 'Teja.jpeg' },
  { name: 'K Navya', role: 'Senior Process Associate', company: 'Spring Board', lpa: '6.2', photo: 'NAVYA-K.png' },
  { name: 'Doddipalli Viswanatha', role: 'Associate Software Engineer', company: 'GO Digit Insurance', lpa: '6', photo: 'DODDIPALLI-VISWANATHA.jpeg' },
  { name: 'Sai Bhagavan', role: 'Senior Executive', company: 'Zetwerk', lpa: '6', photo: 'Sai-Bhagavan.jpeg' },
  { name: 'Shaik Bavajan', role: 'Senior Process Associate', company: 'Spring Board', lpa: '6', photo: 'Shaik-Bavajan.png' },
  { name: 'Nanda Kumar Reddy', role: 'R2R Ops Analyst', company: 'Accenture', lpa: '5.8', photo: 'Nanda-Kumar-Reddy.jpeg' },
  { name: 'T A Sharath', role: 'Senior Process Associate', company: 'Spring Board', lpa: '5.5', photo: 'T-A-Sharath.jpeg' },
  { name: 'Amarnath Reddy', role: 'R2R Senior Associate', company: 'ContinuServe', lpa: '5.5', photo: 'AMARNATH-REDYY.jpeg' },
  { name: 'Kolla Narasimha Reddy', role: 'Accounts Payable Analyst', company: 'Myntra', lpa: '5.5', photo: 'Kolla-Narasimha-Reddy.jpg' },
  { name: 'Sainath Reddy', role: 'R2R Ops Associate', company: 'Deloitte', lpa: '5.5', photo: 'SAINATH-REDDY.jpeg' },
  { name: 'Kandukuri Santhosh Kumar', role: 'Senior Associate', company: 'Genpact', lpa: '4.9', photo: 'Kandukuri-Santhosh-Kumar.jpeg' },
  { name: 'Vinod Kumar', role: 'AP Executive', company: 'Adecco', lpa: '4.59', photo: 'Vinod-Kumar.jpeg' },
  { name: 'Vasala Pavan Kumar', role: 'Senior Process Associate', company: 'Mphasis Ltd', lpa: '4.2', photo: 'Vasala-Pavan-Kumar.jpeg' },
  { name: 'Syed Mohammad Aleem', role: 'Senior Process Associate', company: 'Alorica', lpa: '3', photo: 'Syed-Mohammad-Aleem.jpeg' },
  { name: 'T Devipriya', role: 'R2R Ops Analyst', company: 'Moder', lpa: '2.75', photo: 'T-Devipriya.jpeg' },
  { name: 'Gowtham', role: 'Associate', company: 'Wipro', lpa: '2.63', photo: 'Gowtham.png' },
];

export const testimonials = [
  { quote: 'Thanks to Medha IT Technologies for the structured training and placement support. It helped me secure a role as a Senior Associate.', name: 'Kandukuri Santhosh Kumar', role: 'Senior Associate, Genpact', photo: 'Kandukuri-Santhosh-Kumar.jpeg' },
  { quote: 'Medha IT Technologies provided the perfect environment to learn and grow. The guidance I received was instrumental in landing my current position.', name: 'Vinod Kumar', role: 'Accounts Payable Executive, Adecco', photo: 'Vinod-Kumar.jpeg' },
  { quote: 'The comprehensive training and dedicated mentorship at Medha IT Technologies truly helped me excel and transition into a professional role.', name: 'Nanda Kumar Reddy', role: 'R2R Ops Analyst, Accenture', photo: 'Nanda-Kumar-Reddy.jpeg' },
];

export const faqs = [
  { q: 'What makes Medha IT Technologies different?', a: 'Our focus on practical training, live projects, internships, expert trainers and placement support helps students become industry-ready professionals.' },
  { q: 'What courses are available?', a: 'We offer SAP, Full Stack Development, Data Science, AI, DevOps, Salesforce, Digital Marketing, Power BI and many more career-oriented programs.' },
  { q: 'Do I need prior experience to join a course?', a: 'No. Most courses are designed for beginners as well as working professionals.' },
  { q: 'Can I attend classes online?', a: 'Yes. We provide both online and classroom training, depending on the course.' },
  { q: 'Do you offer internship opportunities?', a: 'Yes. Students get to work on live projects and internship programs for practical experience.' },
  { q: 'Will I receive a certificate after completion?', a: 'Yes. A course completion certificate is provided after you successfully complete the training.' },
];

export const trainingModes = [
  { title: 'Classroom training', text: 'Practical classroom sessions with expert faculty and an industry-focused curriculum.', tags: ['Live interaction', 'Doubt solving', 'Networking'], icon: 'building' },
  { title: 'Online training', text: 'Flexible online programs you can join from anywhere, with live support.', tags: ['Flexible schedule', 'Recordings', 'Global access'], icon: 'screen' },
  { title: 'Corporate training', text: 'Customised training for companies, teams and enterprise projects.', tags: ['Team training', 'Customised', 'On-site sessions'], icon: 'team' },
  { title: 'Internship program', text: 'Hands-on internships with live projects and real-world experience.', tags: ['Live projects', 'Mentorship', 'Certification'], icon: 'briefcase' },
];

export const facilities = [
  { title: 'Modern labs', text: 'Computer labs with high-speed internet and the latest software tools.' },
  { title: 'Small batch size', text: 'Limited students per batch for personal attention and better learning.' },
  { title: 'Interview preparation', text: 'Mock interviews, resume building and placement-focused guidance.' },
  { title: 'Learning resources', text: 'Lifetime access to study material, recordings and practical resources.' },
  { title: 'Industry connect', text: 'Regular interaction with industry experts and professional mentors.' },
  { title: 'Career growth', text: 'Continuous guidance, career planning and professional development.' },
];

export const trainers = [
  { code: 'SAP', title: 'SAP Expert Trainer', text: 'Learn SAP from certified professionals with long experience in ERP and business solutions.', tags: ['SAP FICO', 'SAP MM', 'SAP SD', 'SAP HANA'] },
  { code: 'FS', title: 'Full Stack Development Trainer', text: 'Master front-end and back-end technologies through live projects and real application development.', tags: ['Java', 'Python', 'React JS', 'Angular'] },
  { code: 'AI', title: 'Data Science & AI Trainer', text: 'Build expertise in AI, machine learning, data analytics and generative AI with practical training.', tags: ['AI', 'Machine learning', 'Analytics', 'Python'] },
];

export const internshipBenefits = [
  { title: 'Hands-on experience', text: 'Work on real-world projects and gain practical industry exposure.' },
  { title: 'Expert mentorship', text: 'Learn directly from experienced professionals and industry experts.' },
  { title: 'Skill development', text: 'Improve technical, communication and project execution skills.' },
  { title: 'Professional network', text: 'Build connections with professionals and fellow learners.' },
];

export const batches = [
  { course: 'SAP FICO', mode: 'Online & classroom', slug: 'sap-all-modules-training', demo: 'SAP FICO Training' },
  { course: 'Python Full Stack', mode: 'Online & classroom', slug: 'python-full-stack-training', demo: 'Python Full Stack Training' },
  { course: 'Power BI', mode: 'Online & classroom', slug: 'power-bi-training', demo: 'Power BI Training' },
  { course: 'Java Full Stack', mode: 'Online & classroom', slug: 'java-full-stack', demo: 'Java Full Stack Training' },
];

export const whyChoose = [
  'Experienced corporate trainers', 'Live projects & practical training', 'Industry-standard tools & technologies',
  'Module-wise assignments & assessments', 'Individual student focus', 'Soft skills & communication training',
  'Mock interviews by industry experts', 'Placement assistance & career support',
];

export const allProgrammes = [
  'SAP FICO', 'SAP MM', 'SAP SD', 'SAP ABAP', 'SAP End User', 'SAP All Modules', 'Salesforce', 'Power BI', 'Cloud Computing',
  'Business Analyst', 'Digital Marketing', 'Software Testing', 'Manual Testing', 'Automation Testing', 'Java Full Stack',
  'Python Full Stack', 'React JS', 'Angular', 'Data Analytics', 'Data Science', 'AWS', 'DevOps', 'AWS & DevOps', 'Advanced AI',
  'Machine Learning', 'SQL', 'Linux Administration', 'Networking', 'Internship Programs', 'Placement Training',
];

export const nav = [
  { label: 'Home', href: '' },
  { label: 'About', href: 'about-us/' },
  { label: 'Courses', href: 'courses/', mega: true },
  { label: 'Internship', href: 'internship/' },
  { label: 'Placements', href: 'placements/' },
  { label: 'Events', href: 'events/' },
  { label: 'Contact', href: 'contact-us/' },
];
