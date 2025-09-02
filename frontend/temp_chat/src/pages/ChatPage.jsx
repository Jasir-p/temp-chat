import React, { useEffect,useState } from 'react'
import { useChatSocket } from '../hooks/useWebsocket'
import { ChatHeader } from '../components/chatpage/ChatHeader'
import MainLayout from '../layouts/MainLayout'
import { Message } from '../components/chatpage/Message'
import { ChatInput } from '../components/chatpage/ChatInput'
import { Sidebar } from '../components/chatpage/Sidebar'
import { fetchMessage } from '../api/ChatMessageApi'
import { getSingleChatRoom } from '../api/ChatRoomApi'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'




const ChatPage = () => {
    
const {roomId} = useParams()
const[messages,setMessages]= useState([])
const [onlineMembers,setOnlineMembers]= useState([])
const {sendMessage,socket} = useChatSocket(roomId,setMessages,setOnlineMembers)
const [sidebarOpen, setSidebarOpen] = useState(false);
const userId = useSelector((state)=>state.auth.userId)
const [roomData,setRoomData] = useState(null)
const navigate = useNavigate()

useEffect (()=>{
    if (!socket) return
},[socket])

console.log(roomData);

useEffect (()=>{
  const getMessages = async()=>{
    try{
    const data = await fetchMessage(roomId)
    setMessages(data)
  } catch(error){
    console.log(error);
    
  }
}
if (roomId){
  getMessages()
}

},[roomId])


useEffect (()=>{
  const getChatRoom = async()=>{
    try{
      const data = await getSingleChatRoom(roomId)
      setRoomData(data)
    }catch(error){
      console.log(error);
      
    }

  }
  if(roomId){
    getChatRoom()
  }
},[roomId])
console.log(onlineMembers);
function leaveRoom() {
  if (socket && socket.readyState === WebSocket.OPEN) {
    socket.close();
    navigate('/home')
  }
}

  return (
    <MainLayout>
      <div className={`flex ${sidebarOpen ? 'w-[1200px]' : 'w-[900px]'} h-[600px] bg-gray-50 shadow-md mx-auto my-10 transition-all duration-300`}>
        
        {/* Main Chat Area */}
        <div className={`flex flex-col ${sidebarOpen ? 'w-2/3' : 'w-full'} transition-all duration-300`}>
          <ChatHeader roomName={roomData?.name} onViewAbout={() => setSidebarOpen(true)} onlineCount={onlineMembers.length} />

          <div className='flex-1 overflow-y-auto px-6 py-4'>
            {messages.map((message) => (
              <Message 
                key={message.id} 
                message={message}
                isOwn={message.user.id ===userId} 
              />
            ))}
          </div>
          
          <ChatInput onSend ={(msg)=>sendMessage(msg)} />
        </div>

        {/* Sidebar */}
        {sidebarOpen && (
          <div className="w-1/3 animate-slide-in">
            <Sidebar 
              isOpen={sidebarOpen} 
              onClose={() => setSidebarOpen(false)}
              roomData={roomData}
              onlineCount={onlineMembers.length}
              members={onlineMembers}
              leaveRoom = {leaveRoom}
              
            />
          </div>
        )}
        
      </div>
    </MainLayout>
    
  )
}

export default ChatPage
