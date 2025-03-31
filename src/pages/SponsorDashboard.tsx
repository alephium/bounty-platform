import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { CircleDollarSign, Plus, BarChart3, Edit, ExternalLink, ArrowLeft, Eye, CheckCircle, XCircle } from 'lucide-react'
import { useTheme } from '@/contexts/ThemeContext'
import { useUser } from '@/contexts/UserContext'
import { supabase } from '@/lib/supabase'
import { toast } from 'sonner'
import type { Bounty, Sponsor, BountySubmission } from '@/types/supabase'
import LoadingPage from '../pages/LoadingPage'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"

export default function SponsorDashboard() {
  const navigate = useNavigate()
  const { theme } = useTheme()
  const { user } = useUser()
  
  // States
  const [loading, setLoading] = useState(true)
  const [sponsor, setSponsor] = useState<Sponsor | null>(null)
  const [bounties, setBounties] = useState<Bounty[]>([])
  const [selectedBounty, setSelectedBounty] = useState<Bounty | null>(null)
  const [submissions, setSubmissions] = useState<BountySubmission[]>([])
  const [allSubmissions, setAllSubmissions] = useState<BountySubmission[]>([])
  const [loadingSubmissions, setLoadingSubmissions] = useState(false)
  const [activeTab, setActiveTab] = useState<'overview' | 'bounties' | 'submissions'>('overview')
  const [selectedSubmission, setSelectedSubmission] = useState<BountySubmission | null>(null)
  const [showSubmissionDetails, setShowSubmissionDetails] = useState(false)
  const [feedback, setFeedback] = useState('')

  // Theme-specific styles
  const bgColor = theme === 'dark' ? 'bg-[#1B2228]' : 'bg-white'
  const textColor = theme === 'dark' ? 'text-[#C1A461]' : 'text-gray-900'
  const borderColor = theme === 'dark' ? 'border-[#C1A461]/20' : 'border-amber-200'
  const mutedTextColor = theme === 'dark' ? 'text-[#C1A461]/60' : 'text-gray-600'

  // Fetch sponsor data
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

        // Fetch all submissions for this sponsor
        try {
          const { data: submissionsData, error: submissionsError } = await supabase
            .from('bounty_submissions')
            .select('*')
            .eq('sponsor_id', sponsorData.id)  // Use sponsor_id directly
            .order('created_at', { ascending: false })
            
          if (submissionsError) {
            console.error('Error fetching submissions:', submissionsError)
            setAllSubmissions([])
          } else {
            console.log(`Found ${submissionsData?.length || 0} total submissions for sponsor ${sponsorData.id}`)
            setAllSubmissions(submissionsData || [])
          }
        } catch (error) {
          console.error('Error processing submissions:', error)
          setAllSubmissions([])
        }

      } catch (error) {
        console.error('Error fetching sponsor data:', error)
        toast.error('Failed to load sponsor data')
      } finally {
        setLoading(false)
      }
    }

    fetchSponsorData()
  }, [user])

  // Fetch submissions for a specific bounty
  const fetchSubmissions = async (bountyId: string) => {
    try {
      setLoadingSubmissions(true)
      
      // Fetch submissions for this bounty without joining with users
      const { data, error } = await supabase
        .from('bounty_submissions')
        .select('*')  // Just fetch all fields without the join
        .eq('bounty_id', bountyId)
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching submissions:', error)
        toast.error('Failed to load submissions')
        setSubmissions([])
      } else {
        console.log(`Found ${data?.length || 0} submissions for bounty ${bountyId}`)
        setSubmissions(data || [])
      }
    } catch (error) {
      console.error('Error fetching submissions:', error)
      toast.error('Failed to load submissions')
      setSubmissions([])
    } finally {
      setLoadingSubmissions(false)
    }
  }

  // Handle bounty selection
  const handleSelectBounty = (bounty: Bounty) => {
    setSelectedBounty(bounty)
    
    // Debug info
    console.log(`Selected bounty: ${bounty.id} - ${bounty.title}`)
    console.log(`This bounty has ${bounty.current_submissions} submissions according to the bounty record`)
    
    // We can either:
    // 1. Fetch submissions from the database
    fetchSubmissions(bounty.id)
    
    // 2. Or filter from already loaded submissions (as a fallback)
    const bountySubmissions = allSubmissions.filter(sub => sub.bounty_id === bounty.id)
    console.log(`Found ${bountySubmissions.length} submissions in already loaded data`)
    
    // If there's a major discrepancy, we'll use the database fetch to be sure
    if (Math.abs(bounty.current_submissions - bountySubmissions.length) > 2) {
      console.log("Discrepancy between expected and found submissions - fetching fresh data")
    } else if (bountySubmissions.length > 0) {
      // Use already loaded data as it seems accurate
      setSubmissions(bountySubmissions)
    }
    
    setActiveTab('submissions')
  }

  // Handle submission status update
  const handleStatusUpdate = async (submissionId: string, newStatus: 'accepted' | 'rejected') => {
    try {
      console.log(`Updating submission ${submissionId} status to ${newStatus}`);
      
      // Update the submission status
      const { data, error } = await supabase
        .from('bounty_submissions')
        .update({ 
          status: newStatus,
          feedback: feedback || null,
          review_started_at: new Date().toISOString(),
          completed_at: new Date().toISOString()
        })
        .eq('id', submissionId)
        .select();

      if (error) {
        console.error('Error updating submission status:', error);
        toast.error(`Failed to ${newStatus} submission: ${error.message}`);
        return;
      }

      console.log(`Successfully updated submission status:`, data);
      
      // Close the dialog
      setShowSubmissionDetails(false);
      setSelectedSubmission(null);
      setFeedback('');

      // Update the local submission lists
      setSubmissions(prev => 
        prev.map(sub => 
          sub.id === submissionId 
            ? { ...sub, status: newStatus, feedback: feedback || null } 
            : sub
        )
      );
      
      setAllSubmissions(prev => 
        prev.map(sub => 
          sub.id === submissionId 
            ? { ...sub, status: newStatus, feedback: feedback || null } 
            : sub
        )
      );

      // Show success message
      toast.success(`Submission ${newStatus} successfully`);
      
      // Refresh submissions after a short delay to ensure we have the latest data
      setTimeout(() => {
        if (selectedBounty) {
          fetchSubmissions(selectedBounty.id);
        }
      }, 500);
      
    } catch (error: any) {
      console.error('Error updating submission status:', error);
      toast.error(`Failed to ${newStatus} submission: ${error.message || 'Unknown error'}`);
    }
  }

  // View a specific submission
  const viewSubmission = (submission: BountySubmission) => {
    setSelectedSubmission(submission)
    setShowSubmissionDetails(true)
  }

  // Handle editing a bounty
  const handleEditBounty = (bountyId: string, event: React.MouseEvent) => {
    event.stopPropagation()
    navigate(`/editbounty/${bountyId}`)
  }

  // Handle viewing a bounty
  const handleViewBounty = (bountyId: string) => {
    navigate(`/bounty/${bountyId}`)
  }

  // Get bounty title by ID
  const getBountyTitle = (bountyId: string) => {
    // First check in our loaded bounties
    const bounty = bounties.find(b => b.id === bountyId)
    if (bounty?.title) return bounty.title
    
    // If not found, check if the submission has bounty info attached
    const submission = allSubmissions.find(s => s.bounty_id === bountyId)
    if (submission?.bounty_name) return submission.bounty_name
    
    // Try to extract from submission title
    const submissionWithTitle = allSubmissions.find(s => 
      s.bounty_id === bountyId && s.title && s.title.includes('for')
    )
    if (submissionWithTitle?.title) {
      const parts = submissionWithTitle.title.split('for')
      if (parts.length > 1) return parts[1].trim()
    }
    
    // If nothing worked, return generic
    return 'Unknown Bounty'
  }

  if (loading) {
    return <LoadingPage />
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

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  // Get initials for avatar
  const getInitials = (name: string | null) => {
    if (!name) return '?'
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
  }

  // Get status color
  const getStatusBadgeClass = (status: string) => {
    switch(status) {
      case 'accepted':
        return 'bg-green-500/20 text-green-500';
      case 'rejected':
        return 'bg-red-500/20 text-red-500';
      case 'in_review':
        return 'bg-blue-500/20 text-blue-500';
      default:
        return 'bg-yellow-500/20 text-yellow-500';
    }
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
            onClick={() => navigate('/postlisting')}
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
            <div className="grid md:grid-cols-2 gap-6">
              {/* Recent Bounties */}
              <Card className={`${bgColor} ${borderColor}`}>
                <CardHeader>
                  <CardTitle className={textColor}>Recent Bounties</CardTitle>
                </CardHeader>
                <CardContent>
                  {bounties.length === 0 ? (
                    <p className={mutedTextColor}>No bounties found</p>
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
                              <div className="flex items-center gap-2 mt-1">
                                <Badge 
                                  variant="outline" 
                                  className={
                                    bounty.status === 'open' ? 'bg-green-500/20 text-green-500' :
                                    bounty.status === 'in_review' ? 'bg-yellow-500/20 text-yellow-500' :
                                    'bg-blue-500/20 text-blue-500'
                                  }
                                >
                                  {bounty.status}
                                </Badge>
                                <span className={`text-sm ${mutedTextColor}`}>
                                  {bounty.current_submissions} submissions
                                </span>
                              </div>
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

              {/* Recent Submissions */}
              <Card className={`${bgColor} ${borderColor}`}>
                <CardHeader>
                  <CardTitle className={textColor}>Recent Submissions</CardTitle>
                </CardHeader>
                <CardContent>
                  {allSubmissions.length === 0 ? (
                    <p className={mutedTextColor}>No submissions found</p>
                  ) : (
                    <div className="space-y-4">
                      {allSubmissions.slice(0, 5).map((submission) => (
                        <div
                          key={submission.id}
                          className={`p-4 border ${borderColor} rounded-lg cursor-pointer hover:border-[#C1A461]/40 relative`}
                          onClick={() => viewSubmission(submission)}
                        >
                          <div className="flex justify-between items-start">
                            <div className="flex items-center gap-3">
                              <Avatar className="w-8 h-8">
                                <AvatarImage src={submission.user?.avatar_url || undefined} />
                                <AvatarFallback className="bg-[#C1A461]/20 text-[#C1A461]">
                                  {getInitials(submission.user?.full_name || null)}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <h3 className={`font-medium ${textColor}`}>
                                  {submission.user?.full_name || 'Anonymous'}
                                </h3>
                                <p className={`text-xs ${mutedTextColor}`}>
                                  {getBountyTitle(submission.bounty_id)}
                                </p>
                              </div>
                            </div>
                            <Badge 
                              variant="outline" 
                              className={getStatusBadgeClass(submission.status)}
                            >
                              {submission.status}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="bounties" className="mt-6">
            <div className="space-y-4">
              {bounties.length === 0 ? (
                <Card className={`${bgColor} ${borderColor}`}>
                  <CardContent className="p-8 text-center">
                    <p className={mutedTextColor}>No bounties found. Create your first bounty to get started.</p>
                    <Button
                      onClick={() => navigate('/postlisting')}
                      className="mt-4 bg-[#C1A461] hover:bg-[#C1A461]/90 text-[#1B2228]"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Create Bounty
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                bounties.map((bounty) => (
                  <Card
                    key={bounty.id}
                    className={`${bgColor} ${borderColor} hover:border-[#C1A461]/40 cursor-pointer relative`}
                    onClick={() => handleSelectBounty(bounty)}
                  >
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className={`font-medium ${textColor}`}>{bounty.title}</h3>
                          <div className="flex flex-wrap gap-2 mt-2">
                            <Badge 
                              variant="outline" 
                              className={
                                bounty.status === 'open' ? 'bg-green-500/20 text-green-500' :
                                bounty.status === 'in_review' ? 'bg-yellow-500/20 text-yellow-500' :
                                'bg-blue-500/20 text-blue-500'
                              }
                            >
                              {bounty.status}
                            </Badge>
                            <Badge variant="outline" className="bg-[#C1A461]/20 text-[#C1A461]">
                              {bounty.category}
                            </Badge>
                            <Badge variant="outline" className="bg-[#C1A461]/10 text-[#C1A461]">
                              {bounty.difficulty_level}
                            </Badge>
                          </div>
                          <div className="flex justify-between items-center mt-3">
                            <div className="flex items-center gap-4">
                              <p className={`text-sm ${mutedTextColor}`}>
                                {bounty.current_submissions} submissions
                              </p>
                              <p className={`text-sm ${mutedTextColor}`}>
                                Due: {formatDate(bounty.end_date)}
                              </p>
                            </div>
                            <p className={`text-sm font-medium ${textColor}`}>
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
                ))
              )}
            </div>
          </TabsContent>

          <TabsContent value="submissions" className="mt-6">
            {selectedBounty ? (
              <>
                <div className="mb-6 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className={`${textColor} border-${borderColor} hover:bg-[#C1A461]/10`}
                      onClick={() => setSelectedBounty(null)}
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Back to all submissions
                    </Button>
                    <h2 className={`text-xl font-medium ${textColor}`}>
                      Submissions for: {selectedBounty.title}
                    </h2>
                  </div>
                  <Badge className="bg-[#C1A461]/20 text-[#C1A461]">
                    {submissions.length} Submissions
                  </Badge>
                </div>
                
                {loadingSubmissions ? (
                  <div className="flex justify-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-2 border-[#C1A461]" />
                  </div>
                ) : submissions.length > 0 ? (
                  <div className="space-y-4">
                    {submissions.map((submission) => (
                      <Card 
                        key={submission.id} 
                        className={`${bgColor} ${borderColor} hover:border-[#C1A461]/40 transition-colors cursor-pointer`}
                        onClick={() => viewSubmission(submission)}
                      >
                        <CardContent className="p-4">
                          <div className="flex justify-between items-center">
                            <div className="flex items-center gap-4">
                              <Avatar>
                                <AvatarImage src={submission.sponsor_logo_url || undefined} />
                                <AvatarFallback className="bg-[#C1A461]/20 text-[#C1A461]">
                                  {submission.sponsor_name?.charAt(0) || "?"}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="flex items-center gap-2">
                                  <h3 className={`font-medium ${textColor}`}>
                                    {submission.title || 'Untitled Submission'}
                                  </h3>
                                  <Badge 
                                    variant="outline" 
                                    className={getStatusBadgeClass(submission.status)}
                                  >
                                    {submission.status}
                                  </Badge>
                                </div>
                                <p className={`text-sm ${mutedTextColor}`}>
                                  Submitted on {formatDate(submission.created_at)}
                                </p>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                className={`${textColor} hover:bg-[#C1A461]/10`}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  window.open(submission.submission_url, '_blank');
                                }}
                              >
                                <ExternalLink className="w-4 h-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className={`${textColor} hover:bg-[#C1A461]/10`}
                              >
                                <Eye className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <Card className={`${bgColor} ${borderColor}`}>
                    <CardContent className="p-8 text-center">
                      <p className={mutedTextColor}>No submissions yet for this bounty.</p>
                    </CardContent>
                  </Card>
                )}
              </>
            ) : (
              // All Submissions view
              <>
                <div className="mb-6 flex items-center justify-between">
                  <h2 className={`text-xl font-medium ${textColor}`}>All Submissions</h2>
                  <Badge className="bg-[#C1A461]/20 text-[#C1A461]">
                    {allSubmissions.length} Total
                  </Badge>
                </div>
                
                {allSubmissions.length === 0 ? (
                  <Card className={`${bgColor} ${borderColor}`}>
                    <CardContent className="p-8 text-center">
                      <p className={mutedTextColor}>
                        No submissions found. Create bounties to start receiving submissions.
                      </p>
                      <Button
                        onClick={() => setActiveTab('bounties')}
                        variant="outline"
                        className={`mt-4 border-${borderColor} ${textColor} hover:bg-[#C1A461]/10`}
                      >
                        Go to Bounties
                      </Button>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="space-y-4">
                    {allSubmissions.map((submission) => (
                      <Card 
                        key={submission.id} 
                        className={`${bgColor} ${borderColor} hover:border-[#C1A461]/40 transition-colors cursor-pointer`}
                        onClick={() => viewSubmission(submission)}
                      >
                        <CardContent className="p-4">
                          <div className="flex justify-between items-center">
                            <div className="flex items-center gap-4">
                              <Avatar>
                                <AvatarImage src={submission.sponsor_logo_url || undefined} />
                                <AvatarFallback className="bg-[#C1A461]/20 text-[#C1A461]">
                                  {submission.sponsor_name?.charAt(0) || "?"}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="flex items-center gap-2">
                                  <h3 className={`font-medium ${textColor}`}>
                                    {submission.title || 'Untitled Submission'}
                                  </h3>
                                  <Badge 
                                    variant="outline" 
                                    className={getStatusBadgeClass(submission.status)}
                                  >
                                    {submission.status}
                                  </Badge>
                                </div>
                                <p className={`text-sm ${mutedTextColor}`}>
                                  <span className="font-medium">{submission.bounty_name || "Unknown Bounty"}</span> - 
                                  Submitted on {formatDate(submission.created_at)}
                                </p>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                className={`${textColor} hover:bg-[#C1A461]/10`}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  window.open(submission.submission_url, '_blank');
                                }}
                              >
                                <ExternalLink className="w-4 h-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className={`${textColor} hover:bg-[#C1A461]/10`}
                              >
                                <Eye className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </>
            )}
          </TabsContent>
        </Tabs>
      </div>

      {/* Submission Detail Dialog */}
      {selectedSubmission && (
        <Dialog open={showSubmissionDetails} onOpenChange={setShowSubmissionDetails}>
          <DialogContent className={`sm:max-w-[600px] ${bgColor} border-${borderColor}`}>
            <DialogHeader>
              <DialogTitle className={textColor}>Submission Details</DialogTitle>
            </DialogHeader>
            
            <div className="space-y-6 mt-2">
              <div className="flex items-center gap-4">
                <Avatar>
                  <AvatarImage src={selectedSubmission.sponsor_logo_url || undefined} />
                  <AvatarFallback className="bg-[#C1A461]/20 text-[#C1A461]">
                    {getInitials(selectedSubmission.sponsor_name || "?")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className={`font-medium ${textColor}`}>
                    {selectedSubmission.title || 'No Title'}
                  </h3>
                  <p className={`text-sm ${mutedTextColor}`}>
                    Submitted on {formatDate(selectedSubmission.created_at)}
                  </p>
                </div>
                <Badge 
                  variant="outline" 
                  className={
                    selectedSubmission.status === 'accepted' ? 'ml-auto bg-green-500/20 text-green-500' :
                    selectedSubmission.status === 'rejected' ? 'ml-auto bg-red-500/20 text-red-500' :
                    selectedSubmission.status === 'in_review' ? 'ml-auto bg-blue-500/20 text-blue-500' :
                    'ml-auto bg-yellow-500/20 text-yellow-500'
                  }
                >
                  {selectedSubmission.status}
                </Badge>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h4 className={`font-medium ${textColor}`}>Bounty</h4>
                  <p className={textColor}>{selectedSubmission.bounty_name || "Unknown Bounty"}</p>
                </div>
                
                <div>
                  <h4 className={`font-medium ${textColor}`}>Title</h4>
                  <p className={textColor}>{selectedSubmission.title}</p>
                </div>
                
                <div>
                  <h4 className={`font-medium ${textColor}`}>Description</h4>
                  <p className={`whitespace-pre-wrap ${textColor}`}>{selectedSubmission.description}</p>
                </div>
                
                <div>
                  <h4 className={`font-medium ${textColor}`}>Submission URL</h4>
                  <a 
                    href={selectedSubmission.submission_url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-blue-500 hover:text-blue-700"
                  >
                    <ExternalLink className="w-4 h-4" />
                    {selectedSubmission.submission_url}
                  </a>
                </div>
                
                {selectedSubmission.tweet_url && (
                  <div>
                    <h4 className={`font-medium ${textColor}`}>Tweet URL</h4>
                    <a 
                      href={selectedSubmission.tweet_url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-blue-500 hover:text-blue-700"
                    >
                      <ExternalLink className="w-4 h-4" />
                      {selectedSubmission.tweet_url}
                    </a>
                  </div>
                )}
                
                {selectedSubmission.feedback && (
                  <div>
                    <h4 className={`font-medium ${textColor}`}>Feedback</h4>
                    <p className={`whitespace-pre-wrap ${textColor}`}>{selectedSubmission.feedback}</p>
                  </div>
                )}
              </div>
              
              {/* Only show feedback field and approve/reject buttons if the submission is not already processed */}
              {selectedSubmission.status === 'submitted' && (
                <>
                  <div className="space-y-2">
                    <h4 className={`font-medium ${textColor}`}>Feedback (Optional)</h4>
                    <Textarea
                      value={feedback}
                      onChange={(e) => setFeedback(e.target.value)}
                      placeholder="Add feedback for the submitter..."
                      className={`${bgColor} border-${borderColor} ${textColor}`}
                    />
                  </div>
                  
                  <DialogFooter className="flex justify-end gap-3 pt-4">
                    <Button
                      variant="outline" 
                      className="border-red-500 text-red-500 hover:bg-red-500/10"
                      onClick={() => handleStatusUpdate(selectedSubmission.id, 'rejected')}
                    >
                      <XCircle className="w-4 h-4 mr-2" />
                      Reject
                    </Button>
                    <Button
                      className="bg-green-600 hover:bg-green-700 text-white"
                      onClick={() => handleStatusUpdate(selectedSubmission.id, 'accepted')}
                    >
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Accept
                    </Button>
                  </DialogFooter>
                </>
              )}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}