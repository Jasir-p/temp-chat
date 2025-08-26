import React, { useState } from 'react'
import MainLayout from '../layouts/MainLayout'
import { Tab } from '../components/Tab';



const Home = () => {
  const [activeTab, setActiveTab] = useState('all');

  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-br from-sky-50 to-sky-100">
        {/* Welcome Header */}
        <div className="bg-gradient-to-r from-sky-500 to-sky-600 text-white py-12 px-6">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-3">Welcome back, Jothish! 👋</h1>
            <p className="text-xl text-sky-100">Ready to join some interesting conversations?</p>
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
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-3">
              {activeTab === 'all' ? 'Discover Rooms' : 'Your Joined Rooms'}
            </h2>
            <p className="text-gray-600 text-lg">
              {activeTab === 'all' 
                ? 'Find and join rooms that match your interests' 
                : 'Rooms you\'re currently part of'
              }
            </p>
          </div>

          {/* Placeholder for room content */}
          <div className="mt-8 text-center text-gray-500">
            <p>Room content will be displayed here...</p>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

export default Home


