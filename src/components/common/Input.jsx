import { colors, borderRadius, commonStyles } from '../../constants/styles';

const Input = ({ 
  label, 
  type = 'text', 
  value, 
  onChange, 
  placeholder, 
  error, 
  className = '', 
  required = false, 
  icon, 
  ...props 
}) => {
  return (
    <div className="mb-4">
      {label && (
        <label className={`block text-sm font-medium ${colors.gray[700]} mb-2`}>
          {label}
          {required && <span className={`${colors.error} ml-1`}>*</span>}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {icon}
          </div>
        )}
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className={`${commonStyles.input} ${
            error 
              ? `border-2 ${colors.error} focus:ring-2 focus:ring-${colors.error}` 
              : `border ${colors.gray[300]}`
          } ${icon ? 'pl-10' : ''} ${className}`}
          style={{
            borderRadius: borderRadius.xl,
            transition: 'all 0.2s ease-in-out',
          }}
          {...props}
        />
      </div>
      {error && <p className={`mt-1 text-sm ${colors.error}`}>{error}</p>}
    </div>
  );
};

export default Input;

