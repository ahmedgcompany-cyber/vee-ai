import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { testimonials } from '@/data';

gsap.registerPlugin(ScrollTrigger);

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentTestimonial = testimonials[currentIndex];

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

      // SETTLE (30%-70%) - hold

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

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className="relative w-full h-screen overflow-hidden bg-nexus-bg z-70"
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
          background: 'radial-gradient(circle at 30% 50%, rgba(166,125,255,0.12), transparent 55%)',
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
          src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&h=800&fit=crop"
          alt="Workspace"
          className="w-full h-full object-cover"
        />
        {/* Card Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-nexus-bg/80 via-transparent to-transparent" />
        
        {/* Project Name */}
        <div className="absolute bottom-6 left-6">
          <span className="text-nexus-text-secondary text-sm">Project:</span>
          <p className="font-heading text-xl font-semibold text-nexus-text">
            {currentTestimonial.projectName}
          </p>
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
          Testimonials
        </span>
      </div>

      {/* Right Quote Block */}
      <div
        ref={textRef}
        className="absolute"
        style={{
          left: '64vw',
          top: '22vh',
          width: '30vw',
        }}
      >
        <Quote className="w-10 h-10 text-nexus-accent/30 mb-6" />
        
        <blockquote 
          className="font-heading font-medium text-nexus-text mb-8"
          style={{ fontSize: 'clamp(20px, 2vw, 28px)', lineHeight: 1.3 }}
        >
          &ldquo;{currentTestimonial.quote}&rdquo;
        </blockquote>

        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 rounded-full bg-nexus-accent/20 border border-nexus-accent/30 flex items-center justify-center">
            <span className="font-heading font-semibold text-nexus-accent">
              {currentTestimonial.name.charAt(0)}
            </span>
          </div>
          <div>
            <p className="font-medium text-nexus-text">{currentTestimonial.name}</p>
            <p className="text-nexus-text-secondary text-sm">
              {currentTestimonial.role}, {currentTestimonial.company}
            </p>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center gap-4">
          <button
            onClick={prevTestimonial}
            className="w-10 h-10 rounded-full border border-nexus-border/50 flex items-center justify-center text-nexus-text-secondary transition-all hover:border-nexus-accent/50 hover:text-nexus-accent"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={nextTestimonial}
            className="w-10 h-10 rounded-full border border-nexus-border/50 flex items-center justify-center text-nexus-text-secondary transition-all hover:border-nexus-accent/50 hover:text-nexus-accent"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
          <span className="text-nexus-text-secondary text-sm ml-2">
            {currentIndex + 1} / {testimonials.length}
          </span>
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
        <button className="group flex items-center gap-3 px-6 py-3 rounded-full border border-nexus-accent/55 bg-transparent text-nexus-text font-medium transition-all duration-300 hover:bg-nexus-accent/12 hover:shadow-glow">
          Read the Story
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </section>
  );
}
