import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Button from '../common/Button';
import fruithand from '../../assets/images/fruithand.png';
import women from '../../assets/images/women.png';
import babyImage from '../../assets/images/baby.png';
import brokoli from '../../assets/images/brokoli.png';

const HeroSection = () => {
  const [currentTeamIndex, setCurrentTeamIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  const teamMembers = [
    {
      id: 1,
      name: 'Narayana Cokro K.A',
      role: 'Founder & Nutritionist',
      bio: 'Ahli gizi bersertifikat dengan 10+ tahun pengalaman membantu ribuan orang mencapai gaya hidup sehat.',
      image: babyImage
    },
    {
      id: 2,
      name: 'Narayana Cokro K.A',
      role: 'Product Manager',
      bio: 'Ahli gizi bersertifikat dengan 10+ tahun pengalaman membantu ribuan orang mencapai gaya hidup sehat.',
      image: babyImage
    },
    {
      id: 3,
      name: 'Narayana Cokro K.A',
      role: 'Head of Community',
      bio: 'Ahli gizi bersertifikat dengan 10+ tahun pengalaman membantu ribuan orang mencapai gaya hidup sehat.',
      image: babyImage
    }
  ];

  const features = [
    { stat: '39%', description: 'Pengguna mencapai target nutrisi' },
    { stat: '88%', description: 'Konsistensi tracking nutrisi' },
    { stat: '82%', description: 'Kepuasan pengguna terhadap fitur' }
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
  useEffect(() => {
    if (!isAutoPlay) return;
    
    const interval = setInterval(() => {
      setCurrentTeamIndex((prev) => (prev + 1) % teamMembers.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlay, teamMembers.length]);

  const handlePrev = () => {
    setIsAutoPlay(false);
    setCurrentTeamIndex((prev) => (prev - 1 + teamMembers.length) % teamMembers.length);
  };

  const handleNext = () => {
    setIsAutoPlay(false);
    setCurrentTeamIndex((prev) => (prev + 1) % teamMembers.length);
  };

  const handleDotClick = (index) => {
    setIsAutoPlay(false);
    setCurrentTeamIndex(index);
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
                  <Button
                    variant="primary"
                    size="large"
                    className="bg-yellow-400 text-gray-800 hover:bg-yellow-500 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
                  >
                    Mulai Sekarang
                  </Button>
                </Link>
              </div>
            </div>

            <div className="flex justify-center">
              <img style={{ width: '100%', height: '100%' }} src={brokoli} alt="brokoli" />
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION - APa ITU NUTRIGO */}
      <section>
        <img style={{ width: '100%', height: '100%' }} src={fruithand} alt="fruithand" />
      </section>
      <section className="w-full bg-white px-6 py-16 md:py-24" style={{ width: '100%', height: '100%', background: '#F0B639' }} >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl text-white mb-4">
              Apa itu <span className="text-green-900">Nutrigo</span>
            </h1>
            <p className="text-white text-base md:text-lg max-w-2xl mx-auto">
              Platform nutrisi terpadu yang membantu Anda mencapai keseimbangan gizi optimal dengan fitur tracking, resep, dan komunitas support.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <div key={idx} className=" text-center my-8">
                <h2 className="text-5xl md:text-6xl  text-white mb-2">{feature.stat}</h2>
                <h3 className="text-white text-lg md:text-xl  ">{feature.description}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FITUR UTAMA SECTION */}
      <section className="w-full bg-[#005F26] px-4 py-16 md:py-24">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl text-white mb-4">Fitur Utama Kami</h1>
            <p className="text-white text-base">Semua fitur yang Anda butuhkan untuk hidup lebih sehat</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, idx) => (
              <div key={idx} className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition duration-300">
                <div className="w-full h-48 bg-gray-200 overflow-hidden">
                  <img src={service.avatar} alt={service.title} className="w-full h-full object-cover" />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-3">{service.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">{service.description}</p>
                  <button className="text-green-500 font-semibold text-sm hover:text-green-600 transition">
                    Pelajari Lebih →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BOOST CONFIDENCE SECTION */}
      <section className="bg-white py-16 md:py-24 text-center">
        <div className="max-w-3xl mx-auto px-6">
          <p className="text-gray-700 text-base md:text-lg mb-4">
            Invest in yourself and
          </p>
          <h2 className="text-3xl md:text-4xl mb-8">
            boost your <span className="text-[#005F26] font-bold">Nutritions, body</span> and <span className="text-[#005F26] font-bold">confidence</span>
          </h2>
          <Link to="/register">
            <button className="bg-yellow-400 text-gray-800 px-8 py-3 rounded-lg hover:bg-yellow-500 transition-colors font-semibold">
              Start Now
            </button>
          </Link>
        </div>
      </section>

      {/* TEAM SECTION - GET TO KNOW TIGAGIT (CAROUSEL) */}
      <section className="bg-yellow-400 py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-white text-3xl md:text-4xl text-center mb-12">
            Get to know <span className="font-bold">TIGAGIT</span>
          </h2>

          <div className="bg-white rounded-3xl p-8 md:p-12 flex flex-col md:flex-row gap-8 items-center">
            {/* Left - Text */}
            <div className="flex-1">
              <h3 className="text-2xl md:text-3xl text-[#005F26] mb-2">
                {currentMember.name}
              </h3>
              <p className="text-sm text-gray-600 mb-4">{currentMember.role}</p>
              <p className="text-gray-700 leading-relaxed">
                {currentMember.bio}
              </p>
            </div>

            {/* Right - Image */}
            <div className="flex-1">
              <img
                src={currentMember.image}
                alt={currentMember.name}
                className="w-full h-auto rounded-2xl object-cover"
              />
            </div>
          </div>

          {/* Dots Navigation */}
          <div className="flex justify-center gap-3 mt-8">
            {teamMembers.map((_, index) => (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                className={`w-3 h-3 rounded-full transition-colors ${index === currentTeamIndex ? 'bg-white' : 'bg-white/50'
                  }`}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HeroSection;