import React, { useState } from 'react'
import MainLayout from '../layouts/MainLayout'
import { Tab } from '../components/Tab';
import { RoomCard } from '../components/RoomsCard';

 const allRooms = [
    {
      id: 1,
      name: 'Tech Talk',
      category: 'Technology',
      description: 'Discuss latest tech trends, programming, and innovations.',
      members: 124,
      activeNow: 8,
      isActive: true
    },
    {
      id: 2,
      name: 'Gaming Hub',
      category: 'Gaming',
      description: 'Connect with fellow gamers and share gaming experiences.',
      members: 89,
      activeNow: 12,
      isActive: true
    },
    {
      id: 3,
      name: 'Music Lovers',
      category: 'Music',
      description: 'Share your favorite tracks and discover new music.',
      members: 156,
      activeNow: 3,
      isActive: false
    },
    {
      id: 4,
      name: 'Book Club',
      category: 'Education',
      description: 'Monthly book discussions and reading recommendations.',
      members: 67,
      activeNow: 0,
      isActive: false
    },
    {
      id: 5,
      name: 'Startup Founders',
      category: 'Business',
      description: 'Network with entrepreneurs and share startup experiences.',
      members: 45,
      activeNow: 5,
      isActive: true
    },
    {
      id: 6,
      name: 'Art & Design',
      category: 'Creative',
      description: 'Showcase your artwork and get feedback from the community.',
      members: 78,
      activeNow: 2,
      isActive: false
    }
  ];

const Home = () => {
  const [activeTab, setActiveTab] = useState('all');
  const handleJoinRoom = (room) => {
    setJoinedRooms(prev => new Set([...prev, room.id]));
    console.log(`Joined room: ${room.name}`);
  };

  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-br from-sky-50 to-sky-100">
        {/* Welcome Header */}
        <div className="bg-gradient-to-r from-sky-500 to-sky-600 text-white py-6 px-4">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-xl font-bold mb-3">Welcome back, Jothish! </h1>
            
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
              />
              <button className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700">
                Search
              </button>
            </div>
          </div>



          {/* Placeholder for room content */}
          <div className="mt-8 text-center text-gray-500">

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {allRooms.map((room) => (
                <RoomCard
                  key={room.id}
                  room={room}
                  onJoin={handleJoinRoom}
                 
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


