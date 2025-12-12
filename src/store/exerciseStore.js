import { create } from 'zustand';
import api from '../services/api';

const useExerciseStore = create((set, get) => ({
  // ============= STATE =============
  exercises: [],
  exercisesByDate: {}, // { [date]: [exercises] }
  isLoading: false,
  error: null,
  isSubmitting: false,

  // ============= ACTIONS =============

  /**
   * ✅ FETCH EXERCISES - Get semua exercise untuk hari ini
   */
  fetchExercises: async () => {
    set({ isLoading: true, error: null });

    try {
      const response = await api.get('/exercises');

      if (!response.data.success) {
        throw new Error(response.data.message || 'Failed to fetch exercises');
      }

      const exercisesData = response.data.data || [];

      set((state) => ({
        exercises: exercisesData,
        exercisesByDate: {
          ...state.exercisesByDate,
          ['today']: exercisesData,
        },
        error: null,
        isLoading: false,
      }));

      return exercisesData;
    } catch (err) {
      console.error('❌ Fetch exercises error:', err);

      const errorMessage =
        err.response?.data?.message || err.message || 'Failed to load exercises';

      set({
        exercises: [],
        error: errorMessage,
        isLoading: false,
      });

      throw err;
    }
  },

  /**
   * ✅ ADD EXERCISE - Create exercise baru untuk hari ini
   * @param {string} exerciseType - jenis olahraga
   * @param {number} duration - durasi dalam menit
   * @param {number} caloriesBurned - optional, kalori yang terbakar
   */
  addExercise: async (exerciseType, duration, caloriesBurned = null) => {
    set({ isSubmitting: true, error: null });

    try {
      const today = new Date().toISOString().split('T')[0];

      console.log('🏃 Adding exercise...', {
        exerciseType,
        duration,
        caloriesBurned,
      });

      const response = await api.post('/exercises', {
        exercise_date: today,
        exercise_type: exerciseType,
        duration: parseInt(duration),
        calories_burned: caloriesBurned ? parseInt(caloriesBurned) : null,
      });

      if (!response.data.success) {
        throw new Error(response.data.message || 'Failed to add exercise');
      }

      const newExercise = response.data.data;
      const estimatedCalories = caloriesBurned ? 'user input' : 'AI estimated';

      console.log(
        `✅ Exercise added (${estimatedCalories}): ${newExercise.exercise_type} - ${newExercise.duration}min - ${newExercise.calories_burned} kcal`
      );

      // Update state
      set((state) => ({
        exercises: [...state.exercises, newExercise],
        exercisesByDate: {
          ...state.exercisesByDate,
          ['today']: [...(state.exercisesByDate['today'] || []), newExercise],
        },
        error: null,
        isSubmitting: false,
      }));

      return newExercise;
    } catch (err) {
      console.error('❌ Add exercise error:', err);

      const errorMessage =
        err.response?.data?.message || err.message || 'Failed to add exercise';

      set({
        error: errorMessage,
        isSubmitting: false,
      });

      throw err;
    }
  },

  /**
   * ✅ DELETE EXERCISE - Hapus exercise berdasarkan ID
   * @param {number} exerciseId - ID exercise yang mau dihapus
   */
  deleteExercise: async (exerciseId) => {
    try {
      console.log(`🗑️ Deleting exercise ID: ${exerciseId}`);

      const response = await api.delete(`/exercises/${exerciseId}`);

      if (!response.data.success) {
        throw new Error(response.data.message || 'Failed to delete exercise');
      }

      console.log(`✅ Exercise deleted`);

      // Update state
      set((state) => {
        const updatedExercises = state.exercises.filter((e) => e.id !== exerciseId);
        const updatedByDate = {
          ...state.exercisesByDate,
          ['today']: (state.exercisesByDate['today'] || []).filter((e) => e.id !== exerciseId),
        };

        return {
          exercises: updatedExercises,
          exercisesByDate: updatedByDate,
        };
      });

      return true;
    } catch (err) {
      console.error('❌ Delete exercise error:', err);

      const errorMessage =
        err.response?.data?.message || err.message || 'Failed to delete exercise';

      set({ error: errorMessage });

      throw err;
    }
  },

  /**
   * ✅ Get exercises untuk hari ini dari memory
   */
  getExercisesToday: () => {
    return get().exercisesByDate['today'] || [];
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
  resetExercises: () => {
    console.log('♻️ Resetting exercises store');
    set({
      exercises: [],
      exercisesByDate: {},
      isLoading: false,
      error: null,
      isSubmitting: false,
    });
  },
}));

export default useExerciseStore;