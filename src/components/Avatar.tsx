import React, { useState, useRef } from 'react';
import { Camera, User, Sparkles } from 'lucide-react';

interface AvatarProps {
  name: string;
  avatarUrl?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  editable?: boolean;
  onUpload?: (file: File) => void;
  className?: string;
}

const sizes = {
  xs: 'w-6 h-6 text-xs',
  sm: 'w-8 h-8 text-sm',
  md: 'w-10 h-10 text-base',
  lg: 'w-14 h-14 text-lg',
  xl: 'w-20 h-20 text-2xl',
};

// Generate a consistent color based on name
function getAvatarColor(name: string): string {
  const colors = [
    'bg-gradient-to-br from-purple-500 to-indigo-600',
    'bg-gradient-to-br from-pink-500 to-rose-600',
    'bg-gradient-to-br from-cyan-500 to-blue-600',
    'bg-gradient-to-br from-emerald-500 to-teal-600',
    'bg-gradient-to-br from-orange-500 to-red-600',
    'bg-gradient-to-br from-violet-500 to-purple-600',
  ];
  
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  
  return colors[Math.abs(hash) % colors.length];
}

// Generate initials from name
function getInitials(name: string): string {
  return name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

export default function Avatar({ 
  name, 
  avatarUrl, 
  size = 'md', 
  editable = false,
  onUpload,
  className = ''
}: AvatarProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const sizeClass = sizes[size];
  const displayUrl = previewUrl || avatarUrl;
  const initials = getInitials(name);
  const bgColor = getAvatarColor(name);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
      
      // Call upload handler
      onUpload?.(file);
    }
  };

  const handleClick = () => {
    if (editable) {
      fileInputRef.current?.click();
    }
  };

  return (
    <div 
      className={`relative inline-block ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Hidden file input */}
      {editable && (
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
      )}
      
      {/* Avatar display */}
      <div
        onClick={handleClick}
        className={`
          ${sizeClass}
          rounded-full
          flex items-center justify-center
          font-heading font-semibold
          overflow-hidden
          transition-all duration-300
          ${editable ? 'cursor-pointer' : ''}
          ${isHovered && editable ? 'ring-2 ring-nexus-accent ring-offset-2 ring-offset-nexus-bg' : ''}
          ${displayUrl ? '' : bgColor}
          ${displayUrl ? '' : 'text-white'}
        `}
      >
        {displayUrl ? (
          <img 
            src={displayUrl} 
            alt={name}
            className="w-full h-full object-cover"
          />
        ) : (
          <span>{initials}</span>
        )}
      </div>
      
      {/* Edit overlay */}
      {editable && isHovered && (
        <div className="absolute inset-0 rounded-full bg-nexus-bg/70 flex items-center justify-center cursor-pointer">
          <Camera className="w-1/3 h-1/3 text-nexus-accent" />
        </div>
      )}
      
      {/* Edit indicator (always visible when editable) */}
      {editable && !isHovered && (
        <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-nexus-accent flex items-center justify-center">
          <Camera className="w-3 h-3 text-nexus-bg" />
        </div>
      )}
    </div>
  );
}

// Avatar generator for creating unique avatars
interface AvatarGeneratorProps {
  name: string;
  onGenerate: (avatarData: string) => void;
  className?: string;
}

export function AvatarGenerator({ name, onGenerate, className = '' }: AvatarGeneratorProps) {
  const [selectedStyle, setSelectedStyle] = useState(0);
  
  const styles = [
    { name: 'Neon', gradient: 'from-nexus-accent to-purple-600' },
    { name: 'Ocean', gradient: 'from-cyan-400 to-blue-600' },
    { name: 'Sunset', gradient: 'from-orange-400 to-pink-600' },
    { name: 'Forest', gradient: 'from-emerald-400 to-teal-600' },
    { name: 'Fire', gradient: 'from-red-400 to-orange-600' },
    { name: 'Cosmic', gradient: 'from-violet-400 to-indigo-600' },
  ];

  const generateAvatar = () => {
    // Create a canvas-based avatar
    const canvas = document.createElement('canvas');
    canvas.width = 200;
    canvas.height = 200;
    const ctx = canvas.getContext('2d');
    
    if (ctx) {
      // Draw gradient background
      const gradient = ctx.createLinearGradient(0, 0, 200, 200);
      const style = styles[selectedStyle];
      
      // Parse gradient colors
      const colors = style.gradient.replace('from-', '').replace('to-', '').split(' ');
      gradient.addColorStop(0, colors[0]);
      gradient.addColorStop(1, colors[1]);
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 200, 200);
      
      // Draw initials
      ctx.fillStyle = 'white';
      ctx.font = 'bold 80px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(getInitials(name), 100, 100);
      
      // Convert to data URL
      const dataUrl = canvas.toDataURL('image/png');
      onGenerate(dataUrl);
    }
  };

  return (
    <div className={`p-6 rounded-2xl bg-nexus-bg-secondary border border-nexus-border/30 ${className}`}>
      <h3 className="font-heading font-semibold text-nexus-text mb-4 flex items-center gap-2">
        <Sparkles className="w-5 h-5 text-nexus-accent" />
        Create Your Avatar
      </h3>
      
      {/* Preview */}
      <div className="flex justify-center mb-6">
        <div className={`w-24 h-24 rounded-full bg-gradient-to-br ${styles[selectedStyle].gradient} flex items-center justify-center`}>
          <span className="text-3xl font-heading font-bold text-white">
            {getInitials(name)}
          </span>
        </div>
      </div>
      
      {/* Style selector */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        {styles.map((style, index) => (
          <button
            key={index}
            onClick={() => setSelectedStyle(index)}
            className={`
              p-3 rounded-xl transition-all
              ${selectedStyle === index 
                ? 'ring-2 ring-nexus-accent bg-nexus-accent/10' 
                : 'bg-nexus-bg hover:bg-nexus-accent/5'}
            `}
          >
            <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${style.gradient} mx-auto mb-2`} />
            <span className="text-xs text-nexus-text-secondary">{style.name}</span>
          </button>
        ))}
      </div>
      
      {/* Generate button */}
      <button
        onClick={generateAvatar}
        className="w-full py-3 rounded-xl bg-nexus-accent text-nexus-bg font-semibold hover:shadow-glow transition-all"
      >
        Generate Avatar
      </button>
      
      <p className="text-nexus-text-secondary text-xs text-center mt-4">
        Or upload your own photo below
      </p>
    </div>
  );
}

// Default avatar placeholder
export function AvatarPlaceholder({ size = 'md', className = '' }: { size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl', className?: string }) {
  const sizeClass = sizes[size];
  
  return (
    <div className={`${sizeClass} rounded-full bg-nexus-bg-secondary border border-nexus-border/30 flex items-center justify-center ${className}`}>
      <User className="w-1/2 h-1/2 text-nexus-text-secondary" />
    </div>
  );
}
