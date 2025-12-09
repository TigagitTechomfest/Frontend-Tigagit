import { create } from 'zustand';
import api from '../services/api';
import { format } from 'date-fns';

const useAiFeedbackStore = create((set, get) => ({
  // ============= STATE =============
  feedback: null,
  isLoading: false,
  error: null,
  feedbackGenerated: false,

  // ============= ACTIONS =============

  /**
   * Generate AI Feedback untuk tanggal tertentu
   * @param {string} date - format: YYYY-MM-DD
   */
  generateDailyFeedback: async (date) => {
    set({ isLoading: true, error: null });

    try {
      console.log('🤖 Generating AI feedback for:', date);

      const response = await api.post('/feedback/daily', {
        date: date,
      });

      console.log('✅ AI Feedback generated:', response.data.data);

      set({
        feedback: response.data.data,
        feedbackGenerated: true,
        isLoading: false,
      });

      return response.data.data;
    } catch (err) {
      console.error('❌ Generate feedback error:', err);
      set({
        error: err.response?.data?.message || err.message || 'Failed to generate feedback',
        isLoading: false,
      });
      throw err;
    }
  },

  /**
   * Fetch AI Feedback yang sudah pernah di-generate
   * @param {string} date - format: YYYY-MM-DD
   */
  fetchFeedback: async (date) => {
    set({ isLoading: true, error: null });

    try {
      console.log('📖 Fetching AI feedback for:', date);

      // Coba generate jika belum ada
      const response = await api.post('/feedback/daily', {
        date: date,
      });

      set({
        feedback: response.data.data,
        feedbackGenerated: true,
        isLoading: false,
      });

      return response.data.data;
    } catch (err) {
      console.error('❌ Fetch feedback error:', err);
      
      // Jika error, set feedback null tapi jangan throw error
      set({
        feedback: null,
        feedbackGenerated: false,
        error: null, // Jangan tampilkan error, hanya silent fail
        isLoading: false,
      });
    }
  },

  /**
   * Clear feedback
   */
  clearFeedback: () => {
    set({
      feedback: null,
      feedbackGenerated: false,
      error: null,
    });
  },

  /**
   * Clear error
   */
  clearError: () => {
    set({ error: null });
  },

  /**
   * Reset store
   */
  resetFeedback: () => {
    set({
      feedback: null,
      isLoading: false,
      error: null,
      feedbackGenerated: false,
    });
  },
}));

export default useAiFeedbackStore;