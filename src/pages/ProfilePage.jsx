import { useState, useEffect } from 'react';
import { User, Mail, Edit2, LogOut } from 'lucide-react';
import useUserStore from '../store/userStore';
import useAuthStore from '../store/authStore';

const ProfilePage = () => {
  const { profile, assessment, fetchProfile, updateProfile, isLoading, error } = useUserStore();
  const { user, logout } = useAuthStore();
  
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    height: '',
    weight: '',
    age: '',
    gender: 'male',
  });

  useEffect(() => {
    fetchProfile()
      .then(data => {
        console.log('Fetch successful:', data);
      })
      .catch(err => {
        console.error('Fetch failed:', err);
      });
  }, [fetchProfile]);

  useEffect(() => {
    if (profile || assessment) {
      const newFormData = {
        name: profile?.name || user?.name || '',
        email: profile?.email || user?.email || '',
        height: assessment?.height || '',
        weight: assessment?.weight || '',
        age: assessment?.age || '',
        gender: assessment?.gender || 'male',
      };
      
      setFormData(newFormData);
    }
  }, [profile, assessment, user]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updateData = {
      ...formData,
      height: parseFloat(formData.height),
      weight: parseFloat(formData.weight),
      age: parseInt(formData.age),
    };
    
    try {
      await updateProfile(updateData);
      setIsEditing(false);
    } catch (error) {
      console.error('Update error:', error);
    }
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
      const calculatedBMI = (assessment.weight / (heightInM * heightInM)).toFixed(2);
      return calculatedBMI;
    }
    return assessment?.bmi?.toFixed(2) || '0';
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#DFFAEB] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-green-400 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-xl text-gray-700">Memuat data...</p>
        </div>
      </div>
    );
  }

  const bmi = calculateBMI();

  return (
    <div className="min-h-screen bg-[#DFFAEB] p-6 pt-32">
      <div className="max-w-6xl mx-auto">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                <User className="w-6 h-6" />
                Profil Pengguna
              </h2>

              <div className="flex flex-col items-center justify-center text-center mb-8">
                <div className="w-24 h-24 rounded-full bg-green-500 flex items-center justify-center text-white text-3xl font-bold mb-4">
                  {profile?.name?.charAt(0).toUpperCase() || user?.name?.charAt(0).toUpperCase() || 'U'}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">
                    {profile?.name || user?.name || 'User'}
                  </h3>
                  <p className="text-gray-600 text-lg">
                    {profile?.email || user?.email || 'email@example.com'}
                  </p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
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
                        className="w-full pl-12 pr-4 py-3 bg-transparent rounded-2xl border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 disabled:opacity-70 text-lg transition-all"
                        required
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
                        disabled={true}
                        className="w-full pl-12 pr-4 py-3 bg-transparent rounded-2xl border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 disabled:opacity-70 text-lg transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Tinggi (cm):
                      </label>
                      <input
                        type="number"
                        name="height"
                        value={formData.height}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className="w-full px-4 py-3 bg-transparent rounded-2xl border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 disabled:opacity-70 text-lg transition-all"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Berat (kg):
                      </label>
                      <input
                        type="number"
                        name="weight"
                        value={formData.weight}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className="w-full px-4 py-3 bg-transparent rounded-2xl border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 disabled:opacity-70 text-lg transition-all"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Usia:
                      </label>
                      <input
                        type="number"
                        name="age"
                        value={formData.age}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className="w-full px-4 py-3 bg-transparent rounded-2xl border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 disabled:opacity-70 text-lg transition-all"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Jenis Kelamin:
                      </label>
                      <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className="w-full px-4 py-3 bg-transparent rounded-2xl border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 disabled:opacity-70 text-lg transition-all"
                      >
                        <option value="male">Laki-laki</option>
                        <option value="female">Perempuan</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  {isEditing ? (
                    <>
                      <button
                        type="submit"
                        disabled={isLoading}
                        className="flex-1 py-3 bg-green-500 text-white font-medium rounded-2xl hover:bg-green-600 transition-all duration-200 disabled:opacity-50 text-lg flex items-center justify-center gap-2"
                      >
                        {isLoading ? 'Menyimpan...' : 'Simpan Perubahan'}
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsEditing(false)}
                        className="flex-1 py-3 bg-gray-500 text-white font-medium rounded-2xl hover:bg-gray-600 transition-all duration-200 text-lg"
                      >
                        Batal
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        type="button"
                        onClick={() => setIsEditing(true)}
                        className="flex-1 py-3 bg-amber-400 text-white font-medium rounded-2xl hover:bg-amber-500 transition-all duration-200 text-lg flex items-center justify-center gap-2"
                      >
                        <Edit2 className="w-5 h-5" />
                        Perbarui Profil
                      </button>
                      <button
                        onClick={handleLogout}
                        className="flex-1 py-3 bg-red-500 text-white font-medium rounded-2xl hover:bg-red-600 transition-all duration-200 text-lg flex items-center justify-center gap-2"
                      >
                        <LogOut className="w-5 h-5" />
                        Keluar
                      </button>
                    </>
                  )}
                </div>
              </form>
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Data BMI
            </h2>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white rounded-2xl p-6 text-center border-2 border-gray-200">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <User className="w-6 h-6 text-green-600" />
                </div>
                <p className="text-sm text-gray-600 mb-1">Usia</p>
                <p className="text-3xl font-bold text-gray-800">{assessment?.age || 0}</p>
                <p className="text-xs text-gray-500">Tahun</p>
              </div>

              <div className="bg-white rounded-2xl p-6 text-center border-2 border-gray-200">
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

              <div className="bg-white rounded-2xl p-6 text-center border-2 border-gray-200">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                  </svg>
                </div>
                <p className="text-sm text-gray-600 mb-1">Tinggi Badan</p>
                <p className="text-3xl font-bold text-gray-800">{assessment?.height || 0}</p>
                <p className="text-xs text-gray-500">Cm</p>
              </div>

              <div className="bg-white rounded-2xl p-6 text-center border-2 border-gray-200">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <User className="w-6 h-6 text-purple-600" />
                </div>
                <p className="text-sm text-gray-600 mb-1">Berat</p>
                <p className="text-3xl font-bold text-gray-800">{assessment?.weight || 0}</p>
                <p className="text-xs text-gray-500">Kg</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 text-center border-2 border-gray-200">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <p className="text-sm text-gray-600 mb-2">Skor BMI</p>
              <p className="text-5xl font-bold text-gray-800 mb-2">{bmi}</p>
              <p className="text-sm text-gray-600">BMI</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;