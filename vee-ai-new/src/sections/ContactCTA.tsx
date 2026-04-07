import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Mail, Send, CheckCircle } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function ContactCTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const emailRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  useEffect(() => {
    const section = sectionRef.current;
    const headline = headlineRef.current;
    const email = emailRef.current;
    const cta = ctaRef.current;
    const form = formRef.current;

    if (!section || !headline || !email || !cta || !form) return;

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

      // ENTRANCE (0%-30%)
      scrollTl
        .fromTo(headline, 
          { y: '45vh', rotateX: 20, opacity: 0 }, 
          { y: 0, rotateX: 0, opacity: 1, ease: 'none' }, 
          0
        )
        .fromTo(email, 
          { y: '12vh', opacity: 0 }, 
          { y: 0, opacity: 1, ease: 'none' }, 
          0.1
        )
        .fromTo(cta, 
          { y: '12vh', opacity: 0 }, 
          { y: 0, opacity: 1, ease: 'none' }, 
          0.12
        )
        .fromTo(form, 
          { y: '20vh', opacity: 0 }, 
          { y: 0, opacity: 1, ease: 'none' }, 
          0.08
        );

      // SETTLE (30%-70%) - hold

      // EXIT (70%-100%)
      scrollTl
        .to(headline, 
          { y: '-12vh', opacity: 0, ease: 'power2.in' }, 
          0.7
        )
        .to(email, 
          { opacity: 0, ease: 'power2.in' }, 
          0.7
        )
        .to(cta, 
          { opacity: 0, ease: 'power2.in' }, 
          0.7
        )
        .to(form, 
          { y: '-8vh', opacity: 0, ease: 'power2.in' }, 
          0.7
        );
    }, section);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', message: '' });
    }, 3000);
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative w-full h-screen overflow-hidden bg-nexus-bg z-80"
    >
      {/* Background Glow */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 40%, rgba(166,125,255,0.12), transparent 50%)',
        }}
      />

      {/* Main Content */}
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center px-6">
        {/* Headline */}
        <h2
          ref={headlineRef}
          className="font-heading font-bold text-nexus-text text-center max-w-4xl mb-8 perspective-1000"
          style={{ fontSize: 'clamp(36px, 6vw, 80px)', lineHeight: 1.05 }}
        >
          Have an Idea?
          <br />
          <span className="text-gradient">Let&apos;s Build It.</span>
        </h2>

        {/* Contact Form */}
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="w-full max-w-lg mb-8"
        >
          {isSubmitted ? (
            <div className="flex flex-col items-center gap-4 p-8 rounded-2xl bg-nexus-bg-secondary border border-green-500/30">
              <CheckCircle className="w-12 h-12 text-green-500" />
              <p className="text-nexus-text text-lg font-medium">Message Sent!</p>
              <p className="text-nexus-text-secondary text-sm text-center">
                Thanks for reaching out. I&apos;ll get back to you within 24 hours.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-nexus-bg-secondary border border-nexus-border/30 text-nexus-text placeholder:text-nexus-text-secondary/50 focus:outline-none focus:border-nexus-accent/50 transition-colors"
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-nexus-bg-secondary border border-nexus-border/30 text-nexus-text placeholder:text-nexus-text-secondary/50 focus:outline-none focus:border-nexus-accent/50 transition-colors"
                />
              </div>
              <textarea
                placeholder="Tell me about your project..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
                rows={4}
                className="w-full px-4 py-3 rounded-xl bg-nexus-bg-secondary border border-nexus-border/30 text-nexus-text placeholder:text-nexus-text-secondary/50 focus:outline-none focus:border-nexus-accent/50 transition-colors resize-none"
              />
              <button
                type="submit"
                className="w-full group flex items-center justify-center gap-3 px-6 py-4 rounded-xl bg-nexus-accent text-nexus-bg font-semibold transition-all duration-300 hover:shadow-glow-strong"
              >
                <Send className="w-4 h-4" />
                Send Message
              </button>
            </div>
          )}
        </form>

        {/* Email */}
        <div ref={emailRef} className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-full bg-nexus-accent/10 border border-nexus-accent/30 flex items-center justify-center">
            <Mail className="w-5 h-5 text-nexus-accent" />
          </div>
          <a 
            href="mailto:hello@nexusstudios.dev"
            className="text-nexus-text-secondary hover:text-nexus-accent transition-colors"
          >
            hello@nexusstudios.dev
          </a>
        </div>

        {/* CTA */}
        <div ref={ctaRef}>
          <button className="group flex items-center gap-3 px-8 py-4 rounded-full border border-nexus-accent/55 bg-transparent text-nexus-text font-medium transition-all duration-300 hover:bg-nexus-accent/12 hover:shadow-glow">
            Request a Build
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </section>
  );
}
