// src/pages/Home.tsx
import { useUser } from '../contexts/UserContext'
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar"
import { Card, CardContent } from "../components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "../components/ui/tabs"
import { Badge } from "../components/ui/badge"
import { Button } from "../components/ui/button"
import { MessageSquare, Compass, Search, Anchor, MapPin, Ship } from 'lucide-react'
import { Link } from "react-router-dom"

export default function Home() {
  const { user } = useUser()

  const getInitials = (name: string | null) => {
    if (!name) return 'GU'
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  return (
    <div className="min-h-screen bg-[#1B2228] text-gray-100">
      <div className="w-full h-screen px-4">
        <div className="max-w-7xl mx-auto">
          <main>
            <Card className="bg-gradient-to-br from-amber-500/20 to-amber-500/5 border-amber-500/20 mb-6">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <Avatar className="w-12 h-12 border-2 border-[#c3a95a]">
                    {user?.avatar_url ? (
                      <AvatarImage
                        src={user.avatar_url}
                        alt={user.full_name || 'User avatar'}
                      />
                    ) : null}
                    <AvatarFallback className="bg-amber-500/20 text-[#C1A461]">
                      {getInitials(user?.full_name)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h1 className="text-2xl font-bold text-[#C1A461]">
                      Welcome aboard, Captain {user?.full_name || 'Guest'}
                    </h1>
                    <p className="text-[#C1A461]">Your next adventure awaits on $ALPH Bounty Lands</p>
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
                    className="rounded-full border-amber-500/20 bg-transparent text-[#C1A461] hover:bg-amber-500/20 hover:text-amber-400"
                  >
                    {filter}
                  </Button>
                ))}
              </div>

              <Card className="bg-gray-800/50 border-amber-500/20">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-4">
                    <Compass className="w-6 h-6 text-[#C1A461]" />
                    <h2 className="font-bold text-[#C1A461]">Available Quests</h2>
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
                        <Card key={opp.id} className="bg-gray-800/50 border-amber-500/20">
                          <CardContent className="flex items-center justify-between p-4">
                            <div className="flex gap-4">
                              <div className="w-12 h-12 bg-amber-500/10 rounded-lg flex items-center justify-center">
                                <Ship className="w-6 h-6 text-[#C1A461]" />
                              </div>
                              <div>
                                <h3 className="font-medium text-[#C1A461]">{opp.title}</h3>
                                <div className="flex items-center gap-1 text-sm text-[#C1A461]">
                                  {opp.company}
                                  {opp.verified && (
                                    <Badge variant="secondary" className="bg-amber-500/20 text-[#C1A461]">
                                      <Anchor className="w-3 h-3 mr-1" />
                                      Verified
                                    </Badge>
                                  )}
                                </div>
                                <div className="flex items-center gap-4 text-sm text-[#C1A461] mt-1">
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
                                  <span className="text-[#C1A461]">◈</span>
                                  <span className="font-medium text-[#C1A461]">{opp.amount}</span>
                                </div>
                                <span className="text-sm text-[#C1A461]">USDC</span>
                              </div>
                              {opp.type === "Project" && (
                                <Button 
                                  variant="outline"
                                  className="border-amber-500/20 bg-transparent text-[#C1A461] hover:bg-amber-500/20"
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