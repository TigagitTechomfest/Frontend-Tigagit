import { useState } from 'react';
import { Activity, AlertCircle, Check, Trash2, Zap, ChevronDown, ChevronUp } from 'lucide-react';
import useExerciseStore from '../../store/exerciseStore';
import Card from './Card';
import { p } from 'framer-motion/client';

const ExerciseForm = () => {
  const {
    exercises,
    isSubmitting,
    error,
    addExercise,
    deleteExercise,
    getExercisesToday,
  } = useExerciseStore();

  const [exerciseType, setExerciseType] = useState('');
  const [duration, setDuration] = useState('');
  const [caloriesBurned, setCaloriesBurned] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showCaloriesInput, setShowCaloriesInput] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false); // ✅ NEW: Form open/close state

  const todayExercises = getExercisesToday();

  // ✅ NEW: Calculate total calories burned
  const totalCaloriesBurned = todayExercises.reduce(
    (total, ex) => total + (ex.calories_burned || 0),
    0
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!exerciseType.trim() || !duration) {
      alert('Pilih jenis olahraga dan masukkan durasi');
      return;
    }

    try {
      await addExercise(
        exerciseType,
        duration,
        caloriesBurned ? parseInt(caloriesBurned) : null
      );

      // Reset form
      setExerciseType('');
      setDuration('');
      setCaloriesBurned('');
      setShowCaloriesInput(false);
      setSuccessMessage('✅ Olahraga berhasil dicatat!');

      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      console.error('Error adding exercise:', err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Hapus riwayat olahraga ini?')) {
      try {
        await deleteExercise(id);
      } catch (err) {
        console.error('Error deleting exercise:', err);
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with Toggle Button */}
      <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-l-4 border-blue-500">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-200 rounded-lg">
              <Activity className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h2 className="text-lg md:text-xl font-bold text-gray-900">Olahraga</h2>
              <p className="text-xs md:text-sm text-gray-600">Log aktivitas fisikmu dengan AI Gemini</p>
            </div>
          </div>

          {/* ✅ Toggle Button */}
          <button
            onClick={() => setIsFormOpen(!isFormOpen)}
            className="p-2 hover:bg-blue-100 rounded-lg transition-colors flex-shrink-0"
            title={isFormOpen ? 'Tutup form' : 'Buka form'}
          >
            {isFormOpen ? (
             <p className="text-lg md:text-xl font-bold text-blue-600">Tutup</p>
            ) : (
              <p className="text-lg md:text-xl font-bold text-blue-600">Buka</p>
            )}
          </button>
        </div>
      </Card>

      {/* Form Card - Collapsible */}
      {isFormOpen && (
        <Card className="border border-blue-200">
          <div className="space-y-5">
            {/* Title */}
            <div>
              <h3 className="font-bold text-gray-900 mb-4 text-lg">Tambah Exercise Baru</h3>
            </div>

            {/* Error Alert */}
            {error && (
              <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-lg">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-red-700">Terjadi kesalahan</p>
                  <p className="text-xs text-red-600 mt-1">{error}</p>
                </div>
              </div>
            )}

            {/* Success Alert */}
            {successMessage && (
              <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-lg">
                <Check className="w-5 h-5 text-green-600" />
                <p className="text-sm font-semibold text-green-700">{successMessage}</p>
              </div>
            )}

            {/* Form Inputs */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Jenis Olahraga */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Jenis Olahraga
                </label>
                <input
                  type="text"
                  placeholder="Contoh: Lari, Yoga, Gym, Renang..."
                  value={exerciseType}
                  onChange={(e) => setExerciseType(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-blue-300 rounded-lg font-medium text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>

              {/* Durasi */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Durasi (Menit)
                </label>
                <input
                  type="number"
                  placeholder="Contoh: 30"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  min="1"
                  className="w-full px-4 py-3 border-2 border-blue-300 rounded-lg font-medium text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>

              {/* Kalori Terbakar (Optional) */}
              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showCaloriesInput}
                    onChange={(e) => setShowCaloriesInput(e.target.checked)}
                    className="w-4 h-4 accent-yellow-500"
                  />
                  <span className="text-sm font-semibold text-gray-900">
                    💡 Input kalori terbakar (Opsional)
                  </span>
                </label>
                <p className="text-xs text-gray-600 mt-2">
                  Jika tidak diisi, AI akan estimasi berdasarkan jenis olahraga, durasi, dan berat badan Anda.
                </p>

                {showCaloriesInput && (
                  <input
                    type="number"
                    placeholder="Kalori yang terbakar"
                    value={caloriesBurned}
                    onChange={(e) => setCaloriesBurned(e.target.value)}
                    min="0"
                    className="w-full mt-3 px-4 py-3 border-2 border-yellow-300 rounded-lg font-medium text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
                  />
                )}
              </div>

              {/* Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-colors text-sm"
                  onClick={() => {
                    setExerciseType('');
                    setDuration('');
                    setCaloriesBurned('');
                    setShowCaloriesInput(false);
                  }}
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm flex items-center justify-center gap-2"
                >
                  <Activity className="w-4 h-4" />
                  {isSubmitting ? 'Menambahkan...' : '+ Tambah Exercise'}
                </button>
              </div>
            </form>
          </div>
          {todayExercises.length > 0 && (
            <div className="space-y-4 mt-4">
              <h3 className="font-bold text-gray-900 text-lg">Riwayat Hari Ini</h3>
              {todayExercises.map((exercise, idx) => (
                <Card
                  key={exercise.id}
                  className="bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 hover:shadow-md transition-all"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="px-3 py-1 bg-blue-200 rounded-full">
                          <p className="text-xs font-bold text-blue-800">{idx + 1}</p>
                        </div>
                        <h4 className="font-bold text-gray-900 text-sm md:text-base">
                          {exercise.exercise_type}
                        </h4>
                      </div>
                      <div className="flex flex-wrap gap-4 mt-2">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <span>⏱️</span>
                          <span className="font-semibold">{exercise.duration} menit</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Zap className="w-4 h-4 text-yellow-500" />
                          <span className="font-semibold">{exercise.calories_burned} kkal</span>
                        </div>
                      </div>
                    </div>

                    {/* Delete Button */}
                    <button
                      onClick={() => handleDelete(exercise.id)}
                      className="ml-2 p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors flex-shrink-0"
                      title="Hapus olahraga"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </Card>
              ))}

              {/* ✅ NEW: Total Calories Summary */}
              <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-300 mt-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-yellow-200 rounded-lg">
                      <Zap className="w-6 h-6 text-yellow-600" />
                    </div>
                    <div>
                      <p className="text-xs md:text-sm text-gray-600 font-medium">Total Kalori Terbakar</p>
                      <p className="text-2xl md:text-3xl font-bold text-gray-900">
                        {totalCaloriesBurned}
                        <span className="text-lg text-gray-600 ml-1">kkal</span>
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          )}

          {/* Empty State */}
          {todayExercises.length === 0 && (
            <Card className="text-center py-8 bg-gray-50 border-dashed">
              <Activity className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-600 font-medium">Belum ada riwayat olahraga hari ini</p>
              <p className="text-xs text-gray-500 mt-1">Tambahkan olahraga Anda di atas untuk memulai</p>
            </Card>
          )}
        </Card>

      )}

      {/* Exercises List */}

    </div>
  );
};

export default ExerciseForm;