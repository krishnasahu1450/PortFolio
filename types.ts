
export interface Project {
  _id?: string;
  title: string;
  slug: string;
  description: string;
  category?: string;
  demoUrl?: string;
  githubUrl?: string;
  featured?: boolean;
  order?: number;
  image: string;
  gallery?: File[];
  tags: string[];
  status: "live" | "draft" | "archived";
}

export interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string;
  category: 'development' | 'design' | 'tech-trends' | 'personal';
  tags: string[];
  status: 'published' | 'draft' | 'archived';
  featured: boolean;
  readTime: number;
  views: number;
  createdAt: Date;
  updatedAt: Date;
  publishedAt?: Date;
}

export interface Skill {
  _id: string;
  name: string;
  category: 'Frontend' | 'Backend' | 'Design' | 'Tools' | 'DevOps';
  proficiency: number;
  status: 'Active' | 'Hidden';
  icon: string;
}

export interface Experience {
  _id?: string;
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
  logo?: string;
}

export interface Testimonial {
  _id?: string;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  image?: string;
  visibility: 'show' | 'hide';
  status: 'live' | 'pending' | 'rejected';
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Message {
  _id: string;
  senderName: string;
  senderEmail: string;
  subject: string;
  content: string;
  date: string;
  time: string;
  isUnread: boolean;
  isFlagged: boolean;
  avatar?: string;
}
