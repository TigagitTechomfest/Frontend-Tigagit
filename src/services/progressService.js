// services/progressService.js
import api from './api';

/**
 * Get daily progress data
 * @param {string} date - Date in YYYY-MM-DD format
 * @returns {Promise<Object>} - Daily progress data
 */
export const getDailyProgress = async (date) => {
  try {
    const response = await api.get('/progress/daily', {
      params: { date }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching daily progress:', error);
    throw error;
  }
};

/**
 * Get weight history for the logged-in user
 * @returns {Promise} Response with weight history data
 */
export const getWeightHistory = async () => {
  try {
    const response = await api.get('/assessment/weight/history');
    return response.data;
  } catch (error) {
    console.error('Error fetching weight history:', error);
    throw error;
  }
};

/**
 * Update current weight
 * @param {number} weight - New weight value
 * @returns {Promise} Response with updated weight data
 */
export const updateWeight = async (weight) => {
  try {
    const response = await api.put('/assessment/weight', { weight });
    return response.data;
  } catch (error) {
    console.error('Error updating weight:', error);
    throw error;
  }
};

export default {
  getDailyProgress,
  getWeightHistory,
  updateWeight
};