import { create } from 'zustand';
import api from '../services/api';
import { format } from 'date-fns';

const useDiaryStore = create((set, get) => ({
  // ============= STATE =============
  diaryEntries: [],
  selectedDate: format(new Date(), 'yyyy-MM-dd'),
  isLoading: false,
  error: null,
  totalDailyIntake: {
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
  },

  // ============= COMPUTED STATE =============
  mealsByType: (entries) => {
    return {
      breakfast: entries.filter((e) => e.meal_type === 'breakfast'),
      lunch: entries.filter((e) => e.meal_type === 'lunch'),
      dinner: entries.filter((e) => e.meal_type === 'dinner'),
      snack: entries.filter((e) => e.meal_type === 'snack'),
    };
  },

  // ============= ACTIONS =============

  /**
   * Fetch daily log untuk tanggal tertentu
   * @param {string} date - format: YYYY-MM-DD
   */
  fetchDiary: async (date) => {
    set({ isLoading: true, error: null, selectedDate: date });

    try {
      console.log('📖 Fetching diary for:', date);
      
      const response = await api.get('/daily-logs', {
        params: { date },
      });

      console.log('📦 Daily log response:', response.data);

      const log = response.data.data;

      if (!log || !log.meal_entries || log.meal_entries.length === 0) {
        set({
          diaryEntries: [],
          totalDailyIntake: {
            calories: 0,
            protein: 0,
            carbs: 0,
            fat: 0,
          },
          isLoading: false,
        });
        return;
      }

      // Normalize meal entries dari response
      const normalizedEntries = log.meal_entries.map((entry, index) => ({
        id: `${date}-${index}`, // unique identifier untuk frontend
        meal_index: index, // index untuk update/delete di backend
        meal_type: entry.meal_type,
        food_id: entry.food_id,
        food_name: entry.food_name,
        quantity: entry.quantity || 100,
        calories: entry.calories || 0,
        protein: entry.protein || 0,
        carbs: entry.carbs || 0,
        fat: entry.fat || 0,
        date: date,
      }));

      const totals = log.total_daily_intake || {
        calories: 0,
        protein: 0,
        carbs: 0,
        fat: 0,
      };

      console.log('✅ Normalized entries:', normalizedEntries);

      set({
        diaryEntries: normalizedEntries,
        totalDailyIntake: totals,
        isLoading: false,
      });
    } catch (err) {
      console.error('❌ Fetch diary error:', err);
      set({
        error: err.response?.data?.message || err.message || 'Failed to fetch diary',
        diaryEntries: [],
        isLoading: false,
      });
    }
  },

  /**
   * Add makanan ke diary
   * @param {Object} mealData - berisi foodId, mealType, quantity, date
   */
  addFoodToDiary: async (mealData) => {
    set({ isLoading: true, error: null });

    try {
      const payload = {
        date: mealData.date,
        meal_type: mealData.mealType,
        food_id: mealData.foodId,
        quantity: mealData.quantity || 100,
      };

      console.log('🍽️ Adding meal:', payload);

      const response = await api.post('/daily-logs/meal', payload);

      console.log('✅ Meal added:', response.data.data);

      // Update diary entries setelah add
      const { selectedDate } = get();
      await get().fetchDiary(mealData.date || selectedDate);

      set({ isLoading: false });
      return response.data.data;
    } catch (err) {
      console.error('❌ Add meal error:', err);
      set({
        error: err.response?.data?.message || err.message || 'Failed to add meal',
        isLoading: false,
      });
      throw err;
    }
  },

  /**
   * Edit kuantitas makanan di diary
   * @param {number} mealIndex - index meal di array
   * @param {string} date - tanggal diary
   * @param {number} quantity - kuantitas baru (gram)
   */
  editFoodFromDiary: async (mealIndex, date, quantity) => {
    set({ isLoading: true, error: null });

    try {
      console.log('✏️ Editing meal:', { date, meal_index: mealIndex, quantity });

      const payload = {
        date: date,
        meal_index: mealIndex,
        quantity: parseInt(quantity),
      };

      const response = await api.put('/daily-logs/meal', payload);

      console.log('✅ Meal updated:', response.data.data);

      // Update diary entries setelah edit
      await get().fetchDiary(date);

      set({ isLoading: false });
      return response.data.data;
    } catch (err) {
      console.error('❌ Edit meal error:', err);
      set({
        error: err.response?.data?.message || err.message || 'Failed to update meal',
        isLoading: false,
      });
      throw err;
    }
  },

  /**
   * Remove makanan dari diary
   * @param {number} mealIndex - index meal di array
   * @param {string} date - tanggal diary
   */
  removeFoodFromDiary: async (mealIndex, date) => {
    set({ isLoading: true, error: null });

    try {
      console.log('🗑️ Removing meal:', { date, meal_index: mealIndex });

      await api.delete('/daily-logs/meal', {
        params: { 
          date: date,
          meal_index: mealIndex 
        },
      });

      console.log('✅ Meal removed');

      // Update diary entries setelah remove
      await get().fetchDiary(date);

      set({ isLoading: false });
    } catch (err) {
      console.error('❌ Remove meal error:', err);
      set({
        error: err.response?.data?.message || err.message || 'Failed to remove meal',
        isLoading: false,
      });
      throw err;
    }
  },

  /**
   * Change selected date
   * @param {string} date - format: YYYY-MM-DD
   */
  setSelectedDate: (date) => {
    set({ selectedDate: date });
  },

  /**
   * Get meals by type
   */
  getMealsByType: () => {
    const { diaryEntries, mealsByType } = get();
    return mealsByType(diaryEntries);
  },

  /**
   * Get total calories
   */
  getTotalCalories: () => {
    const { totalDailyIntake } = get();
    return Math.round(totalDailyIntake.calories);
  },

  /**
   * Clear error
   */
  clearError: () => {
    set({ error: null });
  },

  /**
   * Reset diary (untuk logout atau clear data)
   */
  resetDiary: () => {
    set({
      diaryEntries: [],
      selectedDate: format(new Date(), 'yyyy-MM-dd'),
      totalDailyIntake: {
        calories: 0,
        protein: 0,
        carbs: 0,
        fat: 0,
      },
      error: null,
      isLoading: false,
    });
  },
}));

export default useDiaryStore;