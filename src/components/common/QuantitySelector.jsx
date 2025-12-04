import { useState } from 'react';
import { colors, borderRadius, commonStyles } from '../../constants/styles';
import Button from './Button';
import Card from './Card';


const QuantitySelector = ({ food, mealType, onConfirm, onCancel }) => {
  const [quantity, setQuantity] = useState(100);  // default 100 grams

  const commonPortions = {
    breakfast: [50, 100, 150, 200],
    lunch: [100, 150, 200, 250, 300],
    dinner: [100, 150, 200, 250, 300],
    snack: [25, 50, 75, 100, 150],
  };

  const portions = commonPortions[mealType] || [50, 100, 150, 200];

  const calculateNutrients = () => {
    const ratio = quantity / 100;
    return {
      calories: Math.round(food.calories_per_100g * ratio),
      protein: Math.round((food.protein_per_100g * ratio) * 10) / 10,
      carbs: Math.round((food.carbs_per_100g * ratio) * 10) / 10,
      fat: Math.round((food.fat_per_100g * ratio) * 10) / 10,
    };
  };

  const nutrients = calculateNutrients();

  const handleConfirm = () => {
    onConfirm({
      ...food,
      quantity,
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <Card className="w-96 shadow-2xl" variant="default">
        {/* Header */}
        <div className="mb-6">
          <h3 className="text-xl font-bold text-gray-900">
            {food.food_name || food.name}
          </h3>
          <p className={`text-sm ${colors.gray[600]} mt-1`}>
            Pilih jumlah porsi
          </p>
        </div>

        {/* Quick Portions */}
        <div className="mb-6">
          <label className={`block text-sm font-medium ${colors.gray[700]} mb-3`}>
            Porsi Cepat (gram)
          </label>
          <div className="grid grid-cols-4 gap-2">
            {portions.map((portion) => (
              <button
                key={portion}
                onClick={() => setQuantity(portion)}
                className={`py-2 px-2 rounded-lg font-medium text-sm transition-all ${
                  quantity === portion
                    ? `bg-blue-600 text-white shadow-md`
                    : `${colors.gray[200]} text-gray-700 hover:${colors.gray[300]}`
                }`}
                style={{
                  borderRadius: borderRadius.lg,
                }}
              >
                {portion}g
              </button>
            ))}
          </div>
        </div>

        {/* Custom Input */}
        <div className="mb-6">
          <label className={`block text-sm font-medium ${colors.gray[700]} mb-2`}>
            Jumlah Custom (gram)
          </label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
            min="1"
            className={`w-full px-4 py-2 border ${colors.gray[300]} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
            style={{
              borderRadius: borderRadius.lg,
            }}
          />
        </div>

        {/* Nutrition Preview */}
        <div className={`${colors.gray[50]} rounded-lg p-4 mb-6 border ${colors.gray[200]}`} style={{
          borderRadius: borderRadius.lg,
        }}>
          <p className={`text-sm font-medium ${colors.gray[900]} mb-3`}>
            Nutrisi untuk {quantity}g:
          </p>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <p className="font-semibold text-red-600">{nutrients.calories}</p>
              <p className={`text-xs ${colors.gray[600]}`}>kkal</p>
            </div>
            <div>
              <p className="font-semibold text-blue-600">{nutrients.protein}g</p>
              <p className={`text-xs ${colors.gray[600]}`}>Protein</p>
            </div>
            <div>
              <p className="font-semibold text-yellow-600">{nutrients.carbs}g</p>
              <p className={`text-xs ${colors.gray[600]}`}>Karbohidrat</p>
            </div>
            <div>
              <p className="font-semibold text-orange-600">{nutrients.fat}g</p>
              <p className={`text-xs ${colors.gray[600]}`}>Lemak</p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <Button
            variant="secondary"
            onClick={onCancel}
            className="flex-1"
          >
            Batal
          </Button>
          <Button
            variant="primary"
            onClick={handleConfirm}
            className="flex-1"
          >
            Tambah ke Diary
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default QuantitySelector;