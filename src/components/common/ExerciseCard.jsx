import { useState, useEffect } from 'react';
import Card from './Card';
import Button from './Button';
import { Flame, Plus, AlertCircle, Loader, Check } from 'lucide-react';
import { borderRadius } from '../../constants/styles';
import { useExerciseStore } from '../../store/exerciseStore';
import api from '../../services/api';
import { format } from 'date-fns';

const ExerciseCard = () => {
  const { loading, error, success, clearError, clearSuccess, addExercise } = useExerciseStore();
  
  const [expanded, setExpanded] = useState(false);
  const [exercises, setExercises] = useState([]);
  const [formData, setFormData] = useState({
    exercise_type: '',
    duration: '',
  });

  // Fetch exercises dari BE
  const fetchExercises = async () => {
    try {
      const response = await api.get('/exercises');
      if (response.data.success) {
        // Filter exercises dengan exercise_date = hari ini
        const today = format(new Date(), 'yyyy-MM-dd');
        const filteredExercises = response.data.data.filter(
          ex => ex.exercise_date === today
        );
        setExercises(filteredExercises || []);
      }
    } catch (err) {
      console.error('Error fetching exercises:', err);
    }
  };

  useEffect(() => {
    fetchExercises();
  }, []);

  // Calculate total calories dari local state
  const totalCalories = exercises.reduce((sum, ex) => sum + (ex.calories_burned || 0), 0);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.exercise_type || !formData.duration) {
      return;
    }

    if (formData.duration <= 0) {
      return;
    }

    try {
      await addExercise(
        {
          exercise_type: formData.exercise_type,
          duration: parseInt(formData.duration),
        },
        async () => {
          // Refresh dari BE setelah tambah
          await fetchExercises();
        }
      );

      // Reset form
      setFormData({
        exercise_type: '',
        duration: '',
      });
      setExpanded(false);
    } catch (err) {
      console.error('Error adding exercise:', err);
    }
  };

  const exerciseOptions = [
    { value: 'Running', label: 'Lari' },
    { value: 'Walking', label: 'Jalan Kaki' },
    { value: 'Cycling', label: 'Bersepeda' },
    { value: 'Swimming', label: 'Renang' },
    { value: 'Gym - Weightlifting', label: 'Gym - Angkat Beban' },
    { value: 'Gym - Cardio', label: 'Gym - Cardio' },
    { value: 'Basketball', label: 'Basket' },
    { value: 'Yoga', label: 'Yoga' },
    { value: 'Stretching', label: 'Peregangan' },
    { value: 'HIIT', label: 'HIIT' },
  ];

  return (
    <Card 
      variant="default"
      className="mt-6 bg-gradient-to-br from-teal-50 to-emerald-50 border border-teal-200"
    >
      <div className="space-y-4">
        {/* Header - Compact */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-teal-100 p-2 rounded-lg"
              style={{
                borderRadius: borderRadius.lg,
              }}
            >
              <Flame className="w-5 h-5 text-teal-600" />
            </div>
            <div>
              <h3 className="text-base text-gray-900">Olahraga</h3>
              <p className="text-xs text-gray-600">Log aktivitas fisikmu dengan AI Gemini</p>
            </div>
          </div>
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-teal-700 hover:text-teal-800 font-semibold text-xxl px-3 py-1.5 hover:bg-teal-100 rounded-lg transition-colors whitespace-nowrap"
          >
            {expanded ? 'Tutup' : 'Tambah'}
          </button>
        </div>

        {/* Success Message */}
        {success && (
          <div className="bg-green-50 border-l-4 border-green-500 p-3 rounded flex items-start gap-2"
            style={{
              borderRadius: borderRadius.lg,
            }}
          >
            <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-xs text-green-700 font-semibold">{success.message}</p>
              <button
                onClick={clearSuccess}
                className="text-xs text-green-600 hover:text-green-800 mt-1 underline"
              >
                Tutup
              </button>
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-3 rounded flex items-start gap-2"
            style={{
              borderRadius: borderRadius.lg,
            }}
          >
            <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-xs text-red-700">{error}</p>
              <button
                onClick={clearError}
                className="text-xs text-red-600 hover:text-red-800 mt-1 underline"
              >
                Tutup
              </button>
            </div>
          </div>
        )}

        {/* Form Input (Expanded) */}
        {expanded && (
          <div 
            className="bg-teal-50 p-4 rounded-lg border border-teal-200"
            style={{
              borderRadius: borderRadius.lg,
            }}
          >
            <h4 className="font-bold text-sm text-gray-900 mb-3">Tambah Exercise Baru</h4>
            <form onSubmit={handleSubmit} className="space-y-3">
              {/* Exercise Type */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1.5">
                  Jenis Olahraga
                </label>
                <select
                  name="exercise_type"
                  value={formData.exercise_type}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  style={{
                    borderRadius: borderRadius.lg,
                  }}
                >
                  <option value="">-- Pilih --</option>
                  {exerciseOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Duration */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1.5">
                  Durasi (Menit)
                </label>
                <input
                  type="number"
                  name="duration"
                  value={formData.duration}
                  onChange={handleInputChange}
                  placeholder="Contoh: 30"
                  min="1"
                  max="600"
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  style={{
                    borderRadius: borderRadius.lg,
                  }}
                />
              </div>

              {/* Info Box */}
              <div 
                className="bg-blue-50 border border-blue-200 p-3 rounded-lg"
                style={{
                  borderRadius: borderRadius.lg,
                }}
              >
                <p className="text-xs text-gray-600">
                  💡 <span className="font-semibold">Tips:</span> Kalori otomatis dihitung oleh AI Gemini berdasarkan jenis olahraga, durasi, dan berat badan Anda.
                </p>
              </div>

              {/* Buttons */}
              <div className="flex gap-2 pt-2">
                <Button
                  variant="secondary"
                  onClick={() => setExpanded(false)}
                  className="flex-1 text-sm py-1.5"
                >
                  Batal
                </Button>
                <Button
                  variant="primary"
                  type="submit"
                  disabled={loading}
                  className="flex-1 flex items-center justify-center gap-2 text-sm py-1.5"
                >
                  {loading ? (
                    <>
                      <Loader className="w-4 h-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Plus className="w-4 h-4" />
                      Tambah Exercise
                    </>
                  )}
                </Button>
              </div>
            </form>
          </div>
        )}
      </div>
    </Card>
  );
};

export default ExerciseCard;