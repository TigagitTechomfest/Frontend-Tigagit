import Card from '../common/Card';

const WhyChooseUsSection = () => {
  const reasons = [
    {
      icon: '✨',
      title: 'Mudah Digunakan',
      description: 'Interface yang intuitif dan mudah dipahami, cocok untuk semua kalangan.',
    },
    {
      icon: '🎯',
      title: 'Akurat & Terpercaya',
      description: 'Data nutrisi yang akurat dari database makanan terpercaya.',
    },
    {
      icon: '📊',
      title: 'Statistik Lengkap',
      description: 'Analisis mendalam dengan grafik dan laporan yang detail.',
    },
    {
      icon: '💪',
      title: 'Dukungan 24/7',
      description: 'Tim support siap membantu Anda kapan saja dibutuhkan.',
    },
  ];

  const stats = [
    { number: '100K+', label: 'Pengguna Aktif' },
    { number: '4.8', label: 'Rating Aplikasi' },
    { number: '24/7', label: 'Dukungan' },
  ];

  return (
    <section className="py-30 bg-gradient-to-br from-[#F5F7FA] to-white">
      <div className="max-w-6xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Reasons */}
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-[#1A202C] mb-6">
              Mengapa Pilih
              <span className="block text-[#4ECDC4]">Kami?</span>
            </h2>
            <div className="space-y-6">
              {reasons.map((reason, index) => (
                <div key={index} className="flex gap-4">
                  <div className="text-4xl flex-shrink-0">{reason.icon}</div>
                  <div>
                    <h3 className="text-xl font-semibold text-[#1A202C] mb-2">
                      {reason.title}
                    </h3>
                    <p className="text-lg text-[#8E9AAF]">
                      {reason.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-[#A8E6CF] to-[#4ECDC4] rounded-2xl p-8 text-center text-white transform hover:scale-105 transition-transform duration-300"
              >
                <div className="text-5xl font-bold mb-2">{stat.number}</div>
                <div className="text-lg opacity-90">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;

