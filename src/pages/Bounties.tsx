import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MessageSquare, Compass, Search, Anchor, MapPin, Ship, Filter } from 'lucide-react'
import { Bounty, Status } from '@/types/supabase'
import { supabase } from '@/lib/supabase'
import { toast } from 'sonner'
import { Input } from '@/components/ui/input'
import { Link } from 'react-router-dom';

export function Bounties() {
  const navigate = useNavigate()
  
  const [bounties, setBounties] = useState<Bounty[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState<string>("All")
  const [selectedStatus, setSelectedStatus] = useState<Status>('open')
  const [searchQuery, setSearchQuery] = useState('')

  const bgColor = 'bg-background'
  const cardBg = 'bg-card'
  const textColor = 'text-foreground'
  const mutedTextColor = 'text-muted'
  const borderColor = 'border-border'
  const buttonClass = 'bg-primary hover:bg-primary/90 text-primary-foreground'

  useEffect(() => {
    const fetchBounties = async () => {
      try {
        setLoading(false)
        const { data, error } = await supabase
          .from('bounties')
          .select(`
            *,
            sponsor:sponsors(id, name, is_verified)
          `)
          .eq('status', selectedStatus)
          .order('created_at', { ascending: false })

        if (error) throw error
        setBounties(data || [])
      } catch (error) {
        console.error('Error fetching bounties:', error)
        toast.error('Failed to load bounties')
      } finally {
        setLoading(false)
      }
    }

    fetchBounties()
  }, [selectedStatus])

  const categoryFilters = ["All", "Content", "Design", "Development", "Other"]

  const filteredBounties = bounties.filter(bounty => {
    const matchesCategory = selectedCategory === "All" || 
      bounty.category.toLowerCase() === selectedCategory.toLowerCase()
    
    const matchesSearch = searchQuery === '' || 
      bounty.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bounty.sponsor?.name.toLowerCase().includes(searchQuery.toLowerCase())

    return matchesCategory && matchesSearch
  })

  const getTimeRemaining = (dueDate: string) => {
    const remaining = new Date(dueDate).getTime() - new Date().getTime()
    const days = Math.floor(remaining / (1000 * 60 * 60 * 24))
    return `${days}d`
  }

  return (
    <div className={`min-h-screen ${bgColor} w-full px-4`}>
      <div className="max-w-7xl mx-auto py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div>
            <h1 className={`text-2xl font-bold ${textColor}`}>Bounty Board</h1>
            <p className={`${mutedTextColor}`}>Discover and complete bounties to earn rewards</p>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="space-y-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className={`absolute left-3 top-3 h-4 w-4 ${mutedTextColor}`} />
              <Input
                placeholder="Search bounties..."
                className={`pl-9 ${bgColor} border-${borderColor} ${textColor}`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2 overflow-x-auto">
              {categoryFilters.map((filter) => (
                <Button 
                  key={filter}
                  variant="outline" 
                  className="bg-primary hover:bg-primary/90 text-primary-foreground"
                  onClick={() => setSelectedCategory(filter)}
                >
                  {filter}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Bounties List */}
        <Card className={`${cardBg} ${borderColor}`}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Compass className={`w-6 h-6 text-primary`} />
                <h2 className={`font-medium text-primary`}>Available Bounties</h2>
              </div>
              <span className={mutedTextColor}>{filteredBounties.length} bounties</span>
            </div>

            <Tabs value={selectedStatus} onValueChange={(value) => setSelectedStatus(value as Status)} className="w-full">
              <TabsList className="grid w-full max-w-[400px] grid-cols-3 mb-4 bg-secondary rounded-full">
                {["open", "in review", "completed"].map((tab) => (
                  <TabsTrigger 
                    key={tab}
                    value={tab as Status}
                    className="data-[state=active]:text-primary-foreground data-[state=active]:bg-primary rounded-full"
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </TabsTrigger>
                ))}
              </TabsList>

              {loading ? (
                <div className="flex justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-2 border-[#C1A461]" />
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredBounties.length === 0 ? (
                    <div className={`text-center py-8 text-primary`}>
                      No bounties found
                    </div>
                  ) : (
                    filteredBounties.map((bounty) => (
                      <Card key={bounty.id} className={`${cardBg} ${borderColor}`}>
                        <CardContent className="flex items-center justify-between p-4">
                          <div className="flex gap-4">
                            <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                              <Ship className={textColor} />
                            </div>
                            <div>
                              <h3 className={`font-medium ${textColor}`}>{bounty.title}</h3>
                              {bounty.sponsor?.id ? (
                                    <Link to={`/sponsor/${bounty.sponsor.id}`}>
                                      <div className={`flex items-center gap-1 text-sm ${textColor}`}>
                                        {/* Use a simplified hover approach */}
                                        <span className="hover:underline transition-all">
                                          {bounty.sponsor?.name || 'Unknown Sponsor'}
                                        </span>
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
                                  ) : (
                                    <div className={`flex items-center gap-1 text-sm ${textColor}`}>
                                      Unknown Sponsor
                                    </div>
                                  )}
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
                              className="border-primary text-primary hover:bg-secondary"
                              onClick={() => navigate(`/bounty/${bounty.id}`)}
                            >
                              View Details
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  )}
                </div>
              )}
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}