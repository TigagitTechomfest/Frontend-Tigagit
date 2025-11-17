const DashboardPreviewSection = () => {
  return (
    <section className="py-30 bg-white">
      <div className="max-w-6xl mx-auto px-6 lg:px-10">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-[#1A202C] mb-4">
            Lihat Dashboard
            <span className="block text-[#4ECDC4]">Anda</span>
          </h2>
          <p className="text-xl text-[#8E9AAF] max-w-2xl mx-auto">
            Interface yang modern dan mudah digunakan untuk mengelola kesehatan Anda
          </p>
        </div>

        <div className="relative">
          {/* Dashboard Mockup */}
          <div className="bg-gradient-to-br from-[#F5F7FA] to-white rounded-3xl shadow-2xl p-8 lg:p-12 overflow-hidden">
            <div className="space-y-6">
              {/* Header */}
              <div className="flex items-center justify-between pb-6 border-b border-gray-200">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#4ECDC4] to-[#5F9EA0] rounded-xl flex items-center justify-center">
                    <span className="text-white text-xl font-bold">H</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#1A202C]">Dashboard</h3>
                    <p className="text-sm text-[#8E9AAF]">Ringkasan nutrisi harian</p>
                  </div>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { label: 'Kalori', value: '1,850', color: 'from-[#4ECDC4] to-[#5F9EA0]', icon: '🔥' },
                  { label: 'Protein', value: '120g', color: 'from-[#48BB78] to-[#38A169]', icon: '💪' },
                  { label: 'Carbs', value: '200g', color: 'from-[#F6AD55] to-[#ED8936]', icon: '🍞' },
                  { label: 'Fat', value: '65g', color: 'from-[#F56565] to-[#E53E3E]', icon: '🥑' },
                ].map((stat, i) => (
                  <div
                    key={i}
                    className={`bg-gradient-to-br ${stat.color} rounded-xl p-6 text-white`}
                  >
                    <div className="text-3xl mb-2">{stat.icon}</div>
                    <div className="text-2xl font-bold mb-1">{stat.value}</div>
                    <div className="text-sm opacity-90">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* Chart */}
              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <h4 className="text-lg font-semibold text-[#1A202C] mb-4">Progres 7 Hari Terakhir</h4>
                <div className="h-48 flex items-end justify-around gap-2">
                  {[60, 75, 55, 85, 70, 90, 80].map((height, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center">
                      <div
                        className="w-full bg-gradient-to-t from-[#4ECDC4] to-[#A8E6CF] rounded-t transition-all hover:opacity-80"
                        style={{ height: `${height}%` }}
                      ></div>
                      <span className="text-xs text-[#8E9AAF] mt-2">
                        {['S', 'S', 'R', 'K', 'J', 'S', 'M'][i]}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Food List */}
              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <h4 className="text-lg font-semibold text-[#1A202C] mb-4">Makanan Hari Ini</h4>
                <div className="space-y-3">
                  {['Nasi Goreng', 'Ayam Bakar', 'Sayur Lodeh'].map((food, i) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-[#F5F7FA] rounded-lg">
                      <span className="text-[#1A202C] font-medium">{food}</span>
                      <span className="text-[#8E9AAF]">250 kkal</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Floating highlight badges */}
          <div className="absolute -top-4 -right-4 bg-white rounded-full p-4 shadow-lg hidden lg:block">
            <div className="text-sm font-semibold text-[#4ECDC4]">Real-time Tracking</div>
          </div>
          <div className="absolute -bottom-4 -left-4 bg-white rounded-full p-4 shadow-lg hidden lg:block">
            <div className="text-sm font-semibold text-[#4ECDC4]">Smart Analytics</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DashboardPreviewSection;

