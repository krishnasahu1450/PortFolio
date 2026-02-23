
import { Project, BlogPost, Skill, Experience, Testimonial, Message } from './types';

export const PROJECTS: any[] = [
  {
    id: '1',
    title: 'Analytics Dashboard',
    slug: 'analytics-dashboard',
    description: 'A comprehensive analytics platform for tracking user engagement and system performance in real-time.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCB-MQ9hlvJy6NwHJ83NBDxHgkyFleHWliwETYzW6U40PplmT6uyHeV00K8GTP2yOVLvTt9YtQbuZUyqGtbGCsgJzvKRqhBz31g1G6EzwKnxLlz2wt1YmaDL3RAf44iblCZdviiG58pkgL3T_mdyp57ugDl5ma-3X4kevzg137uaqy88C46OJlOZGyaRzd_KfqygkKWp5NLTyoOkzRKv_J0HcL88r58e-32xx4VdvjUiBI-4cahciMFZrsxEjY5DPH1lKkZHiTA3kM',
    tags: ['React', 'Node.js', 'D3.js'],
    status: 'Live',
    category: 'Web App'
  },
  {
    id: '2',
    title: 'E-Commerce Platform',
    slug: 'ecommerce-platform',
    description: 'A modern e-commerce solution with seamless checkout, inventory management, and admin controls.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC7M9tT25k0i4e8ATr2coWfCtgzG-2-mWk5TcvW8ebt5bXWsPs2ygXKduJPqpVBOeuDuWLrH9HhiSZIxj3PMu6UOM1CR9QgKLcYQvymBgmcnt0vkjZTUyh_fIK3xZPzROQ8rlamQrf4RqocXrDbM53cFDgLacad5FueLzaSpx6NHwWybp9OSGnwHBMRa_ojS5xezPCGVJq0QYy1RulyJ-FKnL3Oex7q2F9KUqxhD_COl6JygQ4CU1VoaingDeXJjIeIxT2CTHuDU_o',
    tags: ['Tailwind', 'Next.js', 'Stripe'],
    status: 'live',
    category: 'Web App'
  },
  {
    id: '3',
    title: 'Social Connect App',
    slug: 'social-connect',
    description: 'A cross-platform mobile application focusing on community building and real-time messaging.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAARnyYAeVWYEwj_tAw4mMHwD6r5Ohy8jk0HFjOpO8gYfrr8KytXAOMApv1ZiLWbBFpkFZ6j5HUOZx9rM-oyJRf9StEOO8PNXiOvbWIfVOLoybovObFd5iQ2lVGPTSN_4SbQ9gfx0a1mULpCsbjnQUdO5bz-o091bMh97b6BkSe1XQa7QWRADVjADLIszJ8NH_t2fW8cCoLkP7UyjjoY3nQ6VhjA5Ku0Ep47-my65quUsSg3hPBsfyXc2FN99tIGPCeE13ITtQAJTU',
    tags: ['Flutter', 'Firebase'],
    status: 'live',
    category: 'Mobile App'
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: '1',
    title: 'Building Scalable APIs with Node.js',
    excerpt: 'Learn how to structure your Node.js applications for enterprise-level scale, handling concurrency, and implementing robust error handling patterns.',
    content: 'Full content about Node.js APIs...',
    date: 'Oct 24, 2023',
    readTime: '5 min read',
    category: 'Development',
    image: 'https://picsum.photos/800/450?random=1',
    status: 'Published'
  },
  {
    id: '2',
    title: 'Why I switched to Figma for UI Design',
    excerpt: 'A breakdown of the features that make Figma the superior tool for collaborative interface design in 2024 compared to Sketch and Adobe XD.',
    content: 'Full content about Figma...',
    date: 'Oct 18, 2023',
    readTime: '3 min read',
    category: 'Design',
    image: 'https://picsum.photos/800/450?random=2',
    status: 'Published'
  },
  {
    id: '3',
    title: 'The State of WebAssembly in 2024',
    excerpt: 'WebAssembly is no longer just a buzzword. Explore how major companies are adopting Wasm for performance-critical tasks in the browser.',
    content: 'Full content about Wasm...',
    date: 'Sep 02, 2023',
    readTime: '8 min read',
    category: 'Tech Trends',
    image: 'https://picsum.photos/800/450?random=3',
    status: 'Published'
  }
];

export const SKILLS: Skill[] = [
  { id: '1', name: 'React', category: 'Frontend', proficiency: 95, status: 'Active', icon: 'code_blocks' },
  { id: '2', name: 'Node.js', category: 'Backend', proficiency: 90, status: 'Active', icon: 'dns' },
  { id: '3', name: 'TypeScript', category: 'Frontend', proficiency: 90, status: 'Active', icon: 'data_object' },
  { id: '4', name: 'Figma', category: 'Design', proficiency: 85, status: 'Active', icon: 'design_services' },
  { id: '5', name: 'Python', category: 'Backend', proficiency: 80, status: 'Active', icon: 'terminal' },
  { id: '6', name: 'Tailwind CSS', category: 'Frontend', proficiency: 95, status: 'Active', icon: 'css' },
  { id: '7', name: 'AWS', category: 'DevOps', proficiency: 75, status: 'Active', icon: 'cloud' },
  { id: '8', name: 'SQL / NoSQL', category: 'Backend', proficiency: 85, status: 'Active', icon: 'database' },
];

