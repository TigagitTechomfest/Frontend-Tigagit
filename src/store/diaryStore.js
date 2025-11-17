import { create } from 'zustand';
import api from '../services/api';

const useDiaryStore = create((set) => ({
  diaryEntries: [],
  selectedDate: new Date().toISOString().substring(0, 10),
  isLoading: false,
  error: null,
  fetchDiary: async (date) => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.get(`/diary?date=${date}`);
      set({ diaryEntries: response.data.entries, selectedDate: date, isLoading: false });
    } catch (error) {
      set({ error: error.response?.data?.message || error.message, isLoading: false });
    }
  },
  addFoodToDiary: async (foodData) => {
    set({ isLoading: true, error: null });
    try {
      await api.post('/diary', foodData);
      set({ isLoading: false });
      // You may want to refetch diary here
    } catch (error) {
      set({ error: error.response?.data?.message || error.message, isLoading: false });
    }
  },
  removeFoodFromDiary: async (entryId) => {
    set({ isLoading: true, error: null });
    try {
      await api.delete(`/diary/${entryId}`);
      set({ isLoading: false });
      // You may want to refetch diary here
    } catch (error) {
      set({ error: error.response?.data?.message || error.message, isLoading: false });
    }
  },
}));

export default useDiaryStore;
