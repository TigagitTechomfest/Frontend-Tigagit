import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiMail, FiLock } from 'react-icons/fi';
import useAuthStore from '../store/authStore';
import Button from '../components/common/Button';
import { colors } from '../constants/styles';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuthStore();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // ❗ Disable animation on first load
  const [firstLoad, setFirstLoad] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setFirstLoad(false), 50);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (isAuthenticated) navigate("/dashboard");
  }, [isAuthenticated, navigate]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(formData.email, formData.password);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { when: "beforeChildren", staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100, damping: 20 },
    },
  };

  return (
    <motion.div
      className="min-h-screen w-full flex flex-col md:flex-row bg-white relative overflow-hidden"
      initial={firstLoad ? false : "hidden"}
      animate={firstLoad ? false : "visible"}
      variants={containerVariants}
    >

      {/* LEFT SIDE */}
      <motion.div
        className="w-full md:w-1/2 relative flex flex-col justify-center p-10 md:pl-20 md:pr-16 
                   min-h-[40vh] md:min-h-screen bg-[#DDF8E2] overflow-visible"
        variants={itemVariants}
        initial={firstLoad ? false : "hidden"}
        animate={firstLoad ? false : "visible"}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/40 to-transparent"></div>

        <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-[#6CC384] rounded-full -translate-y-1/3 translate-x-1/3 blur-2xl opacity-30"></div>

        <motion.div
          className="relative z-10 max-w-lg"
          variants={itemVariants}
          initial={firstLoad ? false : "hidden"}
          animate={firstLoad ? false : "visible"}
        >
          <h1 className="text-5xl font-bold text-gray-900 leading-tight">
            Investasi terbaik adalah investasi pada
            <span className="text-green-700"> kesehatan Anda.</span>
          </h1>

          <p className="mt-2 text-gray-600 text-lg">
            Mulai langkah sehatmu bersama NutriGo. Satu pilihan baik, setiap harinya.
          </p>
        </motion.div>

        {/* FLOATING FOOD IMAGES (tetap animasi) */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-30 overflow-visible">
          
          <motion.img
            src="/src/assets/food_1.png"
            className="absolute w-60 h-60 object-cover rounded-full shadow-3xl z-20"
            style={{ left: '60%', bottom: '18%', transform: 'translateX(-50%)' }}
            animate={{ y: [3, -3, 3] }}
            transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
          />

          <motion.img
            src="/src/assets/food_2.png"
            className="absolute w-90 h-90 object-cover rounded-full shadow-4xl z-10"
            style={{ left: '62%', top: '20%', transform: 'translateX(-50%)' }}
            animate={{ y: [3, -3, 3] }}
            transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
          />

          <motion.img
            src="/src/assets/food_2.png"
            className="absolute w-72 h-72 object-cover rounded-full shadow-5xl z-20"
            style={{ left: '86%', top: '47%', transform: 'translate(-50%, -50%)' }}
            animate={{ y: [4, -4, 4] }}
            transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
          />

        </div>
      </motion.div>

      <motion.div
        className="hidden md:block absolute left-1/2 h-full w-56 -ml-28 z-20"
        initial={firstLoad ? false : { opacity: 0, scaleX: 0 }}
        animate={firstLoad ? false : { opacity: 1, scaleX: 1 }}
        transition={{ delay: 0.6, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <svg className="h-full w-full" viewBox="0 0 200 1000" preserveAspectRatio="none">
          <path
            d="
              M 0 0
              C 80 150, 140 250, 60 380
              C -20 510, 180 620, 40 760
              C -40 880, 160 950, 20 1100
              L 200 1100
              L 200 0
              Z
            "
            fill={colors.primary}
          />
        </svg>
      </motion.div>

      <motion.div
        className="w-full md:w-1/2 flex items-center justify-center p-8 md:pr-20 relative z-10 bg-[#6CC384]"
        variants={itemVariants}
        initial={firstLoad ? false : "hidden"}
        animate={firstLoad ? false : "visible"}
      >
        <motion.div
          className="w-full max-w-md bg-white/20 backdrop-blur-xl rounded-3xl p-12 shadow-2xl border border-white/30"
          initial={firstLoad ? false : { opacity: 0, y: 40 }}
          animate={firstLoad ? false : { opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >

          <motion.div
            className="mb-12"
            initial={firstLoad ? false : { opacity: 0, y: -20 }}
            animate={firstLoad ? false : { opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <h2 className="text-4xl font-extrabold text-gray-900 text-center">
              Hello, There!
            </h2>
            <p className="text-gray-800/90 text-lg text-center mt-1">
              Welcome to <span className="font-bold text-green-900">NutriGo</span>
            </p>
          </motion.div>

          <form onSubmit={handleSubmit} className="space-y-7">

            <div>
              <label className="text-gray-900 font-bold text-base">
                Email Address
              </label>
              <div className="flex items-center mt-2 px-5 py-4 bg-white/40 backdrop-blur-lg border border-green-700/40 rounded-2xl shadow-sm">
                <FiMail className="mr-3 text-gray-800 text-xl" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="email@gmail.com"
                  className="w-full bg-transparent text-gray-900 placeholder-gray-600 outline-none text-lg"
                />
              </div>
            </div>

            <div>
              <label className="text-gray-900 font-bold text-base">
                Password
              </label>
              <div className="flex items-center mt-2 px-5 py-4 bg-white/40 backdrop-blur-lg border border-green-700/40 rounded-2xl shadow-sm">
                <FiLock className="mr-3 text-gray-800 text-xl" />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full bg-transparent text-gray-900 placeholder-gray-600 outline-none text-lg"
                />
              </div>
            </div>

            <Button
              type="submit"
              className="
                w-full py-4 text-lg
                bg-yellow-400 hover:bg-yellow-300
                text-gray-900 font-bold
                rounded-2xl shadow-md hover:shadow-xl
                transition-all
              "
            >
              Login
            </Button>
          </form>

          <p className="mt-8 text-center text-gray-900 text-base">
            Don’t have an account?{" "}
            <Link
              className="!text-green-700 font-extrabold underline hover:!text-green-900 no-underline"
              style={{ color: "#32794F" }}
              to="/register"
            >
              Register
            </Link>
          </p>


        </motion.div>
      </motion.div>

    </motion.div>
  );
};

export default LoginPage;
