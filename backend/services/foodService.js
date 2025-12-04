// import api from '../../src/services/api'; // assuming you have axios instance

// // ============= FOOD DATABASE ENDPOINTS =============

// /**
//  * Search makanan dari local DB atau USDA
//  * @param {string} query - search query
//  * @param {boolean} online - kalau true, search dari USDA
//  * @returns {Promise<Array>}
//  */
// export const searchFoods = async (query, online = false) => {
//   try {
//     const source = online ? 'online' : 'local';
//     const response = await api.get('/foods', {
//       params: {
//         search: query,
//         source: source,
//       },
//     });
    
//     // Normalize response
//     const foods = response.data.data.data || response.data.data;
//     return Array.isArray(foods) ? foods : [];
//   } catch (error) {
//     console.error('Error searching foods:', error);
//     throw error;
//   }
// };

// /**
//  * Save makanan baru ke database lokal
//  * @param {Object} foodData
//  * @returns {Promise<Object>}
//  */
// export const saveFoodToDatabase = async (foodData) => {
//   try {
//     const payload = {
//       food_name: foodData.food_name || foodData.foodName || foodData.name,
//       category: foodData.category || 'General',
//       calories_per_100g: foodData.calories_per_100g || foodData.calories,
//       protein_per_100g: foodData.protein_per_100g || foodData.protein || 0,
//       carbs_per_100g: foodData.carbs_per_100g || foodData.carbs || 0,
//       fat_per_100g: foodData.fat_per_100g || foodData.fat || 0,
//       fiber: foodData.fiber || 0,
//       sodium: foodData.sodium || 0,
//       standard_unit: 'gram',
//       source: foodData.source || 'USDA',
//       external_id: foodData.external_id || foodData.fdcId || null,
//     };

//     const response = await api.post('/foods', payload);
//     return response.data.data;
//   } catch (error) {
//     console.error('Error saving food to database:', error);
//     throw error;
//   }
// };

// /**
//  * Get detail makanan dari database
//  * @param {number} id
//  * @returns {Promise<Object>}
//  */
// export const getFoodDetail = async (id) => {
//   try {
//     const response = await api.get(`/foods/${id}`);
//     return response.data.data;
//   } catch (error) {
//     console.error('Error getting food detail:', error);
//     throw error;
//   }
// };

// // ============= DAILY LOG ENDPOINTS =============

// /**
//  * Get daily log untuk user
//  * @param {string} date - format: YYYY-MM-DD
//  * @returns {Promise<Object>}
//  */
// export const getDailyLog = async (date) => {
//   try {
//     const response = await api.get('/daily-logs', {
//       params: { date },
//     });
//     return response.data.data;
//   } catch (error) {
//     console.error('Error getting daily log:', error);
//     throw error;
//   }
// };

// /**
//  * Add meal ke daily log
//  * @param {Object} mealData
//  * @returns {Promise<Object>}
//  */
// export const addMealToDiary = async (mealData) => {
//   try {
//     const payload = {
//       date: mealData.date,
//       meal_type: mealData.mealType || mealData.meal_type,
//       food_id: mealData.foodId || mealData.food_id,
//       quantity: mealData.quantity || 100, // in grams
//     };

//     const response = await api.post('/daily-logs/meal', payload);
//     return response.data.data;
//   } catch (error) {
//     console.error('Error adding meal to diary:', error);
//     throw error;
//   }
// };

// /**
//  * Remove meal dari daily log
//  * @param {number} mealId
//  * @returns {Promise<Object>}
//  */
// export const removeMealFromDiary = async (mealId) => {
//   try {
//     const response = await api.delete(`/daily-logs/meal/${mealId}`);
//     return response.data;
//   } catch (error) {
//     console.error('Error removing meal from diary:', error);
//     throw error;
//   }
// };

// // ============= BATCH OPERATIONS =============

// /**
//  * Get multiple foods dari USDA
//  * @param {Array<number>} fdcIds
//  * @returns {Promise<Array>}
//  */
// export const getBatchFoods = async (fdcIds) => {
//   try {
//     const response = await api.post('/foods/batch', {
//       fdcIds: fdcIds,
//     });
//     return response.data.data;
//   } catch (error) {
//     console.error('Error getting batch foods:', error);
//     throw error;
//   }
// };