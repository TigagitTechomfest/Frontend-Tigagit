import { useEffect, useState } from 'react';
import { colors, borderRadius } from '../../constants/styles';

const Snackbar = ({ message, type = 'error', duration = 5000, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (!isVisible) {
      onClose?.();
      return;
    }

    const timer = setTimeout(() => {
      setIsVisible(false);
    }, duration);

    return () => clearTimeout(timer);
  }, [isVisible, duration, onClose]);

  if (!isVisible) return null;

  const typeStyles = {
    error: {
      bg: 'bg-red-500',
      icon: '⚠️',
      shadowColor: 'rgba(239, 68, 68, 0.3)',
    },
    success: {
      bg: 'bg-green-500',
      icon: '✅',
      shadowColor: 'rgba(34, 197, 94, 0.3)',
    },
    warning: {
      bg: 'bg-yellow-500',
      icon: '⚡',
      shadowColor: 'rgba(234, 179, 8, 0.3)',
    },
    info: {
      bg: 'bg-blue-500',
      icon: 'ℹ️',
      shadowColor: 'rgba(59, 130, 246, 0.3)',
    },
  };

  const style = typeStyles[type] || typeStyles.error;

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
        <div
          className={`${style.bg} text-white px-8 py-4 rounded-2xl shadow-2xl flex items-center gap-4 animate-bounce-in pointer-events-auto max-w-md`}
          style={{
            borderRadius: borderRadius.xl,
            boxShadow: `0 20px 40px ${style.shadowColor}`,
            animation: 'scaleIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
          }}
        >
          <span className="text-2xl flex-shrink-0">{style.icon}</span>
          <div className="flex-1">
            <p className="text-sm font-medium text-white">
              {message}
            </p>
          </div>
          <button
            onClick={() => setIsVisible(false)}
            className="flex-shrink-0 text-lg cursor-pointer text-white hover:opacity-70 transition-opacity"
          >
            ✕
          </button>
        </div>
      </div>

      <style>{`
        @keyframes scaleIn {
          from {
            transform: scale(0.8);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }

        @keyframes slideOutDown {
          from {
            transform: scale(1);
            opacity: 1;
          }
          to {
            transform: translateY(20px);
            opacity: 0;
          }
        }
      `}</style>
    </>
  );
};

export default Snackbar;