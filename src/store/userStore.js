import { create } from 'zustand';
import api from '../services/api';

const useUserStore = create((set) => ({
  profile: null,
  isLoading: false,
  error: null,
  fetchProfile: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.get('/profile');
      set({ profile: response.data, isLoading: false });
    } catch (error) {
      set({ error: error.response?.data?.message || error.message, isLoading: false });
    }
  },
  updateProfile: async (data) => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.put('/profile', data);
      set({ profile: response.data, isLoading: false });
    } catch (error) {
      set({ error: error.response?.data?.message || error.message, isLoading: false });
    }
  },
}));

export default useUserStore;
