// ========== BAGIAN YANG BERUBAH ==========

import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import useDiaryStore from '../store/diaryStore';
import useUserStore from '../store/userStore';
import useAiFeedbackStore from '../store/aifeedbackStore';
import useProgressStore from '../store/progressStore'; // TAMBAH INI
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import AiFeedbackCard from '../components/common/AiFeedbackCard';

const DashboardPage = () => {
  const { diaryEntries, selectedDate, fetchDiary, isLoading } = useDiaryStore();
  const { profile, fetchProfile } = useUserStore();
  const { fetchFeedback } = useAiFeedbackStore();
  const { dailyProgress, fetchDailyProgress } = useProgressStore(); // TAMBAH INI
  const [animateCards, setAnimateCards] = useState(false);

  useEffect(() => {
    fetchDiary(selectedDate);
    fetchProfile();
    fetchFeedback(selectedDate);
    fetchDailyProgress(selectedDate); // TAMBAH INI
    setAnimateCards(true);
  }, [selectedDate, fetchDiary, fetchProfile, fetchFeedback, fetchDailyProgress]);

  // ========== UBAH BAGIAN INI ==========
  // Sebelumnya: const dailyTotals = useMemo(...)
  // Sekarang: ambil dari dailyProgress.intake
  const dailyTotals = useMemo(() => {
    if (dailyProgress) {
      return {
        calories: dailyProgress.intake.calories || 0,
        protein: dailyProgress.intake.protein || 0,
        carbs: dailyProgress.intake.carbs || 0,
        fat: dailyProgress.intake.fat || 0,
      };
    }

    // Fallback ke hitung manual jika dailyProgress belum tersedia
    return diaryEntries.reduce(
      (acc, entry) => {
        acc.calories += entry.calories || 0;
        acc.protein += entry.protein || 0;
        acc.carbs += entry.carbs || 0;
        acc.fat += entry.fat || 0;
        return acc;
      },
      { calories: 0, protein: 0, carbs: 0, fat: 0 }
    );
  }, [dailyProgress, diaryEntries]);

  // ========== UBAH BAGIAN INI ==========
  // Sebelumnya: const targetCalories = profile?.targetCalories || 2500;
  // Sekarang: ambil dari dailyProgress.target
  const targetCalories = dailyProgress?.target?.calories || profile?.targetCalories || 2500;
  const targetProtein = dailyProgress?.target?.protein || 150;
  const targetCarbs = dailyProgress?.target?.carbs || 250;
  const targetFat = dailyProgress?.target?.fat || 65;

  const caloriesProgress = (dailyTotals.calories / targetCalories) * 100;
  const proteinProgress = (dailyTotals.protein / targetProtein) * 100;
  const carbsProgress = (dailyTotals.carbs / targetCarbs) * 100;
  const fatProgress = (dailyTotals.fat / targetFat) * 100;

  // Group entries by meal type
  const meals = {
    breakfast: diaryEntries.filter((e) => e.meal_type === 'breakfast'),
    lunch: diaryEntries.filter((e) => e.meal_type === 'lunch'),
    dinner: diaryEntries.filter((e) => e.meal_type === 'dinner'),
    snack: diaryEntries.filter((e) => e.meal_type === 'snack'),
  };

  const totalMeals = diaryEntries.length;
  const remainingCalories = Math.max(0, targetCalories - dailyTotals.calories);
  const calorieStatus = caloriesProgress > 100 ? 'Berlebih' : 'Dalam Target';

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 p-6 pt-24">
      <div className="max-w-7xl mx-auto w-full">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-2">Pantau ringkasan nutrisi Anda hari ini</p>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Today's Summary - Left Side */}
          <div className={`lg:col-span-2 transition-all duration-700 ${animateCards ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <Card className="bg-white hover:shadow-xl transition-shadow duration-300">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Left: Summary Info */}
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Ringkasan Hari Ini</h2>

                    <div className="space-y-4">
                      <div className="flex justify-between items-center p-3 rounded-lg hover:bg-gray-50 transition-colors">
                        <span className="text-gray-700 font-medium">Target Kalori</span>
                        <span className="text-xl font-bold text-emerald-600">{targetCalories} kkal</span>
                      </div>
                      <div className="flex justify-between items-center p-3 rounded-lg hover:bg-gray-50 transition-colors">
                        <span className="text-gray-700 font-medium">Kalori Tercatat</span>
                        <span className="text-xl font-bold text-gray-900">{Math.round(dailyTotals.calories)} kkal</span>
                      </div>
                      <div className="flex justify-between items-center p-3 rounded-lg bg-emerald-50 border border-emerald-200">
                        <span className="text-gray-700 font-medium">Sisa Kalori</span>
                        <span className="text-xl font-bold text-emerald-600">{Math.round(remainingCalories)} kkal</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right: Circular Progress */}
                <div className="flex items-center justify-center">
                  <div className="relative w-44 h-44">
                    <svg className="w-full h-full transform -rotate-90 drop-shadow-lg" viewBox="0 0 160 160">
                      {/* Background circle */}
                      <circle
                        cx="80"
                        cy="80"
                        r="70"
                        fill="none"
                        stroke="#e5e7eb"
                        strokeWidth="12"
                      />
                      {/* Progress circle */}
                      <circle
                        cx="80"
                        cy="80"
                        r="70"
                        fill="none"
                        stroke="#059669"
                        strokeWidth="12"
                        strokeDasharray={`${(caloriesProgress / 100) * 440} 440`}
                        strokeLinecap="round"
                        className="transition-all duration-700"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <p className="text-5xl font-bold text-gray-900">
                        {Math.round(dailyTotals.calories)}
                      </p>
                      <p className="text-sm text-gray-600 font-medium">kkal</p>
                      <p className={`text-xs font-semibold mt-2 ${caloriesProgress > 100 ? 'text-red-600' : 'text-emerald-600'}`}>
                        {calorieStatus}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Macro Breakdown */}
              <div className="mt-8 pt-8 border-t border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Breakdown Makronutrisi</h3>

                <div className="space-y-4 p-5 bg-gradient-to-br from-white to-emerald-50 rounded-xl border border-green-200">
                  {/* Protein - Red/Orange */}
                  <div className="flex items-center gap-4 hover:scale-105 transition-transform duration-300">
                    <span className="font-semibold text-gray-900 w-20">Protein</span>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-red-200 rounded-full h-3 overflow-hidden">
                          <div
                            className="bg-gradient-to-r from-red-500 to-orange-500 h-3 rounded-full transition-all duration-500"
                            style={{ width: `${Math.min(proteinProgress, 100)}%` }}
                          ></div>
                        </div>
                        <span className="font-semibold text-gray-900 w-14 text-right">
                          {dailyTotals.protein.toFixed(0)}g
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Carbs - Blue/Purple */}
                  <div className="flex items-center gap-4 hover:scale-105 transition-transform duration-300">
                    <span className="font-semibold text-gray-900 w-20">Karbo</span>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-blue-200 rounded-full h-3 overflow-hidden">
                          <div
                            className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-500"
                            style={{ width: `${Math.min(carbsProgress, 100)}%` }}
                          ></div>
                        </div>
                        <span className="font-semibold text-gray-900 w-14 text-right">
                          {dailyTotals.carbs.toFixed(0)}g
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Fat - Yellow/Amber */}
                  <div className="flex items-center gap-4 hover:scale-105 transition-transform duration-300">
                    <span className="font-semibold text-gray-900 w-20">Lemak</span>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-yellow-200 rounded-full h-3 overflow-hidden">
                          <div
                            className="bg-gradient-to-r from-yellow-500 to-amber-500 h-3 rounded-full transition-all duration-500"
                            style={{ width: `${Math.min(fatProgress, 100)}%` }}
                          ></div>
                        </div>
                        <span className="font-semibold text-gray-900 w-14 text-right">
                          {dailyTotals.fat.toFixed(0)}g
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Quick Stats & Actions - Right Side */}
          <div className={`space-y-4 transition-all duration-700 delay-100 ${animateCards ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <Card className="bg-gradient-to-br from-emerald-500 to-teal-600 text-white hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="text-center">
                <p className="text-sm font-semibold opacity-90">Total Makanan Hari Ini</p>
                <p className="text-4xl font-bold mt-2">{totalMeals}</p>
                <p className="text-sm opacity-75 mt-1">item tercatat</p>
              </div>
            </Card>

            <Card className="bg-white hover:shadow-lg transition-all duration-300">
              <div className="space-y-3">
                <h3 className="font-bold text-gray-900 flex items-center gap-2">
                  <span className="text-lg">📋</span> Aksi Cepat
                </h3>
                <Link to="/food-diary" className="block">
                  <button className="w-full px-4 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95">
                    + Tambah Makanan
                  </button>
                </Link>
                <Link to="/food-diary" className="block">
                  <button className="w-full px-4 py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-all duration-300 transform hover:scale-105 active:scale-95">
                    Lihat Jurnal Lengkap
                  </button>
                </Link>
              </div>
            </Card>
            <Link to="/progress">
              <button className="w-full px-4 py-3 bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95">
                📊 Lihat Progres
              </button>
            </Link>
          </div>
        </div>

        {/* AI Feedback Section */}
        <div className={`mb-8 transition-all duration-700 delay-100 ${animateCards ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <AiFeedbackCard date={selectedDate} />
        </div>

        {/* Food Preview Section */}
        {diaryEntries.length > 0 && (
          <div className={`transition-all duration-700 delay-200 ${animateCards ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <Card className="hover:shadow-lg transition-all duration-300">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900">📌 Makanan Hari Ini</h3>
                <Link to="/food-diary">
                  <button className="text-emerald-600 hover:text-emerald-700 font-semibold text-sm hover:underline transition-colors">
                    Lihat Semua →
                  </button>
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {Object.entries(meals).map(([mealType, mealEntries], idx) => (
                  <div
                    key={mealType}
                    className={`p-4 bg-gradient-to-br ${mealType === 'breakfast'
                      ? 'from-emerald-50 to-emerald-100 border-l-4 border-emerald-500'
                      : mealType === 'lunch'
                        ? 'from-teal-50 to-teal-100 border-l-4 border-teal-500'
                        : mealType === 'dinner'
                          ? 'from-cyan-50 to-cyan-100 border-l-4 border-cyan-500'
                          : 'from-emerald-50 to-emerald-100 border-l-4 border-emerald-500'
                      } rounded-lg hover:shadow-md transition-all duration-300 transform hover:scale-105 animate-slide-in`}
                    style={{ animationDelay: `${idx * 100}ms` }}
                  >
                    <div className="mb-3">
                      <p className="font-bold text-gray-900">
                        {mealType === 'breakfast'
                          ? '🍳 Sarapan'
                          : mealType === 'lunch'
                            ? '🍽️ Makan Siang'
                            : mealType === 'dinner'
                              ? '🍴 Makan Malam'
                              : '🍪 Cemilan'}
                      </p>
                      <p className="text-2xl font-bold text-gray-800">{mealEntries.length}</p>
                    </div>

                    {mealEntries.length > 0 ? (
                      <div className="space-y-2 max-h-32 overflow-y-auto">
                        {mealEntries.slice(0, 3).map((entry, idx) => (
                          <div key={idx} className="text-xs bg-white/70 rounded p-2">
                            <p className="font-medium text-gray-900 truncate">{entry.food_name}</p>
                            <p className="text-gray-600">{Math.round(entry.calories)} kkal</p>
                          </div>
                        ))}
                        {mealEntries.length > 3 && (
                          <p className="text-xs text-gray-600 font-semibold pt-1">
                            +{mealEntries.length - 3} lagi
                          </p>
                        )}
                      </div>
                    ) : (
                      <p className="text-sm text-gray-600">Belum ada makanan</p>
                    )}
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}
      </div>

      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes scale {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }

        @keyframes slide-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }

        .animate-scale {
          animation: scale 2s ease-in-out infinite;
        }

        .animate-slide-in {
          animation: slide-in 0.5s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
};

export default DashboardPage;