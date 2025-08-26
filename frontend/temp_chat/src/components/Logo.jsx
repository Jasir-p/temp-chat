import { MessageCircle } from "lucide-react";
export const Logo = ({ size = 'md' }) => {
  const sizes = {
    sm: 'text-xl',
    md: 'text-2xl',
    lg: 'text-4xl'
  };
  
  return (
    <div className="flex items-center space-x-2">
      <div className="bg-sky-500 p-2 rounded-lg">
        <MessageCircle className="text-white" size={size === 'lg' ? 32 : size === 'md' ? 24 : 20} />
      </div>
      <span className={`font-bold text-sky-900 ${sizes[size]}`}>
        Let Chat
      </span>
    </div>
  );
};
