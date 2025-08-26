
export const Tab = ({ label, isActive, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`px-6 py-3 font-semibold rounded-lg transition-all duration-200 ${
        isActive 
          ? 'bg-sky-600 text-white shadow-md' 
          : 'bg-white text-gray-700 hover:bg-sky-50 hover:text-sky-600 border border-gray-200'
      }`}
    >
      {label}
    </button>
  );
};