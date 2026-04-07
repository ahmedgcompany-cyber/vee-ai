import { useState } from 'react';
import { 
  X, Download, ShoppingBag, CreditCard, Heart, 
  TrendingUp, Package, Star,
  Settings, Bell, Camera
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { products } from '@/data';
import Avatar, { AvatarGenerator } from '@/components/Avatar';
import type { Product } from '@/types';

interface UserDashboardProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function UserDashboard({ isOpen, onClose }: UserDashboardProps) {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'overview' | 'downloads' | 'purchases' | 'subscriptions' | 'favorites'>('overview');

  if (!isOpen || !user) return null;

  const getFavoriteProducts = (): Product[] => {
    return products.filter(p => user.favorites.includes(p.id));
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: TrendingUp },
    { id: 'downloads', label: 'Downloads', icon: Download },
    { id: 'purchases', label: 'Purchases', icon: ShoppingBag },
    { id: 'subscriptions', label: 'Subscriptions', icon: CreditCard },
    { id: 'favorites', label: 'Favorites', icon: Heart },
  ];

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-nexus-bg/90 backdrop-blur-xl"
        onClick={onClose}
      />
      
      {/* Dashboard Panel */}
      <div className="relative w-full max-w-6xl max-h-[90vh] bg-nexus-bg-secondary rounded-3xl border border-nexus-border/30 overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-nexus-border/20">
          <div className="flex items-center gap-4">
            <div className="relative">
              <Avatar 
                name={user.name} 
                avatarUrl={user.avatar} 
                size="lg" 
                editable={true}
                onUpload={(file) => {
                  // Handle avatar upload
                  console.log('Avatar uploaded:', file);
                  // TODO: Upload to server and update user avatar
                }}
              />
            </div>
            <div>
              <h2 className="font-heading text-xl font-semibold text-nexus-text">{user.name}</h2>
              <p className="text-nexus-text-secondary text-sm">{user.email}</p>
              <span className="inline-block mt-1 px-2 py-0.5 rounded-full bg-nexus-accent/10 text-nexus-accent text-xs capitalize">
                {user.role} Member
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="w-10 h-10 rounded-full bg-nexus-bg border border-nexus-border/30 flex items-center justify-center text-nexus-text-secondary hover:text-nexus-accent transition-colors">
              <Bell className="w-4 h-4" />
            </button>
            <button className="w-10 h-10 rounded-full bg-nexus-bg border border-nexus-border/30 flex items-center justify-center text-nexus-text-secondary hover:text-nexus-accent transition-colors">
              <Settings className="w-4 h-4" />
            </button>
            <button 
              onClick={onClose}
              className="w-10 h-10 rounded-full bg-nexus-bg border border-nexus-border/30 flex items-center justify-center text-nexus-text-secondary hover:text-nexus-accent transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden flex">
          {/* Sidebar */}
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

            {/* Quick Stats */}
            <div className="mt-8 p-4 rounded-2xl bg-nexus-bg border border-nexus-border/20">
              <h4 className="text-nexus-text-secondary text-xs uppercase tracking-wider mb-4">Your Stats</h4>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-nexus-text-secondary text-sm">Downloads</span>
                  <span className="text-nexus-text font-medium">{user.downloads.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-nexus-text-secondary text-sm">Purchases</span>
                  <span className="text-nexus-text font-medium">{user.purchases.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-nexus-text-secondary text-sm">Favorites</span>
                  <span className="text-nexus-text font-medium">{user.favorites.length}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 overflow-y-auto p-6">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <h3 className="font-heading text-2xl font-semibold text-nexus-text">Dashboard Overview</h3>
                
                {/* Stats Cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    { label: 'Total Downloads', value: user.downloads.length, icon: Download },
                    { label: 'Purchases', value: user.purchases.length, icon: ShoppingBag },
                    { label: 'Active Subs', value: user.subscriptions.filter(s => s.status === 'active').length, icon: CreditCard },
                    { label: 'Favorites', value: user.favorites.length, icon: Heart },
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

                {/* Avatar Generator - Show if no avatar */}
                {!user.avatar && (
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-1">
                      <AvatarGenerator 
                        name={user.name}
                        onGenerate={(avatarData) => {
                          console.log('Generated avatar:', avatarData);
                          // TODO: Save to user profile
                        }}
                      />
                    </div>
                    <div className="lg:col-span-2 p-6 rounded-2xl bg-nexus-bg border border-nexus-border/20">
                      <h4 className="font-heading font-semibold text-nexus-text mb-4 flex items-center gap-2">
                        <Camera className="w-5 h-5 text-nexus-accent" />
                        Upload Your Photo
                      </h4>
                      <div className="border-2 border-dashed border-nexus-border/30 rounded-xl p-8 text-center hover:border-nexus-accent/50 transition-colors cursor-pointer">
                        <div className="w-16 h-16 rounded-full bg-nexus-accent/10 flex items-center justify-center mx-auto mb-4">
                          <Camera className="w-8 h-8 text-nexus-accent" />
                        </div>
                        <p className="text-nexus-text font-medium mb-2">Click to upload photo</p>
                        <p className="text-nexus-text-secondary text-sm">JPG, PNG up to 5MB</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Recent Activity */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Recent Downloads */}
                  <div className="p-6 rounded-2xl bg-nexus-bg border border-nexus-border/20">
                    <h4 className="font-heading font-semibold text-nexus-text mb-4">Recent Downloads</h4>
                    {user.downloads.length > 0 ? (
                      <div className="space-y-3">
                        {user.downloads.slice(0, 3).map((download) => (
                          <div key={download.id} className="flex items-center justify-between p-3 rounded-xl bg-nexus-bg-secondary">
                            <div>
                              <p className="text-nexus-text font-medium">{download.productName}</p>
                              <p className="text-nexus-text-secondary text-xs">v{download.version}</p>
                            </div>
                            <span className="text-nexus-text-secondary text-xs">
                              {new Date(download.downloadedAt).toLocaleDateString()}
                            </span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-nexus-text-secondary text-sm">No downloads yet</p>
                    )}
                  </div>

                  {/* Active Subscriptions */}
                  <div className="p-6 rounded-2xl bg-nexus-bg border border-nexus-border/20">
                    <h4 className="font-heading font-semibold text-nexus-text mb-4">Active Subscriptions</h4>
                    {user.subscriptions.filter(s => s.status === 'active').length > 0 ? (
                      <div className="space-y-3">
                        {user.subscriptions.filter(s => s.status === 'active').map((sub) => (
                          <div key={sub.id} className="flex items-center justify-between p-3 rounded-xl bg-nexus-bg-secondary">
                            <div>
                              <p className="text-nexus-text font-medium">{sub.planName}</p>
                              <p className="text-nexus-text-secondary text-xs capitalize">{sub.interval}</p>
                            </div>
                            <span className="px-2 py-1 rounded-full bg-green-500/20 text-green-400 text-xs">
                              Active
                            </span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-nexus-text-secondary text-sm">No active subscriptions</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Downloads Tab */}
            {activeTab === 'downloads' && (
              <div className="space-y-6">
                <h3 className="font-heading text-2xl font-semibold text-nexus-text">Your Downloads</h3>
                {user.downloads.length > 0 ? (
                  <div className="space-y-3">
                    {user.downloads.map((download) => (
                      <div key={download.id} className="flex items-center justify-between p-4 rounded-2xl bg-nexus-bg border border-nexus-border/20">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-xl bg-nexus-accent/10 flex items-center justify-center">
                            <Package className="w-6 h-6 text-nexus-accent" />
                          </div>
                          <div>
                            <p className="text-nexus-text font-medium">{download.productName}</p>
                            <p className="text-nexus-text-secondary text-sm">Version {download.version}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-nexus-text-secondary text-sm">
                            {new Date(download.downloadedAt).toLocaleDateString()}
                          </span>
                          <button className="px-4 py-2 rounded-lg bg-nexus-accent/10 text-nexus-accent text-sm hover:bg-nexus-accent/20 transition-colors">
                            Download Again
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Package className="w-16 h-16 text-nexus-border/50 mx-auto mb-4" />
                    <p className="text-nexus-text-secondary">No downloads yet</p>
                  </div>
                )}
              </div>
            )}

            {/* Purchases Tab */}
            {activeTab === 'purchases' && (
              <div className="space-y-6">
                <h3 className="font-heading text-2xl font-semibold text-nexus-text">Your Purchases</h3>
                {user.purchases.length > 0 ? (
                  <div className="space-y-3">
                    {user.purchases.map((purchase) => (
                      <div key={purchase.id} className="flex items-center justify-between p-4 rounded-2xl bg-nexus-bg border border-nexus-border/20">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-xl bg-nexus-accent/10 flex items-center justify-center">
                            <ShoppingBag className="w-6 h-6 text-nexus-accent" />
                          </div>
                          <div>
                            <p className="text-nexus-text font-medium">{purchase.productName}</p>
                            <p className="text-nexus-text-secondary text-sm capitalize">{purchase.status}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="font-heading font-semibold text-nexus-accent">${purchase.price}</span>
                          <span className="text-nexus-text-secondary text-sm">
                            {new Date(purchase.purchasedAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <ShoppingBag className="w-16 h-16 text-nexus-border/50 mx-auto mb-4" />
                    <p className="text-nexus-text-secondary">No purchases yet</p>
                  </div>
                )}
              </div>
            )}

            {/* Subscriptions Tab */}
            {activeTab === 'subscriptions' && (
              <div className="space-y-6">
                <h3 className="font-heading text-2xl font-semibold text-nexus-text">Your Subscriptions</h3>
                {user.subscriptions.length > 0 ? (
                  <div className="space-y-3">
                    {user.subscriptions.map((sub) => (
                      <div key={sub.id} className="p-4 rounded-2xl bg-nexus-bg border border-nexus-border/20">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-nexus-accent/10 flex items-center justify-center">
                              <CreditCard className="w-6 h-6 text-nexus-accent" />
                            </div>
                            <div>
                              <p className="text-nexus-text font-medium">{sub.planName}</p>
                              <p className="text-nexus-text-secondary text-sm capitalize">{sub.interval} billing</p>
                            </div>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-xs capitalize ${
                            sub.status === 'active' 
                              ? 'bg-green-500/20 text-green-400' 
                              : 'bg-red-500/20 text-red-400'
                          }`}>
                            {sub.status}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-nexus-text-secondary">${sub.price}/{sub.interval === 'monthly' ? 'mo' : 'yr'}</span>
                          <span className="text-nexus-text-secondary">Renews: {new Date(sub.endDate).toLocaleDateString()}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <CreditCard className="w-16 h-16 text-nexus-border/50 mx-auto mb-4" />
                    <p className="text-nexus-text-secondary">No subscriptions yet</p>
                  </div>
                )}
              </div>
            )}

            {/* Favorites Tab */}
            {activeTab === 'favorites' && (
              <div className="space-y-6">
                <h3 className="font-heading text-2xl font-semibold text-nexus-text">Your Favorites</h3>
                {getFavoriteProducts().length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {getFavoriteProducts().map((product) => (
                      <div key={product.id} className="flex gap-4 p-4 rounded-2xl bg-nexus-bg border border-nexus-border/20">
                        <img 
                          src={product.images[0]} 
                          alt={product.title}
                          className="w-20 h-20 rounded-xl object-cover"
                        />
                        <div className="flex-1">
                          <h4 className="font-medium text-nexus-text">{product.title}</h4>
                          <p className="text-nexus-text-secondary text-sm line-clamp-1">{product.shortDescription}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <Star className="w-4 h-4 text-yellow-500" />
                            <span className="text-nexus-text-secondary text-sm">{product.rating}</span>
                            <span className="text-nexus-border">•</span>
                            <span className="text-nexus-text-secondary text-sm">{product.downloads.toLocaleString()} downloads</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Heart className="w-16 h-16 text-nexus-border/50 mx-auto mb-4" />
                    <p className="text-nexus-text-secondary">No favorites yet</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
