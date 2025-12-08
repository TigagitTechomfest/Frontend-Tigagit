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
    editFoodFromDiary,
    setSelectedDate,
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
  const [filterRange, setFilterRange] = useState('all');
  const [filterDate, setFilterDate] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;
  const [editingEntry, setEditingEntry] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    const today = new Date();
    setSelectedDate(today.toISOString().split('T')[0]);
    fetchDiary(today.toISOString().split('T')[0]);
  }, []);

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
      await searchWithFallback(searchQuery);
      setShowSearch(true);
    }
  };

  const handleFoodSelected = (food) => {
    setSelectedFood(food);
    setQuantity('100');
    setIsEditMode(false);
    setEditingEntry(null);
    setShowQuantitySelector(true);
  };

  const handleQuantityConfirm = async () => {
    setShowQuantitySelector(false);
    setIsAddingFood(true);

    try {
      if (isEditMode && editingEntry) {
        // EDIT MODE - pakai meal_index dan date
        await editFoodFromDiary(editingEntry.meal_index, editingEntry.date, parseInt(quantity));
        setEditingEntry(null);
        setIsEditMode(false);
      } else {
        // ADD MODE
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
      }
      setIsAddingFood(false);
    } catch (err) {
      console.error('Error:', err);
      setIsAddingFood(false);
    }
  };

  const handleQuantityCancel = () => {
    setShowQuantitySelector(false);
    setSelectedFood(null);
    setIsEditMode(false);
    setEditingEntry(null);
  };

  const handleEditEntry = (entry) => {
    setEditingEntry(entry);
    setSelectedFood({
      name: entry.food_name,
      calories_per_100g: (entry.calories / entry.quantity) * 100,
      protein_per_100g: (entry.protein / entry.quantity) * 100,
      carbs_per_100g: (entry.carbs / entry.quantity) * 100,
      fat_per_100g: (entry.fat / entry.quantity) * 100,
    });
    setQuantity(entry.quantity.toString());
    setIsEditMode(true);
    setShowQuantitySelector(true);
  };

  const handleDeleteEntry = async (entry) => {
    if (window.confirm(`Hapus "${entry.food_name}"?`)) {
      await removeFoodFromDiary(entry.meal_index, entry.date);
    }
  };

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

  // Filter entries berdasarkan range
  const getFilteredEntries = () => {
    const today = new Date();
    let filtered = [...diaryEntries];

    if (filterRange === '7days') {
      const sevenDaysAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
      filtered = filtered.filter(e => new Date(e.date) >= sevenDaysAgo);
    } else if (filterRange === '30days') {
      const thirtyDaysAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
      filtered = filtered.filter(e => new Date(e.date) >= thirtyDaysAgo);
    } else if (filterRange === 'date' && filterDate) {
      filtered = filtered.filter(e => e.date === filterDate);
    }

    return filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
  };

  const filteredEntries = getFilteredEntries();
  const totalPages = Math.ceil(filteredEntries.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const paginatedEntries = filteredEntries.slice(startIdx, startIdx + itemsPerPage);

  const getMealBadge = (mealType) => {
    const badges = {
      breakfast: { emoji: '🍳', label: 'Sarapan', color: 'bg-emerald-100 text-emerald-700' },
      lunch: { emoji: '🍽️', label: 'Makan Siang', color: 'bg-teal-100 text-teal-700' },
      dinner: { emoji: '🍴', label: 'Makan Malam', color: 'bg-cyan-100 text-cyan-700' },
      snack: { emoji: '🍪', label: 'Cemilan', color: 'bg-emerald-100 text-emerald-700' },
    };
    return badges[mealType] || badges.breakfast;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 p-6 pt-24">
      <div className="max-w-7xl mx-auto w-full">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Jurnal Makanan</h1>
          <p className="text-gray-600 mt-2">Pantau dan catat semua asupan makanan Anda</p>
        </div>

        {/* Top Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="flex gap-4 items-center bg-white rounded-xl p-5 shadow-md hover:shadow-lg transition-shadow">
            <div className="bg-emerald-100 rounded-xl p-4 flex-shrink-0">
              <span className="text-2xl">💧</span>
            </div>
            <div className="flex-1">
              <p className="text-xs text-gray-600 font-medium uppercase">Total Kalori</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{Math.round(totalDailyIntake.calories)}</p>
              <p className="text-xs text-gray-500 mt-0.5">kcal</p>
            </div>
          </div>

          <div className="flex gap-4 items-center bg-white rounded-xl p-5 shadow-md hover:shadow-lg transition-shadow">
            <div className="bg-teal-100 rounded-xl p-4 flex-shrink-0">
              <span className="text-2xl">🥬</span>
            </div>
            <div className="flex-1">
              <p className="text-xs text-gray-600 font-medium uppercase">Total Protein</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{Math.round(totalDailyIntake.protein * 10) / 10}</p>
              <p className="text-xs text-gray-500 mt-0.5">g</p>
            </div>
          </div>

          <div className="flex gap-4 items-center bg-white rounded-xl p-5 shadow-md hover:shadow-lg transition-shadow">
            <div className="bg-cyan-100 rounded-xl p-4 flex-shrink-0">
              <span className="text-2xl">🍖</span>
            </div>
            <div className="flex-1">
              <p className="text-xs text-gray-600 font-medium uppercase">Total Carb</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{Math.round(totalDailyIntake.carbs * 10) / 10}</p>
              <p className="text-xs text-gray-500 mt-0.5">g</p>
            </div>
          </div>

          <div className="flex gap-4 items-center bg-white rounded-xl p-5 shadow-md hover:shadow-lg transition-shadow">
            <div className="bg-gray-100 rounded-xl p-4 flex-shrink-0">
              <span className="text-2xl">🧈</span>
            </div>
            <div className="flex-1">
              <p className="text-xs text-gray-600 font-medium uppercase">Total Fats</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{Math.round(totalDailyIntake.fat * 10) / 10}</p>
              <p className="text-xs text-gray-500 mt-0.5">g</p>
            </div>
          </div>
        </div>

        {/* Controls */}
        <Card className="mb-8">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col md:flex-row gap-2 items-start md:items-center">
              <label className="block text-sm font-medium text-gray-700">Filter:</label>
              <div className="flex gap-2 flex-wrap">
                <button
                  onClick={() => {
                    setFilterRange('all');
                    setCurrentPage(1);
                  }}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    filterRange === 'all'
                      ? 'bg-emerald-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Semua
                </button>
                <button
                  onClick={() => {
                    setFilterRange('7days');
                    setCurrentPage(1);
                  }}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    filterRange === '7days'
                      ? 'bg-emerald-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  7 Hari Terakhir
                </button>
                <button
                  onClick={() => {
                    setFilterRange('30days');
                    setCurrentPage(1);
                  }}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    filterRange === '30days'
                      ? 'bg-emerald-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  30 Hari Terakhir
                </button>
                <button
                  onClick={() => {
                    setFilterRange('date');
                    setCurrentPage(1);
                  }}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    filterRange === 'date'
                      ? 'bg-emerald-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Per Tanggal
                </button>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
              {filterRange === 'date' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Pilih Tanggal</label>
                  <input
                    type="date"
                    value={filterDate}
                    onChange={(e) => {
                      setFilterDate(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              )}
              <Button
                variant="primary"
                onClick={() => setShowSearch(!showSearch)}
                disabled={isLoading || isFoodLoading}
              >
                {showSearch ? 'Tutup' : '+ Tambah Makanan'}
              </Button>
            </div>
          </div>
        </Card>

        {/* Food Search */}
        {showSearch && (
          <Card className="mb-8">
            <h3 className="text-lg font-semibold mb-4 text-gray-900">Cari Makanan</h3>
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

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Pilih Waktu Makan</label>
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
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${
                      selectedMealType === value
                        ? 'bg-emerald-600 text-white shadow-md'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {searchResults.length > 0 && (
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {searchResults.map((food) => (
                  <div
                    key={`${food.source}-${food.id}`}
                    className="flex justify-between items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{food.name}</p>
                      <p className="text-xs text-gray-500 mb-1">{food.source}</p>
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
                      className="ml-4 text-sm"
                    >
                      Tambah
                    </Button>
                  </div>
                ))}
              </div>
            )}

            {searchQuery && searchResults.length === 0 && !isSearching && (
              <p className="text-center text-gray-500 py-4">Tidak ada hasil ditemukan</p>
            )}
          </Card>
        )}

        {/* Food Diary Table */}
        <Card>
          {isLoading ? (
            <p className="text-center text-gray-500 py-8">Memuat diary...</p>
          ) : diaryEntries.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg mb-4">Belum ada makanan yang dicatat</p>
              <Button variant="primary" onClick={() => setShowSearch(true)}>
                + Tambah Makanan Sekarang
              </Button>
            </div>
          ) : filteredEntries.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">Tidak ada data untuk filter yang dipilih</p>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Tanggal & Waktu</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Jenis Makan</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Makanan</th>
                      <th className="text-center py-3 px-4 text-sm font-semibold text-gray-700">Jumlah</th>
                      <th className="text-center py-3 px-4 text-sm font-semibold text-gray-700">Kalori</th>
                      <th className="text-center py-3 px-4 text-sm font-semibold text-gray-700">Protein</th>
                      <th className="text-center py-3 px-4 text-sm font-semibold text-gray-700">Karbo</th>
                      <th className="text-center py-3 px-4 text-sm font-semibold text-gray-700">Lemak</th>
                      <th className="text-center py-3 px-4 text-sm font-semibold text-gray-700">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedEntries.map((entry) => {
                      const badge = getMealBadge(entry.meal_type);
                      return (
                        <tr key={entry.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                          <td className="py-3 px-4 text-sm text-gray-700">
                            <div>
                              <p className="font-medium">{new Date(entry.date).toLocaleDateString('id-ID')}</p>
                              <p className="text-xs text-gray-500">{entry.time || '-'}</p>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${badge.color}`}>
                              {badge.emoji} {badge.label}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-sm text-gray-900 font-medium">{entry.food_name}</td>
                          <td className="py-3 px-4 text-sm text-gray-700 text-center">{entry.quantity}g</td>
                          <td className="py-3 px-4 text-sm font-semibold text-gray-900 text-center">{Math.round(entry.calories)}</td>
                          <td className="py-3 px-4 text-sm text-gray-700 text-center">{Math.round(entry.protein * 10) / 10}g</td>
                          <td className="py-3 px-4 text-sm text-gray-700 text-center">{Math.round(entry.carbs * 10) / 10}g</td>
                          <td className="py-3 px-4 text-sm text-gray-700 text-center">{Math.round(entry.fat * 10) / 10}g</td>
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

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-200">
                  <p className="text-sm text-gray-600">
                    Menampilkan {startIdx + 1} - {Math.min(startIdx + itemsPerPage, filteredEntries.length)} dari {filteredEntries.length} item
                  </p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                      className="px-3 py-1 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      ← Sebelumnya
                    </button>
                    {Array.from({ length: Math.min(5, totalPages) }).map((_, i) => {
                      const pageNum = i + 1;
                      return (
                        <button
                          key={pageNum}
                          onClick={() => setCurrentPage(pageNum)}
                          className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                            currentPage === pageNum
                              ? 'bg-emerald-600 text-white'
                              : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}
                    <button
                      onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                      disabled={currentPage === totalPages}
                      className="px-3 py-1 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Berikutnya →
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </Card>
      </div>

      {/* Modal Quantity Selector */}
      {showQuantitySelector && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6 animate-in">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{selectedFood?.name}</h2>
            <p className="text-sm text-gray-500 mb-6">{isEditMode ? 'Edit jumlah porsi' : 'Pilih jumlah porsi'}</p>

            <div className="flex gap-2 mb-4">
              {[50, 100, 150, 200].map((q) => (
                <button
                  key={q}
                  onClick={() => setQuantity(q.toString())}
                  className={`flex-1 px-3 py-2 rounded-lg font-medium transition-all ${
                    quantity === q.toString()
                      ? 'bg-emerald-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {q}g
                </button>
              ))}
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Jumlah Custom (gram)</label>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div className="bg-emerald-50 rounded-lg p-4 mb-6 border border-emerald-200">
              <p className="text-sm font-semibold text-gray-700 mb-3">Nutrisi untuk {quantity}g:</p>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-lg font-bold text-gray-900">{Math.round(nutrition.calories)}</p>
                  <p className="text-xs text-gray-600">kkal</p>
                </div>
                <div>
                  <p className="text-lg font-bold text-gray-900">{Math.round(nutrition.protein * 10) / 10}</p>
                  <p className="text-xs text-gray-600">Protein</p>
                </div>
                <div>
                  <p className="text-lg font-bold text-gray-900">{Math.round(nutrition.carbs * 10) / 10}</p>
                  <p className="text-xs text-gray-600">Karbo</p>
                </div>
                <div>
                  <p className="text-lg font-bold text-gray-900">{Math.round(nutrition.fat * 10) / 10}</p>
                  <p className="text-xs text-gray-600">Lemak</p>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleQuantityCancel}
                className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
              >
                Batal
              </button>
              <button
                onClick={handleQuantityConfirm}
                disabled={isAddingFood}
                className="flex-1 px-4 py-3 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition-colors disabled:bg-emerald-400"
              >
                {isAddingFood ? (isEditMode ? 'Menyimpan...' : 'Menambah...') : (isEditMode ? 'Simpan Perubahan' : 'Tambah ke Diary')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Snackbar */}
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