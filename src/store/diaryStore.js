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

      const log = response.data.data;
      console.log('📦 Daily log response:', log);

      if (!log) {
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
      const entries = log.meal_entries || [];
      const normalizedEntries = entries.map((entry, index) => ({
        id: entry.id || `${date}-${entry.meal_type}-${index}`,
        meal_index: index, // ← TAMBAHKAN INI untuk track index
        meal_type: entry.meal_type,
        food_id: entry.food_id,
        food_name: entry.food_name,
        quantity: entry.quantity || 100,
        calories: entry.calories || 0,
        protein: entry.protein || 0,
        carbs: entry.carbs || 0,
        fat: entry.fat || 0,
        date: entry.date || date,
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
      await get().fetchDiary(selectedDate);

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
   * Update makanan di diary
   * @param {Object} updateData - berisi entryId, mealIndex, quantity, date
   */
  updateFoodInDiary: async (updateData) => {
    set({ isLoading: true, error: null });

    try {
      const { selectedDate } = get();
      const payload = {
        date: updateData.date || selectedDate,
        meal_index: updateData.mealIndex,
        quantity: parseInt(updateData.quantity) || 100,
      };

      console.log('✏️ Updating meal:', payload);

      const response = await api.put('/daily-logs/meal', payload);

      console.log('✅ Meal updated:', response.data);

      // Update diary entries setelah update
      await get().fetchDiary(selectedDate);

      set({ isLoading: false });
      return response.data.data;
    } catch (err) {
      console.error('❌ Update meal error:', err);
      console.error('❌ Error response:', err.response?.data);
      const errorMessage = err.response?.data?.message || err.message || 'Failed to update meal';
      set({
        error: errorMessage,
        isLoading: false,
      });
      throw new Error(errorMessage);
    }
  },

  /**
   * Remove makanan dari diary
   * @param {number} mealIndex - meal index
   * @param {string} date - date
   */
  removeFoodFromDiary: async (mealIndex, date) => {
    set({ isLoading: true, error: null });

    try {
      const { selectedDate } = get();
      const targetDate = date || selectedDate;
      
      console.log('🗑️ Removing meal:', { meal_index: mealIndex, date: targetDate });

      await api.delete('/daily-logs/meal', {
        data: { 
          meal_index: mealIndex,
          date: targetDate
        }
      });

      console.log('✅ Meal removed');

      // Update diary entries setelah remove
      await get().fetchDiary(selectedDate);

      set({ isLoading: false });
    } catch (err) {
      console.error('❌ Remove meal error:', err);
      console.error('❌ Error response:', err.response?.data);
      const errorMessage = err.response?.data?.message || err.message || 'Failed to remove meal';
      set({
        error: errorMessage,
        isLoading: false,
      });
      throw new Error(errorMessage);
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