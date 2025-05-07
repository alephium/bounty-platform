import { useCallback, useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Tabs,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Calendar, MoreVertical, ExternalLink, CheckCircle, XCircle, MessageSquare } from 'lucide-react'
import { useUser } from '@/contexts/UserContext'
import { supabase } from '@/lib/supabase'
import { useToast } from "@/components/ui/use-toast"
import type { BountySubmission, ProjectSubmission } from '@/types/supabase'
import { useTheme } from '@/contexts/ThemeContext'
import { FeedbackDialog } from "../components/FeedbackDialog"
import LoadingPage from './LoadingPage'

type RealtimeSubscription = ReturnType<ReturnType<typeof supabase.channel>['subscribe']>

interface SubmissionProps {
  bountyId?: string
  projectId?: string
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })
}

function getInitials(name: string | null) {
  if (!name) return '?'
  return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
}

export function ViewSubmissions({ bountyId, projectId }: SubmissionProps) {
  const { toast } = useToast()
  const [loading, setLoading] = useState(true)
  const [bountySubmissions, setBountySubmissions] = useState<BountySubmission[]>([])
  const [projectSubmissions, setProjectSubmissions] = useState<ProjectSubmission[]>([])
  const [activeTab, setActiveTab] = useState<'all' | 'submitted' | 'accepted' | 'rejected'>('all')
  const mutedTextColor = "text-muted"
  const hoverBorderColor = "hover:border-border"
  const avatarBg = "bg-primary/20"
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

  const [feedbackDialogState, setFeedbackDialogState] = useState<{
    isOpen: boolean;
    type?: 'review' | 'reject';
    submissionId?: string;
    submissionType?: 'bounty' | 'project';
  }>({ isOpen: false });

  const fetchSubmissions = useCallback(async () => {
    try {
      setLoading(true)
      
      if (bountyId) {
        const { data: bountyData, error: bountyError } = await supabase
          .from('bounty_submissions')
          .select(`
            *,
            user:users(full_name, avatar_url)
          `)
          .eq('bounty_id', bountyId)
          .order('created_at', { ascending: false })
  
        if (bountyError) throw bountyError
        if (bountyData) setBountySubmissions(bountyData)
      }
  
      if (projectId) {
        const { data: projectData, error: projectError } = await supabase
          .from('project_submissions')
          .select(`
            *,
            user:users(full_name, avatar_url)
          `)
          .eq('project_id', projectId)
          .order('created_at', { ascending: false })
  
        if (projectError) throw projectError
        if (projectData) setProjectSubmissions(projectData)
      }
    } catch (error) {
      console.error('Error fetching submissions:', error)
      toast({
        title: "Error",
        description: "Failed to load submissions",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }, [bountyId, projectId, toast])

  useEffect(() => {

    fetchSubmissions()
    const subscriptions: RealtimeSubscription[] = []

    if (bountyId) {
      const bountySubscription = supabase
        .channel('bounty_submissions_changes')
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'bounty_submissions',
            filter: `bounty_id=eq.${bountyId}`
          },
          () => {
            fetchSubmissions() // Refresh data when changes occur
          }
        )
        .subscribe()
  
      subscriptions.push(bountySubscription)
    }
  
    if (projectId) {
      const projectSubscription = supabase
        .channel('project_submissions_changes')
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'project_submissions',
            filter: `project_id=eq.${projectId}`
          },
          () => {
            fetchSubmissions() // Refresh data when changes occur
          }
        )
        .subscribe()
  
      subscriptions.push(projectSubscription)
    }
  
    // Cleanup subscriptions
    return () => {
      subscriptions.forEach(subscription => subscription.unsubscribe())
    }
  }, [bountyId, fetchSubmissions, projectId])

  const handleStatusUpdate = async (
    submissionId: string, 
    newStatus: 'accepted' | 'rejected' | 'in_review',
    type: 'bounty' | 'project',
    feedback?: string
  ) => {
    try {
      const table = type === 'bounty' ? 'bounty_submissions' : 'project_submissions'
      
      // Get submission and user details
      const { data: submission } = await supabase
        .from(table)
        .select(`
          *,
          user:users(
            email,
            wallet_address,
            full_name
          )
        `)
        .eq('id', submissionId)
        .single()
  
      if (!submission?.user) {
        throw new Error('User not found')
      }
  
      // Update submission status
      const { error: updateError } = await supabase
        .from(table)
        .update({
          status: newStatus,
          feedback: feedback || null,
          review_started_at: new Date().toISOString(),
          completed_at: newStatus === 'accepted' ? new Date().toISOString() : null
        })
        .eq('id', submissionId)
  
      if (updateError) throw updateError
  
  
      // Send email notification based on status
      const emailContent = {
        to: submission.user.email,
        subject: `Submission ${newStatus.charAt(0).toUpperCase() + newStatus.slice(1)}`,
        text: getEmailContent(newStatus, submission, feedback)
      }
  
      // Here you would typically call your email service
      // For example: await sendEmail(emailContent)
      console.log('Sending email:', emailContent)
  
      // If accepted, process payment
      if (newStatus === 'accepted' && submission.user.wallet_address) {
        // Here you would typically call your payment processing service
        // For example: await processPayment(submission.user.wallet_address, bountyAmount)
        console.log('Processing payment to:', submission.user.wallet_address)
      }
  
      toast({
        description: `Submission ${newStatus} successfully`
      })
  
      // Refresh submissions
      await fetchSubmissions()
  
    } catch (error) {
      console.error('Error updating submission status:', error)
      toast({
        title: "Error",
        description: "Failed to update submission status",
        variant: "destructive"
      })
    }
  }
  
  // Helper function to generate email content
  const getEmailContent = (
    status: string, 
    submission: any, 
    feedback?: string
  ) => {
    const baseContent = `Dear ${submission.user.full_name},\n\n`
    
    switch (status) {
      case 'accepted':
        return `${baseContent}Congratulations! Your submission has been approved. The reward will be sent to your registered wallet address.\n\n${feedback || ''}`
      
      case 'in_review':
        return `${baseContent}Your submission requires some improvements:\n\n${feedback}\n\nPlease update your submission with the requested changes.`
      
      case 'rejected':
        return `${baseContent}Unfortunately, your submission has been rejected.\n\n${feedback ? `Reason: ${feedback}` : ''}`
      
      default:
        return `${baseContent}Your submission status has been updated to ${status}.${feedback ? `\n\nFeedback: ${feedback}` : ''}`
    }
  }
  
  const filteredSubmissions = [...bountySubmissions, ...projectSubmissions].filter(sub => {
    if (activeTab === 'all') return true
    return sub.status === activeTab
  })

  if (loading) {
    return <LoadingPage />
  }

