import { useEffect, useState } from 'react'
import { useUser } from '../contexts/UserContext'
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar"
import { Card, CardContent } from "../components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "../components/ui/tabs"
import { Badge } from "../components/ui/badge"
import { Button } from "../components/ui/button"
import { MessageSquare, Compass, Search, Anchor, MapPin, Ship } from 'lucide-react'
import { Link } from "react-router-dom"
import { useTheme } from '../contexts/ThemeContext'

interface Bounty {
  id: number;
  type: 'HIGH_QUALITY_SOCIAL' | 'SPREADING_VIBES' | 'EXPLAIN_ALPH';
  title: string;
  submissionType: string;
  rewardAmount: {
    min?: number;
    max?: number;
    fixed?: number;
    total?: number;
  };
  rewardCurrency: string;
  maxSubmissionsPerMonth: number | string;
  epoch: {
    start: string;
    end: string;
  };
}

interface OpportunityDisplay {
  id: number;
  title: string;
  company: string;
  type: string;
  dueIn: string;
  responses: number;
  amount: string;
  verified: boolean;
}

function mapBountiesToOpportunities(bounties: Bounty[]): OpportunityDisplay[] {
  return bounties.map(bounty => ({
    id: bounty.id,
    title: bounty.title,
    company: 'Blockflow Alliance DAO',
    type: bounty.type === 'HIGH_QUALITY_SOCIAL' ? 'Content' :
          bounty.type === 'SPREADING_VIBES' ? 'Social' :
          'Documentation',
    dueIn: `${bounty.epoch.end.split('.')[1]}m`,
    responses: Math.floor(Math.random() * 20),
    amount: bounty.rewardAmount.fixed ? 
            `${bounty.rewardAmount.fixed}` :
            bounty.rewardAmount.min && bounty.rewardAmount.max ?
            `${bounty.rewardAmount.min}-${bounty.rewardAmount.max}` :
            `${bounty.rewardAmount.total}`,
    verified: true
  }));
}

const bounties: Bounty[] = [
  {
    id: 1,
    type: 'HIGH_QUALITY_SOCIAL',
    title: 'Technical Reddit Threads',
    submissionType: 'Technical reddit threads',
    rewardAmount: {
      fixed: 80
    },
    rewardCurrency: 'ALPH',
    maxSubmissionsPerMonth: 3,
    epoch: {
      start: '2024.12',
      end: '2025.02'
    }
  },
  {
    id: 2,
    type: 'HIGH_QUALITY_SOCIAL',
    title: 'Video Shorts Creation',
    submissionType: 'Video shorts on Alephium: explainers or comparisons, intros (YT, TikTok, IG)',
    rewardAmount: {
      fixed: 200
    },
    rewardCurrency: 'ALPH',
    maxSubmissionsPerMonth: 2,
    epoch: {
      start: '2024.12',
      end: '2025.02'
    }
  },
  {
    id: 3,
    type: 'HIGH_QUALITY_SOCIAL',
    title: 'Hosting AMAs',
    submissionType: 'Hosting X or TG AMAs about Alephium to the right audiences',
    rewardAmount: {
      fixed: 250
    },
    rewardCurrency: 'ALPH',
    maxSubmissionsPerMonth: 2,
    epoch: {
      start: '2024.12',
      end: '2025.02'
    }
  },
  {
    id: 4,
    type: 'HIGH_QUALITY_SOCIAL',
    title: 'Creative Content',
    submissionType: 'Alephium memes, art and other content',
    rewardAmount: {
      total: 350
    },
    rewardCurrency: 'ALPH',
    maxSubmissionsPerMonth: 'Top three submissions are rewarded each month.',
    epoch: {
      start: '2024.12',
      end: '2025.02'
    }
  },
  {
    id: 5,
    type: 'SPREADING_VIBES',
    title: 'YouTube Mentions',
    submissionType: 'Direct mentions or highlighted section on youtube videos with over 5k views (for at least 20s)',
    rewardAmount: {
      fixed: 150
    },
    rewardCurrency: 'ALPH',
    maxSubmissionsPerMonth: 2,
    epoch: {
      start: '2024.12',
      end: '2025.02'
    }
  },
  {
    id: 6,
    type: 'SPREADING_VIBES',
    title: 'Longer Explainer Videos',
    submissionType: 'Longer Alephium Explainer videos (10m - 20m)',
    rewardAmount: {
      min: 200,
      max: 700
    },
    rewardCurrency: 'ALPH',
    maxSubmissionsPerMonth: 1,
    epoch: {
      start: '2024.12',
      end: '2025.02'
    }
  },
  {
    id: 7,
    type: 'EXPLAIN_ALPH',
    title: 'Developer Guides',
    submissionType: 'Write developer guides on how to build with RALPH & Alephium*',
    rewardAmount: {
      min: 200,
      max: 500
    },
    rewardCurrency: 'ALPH',
    maxSubmissionsPerMonth: 2,
    epoch: {
      start: '2024.12',
      end: '2025.02'
    }
  },
  {
    id: 8,
    type: 'EXPLAIN_ALPH',
    title: 'Beginner Guides',
    submissionType: 'Write basic Alephium guides for beginners*',
    rewardAmount: {
      min: 100,
      max: 300
    },
    rewardCurrency: 'ALPH',
    maxSubmissionsPerMonth: 2,
    epoch: {
      start: '2024.12',
      end: '2025.02'
    }
  }
];

export default function Home() {
  const { user, loading, refreshUser } = useUser()
  const { theme } = useTheme()
  
  // Map bounties to opportunities format
  const opportunities = mapBountiesToOpportunities(bounties);

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

  const categoryFilters = ["All Quests", "Content","Social","Documentation", "Design", "Development", "Other"]
  const [selectedCategory, setSelectedCategory] = useState<string>("All Quests")
  
  // Define category mappings
  const categoryMappings = {
    "Content": ["HIGH_QUALITY_SOCIAL"],
    "Social": ["SPREADING_VIBES"],
    "Documentation": ["EXPLAIN_ALPH"]
  }

  const filteredOpportunities = opportunities.filter(opp => {
    if (selectedCategory === "All Quests") return true;
    return opp.type === selectedCategory;
  })

  return (
    <div className={`min-h-screen ${bgColor} w-full px-4`}>
      <div className="max-w-7xl mx-auto">
        <main>
          {/* Welcome Card */}
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

          {/* Main Content */}
          <div className="space-y-4">
            {/* Category Filters */}
            <div className="flex gap-2 overflow-x-auto pb-2">
              {categoryFilters.map((filter) => (
                <Button 
                  key={filter}
                  variant="outline" 
                  className={`rounded-full ${borderColor} bg-transparent ${textColor} 
                    ${theme === 'dark' ? 
                      'hover:bg-amber-500/20 hover:text-amber-400' : 
                      'hover:bg-amber-100 hover:text-amber-700'}
                    ${selectedCategory === filter ? 
                      theme === 'dark' ? 'bg-amber-500/20 text-amber-400' : 'bg-amber-100 text-amber-700' 
                      : ''}`}
                  onClick={() => setSelectedCategory(filter)}
                >
                  {filter}
                </Button>
              ))}
            </div>

            {/* Quests Card */}
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
                                {opp.responses > 0 && (
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
                              <span className={`text-sm ${mutedTextColor}`}>ALPH</span>
                            </div>
                            <Button 
                              variant="outline"
                              className={`${borderColor} bg-transparent ${textColor} 
                                ${theme === 'dark' ? 'hover:bg-amber-500/20' : 'hover:bg-amber-100'}`}
                            >
                              View Details
                            </Button>
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