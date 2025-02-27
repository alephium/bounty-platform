import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { CircleDollarSign, Plus, BarChart3, Edit, ExternalLink } from 'lucide-react'
import { useTheme } from '@/contexts/ThemeContext'
import { useUser } from '@/contexts/UserContext'
import { supabase } from '@/lib/supabase'
import { ViewSubmissions } from '@/pages/ViewSubmission'
import { toast } from 'sonner'
import type { Bounty, Sponsor } from '@/types/supabase'

export default function SponsorDashboard() {
  const navigate = useNavigate()
  const { theme } = useTheme()
  const { user } = useUser()
  const [loading, setLoading] = useState(true)
  const [sponsor, setSponsor] = useState<Sponsor | null>(null)
  const [bounties, setBounties] = useState<Bounty[]>([])
  const [selectedBountyId, setSelectedBountyId] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<'overview' | 'bounties' | 'submissions'>('overview')

  const bgColor = theme === 'dark' ? 'bg-[#1B2228]' : 'bg-white'
  const textColor = theme === 'dark' ? 'text-[#C1A461]' : 'text-gray-900'
  const borderColor = theme === 'dark' ? 'border-[#C1A461]/20' : 'border-amber-200'
  const mutedTextColor = theme === 'dark' ? 'text-[#C1A461]/60' : 'text-gray-600'

  useEffect(() => {
    const fetchSponsorData = async () => {
      try {
        setLoading(true)
        if (!user?.id) return

        // Fetch sponsor profile
        const { data: sponsorData, error: sponsorError } = await supabase
          .from('sponsors')
          .select('*')
          .eq('user_id', user.id)
          .single()

        if (sponsorError) throw sponsorError
        setSponsor(sponsorData)

        // Fetch bounties
        const { data: bountiesData, error: bountiesError } = await supabase
          .from('bounties')
          .select('*')
          .eq('sponsor_id', sponsorData.id)
          .order('created_at', { ascending: false })

        if (bountiesError) throw bountiesError
        setBounties(bountiesData || [])

      } catch (error) {
        console.error('Error fetching sponsor data:', error)
        toast.error('Failed to load sponsor data')
      } finally {
        setLoading(false)
      }
    }

    fetchSponsorData()
  }, [user])

  // Function to handle editing a bounty
  const handleEditBounty = (bountyId: string, event: React.MouseEvent) => {
    // Stop propagation to prevent the card click event
    event.stopPropagation()
    // Navigate to edit route with the bounty ID
    navigate(`/editbounty/${bountyId}`)
  }

  // Function to handle viewing a bounty
  const handleViewBounty = (bountyId: string) => {
    navigate(`/bounty/${bountyId}`)
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
          <p className={textColor}>No sponsor profile found.</p>
          <Button
            onClick={() => navigate('/sponsor')}
            className="bg-[#C1A461] hover:bg-[#C1A461]/90 text-[#1B2228]"
          >
            Create Sponsor Profile
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className={`min-h-screen ${bgColor} p-4 md:p-8`}>
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className={`text-2xl font-bold ${textColor}`}>Sponsor Dashboard</h1>
            <p className={mutedTextColor}>{sponsor.name}</p>
          </div>
          <Button
            onClick={() => navigate('/PostListing')}
            className="bg-[#C1A461] hover:bg-[#C1A461]/90 text-[#1B2228]"
          >
            <Plus className="w-4 h-4 mr-2" />
            Create New Listing
          </Button>
        </div>

        {/* Stats Overview */}
        <div className="grid md:grid-cols-3 gap-6">
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
                    ${sponsor.total_reward_amount.toLocaleString()}
                  </h3>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as typeof activeTab)}>
          <TabsList className={`${bgColor} border-b ${borderColor} w-full justify-start rounded-none p-0 h-auto`}>
            <TabsTrigger
              value="overview"
              className={`rounded-none border-b-2 border-transparent data-[state=active]:border-[#C1A461] data-[state=active]:bg-transparent ${textColor}/60 data-[state=active]:${textColor} px-4 py-2`}
            >
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="bounties"
              className={`rounded-none border-b-2 border-transparent data-[state=active]:border-[#C1A461] data-[state=active]:bg-transparent ${textColor}/60 data-[state=active]:${textColor} px-4 py-2`}
            >
              Bounties
            </TabsTrigger>
            <TabsTrigger
              value="submissions"
              className={`rounded-none border-b-2 border-transparent data-[state=active]:border-[#C1A461] data-[state=active]:bg-transparent ${textColor}/60 data-[state=active]:${textColor} px-4 py-2`}
            >
              Submissions
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6">
            <Card className={`${bgColor} ${borderColor}`}>
              <CardHeader>
                <CardTitle className={textColor}>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                {bounties.length === 0 ? (
                  <p className={mutedTextColor}>No recent activity</p>
                ) : (
                  <div className="space-y-4">
                    {bounties.slice(0, 5).map((bounty) => (
                      <div
                        key={bounty.id}
                        className={`p-4 border ${borderColor} rounded-lg cursor-pointer hover:border-[#C1A461]/40 relative`}
                        onClick={() => handleViewBounty(bounty.id)}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className={`font-medium ${textColor}`}>{bounty.title}</h3>
                            <p className={`mt-1 text-sm ${mutedTextColor}`}>
                              {new Date(bounty.created_at).toLocaleDateString()}
                            </p>
                          </div>
                          <div className="flex gap-2">
                            <Button 
                              variant="ghost" 
                              size="sm"
                              className={`${textColor} hover:bg-[#C1A461]/10`}
                              onClick={(e) => handleEditBounty(bounty.id, e)}
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              className={`${textColor} hover:bg-[#C1A461]/10`}
                              onClick={(e) => {
                                e.stopPropagation();
                                navigate(`/bounty/${bounty.id}`);
                              }}
                            >
                              <ExternalLink className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="bounties" className="mt-6">
            <div className="space-y-4">
              {bounties.map((bounty) => (
                <Card
                  key={bounty.id}
                  className={`${bgColor} ${borderColor} hover:border-[#C1A461]/40 cursor-pointer relative`}
                >
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex-1" onClick={() => setSelectedBountyId(bounty.id)}>
                        <h3 className={`font-medium ${textColor}`}>{bounty.title}</h3>
                        <div className="flex justify-between items-center mt-2">
                          <p className={`text-sm ${mutedTextColor}`}>
                            {bounty.current_submissions} submissions
                          </p>
                          <p className={`text-sm ${mutedTextColor}`}>
                            {bounty.reward.amount} {bounty.reward.token}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2 ml-4">
                        <Button 
                          variant="outline" 
                          size="sm"
                          className={`${textColor} border-${borderColor} hover:bg-[#C1A461]/10`}
                          onClick={(e) => handleEditBounty(bounty.id, e)}
                        >
                          <Edit className="w-4 h-4 mr-2" />
                          Edit
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          className={`${textColor} border-${borderColor} hover:bg-[#C1A461]/10`}
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/bounty/${bounty.id}`);
                          }}
                        >
                          <ExternalLink className="w-4 h-4 mr-2" />
                          View
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="submissions" className="mt-6">
            {selectedBountyId ? (
              <ViewSubmissions bountyId={selectedBountyId} />
            ) : (
              <p className={mutedTextColor}>Select a bounty to view submissions</p>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}