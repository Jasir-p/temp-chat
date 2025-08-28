import { Button } from "./FormButton";


export const RoomCard = ({ room, onJoin, isJoined = false }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 border border-gray-100">
      {/* Room Header */}
      <div className="flex items-center mb-4">
        <div className="w-12 h-12 bg-gradient-to-br from-sky-400 to-sky-600 rounded-full flex items-center justify-center text-white text-lg font-bold">
          {room.name.charAt(0)}
        </div>
        <div className="ml-3 flex-1">
          <h3 className="text-lg font-bold text-gray-800">{room.name}</h3>
          <p className="text-gray-500 text-sm">Created by : {room.created_by.username}</p>
        </div>

      </div>

      {/* Room Description */}
      <p className="text-gray-700 mb-4 text-sm">{room.description}</p>

      {/* Room Stats */}
      <div className="flex items-center justify-between mb-4">
        {/* <div className="flex items-center space-x-3 text-sm text-gray-600">
          <span>{room.members} members</span>
          <span className="flex items-center">
            <span className="w-2 h-2 bg-green-500 rounded-full mr-1"></span>
            {room.activeNow} active
          </span>
        </div> */}
    
      </div>

      {/* Join Button */}
      <Button
        onClick={() => onJoin(room)}
        variant={isJoined ? 'success' : 'primary'}
        size="sm"
        className="w-full"
        disabled={isJoined}
      >
        {isJoined ? '✓ Joined' : 'Join Room'}
      </Button>
    </div>
  );
};