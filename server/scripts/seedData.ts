import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import { database } from '../config/database';
import { User } from '../models/User';
import { Project } from '../models/Project';
import { BlogPost } from '../models/BlogPost';
import { Skill } from '../models/Skill';
import { Experience } from '../models/Experience';
import { Testimonial } from '../models/Testimonial';

dotenv.config({ path: '.env.local' });

const seedData = async () => {
  try {
    await database.connect();
    const db = database.getDb();

    console.log('🌱 Seeding database...');

    // Clear existing data
    await db.collection('users').deleteMany({});
    await db.collection('projects').deleteMany({});
    await db.collection('blogPosts').deleteMany({});
    await db.collection('skills').deleteMany({});
    await db.collection('experiences').deleteMany({});
    await db.collection('testimonials').deleteMany({});

    // Create admin user
    const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD || 'admin123', 12);
    const adminUser: User = {
      email: process.env.ADMIN_EMAIL || 'admin@portfolio.com',
      password: hashedPassword,
      name: 'Alex Morgan',
      role: 'admin',
      createdAt: new Date(),
      updatedAt: new Date()
    };
    await db.collection('users').insertOne(adminUser);

    // Seed projects
    const projects: Project[] = [
      {
        title: 'Analytics Dashboard',
        slug: 'analytics-dashboard',
        description: 'A comprehensive analytics platform for tracking user engagement and system performance in real-time.',
        content: 'Detailed project description and case study...',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCB-MQ9hlvJy6NwHJ83NBDxHgkyFleHWliwETYzW6U40PplmT6uyHeV00K8GTP2yOVLvTt9YtQbuZUyqGtbGCsgJzvKRqhBz31g1G6EzwKnxLlz2wt1YmaDL3RAf44iblCZdviiG58pkgL3T_mdyp57ugDl5ma-3X4kevzg137uaqy88C46OJlOZGyaRzd_KfqygkKWp5NLTyoOkzRKv_J0HcL88r58e-32xx4VdvjUiBI-4cahciMFZrsxEjY5DPH1lKkZHiTA3kM',
        tags: ['React', 'Node.js', 'D3.js', 'MongoDB'],
        status: 'live',
        category: 'Web Application',
        demoUrl: 'https://analytics-demo.com',
        githubUrl: 'https://github.com/alexmorgan/analytics',
        featured: true,
        order: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'E-Commerce Platform',
        slug: 'ecommerce-platform',
        description: 'A modern e-commerce solution with seamless checkout, inventory management, and admin controls.',
        content: 'Detailed project description and case study...',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC7M9tT25k0i4e8ATr2coWfCtgzG-2-mWk5TcvW8ebt5bXWsPs2ygXKduJPqpVBOeuDuWLrH9HhiSZIxj3PMu6UOM1CR9QgKLcYQvymBgmcnt0vkjZTUyh_fIK3xZPzROQ8rlamQrf4RqocXrDbM53cFDgLacad5FueLzaSpx6NHwWybp9OSGnwHBMRa_ojS5xezPCGVJq0QYy1RulyJ-FKnL3Oex7q2F9KUqxhD_COl6JygQ4CU1VoaingDeXJjIeIxT2CTHuDU_o',
        tags: ['Next.js', 'Tailwind CSS', 'Stripe', 'PostgreSQL'],
        status: 'live',
        category: 'Web Application',
        demoUrl: 'https://ecommerce-demo.com',
        githubUrl: 'https://github.com/alexmorgan/ecommerce',
        featured: true,
        order: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Social Connect App',
        slug: 'social-connect',
        description: 'A cross-platform mobile application focusing on community building and real-time messaging.',
        content: 'Detailed project description and case study...',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAARnyYAeVWYEwj_tAw4mMHwD6r5Ohy8jk0HFjOpO8gYfrr8KytXAOMApv1ZiLWbBFpkFZ6j5HUOZx9rM-oyJRf9StEOO8PNXiOvbWIfVOLoybovObFd5iQ2lVGPTSN_4SbQ9gfx0a1mULpCsbjnQUdO5bz-o091bMh97b6BkSe1XQa7QWRADVjADLIszJ8NH_t2fW8cCoLkP7UyjjoY3nQ6VhjA5Ku0Ep47-my65quUsSg3hPBsfyXc2FN99tIGPCeE13ITtQAJTU',
        tags: ['Flutter', 'Firebase', 'Dart'],
        status: 'live',
        category: 'Mobile Application',
        demoUrl: 'https://social-connect-demo.com',
        githubUrl: 'https://github.com/alexmorgan/social-connect',
        featured: false,
        order: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];
    await db.collection('projects').insertMany(projects);

    // Seed blog posts
    const blogPosts: BlogPost[] = [
      {
        title: 'Building Scalable APIs with Node.js',
        slug: 'building-scalable-apis-nodejs',
        excerpt: 'Learn how to structure your Node.js applications for enterprise-level scale, handling concurrency, and implementing robust error handling patterns.',
        content: 'Full content about Node.js APIs...',
        image: 'https://picsum.photos/800/450?random=1',
        category: 'development',
        tags: ['Node.js', 'API', 'Backend', 'Scalability'],
        status: 'published',
        featured: true,
        readTime: 5,
        views: 1250,
        createdAt: new Date('2023-10-24'),
        updatedAt: new Date('2023-10-24'),
        publishedAt: new Date('2023-10-24')
      },
      {
        title: 'Why I switched to Figma for UI Design',
        slug: 'why-i-switched-to-figma',
        excerpt: 'A breakdown of the features that make Figma the superior tool for collaborative interface design in 2024 compared to Sketch and Adobe XD.',
        content: 'Full content about Figma...',
        image: 'https://picsum.photos/800/450?random=2',
        category: 'design',
        tags: ['Figma', 'UI Design', 'Tools'],
        status: 'published',
        featured: false,
        readTime: 3,
        views: 890,
        createdAt: new Date('2023-10-18'),
        updatedAt: new Date('2023-10-18'),
        publishedAt: new Date('2023-10-18')
      }
    ];
    await db.collection('blogPosts').insertMany(blogPosts);

    // Seed skills
    const skills: Skill[] = [
      { name: 'React', category: 'frontend', proficiency: 95, icon: 'code_blocks', status: 'active', order: 1, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Node.js', category: 'backend', proficiency: 90, icon: 'dns', status: 'active', order: 2, createdAt: new Date(), updatedAt: new Date() },
      { name: 'TypeScript', category: 'frontend', proficiency: 90, icon: 'data_object', status: 'active', order: 3, createdAt: new Date(), updatedAt: new Date() },
      { name: 'MongoDB', category: 'backend', proficiency: 85, icon: 'database', status: 'active', order: 4, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Figma', category: 'design', proficiency: 85, icon: 'design_services', status: 'active', order: 5, createdAt: new Date(), updatedAt: new Date() },
      { name: 'AWS', category: 'devops', proficiency: 75, icon: 'cloud', status: 'active', order: 6, createdAt: new Date(), updatedAt: new Date() }
    ];
    await db.collection('skills').insertMany(skills);

    // Seed experiences
    const experiences: Experience[] = [
      {
        title: 'Senior Frontend Engineer',
        company: 'TechFlow Systems',
        location: 'New York, NY',
        startDate: new Date('2022-01-01'),
        current: true,
        description: 'Leading the frontend architecture migration for a high-traffic SaaS platform. Implemented a new design system using React and Tailwind CSS that improved development velocity by 40%.',
        order: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Full Stack Developer',
        company: 'Creative Pulse Agency',
        location: 'San Francisco, CA',
        startDate: new Date('2019-03-01'),
        endDate: new Date('2021-12-31'),
        current: false,
        description: 'Developed and maintained over 15 client websites and web applications. Utilized the MERN stack to build custom e-commerce solutions.',
        order: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];
    await db.collection('experiences').insertMany(experiences);

    // Seed testimonials
    const testimonials: Testimonial[] = [
      {
        name: 'Sarah Jenkins',
        role: 'CTO',
        company: 'TechStart Inc.',
        content: 'Alex is a rare breed of developer who understands design just as well as code. The project was delivered on time and exceeded our expectations.',
        rating: 5,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAv6oRBY2hAVfiu5B4F41eLt3QI64TFSYkiPXR85tGrk5yhm4upBA7qi_H4a909cDKcOhMUh3E2Jrgw6ByE1eSsjSAKerXCQwMFjHATKC35VLs-xhhHfFgEabVkROtoi6ep4ZxAoyhApbcmEzWBnJqO84DNrGBmEPipgV1KXtw0r5TLF6sA4QIoBo6Wl5qkivz9Tlap60oNo9XBZuXTH75E1SblVpnVc2xCd2rooIepVW-sJoUHiRtE2di4ZadaBCj1ifTb-TjO5ww',
        visibility: 'show',
        status: 'live',
        order: 1,
        createdAt: new Date('2023-03-10'),
        updatedAt: new Date('2023-03-10')
      },
      {
        name: 'Michael Chen',
        role: 'Product Manager',
        company: 'FlowCo',
        content: 'Incredible attention to detail. The admin panel Alex built for us has streamlined our operations significantly. Highly recommended!',
        rating: 5,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBYjC2tlHdF1_PvYR5ySaMzXOtQtTMDcpUr48zBwQWayBK43RPfs4NsTQz8X38NcdHKxFlT8lIf3gseiEsA7THvneT436TkCvMvcvmvHm_uS1NJWjmPHQ5_JzdQ2rWnG_5qCX1mfLYd9NIci7tq2c7Iy0EyQQUZgSmU2FTBuESjI9CkGlafqCpxtEmHfsJIk_EZ5-XEz3C_sagWI4WlKeRP61Ct0o5LlBM58KtWfapdVaB-48hsDVOJT74I54Q9RpU-iFpLg0a0Cnc',
        visibility: 'show',
        status: 'live',
        order: 2,
        createdAt: new Date('2023-03-09'),
        updatedAt: new Date('2023-03-09')
      }
    ];
    await db.collection('testimonials').insertMany(testimonials);

    console.log('✅ Database seeded successfully!');
    console.log(`👤 Admin user created: ${adminUser.email}`);
    console.log(`🔑 Admin password: ${process.env.ADMIN_PASSWORD || 'admin123'}`);
    
  } catch (error) {
    console.error('❌ Error seeding database:', error);
  } finally {
    await database.disconnect();
    process.exit(0);
  }
};

seedData();