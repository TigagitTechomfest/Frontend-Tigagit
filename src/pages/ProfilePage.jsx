import { useState, useEffect, useRef } from 'react';
import { User, Mail, Edit2, LogOut, Save, X, Camera } from 'lucide-react';
import useUserStore from '../store/userStore';
import useAuthStore from '../store/authStore';

const ProfilePage = () => {
  const { 
    profile, 
    assessment, 
    fetchProfile, 
    updateProfile, 
    updateProfileImage, 
    updateWeight,
    isLoading 
  } = useUserStore();
  const { logout } = useAuthStore();
  
  const [isEditing, setIsEditing] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateError, setUpdateError] = useState('');
  const [updateSuccess, setUpdateSuccess] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [profileImagePreview, setProfileImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    weight: ''
  });

  const [originalData, setOriginalData] = useState({
    name: '',
    email: '',
    weight: ''
  });

  useEffect(() => {
    fetchProfile().catch(err => console.error('Fetch failed:', err));
  }, [fetchProfile]);

  useEffect(() => {
    if (profile || assessment) {
      const newFormData = {
        name: profile?.name || '',
        email: profile?.email || '',
        weight: assessment?.weight || ''
      };
      
      setFormData(newFormData);
      setOriginalData(newFormData);
      
      // Set profile image from API response
      console.log('🖼️ Setting profile image...');
      console.log('profile_image_url:', profile?.profile_image_url);
      console.log('profile_image:', profile?.profile_image);
      
      if (profile?.profile_image_url) {
        console.log('✅ Using profile_image_url:', profile.profile_image_url);
        setProfileImagePreview(profile.profile_image_url);
      } else if (profile?.profile_image) {
        // Extract filename dari path
        const filename = profile.profile_image.includes('/') 
          ? profile.profile_image.split('/').pop() 
          : profile.profile_image;
        
        // Pakai API endpoint untuk serve image (fix untuk Windows symlink issues)
        const apiUrl = `http://127.0.0.1:8000/api/profile-image/${filename}`;
        
        console.log('✅ Using API URL:', apiUrl);
        setProfileImagePreview(apiUrl);
      } else {
        console.log('⚠️ No profile image found');
        setProfileImagePreview(null);
      }
    }
  }, [profile, assessment]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        setUpdateError('File harus berupa gambar');
        return;
      }
      
      if (file.size > 5 * 1024 * 1024) {
        setUpdateError('Ukuran file maksimal 5MB');
        return;
      }
      
      setProfileImage(file);
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
      
      setUpdateError('');
    }
  };

  const handleImageClick = () => {
    if (isEditing) {
      fileInputRef.current?.click();
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setUpdateError('');
    setUpdateSuccess('');
  };

  const handleSubmit = async () => {
    setIsUpdating(true);
    setUpdateError('');
    setUpdateSuccess('');
    
    const weightValue = parseFloat(formData.weight);
    if (isNaN(weightValue) || weightValue <= 0) {
      setUpdateError('Berat badan harus berupa angka positif');
      setIsUpdating(false);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setUpdateError('Format email tidak valid');
      setIsUpdating(false);
      return;
    }

    if (formData.name.trim().length < 2) {
      setUpdateError('Nama harus minimal 2 karakter');
      setIsUpdating(false);
      return;
    }

    const hasNameChanged = formData.name !== originalData.name;
    const hasEmailChanged = formData.email !== originalData.email;
    const hasWeightChanged = formData.weight !== originalData.weight;
    const hasImageChanged = profileImage !== null;

    try {
      let successMessages = [];
      let errorMessages = [];

      // Update profile (name & email)
      if (hasNameChanged || hasEmailChanged) {
        try {
          await updateProfile({
            name: formData.name,
            email: formData.email
          });
          if (hasNameChanged) successMessages.push('✓ Nama');
          if (hasEmailChanged) successMessages.push('✓ Email');
        } catch (err) {
          errorMessages.push('✗ Profil gagal diperbarui');
        }
      }

      // Update profile image
      if (hasImageChanged) {
        try {
          // Pass name & email juga supaya backend validation pass
          const result = await updateProfileImage(profileImage, {
            name: formData.name,
            email: formData.email
          });
          successMessages.push('✓ Foto profil');
          
          // Update preview dengan URL baru dari server
          if (result.profile?.profile_image_url) {
            setProfileImagePreview(result.profile.profile_image_url);
          }
        } catch (err) {
          console.error('Image upload error:', err);
          errorMessages.push('✗ Foto profil gagal diperbarui');
        }
      }

      // Update weight
      if (hasWeightChanged) {
        try {
          await updateWeight(weightValue);
          successMessages.push('✓ Berat badan');
        } catch (err) {
          errorMessages.push('✗ Berat badan gagal diperbarui');
        }
      }

      // Refresh profile data to get latest from server
      await fetchProfile();

      // Show results
      if (successMessages.length > 0 && errorMessages.length === 0) {
        setUpdateSuccess(`Berhasil diperbarui: ${successMessages.join(', ')}`);
        setIsEditing(false);
        setOriginalData(formData);
        setProfileImage(null);
        setTimeout(() => setUpdateSuccess(''), 4000);
      } else if (successMessages.length > 0 && errorMessages.length > 0) {
        setUpdateSuccess(`Berhasil: ${successMessages.join(', ')}`);
        setUpdateError(`Gagal: ${errorMessages.join(', ')}`);
        setTimeout(() => {
          setUpdateSuccess('');
          setUpdateError('');
        }, 5000);
      } else if (errorMessages.length > 0) {
        setUpdateError(`Gagal memperbarui: ${errorMessages.join(', ')}`);
      } else {
        setUpdateError('Tidak ada perubahan yang disimpan');
      }

    } catch (error) {
      console.error('Update error:', error);
      setUpdateError('Terjadi kesalahan saat memperbarui data');
    } finally {
      setIsUpdating(false);
    }
  };

  const handleCancel = () => {
    setFormData(originalData);
    setProfileImage(null);
    
    // Reset preview ke foto asli dari server
    if (profile?.profile_image_url) {
      setProfileImagePreview(profile.profile_image_url);
    } else if (profile?.profile_image) {
      // Extract filename dan pakai API URL (sama seperti di useEffect)
      const filename = profile.profile_image.includes('/') 
        ? profile.profile_image.split('/').pop() 
        : profile.profile_image;
      const apiUrl = `http://127.0.0.1:8000/api/profile-image/${filename}`;
      setProfileImagePreview(apiUrl);
    } else {
      setProfileImagePreview(null);
    }
    
    setIsEditing(false);
    setUpdateError('');
    setUpdateSuccess('');
  };

  const handleLogout = () => {
    if (window.confirm('Yakin ingin keluar?')) {
      logout();
      window.location.href = '/login';
    }
  };

  const calculateBMI = () => {
    if (assessment?.height && assessment?.weight) {
      const heightInM = assessment.height / 100;
      return (assessment.weight / (heightInM * heightInM)).toFixed(2);
    }
    return assessment?.bmi?.toFixed(2) || '0';
  };

  const getBMICategory = (bmi) => {
    const bmiValue = parseFloat(bmi);
    if (bmiValue < 18.5) return { text: 'Kurus', color: 'text-blue-600', bg: 'bg-blue-100' };
    if (bmiValue < 25) return { text: 'Normal', color: 'text-green-600', bg: 'bg-green-100' };
    if (bmiValue < 30) return { text: 'Berlebih', color: 'text-yellow-600', bg: 'bg-yellow-100' };
    return { text: 'Obesitas', color: 'text-red-600', bg: 'bg-red-100' };
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-green-400 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-xl text-gray-700">Memuat data...</p>
        </div>
      </div>
    );
  }

  const bmi = calculateBMI();
  const bmiCategory = getBMICategory(bmi);

  return (
    <div className="min-h-screen p-6 pt-24">
      <div className="max-w-6xl mx-auto mt-8">
        
        {updateSuccess && (
          <div className="mb-6 p-4 bg-green-100 border-2 border-green-400 text-green-700 rounded-2xl flex items-center gap-3 animate-pulse">
            <svg className="w-6 h-6 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{updateSuccess}</span>
          </div>
        )}
        
        {updateError && (
          <div className="mb-6 p-4 bg-red-100 border-2 border-red-400 text-red-700 rounded-2xl flex items-center gap-3">
            <svg className="w-6 h-6 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{updateError}</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                <User className="w-6 h-6" />
                Profil Pengguna
              </h2>

              <div className="flex flex-col items-center justify-center text-center mb-8">
                <div className="relative group">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                  
                  <div 
                    onClick={handleImageClick}
                    className={`w-40 h-40 rounded-full flex items-center justify-center text-white text-5xl font-bold mb-4 shadow-2xl border-4 border-white overflow-hidden ${
                      isEditing ? 'cursor-pointer transform hover:scale-105 transition-transform' : ''
                    } ${
                      profileImagePreview 
                        ? 'bg-gray-200' 
                        : 'bg-gradient-to-br from-green-400 to-green-600'
                    }`}
                  >
                    {profileImagePreview ? (
                      <img 
                        src={profileImagePreview} 
                        alt="Profile" 
                        className="w-full h-full object-cover"
                        onLoad={() => {
                          console.log('✅ Image loaded successfully:', profileImagePreview);
                        }}
                        onError={(e) => {
                          console.error('❌ Image load error!');
                          console.error('Failed URL:', profileImagePreview);
                          console.error('Image element:', e.target);
                          // Hide broken image dan tampilkan initial
                          e.target.style.display = 'none';
                        }}
                      />
                    ) : (
                      <span>{formData.name?.charAt(0).toUpperCase() || 'U'}</span>
                    )}
                    
                    {isEditing && (
                      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-full">
                        <div className="text-center">
                          <Camera className="w-10 h-10 text-white mx-auto mb-2" />
                          <p className="text-white text-sm font-medium">Ganti Foto</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">
                    {formData.name || 'User'}
                  </h3>
                  <p className="text-gray-600 text-lg">
                    {formData.email || 'email@example.com'}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nama Pengguna:
                  </label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className={`w-full pl-12 pr-4 py-3 rounded-2xl border-2 text-lg transition-all ${
                        isEditing 
                          ? 'bg-white border-green-400 focus:outline-none focus:ring-2 focus:ring-green-400' 
                          : 'bg-gray-100 border-gray-300 cursor-not-allowed'
                      }`}
                      placeholder="Masukkan nama"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email:
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className={`w-full pl-12 pr-4 py-3 rounded-2xl border-2 text-lg transition-all ${
                        isEditing 
                          ? 'bg-white border-green-400 focus:outline-none focus:ring-2 focus:ring-green-400' 
                          : 'bg-gray-100 border-gray-300 cursor-not-allowed'
                      }`}
                      placeholder="email@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Berat Badan (kg):
                  </label>
                  <input
                    type="number"
                    name="weight"
                    value={formData.weight}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className={`w-full px-4 py-3 rounded-2xl border-2 text-lg transition-all ${
                      isEditing 
                        ? 'bg-white border-green-400 focus:outline-none focus:ring-2 focus:ring-green-400' 
                        : 'bg-gray-100 border-gray-300 cursor-not-allowed'
                    }`}
                    step="0.1"
                    min="1"
                    placeholder="Masukkan berat badan"
                  />
                </div>

                {isEditing && (
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl text-sm text-blue-700">
                    <p className="flex items-start gap-2">
                      <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>
                        <strong>Tips:</strong> Klik foto profil untuk mengganti. Ukuran max 5MB. Format: JPG, PNG, GIF.
                      </span>
                    </p>
                  </div>
                )}

                <div className="flex gap-4 pt-4">
                  {isEditing ? (
                    <>
                      <button
                        type="button"
                        onClick={handleSubmit}
                        disabled={isUpdating}
                        className="flex-1 py-3 bg-green-500 text-white font-medium rounded-2xl hover:bg-green-600 transition-all duration-200 text-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
                      >
                        {isUpdating ? (
                          <>
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            Menyimpan...
                          </>
                        ) : (
                          <>
                            <Save className="w-5 h-5" />
                            Simpan Perubahan
                          </>
                        )}
                      </button>
                      <button
                        type="button"
                        onClick={handleCancel}
                        disabled={isUpdating}
                        className="flex-1 py-3 bg-gray-500 text-white font-medium rounded-2xl hover:bg-gray-600 transition-all duration-200 text-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
                      >
                        <X className="w-5 h-5" />
                        Batal
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        type="button"
                        onClick={() => setIsEditing(true)}
                        className="flex-1 py-3 bg-amber-400 text-white font-medium rounded-2xl hover:bg-amber-500 transition-all duration-200 text-lg flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
                      >
                        <Edit2 className="w-5 h-5" />
                        Edit Profil
                      </button>
                      <button
                        type="button"
                        onClick={handleLogout}
                        className="flex-1 py-3 bg-red-500 text-white font-medium rounded-2xl hover:bg-red-600 transition-all duration-200 text-lg flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
                      >
                        <LogOut className="w-5 h-5" />
                        Keluar
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Data Kesehatan
            </h2>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white rounded-2xl p-6 text-center border-2 border-gray-200 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <User className="w-6 h-6 text-green-600" />
                </div>
                <p className="text-sm text-gray-600 mb-1">Usia</p>
                <p className="text-3xl font-bold text-gray-800">{assessment?.age || 0}</p>
                <p className="text-xs text-gray-500">Tahun</p>
              </div>

              <div className="bg-white rounded-2xl p-6 text-center border-2 border-gray-200 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-pink-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <p className="text-sm text-gray-600 mb-1">Jenis Kelamin</p>
                <p className="text-xl font-bold text-gray-800">
                  {assessment?.gender === 'female' ? 'Perempuan' : 'Laki-laki'}
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 text-center border-2 border-gray-200 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                  </svg>
                </div>
                <p className="text-sm text-gray-600 mb-1">Tinggi Badan</p>
                <p className="text-3xl font-bold text-gray-800">{assessment?.height || 0}</p>
                <p className="text-xs text-gray-500">Cm</p>
              </div>

              <div className="bg-white rounded-2xl p-6 text-center border-2 border-gray-200 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <User className="w-6 h-6 text-purple-600" />
                </div>
                <p className="text-sm text-gray-600 mb-1">Berat Badan</p>
                <p className="text-3xl font-bold text-gray-800">{assessment?.weight || 0}</p>
                <p className="text-xs text-gray-500">Kg</p>
              </div>
            </div>

            <div className={`bg-white rounded-2xl p-8 text-center border-2 ${bmiCategory.bg} border-gray-200 hover:shadow-lg transition-shadow`}>
              <div className={`w-16 h-16 ${bmiCategory.bg} rounded-full flex items-center justify-center mx-auto mb-4`}>
                <svg className={`w-8 h-8 ${bmiCategory.color}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <p className="text-sm text-gray-600 mb-2">Skor BMI</p>
              <p className="text-5xl font-bold text-gray-800 mb-2">{bmi}</p>
              <p className={`text-lg font-semibold ${bmiCategory.color} mb-2`}>{bmiCategory.text}</p>
              <p className="text-xs text-gray-500">
                {parseFloat(bmi) < 18.5 ? 'Disarankan menambah berat badan' :
                 parseFloat(bmi) < 25 ? 'Berat badan ideal, pertahankan!' :
                 parseFloat(bmi) < 30 ? 'Disarankan menurunkan berat badan' :
                 'Konsultasi dengan dokter dianjurkan'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;