export const EXPERIENCES: Experience[] = [
  {
    id: '1',
    title: 'Senior Frontend Engineer',
    company: 'TechFlow Systems',
    location: 'New York, NY',
    startDate: 'Jan 2022',
    endDate: 'Present',
    current: true,
    description: 'Leading the frontend architecture migration for a high-traffic SaaS platform. Implemented a new design system using React and Tailwind CSS that improved development velocity by 40%.',
    logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBojA3_9AEhn0I4dh9_eBQm8yjZ8CixX3BULK6fy1vcppEVuC9-SzAg7BoilIMIhqlie0rfdDwAni381cS0a4kb30vYPv8BOzSO0n9FsD5fpppB01eX0g4yzIfCjo3TBJCew80kAN1eVPxS0jRIswgVqp3oHAycyz92oGBHNWniohE8FYSSBMXA1lGAT8n2DBNo0AJ49f32ZyJjqPWl7RhThsJizVmFpf9MLH766kbKQMNG9Vrocu8aMic-yQfp289KHpGGOusfPek'
  },
  {
    id: '2',
    title: 'Full Stack Developer',
    company: 'Creative Pulse Agency',
    location: 'San Francisco, CA',
    startDate: 'Mar 2019',
    endDate: 'Dec 2021',
    current: false,
    description: 'Developed and maintained over 15 client websites and web applications. Utilized the MERN stack to build custom e-commerce solutions.'
  }
];

export const TESTIMONIALS: any[] = [
  {
    id: '1',
    name: 'Sarah Jenkins',
    role: 'CTO',
    company: 'TechStart Inc.',
    content: 'Alex is a rare breed of developer who understands design just as well as code. The project was delivered on time and exceeded our expectations.',
    rating: 5,
    date: 'Mar 10, 2023',
    visibility: 'Show',
    status: 'live',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAv6oRBY2hAVfiu5B4F41eLt3QI64TFSYkiPXR85tGrk5yhm4upBA7qi_H4a909cDKcOhMUh3E2Jrgw6ByE1eSsjSAKerXCQwMFjHATKC35VLs-xhhHfFgEabVkROtoi6ep4ZxAoyhApbcmEzWBnJqO84DNrGBmEPipgV1KXtw0r5TLF6sA4QIoBo6Wl5qkivz9Tlap60oNo9XBZuXTH75E1SblVpnVc2xCd2rooIepVW-sJoUHiRtE2di4ZadaBCj1ifTb-TjO5ww'
  },
  {
    id: '2',
    name: 'Michael Chen',
    role: 'Product Manager',
    company: 'FlowCo',
    content: 'Incredible attention to detail. The admin panel Alex built for us has streamlined our operations significantly. Highly recommended!',
    rating: 5,
    date: 'Mar 09, 2023',
    visibility: 'Show',
    status: 'live',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBYjC2tlHdF1_PvYR5ySaMzXOtQtTMDcpUr48zBwQWayBK43RPfs4NsTQz8X38NcdHKxFlT8lIf3gseiEsA7THvneT436TkCvMvcvmvHm_uS1NJWjmPHQ5_JzdQ2rWnG_5qCX1mfLYd9NIci7tq2c7Iy0EyQQUZgSmU2FTBuESjI9CkGlafqCpxtEmHfsJIk_EZ5-XEz3C_sagWI4WlKeRP61Ct0o5LlBM58KtWfapdVaB-48hsDVOJT74I54Q9RpU-iFpLg0a0Cnc'
  }
];

export const MESSAGES: Message[] = [
  {
    id: '1',
    senderName: 'John Doe',
    senderEmail: 'john.doe@example.com',
    subject: 'Project Inquiry: Freelance Work',
    content: "Hi Alex, I saw your portfolio and loved the case study on the Fintech app. Would you have some availability in the coming weeks to hop on a quick call?",
    date: 'Oct 24, 2023',
    time: '2:30 PM',
    isUnread: true,
    isFlagged: false,
    avatar: 'https://picsum.photos/100/100?random=10'
  },
  {
    id: '2',
    senderName: 'Sarah Smith',
    senderEmail: 'sarah.s@gmail.com',
    subject: 'Collaboration Opportunity',
    content: "Are you available for a quick call next week to discuss a potential partnership?",
    date: 'Oct 24, 2023',
    time: '10:45 AM',
    isUnread: true,
    isFlagged: false,
    avatar: 'https://picsum.photos/100/100?random=11'
  }
];