return (
  <Card className="bg-background border-border">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-foreground">
            Submissions ({filteredSubmissions.length})
          </CardTitle>
          <Tabs value={activeTab} onValueChange={v => setActiveTab(v as typeof activeTab)}>
            <TabsList className="bg-background border-border">
              <TabsTrigger value="all" className="text-foreground data-[state=active]:text-foreground">
                All
              </TabsTrigger>
              <TabsTrigger value="submitted" className="text-foreground data-[state=active]:text-foreground">
                Pending
              </TabsTrigger>
              <TabsTrigger value="accepted" className="text-foreground data-[state=active]:text-foreground">
                Accepted
              </TabsTrigger>
              <TabsTrigger value="rejected" className="text-foreground data-[state=active]:text-foreground">
                Rejected
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {filteredSubmissions.length === 0 ? (
          <div className="text-center py-8 text-muted">No submissions found</div>
        ) : (
          filteredSubmissions.map(submission => (
            <div
              key={submission.id}
              className={`flex items-center justify-between p-4 rounded-lg border ${hoverBorderColor} transition-colors`}
            >
              <div className="flex items-center gap-4">
                <Avatar>
                  <AvatarImage src={submission.user?.avatar_url || undefined} />
                  <AvatarFallback className={avatarBg}>
                    {getInitials(submission.user?.full_name || null)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-medium text-foreground">
                    {submission.user?.full_name}'s Submission
                  </h3>
                  <div className="flex items-center gap-4 mt-1">
                    <p className={`text-sm ${mutedTextColor}`}>
                      {submission.submission_url}
                    </p>
                    <Badge variant="outline" className={statusColors[submission.status]}>
                      {submission.status}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 mt-2 text-xs text-muted">
                    <Calendar className="w-3 h-3" />
                    <span>Submitted {formatDate(submission.created_at)}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-foreground hover:bg-background hover:text-foreground"
                  onClick={() => window.open(submission.submission_url, '_blank')}
                >
                  <ExternalLink className="w-4 h-4" />
                </Button>

                {/* {submission.status === 'submitted' && (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        className={`${textColor} hover:${bgColor} hover:${textColor}`}
                      >
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent 
                      align="end" 
                      className={`${bgColor} border-${borderColor}`}
                    >
                      <DropdownMenuItem
                        onClick={() => handleStatusUpdate(
                          submission.id,
                          'accepted',
                          'bounty_id' in submission ? 'bounty' : 'project'
                        )}
                        className={theme === 'dark' ? "text-green-400" : "text-green-600"}
                      >
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Accept Submission
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleStatusUpdate(
                          submission.id,
                          'rejected',
                          'bounty_id' in submission ? 'bounty' : 'project'
                        )}
                        className={theme === 'dark' ? "text-red-400" : "text-red-600"}
                      >
                        <XCircle className="w-4 h-4 mr-2" />
                        Reject Submission
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                )} */}
                {submission.status === 'submitted' && (
                  <>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          className={`${textColor} hover:${bgColor} hover:${textColor}`}
                        >
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent 
                        align="end" 
                        className={`${bgColor} border-${borderColor}`}
                      >
                        <DropdownMenuItem
                          onClick={() => {
                            handleStatusUpdate(
                              submission.id,
                              'accepted',
                              'bounty_id' in submission ? 'bounty' : 'project'
                            )
                          }}
                          className={theme === 'dark' ? "text-green-400" : "text-green-600"}
                        >
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Accept Submission
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => setFeedbackDialogState({
                            isOpen: true,
                            type: 'review',
                            submissionId: submission.id,
                            submissionType: 'bounty_id' in submission ? 'bounty' : 'project'
                          })}
                          className={theme === 'dark' ? "text-yellow-400" : "text-yellow-600"}
                        >
                          <MessageSquare className="w-4 h-4 mr-2" />
                          Request Changes
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => setFeedbackDialogState({
                            isOpen: true,
                            type: 'reject',
                            submissionId: submission.id,
                            submissionType: 'bounty_id' in submission ? 'bounty' : 'project'
                          })}
                          className={theme === 'dark' ? "text-red-400" : "text-red-600"}
                        >
                          <XCircle className="w-4 h-4 mr-2" />
                          Reject Submission
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>

                    <FeedbackDialog
                      isOpen={feedbackDialogState.isOpen}
                      onClose={() => setFeedbackDialogState({ isOpen: false })}
                      onSubmit={(feedback) => {
                        handleStatusUpdate(
                          feedbackDialogState.submissionId!,
                          feedbackDialogState.type === 'review' ? 'in_review' : 'rejected',
                          feedbackDialogState.submissionType!,
                          feedback
                        )
                      }}
                      title={feedbackDialogState.type === 'review' ? 'Request Changes' : 'Reject Submission'}
                      action={feedbackDialogState.type === 'review' ? 'Send Request' : 'Reject'}
                    />
                  </>
                )}
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  )
}