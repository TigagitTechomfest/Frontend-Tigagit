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

export default {
  getDailyProgress
};
