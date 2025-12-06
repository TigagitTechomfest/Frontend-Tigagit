import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiMail, FiLock, FiAlertCircle } from 'react-icons/fi';
import useAuthStore from '../store/authStore';
import Button from '../components/common/Button';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login, isAuthenticated, isLoading, error } = useAuthStore();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(formData.email, formData.password);
    } catch (err) {
      console.error('Login error:', err);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-emerald-50 via-white to-green-50 p-4 md:p-8">
      <motion.div
        className="w-full max-w-6xl flex flex-col md:flex-row bg-white rounded-3xl shadow-2xl overflow-hidden"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* LEFT SIDE - TEXT AND FOOD IMAGES */}
        <motion.div
          className="w-full md:w-1/2 p-8 md:p-12 lg:p-16 flex flex-col justify-center bg-white"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-4">
              To help us assist you better,
            </h1>
            <p className="text-xl md:text-2xl text-gray-700">
              please tell us a few things about yourself
            </p>
          </div>

          {/* FOOD IMAGES */}
          <div className="relative mt-8 flex items-center justify-center md:justify-start">
            <motion.div
              className="absolute left-0 w-36 h-36 md:w-40 md:h-40 lg:w-48 lg:h-48 rounded-full overflow-hidden shadow-xl border-4 border-white"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <img
                src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400"
                alt="Healthy salad bowl"
                className="w-full h-full object-cover"
              />
            </motion.div>
            
            <motion.div
              className="absolute left-24 top-12 md:left-28 md:top-16 w-32 h-32 md:w-36 md:h-36 lg:w-44 lg:h-44 rounded-full overflow-hidden shadow-xl border-4 border-white z-10"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <img
                src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400"
                alt="Colorful food bowl"
                className="w-full h-full object-cover"
              />
            </motion.div>
            
            <motion.div
              className="absolute left-44 top-24 md:left-52 md:top-32 w-28 h-28 md:w-32 md:h-32 lg:w-40 lg:h-40 rounded-full overflow-hidden shadow-xl border-4 border-white z-20"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <img
                src="https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400"
                alt="Healthy breakfast"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>

          {/* Spacer for images */}
          <div className="h-48 md:h-52 lg:h-60"></div>
        </motion.div>

        {/* RIGHT SIDE - LOGIN FORM */}
        <motion.div
          className="w-full md:w-1/2 p-8 md:p-12 lg:p-16 flex items-center justify-center bg-gradient-to-br from-emerald-600 to-green-700"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <div className="w-full max-w-md">
            <motion.div
              className="mb-8"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-2">
                Hello, There!
              </h2>
              <p className="text-white/90 text-lg">
                Welcome to <span className="font-bold text-yellow-300">NutriGo</span>
              </p>
            </motion.div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 bg-red-500/20 backdrop-blur border border-red-500/40 rounded-xl flex items-start gap-3"
              >
                <FiAlertCircle className="text-red-300 text-xl mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-red-200 font-semibold text-sm">Login Gagal</p>
                  <p className="text-red-100 text-sm">{error}</p>
                </div>
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="text-white font-semibold text-sm mb-2 block">Email Address</label>
                <div className="flex items-center px-4 py-3 bg-white/20 backdrop-blur border border-white/30 rounded-xl">
                  <FiMail className="mr-3 text-white text-lg" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="email@gmail.com"
                    className="w-full bg-transparent text-white placeholder-white/60 outline-none"
                    disabled={isLoading}
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-white font-semibold text-sm mb-2 block">Password</label>
                <div className="flex items-center px-4 py-3 bg-white/20 backdrop-blur border border-white/30 rounded-xl">
                  <FiLock className="mr-3 text-white text-lg" />
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="w-full bg-transparent text-white placeholder-white/60 outline-none"
                    disabled={isLoading}
                    required
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="
                  w-full py-3.5 text-base
                  bg-yellow-400 hover:bg-yellow-300
                  text-gray-900 font-bold
                  rounded-xl shadow-lg hover:shadow-xl
                  transition-all
                  disabled:opacity-50 disabled:cursor-not-allowed
                "
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Loading...
                  </span>
                ) : (
                  'Login'
                )}
              </Button>
            </form>

            <p className="mt-6 text-center text-white/90 text-sm">
              Don't have an account?{" "}
              <Link
                className="text-yellow-300 font-bold hover:text-yellow-200 underline"
                to="/register"
              >
                Register
              </Link>
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default LoginPage;