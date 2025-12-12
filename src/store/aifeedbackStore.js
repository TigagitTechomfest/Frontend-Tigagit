import { create } from 'zustand';
import api from '../services/api';

const useAiFeedbackStore = create((set, get) => ({
  // ============= STATE =============
  feedback: null,
  feedbackByDate: {}, // { [date]: feedbackData }
  isLoading: false,
  error: null,

  // ============= ACTIONS =============

  /**
   * ✅ FETCH FEEDBACK - Backend akan handle caching/regeneration
   * FE hanya perlu request, BE yang decide mau return cache atau generate baru
   * @param {string} date - format: YYYY-MM-DD
   * @param {boolean} forceRegenerate - paksa generate ulang (optional)
   */
  fetchFeedback: async (date, forceRegenerate = false) => {
    set({ isLoading: true, error: null });

    try {
      const endpoint = forceRegenerate ? '/feedback/regenerate' : '/feedback/daily';

      console.log(`🤖 Requesting AI feedback for: ${date}`, {
        forceRegenerate,
      });

      const response = await api.post(endpoint, { date });

      if (!response.data.success) {
        throw new Error(response.data.message || 'Failed to fetch feedback');
      }

      const feedbackData = response.data.data;
      const isCached = response.data.cached || false;

      // Log info untuk debugging
      if (isCached) {
        console.log('📦 Feedback loaded from backend cache (no changes)');
      } else {
        console.log('✨ Fresh feedback generated from Gemini');
      }

      // Simpan ke state
      set((state) => ({
        feedback: feedbackData,
        feedbackByDate: {
          ...state.feedbackByDate,
          [date]: feedbackData,
        },
        error: null,
        isLoading: false,
      }));

      return feedbackData;
    } catch (err) {
      console.error('❌ Jurnal belum diisi:', err);

      const errorMessage =
        err.response?.data?.message || err.message || 'Failed to load feedback';

      set({
        feedback: null,
        error: errorMessage,
        isLoading: false,
      });

      throw err;
    }
  },

  /**
   * ✅ Generate feedback (alias untuk fetchFeedback)
   * @param {string} date - format: YYYY-MM-DD
   */
  generateDailyFeedback: async (date) => {
    return get().fetchFeedback(date);
  },

  /**
   * ✅ Force regenerate feedback
   * Gunakan ini kalau user explicit mau refresh feedback
   * @param {string} date - format: YYYY-MM-DD
   */
  forceRegenerate: async (date) => {
    return get().fetchFeedback(date, true);
  },

  /**
   * ✅ Get feedback dari memory (tanpa API call)
   * @param {string} date - format: YYYY-MM-DD
   * @returns {object|null}
   */
  getFeedbackByDate: (date) => {
    return get().feedbackByDate[date] || null;
  },

  /**
   * ✅ Clear error
   */
  clearError: () => {
    set({ error: null });
  },

  /**
   * ✅ Reset store
   */
  resetFeedback: () => {
    console.log('♻️ Resetting feedback store');
    set({
      feedback: null,
      feedbackByDate: {},
      isLoading: false,
      error: null,
    });
  },

  /**
   * ✅ Clear feedback untuk tanggal tertentu dari memory
   * (Backend tetap punya data, ini hanya clear FE state)
   * @param {string} date - format: YYYY-MM-DD
   */
  clearFeedbackByDate: (date) => {
    set((state) => {
      const newFeedbackByDate = { ...state.feedbackByDate };
      delete newFeedbackByDate[date];

      return {
        feedbackByDate: newFeedbackByDate,
        feedback: state.feedback?.log_id === date ? null : state.feedback,
      };
    });
  },

  /**
   * ✅ Clear all feedback dari memory
   */
  clearAllFeedback: () => {
    set({
      feedback: null,
      feedbackByDate: {},
    });
  },
}));

export default useAiFeedbackStore;