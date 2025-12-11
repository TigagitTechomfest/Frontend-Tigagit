import { useState, useEffect } from 'react';
import { FaUser, FaRulerVertical, FaWeight, FaCalculator, FaFire, FaDumbbell, FaUtensils, FaExclamationTriangle, FaCalendarAlt, FaEdit } from 'react-icons/fa';
import { format, parseISO } from 'date-fns';
import { id } from 'date-fns/locale';
import { useNavigate } from 'react-router-dom';
import useProgressStore from '../store/progressStore';
import useUserStore from '../store/userStore';
import ExerciseCard from '../components/common/ExerciseCard';

const ProgressPage = () => {
  const navigate = useNavigate();

  const {
    dailyProgress,
    weightHistory,
    isLoading,
    isLoadingWeightHistory,
    error,
    weightHistoryError,
    fetchDailyProgress,
    fetchWeightHistory,
    getNutrientProgress,
    getNetCalories,
    getRemainingCalories
  } = useProgressStore();

  const { profile, assessment, fetchProfile } = useUserStore();

  useEffect(() => {
    const today = format(new Date(), 'yyyy-MM-dd');
    console.log('📅 Fetching progress for:', today);
    console.log('👤 User profile:', profile);
    console.log('📊 User assessment:', assessment);

    if (!profile || !assessment) {
      fetchProfile();
    }

    fetchDailyProgress(today);
    fetchWeightHistory();
  }, [fetchDailyProgress, fetchWeightHistory, fetchProfile]);

  const height = assessment?.height || 0;
  const currentWeight = assessment?.weight || weightHistory?.current_weight || 0;
  const age = assessment?.age || 0;
  const gender = assessment?.gender || 'male';

  // Calculate BMI
  const calculateBMI = () => {
    if (height && currentWeight && height > 0 && currentWeight > 0) {
      const heightInM = height / 100;
      return (currentWeight / (heightInM * heightInM)).toFixed(1);
    }
    return assessment?.bmi?.toFixed(1) || '0';
  };

  const bmi = calculateBMI();

  // Calculate ideal weight based on BMI
  const calculateIdealWeight = () => {
    if (!height || height === 0) return 0;
    
    const heightInM = height / 100;
    const currentBMI = parseFloat(bmi);
    
    if (currentBMI < 18.5) {
      return Math.round(21 * heightInM * heightInM);
    }
    else if (currentBMI > 24.9) {
      return Math.round(22 * heightInM * heightInM);
    }
    else {
      return currentWeight;
    }
  };

  // ✅ Ambil BB Awal dari entri paling awal di riwayat
  const getInitialWeightFromHistory = () => {
    if (!weightHistory?.history || weightHistory.history.length === 0) return null;
    const sorted = [...weightHistory.history].sort(
      (a, b) => new Date(a.recorded_at) - new Date(b.recorded_at)
    );
    return sorted[0].weight;
  };

  const initialWeightFromHistory = getInitialWeightFromHistory();
  const initialWeight = profile?.initial_weight || assessment?.initial_weight || initialWeightFromHistory || currentWeight;

  const idealWeight = calculateIdealWeight();
  const goalWeight = profile?.goal_weight || assessment?.goal_weight || idealWeight;
  const name = profile?.name || 'Pengguna';

  const weightChange = currentWeight - initialWeight;
  const weightRemaining = Math.abs(currentWeight - goalWeight);

  let progressPercent = 0;
  if (initialWeight !== goalWeight && initialWeight > 0) {
    const totalTargetChange = goalWeight - initialWeight;
    const actualChange = weightChange;

    if (totalTargetChange > 0) {
      // Target: Naik berat badan
      progressPercent = Math.max(0, Math.min(100, Math.round((actualChange / totalTargetChange) * 100)));
    } else {
      // Target: Turun berat badan
      progressPercent = Math.max(0, Math.min(100, Math.round((Math.abs(actualChange) / Math.abs(totalTargetChange)) * 100)));
    }
  }

  const burnedCalories = dailyProgress?.burned || 0;

  const getBmiStatus = (bmi) => {
    const bmiValue = parseFloat(bmi);
    if (bmiValue === 0) return { label: 'N/A', color: 'text-gray-600 bg-gray-50', border: 'border-gray-200' };
    if (bmiValue < 18.5) return { label: 'Kurus', color: 'text-blue-600 bg-blue-50', border: 'border-blue-200' };
    if (bmiValue < 24.9) return { label: 'Normal', color: 'text-green-600 bg-green-50', border: 'border-green-200' };
    if (bmiValue < 29.9) return { label: 'Kelebihan', color: 'text-yellow-600 bg-yellow-50', border: 'border-yellow-200' };
    return { label: 'Obesitas', color: 'text-red-600 bg-red-50', border: 'border-red-200' };
  };

  const bmiStatus = getBmiStatus(bmi);

  const daysElapsed = profile?.created_at
    ? Math.ceil((new Date() - new Date(profile.created_at)) / (1000 * 60 * 60 * 24))
    : 0;

  const caloriesPercent = getNutrientProgress('calories');
  const proteinPercent = getNutrientProgress('protein');
  const carbsPercent = getNutrientProgress('carbs');
  const fatPercent = getNutrientProgress('fat');

  const netCalories = getNetCalories();
  const remainingCalories = getRemainingCalories();

  const todayFormatted = format(new Date(), 'EEEE, dd MMMM yyyy', { locale: id });

  const isProfileComplete = currentWeight > 0 && height > 0 && age > 0;

  // ✅ Ambil entri terbaru per hari, maks 7 hari terakhir
  const getLast7DaysHistory = () => {
    if (!weightHistory?.history || weightHistory.history.length === 0) {
      return [];
    }

    const historyByDate = {};
    for (const record of weightHistory.history) {
      const dateKey = format(parseISO(record.history_date), 'yyyy-MM-dd');
      if (
        !historyByDate[dateKey] ||
        new Date(record.recorded_at) > new Date(historyByDate[dateKey].recorded_at)
      ) {
        historyByDate[dateKey] = record;
      }
    }

    const uniqueHistory = Object.values(historyByDate).sort(
      (a, b) => new Date(b.history_date) - new Date(a.history_date)
    );

    return uniqueHistory.slice(0, 7);
  };

  const last7DaysHistory = getLast7DaysHistory();

  if (isLoading && !dailyProgress) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-700 text-lg font-medium">Memuat progress hari ini...</p>
          <p className="text-gray-500 text-sm mt-2">Mengambil data dari server</p>
        </div>
      </div>
    );
  }

  if (error && !dailyProgress) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 p-6 pt-24">
        <div className="max-w-md w-full mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-8 border-2 border-red-200">
            <div className="flex justify-center mb-4">
              <div className="bg-red-100 rounded-full p-4">
                <FaExclamationTriangle className="text-red-600 text-4xl" />
              </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-800 text-center mb-2">
              Gagal Memuat Data
            </h2>

            <p className="text-gray-600 text-center mb-4">
              Tidak dapat terhubung ke server
            </p>

            <div className="bg-red-50 rounded-lg p-4 mb-6 border border-red-200">
              <p className="text-sm text-red-700 font-mono break-all">
                {error}
              </p>
            </div>

            <button
              onClick={() => {
                const today = format(new Date(), 'yyyy-MM-dd');
                fetchDailyProgress(today);
              }}
              className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center gap-2"
            >
              <FaFire />
              Coba Lagi
            </button>
          </div>
        </div>
      </div>
    );
  }

  const isUnderweight = parseFloat(bmi) < 18.5;

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 p-6 pt-24">
      <div className="max-w-7xl mx-auto space-y-4 md:space-y-6">

        <div className="bg-white rounded-2xl shadow-sm p-4 md:p-6 border border-gray-100">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-1">Hi, {name}!</h1>
              <p className="text-gray-600 text-sm md:text-base">Ini progress mu hari ini</p>
            </div>
            <div className="flex items-center gap-2 text-xs md:text-sm text-gray-500">
              <FaCalendarAlt className="text-blue-600" />
              <span className="font-medium">{todayFormatted}</span>
            </div>
          </div>
        </div>

        {!isProfileComplete && (
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-lg">
            <div className="flex items-start gap-3">
              <FaExclamationTriangle className="text-yellow-600 text-xl flex-shrink-0 mt-0.5" />
              <div className="flex-1 min-w-0">
                <p className="text-sm text-yellow-800 font-semibold mb-2">⚠️ Data Profil Belum Lengkap</p>
                <p className="text-xs text-yellow-700 mb-3">Lengkapi data profil Anda untuk melihat progress lengkap:</p>
                <ul className="text-xs text-yellow-700 space-y-1 list-disc list-inside mb-3">
                  {currentWeight === 0 && <li>Berat Badan belum diisi</li>}
                  {height === 0 && <li>Tinggi Badan belum diisi</li>}
                  {age === 0 && <li>Usia belum diisi</li>}
                </ul>
                <button
                  onClick={() => navigate('/profil')}
                  className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg text-xs font-medium transition-colors flex items-center gap-2"
                >
                  <FaEdit />
                  Lengkapi Profil Sekarang
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          <div className="bg-white rounded-xl shadow-sm p-3 md:p-4 border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-2 mb-2">
              <FaWeight className="text-blue-600 text-lg md:text-xl flex-shrink-0" />
              <span className="text-xs md:text-sm text-gray-600">BB Awal</span>
            </div>
            <p className="text-xl md:text-2xl font-bold text-gray-800">
              {initialWeight > 0 ? initialWeight : 'N/A'}
            </p>
            {initialWeight > 0 && <p className="text-xs text-gray-500">kg</p>}
          </div>

          <div className="bg-white rounded-xl shadow-sm p-3 md:p-4 border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-2 mb-2">
              <FaRulerVertical className="text-green-600 text-lg md:text-xl flex-shrink-0" />
              <span className="text-xs md:text-sm text-gray-600">Tinggi Badan</span>
            </div>
            <p className="text-xl md:text-2xl font-bold text-gray-800">
              {height > 0 ? height : 'N/A'}
            </p>
            {height > 0 && <p className="text-xs text-gray-500">cm</p>}
          </div>

          <div className="bg-white rounded-xl shadow-sm p-3 md:p-4 border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-2 mb-2">
              <FaWeight className="text-purple-600 text-lg md:text-xl flex-shrink-0" />
              <span className="text-xs md:text-sm text-gray-600">BB Terkini</span>
            </div>
            <p className="text-xl md:text-2xl font-bold text-gray-800">
              {currentWeight > 0 ? currentWeight : 'N/A'}
            </p>
            {currentWeight > 0 && <p className="text-xs text-gray-500">kg</p>}
          </div>

          <div className="bg-white rounded-xl shadow-sm p-3 md:p-4 border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-2 mb-2">
              <FaCalculator className="text-orange-600 text-lg md:text-xl flex-shrink-0" />
              <span className="text-xs md:text-sm text-gray-600">BMI</span>
            </div>
            <p className="text-xl md:text-2xl font-bold text-gray-800 mb-1">{bmi}</p>
            <span className={`text-xs px-2 py-1 rounded-full ${bmiStatus.color} ${bmiStatus.border} border inline-block`}>
              {bmiStatus.label}
            </span>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-4 md:p-6 border border-gray-100">
          <h2 className="text-lg md:text-xl font-bold text-gray-800 mb-4">
            {isUnderweight ? 'Progres Peningkatan Berat Badan' : 
             parseFloat(bmi) >= 25 ? 'Progres Penurunan Berat Badan' : 
             'Progres Pemeliharaan Berat Badan'}
          </h2>

          {isProfileComplete ? (
            <>
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span 
                    className="text-2xl md:text-3xl font-bold"
                    style={{ color: '#F0B639' }}>
                    {progressPercent}%
                  </span>
                  <span className="text-xs md:text-sm text-gray-500">
                    {currentWeight} kg → {goalWeight} kg
                  </span>
                </div>

                <div className="relative h-3 md:h-4 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="absolute top-0 left-0 h-full bg-[#F0B639] rounded-full transition-all duration-500"
                    style={{ width: `${progressPercent}%` }}
                  ></div>
                </div>

                <div className="flex justify-between mt-2 text-xs text-gray-500">
                  <span>{initialWeight} kg</span>
                  <span>{goalWeight} kg Target</span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 md:gap-4">
                <div className="text-center p-3 md:p-4 bg-green-50 rounded-lg border border-green-200">
                  <p className="text-xl md:text-2xl font-bold text-green-600">
                    {Math.abs(weightChange).toFixed(1)}
                  </p>
                  <p className="text-xs text-gray-600 mt-1">
                    {isUnderweight
                      ? (weightChange >= 0 ? 'kg Naik' : 'kg Turun')
                      : (weightChange >= 0 ? 'kg Turun' : 'kg Naik')}
                  </p>
                </div>

                <div className="text-center p-3 md:p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="text-xl md:text-2xl font-bold text-blue-600">
                    {weightRemaining.toFixed(1)}
                  </p>
                  <p className="text-xs text-gray-600 mt-1">
                    {isUnderweight ? 'kg Sisa Naik' : 'kg Sisa Turun'}
                  </p>
                </div>

                <div className="text-center p-3 md:p-4 bg-purple-50 rounded-lg border border-purple-200">
                  <p className="text-xl md:text-2xl font-bold text-purple-600">{daysElapsed}</p>
                  <p className="text-xs text-gray-600 mt-1">hari</p>
                </div>
              </div>
            </>
          ) : (
            <div className="text-center py-8">
              <FaWeight className="text-gray-300 text-5xl mx-auto mb-4" />
              <p className="text-gray-500 mb-4">Lengkapi data profil untuk melihat progress</p>
              <button
                onClick={() => navigate('/profil')}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg text-sm font-medium transition-colors inline-flex items-center gap-2"
              >
                <FaEdit />
                Lengkapi Profil
              </button>
            </div>
          )}
        </div>

        {dailyProgress ? (
          <div className="bg-white rounded-2xl shadow-sm p-4 md:p-6 border border-gray-100">
            <div className="flex items-center gap-2 mb-4 md:mb-6">
              <FaUtensils className="text-orange-600 text-lg md:text-xl flex-shrink-0" />
              <h2 className="text-lg md:text-xl font-bold text-gray-800">Progress Nutrisi Hari Ini</h2>
            </div>

            <div className="space-y-3 md:space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center gap-2">
                    <FaFire className="text-orange-500 flex-shrink-0" />
                    <span className="font-medium text-gray-700 text-sm md:text-base">Kalori</span>
                  </div>
                  <span className="text-xs md:text-sm text-gray-600 whitespace-nowrap">
                    {dailyProgress.intake.calories} / {dailyProgress.target.calories} kal
                  </span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-orange-500 transition-all duration-500"
                    style={{ width: `${caloriesPercent}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500 mt-1">{caloriesPercent}%</p>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center gap-2">
                    <FaDumbbell className="text-red-500 flex-shrink-0" />
                    <span className="font-medium text-gray-700 text-sm md:text-base">Protein</span>
                  </div>
                  <span className="text-xs md:text-sm text-gray-600 whitespace-nowrap">
                    {dailyProgress.intake.protein} / {dailyProgress.target.protein} g
                  </span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-red-500 transition-all duration-500"
                    style={{ width: `${proteinPercent}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500 mt-1">{proteinPercent}%</p>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center gap-2">
                    <FaUtensils className="text-blue-500 flex-shrink-0" />
                    <span className="font-medium text-gray-700 text-sm md:text-base">Karbohidrat</span>
                  </div>
                  <span className="text-xs md:text-sm text-gray-600 whitespace-nowrap">
                    {dailyProgress.intake.carbs} / {dailyProgress.target.carbs} g
                  </span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-500 transition-all duration-500"
                    style={{ width: `${carbsPercent}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500 mt-1">{carbsPercent}%</p>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center gap-2">
                    <FaFire className="text-yellow-500 flex-shrink-0" />
                    <span className="font-medium text-gray-700 text-sm md:text-base">Lemak</span>
                  </div>
                  <span className="text-xs md:text-sm text-gray-600 whitespace-nowrap">
                    {dailyProgress.intake.fat} / {dailyProgress.target.fat} g
                  </span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-yellow-500 transition-all duration-500"
                    style={{ width: `${fatPercent}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500 mt-1">{fatPercent}%</p>
              </div>
            </div>

            {dailyProgress.burned > 0 && (
              <div className="mt-4 md:mt-6 pt-4 md:pt-6 border-t border-gray-200">
                <div className="flex items-center justify-between p-3 md:p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center gap-3">
                    <FaFire className="text-green-600 text-lg md:text-xl flex-shrink-0" />
                    <div>
                      <h3 className="font-medium text-gray-700 text-sm md:text-base">Kalori Terbakar</h3>
                      <p className="text-xs text-gray-500">Dari olahraga hari ini</p>
                    </div>
                  </div>
                  <p className="text-xl md:text-2xl font-bold text-green-600">{dailyProgress.burned}</p>
                </div>
              </div>
            )}

            <ExerciseCard
              burnedCalories={burnedCalories}
              onExerciseAdded={() => {
                const today = format(new Date(), 'yyyy-MM-dd');
                fetchDailyProgress(today);
              }}
            />
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-100 text-center">
            <FaUtensils className="text-gray-300 text-5xl mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Belum Ada Data Nutrisi</h3>
            <p className="text-gray-600 text-sm">Mulai catat makanan Anda hari ini!</p>
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-sm p-4 md:p-6 border border-gray-100">
          <h2 className="text-lg md:text-xl font-bold text-gray-800 mb-4">Riwayat Berat Badan (7 Hari)</h2>
          
          {isLoadingWeightHistory ? (
            <div className="text-center py-8">
              <p className="text-gray-500 text-sm">Memuat riwayat berat badan...</p>
            </div>
          ) : weightHistoryError ? (
            <div className="text-center py-8">
              <FaExclamationTriangle className="text-yellow-500 text-4xl mx-auto mb-3" />
              <p className="text-gray-500 text-sm mb-3">Gagal memuat riwayat berat badan</p>
              <button
                onClick={fetchWeightHistory}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-xs font-medium transition-colors inline-flex items-center gap-2"
              >
                <FaFire />
                Coba Lagi
              </button>
            </div>
          ) : last7DaysHistory.length > 0 ? (
            <div className="overflow-x-auto -mx-4 md:mx-0">
              <div className="inline-block min-w-full align-middle px-4 md:px-0">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-2 md:px-4 text-xs md:text-sm font-semibold text-gray-700">Tanggal</th>
                      <th className="text-left py-3 px-2 md:px-4 text-xs md:text-sm font-semibold text-gray-700">Berat (kg)</th>
                      <th className="text-left py-3 px-2 md:px-4 text-xs md:text-sm font-semibold text-gray-700">BMI</th>
                      <th className="text-left py-3 px-2 md:px-4 text-xs md:text-sm font-semibold text-gray-700">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {last7DaysHistory.map((record) => {
                      const recordDate = parseISO(record.history_date);
                      const isToday = format(recordDate, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd');
                      const daysAgo = Math.floor((new Date() - recordDate) / (1000 * 60 * 60 * 24));
                      
                      return (
                        <tr key={record.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                          <td className="py-3 px-2 md:px-4 text-xs md:text-sm text-gray-600">
                            {format(recordDate, 'd MMM yyyy', { locale: id })}
                          </td>
                          <td className="py-3 px-2 md:px-4 text-xs md:text-sm font-medium text-gray-800">
                            {record.weight} kg
                          </td>
                          <td className="py-3 px-2 md:px-4 text-xs md:text-sm text-gray-600">
                            {record.bmi.toFixed(1)}
                          </td>
                          <td className="py-3 px-2 md:px-4 text-xs md:text-sm text-gray-500">
                            {isToday ? (
                              <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium">
                                Hari ini
                              </span>
                            ) : (
                              `${daysAgo} hari lalu`
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <FaWeight className="text-gray-300 text-4xl mx-auto mb-3" />
              <p className="text-gray-500 text-sm mb-3">Belum ada riwayat berat badan</p>
              <p className="text-gray-400 text-xs">Update berat badan Anda di halaman profil untuk mulai tracking</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default ProgressPage;