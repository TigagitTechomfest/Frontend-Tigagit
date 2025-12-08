import { useState, useEffect } from 'react';
import Card from './Card';
import useAiFeedbackStore from '../../store/aifeedbackStore';

const AiFeedbackCard = ({ date }) => {
  const { feedback, isLoading, error, fetchFeedback } = useAiFeedbackStore();
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    if (date) {
      fetchFeedback(date);
    }
  }, [date, fetchFeedback]);

  if (isLoading) {
    return (
      <Card className="bg-gradient-to-br from-amber-50 to-amber-100">
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-600"></div>
          <span className="ml-3 text-gray-600 font-medium">Generating AI Feedback...</span>
        </div>
      </Card>
    );
  }

  if (!feedback) {
    return null;
  }

  return (
    <Card className="bg-gradient-to-br from-amber-50 to-amber-100 border border-amber-200 hover:shadow-lg transition-all duration-300">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="text-3xl">🤖</div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">AI Insights</h3>
              <p className="text-sm text-gray-600">Rekomendasi personal dari AI</p>
            </div>
          </div>
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-amber-700 hover:text-amber-800 font-semibold text-sm px-3 py-1 hover:bg-amber-100 rounded-lg transition-colors"
          >
            {expanded ? 'Tutup' : 'Detail'}
          </button>
        </div>

        {/* Main Feedback Message */}
        <div className="bg-white rounded-lg p-4 border border-amber-200">
          <p className="text-gray-700 leading-relaxed text-sm">
            {feedback.feedback_message}
          </p>
        </div>

        {/* Expanded Content */}
        {expanded && (
          <div className="space-y-4 pt-4 border-t border-amber-200">
            {/* Macro Analysis */}
            {feedback.macro_analysis && (
              <div className="bg-white rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <span>📊</span> Analisis Makronutrisi
                </h4>
                {typeof feedback.macro_analysis === 'string' ? (
                  <ul className="space-y-2">
                    {feedback.macro_analysis.split('\n').filter(line => line.trim()).map((line, idx) => (
                      <li key={idx} className="text-sm text-gray-700 flex items-start gap-2">
                        <span className="text-amber-600 font-bold">•</span>
                        <span>{line.trim()}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <ul className="space-y-2">
                    {Object.entries(feedback.macro_analysis).map(([key, value], idx) => (
                      <li key={idx} className="text-sm text-gray-700 flex items-start gap-2">
                        <span className="text-amber-600 font-bold">•</span>
                        <span><strong>{key}:</strong> {value}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}

            {/* Suggested Foods */}
            {feedback.suggested_foods && (
              <div className="bg-white rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <span>🍎</span> Makanan yang Disarankan
                </h4>
                {Array.isArray(feedback.suggested_foods) && feedback.suggested_foods.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {feedback.suggested_foods.map((food, idx) => (
                      <div
                        key={idx}
                        className="p-3 bg-green-50 rounded border border-green-200"
                      >
                        <p className="font-medium text-gray-900 text-sm">
                          {typeof food === 'string' ? food : food.name}
                        </p>
                        {typeof food === 'object' && food.reason && (
                          <p className="text-xs text-gray-600 mt-1">{food.reason}</p>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-600">
                    {typeof feedback.suggested_foods === 'string' 
                      ? feedback.suggested_foods 
                      : 'Tidak ada saran makanan'}
                  </p>
                )}
              </div>
            )}

            {/* Suggested Exercises */}
            {feedback.suggested_exercises && (
              <div className="bg-white rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <span>💪</span> Olahraga yang Disarankan
                </h4>
                {Array.isArray(feedback.suggested_exercises) && feedback.suggested_exercises.length > 0 ? (
                  <div className="space-y-2">
                    {feedback.suggested_exercises.map((exercise, idx) => (
                      <div
                        key={idx}
                        className="p-3 bg-blue-50 rounded border border-blue-200"
                      >
                        <p className="font-medium text-gray-900 text-sm">
                          {typeof exercise === 'string' ? exercise : exercise.name}
                        </p>
                        {typeof exercise === 'object' && (
                          <>
                            {exercise.duration && (
                              <p className="text-xs text-gray-600 mt-1">
                                ⏱️ {exercise.duration}
                              </p>
                            )}
                            {exercise.calories_burned && (
                              <p className="text-xs text-gray-600">
                                🔥 Bakar ~{exercise.calories_burned} kkal
                              </p>
                            )}
                            {exercise.reason && (
                              <p className="text-xs text-gray-600 mt-1">{exercise.reason}</p>
                            )}
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-600">
                    {typeof feedback.suggested_exercises === 'string' 
                      ? feedback.suggested_exercises 
                      : 'Tidak ada saran olahraga'}
                  </p>
                )}
              </div>
            )}
          </div>
        )}

        {/* Action Button */}
        {!expanded && (
          <button
            onClick={() => setExpanded(true)}
            className="w-full px-4 py-2 bg-amber-500 text-white rounded-lg font-medium hover:bg-amber-600 transition-colors text-sm"
          >
            Lihat Rekomendasi Lengkap →
          </button>
        )}
      </div>
    </Card>
  );
};

export default AiFeedbackCard;