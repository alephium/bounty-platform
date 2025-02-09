import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Calendar, MoreVertical, ExternalLink, CheckCircle, XCircle } from 'lucide-react'
import { useUser } from '@/contexts/UserContext'
import { supabase } from '@/lib/supabase'
import { useToast } from "@/components/ui/use-toast"
import type { BountySubmission, ProjectSubmission } from '@/types/supabase'
import { useTheme } from '@/contexts/ThemeContext'

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
  const { user } = useUser()
  const { theme } = useTheme()
  const { toast } = useToast()
  const [loading, setLoading] = useState(true)
  const [bountySubmissions, setBountySubmissions] = useState<BountySubmission[]>([])
  const [projectSubmissions, setProjectSubmissions] = useState<ProjectSubmission[]>([])
  const [activeTab, setActiveTab] = useState<'all' | 'pending' | 'accepted' | 'rejected'>('all')

  const bgColor = theme === 'dark' ? 'bg-[#1B2228]' : 'bg-white'
  const textColor = theme === 'dark' ? 'text-[#C1A461]' : 'text-gray-900'
  const borderColor = theme === 'dark' ? 'border-[#C1A461]/20' : 'border-amber-200'
  const mutedTextColor = theme === 'dark' ? 'text-[#C1A461]/60' : 'text-gray-600'
  const hoverBorderColor = theme === 'dark' ? 'hover:border-[#C1A461]/40' : 'hover:border-amber-300'
  const avatarBg = theme === 'dark' ? 'bg-[#C1A461]/20' : 'bg-amber-100'

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

  useEffect(() => {
    async function fetchSubmissions() {
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
    }

    fetchSubmissions()
  }, [bountyId, projectId])

  const handleStatusUpdate = async (submissionId: string, newStatus: string, type: 'bounty' | 'project') => {
    try {
      const table = type === 'bounty' ? 'bounty_submissions' : 'project_submissions'
      const { error } = await supabase
        .from(table)
        .update({ 
          status: newStatus,
          review_started_at: new Date().toISOString()
        })
        .eq('id', submissionId)

      if (error) throw error

      toast({
        description: `Submission ${newStatus} successfully`
      })

      // Refresh submissions
      const updatedSubmissions = type === 'bounty' 
        ? bountySubmissions.map(sub => 
            sub.id === submissionId ? { ...sub, status: newStatus } : sub
          )
        : projectSubmissions.map(sub =>
            sub.id === submissionId ? { ...sub, status: newStatus } : sub
          )

      if (type === 'bounty') {
        setBountySubmissions(updatedSubmissions as BountySubmission[])
      } else {
        setProjectSubmissions(updatedSubmissions as ProjectSubmission[])
      }
    } catch (error) {
      console.error('Error updating submission status:', error)
      toast({
        title: "Error",
        description: "Failed to update submission status",
        variant: "destructive"
      })
    }
  }

  const filteredSubmissions = [...bountySubmissions, ...projectSubmissions].filter(sub => {
    if (activeTab === 'all') return true
    return sub.status === activeTab
  })

  if (loading) {
    return (
      <Card className="bg-background border-border">
        <CardContent className="p-8 flex justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary border-t-transparent" />
        </CardContent>
      </Card>
    )
  }

return (
    <Card className={`${bgColor} border-${borderColor}`}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className={textColor}>
            Submissions ({filteredSubmissions.length})
          </CardTitle>
          <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as typeof activeTab)}>
            <TabsList className={`${bgColor} border-${borderColor}`}>
              <TabsTrigger value="all" className={`${textColor} data-[state=active]:${textColor}`}>
                All
              </TabsTrigger>
              <TabsTrigger value="submitted" className={`${textColor} data-[state=active]:${textColor}`}>
                Pending
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
      <CardContent className="space-y-4">
        {filteredSubmissions.length === 0 ? (
          <div className={`text-center py-8 ${mutedTextColor}`}>
            No submissions found
          </div>
        ) : (
          filteredSubmissions.map((submission) => (
            <div
              key={submission.id}
              className={`flex items-center justify-between p-4 rounded-lg border ${borderColor} ${hoverBorderColor} transition-colors`}
            >
              <div className="flex items-center gap-4">
                <Avatar>
                  <AvatarImage src={submission.user?.avatar_url || undefined} />
                  <AvatarFallback className={avatarBg}>
                    {getInitials(submission.user?.full_name || null)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className={`font-medium ${textColor}`}>
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
                  <div className={`flex items-center gap-2 mt-2 text-xs ${mutedTextColor}`}>
                    <Calendar className="w-3 h-3" />
                    <span>Submitted {formatDate(submission.created_at)}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className={`${textColor} hover:${bgColor} hover:${textColor}`}
                  onClick={() => window.open(submission.submission_url, '_blank')}
                >
                  <ExternalLink className="w-4 h-4" />
                </Button>

                {submission.status === 'submitted' && (
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
                )}
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  )
}