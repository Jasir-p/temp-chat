import { Avatar } from "./Avatar";
export const Message = ({ message, isOwn }) => {
  return (
    <div className={`flex ${isOwn ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`flex items-start space-x-2 max-w-xs lg:max-w-md ${isOwn ? 'flex-row-reverse space-x-reverse' : ''}`}>
        {!isOwn && <Avatar alt={message?.user?.username} size="sm" />}
        <div>
          {!isOwn && <p className="text-xs text-gray-500 mb-1">{message?.user?.username || "Unknown"}</p>}
          <div className={`px-4 py-2 rounded-lg ${
            isOwn 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-100 text-gray-900'
          }`}>
            <p className="text-sm">{message.message}</p>
          </div>
          <p className="text-xs text-gray-500 mt-1"> {new Date(message.timestamp).toLocaleTimeString()}</p>
        </div>
      </div>
    </div>
  );
};
