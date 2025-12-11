import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, ChevronLeft, ChevronRight, Sparkles, Target, TrendingUp } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';

import fruithand from '../../assets/images/fruithand.png';
import women from '../../assets/images/women.png';
import foodbg from '../../assets/images/foodbg.png';
import rico from '../../assets/images/rico.png';
import aldi from '../../assets/images/aldi.png';
import khalisha from '../../assets/images/khalisha.png';
import piring from '../../assets/images/piring.png';
import maskot5 from '../../assets/images/maskot5.png';
import maskot6 from '../../assets/images/maskot6.png';
import ic_banana from '../../assets/images/ic_banana.png';
import ic_dragon_fruit from '../../assets/images/ic_dragon_fruit.png';
import ic_pear from '../../assets/images/ic_pear.png';
import ic_star_fruit from '../../assets/images/ic_star_fruit.png';
import ic_tomato from '../../assets/images/ic_tomato.png';
import ic_watermelon from '../../assets/images/ic_watermelon.png';

const HeroSection = () => {
  const cards = [
    {
      title: 'Tujuan Kami',
      description: 'Memberdayakan setiap individu dengan pengetahuan nutrisi yang akurat dan tool yang mudah digunakan.',
      icon: Target,
      gradient: 'from-emerald-400 to-teal-500'
    },
    {
      title: 'Solusi Inovatif',
      description: 'Platform terintegrasi dengan AI untuk tracking nutrisi real-time dan rekomendasi personal.',
      icon: Sparkles,
      gradient: 'from-cyan-400 to-blue-500'
    },
    {
      title: 'Dampak Nyata',
      description: 'Ribuan pengguna telah mencapai target nutrisi mereka dan merasakan perubahan positif dalam kesehatan.',
      icon: TrendingUp,
      gradient: 'from-violet-400 to-purple-500'
    }
  ];

  const teamMembers = [
    {
      id: 1,
      name: 'Narayana Cokro Kusumo Amsyari',
      role: 'Leader, Frontend, UI/UX Designer',
      bio: 'Bikin ide ini karena pengen sehat dan bermanfaat buat banyak orang.',
      image: rico,
      color: 'from-emerald-500 to-teal-600',
      linkedin: 'https://www.linkedin.com/in/narayana-cokro-kusumo-amsyari-b053552a1/',
      github: 'https://github.com/nrico25'
    },
    {
      id: 2,
      name: 'Aldiansyah Fayruz',
      role: 'AI & Backend Engineer',
      bio: 'Spesialis backend dengan keahlian dalam database optimization dan API development.',
      image: aldi,
      color: 'from-blue-500 to-indigo-600',
      linkedin: 'https://www.linkedin.com/in/aldiansyah-fayruz-74522018b/',
      github: 'https://github.com/FayruzAldi'
    },
    {
      id: 3,
      name: 'Khalisha Kaylanasywa',
      role: 'Frontend & UI/UX Designer',
      bio: 'Cewe jago UI/UX, Speaking, Full experience.',
      image: khalisha,
      color: 'from-pink-500 to-rose-600',
      linkedin: 'https://www.linkedin.com/in/aldiansyah-fayruz-74522018b/',
      github: 'https://github.com/khalllishaa'
    }
  ];

  const services = [
    {
      title: 'Tracking Nutrisi Real-time',
      description: 'Monitor asupan kalori, protein, lemak, dan karbohidrat Anda setiap hari dengan akurat.',
      gradient: 'from-emerald-50 to-teal-50',
      iconBg: 'bg-gradient-to-br from-emerald-400 to-teal-500',
    },
    {
      title: 'Rekomendasi Menu Personal',
      description: 'Dapatkan saran menu sehat yang disesuaikan dengan kebutuhan dan preferensi diet Anda.',
      gradient: 'from-blue-50 to-cyan-50',
      iconBg: 'bg-gradient-to-br from-blue-400 to-cyan-500',
    },
    {
      title: 'Komunitas & Tips Nutrisi',
      description: 'Berbagi pengalaman, tips, dan resep sehat dengan komunitas pengguna Nutrigo.',
      gradient: 'from-violet-50 to-purple-50',
      iconBg: 'bg-gradient-to-br from-violet-400 to-purple-500',
    }
  ];

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
  }, [isAutoPlay]);

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
    enter: (dir) => ({ x: dir > 0 ? 1000 : -1000, opacity: 0 }),
    center: { zIndex: 1, x: 0, opacity: 1 },
    exit: (dir) => ({ zIndex: 0, x: dir > 0 ? -1000 : 1000, opacity: 0 })
  };

  const currentMember = teamMembers[currentTeamIndex];

  return (
    <div className="w-full bg-white">
      {/* HERO SECTION */}
      <section className="min-h-screen flex flex-col relative overflow-hidden pt-20" style={{ background: 'radial-gradient(ellipse 50.00% 50.00% at 50.00% 50.00%, #98F9B6 0%, #32794F 100%)' }}>
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{ duration: 8, repeat: Infinity }}
            className="absolute top-20 -left-20 w-96 h-96 bg-white rounded-full blur-3xl"
          />
          <motion.div
            animate={{ 
              scale: [1.2, 1, 1.2],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{ duration: 8, repeat: Infinity }}
            className="absolute bottom-20 -right-20 w-[500px] h-[500px] bg-yellow-300 rounded-full blur-3xl"
          />
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center lg:text-left"
            >
              <h1 className="text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                Keseimbangan<br />
                <span className="bg-gradient-to-r from-yellow-300 to-amber-400 bg-clip-text text-transparent">
                  Gizi, Energi
                </span><br />
                Optimal Setiap<br />
                Hari.
              </h1>

              <p className="text-white/90 text-lg mb-8 max-w-xl">
                Wujudkan hidup sehat dengan tracking nutrisi yang akurat, rekomendasi personal, dan komunitas yang mendukung perjalanan Anda.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(0,0,0,0.2)" }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => window.location.href = '/login'}
                  className="bg-gradient-to-r from-yellow-400 to-amber-500 text-white px-10 py-4 rounded-full font-bold text-lg shadow-xl hover:shadow-2xl transition-all"
                >
                  Mulai Sekarang
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => document.getElementById('apa-itu-wellnezt')?.scrollIntoView({ behavior: 'smooth' })}
                  className="bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-white/20 transition-all"
                >
                  Pelajari Lebih
                </motion.button>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="flex justify-center items-center relative min-h-[500px] overflow-visible"
            >
              <motion.img
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                src={piring}
                alt="piring"
                className="w-[450px] h-[450px] object-contain relative z-10"
              />
              
              <motion.img
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                src={maskot6}
                alt="maskot6"
                className="absolute -top-16 -right-20 lg:-right-48 w-80 h-96 object-contain z-0"
              />

              <motion.img
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                src={maskot5}
                alt="maskot5"
                className="absolute -bottom-20 -left-35 lg:-left-45 w-72 h-80 object-contain z-0"
              />
            </motion.div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 w-full">
          <svg viewBox="0 0 1440 120" className="w-full h-24">
            <path className="fill-white dark:fill-gray-900" d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"></path>
          </svg>
        </div>
      </section>

      <section id="apa-itu-wellnezt" className="relative py-24 overflow-hidden bg-white">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h1 className="text-5xl font-bold mt-4 mb-6 text-gray-800">
                Apa itu <span className="text-emerald-600">Well</span><span className="text-yellow-500">Nezt</span>?
              </h1>
              <div className="w-24 h-1.5 bg-yellow-500 rounded-full mb-6"></div>
              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                WellNezt adalah platform nutrisi cerdas berbasis AI yang dirancang untuk membantu Anda memahami, melacak, dan mengoptimalkan asupan gizi harian secara personal.
              </p>
              <p className="text-gray-700 text-lg leading-relaxed">
                Dengan fitur pelacakan real-time, rekomendasi makanan sesuai kebutuhan tubuh, serta komunitas yang suportif, WellNezt menjadi pendamping setia dalam perjalanan hidup sehat Anda—dari target berat badan hingga keseimbangan nutrisi jangka panjang.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 gap-6">
              {cards.map((card, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="bg-white/95 backdrop-blur-sm rounded-2xl p-5 shadow-lg hover:shadow-2xl transition-all border border-gray-100"
                >
                  <div>
                    <h2 className="text-sm font-semibold text-gray-800 mb-1">{card.title}</h2>
                    <p className="text-gray-600 text-sm leading-relaxed">{card.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-32 overflow-hidden" style={{ background: 'radial-gradient(ellipse 50.00% 50.00% at 50.00% 50.00%, #98F9B6 0%, #32794F 100%)' }}>
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute top-10 left-20 w-96 h-96 bg-white rounded-full blur-3xl"
        />
        <motion.div
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 12, repeat: Infinity }}
          className="absolute bottom-10 right-20 w-[500px] h-[500px] bg-yellow-300 rounded-full blur-3xl"
        />

        <div className="absolute inset-0">
          <motion.img
            src={ic_banana}
            alt="banana"
            animate={{ 
              y: [0, -30, 0],
              rotate: [0, 10, 0]
            }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-20 left-[10%] w-16 h-16 object-contain"
          />

          <motion.img
            src={ic_dragon_fruit}
            alt="dragon fruit"
            animate={{ 
              y: [0, -40, 0],
              rotate: [0, -10, 0]
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            className="absolute bottom-63 right-[8%] w-15 h-15 object-contain"
          />

          <motion.img
            src={ic_pear}
            alt="pear"
            animate={{ 
              y: [0, -25, 0],
              rotate: [0, 15, 0]
            }}
            transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-32 left-[20%] w-16 h-16 object-contain"
          />

          <motion.img
            src={ic_star_fruit}
            alt="star fruit"
            animate={{ 
              y: [0, -35, 0],
              rotate: [0, -15, 0]
            }}
            transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
            className="absolute bottom-24 right-[18%] w-15 h-15 object-contain"
          />

          <motion.img
            src={ic_tomato}
            alt="tomato"
            animate={{ 
              y: [0, -30, 0],
              x: [0, -15, 0]
            }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
            className="absolute top-28 left-[38%] w-14 h-14 object-contain"
          />

          {/* <motion.img
            src={ic_watermelon}
            alt="watermelon"
            animate={{ 
              y: [0, -30, 0],
              x: [0, -10, 0]
            }}
            transition={{ duration: 5.8, repeat: Infinity, ease: "easeInOut", delay: 2.5 }}
            className="absolute top-52 right-[40%] w-14 h-14 object-contain"
          /> */}

          {/* <motion.img
            src={ic_banana}
            alt="banana"
            animate={{ 
              y: [0, -28, 0],
              rotate: [0, 8, 0]
            }}
            transition={{ duration: 6.2, repeat: Infinity, ease: "easeInOut", delay: 3 }}
            className="absolute bottom-70 right-[5%] w-15 h-15 object-contain"
          /> */}

          <motion.img
            src={ic_pear}
            alt="pear"
            animate={{ 
              y: [0, -32, 0],
              rotate: [0, -12, 0]
            }}
            transition={{ duration: 5.3, repeat: Infinity, ease: "easeInOut", delay: 3.5 }}
            className="absolute bottom-52 right-[35%] w-14 h-14 object-contain"
          />

          {/* <motion.img
            src={ic_dragon_fruit}
            alt="dragon fruit"
            animate={{ 
              y: [0, -22, 0],
              x: [0, 8, 0]
            }}
            transition={{ duration: 6.8, repeat: Infinity, ease: "easeInOut", delay: 4 }}
            className="absolute bottom-70 left-[20%] w-16 h-16 object-contain"
          /> */}

          <motion.img
            src={ic_watermelon}
            alt="watermelon"
            animate={{ 
              y: [0, -26, 0],
              rotate: [0, 10, 0]
            }}
            transition={{ duration: 5.6, repeat: Infinity, ease: "easeInOut", delay: 4.5 }}
            className="absolute bottom-10 right-[50%] w-14 h-14 object-contain"
          />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Nutrisi Seimbang,
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-amber-400">
                Hidup Lebih Berkualitas
              </span>
            </h2>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Mulai perjalanan sehat Anda dengan panduan nutrisi yang tepat dan mudah diikuti
            </p>
          </motion.div>
        </div>
      </section>

    <section className="py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold mt-4 mb-4">
            <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Fitur Utama</span> Kami
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Semua fitur yang Anda butuhkan untuk hidup lebih sehat dan mencapai target nutrisi Anda
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              viewport={{ once: true }}
              whileHover={{ y: -12, scale: 1.03 }}
              className="bg-white rounded-3xl p-8 cursor-pointer transition-all border-2 border-gray-100 hover:border-emerald-300 hover:shadow-2xl"
            >
              <h3 className="text-2xl font-bold text-gray-800 mb-4">{service.title}</h3>
              <p className="text-gray-600 leading-relaxed mb-6">{service.description}</p>
              <motion.div
                whileHover={{ x: 5 }}
                className="text-emerald-600 font-bold text-sm flex items-center gap-2"
              >
                Pelajari Lebih <span className="text-xl">→</span>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    <section 
      className="relative py-24 overflow-hidden" 
      style={{ background: 'radial-gradient( #98F9B6 0%, #32794F 100%)' }}>
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-0 right-0 w-96 h-96 bg-emerald-300 rounded-full blur-3xl"
        />
        
        <div className="max-w-5xl mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h4 className="text-gray-700 text-xl mb-6">
              Raih berat badan ideal dengan pola makan tepat dan terukur.
            </h4>
            <h2 className="text-4xl md:text-5xl text-gray-800 font-light mb-8 leading-relaxed">
              <span className="font-bold text-emerald-600">Rencanakan</span>, lacak dan capai
              <span className="font-bold text-emerald-600"> target </span>berat badan Anda
              <span className="font-bold text-emerald-600"> hingga ideal</span>
            </h2>
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(0,0,0,0.2)" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.location.href = '/login'}
              className="bg-gradient-to-r from-yellow-400 to-amber-500 text-white px-12 py-5 rounded-full font-bold text-lg shadow-2xl"
            >
              Mulai Sekarang
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* TEAM SECTION */}
      <section className="bg-gradient-to-br from-gray-50 to-gray-100 py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-6">
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
                <motion.div
                  className="bg-white rounded-3xl overflow-hidden shadow-2xl border-2 border-gray-300"
                  whileHover={{ boxShadow: '0 30px 60px rgba(34, 197, 94, 0.15)' }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
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

            <div className="flex justify-between items-center mt-8">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handlePrev}
                className="bg-yellow-400 hover:bg-yellow-500 text-white p-3 rounded-full shadow-lg transition-colors"
              >
                <ChevronLeft size={24} />
              </motion.button>

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