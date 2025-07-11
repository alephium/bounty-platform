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
import { supabase } from '../lib/supabase'
import { Sponsor } from '../types/supabase'
import { LeaderboardService, LeaderboardEntry } from '../services/leaderboard.service'

const Layout = () => {
  const { user } = useUser()
  const { theme } = useTheme()
  const navigate = useNavigate()
  const location = useLocation()
  const [showAuthPrompt, setShowAuthPrompt] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { metrics, loading } = useRewards()
  const [isSponsor, setIsSponsor] = useState(false)
  const [checkingSponsor, setCheckingSponsor] = useState(false)
  const [topEarners, setTopEarners] = useState<LeaderboardEntry[]>([])
  const [loadingEarners, setLoadingEarners] = useState(false)

  // Check if the current user is a sponsor
  useEffect(() => {
    const checkSponsorStatus = async () => {
      if (!user?.id) return
      
      try {
        setCheckingSponsor(true)
        const { data, error } = await supabase
          .from('sponsors')
          .select('id')
          .eq('user_id', user.id)
          .maybeSingle()
          
        if (error && error.code !== 'PGRST116') {
          console.error('Error checking sponsor status:', error)
        }
        
        setIsSponsor(!!data)
      } catch (error) {
        console.error('Error checking sponsor status:', error)
      } finally {
        setCheckingSponsor(false)
      }
    }
    
    checkSponsorStatus()
  }, [user])

  // Fetch top earners for the sidebar
  useEffect(() => {
    const fetchTopEarners = async () => {
      try {
        setLoadingEarners(true)
        const leaderboard = await LeaderboardService.getLeaderboard(3) // Get top 3
        setTopEarners(leaderboard)
      } catch (error) {
        console.error('Error fetching top earners:', error)
      } finally {
        setLoadingEarners(false)
      }
    }

    fetchTopEarners()
  }, [])

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

  const handleSponsorClick = () => {
    if (!user) {
      navigate('/auth')
      return
    }
    
    if (isSponsor) {
      navigate('/sponsor/dashboard')
    } else {
      navigate('/sponsor')
    }
  }

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
              {["Bounties", "Projects", "Grants", "Leaderboard"].map((item) => (
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
                  {isSponsor ? 'Sponsor Dashboard' : 'Become a Sponsor'}
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
                <h2 className="font-bold text-theme-primary mb-4 font-sentient">NAVIGATION GUIDE</h2>
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
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-bold text-theme-primary font-sentient">TOP EARNERS</h2>
                  <Link 
                    to="/leaderboard"
                    className="text-sm text-[#C1A461] hover:underline"
                  >
                    View All
                  </Link>
                </div>
                <div className="space-y-3">
                  {loadingEarners ? (
                    <div className="text-[#C1A461] text-sm">Loading...</div>
                  ) : topEarners.length > 0 ? (
                    topEarners.map((earner) => (
                      <div key={earner.user.id} className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full bg-amber-500/20 flex items-center justify-center flex-shrink-0">
                          <span className="text-xs font-bold text-[#C1A461]">#{earner.rank}</span>
                        </div>
                        <Avatar className="w-8 h-8">
                          <AvatarImage src={earner.user.avatar_url || undefined} />
                          <AvatarFallback className="text-xs">
                            {getInitials(earner.user.full_name)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <Link 
                            to={`/profile/${earner.user.username}`}
                            className="text-sm font-medium text-[#C1A461] hover:underline truncate block"
                          >
                            {earner.user.full_name || earner.user.username}
                          </Link>
                          <p className="text-xs text-[#C1A461]/60">
                            ${earner.totalEarnings.toLocaleString()}
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-[#C1A461]/60 text-sm">No data yet</div>
                  )}
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