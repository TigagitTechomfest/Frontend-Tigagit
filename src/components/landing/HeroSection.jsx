import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Github, Linkedin } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Button from '../common/Button';
import fruithand from '../../assets/images/fruithand.png';
import women from '../../assets/images/women.png';
import brokoli from '../../assets/images/brokoli.png';
import foodbg from '../../assets/images/foodbg.png';
import rico from '../../assets/images/rico.png';
import aldi from '../../assets/images/aldi.png';
import khalisha from '../../assets/images/khalisha.png';
import piring from '../../assets/images/piring.png';
import maskot5 from '../../assets/images/maskot5.png';
import food1 from '../../assets/food_1.png';
import maskot6 from '../../assets/images/maskot6.png';
import tomat from '../../assets/images/tomat.png';
import garlic from '../../assets/images/garlic.png';
import { mask } from 'framer-motion/client';
const HeroSection = () => {
  const cards = [
    {
      title: 'Tujuan Kami',
      description: 'Memberdayakan setiap individu dengan pengetahuan nutrisi yang akurat dan tool yang mudah digunakan.'
    },
    {
      title: 'Solusi Inovatif',
      description: 'Platform terintegrasi dengan AI untuk tracking nutrisi real-time dan rekomendasi personal.'
    },
    {
      title: 'Dampak Nyata',
      description: 'Ribuan pengguna telah mencapai target nutrisi mereka dan merasakan perubahan positif dalam kesehatan.'
    }
  ];
  const teamMembers = [
    {
      id: 1,
      name: 'Narayana Cokro Kusumo Amsyari',
      role: 'Leader, Frontend, UI/UX Designer',
      bio: 'Bikin ide ini karena pengen sehat dan bermanfaat buat banyak orang.',
      image: rico,
      linkedin: 'https://www.linkedin.com/in/narayana-cokro-kusumo-amsyari-b053552a1/',
      github: 'https://github.com/nrico25'
    },
    {
      id: 2,
      name: 'Aldiansyah Fayruz',
      role: 'Ai & Backend Eingineer',
      bio: 'Spesialis backend dengan keahlian dalam database optimization dan API development.',
      image: aldi,
      linkedin: 'https://www.linkedin.com/in/aldiansyah-fayruz-74522018b/',
      github: 'https://github.com/FayruzAldi'
    },
    {
      id: 3,
      name: 'Khalisha Kaylanasywa',
      role: 'Frontend & UIUX Designer',
      bio: 'Cewe jago UIUX, Speaking, Full experience.',
      image: khalisha,
      linkedin: 'https://www.linkedin.com/in/aldiansyah-fayruz-74522018b/',
      github: 'https://github.com/khalllishaa'
    }
  ];


  const services = [
    {
      title: 'Tracking Nutrisi Real-time',
      description: 'Monitor asupan kalori, protein, lemak, dan karbohidrat Anda setiap hari dengan akurat.',
      avatar: women
    },
    {
      title: 'Rekomendasi Menu Personal',
      description: 'Dapatkan saran menu sehat yang disesuaikan dengan kebutuhan dan preferensi diet Anda.',
      avatar: women
    },
    {
      title: 'Komunitas & Tips Nutrisi',
      description: 'Berbagi pengalaman, tips, dan resep sehat dengan komunitas pengguna Nutrigo.',
      avatar: women
    }
  ];

  // Auto-swipe effect
  const [currentTeamIndex, setCurrentTeamIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [direction, setDirection] = useState(0);
  useEffect(() => {
    if (!isAutoPlay) return;

    const interval = setInterval(() => {
      setDirection(1);
      setCurrentTeamIndex((prev) => (prev + 1) % teamMembers.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlay, teamMembers.length]);

  const handlePrev = () => {
    setIsAutoPlay(false);
    setDirection(-1);
    setCurrentTeamIndex((prev) => (prev - 1 + teamMembers.length) % teamMembers.length);
  };

  const handleNext = () => {
    setIsAutoPlay(false);
    setDirection(1);
    setCurrentTeamIndex((prev) => (prev + 1) % teamMembers.length);
  };

  const handleDotClick = (index) => {
    setIsAutoPlay(false);
    setDirection(index > currentTeamIndex ? 1 : -1);
    setCurrentTeamIndex(index);
  };
  const slideVariants = {
    enter: (dir) => ({
      x: dir > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (dir) => ({
      zIndex: 0,
      x: dir > 0 ? -1000 : 1000,
      opacity: 0
    })
  };
  const currentMember = teamMembers[currentTeamIndex];

  return (
    <div className="w-full">
      {/* HERO SECTION */}
      <section className="min-h-screen flex flex-col relative overflow-hidden pt-20"
        style={{ width: '100%', height: '100%', background: 'radial-gradient(ellipse 50.00% 50.00% at 50.00% 50.00%, #98F9B6 0%, #32794F 100%)' }}>
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-6xl mx-auto px-6 lg:px-10 py-20 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <h1 className="text-6xl font-bold text-white mb-10 leading-tight">
                Keseimbangan<br />
                Gizi, Energi <br />
                Optimal Setiap <br />
                Hari.
              </h1>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link to="/register">
                  <button className="bg-yellow-400 text-white px-8 py-3 rounded-lg hover:bg-yellow-500 transition-colors font-semibold">
                    Mulai Sekarang
                  </button>
                </Link>
              </div>
            </div>

            <div className="flex justify-center relative">
              {/* Piring berputar */}
              <motion.img
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                style={{ width: '100%', height: '100%' }}
                src={piring}
                alt="piring"
                className="w-80 h-80"
              />
              {/* Maskot 5 - atas kanan */}
              <motion.img
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                src={maskot6}
                alt="maskot5"
                className="absolute -top-10 -right-40  w-70 h-80"
              />

              {/* Maskot 6 - bawah kiri */}
              <motion.img
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                src={maskot5}
                alt="maskot6"
                className="absolute -bottom-1 -left-40 w-60 h-70"
              />


            </div>
          </div>
        </div>
      </section>


      {/* FEATURES SECTION - APa ITU NUTRIGO */}
      <section className="w-full relative overflow-hidden" style={{ minHeight: '600px' }}>
        <img
          src={foodbg}
          alt="background"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ zIndex: 0 }}
        />

        <div className="max-w-6xl mx-auto relative px-6 py-16 md:py-24 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center" style={{ zIndex: 10 }}>
          <div className="max-w-xl">
            <h1 className="text-4xl md:text-5xl text-white font-bold mb-6">
              Apa itu <span className="text-black">Nutri</span><span className="text-yellow-300">Go</span>
            </h1>
            <div className="w-32 h-1 bg-yellow-300 mb-3"></div>

            <p className="text-white text-base md:text-lg leading-relaxed">
              Panduan pribadi Anda menuju hidup yang lebih sehat dan terinformasi. Kami diciptakan untuk mengatasi kebingungan dalam perjalanan nutrisi dan kebugaran.
            </p>
          </div>

          {/* Right - Cards */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {cards.map((card, idx) => (
              <motion.div
                key={idx}
                className={`bg-white bg-opacity-95 p-6 rounded-2xl ${idx === 2 ? 'md:col-span-2' : ''}`}
                whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-green-700 mb-3">{card.title}</h2>
                <div className="w-12 h-1 bg-yellow-400 mb-3"></div>
                <p className="text-gray-700 text-sm leading-relaxed">{card.description}</p>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </section>
      <section>
        <img style={{ width: '100%', height: '100%' }} src={fruithand} alt="fruithand" />
      </section>

      {/* FITUR UTAMA SECTION */}
      <section className="w-full bg-white px-4 py-32 md:py-40 min-h-screen flex items-center">
        <div className="max-w-6xl mx-auto w-full">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl text-gray-800 mb-4 font-bold">
              <span className="text-green-600">Fitur Utama</span> Kami
            </h1>
            <p className="text-gray-600 text-base max-w-2xl mx-auto">Semua fitur yang Anda butuhkan untuk hidup lebih sehat dan mencapai target nutrisi Anda</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">

            {services.map((service, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
                className="bg-white border border-gray-200 rounded-xl p-8 cursor-pointer transition-all duration-300 h-80"
              >
                <h3 className="text-lg font-bold text-gray-800 mb-3">{service.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-6 flex-1">{service.description}</p>
                <motion.button
                  whileHover={{ x: 5 }}
                  className="text-green-600 font-semibold text-sm hover:text-green-700 transition inline-flex items-center gap-2"
                >
                  Pelajari Lebih <span>→</span>
                </motion.button>

              </motion.div>

            ))}
          </div>
        </div>
      </section>
      {/* BOOST CONFIDENCE SECTION */}
      <section className="bg-green-100 py-16 md:py-24 text-center">
        <div className="max-w-3xl mx-auto px-6">
          <h4 className="text-black text-base md:text-lg mb-4">
            Raih Berat badan Ideal dengan Pola makan tepat dan terukur.</h4>
          <h5 className="text-3xl text-gray-600  font-extralight md:text-4xl mb-8">
            <span className="text-gray-600 font-extrabold">Rencanakan</span>, lacak dan capai
            <span className="text-gray-600 font-extrabold "> Target.</span>berat badan anda<span className="text-gray-600 font-bold"> Hingga Ideal</span>
          </h5>
          <Link to="/register">
            <button className="bg-yellow-400 text-white px-8 py-3 rounded-lg hover:bg-yellow-500 transition-colors font-semibold">
              Mulai Sekarang
            </button>
          </Link>
        </div>
      </section>

      {/* TEAM SECTION - GET TO KNOW TIGAGIT (CAROUSEL) */}
      <section className="bg-gradient-to-br from-gray-50 to-gray-100 py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-6">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h1 className="text-black text-3xl md:text-4xl mb-2">
              Get to know <span className="font-bold text-yellow-500">TIGAGIT</span>
            </h1>
            <p className="text-gray-600 text-sm">Yuk, kenal lebih dekat dengan para pengembang website ini</p>
          </motion.div>

          {/* Carousel */}
          <div className="relative">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentMember.id}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: 'spring', stiffness: 300, damping: 30 },
                  opacity: { duration: 0.5 }
                }}
                className="w-full"
              >
                {/* Card */}
                <motion.div
                  className="bg-white rounded-3xl overflow-hidden shadow-2xl border-2 border-gray-300"
                  whileHover={{ boxShadow: '0 30px 60px rgba(34, 197, 94, 0.15)' }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                    {/* Left - Image */}
                    <div className="relative overflow-hidden h-64 md:h-full bg-white flex items-center justify-center">
                      <motion.img
                        src={currentMember.image}
                        alt={currentMember.name}
                        className="w-3/4 h-3/4 object-contain"
                        initial={{ scale: 1.1 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.6 }}
                      />

                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="absolute bottom-6 left-6 right-6 flex justify-center gap-4"
                      >
                        {currentMember.linkedin && (
                          <motion.a
                            href={currentMember.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.1, y: -5 }}
                            className="bg-black hover:bg-white hover:text-black text-white p-3 rounded-full shadow-lg transition-colors"
                          >
                            <Linkedin size={20} />
                          </motion.a>
                        )}
                        {currentMember.github && (
                          <motion.a
                            href={currentMember.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.1, y: -5 }}
                            className="bg-black hover:bg-white hover:text-black text-white p-3 rounded-full shadow-lg transition-colors"
                          >
                            <Github size={20} />
                          </motion.a>
                        )}
                      </motion.div>
                    </div>

                    {/* Right - Text */}
                    <motion.div
                      className="p-8 md:p-12 flex flex-col justify-center bg-white"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <div className="mb-6">
                        <h4 className="text-sm text-gray-800 mb-2 uppercase tracking-wide">
                          {currentMember.role}
                        </h4>
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                          {currentMember.name}
                        </h1>
                        <div className="w-32 h-1 bg-yellow-500 rounded-full"></div>
                      </div>

                      <p className="text-gray-600 leading-relaxed mb-8">
                        {currentMember.bio}
                      </p>

                      <div className="flex gap-4 md:hidden">
                        {currentMember.linkedin && (
                          <motion.a
                            href={currentMember.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.1 }}
                            className="bg-green-100 hover:bg-black hover:text-white text-gray-700 p-3 rounded-full transition-colors"
                          >
                            <Linkedin size={20} />
                          </motion.a>
                        )}
                        {currentMember.github && (
                          <motion.a
                            href={currentMember.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.1 }}
                            className="bg-green-100 hover:bg-black hover:text-white text-gray-700 p-3 rounded-full transition-colors"
                          >
                            <Github size={20} />
                          </motion.a>
                        )}
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center mt-8">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handlePrev}
                className="bg-yellow-400 hover:bg-yellow-500 text-white p-3 rounded-full shadow-lg transition-colors"
              >
                <ChevronLeft size={24} />
              </motion.button>

              {/* Dots */}
              <div className="flex gap-2">
                {teamMembers.map((_, index) => (
                  <motion.button
                    key={index}
                    onClick={() => handleDotClick(index)}
                    className={`rounded-full transition-all ${index === currentTeamIndex
                      ? 'bg-yellow-400 w-8 h-3'
                      : 'bg-gray-300 w-3 h-3 hover:bg-gray-400'
                      }`}
                    whileHover={{ scale: 1.2 }}
                  />
                ))}
              </div>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleNext}
                className="bg-yellow-400 hover:bg-yellow-500 text-white p-3 rounded-full shadow-lg transition-colors"
              >
                <ChevronRight size={24} />
              </motion.button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HeroSection;