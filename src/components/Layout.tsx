import { useEffect, useState } from 'react'
import { Link, useNavigate, Outlet, useLocation } from 'react-router-dom'
import { Search } from 'lucide-react'
import { Card, CardContent } from "./ui/card"
import { Button } from "./ui/button"
import { useUser } from '../contexts/UserContext'
import { AvatarDropdown } from './ui/AvatarDropdown'
import { SessionProvider } from "../contexts/SessionContext"
import { ThemeToggle } from './ThemeToggle'
import { useRewards } from '../hooks/useRewards'

const Layout = () => {
  const { user } = useUser()
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

  const getInitials = (name?: string) => {
    if (!name) return 'GU'
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  const renderAvatar = () => {
    if (!user) return null
    return <AvatarDropdown user={user} getInitials={getInitials} />
  }

  return (
    <>
      <SessionProvider>
        <div className={`min-h-screen bg-background`}>
          <nav className={`bg-background border-b border-border`}>
            <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
              {/* Left side */}
              <div className="flex items-center gap-8">
                <Link to="/">
                  <img src="/logo_small.jpg" alt="Logo" className="h-10 w-auto" />
                </Link>
                <div className="hidden md:flex items-center gap-6">
                  {["Bounties", "Projects", "Grants"].map((item) => (
                    <Link 
                      key={item}
                      to={`/${item.toLowerCase()}`}
                      className={`text-sm font-medium text-foreground hover:opacity-80 transition-colors relative`}
                    >
                      {item}
                    </Link>
                  ))}
                </div>
              </div>
              
              {/* Right side */}
              <div className="flex items-center gap-4">
                <Search className="w-5 h-5 text-foreground" />
                <ThemeToggle />
                
                {user ? (
                  <div className="flex items-center gap-4">
                    {isAlephiumTeam && (
                      <Button 
                        className="bg-primary hover:bg-primary/90 text-primary-foreground"
                        onClick={() => navigate('/sponsor')}
                      >
                        Become a Sponsor
                      </Button>
                    )}
                    {renderAvatar()}
                  </div>
                ) : (
                  <div className="flex items-center gap-4">
                    <Button 
                      variant="secondary"
                      className="border-primary text-primary hover:bg-secondary"
                      onClick={() => navigate('/sponsor')}
                    >
                      Become a Sponsor
                    </Button>
                    <Button 
                      className="bg-primary hover:bg-primary/90 text-primary-foreground"
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
              <Card className={`bg-background border-border`}>
                <CardContent className="p-4 space-y-4">
                  <div>
                    <div className="flex items-center gap-2 text-2xl font-bold">
                      <span className="text-primary">◈</span>
                      <span className="text-primary">
                        {loading
                          ? '...'
                          : new Intl.NumberFormat('en-US', {
                              style: 'currency',
                              currency: 'USD',
                              minimumFractionDigits: 0,
                              maximumFractionDigits: 0,
                            }).format(metrics.totalOpenRewards)}
                      </span>
                    </div>
                    <div className="text-sm text-primary">Total Treasure Open</div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 text-2xl font-bold">
                      <span className="text-primary">◈</span>
                      <span className="text-primary">
                        {loading ? '...' : metrics.availableQuests}
                      </span>
                    </div>
                    <div className="text-sm text-primary">Quests Available</div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <h2 className="font-bold text-primary mb-4">NAVIGATION GUIDE</h2>
                  <div className="space-y-6">
                    {[
                      {
                        icon: "🏴‍☠️",
                        title: "Join the Crew",
                        description: "Create your sailor's profile",
                      },
                      {
                        icon: "⚓",
                        title: "Embark on Quests",
                        description: "Build your reputation",
                      },
                      {
                        icon: "💎",
                        title: "Claim Your Treasure",
                        description: "Get rewarded for your valor",
                      },
                    ].map((step) => (
                      <div key={step.title} className="flex gap-4">
                        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                          {step.icon}
                        </div>
                        <div>
                          <h3 className="font-medium text-primary">{step.title}</h3>
                          <p className="text-sm text-primary">{step.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className={`bg-background border-border`}>
                <CardContent className="p-4">
                  <h2 className="font-bold text-primary mb-4">RECENT EARNERS</h2>
                  <div>
                    <h3 className="font-medium text-primary">Coming Soon</h3>
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