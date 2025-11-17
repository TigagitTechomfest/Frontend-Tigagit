import { useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import useDiaryStore from '../store/diaryStore';
import useUserStore from '../store/userStore';
import Card from '../components/common/Card';
import Button from '../components/common/Button';

const DashboardPage = () => {
  const { diaryEntries, selectedDate, fetchDiary, isLoading } = useDiaryStore();
  const { profile, fetchProfile } = useUserStore();

  useEffect(() => {
    fetchDiary(selectedDate);
    fetchProfile();
  }, [selectedDate]);

  // Calculate daily totals
  const dailyTotals = useMemo(() => {
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
  }, [diaryEntries]);

  const targetCalories = profile?.targetCalories || 2000;
  const caloriesProgress = (dailyTotals.calories / targetCalories) * 100;

  // Group entries by meal type
  const meals = {
    breakfast: diaryEntries.filter((e) => e.mealType === 'breakfast'),
    lunch: diaryEntries.filter((e) => e.mealType === 'lunch'),
    dinner: diaryEntries.filter((e) => e.mealType === 'dinner'),
    snack: diaryEntries.filter((e) => e.mealType === 'snack'),
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6 pt-24">
      <div className="max-w-7xl mx-auto w-full">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">Ringkasan nutrisi harian Anda</p>
        </div>

        {/* Nutrition Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card variant="elevated">
            <div className="text-center">
              <div className="text-4xl mb-2">🔥</div>
              <p className="text-sm font-medium text-gray-600 mb-2">Kalori</p>
              <p className="text-3xl font-bold text-blue-600 mb-1">
                {dailyTotals.calories.toFixed(0)}
              </p>
              <p className="text-xs text-gray-500 mb-3">
                dari {targetCalories} kkal
              </p>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
                  style={{ width: `${Math.min(caloriesProgress, 100)}%` }}
                ></div>
              </div>
            </div>
          </Card>

          <Card variant="elevated">
            <div className="text-center">
              <div className="text-4xl mb-2">💪</div>
              <p className="text-sm font-medium text-gray-600 mb-2">Protein</p>
              <p className="text-3xl font-bold text-green-600 mb-1">
                {dailyTotals.protein.toFixed(1)}g
              </p>
              <p className="text-xs text-gray-500">Target: 150g</p>
            </div>
          </Card>

          <Card variant="elevated">
            <div className="text-center">
              <div className="text-4xl mb-2">🍞</div>
              <p className="text-sm font-medium text-gray-600 mb-2">Karbohidrat</p>
              <p className="text-3xl font-bold text-amber-600 mb-1">
                {dailyTotals.carbs.toFixed(1)}g
              </p>
              <p className="text-xs text-gray-500">Target: 250g</p>
            </div>
          </Card>

          <Card variant="elevated">
            <div className="text-center">
              <div className="text-4xl mb-2">🥑</div>
              <p className="text-sm font-medium text-gray-600 mb-2">Lemak</p>
              <p className="text-3xl font-bold text-red-600 mb-1">
                {dailyTotals.fat.toFixed(1)}g
              </p>
              <p className="text-xs text-gray-500">Target: 65g</p>
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Today's Food Diary */}
          <div className="lg:col-span-2">
            <Card
              title="Jurnal Makanan Hari Ini"
              headerAction={
                <Link to="/food-diary">
                  <Button variant="outline" className="text-sm">
                    Lihat Semua
                  </Button>
                </Link>
              }
            >
              {isLoading ? (
                <p className="text-center text-gray-500 py-8">Memuat data...</p>
              ) : diaryEntries.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500 mb-4">Belum ada makanan yang dicatat hari ini</p>
                  <Link to="/food-diary">
                    <Button variant="primary">Tambah Makanan</Button>
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {meals.breakfast.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-gray-700 mb-2">🍳 Sarapan</h4>
                      {meals.breakfast.map((entry) => (
                        <div
                          key={entry.id}
                          className="flex justify-between items-center p-4 bg-gray-50 rounded-lg mb-2 hover:bg-gray-100 transition-colors"
                        >
                          <div className="flex-1">
                            <p className="font-semibold text-gray-900">{entry.foodName}</p>
                            <p className="text-sm text-gray-600 mt-1">
                              {entry.calories} kkal | P: {entry.protein || 0}g | C: {entry.carbs || 0}g | F: {entry.fat || 0}g
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {meals.lunch.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-gray-700 mb-2">🍽️ Makan Siang</h4>
                      {meals.lunch.map((entry) => (
                        <div
                          key={entry.id}
                          className="flex justify-between items-center p-4 bg-gray-50 rounded-lg mb-2 hover:bg-gray-100 transition-colors"
                        >
                          <div className="flex-1">
                            <p className="font-semibold text-gray-900">{entry.foodName}</p>
                            <p className="text-sm text-gray-600 mt-1">
                              {entry.calories} kkal | P: {entry.protein || 0}g | C: {entry.carbs || 0}g | F: {entry.fat || 0}g
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {meals.dinner.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-gray-700 mb-2">🍴 Makan Malam</h4>
                      {meals.dinner.map((entry) => (
                        <div
                          key={entry.id}
                          className="flex justify-between items-center p-4 bg-gray-50 rounded-lg mb-2 hover:bg-gray-100 transition-colors"
                        >
                          <div className="flex-1">
                            <p className="font-semibold text-gray-900">{entry.foodName}</p>
                            <p className="text-sm text-gray-600 mt-1">
                              {entry.calories} kkal | P: {entry.protein || 0}g | C: {entry.carbs || 0}g | F: {entry.fat || 0}g
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {meals.snack.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-gray-700 mb-2">🍪 Cemilan</h4>
                      {meals.snack.map((entry) => (
                        <div
                          key={entry.id}
                          className="flex justify-between items-center p-4 bg-gray-50 rounded-lg mb-2 hover:bg-gray-100 transition-colors"
                        >
                          <div className="flex-1">
                            <p className="font-semibold text-gray-900">{entry.foodName}</p>
                            <p className="text-sm text-gray-600 mt-1">
                              {entry.calories} kkal | P: {entry.protein || 0}g | C: {entry.carbs || 0}g | F: {entry.fat || 0}g
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </Card>
          </div>

          {/* Quick Stats */}
          <div>
            <Card title="Statistik Cepat">
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-gray-600">Sisa Kalori</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {Math.max(0, targetCalories - dailyTotals.calories).toFixed(0)}
                  </p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <p className="text-sm text-gray-600">Total Makanan</p>
                  <p className="text-2xl font-bold text-green-600">
                    {diaryEntries.length}
                  </p>
                </div>
                <Link to="/progress">
                  <Button variant="primary" className="w-full mt-4">
                    Lihat Progres
                  </Button>
                </Link>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
