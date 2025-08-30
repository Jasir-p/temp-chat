import { Users,Info,MoreVertical } from "lucide-react"
import { Badge } from "./Badge"
import { Button } from "../FormButton"

export const ChatHeader = ({roomName,onViewAbout,onlineCount}) =>{

    return(
        <div className="bg-white  border-b border-gray-200 px-4 py-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <div>
                        <h1 className="text-xl font-semibold text-garay-900">{roomName}</h1>
                        <div className="flex items-center space-x-2 mt-1">
                            <Users className="h-4 w-4 text-green-500"/>
                            <span className="text-sm text-gray-600">{onlineCount}</span>
                            <Badge variant="success">Active</Badge>
                        </div>
                    </div>
                </div>

                <div className="flex items-center space-x-2">
                <Button  variant="ghost" size="icon" onClick={onViewAbout}>
                <Info className="h-5 w-5"/>
                </Button>
                <Button variant="'ghost" size="icon">
                    <MoreVertical className="h-5 w-5"/>
                </Button>

            </div>
            </div>
            
        </div>
    )
}