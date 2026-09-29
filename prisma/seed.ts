import { prisma } from '../lib/db/prisma';
import bcrypt from 'bcryptjs';

async function main() {
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@rkinfo.local';
  const adminPassword = process.env.ADMIN_PASSWORD || 'password';
  const hashedPassword = await bcrypt.hash(adminPassword, 10);

  // Admin User
  const admin = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      email: adminEmail,
      password: hashedPassword,
      name: 'Rahul Kumar',
    },
  });

  console.log(`Admin created: ${admin.email}`);

  // About Profile
  await prisma.aboutProfile.create({
    data: {
      name: 'Rahul Kumar',
      designation: 'Founder & Software Developer',
      bio: 'I design and develop custom web, mobile, desktop and AI-powered solutions tailored to your business needs.',
      skills: 'Next.js, React, TypeScript, Python, Tailwind CSS, PostgreSQL, SQLite, OpenCV, PySide6',
      visibility: true,
    }
  });

  // Services
  const services = [
    { title: 'Web Application Development', slug: 'web-application-development', description: 'Custom web applications built with Next.js and React.', features: 'Responsive Design, API Integration, Secure Authentication', published: true, displayOrder: 1 },
    { title: 'Mobile App Development', slug: 'mobile-app-development', description: 'Cross-platform mobile apps using Flutter and React Native.', features: 'iOS & Android, Native Performance, Offline Support', published: true, displayOrder: 2 },
    { title: 'Desktop Software', slug: 'desktop-software', description: 'High-performance desktop applications.', features: 'Windows & macOS, Hardware Integration, Offline Mode', published: true, displayOrder: 3 },
    { title: 'ERP & Management Systems', slug: 'erp-management-systems', description: 'Comprehensive enterprise resource planning solutions.', features: 'Inventory Management, HR Module, Analytics', published: true, displayOrder: 4 },
    { title: 'AI Chatbots', slug: 'ai-chatbots', description: 'Intelligent conversational agents for customer support.', features: 'NLP, Context Awareness, CRM Integration', published: true, displayOrder: 5 },
    { title: 'AI Automation', slug: 'ai-automation', description: 'Automate business processes with AI.', features: 'Data Processing, Workflow Automation, Machine Learning', published: true, displayOrder: 6 },
    { title: 'API & Backend Development', slug: 'api-backend-development', description: 'Robust and scalable backend APIs.', features: 'RESTful APIs, GraphQL, Microservices', published: true, displayOrder: 7 },
  ];

  for (const s of services) {
    await prisma.service.upsert({
      where: { slug: s.slug },
      update: {},
      create: s,
    });
  }

  // Projects
  const projects = [
    {
      title: 'School Management ERP',
      slug: 'school-management-erp',
      shortDescription: 'Comprehensive school management system.',
      description: 'A complete ERP solution for educational institutions managing students, fees, and more.',
      category: 'Desktop Software',
      clientType: 'Educational Institution',
      status: 'Completed',
      technologies: 'Python, PySide6, SQLite, Azure',
      features: 'Student Management, Fee Management, Transfer Certificate, ID Card, Dashboard, Backup & Restore',
      featured: true,
      published: true,
      displayOrder: 1,
    },
    {
      title: 'Vehicle Detection & Counting Software',
      slug: 'vehicle-detection-counting',
      shortDescription: 'AI-powered traffic analysis tool.',
      description: 'Software for detecting and counting vehicles in real-time using computer vision.',
      category: 'AI & Automation',
      clientType: 'Government / Enterprise',
      status: 'Completed',
      technologies: 'Python, OpenCV, PySide6',
      features: 'Real-time Detection, Analytics Dashboard, Video Support',
      featured: true,
      published: true,
      displayOrder: 2,
    },
    {
      title: 'AI-powered Job / Content Platform',
      slug: 'ai-job-content-platform',
      shortDescription: 'Next-generation platform for job seekers and content creators.',
      description: 'A modern web platform utilizing AI to match jobs and curate content.',
      category: 'Web Application',
      clientType: 'Startup',
      status: 'Completed',
      technologies: 'Next.js, MongoDB, AI APIs, Cloudinary',
      features: 'AI Matching, Real-time Chat, Portfolio Hosting',
      featured: true,
      published: true,
      displayOrder: 3,
    }
  ];

  for (const p of projects) {
    await prisma.project.upsert({
      where: { slug: p.slug },
      update: {},
      create: p,
    });
  }

  // Team Member
  await prisma.teamMember.create({
    data: {
      name: 'Rahul Kumar',
      designation: 'Founder & Software Developer',
      bio: 'Passionate software developer specializing in full-stack web and AI applications.',
      skills: 'Architecture, AI, Web Development',
      published: true,
      displayOrder: 1,
    }
  });

  console.log('Seed completed.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
