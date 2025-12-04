import { create } from 'zustand';
import api from '../services/api';

const useFoodStore = create((set, get) => ({
  // ============= STATE =============
  searchResults: [],
  isLoading: false,
  isSearching: false,
  error: null,
  lastSearchQuery: '',
  searchMode: 'local',

  // ============= ACTIONS =============

  /**
   * Search makanan dari local atau USDA
   */
  searchFood: async (query, mode = 'local') => {
    if (!query.trim()) {
      set({ searchResults: [], lastSearchQuery: '' });
      return;
    }

    set({ isSearching: true, error: null, searchMode: mode });

    try {
      const isOnline = mode === 'online';
      console.log(`🔍 Searching [${mode}]:`, query);

      const response = await api.get('/foods', {
        params: {
          search: query,
          source: isOnline ? 'online' : 'local',
        },
      });

      // Handle berbagai format response
      let foods = response.data.data || [];
      
      // Kalau data adalah object dengan .data (pagination), ambil data-nya
      if (foods && typeof foods === 'object' && !Array.isArray(foods) && foods.data) {
        foods = foods.data;
      }
      
      // Ensure foods adalah array
      if (!Array.isArray(foods)) {
        foods = [];
      }
      
      console.log(`📦 Raw results from API (${mode}):`, foods);
      console.log(`📊 Total results:`, foods.length);

      // Normalize results ke format yang sama
      const normalizedResults = foods.map((food, index) => ({
        id: food.id || food.fdcId || `usda-${index}`, // Fallback ke index kalau ga ada id
        name: food.food_name || food.description || food.name,
        category: food.category || food.foodCategory || 'General',
        calories_per_100g: food.calories_per_100g || food.energy || 0,
        protein_per_100g: food.protein_per_100g || food.protein || 0,
        carbs_per_100g: food.carbs_per_100g || food.carbohydrate || 0,
        fat_per_100g: food.fat_per_100g || food.fat || 0,
        fiber: food.fiber || 0,
        sodium: food.sodium || 0,
        source: food.source || (isOnline ? 'USDA' : 'Local'),
        external_id: food.external_id || food.fdcId || null,
      }));

      console.log(`✅ Normalized results:`, normalizedResults);

      set({
        searchResults: normalizedResults,
        lastSearchQuery: query,
        isSearching: false,
      });
    } catch (err) {
      console.error(`❌ Search error (${mode}):`, err);
      console.error('📋 Error details:', {
        message: err.message,
        response: err.response?.data,
        status: err.response?.status,
      });

      set({
        error: err.response?.data?.message || err.message || 'Search failed',
        searchResults: [],
        isSearching: false,
      });
    }
  },

  /**
   * Search dari USDA jika local search gagal
   */
  searchWithFallback: async (query) => {
    // Try local search first
    await get().searchFood(query, 'local');

    const { searchResults } = get();

    // Kalau ga ada hasil, try USDA
    if (searchResults.length === 0) {
      console.log('📡 Local results empty, trying USDA...');
      await get().searchFood(query, 'online');
    }
  },

  /**
   * Prepare makanan sebelum save ke database
   * Handle USDA foods yang perlu disimpan
   */
  prepareFood: async (food) => {
    // Kalau makanan sudah dari local DB, langsung return
    if (food.source === 'Local' && food.id) {
      return {
        ...food,
        foodId: food.id,
      };
    }

    // Kalau dari USDA, save ke database dulu
    if (food.source === 'USDA') {
      try {
        set({ isLoading: true });
        console.log('💾 Saving USDA food to database:', food.name);

        const response = await api.post('/foods', {
          food_name: food.name,
          category: food.category || 'General',
          calories_per_100g: food.calories_per_100g || 0,
          protein_per_100g: food.protein_per_100g || 0,
          carbs_per_100g: food.carbs_per_100g || 0,
          fat_per_100g: food.fat_per_100g || 0,
          fiber: food.fiber || 0,
          sodium: food.sodium || 0,
          external_id: food.external_id,
        });

        const savedFood = response.data.data;
        console.log('✅ Food saved:', savedFood);

        set({ isLoading: false });

        return {
          ...food,
          foodId: savedFood.id,
          id: savedFood.id,
        };
      } catch (err) {
        console.error('❌ Failed to save food:', err);
        set({
          error: `Failed to save food: ${err.message}`,
          isLoading: false,
        });
        throw err;
      }
    }

    return food;
  },

  /**
   * Get detail makanan
   */
  getFoodDetail: async (id) => {
    set({ isLoading: true, error: null });

    try {
      const response = await api.get(`/foods/${id}`);
      set({ isLoading: false });
      return response.data.data;
    } catch (err) {
      set({
        error: err.response?.data?.message || err.message,
        isLoading: false,
      });
      throw err;
    }
  },

  /**
   * Get batch foods dari USDA
   */
  getBatchFoods: async (fdcIds) => {
    set({ isLoading: true, error: null });

    try {
      const response = await api.post('/foods/batch', { fdcIds });
      set({ isLoading: false });
      return response.data.data;
    } catch (err) {
      set({
        error: err.response?.data?.message || err.message,
        isLoading: false,
      });
      throw err;
    }
  },

  /**
   * Clear search results
   */
  clearSearch: () => {
    set({
      searchResults: [],
      lastSearchQuery: '',
      error: null,
    });
  },

  /**
   * Set error message
   */
  setError: (error) => {
    set({ error });
  },

  /**
   * Clear error
   */
  clearError: () => {
    set({ error: null });
  },
}));

export default useFoodStore;