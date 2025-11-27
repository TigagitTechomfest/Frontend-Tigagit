// Colors
export const colors = {
  primary: '#6CC384',
  primaryDark: '#5AB072',
  secondary: '#F9C74F',
  secondaryDark: '#E8B847',
  white: '#FFFFFF',
  black: '#000000',
  gray: {
    100: '#F3F4F6',
    200: '#E5E7EB',
    300: '#D1D5DB',
    400: '#9CA3AF',
    500: '#6B7280',
    600: '#4B5563',
    700: '#374151',
    800: '#1F2937',
    900: '#111827',
  },
  success: '#10B981',
  error: '#EF4444',
  warning: '#F59E0B',
  info: '#3B82F6',
};

// Border Radius
export const borderRadius = {
  sm: '0.25rem',    // 4px
  md: '0.5rem',     // 8px
  lg: '0.75rem',    // 12px
  xl: '1rem',       // 16px
  '2xl': '1.25rem', // 20px
  '3xl': '1.5rem',  // 24px
  full: '9999px',
};

// Shadows
export const shadows = {
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
  none: 'none',
};

// Common styles
export const commonStyles = {
  input: `w-full px-4 py-3 rounded-xl focus:ring-2 focus:ring-yellow-400 focus:border-transparent bg-white/90`,
  button: {
    primary: 'py-4 rounded-2xl bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold',
    secondary: 'py-3 px-4 rounded-2xl bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold',
    disabled: 'opacity-50 cursor-not-allowed',
  },
  card: 'bg-white/20 backdrop-blur-sm p-6 rounded-xl',
  error: 'bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl',
  success: 'bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl',
};

// Z-index
export const zIndex = {
  dropdown: 1000,
  sticky: 1020,
  fixed: 1030,
  modalBackdrop: 1040,
  modal: 1050,
  popover: 1060,
  tooltip: 1070,
};

export const transitions = {
  default: 'all 0.3s ease-in-out',
  fast: 'all 0.15s ease-in-out',
  slow: 'all 0.5s ease-in-out',
};
