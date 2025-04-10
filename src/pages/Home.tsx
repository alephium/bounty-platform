import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUser } from '../contexts/UserContext'
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar"
import { Card, CardContent } from "../components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "../components/ui/tabs"
import { Badge } from "../components/ui/badge"
import { Button } from "../components/ui/button"
import { MessageSquare, Compass, Search, Anchor, MapPin, Ship } from 'lucide-react'
import { useTheme } from '../contexts/ThemeContext'
import { Bounty, Status } from '@/types/supabase'
// import { supabase } from '@/lib/supabase'
import { toast } from 'sonner'
import { useSession } from "../contexts/SessionContext";
import supabase from "../supabase";
import { Link } from "react-router-dom";

export default function Home() {
  // const { session } = useSession();

  const { user} = useUser() 
  // console.log(user)
  const { theme } = useTheme()
  const navigate = useNavigate()
  
  const [bounties, setBounties] = useState<Bounty[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState<string>("All Quests")
  const [selectedStatus, setSelectedStatus] = useState<Status>('open')

  const bgColor = theme === 'dark' ? 'bg-[#1B2228]' : 'bg-white'
  const textColor = theme === 'dark' ? 'text-[#C1A461]' : 'text-gray-900'
  const borderColor = theme === 'dark' ? 'border-[#C1A461]/20' : 'border-amber-200'
  const mutedTextColor = theme === 'dark' ? 'text-[#C1A461]/60' : 'text-gray-600'
  const cardBg = theme === 'dark' ? 'bg-gray-800/50' : 'bg-white'

  // Fetch bounties
  useEffect(() => {
    const fetchBounties = async () => {
      try {
        setLoading(true)
        const { data, error } = await supabase
          .from('bounties')
          .select(`
            *,
            sponsor:sponsors(*)
          `)
          .eq('status', selectedStatus)
          // .eq('id', id)
          .order('created_at', { ascending: false })


        if (error) throw error

        const updatedBounties = await Promise.all(data.map(async (bounty) => {
          if (bounty.status !== 'completed' && new Date(bounty.end_date) < new Date()) {
            const { error: updateError } = await supabase
              .from('bounties')
              .update({ status: 'completed' })
              .eq('id', bounty.id)

            if (updateError) {
              console.error('Error updating bounty status:', updateError)
              return bounty
            }

            return { ...bounty, status: 'completed' }
          }

          return bounty
        }))

        setBounties(updatedBounties)
        } catch (error) {
          console.error('Error fetching bounties:', error)
          toast.error('Failed to load bounties')
        } finally {
          setLoading(false)
        }
      }
    fetchBounties()
  }, [selectedStatus])

  const getInitials = (name: string | null) => {
    if (!name) return 'GU'
    return name.split(' ').map(part => part[0]).join('').toUpperCase().slice(0, 2)
  }

  const categoryFilters = ["All Quests", "Content", "Design", "Development", "Other"]

  const filteredBounties = bounties.filter(bounty => {
    if (selectedCategory === "All Quests") return true
    return bounty.category.toLowerCase() === selectedCategory.toLowerCase()
  })

  // Calculate time remaining
  const getTimeRemaining = (dueDate: string) => {
    const remaining = new Date(dueDate).getTime() - new Date().getTime()
    const days = Math.floor(remaining / (1000 * 60 * 60 * 24))
    return `${days}d`
  }

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
                      src={user?.avatar_url}
                      alt={user?.full_name || 'User avatar'}
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

                <Tabs value={selectedStatus} onValueChange={(value) => setSelectedStatus(value as Status)} className="w-full">
                  <TabsList className="grid w-full max-w-[400px] grid-cols-3 mb-4 bg-gray-800">
                    {["open", "in review", "completed"].map((tab) => (
                      <TabsTrigger 
                        key={tab}
                        value={tab as Status}
                        className="data-[state=active]:bg-amber-500 data-[state=active]:text-gray-900"
                      >
                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                      </TabsTrigger>
                    ))}
                  </TabsList>

                  { <div className="space-y-4">
                      {filteredBounties.map((bounty) => (
                        <Card key={bounty.id} className={`${cardBg} ${borderColor}`}>
                          <CardContent className="flex items-center justify-between p-4">
                            <div className="flex gap-4">
                              <div className={`w-12 h-12 ${theme === 'dark' ? 
                                'bg-amber-500/10' : 'bg-amber-100'} rounded-lg flex items-center justify-center`}>
                                <Ship className={textColor} />
                              </div>
                              <div>
                                <h3 className={`font-medium ${textColor}`}>{bounty.title}</h3>
                                  <Link to={`/sponsor/${bounty.sponsor?.id}`}>
                                    <div className={`flex items-center gap-1 text-sm ${textColor}`}>
                                      {/* If sponsor is available, show the sponsor name */}
                                      {bounty.sponsor?.name || 'Unknown Sponsor'}
                                      {bounty.sponsor?.is_verified && (
                                        <Badge 
                                          variant="secondary" 
                                          className={`${theme === 'dark' ? 
                                            'bg-amber-500/20' : 'bg-amber-100'} ${textColor}`}
                                        >
                                          <Anchor className="w-3 h-3 mr-1" />
                                          Verified
                                        </Badge>
                                      )}
                                    </div>
                                  </Link>
                                <div className={`flex items-center gap-4 text-sm ${textColor} mt-1`}>
                                  <div className="flex items-center gap-1">
                                    <MapPin className="w-4 h-4" />
                                    <span>{bounty.category}</span>
                                  </div>
                                  <span>Due in {getTimeRemaining(bounty.end_date)}</span>
                                  {bounty.current_submissions > 0 && (
                                    <div className="flex items-center gap-1">
                                      <MessageSquare className="w-4 h-4" />
                                      <span>{bounty.current_submissions}</span>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-4">
                              <div className="text-right">
                                <div className="flex items-center gap-1">
                                  <span className={textColor}>◈</span>
                                  <span className={`font-medium ${textColor}`}>{bounty.reward.amount}</span>
                                </div>
                                <span className={`text-sm ${mutedTextColor}`}>{bounty.reward.token}</span>
                              </div>
                              <Button 
                                variant="outline"
                                className={`${borderColor} bg-transparent ${textColor} 
                                  ${theme === 'dark' ? 'hover:bg-amber-500/20' : 'hover:bg-amber-100'}`}
                                onClick={() => navigate(`/bounty/${bounty.id}`)}
                              >
                                View Details
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  }
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}