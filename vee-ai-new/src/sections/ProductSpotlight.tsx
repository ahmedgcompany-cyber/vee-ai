import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check, Sparkles, Zap, Shield } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function ProductSpotlight() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const card = cardRef.current;
    const text = textRef.current;
    const image = imageRef.current;
    const cta = ctaRef.current;

    if (!section || !card || !text || !image || !cta) return;

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
          { y: '100vh', scale: 0.96, opacity: 0 }, 
          { y: '-50%', scale: 1, opacity: 1, ease: 'none' }, 
          0
        )
        .fromTo(text, 
          { x: '-18vw', opacity: 0 }, 
          { x: 0, opacity: 1, ease: 'none' }, 
          0.08
        )
        .fromTo(image, 
          { x: '18vw', opacity: 0 }, 
          { x: 0, opacity: 1, ease: 'none' }, 
          0.1
        )
        .fromTo(cta, 
          { y: '10vh', opacity: 0 }, 
          { y: 0, opacity: 1, ease: 'none' }, 
          0.14
        );

      // SETTLE (30%-70%) - hold

      // EXIT (70%-100%)
      scrollTl
        .to(card, 
          { y: '-40vh', scale: 0.98, opacity: 0, ease: 'power2.in' }, 
          0.7
        )
        .to(text, 
          { x: '-10vw', opacity: 0, ease: 'power2.in' }, 
          0.7
        )
        .to(image, 
          { x: '10vw', opacity: 0, ease: 'power2.in' }, 
          0.7
        )
        .to(cta, 
          { opacity: 0, ease: 'power2.in' }, 
          0.7
        );
    }, section);

    return () => ctx.revert();
  }, []);

  const features = [
    'Smart session splits',
    'Distraction blocking',
    'Daily recap & insights',
  ];

  return (
    <section
      ref={sectionRef}
      id="spotlight"
      className="relative w-full h-screen overflow-hidden bg-nexus-bg z-50"
    >
      {/* Background Glow */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(166,125,255,0.08), transparent 50%)',
        }}
      />

      {/* Spotlight Card */}
      <div
        ref={cardRef}
        className="absolute left-1/2 top-1/2 nexus-card overflow-hidden"
        style={{
          width: '86vw',
          height: '72vh',
          transform: 'translate(-50%, -50%)',
        }}
      >
        <div className="flex flex-col lg:flex-row h-full">
          {/* Left Text Block */}
          <div
            ref={textRef}
            className="flex-1 p-8 lg:p-12 flex flex-col justify-center"
          >
            <span className="px-4 py-2 rounded-full bg-nexus-accent/10 border border-nexus-accent/30 text-nexus-accent text-xs font-medium tracking-widest uppercase w-fit mb-6">
              Product Spotlight
            </span>
            
            <h2 
              className="font-heading font-bold text-nexus-text mb-4"
              style={{ fontSize: 'clamp(32px, 4vw, 52px)', lineHeight: 1.05 }}
            >
              FocusKit
            </h2>
            
            <p className="text-nexus-text-secondary mb-8 leading-relaxed max-w-md">
              An AI-powered focus coach that plans your sessions, blocks distractions, 
              and summarizes what you accomplished.
            </p>

            {/* Features */}
            <div className="space-y-3 mb-8">
              {features.map((feature, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-nexus-accent/20 flex items-center justify-center">
                    <Check className="w-3 h-3 text-nexus-accent" />
                  </div>
                  <span className="text-nexus-text text-sm">{feature}</span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4">
              <button className="group flex items-center justify-center gap-3 px-6 py-3 rounded-full bg-nexus-accent text-nexus-bg font-semibold transition-all duration-300 hover:shadow-glow-strong hover:scale-105">
                <Sparkles className="w-4 h-4" />
                Get Early Access
              </button>
              <button className="flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-nexus-border/50 text-nexus-text-secondary text-sm transition-colors hover:text-nexus-text hover:border-nexus-accent/50">
                View Pricing
              </button>
            </div>

            {/* Trust Badges */}
            <div className="flex items-center gap-6 mt-8 pt-6 border-t border-nexus-border/20">
              <div className="flex items-center gap-2 text-nexus-text-secondary text-xs">
                <Zap className="w-4 h-4 text-nexus-accent" />
                14-day free trial
              </div>
              <div className="flex items-center gap-2 text-nexus-text-secondary text-xs">
                <Shield className="w-4 h-4 text-nexus-accent" />
                Cancel anytime
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div
            ref={imageRef}
            className="flex-1 relative hidden lg:block"
          >
            <img
              src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=1200&h=800&fit=crop"
              alt="FocusKit App"
              className="absolute inset-0 w-full h-full object-cover"
            />
            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-nexus-bg-secondary via-transparent to-transparent" />
            
            {/* Floating Stats Card */}
            <div className="absolute bottom-8 right-8 p-4 rounded-2xl bg-nexus-bg/90 backdrop-blur-xl border border-nexus-border/30">
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <div className="font-heading text-2xl font-bold text-nexus-accent">8.7K</div>
                  <div className="text-nexus-text-secondary text-xs">Users</div>
                </div>
                <div className="w-px h-10 bg-nexus-border/30" />
                <div className="text-center">
                  <div className="font-heading text-2xl font-bold text-nexus-accent">4.9</div>
                  <div className="text-nexus-text-secondary text-xs">Rating</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
