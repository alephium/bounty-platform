import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  ExternalLink, 
  Clock, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  MessageSquare,
  Twitter
} from 'lucide-react'
import { useTheme } from '@/contexts/ThemeContext'
import { useUser } from '@/contexts/UserContext'
import { supabase } from '@/lib/supabase'
import { toast } from 'sonner'
import type { BountySubmission, ProjectSubmission } from '@/types/supabase'

type SubmissionType = 'all' | 'bounty' | 'project'
type SubmissionStatus = 'all' | 'submitted' | 'in_review' | 'accepted' | 'rejected'

export function UserSubmissions() {
  const navigate = useNavigate()
  const { theme } = useTheme()
  const { user } = useUser()
  
  const [loading, setLoading] = useState(true)
  const [bountySubmissions, setBountySubmissions] = useState<BountySubmission[]>([])
  const [projectSubmissions, setProjectSubmissions] = useState<ProjectSubmission[]>([])
  const [activeType, setActiveType] = useState<SubmissionType>('all')
  const [activeStatus, setActiveStatus] = useState<SubmissionStatus>('all')

  const bgColor = theme === 'dark' ? 'bg-[#1B2228]' : 'bg-white'
  const textColor = theme === 'dark' ? 'text-[#C1A461]' : 'text-gray-900'
  const borderColor = theme === 'dark' ? 'border-[#C1A461]/20' : 'border-amber-200'
  const mutedTextColor = theme === 'dark' ? 'text-[#C1A461]/60' : 'text-gray-600'
  const hoverBorderColor = theme === 'dark' ? 'hover:border-[#C1A461]/40' : 'hover:border-amber-300'

  const statusColors = {
    submitted: theme === 'dark' 
      ? "bg-yellow-500/20 text-yellow-400" 
      : "bg-yellow-100 text-yellow-600",
    in_review: theme === 'dark' 
      ? "bg-blue-500/20 text-blue-400" 
      : "bg-blue-100 text-blue-600",
    accepted: theme === 'dark' 
      ? "bg-green-500/20 text-green-400" 
      : "bg-green-100 text-green-600",
    rejected: theme === 'dark' 
      ? "bg-red-500/20 text-red-400" 
      : "bg-red-100 text-red-600"
  }

  const statusIcons = {
    submitted: <Clock className="w-4 h-4" />,
    in_review: <AlertCircle className="w-4 h-4" />,
    accepted: <CheckCircle className="w-4 h-4" />,
    rejected: <XCircle className="w-4 h-4" />
  }

  useEffect(() => {
    const fetchSubmissions = async () => {
      if (!user) {
        navigate('/auth')
        return
      }

      try {
        setLoading(true)
        
        // Fetch bounty submissions
        const { data: bountyData, error: bountyError } = await supabase
          .from('bounty_submissions')
          .select(`
            *,
            bounty:bounties(id, title, category, reward, sponsor_id),
            sponsor:sponsors(name, logo_url)
          `)
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })

        if (bountyError) throw bountyError

        // Fetch project submissions
        const { data: projectData, error: projectError } = await supabase
          .from('project_submissions')
          .select(`
            *,
            project:projects(id, title, category, sponsor_id),
            sponsor:sponsors(name, logo_url)
          `)
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })

        if (projectError) throw projectError

        setBountySubmissions(bountyData || [])
        setProjectSubmissions(projectData || [])
      } catch (error) {
        console.error('Error fetching submissions:', error)
        toast.error('Failed to load your submissions')
      } finally {
        setLoading(false)
      }
    }

    fetchSubmissions()
  }, [user, navigate])

  // Filter submissions based on active tabs
  const filteredSubmissions = () => {
    let combined: (BountySubmission | ProjectSubmission)[] = []
    
    if (activeType === 'all' || activeType === 'bounty') {
      combined = [...combined, ...bountySubmissions]
    }
    
    if (activeType === 'all' || activeType === 'project') {
      combined = [...combined, ...projectSubmissions]
    }
    
    if (activeStatus !== 'all') {
      combined = combined.filter(sub => sub.status === activeStatus)
    }
    
    return combined.sort((a, b) => 
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    )
  }

  const getSubmissionType = (submission: BountySubmission): 'bounty' | 'project' => {
    return 'bounty_id' in submission ? 'bounty' : 'project'
  }

  const getTitle = (submission: BountySubmission) => {
    if ('bounty_id' in submission) {
      return submission.title}
    else return 'Untitled Submission'
  }

  // const getCategory = (submission: BountySubmission) => {
  //   if ('bounty_id' in submission && submission.bounty) {
  //     return submission.bounty.category
  //   } else if ('project_id' in submission && submission.project) {
  //     return submission.project.category
  //   }
  //   return null
  // }

  const getReward = (submission: BountySubmission) => {
    if ('bounty_id' in submission && submission.bounty && submission.bounty.reward) {
      return `${submission.bounty.reward.amount} ${submission.bounty.reward.token}`
    }
    return null
  }

  const getSponsorName = (submission: BountySubmission) => {
    return submission.sponsor?.name || 'Unknown Sponsor'
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  const handleViewBounty = (submission: BountySubmission) => {
    const type = getSubmissionType(submission)
    if (type === 'bounty' && 'bounty_id' in submission) {
      navigate(`/bounty/${submission.bounty_id}`)
    } else if (type === 'project' && 'project_id' in submission) {
      navigate(`/project/${submission.project_id}`)
    }
  }

  const handleOpenUrl = (url: string | null, e: React.MouseEvent) => {
    e.stopPropagation()
    if (url) {
      window.open(url, '_blank')
    }
  }

  if (loading) {
    return (
      <Card className="bg-background border-border">
        <CardContent className="p-8 flex justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-[#C1A461] border-t-transparent" />
        </CardContent>
      </Card>
    )
  }

  const submissions = filteredSubmissions()

  return (
    <Card className={`${bgColor} ${borderColor}`}>
      <CardHeader>
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <CardTitle className={textColor}>
            Your Submissions ({submissions.length})
          </CardTitle>
          <div className="flex gap-4">
            <Tabs value={activeType} onValueChange={(v) => setActiveType(v as SubmissionType)}>
              <TabsList className={`${bgColor} border-${borderColor}`}>
                <TabsTrigger value="all" className={`${textColor} data-[state=active]:${textColor}`}>
                  All
                </TabsTrigger>
                <TabsTrigger value="bounty" className={`${textColor} data-[state=active]:${textColor}`}>
                  Bounties
                </TabsTrigger>
                <TabsTrigger value="project" className={`${textColor} data-[state=active]:${textColor}`}>
                  Projects
                </TabsTrigger>
              </TabsList>
            </Tabs>
            
            <Tabs value={activeStatus} onValueChange={(v) => setActiveStatus(v as SubmissionStatus)}>
              <TabsList className={`${bgColor} border-${borderColor}`}>
                <TabsTrigger value="all" className={`${textColor} data-[state=active]:${textColor}`}>
                  All Status
                </TabsTrigger>
                <TabsTrigger value="submitted" className={`${textColor} data-[state=active]:${textColor}`}>
                  Pending
                </TabsTrigger>
                <TabsTrigger value="in_review" className={`${textColor} data-[state=active]:${textColor}`}>
                  In Review
                </TabsTrigger>
                <TabsTrigger value="accepted" className={`${textColor} data-[state=active]:${textColor}`}>
                  Accepted
                </TabsTrigger>
                <TabsTrigger value="rejected" className={`${textColor} data-[state=active]:${textColor}`}>
                  Rejected
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {submissions.length === 0 ? (
          <div className={`text-center py-12 ${mutedTextColor}`}>
            <div className="mx-auto w-16 h-16 rounded-full bg-[#C1A461]/10 flex items-center justify-center mb-4">
              <MessageSquare className="w-8 h-8 text-[#C1A461]" />
            </div>
            <h3 className={`text-lg font-medium ${textColor} mb-2`}>No submissions found</h3>
            <p className="max-w-md mx-auto">
              {activeStatus !== 'all' 
                ? `You don't have any ${activeStatus} submissions yet.`
                : activeType !== 'all'
                  ? `You haven't submitted any ${activeType} entries yet.`
                  : "You haven't submitted any entries yet. Start by exploring available bounties and projects!"}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {submissions.map((submission) => {
              const submissionType = getSubmissionType(submission)
              const hasTweetUrl = 'tweet_url' in submission && submission.tweet_url
              
              return (
                <Card 
                  key={submission.id} 
                  className={`${bgColor} ${borderColor} ${hoverBorderColor} cursor-pointer`}
                  onClick={() => handleViewBounty(submission)}
                >
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="space-y-2 flex-1">
                        <div className="flex items-center gap-2">
                          <Badge className={statusColors[submission.status]}>
                            <div className="flex items-center gap-1">
                              {statusIcons[submission.status]}
                              <span className="capitalize">{submission.status.replace('_', ' ')}</span>
                            </div>
                          </Badge>
                          <Badge variant="outline" className={`${textColor} capitalize`}>
                            {submissionType}
                          </Badge>
                          {getCategory(submission) && (
                            <Badge variant="secondary" className="bg-[#C1A461]/10 text-[#C1A461]">
                              {getCategory(submission)}
                            </Badge>
                          )}
                        </div>
                        
                        <div>
                          <h3 className={`text-lg font-medium ${textColor}`}>
                            {getTitle(submission)}
                          </h3>
                          <p className={`text-sm ${mutedTextColor} mt-1`}>
                            {getSponsorName(submission)} • Submitted on {formatDate(submission.created_at)}
                          </p>
                        </div>
                        
                        {submission.feedback && (
                          <div className="mt-2 p-3 bg-[#C1A461]/5 rounded border border-[#C1A461]/10">
                            <p className={`text-sm ${textColor}`}>
                              <span className="font-medium">Feedback: </span>
                              {submission.feedback}
                            </p>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-4 self-end md:self-center">
                        {getReward(submission) && (
                          <div className="text-right">
                            <div className="flex items-center gap-1">
                              <span className={textColor}>◈</span>
                              <span className={`font-medium ${textColor}`}>{getReward(submission)}</span>
                            </div>
                          </div>
                        )}
                        
                        <div className="flex gap-2">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className={`${textColor} hover:bg-[#C1A461]/10`}
                            onClick={(e) => handleOpenUrl(submission.submission_url, e)}
                          >
                            <ExternalLink className="w-4 h-4" />
                          </Button>
                          
                          {hasTweetUrl && (
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className={`${textColor} hover:bg-[#C1A461]/10`}
                              onClick={(e) => handleOpenUrl(submission.tweet_url, e)}
                            >
                              <Twitter className="w-4 h-4" />
                            </Button>
                          )}
                          
                          <Button 
                            variant="outline"
                            className={`border-${borderColor} ${textColor}`}
                            onClick={(e) => {
                              e.stopPropagation()
                              handleViewBounty(submission)
                            }}
                          >
                            View Details
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        )}
      </CardContent>
    </Card>
  )
}