import { create } from 'zustand';
import { format } from 'date-fns';
import { getDailyProgress } from '../services/progressService';

const useProgressStore = create((set, get) => ({
  // State
  dailyProgress: null,
  selectedDate: format(new Date(), 'yyyy-MM-dd'),
  isLoading: false,
  error: null,

  // Actions
  fetchDailyProgress: async (date) => {
    set({ isLoading: true, error: null });
    
    try {
      const response = await getDailyProgress(date);
      
      set({
        dailyProgress: response.data,
        selectedDate: date,
        isLoading: false,
      });
      
      return response.data;
    } catch (error) {
      console.error('Error in fetchDailyProgress:', error);
      set({
        error: error.response?.data?.message || error.message || 'Failed to fetch daily progress',
        isLoading: false,
      });
      throw error;
    }
  },
  
  // Helper to get progress percentage for a specific nutrient
  getNutrientProgress: (nutrient) => {
    const { dailyProgress } = get();
    if (!dailyProgress) return 0;
    
    const current = dailyProgress.intake[nutrient] || 0;
    const target = dailyProgress.target[nutrient] || 1; // Avoid division by zero
    
    return Math.min(Math.round((current / target) * 100), 100);
  },
  
  // Get net calories (intake - burned)
  getNetCalories: () => {
    const { dailyProgress } = get();
    if (!dailyProgress) return 0;
    
    return dailyProgress.intake.calories - dailyProgress.burned;
  },
  
  // Get remaining calories (target - net)
  getRemainingCalories: () => {
    const { dailyProgress } = get();
    if (!dailyProgress) return 0;
    
    return Math.max(0, dailyProgress.target.calories - (dailyProgress.intake.calories - dailyProgress.burned));
  }
}));

export default useProgressStore;
