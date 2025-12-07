import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiLock, FiAlertCircle, FiEye, FiEyeOff } from 'react-icons/fi';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setError("Demo mode - login disabled");
    }, 1000);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-white p-4 md:p-8 relative overflow-hidden">
      {/* Animated Wave Background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <svg 
          className="absolute w-full h-full" 
          viewBox="0 0 1440 800" 
          preserveAspectRatio="none"
        >
          {/* Wave 1 - Lightest */}
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
          
          {/* Wave 2 - Medium */}
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
          
          {/* Wave 3 - Darkest */}
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

      <div className="w-full max-w-7xl flex flex-col lg:flex-row gap-8 lg:gap-24 items-center relative z-10">
        
        <motion.div
          className="w-full lg:w-1/2 flex flex-col items-center lg:items-start"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-40 text-center lg:text-left w-full">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight mb-6">
              Selamat datang kembali
            </h1>
            <p className="text-1xl md:text-2xl text-gray-700">
              Mulai lagi rutinitas sehatmu bersama Nut  riGo!
            </p>
          </div>

          <div className="relative w-full max-w-md h-[320px] mx-auto flex items-center justify-center">
            <motion.div
              className="absolute w-60 h-60 md:w-60 md:h-60 lg:w-60 lg:h-60 rounded-full overflow-hidden shadow-2xl z-20"
              style={{ top: '10%', left: '-20%' }}
              animate={{ 
                rotate: [0, 360],
              }}
              transition={{
                rotate: {
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear"
                }
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&h=500&fit=crop"
                alt="Healthy salad bowl"
                className="w-full h-full object-cover"
              />
            </motion.div>
            
            <motion.div
              className="absolute w-100 h-100 md:w-100 md:h-100 lg:w-80 lg:h-80 rounded-full overflow-hidden shadow-2xl z-10"
              style={{ top: '-20%', right: '0%' }}
              animate={{ 
                rotate: [0, -360],
              }}
              transition={{
                rotate: {
                  duration: 25,
                  repeat: Infinity,
                  ease: "linear"
                }
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&h=500&fit=crop"
                alt="Colorful food bowl"
              />
            </motion.div>
            
            <motion.div
              className="absolute w-45 h-45 md:w-45 md:h-45 lg:w-45 lg:h-45 rounded-full overflow-hidden shadow-2xl z-20"
              style={{ bottom: '-12%', left: '17%' }}
              animate={{ 
                rotate: [0, 360],
              }}
              transition={{
                rotate: {
                  duration: 18,
                  repeat: Infinity,
                  ease: "linear"
                }
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=500&h=500&fit=crop"
                alt="Healthy breakfast"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </motion.div>

        {/* RIGHT SIDE - LOGIN FORM IN ROUNDED BOX (SUPER GEDE!) */}
        <motion.div
          className="w-full lg:w-[55%] max-w-2xl"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <div className="bg-white border-2 border-gray-200 rounded-3xl p-14 md:p-16 lg:p-20 shadow-lg">
            <motion.div
              className="mb-12"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-4">
                Hello, There!
              </h2>
              <p className="text-gray-600 text-2xl">
                Welcome to <span className="font-bold text-green-600">NutriGo</span>
              </p>
            </motion.div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-5 bg-red-50 border-2 border-red-200 rounded-2xl flex items-start gap-3"
              >
                <FiAlertCircle className="text-red-500 text-2xl mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-red-700 font-semibold text-base">Login Gagal</p>
                  <p className="text-red-600 text-base">{error}</p>
                </div>
              </motion.div>
            )}

            <div className="space-y-6">
              <div>
                <label className="text-gray-700 font-semibold text-base mb-3 block">
                  Email Address
                </label>
                <div className="flex items-center px-5 py-4 bg-gray-50 border-2 border-gray-200 rounded-2xl focus-within:border-green-500 focus-within:bg-white transition-all">
                  <FiMail className="mr-4 text-gray-400 text-xl" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="email@gmail.com"
                    className="w-full bg-transparent text-gray-900 placeholder-gray-400 outline-none text-lg"
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div>
                <label className="text-gray-700 font-semibold text-base mb-3 block">
                  Password
                </label>
                <div className="flex items-center px-5 py-4 bg-gray-50 border-2 border-gray-200 rounded-2xl focus-within:border-green-500 focus-within:bg-white transition-all">
                  <FiLock className="mr-4 text-gray-400 text-xl" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="w-full bg-transparent text-gray-900 placeholder-gray-400 outline-none text-lg"
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="ml-2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? (
                      <FiEyeOff className="text-xl" />
                    ) : (
                      <FiEye className="text-xl" />
                    )}
                  </button>
                </div>
                
                {/* Reset Password Link */}
                <div className="mt-2 text-right">
                  <a
                    href="#"
                    className="text-sm text-green-600 hover:text-green-700 font-semibold"
                  >
                    Reset Password
                  </a>
                </div>
              </div>

              <button
                onClick={handleSubmit}
                disabled={isLoading}
                className="w-full py-5 text-lg font-bold text-white rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                style={{ backgroundColor: '#F0B639' }}
                onMouseEnter={(e) => !isLoading && (e.currentTarget.style.backgroundColor = '#E5A820')}
                onMouseLeave={(e) => !isLoading && (e.currentTarget.style.backgroundColor = '#F0B639')}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-3">
                    <svg className="animate-spin h-6 w-6" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Loading...
                  </span>
                ) : (
                  'Login'
                )}
              </button>
            </div>

            <p className="mt-8 text-center text-gray-600 text-base">
              Don't have an account?{" "}
              <a
                className="text-green-600 font-bold hover:text-green-700 underline text-lg"
                href="#"
              >
                Register
              </a>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginPage;