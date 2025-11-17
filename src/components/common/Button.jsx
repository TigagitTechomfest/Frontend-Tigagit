const Button = ({ children, onClick, type = 'button', variant = 'primary', size = 'medium', className = '', disabled = false, ...props }) => {
  const baseClasses = 'rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const sizes = {
    small: 'px-4 py-2 text-sm',
    medium: 'px-6 py-3 text-base',
    large: 'px-8 py-4 text-lg',
  };
  
  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 hover:shadow-md active:scale-95',
    secondary: 'bg-gray-100 text-gray-700 hover:bg-gray-200 focus:ring-gray-500',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 hover:shadow-md active:scale-95',
    success: 'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500 hover:shadow-md',
    outline: 'border-2 border-blue-600 text-blue-600 hover:bg-blue-50 focus:ring-blue-500 bg-transparent',
    ghost: 'text-gray-700 hover:bg-gray-100 focus:ring-gray-500 bg-transparent',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${sizes[size]} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;

