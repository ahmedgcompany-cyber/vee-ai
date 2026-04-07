export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: 'admin' | 'premium' | 'free';
  createdAt: Date;
  downloads: Download[];
  purchases: Purchase[];
  subscriptions: Subscription[];
  favorites: string[];
  uploads?: UserUpload[];
}

export interface UserUpload {
  id: string;
  title: string;
  type: 'app' | 'game' | 'ai-agent' | 'blog' | 'video' | 'software';
  status: 'draft' | 'pending' | 'published' | 'rejected';
  downloads: number;
  revenue: number;
  uploadedAt: Date;
}

export interface Download {
  id: string;
  productId: string;
  productName: string;
  downloadedAt: Date;
  version: string;
}

export interface Purchase {
  id: string;
  productId: string;
  productName: string;
  price: number;
  purchasedAt: Date;
  status: 'completed' | 'pending' | 'refunded';
}

export interface Subscription {
  id: string;
  planId: string;
  planName: string;
  status: 'active' | 'cancelled' | 'expired';
  startDate: Date;
  endDate: Date;
  price: number;
  interval: 'monthly' | 'yearly';
}

export interface Product {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  category: 'ai-tools' | 'saas-apps' | 'games' | 'experiments' | 'design-systems';
  type: 'free' | 'paid' | 'subscription' | 'trial';
  price?: number;
  subscriptionPrice?: {
    monthly: number;
    yearly: number;
  };
  trialDays?: number;
  images: string[];
  video?: string;
  features: string[];
  techStack: string[];
  version: string;
  downloads: number;
  rating: number;
  reviews: Review[];
  tags: string[];
  releaseDate: Date;
  lastUpdated: Date;
  fileSize?: string;
  fileUrl?: string;
  authorId?: string;
  authorName?: string;
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  comment: string;
  createdAt: Date;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  image: string;
  techStack: string[];
  problemSolved: string;
  demoUrl?: string;
  githubUrl?: string;
  caseStudyUrl?: string;
  featured: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar?: string;
  quote: string;
  projectName: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
}

export interface StackItem {
  name: string;
  icon: string;
  category: 'frontend' | 'backend' | 'database' | 'deployment' | 'design';
}

export interface ContactForm {
  name: string;
  email: string;
  projectType: string;
  budget: string;
  message: string;
  attachments?: File[];
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  authorAvatar?: string;
  coverImage: string;
  tags: string[];
  publishedAt: Date;
  readTime: number;
  likes: number;
  comments: number;
}

export interface VideoContent {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  videoUrl: string;
  duration: string;
  views: number;
  likes: number;
  uploadedAt: Date;
  authorId: string;
  authorName: string;
}

export interface Analytics {
  totalRevenue: number;
  totalDownloads: number;
  totalUsers: number;
  activeSubscriptions: number;
  popularProducts: {
    productId: string;
    productName: string;
    downloads: number;
    revenue: number;
  }[];
  monthlyGrowth: {
    month: string;
    revenue: number;
    downloads: number;
    users: number;
  }[];
  userActivity?: {
    date: string;
    active: number;
    new: number;
  }[];
}

export interface UploadFormData {
  title: string;
  description: string;
  type: 'app' | 'game' | 'ai-agent' | 'blog' | 'video' | 'software';
  category: string;
  price: number;
  pricingType: 'free' | 'paid' | 'subscription';
  files: File[];
  thumbnail?: File;
  tags: string[];
  techStack: string[];
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'info' | 'warning' | 'error';
  read: boolean;
  createdAt: Date;
}
