import { useState, useEffect } from 'react';
import { Menu, X, ShoppingCart, User, LayoutDashboard, Upload, LogOut } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useCart } from '@/hooks/useCart';
import Logo from './Logo';
import Avatar from './Avatar';

const navLinks = [
  { label: 'Work', href: '#archive' },
  { label: 'Services', href: '#services' },
  { label: 'Contact', href: '#contact' },
];

interface NavigationProps {
  onDashboardClick?: () => void;
  onUploadClick?: () => void;
}

export default function Navigation({ onDashboardClick, onUploadClick }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const { totalItems } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    setIsUserMenuOpen(false);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
          isScrolled
            ? 'bg-nexus-bg/80 backdrop-blur-xl border-b border-nexus-border/20'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <a 
              href="#hero" 
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('#hero');
              }}
            >
              <Logo size="md" showText={true} />
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(link.href);
                  }}
                  className="text-nexus-text-secondary text-sm font-medium transition-colors hover:text-nexus-text"
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-3">
              {/* Upload Button (for authenticated users) */}
              {isAuthenticated && (
                <button 
                  onClick={onUploadClick}
                  className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full bg-nexus-accent/10 border border-nexus-accent/30 text-nexus-accent text-sm font-medium transition-all hover:bg-nexus-accent/20"
                >
                  <Upload className="w-4 h-4" />
                  Upload
                </button>
              )}

              {/* Cart */}
              <button className="relative w-10 h-10 rounded-full bg-nexus-bg-secondary border border-nexus-border/30 flex items-center justify-center text-nexus-text-secondary transition-all hover:border-nexus-accent/50 hover:text-nexus-accent">
                <ShoppingCart className="w-4 h-4" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-nexus-accent text-nexus-bg text-xs font-bold flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </button>

              {/* User Menu */}
              {isAuthenticated ? (
                <div className="relative">
                  <button 
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="rounded-full overflow-hidden transition-all hover:ring-2 hover:ring-nexus-accent/50"
                  >
                    <Avatar name={user?.name || 'User'} avatarUrl={user?.avatar} size="md" />
                  </button>

                  {/* Dropdown Menu */}
                  {isUserMenuOpen && (
                    <div className="absolute right-0 top-full mt-2 w-56 rounded-2xl bg-nexus-bg-secondary border border-nexus-border/30 shadow-card overflow-hidden">
                      <div className="p-4 border-b border-nexus-border/20">
                        <p className="font-medium text-nexus-text">{user?.name}</p>
                        <p className="text-nexus-text-secondary text-sm">{user?.email}</p>
                        <span className="inline-block mt-2 px-2 py-1 rounded-full bg-nexus-accent/10 text-nexus-accent text-xs capitalize">
                          {user?.role} Plan
                        </span>
                      </div>
                      <div className="p-2">
                        <button 
                          onClick={() => {
                            onDashboardClick?.();
                            setIsUserMenuOpen(false);
                          }}
                          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-nexus-text-secondary hover:bg-nexus-bg hover:text-nexus-text transition-colors text-left"
                        >
                          <LayoutDashboard className="w-4 h-4" />
                          Dashboard
                        </button>
                        <button 
                          onClick={() => {
                            onUploadClick?.();
                            setIsUserMenuOpen(false);
                          }}
                          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-nexus-text-secondary hover:bg-nexus-bg hover:text-nexus-text transition-colors text-left md:hidden"
                        >
                          <Upload className="w-4 h-4" />
                          Upload Work
                        </button>
                        <button 
                          onClick={handleLogout}
                          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-red-400 hover:bg-red-500/10 transition-colors text-left"
                        >
                          <LogOut className="w-4 h-4" />
                          Logout
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <button className="hidden md:flex w-10 h-10 rounded-full bg-nexus-bg-secondary border border-nexus-border/30 items-center justify-center text-nexus-text-secondary transition-all hover:border-nexus-accent/50 hover:text-nexus-accent">
                  <User className="w-4 h-4" />
                </button>
              )}

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden w-10 h-10 rounded-full bg-nexus-bg-secondary border border-nexus-border/30 flex items-center justify-center text-nexus-text-secondary"
              >
                {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-[99] bg-nexus-bg/95 backdrop-blur-xl transition-all duration-300 md:hidden ${
          isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(link.href);
              }}
              className="font-heading text-2xl font-semibold text-nexus-text transition-colors hover:text-nexus-accent"
            >
              {link.label}
            </a>
          ))}
          
          {isAuthenticated ? (
            <div className="flex flex-col items-center gap-4 mt-8">
              <Avatar name={user?.name || 'User'} avatarUrl={user?.avatar} size="xl" />
              <div className="text-center">
                <p className="text-nexus-text font-medium text-lg">{user?.name}</p>
                <p className="text-nexus-text-secondary text-sm capitalize">{user?.role} Plan</p>
              </div>
              <button 
                onClick={() => {
                  onDashboardClick?.();
                  setIsMobileMenuOpen(false);
                }}
                className="px-8 py-3 rounded-full bg-nexus-accent text-nexus-bg font-semibold"
              >
                Dashboard
              </button>
            </div>
          ) : (
            <button className="mt-8 px-8 py-3 rounded-full bg-nexus-accent text-nexus-bg font-semibold">
              Sign In
            </button>
          )}
        </div>
      </div>
    </>
  );
}
