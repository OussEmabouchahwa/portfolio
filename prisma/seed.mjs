import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Clear existing data
  await prisma.project.deleteMany({})
  await prisma.experience.deleteMany({})
  await prisma.certification.deleteMany({})
  await prisma.media.deleteMany({})

  // 1. Projects
  const projects = [
    {
      title: 'Virtual Menu System',
      description: 'A digital menu & table ordering platform built for restaurants. Replaces physical menus with a multilingual, QR-based experience featuring real-time product management, category customization, and instant ordering.',
      problem: 'Restaurants needed an affordable, contactless digital ordering experience with instant menu updates.',
      solution: 'Engineered a high-performance Next.js application backed by PostgreSQL with real-time updates and low-latency QR loading.',
      techStack: 'Next.js, TypeScript, PostgreSQL, Prisma, Tailwind CSS, Framer Motion',
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80'
      ]),
      liveUrl: 'https://virtual-menu-demo.vercel.app',
      githubUrl: 'https://github.com/oussema-bouchahwa/virtual-menu',
      client: 'Restaurant Client',
      year: '2024',
      isFeatured: true,
    },
    {
      title: 'Route Insolite — Travel Booking Platform',
      description: 'A complete reservation & operational workflow system engineered for a leading travel agency. Streamlines client itineraries, booking status, multi-destination tours, and administrative invoicing.',
      problem: 'Legacy manual booking spreadsheets were error-prone and caused double bookings during peak travel seasons.',
      solution: 'Architected a custom web system with real-time seat tracking, automated PDF itinerary generation, and role-based access control.',
      techStack: 'React, Node.js, Express, PostgreSQL, System Architecture',
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1200&q=80'
      ]),
      liveUrl: 'https://route-insolite.tn',
      githubUrl: 'https://github.com/oussema-bouchahwa/route-insolite',
      client: 'Route Insolite Travel',
      year: '2024',
      isFeatured: true,
    },
    {
      title: 'AI Creative Suite & Visual Engine',
      description: 'An AI-assisted multimedia visual generation platform designed for creators and editors. Integrates custom prompt engines, style transfer algorithms, and image enhancement pipelines.',
      problem: 'Digital creators needed an integrated workflow to rapidly prototype visual assets without jumping between 5 different tools.',
      solution: 'Created an intuitive Web UI backed by Python microservices that orchestrate generative AI models with instant canvas previews.',
      techStack: 'Python, PyTorch, Next.js, WebSockets, Tailwind CSS',
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80'
      ]),
      liveUrl: null,
      githubUrl: 'https://github.com/oussema-bouchahwa/ai-creative-suite',
      client: 'Personal R&D',
      year: '2024',
      isFeatured: true,
    },
    {
      title: 'Data Intelligence Analytics Dashboard',
      description: 'A business intelligence suite aggregating multi-source financial and operational metrics into interactive dashboards with automated trend alerts.',
      problem: 'Executives were spending hours assembling manual weekly performance reports in Excel.',
      solution: 'Designed automated SQL data ingestion pipelines and interactive Power BI / Web charts for real-time executive reporting.',
      techStack: 'Power BI, SQL, Python Data Analytics, Recharts',
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80'
      ]),
      liveUrl: null,
      githubUrl: 'https://github.com/oussema-bouchahwa/data-analytics-dashboard',
      client: 'Enterprise Analytics',
      year: '2023',
      isFeatured: false,
    }
  ]

  for (const p of projects) {
    await prisma.project.create({ data: p })
  }
  console.log(`✅ Seeded ${projects.length} projects.`)

  // 2. Experiences
  const experiences = [
    {
      role: 'Engineering Cycle — Computer Science (Year 2)',
      company: 'IPSAS Sfax',
      duration: '2026 — Present',
      description: 'Advanced software engineering curriculum covering system architecture, database modeling, algorithms, and distributed applications.',
      skillsUsed: 'Java, SQL, System Architecture, C++',
      orderIndex: 1,
    },
    {
      role: 'Engineering Internship',
      company: 'LeadRTech — Sfax',
      duration: 'Previous',
      description: 'Engineering development workflow, full-stack web application development, and SQL query optimization.',
      skillsUsed: 'Full-Stack, PostgreSQL, Web Engineering',
      orderIndex: 2,
    },
    {
      role: 'Mobile & Software Development Intern',
      company: 'Viss Tunisie — Sfax',
      duration: 'Previous',
      description: 'Mobile software engineering, UI implementation, and client application development in an agile team.',
      skillsUsed: 'Mobile Dev, Software Engineering, REST APIs',
      orderIndex: 3,
    },
    {
      role: 'Full-Stack Software Developer & Visual Creator',
      company: 'Route Insolite Travel Agency',
      duration: 'Previous',
      description: 'Engineered a complete multi-destination reservation management system. Also conducted client photography, produced travel promotional videos, and directed digital campaign visual assets.',
      skillsUsed: 'Full-Stack, React, SQL, Photography, Video Editing',
      orderIndex: 4,
    },
    {
      role: 'Technician Diploma — Multimedia & Web Development',
      company: 'ISET Djerba',
      duration: 'Earlier',
      description: 'Comprehensive foundation in web technology, graphic design, photography, video production, and user experience.',
      skillsUsed: 'Web Dev, Photoshop, Photography, UI/UX Design',
      orderIndex: 5,
    },
    {
      role: 'Design Lead / Chef Design',
      company: 'Club SOS Village (Engineering Cycle Year 1)',
      duration: 'Leadership',
      description: 'Led visual design direction, brand identity, and media campaign assets for community engineering initiatives.',
      skillsUsed: 'Visual Design, Team Leadership, Brand Identity',
      orderIndex: 6,
    }
  ]

  for (const e of experiences) {
    await prisma.experience.create({ data: e })
  }
  console.log(`✅ Seeded ${experiences.length} experiences.`)

  // 3. Certifications (Real DataCamp & Official Certificates)
  const certs = [
    {
      title: 'AI Engineer for Developers Associate',
      issuer: 'DataCamp / Professional Badge',
      date: '2024',
      credentialId: 'SQA0018432953555',
      credentialUrl: 'https://www.datacamp.com/statement-of-accomplishment/course/ai-engineer-for-developers',
      imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=400&q=80',
      orderIndex: 1,
    },
    {
      title: 'Intermediate Java',
      issuer: 'DataCamp',
      date: '2024',
      credentialId: 'DC-JAVA-INT-8849',
      credentialUrl: 'https://www.datacamp.com/statement-of-accomplishment/course/intermediate-java',
      imageUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=400&q=80',
      orderIndex: 2,
    },
    {
      title: 'Introduction to Object-Oriented Programming in Java',
      issuer: 'DataCamp',
      date: '2024',
      credentialId: 'DC-JAVA-OOP-4412',
      credentialUrl: 'https://www.datacamp.com/statement-of-accomplishment/course/intro-to-oop-in-java',
      imageUrl: null,
      orderIndex: 3,
    },
    {
      title: 'Intermediate SQL',
      issuer: 'DataCamp',
      date: '2024',
      credentialId: 'DC-SQL-INT-9921',
      credentialUrl: 'https://www.datacamp.com/statement-of-accomplishment/course/intermediate-sql',
      imageUrl: null,
      orderIndex: 4,
    },
    {
      title: 'DAX Data Analysis in Power BI',
      issuer: 'DataCamp',
      date: '2024',
      credentialId: 'DC-PBI-DAX-7712',
      credentialUrl: 'https://www.datacamp.com/statement-of-accomplishment/course/dax-in-power-bi',
      imageUrl: null,
      orderIndex: 5,
    },
    {
      title: 'GitHub Foundations & Version Control',
      issuer: 'GitHub / DataCamp',
      date: '2024',
      credentialId: 'GH-FOUND-33019',
      credentialUrl: 'https://github.com/verify',
      imageUrl: null,
      orderIndex: 6,
    }
  ]

  for (const c of certs) {
    await prisma.certification.create({ data: c })
  }
  console.log(`✅ Seeded ${certs.length} real certifications.`)

  // 4. Media Vault
  const mediaItems = [
    {
      url: '/my photos/my photo.jpg',
      category: 'Portraits',
      altText: 'Oussema Bouchahwa Portrait',
    },
    {
      url: '/my photos/my logo offeciel.png',
      category: 'Visual Design',
      altText: 'Official OB Brand Mark',
    },
    {
      url: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=800&q=80',
      category: 'Photography',
      altText: 'Sahara Expedition',
    },
    {
      url: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=800&q=80',
      category: 'Photography',
      altText: 'Anniversary Session',
    }
  ]

  for (const m of mediaItems) {
    await prisma.media.create({ data: m })
  }
  console.log(`✅ Seeded ${mediaItems.length} media items.`)

  console.log('✨ Seeding complete!')
}

main()
  .catch((e) => {
    console.error('❌ Seeding error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
