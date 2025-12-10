// src/store/authStore.js
import { create } from 'zustand';
import api from '../services/api';

const useAuthStore = create((set, get) => ({
  user: null,
  token: localStorage.getItem('token'),
  isAuthenticated: !!localStorage.getItem('token'),
  isLoading: false,
  error: null,

  login: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      console.log('🔐 LOGIN START');
      console.log('📧 Email:', email);
      
      const response = await api.post('/auth/login', { email, password });
      
      console.log('📦 RAW RESPONSE:');
      console.log('response:', response);
      console.log('response.data:', response.data);
      console.log('📦 FULL JSON:');
      console.log(JSON.stringify(response.data, null, 2));
      
      // Extract token dan user dari response
      let token = null;
      let user = null;
      
      const data = response.data;
      
      // SEMUA kemungkinan format token
      token = token || data.token;
      token = token || data.data?.token;
      token = token || data.data?.authorization?.token;
      token = token || data.authorization?.token;
      token = token || data.access_token;
      token = token || data.data?.access_token;
      
      // SEMUA kemungkinan format user
      user = user || data.user;
      user = user || data.data?.user;
      
      console.log('🔍 Extracted values:');
      console.log('🔑 TOKEN:', token);
      console.log('👤 USER:', user);
      
      if (!token) {
        console.error('❌ TOKEN NOT FOUND!');
        console.error('📦 Response structure was:', data);
        console.error('🔍 Checked these paths:');
        console.error('  - response.data.token:', data.token);
        console.error('  - response.data.data.token:', data.data?.token);
        console.error('  - response.data.data.authorization.token:', data.data?.authorization?.token);
        console.error('  - response.data.authorization.token:', data.authorization?.token);
        console.error('  - response.data.access_token:', data.access_token);
        console.error('  - response.data.data.access_token:', data.data?.access_token);
        
        throw new Error('Token tidak ditemukan dalam response. Periksa console untuk melihat struktur response API.');
      }
      
      // PENTING: Simpan token ke localStorage
      localStorage.setItem('token', token);
      console.log('💾 Token saved to localStorage');
      console.log('✅ Verify saved token:', localStorage.getItem('token'));
      
      // PENTING: Set state dengan isAuthenticated = true
      set({ 
        user, 
        token, 
        isAuthenticated: true,
        isLoading: false,
        error: null 
      });
      
      console.log('✅ LOGIN SUCCESS!');
      console.log('✅ State updated:', get());
      
      return response.data;
      
    } catch (error) {
      console.error('❌ LOGIN ERROR:', error);
      console.error('❌ Error message:', error.message);
      console.error('❌ Error response:', error.response?.data);
      
      const errorMessage = error.response?.data?.message || error.message || 'Login gagal';
      set({ 
        error: errorMessage, 
        isLoading: false,
        isAuthenticated: false,
        user: null,
        token: null
      });
      
      throw error;
    }
  },

  register: async (registerData) => {
    set({ isLoading: true, error: null });
    try {
      console.log('📝 REGISTER START');
      const response = await api.post('/auth/register', registerData);
      console.log('📦 REGISTER RESPONSE:', JSON.stringify(response.data, null, 2));
      
      const data = response.data;
      
      // Extract token
      let token = data.token || data.data?.token || data.data?.authorization?.token || 
                  data.authorization?.token || data.access_token || data.data?.access_token;
      
      // Extract user
      let user = data.user || data.data?.user;
      
      console.log('🔑 TOKEN:', token);
      console.log('👤 USER:', user);
      
      if (!token) {
        throw new Error('Token tidak ditemukan dalam response');
      }
      
      localStorage.setItem('token', token);
      console.log('💾 Token saved after register');
      
      set({ 
        user, 
        token, 
        isAuthenticated: true,
        isLoading: false,
        error: null 
      });
      
      console.log('✅ REGISTER SUCCESS!');
      return response.data;
      
    } catch (error) {
      console.error('❌ REGISTER ERROR:', error);
      const errorMessage = error.response?.data?.message || error.message;
      set({ 
        error: errorMessage, 
        isLoading: false,
        isAuthenticated: false,
        user: null,
        token: null
      });
      throw error;
    }
  },

  logout: async () => {
    console.log('🚪 LOGOUT');
    localStorage.removeItem('token');
    set({ 
      user: null, 
      token: null, 
      isAuthenticated: false,
      error: null 
    });
    console.log('✅ Logged out successfully');
  },

  checkAuth: async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      set({ isAuthenticated: false, user: null, isLoading: false });
      return null;
    }

    set({ isLoading: true });
    try {
      // Set the auth token for this request
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      const response = await api.get('/auth/me');
      
      let user = response.data?.data || response.data;
      
      if (!user) {
        throw new Error('User data not found in response');
      }
      
      set({
        user,
        token,
        isAuthenticated: true,
        isLoading: false,
        error: null
      });
      
      return user;
      
    } catch (error) {
      console.error('Auth check failed:', error);
      
      // Clear invalid token
      localStorage.removeItem('token');
      delete api.defaults.headers.common['Authorization'];
      
      set({
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
        error: 'Session expired. Please login again.'
      });
      
      return null;
    }
  },
  
  forgotPassword: async (email) => {
    set({ isLoading: true, error: null });
    try {
      console.log('🔐 Sending forgot password request for email:', email);
      
      const response = await api.post('/auth/forgot-password', { email });
      
      console.log('✅ Forgot password response:', response.data);
      
      set({ 
        isLoading: false,
        error: null 
      });
      
      return response.data;
      
    } catch (error) {
      console.error('❌ Forgot password error:', error);
      
      const errorMessage = error.response?.data?.message || 
                         error.message || 
                         'Gagal mengirim link reset password. Silakan coba lagi.';
      
      set({ 
        error: errorMessage, 
        isLoading: false 
      });
      
      throw error;
    }
  },

  // ✨✨✨ TAMBAHKAN METHOD INI ✨✨✨
  resetPassword: async (data) => {
    set({ isLoading: true, error: null });
    try {
      console.log('🔐 Sending reset password request:', {
        token: data.token ? '✓ exists' : '✗ missing',
        email: data.email,
        password: data.password ? '✓ exists' : '✗ missing',
      });
      
      const response = await api.post('/auth/reset-password', {
        token: data.token,
        email: data.email,
        password: data.password,
        password_confirmation: data.password_confirmation
      });
      
      console.log('✅ Reset password response:', response.data);
      
      set({ 
        isLoading: false,
        error: null 
      });
      
      return response.data;
      
    } catch (error) {
      console.error('❌ Reset password error:', error);
      console.error('❌ Error response:', error.response?.data);
      
      const errorMessage = error.response?.data?.message || 
                         error.message || 
                         'Gagal reset password. Link mungkin sudah kadaluarsa.';
      
      set({ 
        error: errorMessage, 
        isLoading: false 
      });
      
      throw error;
    }
  },
  // ✨✨✨ END OF NEW METHOD ✨✨✨
}));

export default useAuthStore;