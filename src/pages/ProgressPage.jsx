import { useState, useEffect } from 'react';
import Card from '../components/common/Card';
import Input from '../components/common/Input';

const ProgressPage = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('7'); // 7, 30, or 90 days
  const [chartType, setChartType] = useState('calories'); // calories or weight

  // Mock data - replace with actual API call
  const mockData = {
    calories: [
      { date: '2024-01-01', value: 1800 },
      { date: '2024-01-02', value: 2100 },
      { date: '2024-01-03', value: 1950 },
      { date: '2024-01-04', value: 2200 },
      { date: '2024-01-05', value: 1900 },
      { date: '2024-01-06', value: 2050 },
      { date: '2024-01-07', value: 2150 },
    ],
    weight: [
      { date: '2024-01-01', value: 70 },
      { date: '2024-01-02', value: 70.2 },
      { date: '2024-01-03', value: 69.8 },
      { date: '2024-01-04', value: 70.1 },
      { date: '2024-01-05', value: 69.9 },
      { date: '2024-01-06', value: 70.0 },
      { date: '2024-01-07', value: 69.7 },
    ],
  };

  const data = mockData[chartType];
  const maxValue = Math.max(...data.map((d) => d.value));
  const minValue = Math.min(...data.map((d) => d.value));

  // Simple bar chart component
  const SimpleBarChart = ({ data, maxValue, minValue }) => {
    const range = maxValue - minValue || 1;
    return (
      <div className="flex items-end justify-between h-64 gap-2 mt-6">
        {data.map((item, index) => {
          const height = ((item.value - minValue) / range) * 100;
          return (
            <div key={index} className="flex-1 flex flex-col items-center">
              <div className="w-full flex flex-col items-center justify-end h-full">
                <div
                  className="w-full bg-blue-500 rounded-t hover:bg-blue-600 transition-colors cursor-pointer"
                  style={{ height: `${height}%`, minHeight: '4px' }}
                  title={`${item.date}: ${item.value} ${chartType === 'calories' ? 'kkal' : 'kg'}`}
                ></div>
              </div>
              <p className="text-xs text-gray-500 mt-2 transform -rotate-45 origin-top-left whitespace-nowrap">
                {new Date(item.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}
              </p>
            </div>
          );
        })}
      </div>
    );
  };

  // Calculate statistics
  const avgValue = (data.reduce((sum, d) => sum + d.value, 0) / data.length).toFixed(1);
  const totalValue = data.reduce((sum, d) => sum + d.value, 0).toFixed(0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6 pt-24">
      <div className="max-w-6xl mx-auto w-full">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Progres & Laporan</h1>
          <p className="text-gray-600 mt-1">Pantau perkembangan kesehatan Anda</p>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Periode
              </label>
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="7">7 Hari Terakhir</option>
                <option value="30">30 Hari Terakhir</option>
                <option value="90">90 Hari Terakhir</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tipe Grafik
              </label>
              <select
                value={chartType}
                onChange={(e) => setChartType(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="calories">Asupan Kalori</option>
                <option value="weight">Berat Badan</option>
              </select>
            </div>
          </div>
        </Card>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card>
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-1">Rata-rata</p>
              <p className="text-3xl font-bold text-blue-600">
                {avgValue}
                <span className="text-lg ml-1">
                  {chartType === 'calories' ? 'kkal' : 'kg'}
                </span>
              </p>
            </div>
          </Card>
          <Card>
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-1">Total</p>
              <p className="text-3xl font-bold text-green-600">
                {totalValue}
                <span className="text-lg ml-1">
                  {chartType === 'calories' ? 'kkal' : 'kg'}
                </span>
              </p>
            </div>
          </Card>
          <Card>
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-1">Tertinggi</p>
              <p className="text-3xl font-bold text-red-600">
                {maxValue}
                <span className="text-lg ml-1">
                  {chartType === 'calories' ? 'kkal' : 'kg'}
                </span>
              </p>
            </div>
          </Card>
        </div>

        {/* Chart */}
        <Card title={`Grafik ${chartType === 'calories' ? 'Asupan Kalori' : 'Berat Badan'} - ${selectedPeriod} Hari Terakhir`}>
          <SimpleBarChart data={data} maxValue={maxValue} minValue={minValue} />
          <div className="mt-4 flex justify-between text-sm text-gray-600">
            <span>Min: {minValue} {chartType === 'calories' ? 'kkal' : 'kg'}</span>
            <span>Max: {maxValue} {chartType === 'calories' ? 'kkal' : 'kg'}</span>
          </div>
        </Card>

        {/* Data Table */}
        <Card title="Data Detail" className="mt-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Tanggal</th>
                  <th className="text-right py-3 px-4 font-semibold text-gray-700">
                    {chartType === 'calories' ? 'Kalori (kkal)' : 'Berat Badan (kg)'}
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">
                      {new Date(item.date).toLocaleDateString('id-ID', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </td>
                    <td className="py-3 px-4 text-right font-medium">
                      {item.value} {chartType === 'calories' ? 'kkal' : 'kg'}
                    </td>
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

