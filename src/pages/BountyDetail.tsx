import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Clock, Globe, MessageSquare, AlertTriangle, Send } from 'lucide-react'
import { useTheme } from "@/contexts/ThemeContext"
import { useUser } from "@/contexts/UserContext"
import { supabase } from "@/lib/supabase"
import { Bounty } from "@/types/supabase"
import { toast } from "sonner"
import { SubmissionDialog } from '../components/SubmissionDialog'
import CommentSection from '../components/CommentSection'
import LoadingPage from "./LoadingPage"
import { Link } from "react-router-dom";

export default function BountyDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { theme } = useTheme()
  const { user } = useUser()
  const [bounty, setBounty] = useState<Bounty | null>(null)
  const [loading, setLoading] = useState(true)
  const [isSubmitDialogOpen, setIsSubmitDialogOpen] = useState(false)

  const textColor = theme === 'dark' ? 'text-[#C1A461]' : 'text-gray-900'
  const bgColor = theme === 'dark' ? 'bg-[#1B2228]' : 'bg-white'
  const borderColor = theme === 'dark' ? 'border-[#C1A461]/20' : 'border-amber-200'

  // Fetch bounty data including sponsor details
  useEffect(() => {
    const fetchBounty = async () => {
      if (!id) return
      
      try {
        setLoading(true)
        // Make sure to fetch sponsor details by using the join syntax
        const { data, error } = await supabase
          .from('bounties')
          .select(`
            *,
            sponsor:sponsors(*)
          `)
          .eq('id', id)
          .single()

        if (error) throw error
        
        // Verify sponsor data is available
        if (!data.sponsor) {
          console.warn('Sponsor data not retrieved with bounty:', data.id)
        }
        
        setBounty(data)
      } catch (error) {
        console.error('Error fetching bounty:', error)
        toast.error("Failed to load bounty details")
      } finally {
        setLoading(false)
      }
    }

    fetchBounty()
  }, [id])

  const handleSubmitOpen = () => {
    if (!user) {
      toast.error("Please sign in to submit")
      navigate('/auth', { state: { returnPath: `/bounty/${id}` } })
      return
    }
    
    // Make sure bounty has sponsor data before opening dialog
    if (!bounty?.sponsor) {
      toast.error("Sponsor information is missing. Please refresh the page.")
      return
    }
    
    setIsSubmitDialogOpen(true)
  }

  const handleSubmissionComplete = async () => {
    if (!id) return

    try {
      // Refresh bounty data after submission
      const { data, error } = await supabase
        .from('bounties')
        .select(`
          *,
          sponsor:sponsors(*)
        `)
        .eq('id', id)
        .single()

      if (error) throw error
      setBounty(data)
      toast.success("Your submission has been received!")
    } catch (error) {
      console.error('Error refreshing bounty:', error)
    }
  }

  const timeRemaining = () => {
    if (!bounty?.end_date) return "N/A"
    
    try {
      const now = new Date()
      const deadline = new Date(bounty.end_date)
      
      if (isNaN(deadline.getTime())) {
        return "Invalid date"
      }
      
      const diff = deadline.getTime() - now.getTime()
      
      if (diff < 0) {
        return "Expired"
      }
      
      const days = Math.floor(diff / (1000 * 60 * 60 * 24))
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
      
      return `${days}d:${hours}h:${minutes}m`
    } catch (error) {
      console.error('Error calculating time remaining:', error)
      return "Error"
    }
  }

  const handleContactClick = () => {
    const twitterHandle = bounty?.sponsor?.twitter_handle
    const url = twitterHandle ? `https://x.com/${twitterHandle}` : 'https://x.com/'
    window.open(url, '_blank')
  }

  if (loading) {
    return <LoadingPage />
  }

  if (!bounty) {
    return (
      <div className={`min-h-screen ${bgColor} flex items-center justify-center ${textColor}`}>
        Bounty not found
      </div>
    )
  }

  return (
    <div className={`min-h-screen ${bgColor}`}>
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-[300px,1fr] gap-8">
          {/* Sidebar */}
          <aside className="space-y-6">
            <Card className={`${bgColor} ${borderColor}`}>
              <CardContent className="p-4 space-y-4">
                <div>
                  <div className="flex items-center gap-2 text-2xl font-bold">
                    <span className={textColor}>◈</span>
                    <span className={textColor}>{bounty.reward.token}</span>
                  </div>
                  <div className={`text-sm ${textColor}/60`}>
                    {bounty.reward.amount} {bounty.reward.token}
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className={`${textColor}/60`}>Submissions</span>
                    <span className={`${textColor} font-bold`}>
                      {bounty.current_submissions}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className={`${textColor}/60`}>Remaining</span>
                    <div className={`flex items-center gap-2 ${textColor}`}>
                      <Clock className="w-4 h-4" />
                      <span>{timeRemaining()}</span>
                    </div>
                  </div>
                </div>
                
                <Button 
                  variant="outline" 
                  className={`w-full border-[#C1A461]/20 bg-amber-500 text-gray-900`}
                  onClick={handleSubmitOpen}
                >
                  Submit
                </Button>
{/*                 
                <div className="p-3 bg-[#C1A461]/10 rounded-lg border border-[#C1A461]/20">
                  <div className={`flex gap-2 text-sm ${textColor}`}>
                    <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-1" />
                    <p>Register first and wait for approval before starting work.</p>
                  </div>
                </div> */}
              </CardContent>
            </Card>

            <Card className={`${bgColor} ${borderColor}`}>
              <CardContent className="p-4">
                <h3 className={`font-bold ${textColor} mb-3`}>SKILLS NEEDED</h3>
                <div className="flex flex-wrap gap-2">
                  {[bounty.category].map((skill) => (
                    <Badge 
                      key={skill}
                      variant="secondary" 
                      className="bg-[#C1A461]/20 text-[#C1A461]"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className={`${bgColor} ${borderColor}`}>
              <CardContent className="p-4">
                <h3 className={`font-bold ${textColor} mb-3`}>CONTACT</h3>
                <Button 
                  className="bg-[#C1A461] hover:bg-[#C1A461]/90 text-[#1B2228]"
                  onClick={handleContactClick}
                >
                  <Send className="w-4 h-4 mr-2" />
                  Contact Sponsor
                </Button>
              </CardContent>
            </Card>
          </aside>

          {/* Main Content */}
          <div className="space-y-6">
            <div className="flex items-start justify-between">
              <div>
                <h1 className={`text-2xl font-bold ${textColor} mb-2`}>
                  {bounty.title}
                </h1>
                <div className={`flex items-center gap-4 ${textColor}/60`}>
                  {bounty.sponsor && bounty.sponsor.id ? (
                      <Link to={`/sponsor/${bounty.sponsor.id}`}>
                        <span className="hover:underline transition-all">
                          by {bounty.sponsor.name || 'Unknown Sponsor'}
                        </span>
                      </Link>
                    ) : (
                      <span>by Unknown Sponsor</span>
                  )}
                  <Badge variant="secondary" className="bg-[#C1A461]/20 text-[#C1A461]">
                    {bounty.category}
                  </Badge>
                  <div className="flex items-center gap-1">
                    <Globe className="w-4 h-4" />
                    <span>Global</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageSquare className="w-4 h-4" />
                    <span>{bounty.current_submissions}</span>
                  </div>
                </div>
              </div>
            </div>

            <Tabs defaultValue="details" className="w-full">
              <TabsList className={`${bgColor} border-b ${borderColor} w-full justify-start rounded-none p-0 h-auto`}>
                {["Details"].map((tab) => (
                  <TabsTrigger
                    key={tab}
                    value={tab.toLowerCase()}
                    className={`rounded-none border-b-2 border-transparent data-[state=active]:border-[#C1A461] data-[state=active]:bg-transparent ${textColor}/60 data-[state=active]:${textColor} px-4 py-2`}
                  >
                    {tab}
                  </TabsTrigger>
                ))}
              </TabsList>

              <div className="py-6 space-y-8">
                <section>
                  <h2 className={`text-lg font-bold ${textColor} mb-4`}>About The Bounty</h2>
                  <p className={`${textColor}/80`}>
                    {bounty.description}
                  </p>
                </section>

                <section>
                  <h2 className={`text-lg font-bold ${textColor} mb-4`}>Requirements</h2>
                  {typeof bounty.requirements === 'string' ? (
                    <p className={`${textColor}/80`}>{bounty.requirements}</p>
                  ) : (
                    <ul className={`space-y-2 ${textColor}/80`}>
                      {Array.isArray(bounty.requirements) ? 
                        (bounty.requirements as string[]).map((req, index) => (
                          <li key={index}>{req}</li>
                        )) : 
                        <li>No requirements specified</li>
                      }
                    </ul>
                  )}
                </section>

                <section>
                  <h2 className={`text-lg font-bold ${textColor} mb-4`}>Reward</h2>
                  <p className={`${textColor}/80`}>
                    {bounty.reward.amount} {bounty.reward.token}
                  </p>
                </section>

                <section>
                  <h2 className={`text-lg font-bold ${textColor} mb-4`}>Timeline</h2>
                  <p className={`${textColor}/80`}>
                    End Date: {new Date(bounty.end_date).toLocaleDateString()}
                  </p>
                </section>

                <section>
                  <div className={`flex items-center gap-2 mb-4 ${textColor}`}>
                    <div className="flex-1">
                    <CommentSection
                      bountyId={bounty.id}
                      sponsorId={bounty.sponsor_id}
                      user={user}
                      theme={theme}
                    />
                    </div>
                  </div>
                </section>
              </div>
            </Tabs>
          </div>
        </div>
      </main>

      {/* Submit Dialog */}
      {bounty && user && (
        <SubmissionDialog 
          bounty={bounty}
          userId={user.id}
          isOpen={isSubmitDialogOpen}
          onClose={() => setIsSubmitDialogOpen(false)}
          onSubmissionComplete={handleSubmissionComplete}
        />
      )}
    </div>
  )
}