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
    
    console.log('🔍 CHECK AUTH');
    console.log('🔑 Token:', token ? 'EXISTS' : 'NOT FOUND');
    
    if (!token) {
      console.log('❌ No token - setting isAuthenticated = false');
      set({ 
        isAuthenticated: false, 
        user: null, 
        token: null 
      });
      return false;
    }

    try {
      console.log('📡 Verifying token with /auth/me...');
      const response = await api.get('/auth/me');
      console.log('✅ Token is valid');
      console.log('👤 User data:', response.data);
      
      const user = response.data?.data || response.data?.user;
      
      set({ 
        user, 
        token, 
        isAuthenticated: true 
      });
      
      console.log('✅ isAuthenticated set to TRUE');
      return true;
      
    } catch (error) {
      console.error('❌ Token verification FAILED');
      console.error('Error:', error.response?.data);
      
      // Token invalid/expired - hapus dan logout
      localStorage.removeItem('token');
      set({ 
        user: null, 
        token: null, 
        isAuthenticated: false 
      });
      
      console.log('🗑 Invalid token removed');
      return false; 
    }
  },
}));

export default useAuthStore;