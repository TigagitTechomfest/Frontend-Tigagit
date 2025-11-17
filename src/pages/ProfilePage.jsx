import { useState, useEffect } from 'react';
import useUserStore from '../store/userStore';
import useAuthStore from '../store/authStore';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Input from '../components/common/Input';

const ProfilePage = () => {
  const { profile, fetchProfile, updateProfile, isLoading } = useUserStore();
  const { user, logout } = useAuthStore();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    height: '',
    weight: '',
    age: '',
    gender: 'male',
    targetCalories: '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    fetchProfile();
  }, []);

  useEffect(() => {
    if (profile) {
      setFormData({
        name: profile.name || user?.name || '',
        email: profile.email || user?.email || '',
        height: profile.height || '',
        weight: profile.weight || '',
        age: profile.age || '',
        gender: profile.gender || 'male',
        targetCalories: profile.targetCalories || '2000',
      });
    }
  }, [profile, user]);

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
      targetCalories: parseInt(formData.targetCalories),
    };
    await updateProfile(updateData);
    setSuccessMessage('Profil berhasil diperbarui!');
    setIsEditing(false);
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const handleLogout = () => {
    if (window.confirm('Yakin ingin keluar?')) {
      logout();
      window.location.href = '/login';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6 pt-24">
      <div className="max-w-4xl mx-auto w-full">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Profil Pengguna</h1>
          <p className="text-gray-600 mt-1">Kelola informasi profil Anda</p>
        </div>

        {successMessage && (
          <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
            {successMessage}
          </div>
        )}

        <Card title="Informasi Pribadi">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Nama Lengkap"
                name="name"
                value={formData.name}
                onChange={handleChange}
                disabled={!isEditing}
                required
              />
              <Input
                label="Email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                disabled={!isEditing}
                required
              />
              <Input
                label="Tinggi Badan (cm)"
                type="number"
                name="height"
                value={formData.height}
                onChange={handleChange}
                disabled={!isEditing}
                placeholder="170"
                required
              />
              <Input
                label="Berat Badan (kg)"
                type="number"
                name="weight"
                value={formData.weight}
                onChange={handleChange}
                disabled={!isEditing}
                placeholder="70"
                required
              />
              <Input
                label="Usia"
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                disabled={!isEditing}
                placeholder="25"
                required
              />
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Jenis Kelamin
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                  required
                >
                  <option value="male">Laki-laki</option>
                  <option value="female">Perempuan</option>
                </select>
              </div>
            </div>

            <div className="mt-4">
              <Input
                label="Target Kalori Harian (kkal)"
                type="number"
                name="targetCalories"
                value={formData.targetCalories}
                onChange={handleChange}
                disabled={!isEditing}
                placeholder="2000"
                required
              />
            </div>

            <div className="mt-6 flex gap-4">
              {isEditing ? (
                <>
                  <Button type="submit" variant="primary" disabled={isLoading}>
                    {isLoading ? 'Menyimpan...' : 'Simpan Perubahan'}
                  </Button>
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() => {
                      setIsEditing(false);
                      if (profile) {
                        setFormData({
                          name: profile.name || '',
                          email: profile.email || '',
                          height: profile.height || '',
                          weight: profile.weight || '',
                          age: profile.age || '',
                          gender: profile.gender || 'male',
                          targetCalories: profile.targetCalories || '2000',
                        });
                      }
                    }}
                  >
                    Batal
                  </Button>
                </>
              ) : (
                <Button
                  type="button"
                  variant="primary"
                  onClick={() => setIsEditing(true)}
                >
                  Edit Profil
                </Button>
              )}
            </div>
          </form>
        </Card>

        {/* Account Actions */}
        <Card title="Pengaturan Akun" className="mt-6">
          <div className="space-y-4">
            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-sm text-yellow-800">
                <strong>Perhatian:</strong> Tindakan ini akan mengeluarkan Anda dari aplikasi.
              </p>
            </div>
            <Button variant="danger" onClick={handleLogout}>
              Keluar dari Akun
            </Button>
          </div>
        </Card>

        {/* Profile Summary */}
        {profile && (
          <Card title="Ringkasan Profil" className="mt-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-gray-600">BMI</p>
                <p className="text-2xl font-bold text-blue-600">
                  {profile.height && profile.weight
                    ? (profile.weight / Math.pow(profile.height / 100, 2)).toFixed(1)
                    : '-'}
                </p>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <p className="text-sm text-gray-600">Tinggi</p>
                <p className="text-2xl font-bold text-green-600">
                  {profile.height || '-'} cm
                </p>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <p className="text-sm text-gray-600">Berat</p>
                <p className="text-2xl font-bold text-purple-600">
                  {profile.weight || '-'} kg
                </p>
              </div>
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <p className="text-sm text-gray-600">Target</p>
                <p className="text-2xl font-bold text-orange-600">
                  {profile.targetCalories || '-'} kkal
                </p>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
