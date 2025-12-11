import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiLock, FiEye, FiEyeOff, FiCheckCircle, FiX, FiAlertCircle } from 'react-icons/fi';
import useAuthStore from '../store/authStore';

const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { resetPassword } = useAuthStore();
  
  // Ambil token dan email dari URL (?token=xxx&email=xxx)
  const token = searchParams.get('token');
  const email = searchParams.get('email');
  
  const [formData, setFormData] = useState({
    password: '',
    password_confirmation: ''
  });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Cek apakah token & email ada saat halaman load
  useEffect(() => {
    if (!token || !email) {
      setError('Link reset password tidak valid atau sudah kadaluarsa');
    }
  }, [token, email]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    // Validasi
    if (!formData.password || !formData.password_confirmation) {
      setError('Password harus diisi');
      return;
    }
    
    if (formData.password.length < 8) {
      setError('Password minimal 8 karakter');
      return;
    }
    
    if (formData.password !== formData.password_confirmation) {
      setError('Password tidak cocok');
      return;
    }
    
    if (!token || !email) {
      setError('Link reset password tidak valid');
      return;
    }
    
    try {
      setIsSubmitting(true);
      
      await resetPassword({
        token,
        email,
        password: formData.password,
        password_confirmation: formData.password_confirmation
      });
      
      setIsSuccess(true);
      setError('');
      
      // Auto redirect ke login setelah 3 detik
      setTimeout(() => {
        navigate('/login');
      }, 3000);
      
    } catch (err) {
      console.error('Reset password error:', err);
      const errorMsg = err.response?.data?.message || err.message || 'Gagal reset password. Link mungkin sudah kadaluarsa.';
      setError(errorMsg);
      setIsSuccess(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-white p-4 md:p-8 relative overflow-hidden">
      {/* Animated Background Waves - sama kayak LoginPage */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <svg 
          className="absolute w-full h-full" 
          viewBox="0 0 1440 800" 
          preserveAspectRatio="none"
        >
          <motion.path
            d="M0,400 Q360,320 720,400 T1440,400 L1440,800 L0,800 Z"
            fill="#DEEDE0"
            animate={{
              d: [
                "M0,400 Q360,320 720,400 T1440,400 L1440,800 L0,800 Z",
                "M0,400 Q360,480 720,400 T1440,400 L1440,800 L0,800 Z",
                "M0,400 Q360,320 720,400 T1440,400 L1440,800 L0,800 Z"
              ]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          <motion.path
            d="M0,450 Q360,370 720,450 T1440,450 L1440,800 L0,800 Z"
            fill="#DFFAEB"
            animate={{
              d: [
                "M0,450 Q360,370 720,450 T1440,450 L1440,800 L0,800 Z",
                "M0,450 Q360,530 720,450 T1440,450 L1440,800 L0,800 Z",
                "M0,450 Q360,370 720,450 T1440,450 L1440,800 L0,800 Z"
              ]
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          <motion.path
            d="M0,500 Q360,420 720,500 T1440,500 L1440,800 L0,800 Z"
            fill="rgba(34, 197, 94, 0.08)"
            animate={{
              d: [
                "M0,500 Q360,420 720,500 T1440,500 L1440,800 L0,800 Z",
                "M0,500 Q360,580 720,500 T1440,500 L1440,800 L0,800 Z",
                "M0,500 Q360,420 720,500 T1440,500 L1440,800 L0,800 Z"
              ]
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </svg>
      </div>

      {/* Main Card Container */}
      <div className="w-full max-w-md z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-3xl shadow-2xl overflow-hidden border-2 border-gray-200"
        >
          <div className="p-8 md:p-12">
            {/* Logo */}
            <div className="flex justify-center mb-8">
              <Link to="/" className="flex items-center space-x-3">
                <span className="text-3xl font-bold text-green-600">
                  WellNezt
                </span>
              </Link>
            </div>

            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                {isSuccess ? '✨ Berhasil!' : 'Reset Password'}
              </h1>
              <p className="text-gray-600 text-lg">
                {isSuccess 
                  ? 'Password kamu sudah berhasil direset!'
                  : 'Masukkan password baru kamu'}
              </p>
            </div>

            {!isSuccess ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Error Alert */}
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-start p-4 bg-red-50 border-2 border-red-200 rounded-2xl"
                  >
                    <FiAlertCircle className="text-red-500 text-xl mt-0.5 mr-3 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-red-700 font-semibold text-sm">Error</p>
                      <p className="text-red-600 text-sm">{error}</p>
                    </div>
                    <button 
                      type="button" 
                      onClick={() => setError('')}
                      className="text-red-400 hover:text-red-600 ml-2"
                    >
                      <FiX size={20} />
                    </button>
                  </motion.div>
                )}

                {/* Password Baru */}
                <div>
                  <label htmlFor="password" className="block text-gray-700 font-semibold text-base mb-3">
                    Password Baru
                  </label>
                  <div className="flex items-center px-5 py-4 bg-gray-50 border-2 border-gray-200 rounded-2xl focus-within:border-green-500 focus-within:bg-white transition-all">
                    <FiLock className="mr-4 text-gray-400 text-xl" />
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="new-password"
                      required
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Minimal 8 karakter"
                      className="w-full bg-transparent text-gray-900 placeholder-gray-400 outline-none text-lg"
                      disabled={isSubmitting || !token || !email}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="ml-2 text-gray-400 hover:text-gray-600 transition-colors"
                      disabled={isSubmitting}
                    >
                      {showPassword ? (
                        <FiEyeOff className="text-xl" />
                      ) : (
                        <FiEye className="text-xl" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Konfirmasi Password */}
                <div>
                  <label htmlFor="password_confirmation" className="block text-gray-700 font-semibold text-base mb-3">
                    Konfirmasi Password
                  </label>
                  <div className="flex items-center px-5 py-4 bg-gray-50 border-2 border-gray-200 rounded-2xl focus-within:border-green-500 focus-within:bg-white transition-all">
                    <FiLock className="mr-4 text-gray-400 text-xl" />
                    <input
                      id="password_confirmation"
                      name="password_confirmation"
                      type={showConfirmPassword ? "text" : "password"}
                      autoComplete="new-password"
                      required
                      value={formData.password_confirmation}
                      onChange={handleChange}
                      placeholder="Ketik ulang password"
                      className="w-full bg-transparent text-gray-900 placeholder-gray-400 outline-none text-lg"
                      disabled={isSubmitting || !token || !email}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="ml-2 text-gray-400 hover:text-gray-600 transition-colors"
                      disabled={isSubmitting}
                    >
                      {showConfirmPassword ? (
                        <FiEyeOff className="text-xl" />
                      ) : (
                        <FiEye className="text-xl" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting || !token || !email}
                  className="w-full py-5 text-lg font-bold text-white rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                  style={{ backgroundColor: '#F0B639' }}
                  onMouseEnter={(e) => !isSubmitting && (e.currentTarget.style.backgroundColor = '#E5A820')}
                  onMouseLeave={(e) => !isSubmitting && (e.currentTarget.style.backgroundColor = '#F0B639')}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-3">
                      <svg className="animate-spin h-6 w-6" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Memproses...
                    </span>
                  ) : (
                    'Reset Password'
                  )}
                </button>
              </form>
            ) : (
              // Success State
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-6"
              >
                <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-green-100 mb-6">
                  <FiCheckCircle className="h-10 w-10 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Password Berhasil Direset!</h3>
                <p className="text-gray-600 text-lg mb-6">
                  Password kamu sudah berhasil diubah.<br />
                  Redirecting ke halaman login...
                </p>
                <button
                  onClick={() => navigate('/login')}
                  className="w-full py-5 text-lg font-bold text-white rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:scale-[1.02]"
                  style={{ backgroundColor: '#F0B639' }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#E5A820')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#F0B639')}
                >
                  Kembali ke Login
                </button>
              </motion.div>
            )}

            {/* Back to Login Link */}
            {!isSuccess && (
              <div className="mt-8 text-center">
                <Link
                  to="/login"
                  className="text-green-600 font-semibold hover:text-green-700 underline text-lg"
                >
                  ← Kembali ke Login
                </Link>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;