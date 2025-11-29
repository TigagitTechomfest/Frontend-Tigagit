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
      
      // Fetch keduanya secara parallel
      const [profileRes, assessmentRes] = await Promise.all([
        api.get('/auth/me'),
        api.get('/assessment')
      ]);
      
      console.log('✅ Profile response:', profileRes.data);
      console.log('✅ Assessment response:', assessmentRes.data);
      
      // PERBAIKAN: Akses data.data untuk assessment
      const profileData = profileRes.data.data || profileRes.data;
      const assessmentData = assessmentRes.data.data || assessmentRes.data;
      
      console.log('📦 Extracted profile:', profileData);
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
  
  // Update user profile data
  updateProfile: async (data) => {
    set({ isLoading: true, error: null });
    try {
      console.log('🔄 Updating profile with data:', data);
      
      // Update profile
      const profileResponse = await api.put('/profile', {
        name: data.name,
        email: data.email
      });
      
      // Update assessment
      const assessmentResponse = await api.put('/assessment', {
        age: data.age,
        gender: data.gender,
        height: data.height,
        weight: data.weight,
        activity_level: data.activity_level,
        health_goal: data.health_goal,
        dietary_preference: data.dietary_preference
      });
      
      console.log('✅ Profile updated:', profileResponse.data);
      console.log('✅ Assessment updated:', assessmentResponse.data);
      
      const updatedProfile = profileResponse.data.data || profileResponse.data;
      const updatedAssessment = assessmentResponse.data.data || assessmentResponse.data;
      
      set({ 
        profile: updatedProfile,
        assessment: updatedAssessment,
        isLoading: false,
        error: null
      });
      
      return { profile: updatedProfile, assessment: updatedAssessment };
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