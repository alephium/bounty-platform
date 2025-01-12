// src/pages/Home.tsx
import { useEffect } from 'react'
import { useUser } from '../contexts/UserContext'
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar"
import { Card, CardContent } from "../components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "../components/ui/tabs"
import { Badge } from "../components/ui/badge"
import { Button } from "../components/ui/button"
import { MessageSquare, Compass, Search, Anchor, MapPin, Ship } from 'lucide-react'
import { Link } from "react-router-dom"
import { useTheme } from '../contexts/ThemeContext'

export default function Home() {
  const { user, loading, refreshUser } = useUser()
  const { theme } = useTheme()

  useEffect(() => {
    refreshUser()
  }, [])
  
  const bgColor = theme === 'dark' ? 'bg-[#1B2228]' : 'bg-white'
  const textColor = theme === 'dark' ? 'text-[#C1A461]' : 'text-gray-900'
  const borderColor = theme === 'dark' ? 'border-[#C1A461]/20' : 'border-amber-200'
  const mutedTextColor = theme === 'dark' ? 'text-[#C1A461]/60' : 'text-gray-600'
  const cardBg = theme === 'dark' ? 'bg-gray-800/50' : 'bg-white'

  const getInitials = (name: string | null) => {
    if (!name) return 'GU'
    return name.split(' ').map(part => part[0]).join('').toUpperCase().slice(0, 2)
  }


  return (
    <div className={`min-h-screen ${bgColor} w-full px-4`}>
      <div className="max-w-7xl mx-auto">
        <main>
          <Card className={`${theme === 'dark' ? 
            'bg-gradient-to-br from-amber-500/20 to-amber-500/5' : 
            'bg-gradient-to-br from-amber-100 to-amber-50'} 
            ${borderColor} mb-6`}>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                 <Avatar className="w-12 h-12 border-2 border-[#c3a95a]">
                    {user?.avatar_url ? (
                      <AvatarImage
                        src={user.avatar_url}
                        alt={user.full_name || 'User avatar'}
                        onError={(e) => {
                          e.currentTarget.src = '/placeholder.svg'
                        }}
                      />
                    ) : (
                      <AvatarFallback className="bg-amber-500/20 text-[#C1A461]">
                        {getInitials(user?.full_name || null)}
                      </AvatarFallback>
                    )}
                  </Avatar>
                <div>
                  <h1 className={`text-2xl font-bold ${textColor}`}>
                    Welcome aboard, Captain {user?.full_name || 'Guest'}
                  </h1>
                  <p className={textColor}>Your next adventure awaits on $ALPH Bounty Lands</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-4">
            <div className="flex gap-2 overflow-x-auto pb-2">
              {["All Quests", "Content", "Design", "Development", "Other"].map((filter) => (
                <Button 
                  key={filter}
                  variant="outline" 
                  className={`rounded-full ${borderColor} bg-transparent ${textColor} 
                    ${theme === 'dark' ? 
                      'hover:bg-amber-500/20 hover:text-amber-400' : 
                      'hover:bg-amber-100 hover:text-amber-700'}`}
                >
                  {filter}
                </Button>
              ))}
            </div>

            <Card className={`${cardBg} ${borderColor}`}>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-4">
                  <Compass className={`w-6 h-6 ${textColor}`} />
                  <h2 className={`font-bold ${textColor}`}>Available Quests</h2>
                </div>

                <Tabs defaultValue="open" className="w-full">
                  <TabsList className="grid w-full max-w-[400px] grid-cols-3 mb-4 bg-gray-800">
                    {["Open", "In Review", "Completed"].map((tab) => (
                      <TabsTrigger 
                        key={tab}
                        value={tab.toLowerCase()}
                        className="data-[state=active]:bg-amber-500 data-[state=active]:text-gray-900"
                      >
                        {tab}
                      </TabsTrigger>
                    ))}
                  </TabsList>

                  <div className="space-y-4">
                    {opportunities.map((opp) => (
                      <Card key={opp.id} className={`${cardBg} ${borderColor}`}>
                        <CardContent className="flex items-center justify-between p-4">
                          <div className="flex gap-4">
                            <div className={`w-12 h-12 ${theme === 'dark' ? 
                              'bg-amber-500/10' : 'bg-amber-100'} rounded-lg flex items-center justify-center`}>
                              <Ship className={textColor} />
                            </div>
                            <div>
                              <h3 className={`font-medium ${textColor}`}>{opp.title}</h3>
                              <div className={`flex items-center gap-1 text-sm ${textColor}`}>
                                {opp.company}
                                {opp.verified && (
                                  <Badge variant="secondary" className={`${theme === 'dark' ? 
                                    'bg-amber-500/20' : 'bg-amber-100'} ${textColor}`}>
                                    <Anchor className="w-3 h-3 mr-1" />
                                    Verified
                                  </Badge>
                                )}
                              </div>
                              <div className={`flex items-center gap-4 text-sm ${textColor} mt-1`}>
                                <div className="flex items-center gap-1">
                                  <MapPin className="w-4 h-4" />
                                  <span>{opp.type}</span>
                                </div>
                                <span>Due in {opp.dueIn}</span>
                                {opp.responses && (
                                  <div className="flex items-center gap-1">
                                    <MessageSquare className="w-4 h-4" />
                                    <span>{opp.responses}</span>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="text-right">
                              <div className="flex items-center gap-1">
                                <span className={textColor}>◈</span>
                                <span className={`font-medium ${textColor}`}>{opp.amount}</span>
                              </div>
                              <span className={`text-sm ${mutedTextColor}`}>USDC</span>
                            </div>
                            {opp.type === "Project" && (
                              <Button 
                                variant="outline"
                                className={`${borderColor} bg-transparent ${textColor} 
                                  ${theme === 'dark' ? 'hover:bg-amber-500/20' : 'hover:bg-amber-100'}`}
                              >
                                Join Crew
                              </Button>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}

const opportunities = [
  {
    id: 1,
    title: "Chart the Unknown Waters",
    company: "LightDao",
    type: "Quest",
    dueIn: "1d",
    responses: 21,
    amount: "150",
    verified: false
  },
  {
    id: 2,
    title: "Forge the Solana AI Compass",
    company: "SendAI",
    type: "Quest",
    dueIn: "3d",
    responses: 3,
    amount: "3,000",
    verified: false
  },
  {
    id: 3,
    title: "Map the DeFi Seas",
    company: "Etherfuse",
    type: "Quest",
    dueIn: "4d",
    responses: 36,
    amount: "8,000",
    verified: true
  }
]