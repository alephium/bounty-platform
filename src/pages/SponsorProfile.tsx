import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { ExternalLink, Twitter, Github, MessageSquare, Globe, CircleDollarSign, BarChart3 } from 'lucide-react'
import { useTheme } from '@/contexts/ThemeContext'
import { supabase } from '@/lib/supabase'
import { toast } from 'sonner'
import type { Sponsor, Bounty } from '@/types/supabase'

export default function SponsorProfile() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { theme } = useTheme()
  const [sponsor, setSponsor] = useState<Sponsor | null>(null)
  const [bounties, setBounties] = useState<Bounty[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'bounties' | 'about'>('bounties')

  // Theme-specific styles
  const bgColor = theme === 'dark' ? 'bg-[#1B2228]' : 'bg-white'
  const textColor = theme === 'dark' ? 'text-[#C1A461]' : 'text-gray-900'
  const borderColor = theme === 'dark' ? 'border-[#C1A461]/20' : 'border-amber-200'
  const mutedTextColor = theme === 'dark' ? 'text-[#C1A461]/60' : 'text-gray-600'
  const hoverBg = theme === 'dark' ? 'hover:bg-[#C1A461]/10' : 'hover:bg-amber-50'

  useEffect(() => {
    const fetchSponsorData = async () => {
      try {
        setLoading(true)
        
        // Fetch sponsor profile
        const { data: sponsorData, error: sponsorError } = await supabase
          .from('sponsors')
          .select('*')
          .eq('id', id)
          .single()

        if (sponsorError) throw sponsorError
        setSponsor(sponsorData)

        // Fetch bounties
        const { data: bountiesData, error: bountiesError } = await supabase
          .from('bounties')
          .select('*')
          .eq('sponsor_id', id)
          .order('created_at', { ascending: false })

        if (bountiesError) throw bountiesError
        setBounties(bountiesData || [])

      } catch (error) {
        console.error('Error fetching sponsor data:', error)
        toast.error('Failed to load sponsor profile')
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchSponsorData()
    }
  }, [id])

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount)
  }

  const getTimeRemaining = (dueDate: string) => {
    const remaining = new Date(dueDate).getTime() - new Date().getTime()
    const days = Math.floor(remaining / (1000 * 60 * 60 * 24))
    return days > 0 ? `${days}d` : 'Ended'
  }

  if (loading) {
    return (
      <div className={`min-h-screen ${bgColor} flex items-center justify-center`}>
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-[#C1A461]" />
      </div>
    )
  }

  if (!sponsor) {
    return (
      <div className={`min-h-screen ${bgColor} flex items-center justify-center`}>
        <div className="text-center space-y-4">
          <p className={textColor}>Sponsor not found.</p>
          <Button
            onClick={() => navigate('/bounties')}
            className="bg-[#C1A461] hover:bg-[#C1A461]/90 text-[#1B2228]"
          >
            Back to Bounties
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className={`min-h-screen ${bgColor}`}>
      {/* Header with gradient */}
      <div className="h-48 bg-gradient-to-r from-amber-500/20 to-amber-500/5 relative">
        {sponsor.logo_url && (
          <div className="absolute inset-0 flex items-center justify-center opacity-10">
            <img 
              src={sponsor.logo_url} 
              alt={sponsor.name} 
              className="max-h-full object-contain"
            />
          </div>
        )}
      </div>
      
      <div className="max-w-6xl mx-auto px-4 -mt-24">
        <div className="space-y-8">
          {/* Profile Header */}
          <div className="flex flex-col md:flex-row justify-between items-start gap-6">
            <div className="flex items-end gap-6">
              <Avatar className="w-32 h-32 border-4 border-[#1B2228] rounded-full bg-amber-500/10">
                <AvatarImage src={sponsor.logo_url || undefined} />
                <AvatarFallback className="text-2xl text-[#C1A461]">
                  {sponsor.name?.split(' ').map(part => part[0]).join('').toUpperCase().slice(0, 2)}
                </AvatarFallback>
              </Avatar>
              
              <div className="mt-4">
                <div className="flex items-center gap-2">
                  <h1 className={`text-2xl font-bold ${textColor}`}>
                    {sponsor.name}
                  </h1>
                  {sponsor.is_verified && (
                    <Badge className="bg-blue-500/20 text-blue-400">Verified</Badge>
                  )}
                </div>
                <p className={mutedTextColor}>
                  {sponsor.description || 'A sponsor on the Alephium platform'}
                </p>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-3 mt-2">
              {sponsor.website_url && (
                <Button 
                  variant="outline" 
                  size="sm"
                  className={`${borderColor} ${textColor} ${hoverBg}`}
                  onClick={() => window.open(sponsor.website_url!, '_blank')}
                >
                  <Globe className="w-4 h-4 mr-2" />
                  Website
                </Button>
              )}
              {sponsor.twitter_handle && (
                <Button 
                  variant="outline" 
                  size="sm"
                  className={`${borderColor} ${textColor} ${hoverBg}`}
                  onClick={() => window.open(`https://twitter.com/${sponsor.twitter_handle}`, '_blank')}
                >
                  <Twitter className="w-4 h-4 mr-2" />
                  Twitter
                </Button>
              )}
              {sponsor.github_handle && (
                <Button 
                  variant="outline" 
                  size="sm"
                  className={`${borderColor} ${textColor} ${hoverBg}`}
                  onClick={() => window.open(`https://github.com/${sponsor.github_handle}`, '_blank')}
                >
                  <Github className="w-4 h-4 mr-2" />
                  GitHub
                </Button>
              )}
              {sponsor.discord_url && (
                <Button 
                  variant="outline" 
                  size="sm"
                  className={`${borderColor} ${textColor} ${hoverBg}`}
                  onClick={() => window.open(sponsor.discord_url!, '_blank')}
                >
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Discord
                </Button>
              )}
            </div>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className={`${bgColor} ${borderColor}`}>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-full bg-[#C1A461]/10">
                    <CircleDollarSign className="w-6 h-6 text-[#C1A461]" />
                  </div>
                  <div>
                    <p className={mutedTextColor}>Total Bounties</p>
                    <h3 className={`text-2xl font-bold ${textColor}`}>
                      {sponsor.total_bounties_count}
                    </h3>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className={`${bgColor} ${borderColor}`}>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-full bg-[#C1A461]/10">
                    <BarChart3 className="w-6 h-6 text-[#C1A461]" />
                  </div>
                  <div>
                    <p className={mutedTextColor}>Total Projects</p>
                    <h3 className={`text-2xl font-bold ${textColor}`}>
                      {sponsor.total_projects_count}
                    </h3>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className={`${bgColor} ${borderColor}`}>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-full bg-[#C1A461]/10">
                    <CircleDollarSign className="w-6 h-6 text-[#C1A461]" />
                  </div>
                  <div>
                    <p className={mutedTextColor}>Total Rewards</p>
                    <h3 className={`text-2xl font-bold ${textColor}`}>
                      {formatCurrency(sponsor.total_reward_amount)}
                    </h3>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Tabs for Content */}
          <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as 'bounties' | 'about')}>
            <TabsList className={`${bgColor} border-b ${borderColor} w-full justify-start rounded-none p-0 h-auto`}>
              <TabsTrigger
                value="bounties"
                className={`rounded-none border-b-2 border-transparent data-[state=active]:border-[#C1A461] data-[state=active]:bg-transparent ${textColor}/60 data-[state=active]:${textColor} px-4 py-2`}
              >
                Active Bounties
              </TabsTrigger>
              <TabsTrigger
                value="about"
                className={`rounded-none border-b-2 border-transparent data-[state=active]:border-[#C1A461] data-[state=active]:bg-transparent ${textColor}/60 data-[state=active]:${textColor} px-4 py-2`}
              >
                About
              </TabsTrigger>
            </TabsList>

            <TabsContent value="bounties" className="pt-6">
              {bounties.length === 0 ? (
                <div className="text-center py-12">
                  <p className={mutedTextColor}>No active bounties at the moment.</p>
                </div>
              ) : (
                <div className="grid gap-4">
                  {bounties.map((bounty) => (
                    <Card 
                      key={bounty.id} 
                      className={`${bgColor} ${borderColor} cursor-pointer hover:border-[#C1A461]/40 transition-colors`}
                      onClick={() => navigate(`/bounty/${bounty.id}`)}
                    >
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className={`text-lg font-medium ${textColor}`}>{bounty.title}</h3>
                            <div className="flex flex-wrap gap-2 mt-2">
                              <Badge variant="outline" className={borderColor}>
                                {bounty.category}
                              </Badge>
                              {bounty.tags && bounty.tags.slice(0, 3).map((tag, index) => (
                                <Badge key={index} variant="outline" className={borderColor}>
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                            <p className={`mt-3 text-sm ${mutedTextColor} line-clamp-2`}>
                              {bounty.description}
                            </p>
                            <div className="flex items-center gap-4 mt-3 text-sm">
                              <span className={mutedTextColor}>
                                Due in {getTimeRemaining(bounty.end_date)}
                              </span>
                              <span className={mutedTextColor}>
                                {bounty.current_submissions} submissions
                              </span>
                            </div>
                          </div>
                          <div className="flex flex-col items-end">
                            <div className="flex items-center gap-1 text-lg font-bold">
                              <span className={textColor}>◈</span>
                              <span className={textColor}>{bounty.reward.amount}</span>
                            </div>
                            <span className={`text-sm ${mutedTextColor}`}>{bounty.reward.token}</span>
                            <Button
                              variant="ghost"
                              size="sm"
                              className={`mt-4 ${textColor} ${hoverBg}`}
                              onClick={(e) => {
                                e.stopPropagation();
                                navigate(`/bounty/${bounty.id}`);
                              }}
                            >
                              <ExternalLink className="w-4 h-4 mr-2" />
                              View Details
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="about" className="pt-6">
              <Card className={`${bgColor} ${borderColor}`}>
                <CardHeader>
                  <CardTitle className={textColor}>About {sponsor.name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {sponsor.description ? (
                    <div>
                      <h3 className={`text-lg font-medium ${textColor} mb-2`}>Description</h3>
                      <p className={mutedTextColor}>{sponsor.description}</p>
                    </div>
                  ) : (
                    <p className={mutedTextColor}>No additional information available about this sponsor.</p>
                  )}
                  
                  <div>
                    <h3 className={`text-lg font-medium ${textColor} mb-2`}>Sponsor Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className={`${textColor} font-medium`}>Joined</p>
                        <p className={mutedTextColor}>
                          {new Date(sponsor.created_at).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </p>
                      </div>
                      <div>
                        <p className={`${textColor} font-medium`}>Status</p>
                        <div className="flex items-center gap-2">
                          <Badge className={sponsor.is_verified ? 
                            "bg-green-500/20 text-green-400" : 
                            "bg-yellow-500/20 text-yellow-400"
                          }>
                            {sponsor.is_verified ? 'Verified' : 'Pending Verification'}
                          </Badge>
                        </div>
                      </div>
                      <div>
                        <p className={`${textColor} font-medium`}>Total Bounties</p>
                        <p className={mutedTextColor}>{sponsor.total_bounties_count}</p>
                      </div>
                      <div>
                        <p className={`${textColor} font-medium`}>Total Projects</p>
                        <p className={mutedTextColor}>{sponsor.total_projects_count}</p>
                      </div>
                      <div>
                        <p className={`${textColor} font-medium`}>Total Reward Amount</p>
                        <p className={mutedTextColor}>{formatCurrency(sponsor.total_reward_amount)}</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className={`text-lg font-medium ${textColor} mb-2`}>Contact & Social</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {sponsor.website_url && (
                        <div>
                          <p className={`${textColor} font-medium`}>Website</p>
                          <a 
                            href={sponsor.website_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`${mutedTextColor} hover:${textColor} flex items-center gap-1`}
                          >
                            {sponsor.website_url}
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                      )}
                      {sponsor.twitter_handle && (
                        <div>
                          <p className={`${textColor} font-medium`}>Twitter</p>
                          <a 
                            href={`https://twitter.com/${sponsor.twitter_handle}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`${mutedTextColor} hover:${textColor} flex items-center gap-1`}
                          >
                            @{sponsor.twitter_handle}
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                      )}
                      {sponsor.github_handle && (
                        <div>
                          <p className={`${textColor} font-medium`}>GitHub</p>
                          <a 
                            href={`https://github.com/${sponsor.github_handle}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`${mutedTextColor} hover:${textColor} flex items-center gap-1`}
                          >
                            @{sponsor.github_handle}
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                      )}
                      {sponsor.discord_url && (
                        <div>
                          <p className={`${textColor} font-medium`}>Discord</p>
                          <a 
                            href={sponsor.discord_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`${mutedTextColor} hover:${textColor} flex items-center gap-1`}
                          >
                            Join Discord
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}