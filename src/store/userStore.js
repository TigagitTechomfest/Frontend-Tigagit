import { create } from 'zustand';
import api from '../services/api';

const useUserStore = create((set) => ({
  profile: null,
  assessment: null,
  isLoading: false,
  error: null,
  
  // Fetch user profile data
  fetchProfile: async () => {
    set({ isLoading: true, error: null });
    try {
      console.log('🔄 Fetching profile and assessment data...');
      
      const [profileRes, assessmentRes] = await Promise.all([
        api.get('/auth/me'),
        api.get('/assessment')
      ]);
      
      console.log('✅ Profile response:', profileRes);
      console.log('✅ Profile data:', profileRes.data);
      console.log('✅ Assessment response:', assessmentRes);
      console.log('✅ Assessment data:', assessmentRes.data);
      
      const profileData = profileRes.data.data || profileRes.data;
      const assessmentData = assessmentRes.data.data || assessmentRes.data;
      
      console.log('📦 Extracted profile:', profileData);
      console.log('🖼️ Profile image URL:', profileData?.profile_image_url);
      console.log('🖼️ Profile image path:', profileData?.profile_image);
      console.log('📦 Extracted assessment:', assessmentData);
      
      set({ 
        profile: profileData,
        assessment: assessmentData,
        isLoading: false,
        error: null
      });
      
      return { profile: profileData, assessment: assessmentData };
    } catch (error) {
      console.error('❌ Error fetching profile data:', error);
      console.error('❌ Error response:', error.response?.data);
      
      const errorMessage = error.response?.data?.message || error.message || 'Failed to fetch data';
      
      set({ 
        error: errorMessage, 
        isLoading: false 
      });
      
      throw error;
    }
  },
  
  // Update user profile (name & email)
  updateProfile: async (data) => {
    set({ isLoading: true, error: null });
    try {
      console.log('🔄 Updating profile with data:', data);
      
      const profileResponse = await api.post('/auth/profile', {
        name: data.name,
        email: data.email
      });
      
      console.log('✅ Profile updated:', profileResponse.data);
      
      const updatedProfile = profileResponse.data.data || profileResponse.data;
      
      set({ 
        profile: updatedProfile,
        isLoading: false,
        error: null
      });
      
      return { profile: updatedProfile };
    } catch (error) {
      console.error('❌ Error updating profile:', error);
      console.error('❌ Error response:', error.response?.data);
      
      const errorMessage = error.response?.data?.message || error.message || 'Failed to update profile';
      
      set({ 
        error: errorMessage, 
        isLoading: false 
      });
      
      throw error;
    }
  },
  
  // Upload profile image
  updateProfileImage: async (imageFile, userData = {}) => {
    set({ isLoading: true, error: null });
    try {
      console.log('🔄 Uploading profile image...');
      console.log('📁 File info:', {
        name: imageFile.name,
        size: imageFile.size,
        type: imageFile.type
      });
      
      const formData = new FormData();
      formData.append('profile_image', imageFile);
      
      // Tambahkan name & email juga supaya pass validation
      if (userData.name) formData.append('name', userData.name);
      if (userData.email) formData.append('email', userData.email);
      
      // Debug: Log FormData contents
      console.log('📦 FormData entries:');
      for (let pair of formData.entries()) {
        console.log(pair[0], pair[1]);
      }
      
      console.log('🌐 Making request to: /auth/profile');
      
      // PENTING: Jangan set Content-Type header, biar axios handle otomatis
      const imageResponse = await api.post('/auth/profile', formData);
      
      console.log('✅ Image uploaded successfully!');
      console.log('📥 Full response:', imageResponse);
      console.log('📥 Response status:', imageResponse.status);
      console.log('📥 Response data:', imageResponse.data);
      
      const updatedProfile = imageResponse.data.data || imageResponse.data;
      
      console.log('👤 Updated profile:', updatedProfile);
      console.log('🖼️ New image URL:', updatedProfile?.profile_image_url);
      
      set({ 
        profile: updatedProfile,
        isLoading: false,
        error: null
      });
      
      return { profile: updatedProfile };
    } catch (error) {
      console.error('❌ ========== UPLOAD ERROR ==========');
      console.error('❌ Error object:', error);
      console.error('❌ Error message:', error.message);
      console.error('❌ Error response:', error.response);
      console.error('❌ Response status:', error.response?.status);
      console.error('❌ Response data:', error.response?.data);
      console.error('❌ Response data message:', error.response?.data?.message);
      console.error('❌ Response data error:', error.response?.data?.error);
      console.error('❌ Response data errors:', error.response?.data?.errors);
      console.error('❌ Response headers:', error.response?.headers);
      console.error('❌ Request config:', error.config);
      console.error('❌ ===================================');
      
      const errorMessage = error.response?.data?.message || error.response?.data?.error || error.message || 'Failed to upload image';
      
      set({ 
        error: errorMessage, 
        isLoading: false 
      });
      
      throw error;
    }
  },
  
  // Update weight
  updateWeight: async (weight) => {
    set({ isLoading: true, error: null });
    try {
      console.log('🔄 Updating weight:', weight);
      
      const weightResponse = await api.post('/assessment/weight', { 
        weight: parseFloat(weight) 
      });
      
      console.log('✅ Weight updated:', weightResponse.data);
      
      const updatedAssessment = weightResponse.data.data || weightResponse.data;
      
      set({ 
        assessment: updatedAssessment,
        isLoading: false,
        error: null
      });
      
      return { assessment: updatedAssessment };
    } catch (error) {
      console.error('❌ Error updating weight:', error);
      console.error('❌ Error response:', error.response?.data);
      
      const errorMessage = error.response?.data?.message || error.message || 'Failed to update weight';
      
      set({ 
        error: errorMessage, 
        isLoading: false 
      });
      
      throw error;
    }
  },
  
  clearProfile: () => {
    set({ 
      profile: null, 
      assessment: null, 
      error: null,
      isLoading: false
    });
  }
}));

export default useUserStore;