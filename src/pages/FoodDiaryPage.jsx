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
    updateFoodInDiary,
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
  const [editMode, setEditMode] = useState(false);
  const [editingEntry, setEditingEntry] = useState(null);

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
      if (editMode && editingEntry) {
        // Edit mode - update meal
        await updateFoodInDiary({
          mealIndex: editingEntry.meal_index,
          quantity: parseInt(quantity),
          date: editingEntry.date,
        });

        setSnackbar({
          show: true,
          message: 'Makanan berhasil diupdate!',
          type: 'success',
        });
      } else {
        // Add mode - add new meal
        const foodWithQuantity = { ...selectedFood, quantity: parseInt(quantity) };
        const preparedFood = await prepareFood(foodWithQuantity);

        await addFoodToDiary({
          foodId: preparedFood.foodId || preparedFood.id,
          mealType: selectedMealType,
          date: selectedDate,
          quantity: parseInt(quantity),
        });

        setSnackbar({
          show: true,
          message: 'Makanan berhasil ditambahkan!',
          type: 'success',
        });
      }

      setSearchQuery('');
      setShowSearch(false);
      setSelectedFood(null);
      setEditMode(false);
      setEditingEntry(null);
      setIsAddingFood(false);
    } catch (err) {
      console.error('Error saving food:', err);
      setSnackbar({
        show: true,
        message: err.message || 'Gagal menyimpan makanan',
        type: 'error',
      });
      setIsAddingFood(false);
    }
  };

  const handleQuantityCancel = () => {
    setShowQuantitySelector(false);
    setSelectedFood(null);
    setEditMode(false);
    setEditingEntry(null);
  };

  const handleEditEntry = (entry) => {
    setEditingEntry(entry);
    setEditMode(true);
    setSelectedFood({
      id: entry.food_id,
      name: entry.food_name,
      calories_per_100g: (entry.calories / entry.quantity) * 100,
      protein_per_100g: (entry.protein / entry.quantity) * 100,
      carbs_per_100g: (entry.carbs / entry.quantity) * 100,
      fat_per_100g: (entry.fat / entry.quantity) * 100,
    });
    setQuantity(entry.quantity.toString());
    setShowQuantitySelector(true);
  };

  const handleDeleteEntry = async (entry) => {
    if (!window.confirm('Yakin ingin menghapus makanan ini?')) {
      return;
    }

    try {
      await removeFoodFromDiary(entry.meal_index, entry.date);
      setSnackbar({
        show: true,
        message: 'Makanan berhasil dihapus!',
        type: 'success',
      });
    } catch (err) {
      console.error('Error deleting food:', err);
      setSnackbar({
        show: true,
        message: err.message || 'Gagal menghapus makanan',
        type: 'error',
      });
    }
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 p-6 pt-24">
      <div className="max-w-6xl mx-auto w-full">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Jurnal Makanan</h1>
          <p className="text-gray-600 mt-1">Catat makanan Anda hari ini</p>
        </div>



        {/* Daily Summary */}
        {diaryEntries.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            {/* Kalori Card */}
            <Card className="bg-white border-none shadow-sm">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-xs text-gray-600 font-medium mb-2">Total Kalori</p>
                  <p className="text-3xl font-bold text-gray-900 mb-1">
                    {Math.round(totalDailyIntake.calories).toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-500">kcal</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-red-200 border border-red-300 flex items-center justify-center">
                  <span className="text-2xl">🔥</span>
                </div>
              </div>
            </Card>

            {/* Karbohidrat Card - Icon Gandum */}
            <Card className="bg-white border-none shadow-sm">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-xs text-gray-600 font-medium mb-2">Total Karbo</p>
                  <p className="text-3xl font-bold text-gray-900 mb-1">
                    {Math.round(totalDailyIntake.carbs * 10) / 10}
                  </p>
                  <p className="text-sm text-gray-500">gr</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-green-200 border border-green-300 flex items-center justify-center">
                  <span className="text-2xl">🍚 </span>
                </div>
              </div>
            </Card>

            {/* Protein Card - Icon Daging */}
            <Card className="bg-white border-none shadow-sm">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-xs text-gray-600 font-medium mb-2">Total Protein</p>
                  <p className="text-3xl font-bold text-gray-900 mb-1">
                    {Math.round(totalDailyIntake.protein * 10) / 10}
                  </p>
                  <p className="text-sm text-gray-500">gr</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-blue-100 border border-blue-200 flex items-center justify-center">
                  <span className="text-2xl">🥩</span>
                </div>
              </div>
            </Card>

            {/* Lemak Card - Icon Alpukat */}
            <Card className="bg-white border-none shadow-sm">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-xs text-gray-600 font-medium mb-2">Total Lemak</p>
                  <p className="text-3xl font-bold text-gray-900 mb-1">
                    {Math.round(totalDailyIntake.fat * 10) / 10}
                  </p>
                  <p className="text-sm text-gray-500">gr</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-orange-100 border border-orange-200 flex items-center justify-center">
                  <span className="text-2xl">🥑</span>
                </div>
              </div>
            </Card>
          </div>
        )}
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

        {/* Food Search */}
        {showSearch && (
          <Card className="mb-6">
            <h3 className="text-lg font-semibold mb-4">Cari Makanan</h3>
            <div className="mb-4">
              <div className="flex gap-2">
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="contoh: nasi goreng, ayam bakar"
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
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${selectedMealType === value
                      ? 'bg-teal-600 text-white'
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
                      className="ml-4 bg-teal-600 hover:bg-teal-700"
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

        {/* Food Diary Entries - Table View */}
        <Card>
          {isLoading ? (
            <p className="text-center text-gray-500 py-8">Memuat diary...</p>
          ) : diaryEntries.length === 0 ? (
            <p className="text-center text-gray-500 py-8">
              Belum ada catatan makanan untuk hari ini
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">
                      Tanggal & Waktu
                    </th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">
                      Jenis Makan
                    </th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">
                      Makanan
                    </th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">
                      Jumlah
                    </th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">
                      Kalori
                    </th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">
                      Protein
                    </th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">
                      Karbo
                    </th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">
                      Lemak
                    </th>
                    <th className="text-center py-3 px-4 text-sm font-semibold text-gray-700">
                      Aksi
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {diaryEntries.map((entry) => {
                    const mealTypeLabels = {
                      breakfast: 'Sarapan',
                      lunch: 'Makan Siang',
                      snack: 'Cemilan',
                      dinner: 'Makan Malam',
                    };

                    const mealTypeStyles = {
                      breakfast: {
                        bg: 'bg-emerald-50',
                        text: 'text-emerald-700',
                        border: 'border-emerald-200',
                        icon: '🍳',
                      },
                      lunch: {
                        bg: 'bg-amber-50',
                        text: 'text-amber-700',
                        border: 'border-amber-200',
                        icon: '🍽️',
                      },
                      snack: {
                        bg: 'bg-orange-50',
                        text: 'text-orange-700',
                        border: 'border-orange-200',
                        icon: '🍪',
                      },
                      dinner: {
                        bg: 'bg-slate-50',
                        text: 'text-slate-700',
                        border: 'border-slate-200',
                        icon: '🍴',
                      },
                    };

                    const style = mealTypeStyles[entry.meal_type];

                    return (
                      <tr
                        key={entry.id}
                        className="border-b border-gray-100 hover:bg-teal-50/30 transition-colors"
                      >
                        <td className="py-5 px-6">
                          <div className="text-sm text-gray-600">
                            {new Date(entry.date).toLocaleDateString('id-ID')}
                          </div>
                          <div className="text-xs text-gray-500 mt-0.5">-</div>
                        </td>
                        <td className="py-5 px-6">
                          <span
                            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium border ${style.bg} ${style.text} ${style.border}`}
                          >
                            <span className="text-sm">{style.icon}</span>
                            {mealTypeLabels[entry.meal_type]}
                          </span>
                        </td>
                        <td className="py-5 px-6">
                          <p className="text-sm font-medium text-gray-900">
                            {entry.food_name}
                          </p>
                        </td>
                        <td className="py-5 px-6 text-sm text-gray-900">
                          {entry.quantity || 100}g
                        </td>
                        <td className="py-5 px-6 text-sm font-bold text-gray-900">
                          {Math.round(entry.calories)}
                        </td>
                        <td className="py-5 px-6 text-sm text-gray-900">
                          {Math.round(entry.protein * 10) / 10}g
                        </td>
                        <td className="py-5 px-6 text-sm text-gray-900">
                          {Math.round(entry.carbs * 10) / 10}g
                        </td>
                        <td className="py-5 px-6 text-sm text-gray-900">
                          {Math.round(entry.fat * 10) / 10}g
                        </td>
                        <td className="py-3 px-4 text-center">
                          <div className="flex justify-center gap-2">
                            <button
                              onClick={() => handleEditEntry(entry)}
                              className="text-emerald-600 hover:text-emerald-700 text-sm font-medium transition-colors"
                            >
                              Edit
                            </button>
                            <span className="text-gray-300">|</span>
                            <button
                              onClick={() => handleDeleteEntry(entry)}
                              className="text-red-600 hover:text-red-700 text-sm font-medium transition-colors"
                            >
                              Hapus
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </Card>
      </div>

      {/* Modal Backdrop */}
      {showQuantitySelector && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          {/* Modal Card */}
          <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {selectedFood?.name}
            </h2>
            <p className="text-sm text-gray-500 mb-6">
              {editMode ? 'Edit jumlah porsi' : 'Pilih jumlah porsi'}
            </p>

            {/* Preset Quantities */}
            <div className="flex gap-2 mb-4">
              {[50, 100, 150, 200].map((q) => (
                <button
                  key={q}
                  onClick={() => setQuantity(q.toString())}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${quantity === q.toString()
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
                {isAddingFood
                  ? editMode
                    ? 'Mengupdate...'
                    : 'Menambah...'
                  : editMode
                    ? 'Update Diary'
                    : 'Tambah ke Diary'}
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