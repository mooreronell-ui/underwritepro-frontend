import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'https://underwritepro-backend.onrender.com';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Loan API methods
export const loanAPI = {
  getAll: (params) => api.get('/api/loans', { params }),
  getById: (id) => api.get(`/api/loans/${id}`),
  create: (data) => api.post('/api/loans', data),
  update: (id, data) => api.put(`/api/loans/${id}`, data),
  delete: (id) => api.delete(`/api/loans/${id}`),
  getStats: () => api.get('/api/loans/stats'),
};

// AI Advisor API methods
export const aiAPI = {
  ask: (question, loanId = null) => api.post('/api/ai/ask', { question, loan_id: loanId }),
};

// Risk Assessment API methods
export const riskAPI = {
  assess: (loanId) => api.post(`/api/underwriting/assess-risk/${loanId}`),
};

// Document API methods
export const documentAPI = {
  upload: async (loanId, file, documentType) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('document_type', documentType);
    formData.append('loan_application_id', loanId);
    return api.post('/api/documents/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
  getByLoan: (loanId) => api.get(`/api/documents?loan_id=${loanId}`),
};

// Broker API methods
export const brokerAPI = {
  getLenders: () => api.get('/api/broker/lenders'),
  submitToLender: (loanId, lenderId) => api.post('/api/broker/submit', { loan_id: loanId, lender_id: lenderId }),
  getCommissions: () => api.get('/api/broker/commissions'),
};

// Lender API methods
export const lenderAPI = {
  getPipeline: () => api.get('/api/lender/pipeline'),
  makeDecision: (loanId, decision, notes) => api.post('/api/lender/decision', { loan_id: loanId, decision, notes }),
  getAnalytics: () => api.get('/api/lender/portfolio/analytics'),
};

export default api;
