import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiMail, FiLock, FiAlertCircle, FiEye, FiEyeOff } from 'react-icons/fi';
import useAuthStore from '../store/authStore';
import food1 from '../assets/images/food_1.png';
import food2 from '../assets/images/food_2.png';
import food3 from '../assets/images/food_3.png';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login, isLoading: authLoading } = useAuthStore();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validations
    if (!formData.email || !formData.password) {
      setError("Email dan password harus diisi");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Format email tidak valid");
      return;
    }

    try {
      console.log('🔐 Attempting login...');
      await login(formData.email, formData.password);
      console.log('✅ Login successful, redirecting to dashboard...');
      navigate('/dashboard');
    } catch (err) {
      console.error('❌ Login failed:', err);
      const errorMsg = err.response?.data?.message || err.message || 'Login gagal. Periksa email dan password Anda.';
      setError(errorMsg);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-white p-4 sm:p-6 md:p-8 pt-20 sm:pt-24 md:pt-28 lg:pt-8 relative overflow-hidden">
      {/* Animated Wave Background */}
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

      <div className="w-full max-w-7xl flex flex-col lg:flex-row gap-6 sm:gap-8 lg:gap-16 xl:gap-24 items-center relative z-10">
        
        {/* LEFT SIDE - HERO */}
        <motion.div
          className="w-full lg:w-1/2 flex flex-col items-center lg:items-start mb-4 sm:mb-6 lg:mb-0"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-6 sm:mb-8 lg:mb-12 text-center lg:text-left w-full">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 leading-tight mb-3 sm:mb-4 lg:mb-6">
              Selamat datang kembali
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-700">
              Mulai lagi rutinitas sehatmu bersama WellNezt!
            </p>
          </div>

          {/* Food Images - Only shown on desktop with animations */}
          <div className="hidden lg:block relative w-full max-w-md h-[320px] mx-auto">
            <motion.div
              className="absolute w-60 h-60 rounded-full overflow-hidden z-20"
              style={{ top: '10%', left: '-15%' }}
              animate={{ rotate: [0, 360] }}
              transition={{ rotate: { duration: 20, repeat: Infinity, ease: "linear" }}}
            >
              <img
                src={food1}
                alt="Healthy food 1"
                className="w-full h-full object-cover"
              />
            </motion.div>
            
            <motion.div
              className="absolute w-80 h-80 rounded-full overflow-hidden z-10"
              style={{ top: '-20%', right: '0%' }}
              animate={{ rotate: [0, -360] }}
              transition={{ rotate: { duration: 25, repeat: Infinity, ease: "linear" }}}
            >
              <img
                src={food2}
                alt="Healthy food 2"
                className="w-full h-full object-cover"
              />
            </motion.div>
            
            <motion.div
              className="absolute w-45 h-45 rounded-full overflow-hidden z-20"
              style={{ bottom: '-12%', left: '17%' }}
              animate={{ rotate: [0, 360] }}
              transition={{ rotate: { duration: 18, repeat: Infinity, ease: "linear" }}}
            >
              <img
                src={food3}
                alt="Healthy food 3"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </motion.div>

        {/* RIGHT SIDE - LOGIN FORM */}
        <motion.div
          className="w-full lg:w-[55%] max-w-2xl"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <div className="bg-white border-2 border-gray-200 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 lg:p-16 xl:p-20 shadow-lg">
            <motion.div
              className="mb-6 sm:mb-8 lg:mb-12"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 mb-2 sm:mb-3 lg:mb-4">
                Hello, There!
              </h2>
              <p className="text-gray-600 text-base sm:text-lg md:text-xl lg:text-2xl">
                Welcome to <span className="font-bold text-green-600">WellNezt</span>
              </p>
            </motion.div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-4 sm:mb-6 p-3 sm:p-4 lg:p-5 bg-red-50 border-2 border-red-200 rounded-xl sm:rounded-2xl flex items-start gap-2 sm:gap-3"
              >
                <FiAlertCircle className="text-red-500 text-lg sm:text-xl lg:text-2xl mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-red-700 font-semibold text-sm sm:text-base">Login Gagal</p>
                  <p className="text-red-600 text-sm sm:text-base">{error}</p>
                </div>
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5 lg:space-y-6">
              <div>
                <label className="text-gray-700 font-semibold text-sm sm:text-base mb-2 sm:mb-3 block">
                  Email Address
                </label>
                <div className="flex items-center px-3 sm:px-4 lg:px-5 py-3 sm:py-3.5 lg:py-4 bg-gray-50 border-2 border-gray-200 rounded-xl sm:rounded-2xl focus-within:border-green-500 focus-within:bg-white transition-all">
                  <FiMail className="mr-2 sm:mr-3 lg:mr-4 text-gray-400 text-base sm:text-lg lg:text-xl" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="email@gmail.com"
                    className="w-full bg-transparent text-gray-900 placeholder-gray-400 outline-none text-sm sm:text-base lg:text-lg"
                    disabled={authLoading}
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-gray-700 font-semibold text-sm sm:text-base mb-2 sm:mb-3 block">
                  Password
                </label>
                <div className="flex items-center px-3 sm:px-4 lg:px-5 py-3 sm:py-3.5 lg:py-4 bg-gray-50 border-2 border-gray-200 rounded-xl sm:rounded-2xl focus-within:border-green-500 focus-within:bg-white transition-all">
                  <FiLock className="mr-2 sm:mr-3 lg:mr-4 text-gray-400 text-base sm:text-lg lg:text-xl" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="w-full bg-transparent text-gray-900 placeholder-gray-400 outline-none text-sm sm:text-base lg:text-lg"
                    disabled={authLoading}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="ml-2 text-gray-400 hover:text-gray-600 transition-colors"
                    disabled={authLoading}
                  >
                    {showPassword ? (
                      <FiEyeOff className="text-base sm:text-lg lg:text-xl" />
                    ) : (
                      <FiEye className="text-base sm:text-lg lg:text-xl" />
                    )}
                  </button>
                </div>
                
                <div className="mt-2 text-right">
                  <button 
                    type="button" 
                    onClick={() => navigate('/forgot-password')}
                    className="font-medium text-green-600 hover:text-green-700 focus:outline-none transition-colors text-sm sm:text-base"
                  >
                    Lupa password?
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={authLoading}
                className="w-full py-3 sm:py-4 lg:py-5 text-base sm:text-lg font-bold text-white rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                style={{ backgroundColor: '#F0B639' }}
                onMouseEnter={(e) => !authLoading && (e.currentTarget.style.backgroundColor = '#E5A820')}
                onMouseLeave={(e) => !authLoading && (e.currentTarget.style.backgroundColor = '#F0B639')}
              >
                {authLoading ? (
                  <span className="flex items-center justify-center gap-2 sm:gap-3">
                    <svg className="animate-spin h-5 w-5 sm:h-6 sm:w-6" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Loading...
                  </span>
                ) : (
                  'Login'
                )}
              </button>
            </form>

            <p className="mt-6 sm:mt-8 text-center text-gray-600 text-sm sm:text-base">
              Don't have an account?{" "}
              <button
                type="button"
                onClick={() => navigate('/register')}
                className="font-medium text-green-600 hover:text-green-700 focus:outline-none transition-colors"
              >
                Register
              </button>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginPage;