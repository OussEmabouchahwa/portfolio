export interface ProjectItem {
  id: string
  title: string
  description: string
  problem?: string | null
  solution?: string | null
  techStack: string
  images: string
  liveUrl: string | null
  githubUrl: string | null
  client: string | null
  year: string | null
  isFeatured: boolean
}

export interface ExperienceItem {
  id: string
  role: string
  company: string
  duration: string
  description: string
  skillsUsed: string
  orderIndex: number
}

export interface CertificationItem {
  id: string
  title: string
  issuer: string
  date: string
  credentialId: string | null
  credentialUrl: string | null
  imageUrl: string | null
  orderIndex: number
}

export const defaultProjects: ProjectItem[] = [
  {
    id: 'proj-1',
    title: 'Route Insolite — Travel Platform',
    description: 'A complete reservation & operational workflow system engineered for Route Insolite in Sfax. Streamlines client itineraries, real-time booking availability, multi-destination excursions, and administrative reporting.',
    problem: 'Manual spreadsheets caused double bookings and friction during high-season Sahara and coastal tours.',
    solution: 'Engineered a full-stack Next.js and PostgreSQL system with real-time seat tracking, automated PDF itinerary exports, and role-based permissions.',
    techStack: 'Next.js 16, TypeScript, PostgreSQL, Prisma, Tailwind CSS',
    images: JSON.stringify([
      'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1200&q=80',
    ]),
    liveUrl: 'https://route-insolite.tn',
    githubUrl: 'https://github.com/oussema-bouchahwa/route-insolite',
    client: 'Route Insolite Travel',
    year: '2024',
    isFeatured: true,
  },
  {
    id: 'proj-2',
    title: 'Virtual Menu & Ordering System',
    description: 'A high-speed digital menu & table ordering application built for restaurants. Replaces physical paper menus with a multilingual, QR-based digital interface featuring instant item updates and low-latency interaction.',
    problem: 'Hospitality venues needed contactless ordering with immediate menu synchronization across stations.',
    solution: 'Built a high-performance Next.js application backed by PostgreSQL with real-time updates and sub-second QR page loads.',
    techStack: 'Next.js, TypeScript, PostgreSQL, Prisma, Tailwind CSS, Framer Motion',
    images: JSON.stringify([
      'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80',
    ]),
    liveUrl: 'https://virtual-menu-demo.vercel.app',
    githubUrl: 'https://github.com/oussema-bouchahwa/virtual-menu',
    client: 'Restaurant Partner',
    year: '2024',
    isFeatured: true,
  },
  {
    id: 'proj-3',
    title: 'AI Creative Suite & Visual Pipeline',
    description: 'An AI-assisted multimedia generation platform designed for creators and editors. Integrates custom prompt engineering pipelines, style transfer experiments, and automated visual asset staging.',
    problem: 'Digital artists had to navigate disparate disconnected tools to prototype visual compositions.',
    solution: 'Designed an intuitive web studio orchestrating generative AI workflows with instant canvas preview and parameter control.',
    techStack: 'Python, PyTorch, Next.js, WebSockets, Tailwind CSS',
    images: JSON.stringify([
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
    ]),
    liveUrl: null,
    githubUrl: 'https://github.com/oussema-bouchahwa/ai-creative-suite',
    client: 'Creative R&D',
    year: '2024',
    isFeatured: false,
  },
  {
    id: 'proj-4',
    title: 'Data Intelligence Analytics Suite',
    description: 'A business intelligence platform aggregating operational and financial metrics into interactive dashboards with automated query optimization and reporting.',
    problem: 'Decision-makers spent hours assembling weekly performance summaries manually in spreadsheets.',
    solution: 'Built automated SQL data pipelines and interactive dashboards for real-time executive visibility.',
    techStack: 'Power BI, SQL, Python, Recharts, Data Modeling',
    images: JSON.stringify([
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
    ]),
    liveUrl: null,
    githubUrl: 'https://github.com/oussema-bouchahwa/data-analytics-dashboard',
    client: 'Enterprise Analytics',
    year: '2023',
    isFeatured: false,
  },
]

