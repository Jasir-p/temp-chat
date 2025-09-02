import { Card } from "./Card";
import { Button } from "../FormButton";
import { X } from "lucide-react";
import { Avatar } from "./Avatar";
import { Badge } from "./Badge";
import formatTime from "../../utils/formatTime";
export const Sidebar = ({ isOpen, onClose, leaveRoom,roomData = "jasir", onlineCount = 1, members = null }) => {
  if (!isOpen) return null;
  
  return (
    <div className="w-full h-full bg-white border-l border-gray-200">
      <div className="flex flex-col h-full">
        {/* Sidebar Header */}
        <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Room Details</h2>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>
        
        {/* Sidebar Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Room Info */}
          <Card className="p-4">
            <h3 className="text-sm font-medium text-gray-900 mb-3">Room Information</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Name:</span>
                <span className="text-sm font-medium text-gray-900">{roomData?.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Online:</span>
                <Badge variant="success">{onlineCount} members</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Created:</span>
                <span className="text-sm text-gray-500">{formatTime(roomData.created_at)}</span>
              </div>
            </div>
          </Card>
          
          {/* Online Members */}
          <Card className="p-4">
            <h3 className="text-sm font-medium text-gray-900 mb-3">Online Members ({onlineCount})</h3>
            <div className="space-y-3">
              {members && members.map((member) => (
                <div key={member.id} className="flex items-center space-x-3">
                  <Avatar alt={member.username} size="sm" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{member.username}</p>
                  </div>
                  <div className={'w-2 h-2 rounded-full bg-green-400'} />
                </div>
              ))}
            </div>
          </Card>
          
          {/* Room Settings */}
          <Card className="p-4">
            
            <div className="space-y-2">
              <Button variant="danger" size="sm" className="w-full justify-start" onClick={()=>leaveRoom()}>
                Leave Room
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};