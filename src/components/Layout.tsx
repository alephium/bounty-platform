import { ReactNode, useEffect, useState } from 'react'
import { Link, useNavigate, Outlet, useLocation } from 'react-router-dom'
import { Search, Sun, Moon, Plus } from 'lucide-react'
import { Card, CardContent } from "./ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Button } from "./ui/button"
import { useUser } from '../contexts/UserContext'
import { useTheme } from '../contexts/ThemeContext'
import { AvatarDropdown } from './ui/AvatarDropdown'
import { SessionProvider } from "../contexts/SessionContext";
import { ThemeToggle } from './ThemeToggle'
import { useRewards } from '../hooks/useRewards'

const Layout = () => {
  const { user } = useUser()
  const { theme } = useTheme()
  const navigate = useNavigate()
  const location = useLocation()
  const [showAuthPrompt, setShowAuthPrompt] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { metrics, loading } = useRewards()

  const isAlephiumTeam = user?.email?.endsWith('@alephium.org')

  useEffect(() => {
    if (user && location.pathname.includes('/auth')) {
      navigate('/')
    }
  }, [user, location.pathname, navigate])
  
  useEffect(() => {
    if (showAuthPrompt) {
      setIsModalOpen(true)
    }
  }, [showAuthPrompt])

  // MVP implementation of sponsor button handler
  const handleSponsorClick = async () => {
    if (!user) {
      // If no user is logged in, redirect to auth page
      navigate('/auth');
      return;
    }
    
    try {
      // For MVP: Simple check if the user has a sponsor ID
      // In a full implementation, this would use SponsorService.getCurrentUserSponsor()
      const isSponsor = localStorage.getItem('isSponsor') === 'true';
      
      if (isSponsor) {
        // User is a sponsor, redirect to dashboard
        navigate('/sponsor/dashboard');
      } else {
        // User is not a sponsor, redirect to onboarding
        navigate('/sponsor');
      }
    } catch (error) {
      console.error('Error checking sponsor status:', error);
      // On error, default to the onboarding page
      navigate('/sponsor');
    }
  };

  const getInitials = (name: string | null) => {
    if (!name) return 'GU'
    return name.split(' ').map(part => part[0]).join('').toUpperCase().slice(0, 2)
  }

  const renderAvatar = () => {
    if (!user) return null
    return <AvatarDropdown user={user} getInitials={getInitials} />
  }

  const bgColor = theme === 'dark' ? 'bg-[#1B2228]' : 'bg-white'
  const textColor = theme === 'dark' ? 'text-[#C1A461]' : 'text-gray-900'
  const borderColor = theme === 'dark' ? 'border-[#C1A461]/20' : 'border-amber-200'

  return (
    <>
    <SessionProvider>
      <div className={`min-h-screen ${bgColor}`}>
      <nav className={`${bgColor} border-b ${borderColor}`}>
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
          {/* Left side remains the same */}
          <div className="flex items-center gap-8">
            <Link to="/">
              <img src="/logo_small.jpg" alt="Logo" className="h-10 w-auto" />
            </Link>
            <div className="hidden md:flex items-center gap-6">
              {["Bounties", "Projects", "Grants"].map((item) => (
                <Link 
                  key={item}
                  to={`/${item.toLowerCase()}`}
                  className={`text-sm font-medium ${textColor} hover:opacity-80 transition-colors relative`}
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>
          
          {/* Right side updated with theme toggle */}
          <div className="flex items-center gap-4">
            <Search className={`w-5 h-5 ${textColor}`} />
            <ThemeToggle />  {/* Add theme toggle here */}
            
            {user ? (
              <div className="flex items-center gap-4">
                <Button 
                  className={theme === 'dark' ? 
                    "bg-[#C1A461] hover:bg-[#C1A461]/90 text-[#1B2228]" : 
                    "bg-amber-500 hover:bg-amber-600 text-white"}
                  onClick={handleSponsorClick}
                >
                  Sponsor
                </Button>
                {renderAvatar()}
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <Button 
                  variant="outline"
                  className={theme === 'dark' ? 
                    "border-[#C1A461] text-[#C1A461] hover:bg-[#C1A461]/10" : 
                    "border-amber-500 text-amber-500 hover:bg-amber-50"}
                  onClick={() => navigate('/sponsor')}
                >
                  Become a Sponsor
                </Button>
                <Button 
                  className={theme === 'dark' ? 
                    "bg-[#C1A461] hover:bg-[#C1A461]/90 text-[#1B2228]" : 
                    "bg-amber-500 hover:bg-amber-600 text-white"}
                  onClick={() => navigate('/auth')}
                >
                  Sign in
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
          <Card className={`${bgColor} ${borderColor}`}>
            <CardContent className="p-4 space-y-4">
              <div>
                <div className="flex items-center gap-2 text-2xl font-bold">
                  <span className="text-[#C1A461]">◈</span>
                  <span className="text-[#C1A461]">
                    {loading ? '...' : new Intl.NumberFormat('en-US', {
                      style: 'currency',
                      currency: 'USD',
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0
                    }).format(metrics.totalOpenRewards)}
                  </span>
                </div>
                <div className="text-sm text-[#C1A461]">Total Treasure Open</div>
              </div>
              <div>
                <div className="flex items-center gap-2 text-2xl font-bold">
                  <span className="text-[#C1A461]">◈</span>
                  <span className="text-[#C1A461]">
                    {loading ? '...' : metrics.availableQuests}
                  </span>
                </div>
                <div className="text-sm text-[#C1A461]">Quests Available</div>
              </div>
            </CardContent>
          </Card>

            <Card className={`${bgColor} ${borderColor}`}>
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

            <Card className={`${bgColor} ${borderColor}`}>
              <CardContent className="p-4">
                <h2 className="font-bold text-[#C1A461] mb-4">RECENT EARNERS</h2>
                <div>
                  <h3 className="font-medium text-[#C1A461]">Coming Soon</h3>
                </div>
              </CardContent>
            </Card>
          </aside>
        </div>
      </div>
      </SessionProvider>
    </>
  )
}

export default Layout