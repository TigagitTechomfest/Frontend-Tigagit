const Card = ({ children, title, className = '', headerAction, variant = 'default' }) => {
  const variants = {
    default: 'bg-white shadow-md',
    elevated: 'bg-white shadow-lg hover:shadow-xl transition-shadow',
    highlighted: 'bg-blue-50 border border-blue-200',
    metric: 'bg-gradient-to-br from-gray-50 to-gray-100',
  };

  return (
    <div className={`rounded-xl p-6 ${variants[variant]} ${className}`}>
      {title && (
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
          {headerAction && <div>{headerAction}</div>}
        </div>
      )}
      {children}
    </div>
  );
};

export default Card;

