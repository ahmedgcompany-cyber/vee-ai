import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Github, Twitter, Linkedin, Mail,
  ArrowUpRight, Heart, Code
} from 'lucide-react';
import Logo from '@/components/Logo';

gsap.registerPlugin(ScrollTrigger);

const footerLinks = {
  work: [
    { label: 'Neon Sprint', href: '#' },
    { label: 'FocusKit', href: '#' },
    { label: 'GhostType', href: '#' },
    { label: 'Voxel Drive', href: '#' },
  ],
  services: [
    { label: 'Web Apps', href: '#' },
    { label: 'AI Tools', href: '#' },
    { label: 'Games', href: '#' },
    { label: 'Design Systems', href: '#' },
  ],
  company: [
    { label: 'About', href: '#' },
    { label: 'Blog', href: '#' },
    { label: 'Contact', href: '#contact' },
    { label: 'Hire Me', href: '#contact' },
  ],
  social: [
    { label: 'GitHub', href: 'https://github.com', icon: Github },
    { label: 'Twitter', href: 'https://twitter.com', icon: Twitter },
    { label: 'LinkedIn', href: 'https://linkedin.com', icon: Linkedin },
    { label: 'Email', href: 'mailto:ahmed@vee.ai', icon: Mail },
  ],
};

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const footer = footerRef.current;
    if (!footer) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(footer.querySelectorAll('.footer-col'),
        { y: 18, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: footer,
            start: 'top 90%',
            toggleActions: 'play none none reverse',
          }
        }
      );
    }, footer);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="relative w-full bg-nexus-bg-secondary pt-20 pb-8 z-90"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Main Footer Content */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-16">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1 footer-col">
            <div className="mb-6">
              <div className="mb-3">
                <Logo size="lg" showText={true} />
              </div>
              <p className="text-nexus-text-secondary text-sm max-w-xs">
                A platform for creators to share apps, games, AI agents, and digital experiences.
              </p>
            </div>
            
            {/* Social Links */}
            <div className="flex gap-3">
              {footerLinks.social.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-nexus-bg border border-nexus-border/30 flex items-center justify-center text-nexus-text-secondary transition-all hover:border-nexus-accent/50 hover:text-nexus-accent hover:shadow-glow"
                    aria-label={link.label}
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Work Links */}
          <div className="footer-col">
            <h4 className="font-heading font-semibold text-nexus-text mb-4">Work</h4>
            <ul className="space-y-3">
              {footerLinks.work.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="group flex items-center gap-1 text-nexus-text-secondary text-sm transition-colors hover:text-nexus-accent"
                  >
                    {link.label}
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Links */}
          <div className="footer-col">
            <h4 className="font-heading font-semibold text-nexus-text mb-4">Services</h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="group flex items-center gap-1 text-nexus-text-secondary text-sm transition-colors hover:text-nexus-accent"
                  >
                    {link.label}
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div className="footer-col">
            <h4 className="font-heading font-semibold text-nexus-text mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="group flex items-center gap-1 text-nexus-text-secondary text-sm transition-colors hover:text-nexus-accent"
                  >
                    {link.label}
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="col-span-2 md:col-span-2 lg:col-span-1 footer-col">
            <h4 className="font-heading font-semibold text-nexus-text mb-4">Newsletter</h4>
            <p className="text-nexus-text-secondary text-sm mb-4">
              Get updates on new projects and releases.
            </p>
            <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 px-4 py-2 rounded-lg bg-nexus-bg border border-nexus-border/30 text-nexus-text text-sm placeholder:text-nexus-text-secondary/50 focus:outline-none focus:border-nexus-accent/50 transition-colors"
              />
              <button
                type="submit"
                className="px-4 py-2 rounded-lg bg-nexus-accent text-nexus-bg text-sm font-medium transition-all hover:shadow-glow"
              >
                Join
              </button>
            </form>
          </div>
        </div>

        {/* Engineer Credit */}
        <div className="py-6 border-t border-nexus-border/20 mb-6">
          <div className="flex flex-col md:flex-row items-center justify-center gap-3 text-center">
            <div className="flex items-center gap-2 text-nexus-text-secondary">
              <Code className="w-4 h-4 text-nexus-accent" />
              <span className="text-sm">Engineered by</span>
            </div>
            <span className="font-heading text-lg font-semibold text-nexus-accent">
              AHMED M T ALGHOUL
            </span>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-nexus-border/20">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-nexus-text-secondary text-sm flex items-center gap-1">
              © 2026 VEE.ai. Made with 
              <Heart className="w-4 h-4 text-nexus-accent fill-nexus-accent" />
              and caffeine.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-nexus-text-secondary text-sm hover:text-nexus-accent transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-nexus-text-secondary text-sm hover:text-nexus-accent transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
