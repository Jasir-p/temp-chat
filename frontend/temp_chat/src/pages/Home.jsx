import React, { useState,useEffect } from 'react'
import MainLayout from '../layouts/MainLayout'
import { Tab } from '../components/Tab';
import { RoomCard } from '../components/RoomsCard';
import { fetchChatRooms } from '../api/ChatRoomApi';
import { useDebounce } from '../hooks/useDebounce';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import CreateRoom from './CreateRoom';
import { removeChatRoom } from '../api/ChatRoomApi';
import { showError,showSuccess } from '../utils/toast';





const Home = () => {

  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('all');
  const [rooms, setRooms] = useState([]);
  const [search,setSearch]= useState(null)
  const[isOpen,setIsOpen]= useState(false)
  const [change,setChange]=useState(false)
  const debouncedSearch = useDebounce(search,300)
  const Username = useSelector((state)=>state.auth.username)
  const userId = useSelector((state)=>state.auth.userId)

  
  
  const handleJoinRoom = (room) => {
    console.log(`Joined room: ${room.name}`);
    navigate(`/room/${room.id}`)

  };

  const deleteChatRoom = async(roomId)=>{
    try{
      const response = await removeChatRoom(roomId)
      setChange(!change)
      showSuccess("successfull deleted")
      
    }catch(error){
      console.log(error);
      
      const errors = error?.response?.data?.error || "failed to delete Chat Room"
      showError(errors)
    }
    
  }

useEffect(() => {
    const loadRooms = async () => {
      const params = {};
      if (debouncedSearch) params.search = debouncedSearch;
      if (activeTab === "my") params.myrooms = true;
       try {
            const data = await fetchChatRooms(params);
            console.log(data);
            setRooms(data.data || [])
          } catch (error) {
            console.error("Error fetching chat rooms:", error);
            
          }
    };
    loadRooms();
  }, [activeTab,debouncedSearch,change]); 



  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-br from-sky-50 to-sky-100">
        {/* Welcome Header */}
        <div className="bg-gradient-to-r from-sky-500 to-sky-600 text-white py-6 px-4">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-xl font-bold mb-3">Welcome back,{Username} </h1>
            
          </div>
        </div>

        <div className="bg-white shadow-sm py-6">
          
          <div className="max-w-6xl mx-auto px-6">
            <div className="flex justify-center">
              <div className="flex space-x-3 bg-gray-50 p-2 rounded-xl shadow-inner">
                <Tab 
                  label="All Rooms" 
                  isActive={activeTab === 'all'} 
                  onClick={() => setActiveTab('all')}
                />
                <Tab 
                  label="My Rooms"
                  isActive={activeTab === 'my'} 
                  onClick={() => setActiveTab('my')}
                />
              </div>
              <button
        onClick={() => setIsOpen(true)}
        className="ml-4 px-4 py-2 rounded-lg bg-sky-600 text-white font-medium hover:bg-sky-700 transition"
      >
        + Create Room
      </button>
            </div>
            
          </div>
        </div>

        {/* Content Area */}
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="flex justify-center mb-8">
          <div className="flex items-center w-full max-w-md bg-white rounded-xl shadow p-2 ">
              <input
                type="text"
                placeholder="Search..."
                className="flex-1 px-3 py-2 text-sm text-gray-700 focus:outline-none"
                value={search}
                onChange={(e)=>setSearch(e.target.value)}
              />
              
            </div>
          </div>



          {/* Placeholder for room content */}
          <div className="mt-8 text-center text-gray-500">
          {isOpen && (
            <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
              <CreateRoom onClose={() => setIsOpen(false) } onChange={()=>setChange(!change)} />
            </div>
          )}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {rooms.map((room) => (
                <RoomCard
                  key={room.id}
                  room={room}
                  onJoin={handleJoinRoom}
                  isOwn = {userId===room.created_by.id}
                  handleDelete={deleteChatRoom}
                  
                 
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

export default Home


