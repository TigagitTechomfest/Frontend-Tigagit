import Card from '../common/Card';

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Fitness Enthusiast',
      avatar: '👩‍💼',
      quote: 'Aplikasi ini membantu saya mencapai target berat badan ideal. Interface yang mudah digunakan dan fitur yang lengkap!',
      rating: 5,
    },
    {
      name: 'Michael Chen',
      role: 'Health Coach',
      avatar: '👨‍💻',
      quote: 'Sebagai health coach, saya merekomendasikan aplikasi ini kepada semua klien saya. Data yang akurat dan analisis yang detail.',
      rating: 5,
    },
    {
      name: 'Emily Rodriguez',
      role: 'Nutritionist',
      avatar: '👩‍⚕️',
      quote: 'Tool yang sempurna untuk tracking nutrisi. Grafik dan laporan yang membantu saya memberikan rekomendasi yang tepat.',
      rating: 5,
    },
  ];

  return (
    <section className="py-30 bg-gradient-to-br from-[#F5F7FA] to-white">
      <div className="max-w-6xl mx-auto px-6 lg:px-10">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-[#1A202C] mb-4">
            Kata Pengguna
            <span className="block text-[#4ECDC4]">Kami</span>
          </h2>
          <p className="text-xl text-[#8E9AAF] max-w-2xl mx-auto">
            Dengarkan apa kata mereka yang telah menggunakan aplikasi kami
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              variant="elevated"
              className="text-center hover:scale-105 transition-transform duration-300"
            >
              <div className="text-6xl mb-4">{testimonial.avatar}</div>
              <div className="text-[#FFD3A5] text-xl mb-4">
                {'⭐'.repeat(testimonial.rating)}
              </div>
              <p className="text-lg text-[#8E9AAF] italic mb-6 leading-relaxed">
                "{testimonial.quote}"
              </p>
              <div>
                <p className="font-semibold text-[#1A202C] text-xl mb-1">
                  {testimonial.name}
                </p>
                <p className="text-[#8E9AAF]">{testimonial.role}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;

