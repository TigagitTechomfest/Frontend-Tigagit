import { useState, useEffect } from 'react';
import useDiaryStore from '../store/diaryStore';
import useFoodStore from '../store/foodStore';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Input from '../components/common/Input';

const FoodDiaryPage = () => {
  const { diaryEntries, selectedDate, fetchDiary, addFoodToDiary, removeFoodFromDiary, isLoading } = useDiaryStore();
  const { searchResults, searchFood, isLoading: isSearching } = useFoodStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [selectedMealType, setSelectedMealType] = useState('breakfast');

  useEffect(() => {
    fetchDiary(selectedDate);
  }, [selectedDate]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      await searchFood(searchQuery);
      setShowSearch(true);
    }
  };

  const handleAddFood = async (food) => {
    const foodData = {
      foodId: food.id,
      foodName: food.name,
      calories: food.calories,
      protein: food.protein || 0,
      carbs: food.carbs || 0,
      fat: food.fat || 0,
      mealType: selectedMealType,
      date: selectedDate,
      quantity: food.quantity || 1,
    };
    await addFoodToDiary(foodData);
    await fetchDiary(selectedDate);
    setShowSearch(false);
    setSearchQuery('');
  };

  const handleRemoveFood = async (entryId) => {
    if (window.confirm('Yakin ingin menghapus makanan ini?')) {
      await removeFoodFromDiary(entryId);
      await fetchDiary(selectedDate);
    }
  };

  const meals = {
    breakfast: { label: '🍳 Sarapan', entries: diaryEntries.filter((e) => e.mealType === 'breakfast') },
    lunch: { label: '🍽️ Makan Siang', entries: diaryEntries.filter((e) => e.mealType === 'lunch') },
    dinner: { label: '🍴 Makan Malam', entries: diaryEntries.filter((e) => e.mealType === 'dinner') },
    snack: { label: '🍪 Cemilan', entries: diaryEntries.filter((e) => e.mealType === 'snack') },
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
                onChange={(e) => fetchDiary(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <Button
              variant="primary"
              onClick={() => setShowSearch(!showSearch)}
            >
              {showSearch ? 'Tutup Pencarian' : '+ Tambah Makanan'}
            </Button>
          </div>
        </Card>

        {/* Food Search */}
        {showSearch && (
          <Card className="mb-6">
            <h3 className="text-lg font-semibold mb-4">Cari Makanan</h3>
            <form onSubmit={handleSearch} className="mb-4">
              <div className="flex gap-2">
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Cari makanan (contoh: nasi goreng, ayam bakar)"
                  className="flex-1"
                />
                <Button type="submit" variant="primary" disabled={isSearching}>
                  {isSearching ? 'Mencari...' : 'Cari'}
                </Button>
              </div>
            </form>

            {/* Meal Type Selector */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Pilih Waktu Makan
              </label>
              <div className="flex gap-2">
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
                    key={food.id}
                    className="flex justify-between items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100"
                  >
                    <div className="flex-1">
                      <p className="font-medium">{food.name}</p>
                      <p className="text-sm text-gray-600">
                        {food.calories} kkal | P: {food.protein || 0}g | C: {food.carbs || 0}g | F: {food.fat || 0}g
                      </p>
                    </div>
                    <Button
                      variant="primary"
                      onClick={() => handleAddFood(food)}
                      className="ml-4"
                    >
                      Tambah
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

        {/* Food Diary Entries */}
        <div className="space-y-6">
          {Object.entries(meals).map(([mealType, { label, entries }]) => (
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
                        <p className="font-medium text-gray-900">{entry.foodName}</p>
                        <p className="text-sm text-gray-600 mt-1">
                          {entry.calories} kkal | P: {entry.protein || 0}g | C: {entry.carbs || 0}g | F: {entry.fat || 0}g
                        </p>
                        {entry.quantity > 1 && (
                          <p className="text-xs text-gray-500 mt-1">
                            Jumlah: {entry.quantity}
                          </p>
                        )}
                      </div>
                      <Button
                        variant="danger"
                        onClick={() => handleRemoveFood(entry.id)}
                        className="ml-4"
                      >
                        Hapus
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FoodDiaryPage;

