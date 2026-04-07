import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, Filter, Search, Download, Star } from 'lucide-react';
import { products } from '@/data';
import type { Product } from '@/types';

gsap.registerPlugin(ScrollTrigger);

export default function ProjectGrid() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [filter, setFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['all', 'ai-tools', 'saas-apps', 'games', 'experiments', 'design-systems'];

  const filteredProducts = products.filter(product => {
    const matchesFilter = filter === 'all' || product.category === filter;
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  useEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const grid = gridRef.current;

    if (!section || !header || !grid) return;

    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(header,
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          }
        }
      );

      // Grid cards animation
      const cards = grid.querySelectorAll('.project-card');
      gsap.fromTo(cards,
        { y: 40, scale: 0.98, opacity: 0 },
        {
          y: 0,
          scale: 1,
          opacity: 1,
          duration: 0.6,
          stagger: 0.08,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: grid,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          }
        }
      );
    }, section);

    return () => ctx.revert();
  }, [filteredProducts]);

  const getCategoryLabel = (category: string) => {
    const labels: Record<string, string> = {
      'all': 'All',
      'ai-tools': 'AI Tools',
      'saas-apps': 'SaaS Apps',
      'games': 'Games',
      'experiments': 'Experiments',
      'design-systems': 'Design Systems',
    };
    return labels[category] || category;
  };

  const getPriceDisplay = (product: Product) => {
    if (product.type === 'free') return 'Free';
    if (product.type === 'subscription' && product.subscriptionPrice) {
      return `$${product.subscriptionPrice.monthly}/mo`;
    }
    return `$${product.price}`;
  };

  return (
    <section
      ref={sectionRef}
      id="archive"
      className="relative w-full min-h-screen bg-nexus-bg py-24 z-40"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div ref={headerRef} className="mb-12">
          <span className="text-nexus-accent text-sm font-medium tracking-widest uppercase mb-4 block">
            Archive
          </span>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div>
              <h2 
                className="font-heading font-bold text-nexus-text mb-4"
                style={{ fontSize: 'clamp(32px, 4vw, 56px)', lineHeight: 1.05 }}
              >
                A Small Library of
                <br />
                <span className="text-gradient">Builds.</span>
              </h2>
              <p className="text-nexus-text-secondary max-w-lg">
                Games, utilities, and experiments—each shipped with a clear constraint: 
                fast, clean, memorable.
              </p>
            </div>

            {/* Search & Filter */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-nexus-text-secondary" />
                <input
                  type="text"
                  placeholder="Search projects..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full sm:w-64 pl-11 pr-4 py-3 rounded-full bg-nexus-bg-secondary border border-nexus-border/30 text-nexus-text placeholder:text-nexus-text-secondary/50 focus:outline-none focus:border-nexus-accent/50 transition-colors"
                />
              </div>
              <div className="relative">
                <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-nexus-text-secondary" />
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="w-full sm:w-40 pl-11 pr-8 py-3 rounded-full bg-nexus-bg-secondary border border-nexus-border/30 text-nexus-text appearance-none focus:outline-none focus:border-nexus-accent/50 transition-colors cursor-pointer"
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>
                      {getCategoryLabel(cat)}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Grid */}
        <div 
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="project-card group nexus-card overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-glow hover:border-nexus-accent/50"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={product.images[0]}
                  alt={product.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-nexus-bg-secondary to-transparent" />
                
                {/* Type Badge */}
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    product.type === 'free' 
                      ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                      : product.type === 'subscription'
                      ? 'bg-nexus-accent/20 text-nexus-accent border border-nexus-accent/30'
                      : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                  }`}>
                    {product.type === 'free' ? 'Free' : product.type === 'subscription' ? 'Subscription' : 'Paid'}
                  </span>
                </div>

                {/* Price */}
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 rounded-full bg-nexus-bg/80 backdrop-blur-sm text-nexus-text text-sm font-semibold">
                    {getPriceDisplay(product)}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-heading text-xl font-semibold text-nexus-text group-hover:text-nexus-accent transition-colors">
                    {product.title}
                  </h3>
                  <ArrowUpRight className="w-5 h-5 text-nexus-text-secondary group-hover:text-nexus-accent transition-all group-hover:translate-x-1 group-hover:-translate-y-1" />
                </div>
                
                <p className="text-nexus-text-secondary text-sm mb-4 line-clamp-2">
                  {product.shortDescription}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {product.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 rounded-md bg-nexus-bg border border-nexus-border/20 text-nexus-text-secondary text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between pt-4 border-t border-nexus-border/20">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1 text-nexus-text-secondary text-sm">
                      <Download className="w-4 h-4" />
                      {product.downloads.toLocaleString()}
                    </div>
                    <div className="flex items-center gap-1 text-nexus-text-secondary text-sm">
                      <Star className="w-4 h-4 text-yellow-500" />
                      {product.rating}
                    </div>
                  </div>
                  <span className="text-nexus-accent text-sm font-medium">
                    {product.techStack[0]}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-24">
            <p className="text-nexus-text-secondary text-lg">
              No projects found matching your criteria.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
