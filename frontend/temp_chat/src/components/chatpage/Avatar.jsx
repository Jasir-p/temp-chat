export const Avatar = ({ src, alt, size = 'md', className = '' }) => {
  const sizes = {
    sm: 'h-8 w-8',
    md: 'h-10 w-10',
    lg: 'h-12 w-12'
  };
  
  return (
    <div className={`${sizes[size]} rounded-full bg-gray-300 flex items-center justify-center overflow-hidden ${className}`}>
      {src ? (
        <img src={src} alt={alt} className="h-full w-full object-cover" />
      ) : (
        <span className="text-gray-600 font-medium text-sm">
          {alt?.charAt(0)?.toUpperCase() || '?'}
        </span>
      )}
    </div>
  );
};