// src/components/Layout.tsx
import { ReactNode, useEffect, useState } from 'react'
import { Link, useNavigate, Outlet } from 'react-router-dom'
import { Search } from 'lucide-react'
import { Card, CardContent } from "./ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Button } from "./ui/button"
import { useUser } from '../contexts/UserContext'
import { AuthPromptModal } from './AuthPromptModal'

const Layout = () => {
  const { user } = useUser()
  const navigate = useNavigate()
  const [showAuthPrompt, setShowAuthPrompt] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    // Only start the timer if user is not logged in and not on auth page
    if (!user && !window.location.pathname.includes('/auth')) {
      const timer = setTimeout(() => {
        setShowAuthPrompt(true)
      }, 15000) // 15 seconds

      return () => clearTimeout(timer)
    }
  }, [user])

  useEffect(() => {
    if (showAuthPrompt) {
      setIsModalOpen(true)
    }
  }, [showAuthPrompt])

  const getInitials = (name: string | null) => {
    if (!name) return 'GU'
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  const renderAvatar = () => {
    if (!user) return null;
    
    return (
      <div className="flex items-center gap-4">
        <span className="text-sm text-[#C1A461]">{user.full_name}</span>
        <Avatar>
          {user.avatar_url ? (
            <AvatarImage
              src={user.avatar_url}
              alt={user.full_name || 'User avatar'}
            />
          ) : null}
          <AvatarFallback className="bg-amber-500/20 text-[#C1A461]">
            {getInitials(user.full_name)}
          </AvatarFallback>
        </Avatar>
      </div>
    );
  };

  return (
    <>
      <AuthPromptModal 
        open={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
      <div className="min-h-screen bg-[#1B2228]">
        <nav className="bg-[#1B2228]">
          <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
            <div className="flex items-center gap-8">
              <Link to="/">
                <img src="/logo_small.jpg" alt="Logo" className="h-10 w-auto" />
              </Link>
              <div className="hidden md:flex items-center gap-6">
                {["Bounties", "Projects", "Grants"].map((item) => (
                  <Link 
                    key={item}
                    to={`/${item.toLowerCase()}`}
                    className="text-sm font-medium text-[#C1A461] hover:text-[#C1A461] transition-colors"
                  >
                    {item}
                  </Link>
                ))}
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <Search className="w-5 h-5 text-[#C1A461]" />
              
              {user ? (
                // Logged in state
                renderAvatar()
              ) : (
                // Not logged in state
                <div className="flex items-center gap-4">
                  <Button 
                    variant="ghost" 
                    className="text-[#C1A461] hover:bg-amber-500/20"
                    onClick={() => navigate('/sponsor')}
                  >
                    Become a Sponsor
                  </Button>
                  <Button 
                    variant="ghost" 
                    className="text-[#C1A461] hover:bg-amber-500/20"
                    onClick={() => navigate('/auth')}
                  >
                    Login
                  </Button>
                  <Button 
                    className="bg-amber-500 hover:bg-amber-600 text-gray-900"
                    onClick={() => navigate('/auth')}
                  >
                    Sign Up
                  </Button>
                </div>
              )}
            </div>
          </div>
        </nav>

        <div className="max-w-7xl mx-auto flex py-6 px-4">
          <main className="mx-auto w-full px-4">
            <Outlet />
          </main>
          <aside className="space-y-6 w-60">
            <Card className="bg-gray-800/50 border-amber-500/20 w-68">
              <CardContent className="p-4 space-y-4">
                <div>
                  <div className="flex items-center gap-2 text-2xl font-bold">
                    <span className="text-[#C1A461]">◈</span>
                    <span className="text-[#C1A461]">2,846,080</span>
                  </div>
                  <div className="text-sm text-[#C1A461]">Total Treasure Earned</div>
                </div>
                <div>
                  <div className="flex items-center gap-2 text-2xl font-bold">
                    <span className="text-[#C1A461]">◈</span>
                    <span className="text-[#C1A461]">1347</span>
                  </div>
                  <div className="text-sm text-[#C1A461]">Quests Available</div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800/50 border-amber-500/20 w-68">
              <CardContent className="p-4">
                <h2 className="font-bold text-[#C1A461] mb-4">NAVIGATION GUIDE</h2>
                <div className="space-y-6">
                  {[
                    {
                      icon: "🏴‍☠️",
                      title: "Join the Crew",
                      description: "Create your sailor's profile"
                    },
                    {
                      icon: "⚓",
                      title: "Embark on Quests",
                      description: "Build your reputation"
                    },
                    {
                      icon: "💎",
                      title: "Claim Your Treasure",
                      description: "Get rewarded for your valor"
                    }
                  ].map((step) => (
                    <div key={step.title} className="flex gap-4">
                      <div className="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center flex-shrink-0">
                        {step.icon}
                      </div>
                      <div>
                        <h3 className="font-medium text-[#C1A461]">{step.title}</h3>
                        <p className="text-sm text-[#C1A461]">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800/50 border-amber-500/20 w-68">
              <CardContent className="p-4">
                <h2 className="font-bold text-[#C1A461] mb-4">RECENT EARNERS</h2>
                {/* Recent earners content */}
              </CardContent>
            </Card>
          </aside>
        </div>
      </div>
    </>
  )
}

export default Layout