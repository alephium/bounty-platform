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
import type { BountySubmission } from '@/types/supabase'

type SubmissionStatus = 'all' | 'submitted' | 'in_review' | 'accepted' | 'rejected'

export function UserSubmissions() {
  const navigate = useNavigate()
  const { theme } = useTheme()
  const { user } = useUser()
  
  const [loading, setLoading] = useState(true)
  const [bountySubmissions, setBountySubmissions] = useState<BountySubmission[]>([])
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
        
        // Fetch bounty submissions - we can now use the direct properties
        const { data: submissions, error } = await supabase
          .from('bounty_submissions')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })

        if (error) throw error
        setBountySubmissions(submissions || [])
      } catch (error) {
        console.error('Error fetching submissions:', error)
        toast.error('Failed to load your submissions')
      } finally {
        setLoading(false)
      }
    }

    fetchSubmissions()
  }, [user, navigate])

  // Filter submissions based on active status
  const filteredSubmissions = () => {
    if (activeStatus === 'all') {
      return bountySubmissions
    } else {
      return bountySubmissions.filter(sub => sub.status === activeStatus)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  const handleViewBounty = (submission: BountySubmission) => {
    navigate(`/bounty/${submission.bounty_id}`)
  }

  const handleOpenUrl = (url: string | null, e: React.MouseEvent) => {
    e.stopPropagation()
    if (url) {
      window.open(url, '_blank')
    }
  }

  if (loading) {
    return (
      <Card className={`${bgColor} ${borderColor}`}>
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
            Your Bounty Submissions ({submissions.length})
          </CardTitle>
          <Tabs value={activeStatus} onValueChange={(v) => setActiveStatus(v as SubmissionStatus)}>
            <TabsList className={`${bgColor} border-${borderColor}`}>
              <TabsTrigger value="all" className={`${textColor} data-[state=active]:${textColor}`}>
                All Status
              </TabsTrigger>
              <TabsTrigger value="submitted" className={`${textColor} data-[state=active]:${textColor}`}>
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
                : "You haven't submitted any bounties yet. Start by exploring available bounties!"}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {submissions.map((submission) => {
              const hasTweetUrl = submission.tweet_url;
              
              return (
                <Card 
                  key={submission.id} 
                  className={`${bgColor} ${borderColor} cursor-pointer hover:${borderColor}`}
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
                          {submission.bounty_name && (
                            <Badge variant="secondary" className="bg-[#C1A461]/10 text-[#C1A461]">
                              {submission.bounty_name}
                            </Badge>
                          )}
                        </div>
                        
                        <div>
                          <h3 className={`text-lg font-medium ${textColor}`}>
                            {submission.title}
                          </h3>
                          <p className={`text-sm ${mutedTextColor} mt-1`}>
                            {submission.description}
                          </p>
                          <p className={`text-sm ${mutedTextColor} mt-1`}>
                            {submission.sponsor_name} • Submitted on {formatDate(submission.created_at)}
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
                        {submission.reward && (
                          <div className="text-right">
                            <div className="flex items-center gap-1">
                              <span className={textColor}>◈</span>
                              <span className={`font-medium ${textColor}`}>
                                ${submission.reward.amount}
                              </span>
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