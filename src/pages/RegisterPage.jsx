import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import Button from '../components/common/Button';
import Input from '../components/common/Input';

const RegisterPage = () => {
  const navigate = useNavigate();
  const { register, isAuthenticated, isLoading, error } = useAuthStore();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [validationError, setValidationError] = useState('');

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setValidationError('');

    if (formData.password !== formData.confirmPassword) {
      setValidationError('Password dan konfirmasi password tidak cocok');
      return;
    }

    if (formData.password.length < 6) {
      setValidationError('Password minimal 6 karakter');
      return;
    }

    const registerData = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
    };

    await register(registerData);
    if (!error) {
      navigate('/login');
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8 pt-24">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Daftar Akun Baru
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Sudah punya akun?{' '}
            <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
              Masuk di sini
            </Link>
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {(error || validationError) && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              {error || validationError}
            </div>
          )}
          <div className="space-y-4">
            <Input
              label="Nama Lengkap"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Nama lengkap Anda"
              required
            />
            <Input
              label="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="nama@email.com"
              required
            />
            <Input
              label="Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Minimal 6 karakter"
              required
            />
            <Input
              label="Konfirmasi Password"
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Ulangi password"
              required
            />
          </div>

          <div>
            <Button
              type="submit"
              variant="primary"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? 'Mendaftar...' : 'Daftar'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
