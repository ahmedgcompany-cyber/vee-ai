import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, ExternalLink } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function FeaturedWork() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const card = cardRef.current;
    const text = textRef.current;
    const badge = badgeRef.current;
    const cta = ctaRef.current;

    if (!section || !card || !text || !badge || !cta) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
        }
      });

      // ENTRANCE (0%-30%)
      scrollTl
        .fromTo(card, 
          { x: '-60vw', scale: 0.92, opacity: 0 }, 
          { x: 0, scale: 1, opacity: 1, ease: 'none' }, 
          0
        )
        .fromTo(text, 
          { x: '40vw', opacity: 0 }, 
          { x: 0, opacity: 1, ease: 'none' }, 
          0.05
        )
        .fromTo(badge, 
          { y: '-10vh', opacity: 0 }, 
          { y: 0, opacity: 1, ease: 'none' }, 
          0.1
        )
        .fromTo(cta, 
          { y: '12vh', opacity: 0 }, 
          { y: 0, opacity: 1, ease: 'none' }, 
          0.12
        );

      // SETTLE (30%-70%) - elements hold position

      // EXIT (70%-100%)
      scrollTl
        .to(card, 
          { x: '-18vw', opacity: 0, ease: 'power2.in' }, 
          0.7
        )
        .to(text, 
          { x: '10vw', opacity: 0, ease: 'power2.in' }, 
          0.7
        )
        .to(badge, 
          { opacity: 0, ease: 'power2.in' }, 
          0.7
        )
        .to(cta, 
          { y: '8vh', opacity: 0, ease: 'power2.in' }, 
          0.7
        );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="featured-work"
      className="relative w-full h-screen overflow-hidden bg-nexus-bg z-20"
    >
      {/* Background Glow */}
      <div 
        className="absolute pointer-events-none"
        style={{
          left: '10%',
          top: '50%',
          transform: 'translateY(-50%)',
          width: '60%',
          height: '80%',
          background: 'radial-gradient(circle at 30% 50%, rgba(166,125,255,0.15), transparent 55%)',
        }}
      />

      {/* Left Media Card */}
      <div
        ref={cardRef}
        className="absolute nexus-card overflow-hidden"
        style={{
          left: '6vw',
          top: '14vh',
          width: '56vw',
          height: '72vh',
        }}
      >
        <img
          src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1200&h=800&fit=crop"
          alt="Neon Sprint Game"
          className="w-full h-full object-cover"
        />
        {/* Card Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-nexus-bg/80 via-transparent to-transparent" />
        
        {/* Game Stats */}
        <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
          <div>
            <h3 className="font-heading text-2xl font-bold text-nexus-text mb-1">
              Neon Sprint
            </h3>
            <p className="text-nexus-text-secondary text-sm">
              Endless Runner • Web • Canvas
            </p>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-nexus-accent/20 border border-nexus-accent/30">
            <span className="text-nexus-accent text-sm font-medium">15.4K Downloads</span>
          </div>
        </div>
      </div>

      {/* Badge */}
      <div
        ref={badgeRef}
        className="absolute"
        style={{
          left: '64vw',
          top: '14vh',
        }}
      >
        <span className="px-4 py-2 rounded-full bg-nexus-accent/10 border border-nexus-accent/30 text-nexus-accent text-xs font-medium tracking-widest uppercase">
          Featured Project
        </span>
      </div>

      {/* Right Text Panel */}
      <div
        ref={textRef}
        className="absolute"
        style={{
          left: '64vw',
          top: '22vh',
          width: '30vw',
        }}
      >
        <h2 className="font-heading font-bold text-nexus-text mb-6" style={{ fontSize: 'clamp(28px, 3vw, 42px)', lineHeight: 1.1 }}>
          Neon Sprint
        </h2>
        <p className="text-nexus-text-secondary mb-6 leading-relaxed">
          An endless runner built for web—bloom lighting, tight controls, 
          and a synthwave score that reacts to every dodge. Experience 
          the thrill of high-speed navigation through a neon-drenched cityscape.
        </p>
        <div className="flex flex-wrap gap-2 mb-8">
          {['Web', 'Canvas', '60fps', 'TypeScript'].map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 rounded-full bg-nexus-bg-secondary border border-nexus-border/30 text-nexus-text-secondary text-xs"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* CTA Pill */}
      <div
        ref={ctaRef}
        className="absolute"
        style={{
          right: '6vw',
          bottom: '10vh',
        }}
      >
        <div className="flex flex-col items-end gap-4">
          <button className="group flex items-center gap-3 px-6 py-3 rounded-full border border-nexus-accent/55 bg-transparent text-nexus-text font-medium transition-all duration-300 hover:bg-nexus-accent/12 hover:shadow-glow">
            View Case Study
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
          <button className="group flex items-center gap-2 text-nexus-text-secondary text-sm transition-colors hover:text-nexus-accent">
            See all projects
            <ExternalLink className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
