import { create } from 'zustand';
import api from './api';

export const useAuthStore = create((set) => ({
  user: JSON.parse(localStorage.getItem('user') || 'null'),
  token: localStorage.getItem('token') || null,
  isAuthenticated: !!localStorage.getItem('token'),
  
  login: async (email, password) => {
    const response = await api.post('/api/auth/login', { email, password });
    const { access_token, user } = response.data;
    
    localStorage.setItem('token', access_token);
    localStorage.setItem('user', JSON.stringify(user));
    
    set({ user, token: access_token, isAuthenticated: true });
    return response.data;
  },
  
  register: async (userData) => {
    const response = await api.post('/api/auth/register', userData);
    const { access_token, user } = response.data;
    
    localStorage.setItem('token', access_token);
    localStorage.setItem('user', JSON.stringify(user));
    
    set({ user, token: access_token, isAuthenticated: true });
    return response.data;
  },
  
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    set({ user: null, token: null, isAuthenticated: false });
  },
  
  updateUser: (userData) => {
    const updatedUser = { ...JSON.parse(localStorage.getItem('user')), ...userData };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    set({ user: updatedUser });
  },
}));

export const useLoanStore = create((set) => ({
  loans: [],
  currentLoan: null,
  loading: false,
  
  setLoans: (loans) => set({ loans }),
  setCurrentLoan: (loan) => set({ currentLoan: loan }),
  setLoading: (loading) => set({ loading }),
  
  fetchLoans: async () => {
    set({ loading: true });
    try {
      const response = await api.get('/api/loans');
      set({ loans: response.data, loading: false });
    } catch (error) {
      set({ loading: false });
      throw error;
    }
  },
  
  createLoan: async (loanData) => {
    const response = await api.post('/api/loans', loanData);
    set((state) => ({ loans: [response.data, ...state.loans] }));
    return response.data;
  },
}));
