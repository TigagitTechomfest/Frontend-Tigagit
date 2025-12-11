// src/pages/ForgotPasswordPage.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiMail, FiAlertCircle, FiCheckCircle, FiArrowLeft } from 'react-icons/fi';
import useAuthStore from '../store/authStore';
import food1 from '../assets/images/food_1.png';
import food2 from '../assets/images/food_2.png';
import food3 from '../assets/images/food_3.png';

const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const { forgotPassword } = useAuthStore();
  
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    // Validasi email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setError('Email harus diisi');
      return;
    }
    
    if (!emailRegex.test(email)) {
      setError('Format email tidak valid');
      return;
    }
    
    try {
      setIsSubmitting(true);
      await forgotPassword(email);
      setIsSuccess(true);
      setError('');
    } catch (err) {
      console.error('Forgot password error:', err);
      const errorMsg = err.response?.data?.message || err.message || 'Gagal mengirim link reset password. Silakan coba lagi.';
      setError(errorMsg);
      setIsSuccess(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-white p-4 md:p-8 relative overflow-hidden">
      {/* Animated Background Waves */}
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

      {/* Main Content */}
      <div className="w-full max-w-7xl flex flex-col lg:flex-row gap-8 lg:gap-24 items-center relative z-10">
        
        {/* Left Side - Text & Rotating Images */}
        <motion.div
          className="w-full lg:w-1/2 flex flex-col items-center lg:items-start"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-40 text-center lg:text-left w-full">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight mb-6">
              Lupa Password?
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 mb-4">
              Jangan khawatir! Kami akan bantu kamu.
            </p>
            <p className="text-lg text-gray-600">
              Masukkan email yang terdaftar dan kami akan kirimkan link untuk reset password.
            </p>
          </div>

          <div className="relative w-full max-w-md h-[320px] mx-auto flex items-center justify-center">
            <motion.div
              className="absolute w-60 h-60 rounded-full overflow-hidden z-20"
              style={{ top: '10%', left: '-15%' }}
              animate={{ rotate: [0, 360] }}
              transition={{ 
                rotate: { duration: 20, repeat: Infinity, ease: "linear" }
              }}
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
              transition={{ 
                rotate: { duration: 25, repeat: Infinity, ease: "linear" }
              }}
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
              transition={{ 
                rotate: { duration: 18, repeat: Infinity, ease: "linear" }
              }}
            >
              <img
                src={food3}
                alt="Healthy food 3"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </motion.div>

        {/* Right Side - Form Card */}
        <motion.div
          className="w-full lg:w-[55%] max-w-2xl"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <div className="bg-white border-2 border-gray-200 rounded-3xl p-10 md:p-12 lg:p-14 shadow-xl">
            
            {!isSuccess ? (
              <>
                {/* Header */}
                <div className="mb-8">
                  <div className="flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6 mx-auto lg:mx-0">
                    <FiMail className="text-green-600 text-3xl" />
                  </div>
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3">
                    Reset Password
                  </h2>
                  <p className="text-gray-600 text-lg">
                    Masukkan email kamu untuk menerima link reset password
                  </p>
                </div>

                {/* Error Alert */}
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6 p-5 bg-red-50 border-2 border-red-200 rounded-2xl flex items-start gap-3"
                  >
                    <FiAlertCircle className="text-red-500 text-2xl mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-red-700 font-semibold text-base">Error</p>
                      <p className="text-red-600 text-base">{error}</p>
                    </div>
                  </motion.div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="text-gray-700 font-semibold text-base mb-3 block">
                      Email Address
                    </label>
                    <div className="flex items-center px-5 py-4 bg-gray-50 border-2 border-gray-200 rounded-2xl focus-within:border-green-500 focus-within:bg-white transition-all">
                      <FiMail className="mr-4 text-gray-400 text-xl" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (error) setError('');
                        }}
                        placeholder="email@gmail.com"
                        className="w-full bg-transparent text-gray-900 placeholder-gray-400 outline-none text-lg"
                        disabled={isSubmitting}
                        required
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
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
                        Mengirim...
                      </span>
                    ) : (
                      'Reset Password'
                    )}
                  </button>
                </form>
              </>
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
                <h3 className="text-3xl font-bold text-gray-900 mb-4">Email Terkirim!</h3>
                <p className="text-gray-600 text-lg mb-2">
                  Kami telah mengirimkan link reset password ke
                </p>
                <p className="text-green-600 font-bold text-xl mb-6">
                  {email}
                </p>
                <p className="text-gray-500 text-base mb-8">
                  Silakan periksa kotak masuk atau folder spam kamu. Link akan kadaluarsa dalam 60 menit.
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
                <button
                  type="button"
                  onClick={() => navigate('/login')}
                  className="inline-flex items-center gap-2 text-green-600 font-semibold hover:text-green-700 transition-colors text-lg"
                >
                  <FiArrowLeft className="text-xl" />
                  Kembali ke Login
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;