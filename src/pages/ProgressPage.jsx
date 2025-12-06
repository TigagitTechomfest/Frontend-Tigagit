import { useState, useEffect } from 'react';
import Card from '../components/common/Card';
import { FaUser, FaRulerVertical, FaWeight, FaCalculator } from 'react-icons/fa';

const ProgressPage = () => {
  const [user] = useState({
    name: 'agit',
    initialWeight: 90,
    currentWeight: 80,
    height: 165,
    bmi: 24.2,
    goalWeight: 77,
    daysElapsed: 6,
  });

  // Hitung progres
  const weightLoss = user.initialWeight - user.currentWeight;
  const weightRemaining = user.currentWeight - user.goalWeight;
  const progressPercent = Math.round(((weightLoss / (user.initialWeight - user.goalWeight)) * 100) || 0);

  // Status BMI
  const getBmiStatus = (bmi) => {
    if (bmi < 18.5) return { label: 'Kurus', color: 'text-blue-600 bg-blue-50' };
    if (bmi < 24.9) return { label: 'Normal', color: 'text-green-600 bg-green-50' };
    if (bmi < 29.9) return { label: 'Kelebihan', color: 'text-yellow-600 bg-yellow-50' };
    return { label: 'Obesitas', color: 'text-red-600 bg-red-50' };
  };

  const bmiStatus = getBmiStatus(user.bmi);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 p-6 pt-24">
      <div className="max-w-6xl mx-auto w-full">

        {/* Header */}
        {/* <h1 className="text-3xl font-bold text-gray-900 mb-2">Progress</h1>
        <p className="text-gray-600 mb-6">Pantau perkembangan kesehatan Anda</p> */}

        {/* Salam Personal & Stats Utama */}
        <Card className="mb-6 bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <FaUser className="text-2xl text-emerald-600" />
              <h2 className="text-xl font-semibold text-gray-900">Hi, {user.name}!</h2>
              <span className="text-gray-600">ini progress mu</span>
            </div>
            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
              <div className="w-8 h-8 rounded-full bg-emerald-500"></div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className={`p-4 rounded-xl ${bmiStatus.color} border border-${bmiStatus.color.split(' ')[1]} bg-opacity-70`}>
              <div className="text-sm text-gray-600 mb-1">BB Awal</div>
              <div className="text-2xl font-bold">{user.initialWeight} kg</div>
            </div>

            <div className="p-4 rounded-xl bg-orange-50 border border-orange-200">
              <div className="text-sm text-gray-600 mb-1">Tinggi Badan</div>
              <div className="text-2xl font-bold">{user.height} cm</div>
            </div>

            <div className="p-4 rounded-xl bg-purple-50 border border-purple-200">
              <div className="text-sm text-gray-600 mb-1">BB Terkini</div>
              <div className="text-2xl font-bold">{user.currentWeight} kg</div>
            </div>

            <div className="p-4 rounded-xl bg-pink-50 border border-pink-200">
              <div className="text-sm text-gray-600 mb-1">BMI</div>
              <div className="text-2xl font-bold">{user.bmi}</div>
              <div className={`text-xs mt-1 ${bmiStatus.color}`}>{bmiStatus.label}</div>
            </div>
          </div>
        </Card>

        {/* Progres Penurunan Berat Badan */}
        <Card className="mb-6 bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Progres Penurunan Berat Badan</h3>
            <span className="text-2xl font-bold text-emerald-600">{progressPercent}%</span>
          </div>

          {/* Progress Bar */}
          <div className="h-6 bg-gray-200 rounded-full overflow-hidden mb-4">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 to-green-500 transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>

          <div className="flex justify-between text-xs text-gray-500">
            <span>{user.goalWeight} kg</span>
            <span>Target</span>
            <span>{user.initialWeight} kg</span>
          </div>

          {/* Statistik Detail */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="p-4 rounded-xl bg-green-50 border border-green-200 text-center">
              <div className="text-2xl font-bold text-green-600">{weightLoss}</div>
              <div className="text-xs text-gray-600">kg</div>
              <div className="text-xs text-gray-600">Sudah Turun</div>
            </div>

            <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 text-center">
              <div className="text-2xl font-bold text-blue-600">{weightRemaining}</div>
              <div className="text-xs text-gray-600">kg</div>
              <div className="text-xs text-gray-600">Sisa Target</div>
            </div>

            <div className="p-4 rounded-xl bg-purple-50 border border-purple-200 text-center">
              <div className="text-2xl font-bold text-purple-600">~{user.daysElapsed}</div>
              <div className="text-xs text-gray-600">bulan</div>
              <div className="text-xs text-gray-600">Total Masa Progress</div>
            </div>
          </div>
        </Card>

        {/* Data Tabel (Opsional) */}
        <Card title="Riwayat Harian" className="mt-6">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left">
                  <th className="py-3 px-4 font-medium text-gray-700">Tanggal</th>
                  <th className="py-3 px-4 font-medium text-gray-700">Berat Badan (kg)</th>
                  <th className="py-3 px-4 font-medium text-gray-700">Catatan</th>
                </tr>
              </thead>
              <tbody>
                {[...Array(7)].map((_, i) => (
                  <tr key={i} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">
                      {new Date(Date.now() - i * 24 * 60 * 60 * 1000).toLocaleDateString('id-ID')}
                    </td>
                    <td className="py-3 px-4 font-medium">
                      {user.currentWeight - (i * 0.5 > 0 ? 0.5 : 0)} kg
                    </td>
                    <td className="py-3 px-4 text-gray-600">Pola makan seimbang</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

      </div>
    </div>
  );
};

export default ProgressPage;