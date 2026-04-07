import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Globe, Brain, Gamepad2, Palette, 
  Atom, Code, Server, Database, Cloud, Paintbrush,
  ArrowRight, Check
} from 'lucide-react';
import { services, stackItems } from '@/data';

gsap.registerPlugin(ScrollTrigger);

const iconMap: Record<string, React.ElementType> = {
  Globe,
  Brain,
  Gamepad2,
  Palette,
  Atom,
  Code,
  Server,
  Database,
  Cloud,
  Paintbrush,
};

export default function StackServices() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const stackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const headline = headlineRef.current;
    const servicesEl = servicesRef.current;
    const stack = stackRef.current;

    if (!section || !headline || !servicesEl || !stack) return;

    const ctx = gsap.context(() => {
      // Headline animation
      gsap.fromTo(headline,
        { y: 22, opacity: 0 },
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

      // Services animation
      const serviceItems = servicesEl.querySelectorAll('.service-item');
      gsap.fromTo(serviceItems,
        { x: '6vw', opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: servicesEl,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          }
        }
      );

      // Stack chips animation
      const chips = stack.querySelectorAll('.stack-chip');
      gsap.fromTo(chips,
        { y: 18, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.05,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: stack,
            start: 'top 90%',
            toggleActions: 'play none none reverse',
          }
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative w-full min-h-screen bg-nexus-bg py-24 z-60"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left Column */}
          <div ref={headlineRef}>
            <span className="text-nexus-accent text-sm font-medium tracking-widest uppercase mb-4 block">
              Capabilities
            </span>
            <h2 
              className="font-heading font-bold text-nexus-text mb-6"
              style={{ fontSize: 'clamp(32px, 4vw, 52px)', lineHeight: 1.05 }}
            >
              Stack &
              <br />
              <span className="text-gradient">Services.</span>
            </h2>
            <p className="text-nexus-text-secondary leading-relaxed max-w-md mb-8">
              I work across the whole product surface: brand, UI, frontend architecture, 
              and deployment. If it touches the user, I can ship it.
            </p>

            {/* Stack Chips */}
            <div ref={stackRef}>
              <span className="text-nexus-text-secondary text-sm mb-4 block">Tech Stack</span>
              <div className="flex flex-wrap gap-3">
                {stackItems.map((item) => {
                  const Icon = iconMap[item.icon] || Code;
                  return (
                    <div
                      key={item.name}
                      className="stack-chip flex items-center gap-2 px-4 py-2 rounded-full bg-nexus-bg-secondary border border-nexus-border/30 text-nexus-text text-sm transition-all hover:border-nexus-accent/50 hover:shadow-glow"
                    >
                      <Icon className="w-4 h-4 text-nexus-accent" />
                      {item.name}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column - Services */}
          <div ref={servicesRef} className="space-y-6">
            {services.map((service) => {
              const Icon = iconMap[service.icon] || Code;
              return (
                <div
                  key={service.id}
                  className="service-item group p-6 rounded-2xl bg-nexus-bg-secondary border border-nexus-border/30 transition-all duration-300 hover:border-nexus-accent/50 hover:shadow-glow"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-nexus-accent/10 border border-nexus-accent/30 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 text-nexus-accent" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-heading text-xl font-semibold text-nexus-text mb-2 group-hover:text-nexus-accent transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-nexus-text-secondary text-sm mb-4">
                        {service.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {service.features.map((feature, i) => (
                          <span
                            key={i}
                            className="flex items-center gap-1 text-nexus-text-secondary text-xs"
                          >
                            <Check className="w-3 h-3 text-nexus-accent" />
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                    <ArrowRight className="w-5 h-5 text-nexus-text-secondary group-hover:text-nexus-accent transition-all group-hover:translate-x-1" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-24 p-8 md:p-12 rounded-3xl bg-gradient-to-r from-nexus-accent/10 to-transparent border border-nexus-accent/20">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h3 className="font-heading text-2xl md:text-3xl font-bold text-nexus-text mb-2">
                Have a project in mind?
              </h3>
              <p className="text-nexus-text-secondary">
                Let&apos;s discuss how I can help bring your ideas to life.
              </p>
            </div>
            <button className="group flex items-center gap-3 px-8 py-4 rounded-full bg-nexus-accent text-nexus-bg font-semibold transition-all duration-300 hover:shadow-glow-strong hover:scale-105 whitespace-nowrap">
              Start a Conversation
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
