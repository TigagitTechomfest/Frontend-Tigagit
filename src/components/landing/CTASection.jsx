import { Link } from 'react-router-dom';
import Button from '../common/Button';

const CTASection = () => {
  return (
    <section className="py-30 bg-gradient-to-br from-[#4ECDC4] via-[#A8E6CF] to-[#5F9EA0] relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10">
        <div className="absolute top-10 right-20 w-64 h-64 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-20 w-80 h-80 bg-white rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-4xl mx-auto px-6 lg:px-10 text-center relative z-10">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
          Siap Memulai Perjalanan
          <span className="block">Kesehatan Anda?</span>
        </h2>
        <p className="text-xl md:text-2xl text-white opacity-90 mb-10 max-w-2xl mx-auto">
          Bergabunglah dengan ribuan pengguna yang telah mencapai tujuan kesehatan mereka
        </p>
        <Link to="/register">
          <Button
            variant="primary"
            size="large"
            className="bg-white text-[#4ECDC4] hover:bg-[#F5F7FA] shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all text-lg px-12 py-5"
          >
            Mulai Sekarang - Gratis
          </Button>
        </Link>
        <p className="text-white opacity-75 mt-6 text-sm">
          Tidak perlu kartu kredit • Setup dalam 2 menit
        </p>
      </div>
    </section>
  );
};

export default CTASection;

