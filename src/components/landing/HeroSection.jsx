import { Link } from 'react-router-dom';
import Button from '../common/Button';

const HeroSection = () => {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#A8E6CF] via-[#4ECDC4] to-[#5F9EA0] relative overflow-hidden pt-20">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-white rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-6xl mx-auto px-6 lg:px-10 py-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text Content */}
          <div className="text-center lg:text-left">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-[#1A202C] mb-6 leading-tight">
              Kelola Kesehatan
              <span className="block text-[#4ECDC4]">Anda dengan Mudah</span>
            </h1>
            <p className="text-xl md:text-2xl text-[#2D3748] mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Pantau asupan nutrisi harian, capai target kesehatan, dan hidup lebih sehat dengan aplikasi yang dirancang khusus untuk Anda.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link to="/register">
                <Button 
                  variant="primary" 
                  size="large"
                  className="bg-white text-[#4ECDC4] hover:bg-[#F5F7FA] shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
                >
                  Mulai Sekarang
                </Button>
              </Link>
              <Link to="/login">
                <Button 
                  variant="outline" 
                  size="large"
                  className="border-2 border-white text-white hover:bg-white hover:text-[#4ECDC4]"
                >
                  Masuk
                </Button>
              </Link>
            </div>
          </div>

          {/* Right: Illustration/Mockup */}
          <div className="relative">
            <div className="relative z-10">
              {/* Dashboard Mockup Placeholder */}
              <div className="bg-white rounded-3xl shadow-2xl p-8 transform rotate-2 hover:rotate-0 transition-transform duration-300">
                <div className="space-y-4">
                  {/* Mockup Header */}
                  <div className="flex items-center justify-between pb-4 border-b">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-[#4ECDC4] to-[#5F9EA0] rounded-lg"></div>
                      <span className="font-semibold text-[#1A202C]">Dashboard</span>
                    </div>
                  </div>
                  
                  {/* Mockup Stats */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gradient-to-br from-[#A8E6CF] to-[#4ECDC4] rounded-xl p-4 text-white">
                      <p className="text-sm opacity-90">Kalori</p>
                      <p className="text-2xl font-bold">1,850</p>
                    </div>
                    <div className="bg-gradient-to-br from-[#FFD3A5] to-[#FFEAA7] rounded-xl p-4 text-white">
                      <p className="text-sm opacity-90">Protein</p>
                      <p className="text-2xl font-bold">120g</p>
                    </div>
                  </div>
                  
                  {/* Mockup Chart */}
                  <div className="h-32 bg-gradient-to-br from-[#F5F7FA] to-white rounded-xl flex items-end justify-around p-4">
                    {[60, 80, 45, 90, 70, 85].map((height, i) => (
                      <div
                        key={i}
                        className="bg-gradient-to-t from-[#4ECDC4] to-[#A8E6CF] rounded-t"
                        style={{ width: '12%', height: `${height}%` }}
                      ></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Floating elements */}
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-[#FFD3A5] rounded-full opacity-60 blur-xl animate-pulse"></div>
            <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-[#FFEAA7] rounded-full opacity-60 blur-xl animate-pulse delay-300"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

