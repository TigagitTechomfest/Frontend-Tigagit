import Card from '../common/Card';

const FeaturesSection = () => {
  const features = [
    {
      icon: '📊',
      title: 'Track Nutrition',
      description: 'Pantau asupan nutrisi harian Anda dengan mudah. Catat setiap makanan dan dapatkan analisis lengkap kalori, protein, karbohidrat, dan lemak.',
    },
    {
      icon: '📈',
      title: 'View Progress',
      description: 'Lihat perkembangan kesehatan Anda dengan grafik interaktif. Pantau berat badan, asupan kalori, dan capai target Anda.',
    },
    {
      icon: '🍎',
      title: 'Food Database',
      description: 'Akses database makanan lengkap dengan informasi nutrisi akurat. Cari makanan favorit Anda dengan cepat dan mudah.',
    },
    {
      icon: '🎯',
      title: 'Set Goals',
      description: 'Tetapkan target kesehatan yang realistis. Atur target kalori harian, berat badan ideal, dan dapatkan motivasi untuk mencapainya.',
    },
    {
      icon: '📱',
      title: 'Mobile Friendly',
      description: 'Akses aplikasi di mana saja dan kapan saja. Desain responsif yang sempurna untuk desktop, tablet, dan smartphone.',
    },
    {
      icon: '🔒',
      title: 'Privacy First',
      description: 'Data kesehatan Anda aman dan terlindungi. Kami menggunakan enkripsi tingkat tinggi untuk melindungi privasi Anda.',
    },
  ];

  return (
    <section className="py-30 bg-white">
      <div className="max-w-6xl mx-auto px-6 lg:px-10">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-[#1A202C] mb-4">
            Fitur Lengkap untuk
            <span className="block text-[#4ECDC4]">Kesehatan Anda</span>
          </h2>
          <p className="text-xl text-[#8E9AAF] max-w-2xl mx-auto">
            Semua yang Anda butuhkan untuk mengelola kesehatan dan nutrisi dalam satu aplikasi
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              variant="elevated"
              className="text-center hover:scale-105 transition-transform duration-300 cursor-pointer"
            >
              <div className="text-6xl mb-6">{feature.icon}</div>
              <h3 className="text-2xl font-semibold text-[#1A202C] mb-4">
                {feature.title}
              </h3>
              <p className="text-lg text-[#8E9AAF] leading-relaxed">
                {feature.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;

