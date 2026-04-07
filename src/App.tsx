import { useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AuthProvider, CartProvider, useAuth } from '@/hooks';
import Navigation from '@/components/Navigation';
import UserDashboard from '@/components/dashboard/UserDashboard';
import AdminDashboard from '@/components/dashboard/AdminDashboard';
import UploadModal from '@/components/dashboard/UploadModal';
import Hero from '@/sections/Hero';
import FeaturedWork from '@/sections/FeaturedWork';
import Manifesto from '@/sections/Manifesto';
import ProjectGrid from '@/sections/ProjectGrid';
import ProductSpotlight from '@/sections/ProductSpotlight';
import StackServices from '@/sections/StackServices';
import Testimonials from '@/sections/Testimonials';
import ContactCTA from '@/sections/ContactCTA';
import Footer from '@/sections/Footer';
import './App.css';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [isUserDashboardOpen, setIsUserDashboardOpen] = useState(false);
  const [isAdminDashboardOpen, setIsAdminDashboardOpen] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  useEffect(() => {
    // Wait for all sections to mount before setting up global snap
    const timer = setTimeout(() => {
      const pinned = ScrollTrigger.getAll()
        .filter(st => st.vars.pin)
        .sort((a, b) => a.start - b.start);
      
      const maxScroll = ScrollTrigger.maxScroll(window);
      
      if (!maxScroll || pinned.length === 0) return;

      // Build pinned ranges and snap targets from actual pinned sections
      const pinnedRanges = pinned.map(st => ({
        start: st.start / maxScroll,
        end: (st.end ?? st.start) / maxScroll,
        center: (st.start + ((st.end ?? st.start) - st.start) * 0.5) / maxScroll,
      }));

      // Create global snap
      ScrollTrigger.create({
        snap: {
          snapTo: (value: number) => {
            // Check if within any pinned range (with small buffer)
            const inPinned = pinnedRanges.some(
              r => value >= r.start - 0.02 && value <= r.end + 0.02
            );
            
            if (!inPinned) return value; // Flowing section: free scroll

            // Find nearest pinned center
            const target = pinnedRanges.reduce((closest, r) =>
              Math.abs(r.center - value) < Math.abs(closest - value) ? r.center : closest,
              pinnedRanges[0]?.center ?? 0
            );
            
            return target;
          },
          duration: { min: 0.15, max: 0.35 },
          delay: 0,
          ease: 'power2.out',
        }
      });
    }, 500);

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <AuthProvider>
      <CartProvider>
        <div className="relative bg-nexus-bg min-h-screen">
          {/* Noise Overlay */}
          <div className="noise-overlay" />
          
          {/* Navigation */}
          <Navigation 
            onDashboardClick={() => setIsUserDashboardOpen(true)}
            onUploadClick={() => setIsUploadModalOpen(true)}
          />
          
          {/* Main Content */}
          <main className="relative">
            <Hero />
            <FeaturedWork />
            <Manifesto />
            <ProjectGrid />
            <ProductSpotlight />
            <StackServices />
            <Testimonials />
            <ContactCTA />
            <Footer />
          </main>

          {/* Modals */}
          <UserDashboard 
            isOpen={isUserDashboardOpen} 
            onClose={() => setIsUserDashboardOpen(false)} 
          />
          
          <AdminDashboard 
            isOpen={isAdminDashboardOpen} 
            onClose={() => setIsAdminDashboardOpen(false)} 
          />
          
          <UploadModal 
            isOpen={isUploadModalOpen} 
            onClose={() => setIsUploadModalOpen(false)} 
          />

          {/* Admin Quick Access (only visible for admin) */}
          <AdminQuickAccess onClick={() => setIsAdminDashboardOpen(true)} />
        </div>
      </CartProvider>
    </AuthProvider>
  );
}

// Admin Quick Access Button (floating)
function AdminQuickAccess({ onClick }: { onClick: () => void }) {
  const { isAuthenticated, user } = useAuth();
  
  if (!isAuthenticated || user?.role !== 'admin') return null;

  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 z-50 px-4 py-3 rounded-full bg-nexus-accent text-nexus-bg font-semibold shadow-glow-strong hover:scale-105 transition-all flex items-center gap-2"
    >
      <span className="w-2 h-2 rounded-full bg-nexus-bg animate-pulse" />
      Admin Panel
    </button>
  );
}

export default App;
