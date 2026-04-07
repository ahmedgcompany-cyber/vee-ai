import { useState } from 'react';
import { 
  X, Users, Download, DollarSign, TrendingUp, Package,
  BarChart3, Activity, Clock,
  Plus
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import Avatar from '@/components/Avatar';

interface AdminDashboardProps {
  isOpen: boolean;
  onClose: () => void;
}

const realAnalytics = {
  totalRevenue: 0,
  totalDownloads: 0,
  totalUsers: 1,
  activeSubscriptions: 0,
  popularProducts: [] as any[],
  monthlyGrowth: [] as any[],
  userActivity: [] as any[],
};



export default function AdminDashboard({ isOpen, onClose }: AdminDashboardProps) {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'users' | 'uploads' | 'analytics'>('overview');
  

  if (!isOpen || !user || user.role !== 'admin') return null;

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'products', label: 'Products', icon: Package },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'uploads', label: 'Pending Uploads', icon: Clock },
    { id: 'analytics', label: 'Analytics', icon: Activity },
  ];

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-nexus-bg/95 backdrop-blur-xl" onClick={onClose} />
      
      <div className="relative w-full max-w-7xl max-h-[90vh] bg-nexus-bg-secondary rounded-3xl border border-nexus-border/30 overflow-hidden flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-nexus-border/20">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-nexus-accent/20 border border-nexus-accent/30 flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-nexus-accent" />
            </div>
            <div>
              <h2 className="font-heading text-xl font-semibold text-nexus-text">Admin Dashboard</h2>
              <p className="text-nexus-text-secondary text-sm">Manage your platform</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-full bg-nexus-accent/10 text-nexus-accent text-sm">Admin Access</span>
            <button onClick={onClose} className="w-10 h-10 rounded-full bg-nexus-bg border border-nexus-border/30 flex items-center justify-center text-nexus-text-secondary hover:text-nexus-accent transition-colors">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-hidden flex">
          <div className="w-64 border-r border-nexus-border/20 p-4 hidden md:block">
            <nav className="space-y-1">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all ${
                      activeTab === tab.id
                        ? 'bg-nexus-accent/10 text-nexus-accent border border-nexus-accent/30'
                        : 'text-nexus-text-secondary hover:bg-nexus-bg hover:text-nexus-text'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    {tab.label}
                  </button>
                );
              })}
            </nav>
          </div>

          <div className="flex-1 overflow-y-auto p-6">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <h3 className="font-heading text-2xl font-semibold text-nexus-text">Platform Overview</h3>
                
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    { label: 'Total Revenue', value: `$${realAnalytics.totalRevenue}`, icon: DollarSign },
                    { label: 'Total Downloads', value: realAnalytics.totalDownloads.toString(), icon: Download },
                    { label: 'Total Users', value: realAnalytics.totalUsers.toString(), icon: Users },
                    { label: 'Active Subs', value: realAnalytics.activeSubscriptions.toString(), icon: TrendingUp },
                  ].map((stat, i) => {
                    const Icon = stat.icon;
                    return (
                      <div key={i} className="p-4 rounded-2xl bg-nexus-bg border border-nexus-border/20">
                        <div className="w-10 h-10 rounded-xl bg-nexus-accent/10 flex items-center justify-center mb-3">
                          <Icon className="w-5 h-5 text-nexus-accent" />
                        </div>
                        <p className="text-nexus-text-secondary text-sm">{stat.label}</p>
                        <p className="font-heading text-2xl font-bold text-nexus-text">{stat.value}</p>
                      </div>
                    );
                  })}
                </div>

                <div className="p-6 rounded-2xl bg-nexus-bg border border-nexus-border/20">
                  <h4 className="font-heading font-semibold text-nexus-text mb-4">Popular Products</h4>
                  <div className="text-center py-8">
                    <Package className="w-12 h-12 text-nexus-border/50 mx-auto mb-3" />
                    <p className="text-nexus-text-secondary">No products yet</p>
                    <p className="text-nexus-text-secondary text-sm mt-1">Upload your first product</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'products' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="font-heading text-2xl font-semibold text-nexus-text">Products</h3>
                  <button className="px-4 py-2 rounded-lg bg-nexus-accent text-nexus-bg text-sm font-medium hover:shadow-glow transition-all flex items-center gap-2">
                    <Plus className="w-4 h-4" /> Add Product
                  </button>
                </div>
                <div className="text-center py-12">
                  <Package className="w-16 h-16 text-nexus-border/50 mx-auto mb-4" />
                  <p className="text-nexus-text-secondary text-lg">No products yet</p>
                  <p className="text-nexus-text-secondary text-sm mt-2">Click "Add Product" to upload</p>
                </div>
              </div>
            )}

            {activeTab === 'users' && (
              <div className="space-y-6">
                <h3 className="font-heading text-2xl font-semibold text-nexus-text">Users</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-4 rounded-2xl bg-nexus-bg border border-nexus-border/20">
                    <div className="flex items-center gap-4">
                      <Avatar name="Ahmed M T Alghoul" size="md" />
                      <div>
                        <p className="text-nexus-text font-medium">Ahmed M T Alghoul</p>
                        <p className="text-nexus-text-secondary text-sm">admin@vee.ai</p>
                      </div>
                    </div>
                    <span className="px-3 py-1 rounded-full text-xs bg-nexus-accent/20 text-nexus-accent">Admin</span>
                  </div>
                </div>
                <p className="text-nexus-text-secondary text-sm text-center">You're the only user</p>
              </div>
            )}

            {activeTab === 'uploads' && (
              <div className="space-y-6">
                <h3 className="font-heading text-2xl font-semibold text-nexus-text">Pending Uploads</h3>
                <div className="text-center py-12">
                  <Clock className="w-16 h-16 text-nexus-border/50 mx-auto mb-4" />
                  <p className="text-nexus-text-secondary">No pending uploads</p>
                </div>
              </div>
            )}

            {activeTab === 'analytics' && (
              <div className="space-y-6">
                <h3 className="font-heading text-2xl font-semibold text-nexus-text">Analytics</h3>
                <div className="text-center py-8">
                  <Activity className="w-12 h-12 text-nexus-border/50 mx-auto mb-3" />
                  <p className="text-nexus-text-secondary">No data yet</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
