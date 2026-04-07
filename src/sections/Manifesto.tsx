import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Zap, Code, Rocket } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Manifesto() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const supportingRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const iconsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const headline = headlineRef.current;
    const supporting = supportingRef.current;
    const cta = ctaRef.current;
    const icons = iconsRef.current;

    if (!section || !headline || !supporting || !cta || !icons) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=120%',
          pin: true,
          scrub: 0.6,
        }
      });

      // Split headline into words for stagger animation
      const words = headline.querySelectorAll('.word');

      // ENTRANCE (0%-30%)
      scrollTl
        .fromTo(words, 
          { y: '40vh', rotateX: 18, opacity: 0 }, 
          { y: 0, rotateX: 0, opacity: 1, stagger: 0.03, ease: 'none' }, 
          0
        )
        .fromTo(supporting, 
          { y: '10vh', opacity: 0 }, 
          { y: 0, opacity: 1, ease: 'none' }, 
          0.08
        )
        .fromTo(cta, 
          { y: '12vh', opacity: 0 }, 
          { y: 0, opacity: 1, ease: 'none' }, 
          0.12
        )
        .fromTo(icons, 
          { scale: 0.8, opacity: 0 }, 
          { scale: 1, opacity: 1, ease: 'none' }, 
          0.1
        );

      // SETTLE (30%-70%) - hold

      // EXIT (70%-100%)
      scrollTl
        .to(words, 
          { y: '-18vh', rotateX: -10, opacity: 0, stagger: 0.02, ease: 'power2.in' }, 
          0.7
        )
        .to(supporting, 
          { opacity: 0, ease: 'power2.in' }, 
          0.7
        )
        .to(cta, 
          { y: '8vh', opacity: 0, ease: 'power2.in' }, 
          0.7
        )
        .to(icons, 
          { scale: 0.9, opacity: 0, ease: 'power2.in' }, 
          0.7
        );
    }, section);

    return () => ctx.revert();
  }, []);

  const headlineWords = 'I DESIGN IN FIGMA. BUILD IN REACT. SHIP IN WEEKS.'.split(' ');

  return (
    <section
      ref={sectionRef}
      id="manifesto"
      className="relative w-full h-screen overflow-hidden bg-nexus-bg z-30"
    >
      {/* Background Glow */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(166,125,255,0.1), transparent 50%)',
        }}
      />

      {/* Floating Icons */}
      <div
        ref={iconsRef}
        className="absolute inset-0 pointer-events-none"
      >
        <div className="absolute top-1/4 left-1/4 animate-float">
          <div className="w-16 h-16 rounded-2xl bg-nexus-accent/10 border border-nexus-accent/30 flex items-center justify-center">
            <Zap className="w-8 h-8 text-nexus-accent" />
          </div>
        </div>
        <div className="absolute top-1/3 right-1/4 animate-float animation-delay-200">
          <div className="w-14 h-14 rounded-2xl bg-nexus-accent/10 border border-nexus-accent/30 flex items-center justify-center">
            <Code className="w-7 h-7 text-nexus-accent" />
          </div>
        </div>
        <div className="absolute bottom-1/3 left-1/3 animate-float animation-delay-400">
          <div className="w-12 h-12 rounded-2xl bg-nexus-accent/10 border border-nexus-accent/30 flex items-center justify-center">
            <Rocket className="w-6 h-6 text-nexus-accent" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center px-6">
        {/* Headline */}
        <h2
          ref={headlineRef}
          className="font-heading font-bold text-nexus-text text-center max-w-5xl perspective-1000 mb-8"
          style={{ fontSize: 'clamp(32px, 5vw, 72px)', lineHeight: 1.05 }}
        >
          {headlineWords.map((word, i) => (
            <span key={i} className="word inline-block mr-[0.3em]">
              {word === 'FIGMA.' || word === 'REACT.' || word === 'WEEKS.' ? (
                <span className="text-nexus-accent">{word}</span>
              ) : (
                word
              )}
            </span>
          ))}
        </h2>

        {/* Supporting Text */}
        <p
          ref={supportingRef}
          className="text-nexus-text-secondary text-center max-w-2xl mb-12"
          style={{ fontSize: 'clamp(16px, 1.5vw, 20px)', lineHeight: 1.6 }}
        >
          No bloated teams. No endless meetings. Just systems, taste, and momentum.
        </p>

        {/* CTA */}
        <div ref={ctaRef}>
          <button className="group flex items-center gap-3 px-8 py-4 rounded-full bg-nexus-accent text-nexus-bg font-semibold transition-all duration-300 hover:shadow-glow-strong hover:scale-105">
            Start a Project
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>

      {/* Stats Row */}
      <div className="absolute bottom-12 left-0 right-0 flex justify-center gap-12 md:gap-24 px-6">
        {[
          { value: '50+', label: 'Projects Shipped' },
          { value: '15K+', label: 'Downloads' },
          { value: '99%', label: 'Client Satisfaction' },
        ].map((stat, i) => (
          <div key={i} className="text-center">
            <div className="font-heading text-2xl md:text-4xl font-bold text-nexus-accent mb-1">
              {stat.value}
            </div>
            <div className="text-nexus-text-secondary text-xs md:text-sm">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
