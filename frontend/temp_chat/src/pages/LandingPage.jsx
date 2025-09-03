import React from 'react'
import { Logo } from '../components/Logo'
import { Button } from '../components/FormButton'
import { SocialIcon } from '../components/SocialIcon'
import { MessageCircle, Users, Shield, Zap, Linkedin, Instagram, Github, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';


const LandingPage = () => {
  const navigate = useNavigate()
  return (
    
      <div className="min-h-screen bg-gradient-to-br from-sky-50 via-blue-50 to-cyan-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-50">
        <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
          <Logo size="md" />
          <div className="flex space-x-4">
            <Button variant="secondary" size="sm" onClick={()=>navigate('/login')}>
              Login
            </Button>
            <Button variant="primary" size="sm" onClick={()=>navigate('/register')}>
              Sign Up
            </Button>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <Logo size="lg" />
          <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mt-8 mb-6 leading-tight">
            Chat Without Limits
          </h1>
          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            Connect with friends, family, and communities around the world. Experience the future of messaging with Let Chat - where conversations come alive.
          </p>
          
        </div>
      </section>

    
      {/* CTA Section */}
      <section className="bg-gradient-to-r from-sky-500 to-blue-600 py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Start Chatting?
          </h2>
          <p className="text-xl text-sky-100 mb-10 max-w-2xl mx-auto">
            Join thousands of users who have already discovered the joy of seamless communication.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="outline" size="lg" className="shadow-xl">
              Create Account
            </Button>
            <Button variant="secondary" size="lg" className="shadow-xl">
              Learn More
            </Button>
          </div>
        </div>
      </section>

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

export default LandingPage
