import { useState, useRef } from 'react';
import { 
  X, Upload, File, Image, Video, Gamepad2, 
  Brain, Code, Layers, CheckCircle, AlertCircle,
  DollarSign, Tag
} from 'lucide-react';

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const uploadTypes = [
  { id: 'app', label: 'Web App', icon: Code, description: 'SaaS applications, tools, utilities' },
  { id: 'game', label: 'Game', icon: Gamepad2, description: 'Browser games, downloadable games' },
  { id: 'ai-agent', label: 'AI Agent', icon: Brain, description: 'AI tools, chatbots, automation' },
  { id: 'software', label: 'Software', icon: Layers, description: 'Desktop apps, CLI tools' },
  { id: 'blog', label: 'Blog Post', icon: File, description: 'Articles, tutorials, guides' },
  { id: 'video', label: 'Video', icon: Video, description: 'Tutorials, demos, showcases' },
];

const categories = [
  'ai-tools',
  'saas-apps',
  'games',
  'experiments',
  'design-systems',
  'productivity',
  'developer-tools',
];

export default function UploadModal({ isOpen, onClose }: UploadModalProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const thumbnailInputRef = useRef<HTMLInputElement>(null);
  
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedType, setSelectedType] = useState<string>('');
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    price: '',
    pricingType: 'free' as 'free' | 'paid' | 'subscription',
    tags: [] as string[],
    techStack: [] as string[],
    currentTag: '',
    currentTech: '',
  });

  if (!isOpen) return null;

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    setUploadedFiles(prev => [...prev, ...files]);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setUploadedFiles(prev => [...prev, ...files]);
  };

  const handleThumbnailSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setThumbnail(file);
  };

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const addTag = () => {
    if (formData.currentTag && !formData.tags.includes(formData.currentTag)) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, prev.currentTag],
        currentTag: ''
      }));
    }
  };

  const removeTag = (tag: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(t => t !== tag)
    }));
  };

  const addTech = () => {
    if (formData.currentTech && !formData.techStack.includes(formData.currentTech)) {
      setFormData(prev => ({
        ...prev,
        techStack: [...prev.techStack, prev.currentTech],
        currentTech: ''
      }));
    }
  };

  const removeTech = (tech: string) => {
    setFormData(prev => ({
      ...prev,
      techStack: prev.techStack.filter(t => t !== tech)
    }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setIsSuccess(true);
    
    // Reset after showing success
    setTimeout(() => {
      setIsSuccess(false);
      setStep(1);
      setSelectedType('');
      setUploadedFiles([]);
      setThumbnail(null);
      setFormData({
        title: '',
        description: '',
        category: '',
        price: '',
        pricingType: 'free',
        tags: [],
        techStack: [],
        currentTag: '',
        currentTech: '',
      });
      onClose();
    }, 2000);
  };

  const canProceed = () => {
    if (step === 1) return selectedType !== '';
    if (step === 2) return uploadedFiles.length > 0 && formData.title && formData.description && formData.category;
    return true;
  };

  if (isSuccess) {
    return (
      <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-nexus-bg/95 backdrop-blur-xl" />
        <div className="relative p-12 rounded-3xl bg-nexus-bg-secondary border border-nexus-accent/30 text-center">
          <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-500" />
          </div>
          <h3 className="font-heading text-2xl font-semibold text-nexus-text mb-2">Upload Successful!</h3>
          <p className="text-nexus-text-secondary">Your content has been submitted for review.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-nexus-bg/95 backdrop-blur-xl"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative w-full max-w-3xl max-h-[90vh] bg-nexus-bg-secondary rounded-3xl border border-nexus-border/30 overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-nexus-border/20">
          <div>
            <h2 className="font-heading text-xl font-semibold text-nexus-text">Upload Your Work</h2>
            <p className="text-nexus-text-secondary text-sm">Share your apps, games, AI agents, and more</p>
          </div>
          <button 
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-nexus-bg border border-nexus-border/30 flex items-center justify-center text-nexus-text-secondary hover:text-nexus-accent transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center gap-4 px-6 py-4 border-b border-nexus-border/20">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                step >= s ? 'bg-nexus-accent text-nexus-bg' : 'bg-nexus-bg text-nexus-text-secondary'
              }`}>
                {s}
              </div>
              <span className={`text-sm ${step >= s ? 'text-nexus-text' : 'text-nexus-text-secondary'}`}>
                {s === 1 ? 'Type' : s === 2 ? 'Details' : 'Review'}
              </span>
              {s < 3 && <div className="w-8 h-px bg-nexus-border/30 mx-2" />}
            </div>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Step 1: Select Type */}
          {step === 1 && (
            <div className="space-y-6">
              <h3 className="font-heading text-lg font-semibold text-nexus-text">What are you uploading?</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {uploadTypes.map((type) => {
                  const Icon = type.icon;
                  return (
                    <button
                      key={type.id}
                      onClick={() => setSelectedType(type.id)}
                      className={`p-4 rounded-2xl border text-left transition-all ${
                        selectedType === type.id
                          ? 'bg-nexus-accent/10 border-nexus-accent/50'
                          : 'bg-nexus-bg border-nexus-border/30 hover:border-nexus-accent/30'
                      }`}
                    >
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${
                        selectedType === type.id ? 'bg-nexus-accent/20' : 'bg-nexus-bg-secondary'
                      }`}>
                        <Icon className={`w-5 h-5 ${selectedType === type.id ? 'text-nexus-accent' : 'text-nexus-text-secondary'}`} />
                      </div>
                      <p className={`font-medium ${selectedType === type.id ? 'text-nexus-accent' : 'text-nexus-text'}`}>
                        {type.label}
                      </p>
                      <p className="text-nexus-text-secondary text-xs mt-1">{type.description}</p>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Step 2: Upload Files & Details */}
          {step === 2 && (
            <div className="space-y-6">
              {/* File Upload Area */}
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`relative p-8 rounded-2xl border-2 border-dashed cursor-pointer transition-all ${
                  isDragging
                    ? 'border-nexus-accent bg-nexus-accent/10'
                    : 'border-nexus-border/30 bg-nexus-bg hover:border-nexus-accent/30'
                }`}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  onChange={handleFileSelect}
                  className="hidden"
                />
                <div className="text-center">
                  <div className="w-16 h-16 rounded-2xl bg-nexus-accent/10 flex items-center justify-center mx-auto mb-4">
                    <Upload className="w-8 h-8 text-nexus-accent" />
                  </div>
                  <p className="text-nexus-text font-medium mb-1">Drop files here or click to browse</p>
                  <p className="text-nexus-text-secondary text-sm">Support for ZIP, EXE, APK, and more</p>
                </div>
              </div>

              {/* Uploaded Files */}
              {uploadedFiles.length > 0 && (
                <div className="space-y-2">
                  <p className="text-nexus-text-secondary text-sm">Uploaded Files ({uploadedFiles.length})</p>
                  {uploadedFiles.map((file, i) => (
                    <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-nexus-bg border border-nexus-border/20">
                      <div className="flex items-center gap-3">
                        <File className="w-5 h-5 text-nexus-accent" />
                        <span className="text-nexus-text text-sm">{file.name}</span>
                        <span className="text-nexus-text-secondary text-xs">({(file.size / 1024 / 1024).toFixed(2)} MB)</span>
                      </div>
                      <button 
                        onClick={() => removeFile(i)}
                        className="text-nexus-text-secondary hover:text-red-400 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Thumbnail Upload */}
              <div>
                <p className="text-nexus-text-secondary text-sm mb-2">Thumbnail (optional)</p>
                <div 
                  onClick={() => thumbnailInputRef.current?.click()}
                  className="w-32 h-32 rounded-xl border-2 border-dashed border-nexus-border/30 bg-nexus-bg flex items-center justify-center cursor-pointer hover:border-nexus-accent/30 transition-colors overflow-hidden"
                >
                  <input
                    ref={thumbnailInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleThumbnailSelect}
                    className="hidden"
                  />
                  {thumbnail ? (
                    <img src={URL.createObjectURL(thumbnail)} alt="Thumbnail" className="w-full h-full object-cover" />
                  ) : (
                    <Image className="w-8 h-8 text-nexus-text-secondary" />
                  )}
                </div>
              </div>

              {/* Form Fields */}
              <div className="space-y-4">
                <div>
                  <label className="text-nexus-text-secondary text-sm mb-2 block">Title *</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="Enter a catchy title"
                    className="w-full px-4 py-3 rounded-xl bg-nexus-bg border border-nexus-border/30 text-nexus-text placeholder:text-nexus-text-secondary/50 focus:outline-none focus:border-nexus-accent/50 transition-colors"
                  />
                </div>

                <div>
                  <label className="text-nexus-text-secondary text-sm mb-2 block">Description *</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Describe your work..."
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl bg-nexus-bg border border-nexus-border/30 text-nexus-text placeholder:text-nexus-text-secondary/50 focus:outline-none focus:border-nexus-accent/50 transition-colors resize-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-nexus-text-secondary text-sm mb-2 block">Category *</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl bg-nexus-bg border border-nexus-border/30 text-nexus-text focus:outline-none focus:border-nexus-accent/50 transition-colors appearance-none"
                    >
                      <option value="">Select category</option>
                      {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-nexus-text-secondary text-sm mb-2 block">Pricing</label>
                    <div className="flex gap-2">
                      {(['free', 'paid', 'subscription'] as const).map((type) => (
                        <button
                          key={type}
                          onClick={() => setFormData(prev => ({ ...prev, pricingType: type }))}
                          className={`flex-1 px-3 py-3 rounded-xl text-sm capitalize transition-all ${
                            formData.pricingType === type
                              ? 'bg-nexus-accent/10 text-nexus-accent border border-nexus-accent/30'
                              : 'bg-nexus-bg text-nexus-text-secondary border border-nexus-border/30'
                          }`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {formData.pricingType !== 'free' && (
                  <div>
                    <label className="text-nexus-text-secondary text-sm mb-2 block">Price ($)</label>
                    <div className="relative">
                      <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-nexus-text-secondary" />
                      <input
                        type="number"
                        value={formData.price}
                        onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                        placeholder="0.00"
                        className="w-full pl-11 pr-4 py-3 rounded-xl bg-nexus-bg border border-nexus-border/30 text-nexus-text placeholder:text-nexus-text-secondary/50 focus:outline-none focus:border-nexus-accent/50 transition-colors"
                      />
                    </div>
                  </div>
                )}

                {/* Tags */}
                <div>
                  <label className="text-nexus-text-secondary text-sm mb-2 block">Tags</label>
                  <div className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={formData.currentTag}
                      onChange={(e) => setFormData(prev => ({ ...prev, currentTag: e.target.value }))}
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                      placeholder="Add a tag and press Enter"
                      className="flex-1 px-4 py-2 rounded-xl bg-nexus-bg border border-nexus-border/30 text-nexus-text placeholder:text-nexus-text-secondary/50 focus:outline-none focus:border-nexus-accent/50 transition-colors"
                    />
                    <button
                      onClick={addTag}
                      className="px-4 py-2 rounded-xl bg-nexus-accent/10 text-nexus-accent hover:bg-nexus-accent/20 transition-colors"
                    >
                      <Tag className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {formData.tags.map((tag) => (
                      <span key={tag} className="flex items-center gap-1 px-3 py-1 rounded-full bg-nexus-accent/10 text-nexus-accent text-sm">
                        {tag}
                        <button onClick={() => removeTag(tag)} className="hover:text-red-400">
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Tech Stack */}
                <div>
                  <label className="text-nexus-text-secondary text-sm mb-2 block">Tech Stack</label>
                  <div className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={formData.currentTech}
                      onChange={(e) => setFormData(prev => ({ ...prev, currentTech: e.target.value }))}
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTech())}
                      placeholder="e.g., React, Node.js"
                      className="flex-1 px-4 py-2 rounded-xl bg-nexus-bg border border-nexus-border/30 text-nexus-text placeholder:text-nexus-text-secondary/50 focus:outline-none focus:border-nexus-accent/50 transition-colors"
                    />
                    <button
                      onClick={addTech}
                      className="px-4 py-2 rounded-xl bg-nexus-accent/10 text-nexus-accent hover:bg-nexus-accent/20 transition-colors"
                    >
                      <Code className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {formData.techStack.map((tech) => (
                      <span key={tech} className="flex items-center gap-1 px-3 py-1 rounded-full bg-nexus-bg-secondary text-nexus-text-secondary text-sm border border-nexus-border/30">
                        {tech}
                        <button onClick={() => removeTech(tech)} className="hover:text-red-400">
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Review */}
          {step === 3 && (
            <div className="space-y-6">
              <h3 className="font-heading text-lg font-semibold text-nexus-text">Review Your Upload</h3>
              
              <div className="p-6 rounded-2xl bg-nexus-bg border border-nexus-border/20 space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-20 h-20 rounded-xl bg-nexus-accent/10 flex items-center justify-center overflow-hidden">
                    {thumbnail ? (
                      <img src={URL.createObjectURL(thumbnail)} alt="Thumbnail" className="w-full h-full object-cover" />
                    ) : (
                      <Image className="w-8 h-8 text-nexus-accent" />
                    )}
                  </div>
                  <div>
                    <h4 className="font-heading text-lg font-semibold text-nexus-text">{formData.title}</h4>
                    <p className="text-nexus-text-secondary text-sm capitalize">{selectedType} • {formData.category}</p>
                    <p className="text-nexus-accent font-medium mt-1">
                      {formData.pricingType === 'free' ? 'Free' : `$${formData.price}`}
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-nexus-border/20">
                  <p className="text-nexus-text-secondary text-sm mb-2">Description</p>
                  <p className="text-nexus-text">{formData.description}</p>
                </div>

                <div className="pt-4 border-t border-nexus-border/20">
                  <p className="text-nexus-text-secondary text-sm mb-2">Files ({uploadedFiles.length})</p>
                  <div className="space-y-1">
                    {uploadedFiles.map((file, i) => (
                      <p key={i} className="text-nexus-text text-sm">{file.name}</p>
                    ))}
                  </div>
                </div>

                {formData.tags.length > 0 && (
                  <div className="pt-4 border-t border-nexus-border/20">
                    <p className="text-nexus-text-secondary text-sm mb-2">Tags</p>
                    <div className="flex flex-wrap gap-2">
                      {formData.tags.map(tag => (
                        <span key={tag} className="px-2 py-1 rounded-full bg-nexus-accent/10 text-nexus-accent text-xs">{tag}</span>
                      ))}
                    </div>
                  </div>
                )}

                {formData.techStack.length > 0 && (
                  <div className="pt-4 border-t border-nexus-border/20">
                    <p className="text-nexus-text-secondary text-sm mb-2">Tech Stack</p>
                    <div className="flex flex-wrap gap-2">
                      {formData.techStack.map(tech => (
                        <span key={tech} className="px-2 py-1 rounded-full bg-nexus-bg-secondary text-nexus-text-secondary text-xs border border-nexus-border/30">{tech}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex items-start gap-3 p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/20">
                <AlertCircle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                <p className="text-nexus-text-secondary text-sm">
                  Your upload will be reviewed before being published. This usually takes 24-48 hours.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between p-6 border-t border-nexus-border/20">
          <button
            onClick={() => setStep(prev => (prev > 1 ? (prev - 1) as 1 | 2 | 3 : prev))}
            className={`px-6 py-3 rounded-xl text-nexus-text-secondary hover:text-nexus-text transition-colors ${
              step === 1 ? 'invisible' : ''
            }`}
          >
            Back
          </button>
          
          {step < 3 ? (
            <button
              onClick={() => setStep(prev => (prev + 1) as 1 | 2 | 3)}
              disabled={!canProceed()}
              className="px-8 py-3 rounded-xl bg-nexus-accent text-nexus-bg font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-glow transition-all"
            >
              Continue
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="px-8 py-3 rounded-xl bg-nexus-accent text-nexus-bg font-semibold disabled:opacity-50 hover:shadow-glow transition-all flex items-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-nexus-bg/30 border-t-nexus-bg rounded-full animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4" />
                  Submit for Review
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
