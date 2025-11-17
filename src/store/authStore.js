import { create } from 'zustand';
import api from '../services/api';

const useAuthStore = create((set, get) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  login: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.post('/login', { email, password });
      const { user, token } = response.data;
      localStorage.setItem('token', token);
      set({ user, token, isAuthenticated: true, isLoading: false });
    } catch (error) {
      set({ error: error.response?.data?.message || error.message, isLoading: false });
    }
  },
  register: async (registerData) => {
    set({ isLoading: true, error: null });
    try {
      await api.post('/register', registerData);
      set({ isLoading: false });
    } catch (error) {
      set({ error: error.response?.data?.message || error.message, isLoading: false });
    }
  },
  logout: () => {
    localStorage.removeItem('token');
    set({ user: null, token: null, isAuthenticated: false });
  },
  checkAuth: () => {
    const token = localStorage.getItem('token');
    if (token) {
      set({ token, isAuthenticated: true });
    }
  },
}));

export default useAuthStore;

