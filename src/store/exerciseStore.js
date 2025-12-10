import { create } from 'zustand';
import api from '../services/api';
import { format } from 'date-fns';

export const useExerciseStore = create((set) => ({
  // State
  loading: false,
  error: null,
  success: null,

  // Actions
  
  // Add exercise baru
  addExercise: async (exerciseData, onSuccess) => {
    set({ loading: true, error: null, success: null });
    try {
      // Tambah exercise_date sebelum kirim
      const dataToSend = {
        ...exerciseData,
        exercise_date: format(new Date(), 'yyyy-MM-dd')
      };
      
      const response = await api.post('/exercises', dataToSend);
      
      if (response.data.success) {
        const newExercise = response.data.data;
        
        set({
          success: {
            message: `${newExercise.exercise_type} - ${newExercise.calories_burned} kcal berhasil dicatat!`,
            data: newExercise
          },
          error: null,
        });

        // Trigger callback untuk refresh progress store dan exercise list
        if (onSuccess) {
          onSuccess();
        }

        return {
          success: true,
          data: newExercise,
          message: 'Exercise berhasil dicatat!'
        };
      }
    } catch (error) {
      const errorMsg = error.response?.data?.message || 'Gagal menambah exercise';
      set({ error: errorMsg });
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  // Clear error
  clearError: () => set({ error: null }),

  // Clear success
  clearSuccess: () => set({ success: null }),

  // Reset store
  reset: () => {
    set({
      loading: false,
      error: null,
      success: null,
    });
  },
}));