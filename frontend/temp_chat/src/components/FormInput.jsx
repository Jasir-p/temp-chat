export const Input = ({ 
  label, 
  type = 'text', 
  placeholder, 
  value, 
  onChange, 
  name,
  id,
  className = '',
  ...props 
}) => {
  return (
    <div className={`${className}`}>
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition-colors"
        {...props}
      />
    </div>
  );
};