export const defaultExperiences: ExperienceItem[] = [
  {
    id: 'exp-1',
    role: 'Engineering Cycle — Computer Science (Year 2)',
    company: 'IPSAS Sfax',
    duration: '2025 — Present',
    description: 'Advanced software engineering curriculum: relational database modeling, system architecture, distributed systems, and algorithm analysis in Java and C++.',
    skillsUsed: 'Java, SQL, System Architecture, C++',
    orderIndex: 1,
  },
  {
    id: 'exp-2',
    role: 'Engineering Intern',
    company: 'LeadRTech — Sfax',
    duration: '2024',
    description: 'Full-stack web application engineering, SQL query optimization, and production deployment workflows in an agile team.',
    skillsUsed: 'Full-Stack, PostgreSQL, Web Engineering',
    orderIndex: 2,
  },
  {
    id: 'exp-3',
    role: 'Mobile & Software Development Intern',
    company: 'Viss Tunisie — Sfax',
    duration: '2024',
    description: 'Mobile interface development and REST API integration in structured development sprint cycles.',
    skillsUsed: 'Mobile Dev, REST APIs, Software Engineering',
    orderIndex: 3,
  },
  {
    id: 'exp-4',
    role: 'Full-Stack Developer & Visual Creator',
    company: 'Route Insolite Travel Agency',
    duration: '2023 — 2024',
    description: 'Architected and shipped the complete booking management platform from schema to UI. Concurrently directed travel photography, client sessions, and video post-production.',
    skillsUsed: 'Next.js, PostgreSQL, Prisma, Photography, DaVinci Resolve',
    orderIndex: 4,
  },
  {
    id: 'exp-5',
    role: 'Technician Diploma — Multimedia & Web',
    company: 'ISET Djerba',
    duration: '2021 — 2023',
    description: 'Comprehensive foundation in web engineering, visual composition, typography, digital media production, and interface design.',
    skillsUsed: 'Web Dev, Photoshop, Photography, UI Design',
    orderIndex: 5,
  },
  {
    id: 'exp-6',
    role: 'Design Lead',
    company: 'Club SOS Village — IPSAS',
    duration: '2024',
    description: 'Directed visual identity, campaign communication assets, and media materials for community engineering initiatives.',
    skillsUsed: 'Visual Design, Brand Identity, Team Leadership',
    orderIndex: 6,
  },
]

export const defaultCertifications: CertificationItem[] = [
  {
    id: 'cert-1',
    title: 'AWS Certified Cloud Practitioner',
    issuer: 'Amazon Web Services (AWS)',
    date: '2024',
    credentialId: 'AWS-99201482',
    credentialUrl: 'https://aws.amazon.com/verification',
    imageUrl: 'https://images.unsplash.com/photo-1607799279861-4dd421887fb3?auto=format&fit=crop&w=400&q=80',
    orderIndex: 1,
  },
  {
    id: 'cert-2',
    title: 'Meta Full-Stack Developer Professional',
    issuer: 'Meta (Coursera)',
    date: '2023',
    credentialId: 'META-FS-883192',
    credentialUrl: 'https://coursera.org/verify/meta-fullstack',
    imageUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=400&q=80',
    orderIndex: 2,
  },
  {
    id: 'cert-3',
    title: 'IBM Data Science Foundations',
    issuer: 'IBM',
    date: '2023',
    credentialId: 'IBM-DS-774120',
    credentialUrl: 'https://ibm.com/verify/datascience',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=400&q=80',
    orderIndex: 3,
  },
  {
    id: 'cert-4',
    title: 'Advanced SQL & Query Optimization',
    issuer: 'DataCamp',
    date: '2024',
    credentialId: 'DC-SQL-554109',
    credentialUrl: 'https://datacamp.com/verify',
    imageUrl: null,
    orderIndex: 4,
  },
  {
    id: 'cert-5',
    title: 'GitHub Foundations',
    issuer: 'GitHub',
    date: '2024',
    credentialId: 'GH-FOUND-33019',
    credentialUrl: 'https://github.com/verify',
    imageUrl: null,
    orderIndex: 5,
  },
  {
    id: 'cert-6',
    title: 'System Architecture & Design Patterns',
    issuer: 'DataCamp / Course',
    date: '2024',
    credentialId: 'SYS-ARCH-1029',
    credentialUrl: 'https://datacamp.com/verify',
    imageUrl: null,
    orderIndex: 6,
  },
]
