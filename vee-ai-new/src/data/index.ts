import type { Product, Project, Testimonial, Service, StackItem, User, BlogPost, VideoContent } from '@/types';

// REAL DATA - Empty until users add content
export const currentUser: User | null = null;

export const sampleUsers: User[] = [];

export const products: Product[] = [];

export const projects: Project[] = [];

export const testimonials: Testimonial[] = [];

export const services: Service[] = [
  {
    id: '1',
    title: 'Web Apps',
    description: 'React/Next.js applications built for performance, accessibility, and scale.',
    icon: 'Globe',
    features: [
      'Performance-first architecture',
      'Accessibility compliant',
      'SEO optimized',
      'Responsive design',
    ],
  },
  {
    id: '2',
    title: 'AI Tools',
    description: 'Prompt systems, agents, and UI wrappers that make AI accessible and useful.',
    icon: 'Brain',
    features: [
      'LLM integration',
      'Prompt engineering',
      'Agent workflows',
      'Custom models',
    ],
  },
  {
    id: '3',
    title: 'Games',
    description: 'Canvas/WebGL games with tight controls, juice, and memorable experiences.',
    icon: 'Gamepad2',
    features: [
      '60fps performance',
      'Input polish',
      'Particle effects',
      'Audio design',
    ],
  },
  {
    id: '4',
    title: 'Design Systems',
    description: 'Tokens, components, and documentation that scale with your team.',
    icon: 'Palette',
    features: [
      'Component libraries',
      'Design tokens',
      'Documentation',
      'Figma integration',
    ],
  },
];

export const stackItems: StackItem[] = [
  { name: 'React', icon: 'Atom', category: 'frontend' },
  { name: 'TypeScript', icon: 'Code', category: 'frontend' },
  { name: 'Next.js', icon: 'Globe', category: 'frontend' },
  { name: 'Node.js', icon: 'Server', category: 'backend' },
  { name: 'Tailwind', icon: 'Paintbrush', category: 'frontend' },
  { name: 'PostgreSQL', icon: 'Database', category: 'database' },
  { name: 'Vercel', icon: 'Cloud', category: 'deployment' },
  { name: 'Figma', icon: 'Palette', category: 'design' },
];

export const blogPosts: BlogPost[] = [];

export const videos: VideoContent[] = [];

export const analytics = {
  totalRevenue: 0,
  totalDownloads: 0,
  totalUsers: 0,
  activeSubscriptions: 0,
  popularProducts: [] as any[],
  monthlyGrowth: [] as any[],
  userActivity: [] as any[],
};
