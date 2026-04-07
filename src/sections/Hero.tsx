import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Sparkles, Zap, Globe, Brain } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadlineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const microcopyRef = useRef<HTMLParagraphElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const floatingIconsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const headline = headlineRef.current;
    const subheadline = subheadlineRef.current;
    const cta = ctaRef.current;
    const microcopy = microcopyRef.current;
    const bg = bgRef.current;
    const floatingIcons = floatingIconsRef.current;

    if (!section || !headline || !subheadline || !cta || !microcopy || !bg || !floatingIcons) return;

    const ctx = gsap.context(() => {
      // Entrance animation on load
      const entranceTl = gsap.timeline({ defaults: { ease: 'power2.out' } });
      
      entranceTl
        .fromTo(bg, { opacity: 0 }, { opacity: 1, duration: 0.6 })
        .fromTo(headline, 
          { y: 24, scale: 0.98, opacity: 0 }, 
          { y: 0, scale: 1, opacity: 1, duration: 0.7 }, 
          '-=0.3'
        )
        .fromTo(subheadline, 
          { y: 20, opacity: 0 }, 
          { y: 0, opacity: 1, duration: 0.5 }, 
          '-=0.4'
        )
        .fromTo(cta, 
          { y: 14, opacity: 0 }, 
          { y: 0, opacity: 1, duration: 0.5 }, 
          '-=0.3'
        )
        .fromTo(microcopy, 
          { y: 14, opacity: 0 }, 
          { y: 0, opacity: 1, duration: 0.5 }, 
          '-=0.4'
        )
        .fromTo(floatingIcons.children, 
          { scale: 0, opacity: 0 }, 
          { scale: 1, opacity: 1, stagger: 0.1, duration: 0.5 }, 
          '-=0.3'
        );

      // Scroll-driven exit animation
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
          onLeaveBack: () => {
            // Reset all elements when scrolling back to top
            gsap.set([headline, subheadline, cta, microcopy], { 
              opacity: 1, 
              y: 0, 
              x: 0 
            });
            gsap.set(bg, { scale: 1 });
          }
        }
      });

      // Phase 1 (0%-70%): Hold - no animation
      // Phase 2 (70%-100%): Exit
      scrollTl
        .fromTo(headline, 
          { y: 0, opacity: 1 }, 
          { y: '-18vh', opacity: 0, ease: 'power2.in' }, 
          0.7
        )
        .fromTo(subheadline, 
          { y: 0, opacity: 1 }, 
          { y: '-12vh', opacity: 0, ease: 'power2.in' }, 
          0.72
        )
        .fromTo(cta, 
          { x: 0, opacity: 1 }, 
          { x: '-10vw', opacity: 0, ease: 'power2.in' }, 
          0.7
        )
        .fromTo(microcopy, 
          { x: 0, opacity: 1 }, 
          { x: '10vw', opacity: 0, ease: 'power2.in' }, 
          0.7
        )
        .fromTo(bg, 
          { scale: 1 }, 
          { scale: 1.06, ease: 'none' }, 
          0.7
        );
    }, section);

    return () => ctx.revert();
  }, []);

  const scrollToWork = () => {
    const workSection = document.getElementById('archive');
    if (workSection) {
      workSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative w-full h-screen overflow-hidden z-10"
    >
      {/* Background Image */}
      <div
        ref={bgRef}
        className="absolute inset-0 w-full h-full"
        style={{ opacity: 0 }}
      >
        <img
          src="https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=1920&h=1080&fit=crop"
          alt="AI Neural Network"
          className="w-full h-full object-cover"
        />
        {/* Gradient Overlay */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(180deg, rgba(7,8,11,0.25), rgba(7,8,11,0.65))'
          }}
        />
        {/* Additional dark overlay for better text readability */}
        <div className="absolute inset-0 bg-nexus-bg/40" />
      </div>

      {/* Floating Icons */}
      <div
        ref={floatingIconsRef}
        className="absolute inset-0 pointer-events-none"
      >
        <div className="absolute top-1/4 left-[15%] animate-float">
          <div className="w-14 h-14 rounded-2xl bg-nexus-accent/10 border border-nexus-accent/30 flex items-center justify-center backdrop-blur-sm">
            <Brain className="w-7 h-7 text-nexus-accent" />
          </div>
        </div>
        <div className="absolute top-1/3 right-[20%] animate-float animation-delay-200">
          <div className="w-12 h-12 rounded-2xl bg-nexus-accent/10 border border-nexus-accent/30 flex items-center justify-center backdrop-blur-sm">
            <Zap className="w-6 h-6 text-nexus-accent" />
          </div>
        </div>
        <div className="absolute bottom-1/3 left-[25%] animate-float animation-delay-400">
          <div className="w-10 h-10 rounded-2xl bg-nexus-accent/10 border border-nexus-accent/30 flex items-center justify-center backdrop-blur-sm">
            <Globe className="w-5 h-5 text-nexus-accent" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center px-6">
        {/* Main Headline */}
        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Sparkles className="w-6 h-6 text-nexus-accent" />
            <span className="text-nexus-accent text-sm font-medium tracking-widest uppercase">
              Create. Share. Discover.
            </span>
            <Sparkles className="w-6 h-6 text-nexus-accent" />
          </div>
          <h1
            ref={headlineRef}
            className="font-heading font-bold text-nexus-text tracking-tight"
            style={{ 
              fontSize: 'clamp(48px, 10vw, 120px)',
              lineHeight: 0.9,
              opacity: 0
            }}
          >
            <span className="text-nexus-accent">V</span>
            EE<span className="text-nexus-accent">.ai</span>
          </h1>
        </div>

        {/* Subheadline */}
        <p
          ref={subheadlineRef}
          className="text-nexus-text-secondary text-center max-w-2xl mb-10"
          style={{ 
            fontSize: 'clamp(16px, 1.8vw, 24px)',
            opacity: 0
          }}
        >
          The platform where creators share AI agents, apps, games, and digital experiences.
          <br />
          <span className="text-nexus-accent">Upload your work. Build your audience. Get paid.</span>
        </p>

        {/* CTA Buttons */}
        <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4" style={{ opacity: 0 }}>
          <button
            onClick={scrollToWork}
            className="group flex items-center gap-3 px-8 py-4 rounded-full bg-nexus-accent text-nexus-bg font-semibold transition-all duration-300 hover:shadow-glow-strong hover:scale-105"
          >
            Explore Platform
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </button>
          <button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="group flex items-center gap-3 px-8 py-4 rounded-full border border-nexus-accent/55 bg-nexus-bg/50 backdrop-blur-sm text-nexus-text font-medium transition-all duration-300 hover:bg-nexus-accent/12 hover:shadow-glow"
          >
            Start Creating
          </button>
        </div>

        {/* Stats - Real Platform Stats */}
        <div className="flex items-center justify-center gap-8 sm:gap-16 mt-16">
          {[
            { value: '0', label: 'Downloads' },
            { value: '1', label: 'Creator (You!)' },
            { value: '0', label: 'Projects' },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="font-heading text-2xl sm:text-3xl font-bold text-nexus-accent">
                {stat.value}
              </div>
              <div className="text-nexus-text-secondary text-xs sm:text-sm">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
        <p className="text-nexus-text-secondary text-center mt-4 text-sm">
          Be the first to upload and start building the community!
        </p>
      </div>

      {/* Bottom Microcopy */}
      <p
        ref={microcopyRef}
        className="absolute bottom-8 right-8 text-nexus-text-secondary text-right max-w-xs text-sm hidden md:block"
        style={{ opacity: 0 }}
      >
        Engineered by
        <br />
        <span className="text-nexus-accent font-semibold">AHMED M T ALGHOUL</span>
      </p>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-nexus-bg to-transparent pointer-events-none" />
    </section>
  );
}
