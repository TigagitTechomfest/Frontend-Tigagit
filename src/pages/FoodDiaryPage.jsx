import { useState, useEffect } from 'react';
import useDiaryStore from '../store/diaryStore';
import useFoodStore from '../store/foodStore';
import Snackbar from '../components/common/Snackbar';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Input from '../components/common/Input';

const FoodDiaryPage = () => {
  const {
    diaryEntries,
    selectedDate,
    fetchDiary,
    addFoodToDiary,
    removeFoodFromDiary,
    isLoading,
    totalDailyIntake,
    error: diaryError,
    clearError: clearDiaryError,
  } = useDiaryStore();

  const {
    searchResults,
    searchFood,
    searchWithFallback,
    isSearching,
    prepareFood,
    isLoading: isFoodLoading,
    error: foodError,
    clearError: clearFoodError,
  } = useFoodStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [selectedMealType, setSelectedMealType] = useState('breakfast');
  const [showQuantitySelector, setShowQuantitySelector] = useState(false);
  const [selectedFood, setSelectedFood] = useState(null);
  const [isAddingFood, setIsAddingFood] = useState(false);
  const [snackbar, setSnackbar] = useState({ show: false, message: '', type: 'error' });
  const [quantity, setQuantity] = useState('100');

  useEffect(() => {
    fetchDiary(selectedDate);
  }, [selectedDate, fetchDiary]);

  useEffect(() => {
    if (diaryError) {
      const timer = setTimeout(clearDiaryError, 5000);
      return () => clearTimeout(timer);
    }
  }, [diaryError, clearDiaryError]);

  useEffect(() => {
    if (foodError) {
      const timer = setTimeout(clearFoodError, 5000);
      return () => clearTimeout(timer);
    }
  }, [foodError, clearFoodError]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log('🔍 Starting search with fallback for:', searchQuery);
      await searchWithFallback(searchQuery);
      setShowSearch(true);
    }
  };

  const handleFoodSelected = (food) => {
    setSelectedFood(food);
    setQuantity('100');
    setShowQuantitySelector(true);
  };

  const handleQuantityConfirm = async () => {
    setShowQuantitySelector(false);
    setIsAddingFood(true);

    try {
      const foodWithQuantity = { ...selectedFood, quantity: parseInt(quantity) };
      const preparedFood = await prepareFood(foodWithQuantity);

      await addFoodToDiary({
        foodId: preparedFood.foodId || preparedFood.id,
        mealType: selectedMealType,
        date: selectedDate,
        quantity: parseInt(quantity),
      });

      setSearchQuery('');
      setShowSearch(false);
      setSelectedFood(null);
      setIsAddingFood(false);
    } catch (err) {
      console.error('Error adding food:', err);
      setIsAddingFood(false);
    }
  };

  const handleQuantityCancel = () => {
    setShowQuantitySelector(false);
    setSelectedFood(null);
  };

  const handleDateChange = (e) => {
    fetchDiary(e.target.value);
  };

  // Hitung nutrisi berdasarkan quantity
  const calculateNutrition = () => {
    if (!selectedFood) return { calories: 0, protein: 0, carbs: 0, fat: 0 };
    const qty = parseInt(quantity) || 0;
    return {
      calories: (selectedFood.calories_per_100g * qty) / 100,
      protein: (selectedFood.protein_per_100g * qty) / 100,
      carbs: (selectedFood.carbs_per_100g * qty) / 100,
      fat: (selectedFood.fat_per_100g * qty) / 100,
    };
  };

  const nutrition = calculateNutrition();

  // Group entries by meal type
  const meals = {
    breakfast: {
      label: '🍳 Sarapan',
      entries: diaryEntries.filter((e) => e.meal_type === 'breakfast'),
    },
    lunch: {
      label: '🍽️ Makan Siang',
      entries: diaryEntries.filter((e) => e.meal_type === 'lunch'),
    },
    dinner: {
      label: '🍴 Makan Malam',
      entries: diaryEntries.filter((e) => e.meal_type === 'dinner'),
    },
    snack: {
      label: '🍪 Cemilan',
      entries: diaryEntries.filter((e) => e.meal_type === 'snack'),
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6 pt-24">
      <div className="max-w-6xl mx-auto w-full">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Jurnal Makanan</h1>
          <p className="text-gray-600 mt-1">Catat makanan Anda hari ini</p>
        </div>

        {/* Date Selector */}
        <Card className="mb-6">
          <div className="flex items-center justify-between">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Pilih Tanggal
              </label>
              <input
                type="date"
                value={selectedDate}
                onChange={handleDateChange}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <Button
              variant="primary"
              onClick={() => setShowSearch(!showSearch)}
              disabled={isLoading || isFoodLoading}
            >
              {showSearch ? 'Tutup Pencarian' : '+ Tambah Makanan'}
            </Button>
          </div>
        </Card>

        {/* Daily Summary */}
        {diaryEntries.length > 0 && (
          <Card className="mb-6 bg-gradient-to-r from-blue-50 to-indigo-50">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-xs text-gray-600 uppercase tracking-wide">Kalori</p>
                <p className="text-2xl font-bold text-red-600">
                  {Math.round(totalDailyIntake.calories)}
                </p>
                <p className="text-xs text-gray-500 mt-1">kkal</p>
              </div>
              <div>
                <p className="text-xs text-gray-600 uppercase tracking-wide">Protein</p>
                <p className="text-2xl font-bold text-blue-600">
                  {Math.round(totalDailyIntake.protein * 10) / 10}
                </p>
                <p className="text-xs text-gray-500 mt-1">g</p>
              </div>
              <div>
                <p className="text-xs text-gray-600 uppercase tracking-wide">Karbohidrat</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {Math.round(totalDailyIntake.carbs * 10) / 10}
                </p>
                <p className="text-xs text-gray-500 mt-1">g</p>
              </div>
              <div>
                <p className="text-xs text-gray-600 uppercase tracking-wide">Lemak</p>
                <p className="text-2xl font-bold text-orange-600">
                  {Math.round(totalDailyIntake.fat * 10) / 10}
                </p>
                <p className="text-xs text-gray-500 mt-1">g</p>
              </div>
            </div>
          </Card>
        )}

        {/* Food Search */}
        {showSearch && (
          <Card className="mb-6">
            <h3 className="text-lg font-semibold mb-4">Cari Makanan</h3>
            <div className="mb-4">
              <div className="flex gap-2">
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Cari makanan (contoh: nasi goreng, ayam bakar)"
                  className="flex-1"
                  disabled={isSearching}
                />
                <Button
                  onClick={handleSearch}
                  variant="primary"
                  disabled={isSearching || !searchQuery.trim()}
                >
                  {isSearching ? 'Mencari...' : 'Cari'}
                </Button>
              </div>
            </div>

            {/* Meal Type Selector */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Pilih Waktu Makan
              </label>
              <div className="flex gap-2 flex-wrap">
                {Object.entries({
                  breakfast: 'Sarapan',
                  lunch: 'Makan Siang',
                  dinner: 'Makan Malam',
                  snack: 'Cemilan',
                }).map(([value, label]) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setSelectedMealType(value)}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      selectedMealType === value
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Search Results */}
            {searchResults.length > 0 && (
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {searchResults.map((food) => (
                  <div
                    key={`${food.source}-${food.id}`}
                    className="flex justify-between items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100"
                  >
                    <div className="flex-1">
                      <p className="font-medium">{food.name}</p>
                      <p className="text-xs text-gray-500 mb-1">
                        {food.source}
                      </p>
                      <p className="text-sm text-gray-600">
                        {Math.round(food.calories_per_100g)} kkal | P:{' '}
                        {Math.round(food.protein_per_100g * 10) / 10}g | C:{' '}
                        {Math.round(food.carbs_per_100g * 10) / 10}g | F:{' '}
                        {Math.round(food.fat_per_100g * 10) / 10}g
                      </p>
                    </div>
                    <Button
                      variant="primary"
                      onClick={() => handleFoodSelected(food)}
                      disabled={isAddingFood || isFoodLoading}
                      className="ml-4"
                    >
                      {isAddingFood ? 'Menambah...' : 'Tambah'}
                    </Button>
                  </div>
                ))}
              </div>
            )}

            {searchQuery && searchResults.length === 0 && !isSearching && (
              <p className="text-center text-gray-500 py-4">
                Tidak ada hasil ditemukan
              </p>
            )}
          </Card>
        )}

        {/* Food Diary Entries - Grid 2x2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {isLoading ? (
            <Card>
              <p className="text-center text-gray-500 py-8">Memuat diary...</p>
            </Card>
          ) : (
            Object.entries(meals).map(([mealType, { label, entries }]) => (
              <Card key={mealType} title={label}>
                {entries.length === 0 ? (
                  <p className="text-gray-500 text-center py-4">
                    Belum ada makanan untuk {label.toLowerCase()}
                  </p>
                ) : (
                  <div className="space-y-2">
                    {entries.map((entry) => (
                      <div
                        key={entry.id}
                        className="flex justify-between items-center p-4 bg-gray-50 rounded-lg"
                      >
                        <div className="flex-1">
                          <p className="font-medium text-gray-900">
                            {entry.food_name}
                          </p>
                          <p className="text-sm text-gray-600 mt-1">
                            {Math.round(entry.calories)} kkal | P:{' '}
                            {Math.round(entry.protein * 10) / 10}g | C:{' '}
                            {Math.round(entry.carbs * 10) / 10}g | F:{' '}
                            {Math.round(entry.fat * 10) / 10}g
                          </p>
                          {entry.quantity && (
                            <p className="text-xs text-gray-500 mt-1">
                              Jumlah: {entry.quantity}g
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </Card>
            ))
          )}
        </div>
      </div>

      {/* Modal Backdrop */}
      {showQuantitySelector && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          {/* Modal Card */}
          <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {selectedFood?.name}
            </h2>
            <p className="text-sm text-gray-500 mb-6">Pilih jumlah porsi</p>

            {/* Preset Quantities */}
            <div className="flex gap-2 mb-4">
              {[50, 100, 150, 200].map((q) => (
                <button
                  key={q}
                  onClick={() => setQuantity(q.toString())}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    quantity === q.toString()
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {q}g
                </button>
              ))}
            </div>

            {/* Custom Quantity */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Jumlah Custom (gram)
              </label>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Nutrition Info */}
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <p className="text-sm font-semibold text-gray-700 mb-3">
                Nutrisi untuk {quantity}g:
              </p>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-red-600 text-lg font-bold">
                    {Math.round(nutrition.calories)}
                  </p>
                  <p className="text-xs text-gray-600">kkal</p>
                </div>
                <div>
                  <p className="text-blue-600 text-lg font-bold">
                    {Math.round(nutrition.protein * 10) / 10}
                  </p>
                  <p className="text-xs text-gray-600">Protein</p>
                </div>
                <div>
                  <p className="text-yellow-600 text-lg font-bold">
                    {Math.round(nutrition.carbs * 10) / 10}
                  </p>
                  <p className="text-xs text-gray-600">Karbo</p>
                </div>
                <div>
                  <p className="text-orange-600 text-lg font-bold">
                    {Math.round(nutrition.fat * 10) / 10}
                  </p>
                  <p className="text-xs text-gray-600">Lemak</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={handleQuantityCancel}
                className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors"
              >
                Batal
              </button>
              <button
                onClick={handleQuantityConfirm}
                disabled={isAddingFood}
                className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:bg-blue-400"
              >
                {isAddingFood ? 'Menambah...' : 'Tambah ke Diary'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Snackbar Notification */}
      {snackbar.show && (
        <Snackbar
          message={snackbar.message}
          type={snackbar.type}
          onClose={() => setSnackbar({ ...snackbar, show: false })}
        />
      )}
    </div>
  );
};

export default FoodDiaryPage;