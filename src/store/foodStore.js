import { create } from 'zustand';
import api from '../services/api';

const useFoodStore = create((set) => ({
  searchResults: [],
  isLoading: false,
  error: null,
  searchFood: async (query) => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.get(`/foods/search?q=${encodeURIComponent(query)}`);
      set({ searchResults: response.data.results, isLoading: false });
    } catch (error) {
      set({ error: error.response?.data?.message || error.message, isLoading: false });
    }
  },
}));

export default useFoodStore;
