const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

// Helper to get auth token
const getToken = () => localStorage.getItem('token');

// Generic fetch wrapper
async function fetchAPI(endpoint: string, options: RequestInit = {}) {
  const url = `${API_URL}/api${endpoint}`;
  
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...options.headers as Record<string, string>
  };

  const token = getToken();
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(url, {
    ...options,
    headers
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Unknown error' }));
    throw new Error(error.error || `HTTP ${response.status}`);
  }

  return response.json();
}

// Auth API
export const authAPI = {
  register: (data: { email: string; password: string; name: string }) =>
    fetchAPI('/auth/register', { method: 'POST', body: JSON.stringify(data) }),
  
  login: (data: { email: string; password: string }) =>
    fetchAPI('/auth/login', { method: 'POST', body: JSON.stringify(data) }),
  
  me: () => fetchAPI('/auth/me'),
  
  updateProfile: (data: { name?: string; avatarUrl?: string }) =>
    fetchAPI('/auth/profile', { method: 'PATCH', body: JSON.stringify(data) }),
  
  oauth: (data: { provider: string; email: string; name: string; avatarUrl?: string }) =>
    fetchAPI('/auth/oauth', { method: 'POST', body: JSON.stringify(data) })
};

// Products API
export const productsAPI = {
  getAll: (params?: { category?: string; type?: string; search?: string; page?: number; limit?: number }) => {
    const query = params ? '?' + new URLSearchParams(params as any).toString() : '';
    return fetchAPI(`/products${query}`);
  },
  
  getById: (id: string) => fetchAPI(`/products/${id}`),
  
  create: (data: any) => fetchAPI('/products', { method: 'POST', body: JSON.stringify(data) }),
  
  update: (id: string, data: any) => fetchAPI(`/products/${id}`, { method: 'PATCH', body: JSON.stringify(data) }),
  
  delete: (id: string) => fetchAPI(`/products/${id}`, { method: 'DELETE' }),
  
  addReview: (id: string, data: { rating: number; comment?: string }) =>
    fetchAPI(`/products/${id}/reviews`, { method: 'POST', body: JSON.stringify(data) }),
  
  toggleFavorite: (id: string) => fetchAPI(`/products/${id}/favorite`, { method: 'POST' }),
  
  download: (id: string, version?: string) =>
    fetchAPI(`/products/${id}/download`, { method: 'POST', body: JSON.stringify({ version }) })
};

// Uploads API
export const uploadsAPI = {
  getPresignedUrl: (data: { filename: string; contentType: string; folder?: string }) =>
    fetchAPI('/uploads/presigned-url', { method: 'POST', body: JSON.stringify(data) }),
  
  getDownloadUrl: (key: string) =>
    fetchAPI('/uploads/download-url', { method: 'POST', body: JSON.stringify({ key }) }),
  
  getBatchUrls: (files: { filename: string; contentType: string }[], folder?: string) =>
    fetchAPI('/uploads/batch-presigned-urls', { method: 'POST', body: JSON.stringify({ files, folder }) }),
  
  delete: (key: string) => fetchAPI(`/uploads/${encodeURIComponent(key)}`, { method: 'DELETE' })
};

// Payments API
export const paymentsAPI = {
  createPaymentIntent: (productId: string) =>
    fetchAPI('/payments/create-payment-intent', { method: 'POST', body: JSON.stringify({ productId }) }),
  
  createSubscription: (productId: string, interval?: 'monthly' | 'yearly') =>
    fetchAPI('/payments/create-subscription', { method: 'POST', body: JSON.stringify({ productId, interval }) }),
  
  cancelSubscription: (subscriptionId: string) =>
    fetchAPI('/payments/cancel-subscription', { method: 'POST', body: JSON.stringify({ subscriptionId }) }),
  
  getPurchases: () => fetchAPI('/payments/purchases'),
  
  getSubscriptions: () => fetchAPI('/payments/subscriptions')
};

// Users API
export const usersAPI = {
  getDownloads: () => fetchAPI('/users/downloads'),
  getFavorites: () => fetchAPI('/users/favorites'),
  getStats: () => fetchAPI('/users/stats')
};

// Admin API
export const adminAPI = {
  getAnalytics: () => fetchAPI('/admin/analytics'),
  getUsers: (params?: { page?: number; limit?: number; search?: string }) => {
    const query = params ? '?' + new URLSearchParams(params as any).toString() : '';
    return fetchAPI(`/admin/users${query}`);
  },
  updateUserRole: (id: string, role: string) =>
    fetchAPI(`/admin/users/${id}/role`, { method: 'PATCH', body: JSON.stringify({ role }) }),
  deleteUser: (id: string) => fetchAPI(`/admin/users/${id}`, { method: 'DELETE' }),
  getPendingProducts: () => fetchAPI('/admin/pending-products'),
  updateProductStatus: (id: string, status: 'published' | 'rejected') =>
    fetchAPI(`/admin/products/${id}/status`, { method: 'PATCH', body: JSON.stringify({ status }) })
};

// Email API
export const emailAPI = {
  sendWelcome: (data: { email: string; name: string }) =>
    fetchAPI('/email/welcome', { method: 'POST', body: JSON.stringify(data) }),
  
  sendPurchaseConfirmation: (data: { email: string; productName: string; price: number }) =>
    fetchAPI('/email/purchase-confirmation', { method: 'POST', body: JSON.stringify(data) }),
  
  sendUploadApproved: (data: { email: string; productName: string }) =>
    fetchAPI('/email/upload-approved', { method: 'POST', body: JSON.stringify(data) })
};
