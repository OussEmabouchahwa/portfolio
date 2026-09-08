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
      role: 'Full-Stack Software Engineering Intern',
      company: 'Tech Solutions & Innovation Lab',
      duration: '2024 — Present',
      description: 'Engineered responsive web applications and backend microservices using Next.js, Node.js, and PostgreSQL. Reduced query response times by 35% through SQL index optimization and caching.',
      skillsUsed: 'Next.js, TypeScript, PostgreSQL, Prisma, REST APIs, Git',
      orderIndex: 1,
    },
    {
      role: 'Multidisciplinary Creator & Developer',
      company: 'Oussema Studio (Freelance)',
      duration: '2022 — Present',
      description: 'Designed and developed custom web platforms, brand identities, and visual assets for local and international clients. Delivered end-to-end products combining software design, UI/UX, and video direction.',
      skillsUsed: 'Full-Stack Dev, UI/UX Design, Photography, Videography, Brand Design',
      orderIndex: 2,
    },
    {
      role: 'Software Engineering Student',
      company: 'Software Engineering University',
      duration: '2022 — 2025',
      description: 'Specializing in Software Architecture, Distributed Systems, Database Management, and Artificial Intelligence. Leading student engineering projects and technical workshops.',
      skillsUsed: 'System Architecture, Java, C++, Python, SQL, Agile',
      orderIndex: 3,
    }
  ]

  for (const e of experiences) {
    await prisma.experience.create({ data: e })
  }
  console.log(`✅ Seeded ${experiences.length} experiences.`)

  // 3. Certifications
  const certs = [
    {
      title: 'AWS Certified Cloud Practitioner',
      issuer: 'Amazon Web Services (AWS)',
      date: '2024',
      credentialId: 'AWS-99201482',
      credentialUrl: 'https://aws.amazon.com/verification',
      imageUrl: 'https://images.unsplash.com/photo-1607799279861-4dd421887fb3?auto=format&fit=crop&w=400&q=80',
      orderIndex: 1,
    },
    {
      title: 'Meta Full-Stack Developer Professional',
      issuer: 'Meta (Coursera)',
      date: '2023',
      credentialId: 'META-FS-883192',
      credentialUrl: 'https://coursera.org/verify/meta-fullstack',
      imageUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=400&q=80',
      orderIndex: 2,
    },
    {
      title: 'IBM Data Science Foundations',
      issuer: 'IBM',
      date: '2023',
      credentialId: 'IBM-DS-774120',
      credentialUrl: 'https://ibm.com/verify/datascience',
      imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=400&q=80',
      orderIndex: 3,
    }
  ]

  for (const c of certs) {
    await prisma.certification.create({ data: c })
  }
  console.log(`✅ Seeded ${certs.length} certifications.`)

  // 4. Media Vault
  const mediaItems = [
    {
      url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
      category: 'Photography',
      altText: 'Tech Hardware macro shot',
    },
    {
      url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
      category: 'AI Art',
      altText: 'Abstract 3D digital gradient mesh',
    },
    {
      url: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=800&q=80',
      category: 'Videography',
      altText: 'Cinematic camera rig on set',
    },
    {
      url: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80',
      category: 'Visual Design',
      altText: 'Neon cybernetic poster composition',
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
