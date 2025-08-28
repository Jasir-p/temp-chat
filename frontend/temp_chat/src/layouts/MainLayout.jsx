import React from 'react'
import { Logo } from '../components/Logo'
import { Button } from '../components/FormButton'
import { Settings, Linkedin, Instagram, Github, User } from 'lucide-react'
import { SocialIcon } from '../components/SocialIcon'
import { Logout } from '../api/LogoutApi'
import { useNavigate } from 'react-router-dom'

const MainLayout = ({ children }) => {

  const navigate = useNavigate()

  const handleLogout = async()=>{
    const response = await Logout()

    if (response){
      navigate('/login')
    }
  }
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-sky-50 via-blue-50 to-cyan-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-50">
        <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
          <Logo size="md" />
          <div className="flex space-x-6 items-center">
            <Settings size={30} />
            <Button variant="primary" size="sm" onClick={handleLogout}>
              Log Out
            </Button>
          </div>
        </nav>
      </header>

      {/* Main content area */}
      <main className="flex-1  overflow-y-auto">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <Logo size="md" />
              <p className="text-gray-400 mt-2 max-w-md">
                Connecting people through seamless, secure, and fast messaging experiences.
              </p>
            </div>

            <div className="flex flex-col items-center md:items-end">
              <h3 className="text-lg font-semibold mb-4">Connect With Me</h3>
              <div className="flex space-x-4">
                <SocialIcon 
                  href="https://linkedin.com/in/yourprofile" 
                  icon={Linkedin} 
                  label="LinkedIn"
                />
                <SocialIcon 
                  href="https://instagram.com/yourprofile" 
                  icon={Instagram} 
                  label="Instagram"
                />
                <SocialIcon 
                  href="https://github.com/yourprofile" 
                  icon={Github} 
                  label="GitHub"
                />
                <SocialIcon 
                  href="https://yourportfolio.com" 
                  icon={User} 
                  label="Portfolio"
                />
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-8 pt-8 text-center">
            <p className="text-gray-400">
              © 2025 Let Chat. All rights reserved. Made with ❤️ for better conversations.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default MainLayout
