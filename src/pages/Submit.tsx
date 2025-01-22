import { useState, useEffect } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { X, Plus, Users, Loader2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import { useUser } from "@/contexts/UserContext"
import { toast } from "@/components/ui/use-toast"

// Google Sheet URL - replace with your deployed script URL
const GOOGLE_SHEETS_CONFIG = {
  SCRIPT_URL: "https://script.google.com/macros/s/AKfycbzBraRcYBy8dYf9PwxXJm5lZDHbhza-VOQCGT1tchd7a5kVVe-BmSPjYj3fycwIaMq2/exec",
  TIMEOUT: 10000
}

// Prize Categories
const PRIZE_CATEGORIES = {
  team: [
    { value: "creative", label: "Most Creative Project" },
    { value: "ux", label: "Best User Experience" },
    { value: "technical", label: "Best Technical Implementation" },
    { value: "impact", label: "Highest Impact" }
  ],
  solo: [
    { value: "port", label: "Port an Existing Contract" },
    { value: "puzzle", label: "Solve Technical Puzzle" },
    { value: "tool", label: "Build Developer Tool" }
  ]
}

interface TeamMember {
  id: string;
  email: string;
  name: string;
}

interface FormData {
  title: string;
  description: string;
  repository_url: string;
  deployment_url: string;
  contract_deployed: boolean;
  prize_category: string;
  team_members?: TeamMember[];
}

export default function ProjectSubmission() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const submissionType = searchParams.get('type') as 'team' | 'solo'
  const { user } = useUser()
  const [loading, setLoading] = useState(false)
  const [isAddMemberOpen, setIsAddMemberOpen] = useState(false)
  const [newMemberEmail, setNewMemberEmail] = useState('')

  const [formData, setFormData] = useState<FormData>({
    title: "",
    description: "",
    repository_url: "",
    deployment_url: "",
    contract_deployed: false,
    prize_category: "",
    team_members: submissionType === 'team' ? [{
      id: user?.id || '',
      email: user?.email || '',
      name: user?.full_name || ''
    }] : undefined
  })

  useEffect(() => {
    if (!user) {
      navigate('/auth')
      return
    }
    
    if (!submissionType || !['team', 'solo'].includes(submissionType)) {
      navigate('/hackathon')
    }
  }, [submissionType, navigate, user])

  const handleChange = (field: keyof FormData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const validateForm = (): string[] => {
    const errors: string[] = []

    if (!formData.title.trim()) errors.push('Project title is required')
    if (!formData.description.trim()) errors.push('Project description is required')
    if (!formData.repository_url.trim()) errors.push('Repository URL is required')
    if (!formData.prize_category) errors.push('Please select a prize category')

    const urlPattern = /^https:\/\/(github\.com|vercel\.app|demo\.|www\.).+/i
    if (!urlPattern.test(formData.repository_url)) {
      errors.push('Please enter a valid repository URL')
    }
    if (formData.deployment_url && !urlPattern.test(formData.deployment_url)) {
      errors.push('Please enter a valid deployment URL')
    }

    if (submissionType === 'team') {
      if (!formData.team_members || formData.team_members.length < 2) {
        errors.push('Team projects require at least 2 members')
      }
      if (formData.team_members && formData.team_members.length > 4) {
        errors.push('Teams cannot have more than 4 members')
      }
    }

    return errors
  }

  
const submitToGoogleSheets = async (data: FormData) => {
  try {
    // Add timestamp to prevent caching
    const urlWithTimestamp = `${GOOGLE_SHEETS_CONFIG.SCRIPT_URL}?t=${Date.now()}`
    
    const payload = {
      action: 'submit',
      ...data,
      type: submissionType,
      submitter_email: user?.email,
      submitter_name: user?.full_name,
      timestamp: new Date().toISOString()
    }

    // Create AbortController for timeout
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), GOOGLE_SHEETS_CONFIG.TIMEOUT)

    const response = await fetch(urlWithTimestamp, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
      mode: 'no-cors' // Important change
    })

    clearTimeout(timeoutId)

    // Since we're using no-cors, we can't read the response
    // Instead, we'll assume success if we get here
    return { success: true }

  } catch (error) {
    console.error('Submission error details:', {
      error,
      message: error instanceof Error ? error.message : 'Unknown error',
      type: error instanceof Error ? error.name : 'Unknown type'
    })

    if (error instanceof Error && error.name === 'AbortError') {
      throw new Error('Request timed out. Please try again.')
    }

    throw new Error('Failed to submit project. Please check your connection and try again.')
  }
}

  const handleSubmit = async () => {
    try {
      const errors = validateForm()
      if (errors.length > 0) {
        errors.forEach(error => {
          toast({
            description: error,
            variant: "destructive"
          })
        })
        return
      }

      setLoading(true)
      
      // Add retry logic
      let attempts = 3
      while (attempts > 0) {
        try {
          await submitToGoogleSheets(formData)
          toast({ description: "Project submitted successfully!" })
          navigate('/hackathon')
          return
        } catch (error) {
          attempts--
          if (attempts === 0) throw error
          await new Promise(resolve => setTimeout(resolve, 1000)) // Wait 1 second between retries
        }
      }
    } catch (error) {
      console.error('Submit error:', error)
      toast({
        description: error instanceof Error ? error.message : "Failed to submit project",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  const handleAddMember = async () => {
    if (!newMemberEmail.trim()) {
      toast({
        description: "Please enter an email address",
        variant: "destructive"
      })
      return
    }

    try {
      setLoading(true)
      
      if (formData.team_members?.some(member => member.email === newMemberEmail)) {
        throw new Error('This user is already a team member')
      }

      // For demo purposes, just add the member
      // In production, you'd verify the user exists first
      setFormData(prev => ({
        ...prev,
        team_members: [...(prev.team_members || []), {
          id: Date.now().toString(),
          email: newMemberEmail,
          name: newMemberEmail.split('@')[0] // Simple name from email
        }]
      }))

      setNewMemberEmail('')
      setIsAddMemberOpen(false)
      toast({ description: "Team member added successfully" })
    } catch (error) {
      toast({
        description: error instanceof Error ? error.message : "Failed to add team member",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  const removeMember = (email: string) => {
    if (email === user?.email) {
      toast({
        description: "You cannot remove yourself from the team",
        variant: "destructive"
      })
      return
    }

    setFormData(prev => ({
      ...prev,
      team_members: prev.team_members?.filter(member => member.email !== email)
    }))
    toast({ description: "Team member removed" })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#1B2228] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 text-[#C1A461] animate-spin" />
          <p className="text-[#C1A461]">Processing...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#1B2228] p-4 md:p-8">
      <div className="max-w-3xl mx-auto">
        <Card className="bg-[#1B2228] border-[#C1A461]/20">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl text-[#C1A461]">
                  Submit {submissionType === 'team' ? 'Team' : 'Solo'} Project
                </CardTitle>
                <CardDescription className="text-[#C1A461]/80">
                  Share your hackathon project with the community
                </CardDescription>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate('/hackathon')}
                className="text-[#C1A461]/60 hover:text-[#C1A461] hover:bg-[#C1A461]/10"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Team Members Section */}
            {submissionType === 'team' && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <Label className="text-[#C1A461] text-lg">Team Members</Label>
                  <Dialog open={isAddMemberOpen} onOpenChange={setIsAddMemberOpen}>
                    <DialogTrigger asChild>
                      <Button 
                        size="sm"
                        disabled={formData.team_members?.length === 4}
                        className="bg-[#C1A461] hover:bg-[#C1A461]/90 text-[#1B2228]"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Add Member
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-[#1B2228] border-[#C1A461]/20">
                      <DialogHeader>
                        <DialogTitle className="text-[#C1A461]">Add Team Member</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label className="text-[#C1A461]">Email Address</Label>
                          <Input
                            placeholder="team@member.com"
                            value={newMemberEmail}
                            onChange={(e) => setNewMemberEmail(e.target.value)}
                            className="bg-[#1B2228] border-[#C1A461]/20 text-[#C1A461]"
                          />
                        </div>
                        <Button
                          onClick={handleAddMember}
                          disabled={loading}
                          className="w-full bg-[#C1A461] hover:bg-[#C1A461]/90 text-[#1B2228]"
                        >
                          {loading ? "Adding..." : "Add Member"}
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>

                <div className="space-y-2">
                  {formData.team_members?.map((member) => (
                    <div 
                      key={member.email}
                      className="flex items-center justify-between p-3 rounded-lg border border-[#C1A461]/20"
                    >
                      <div className="flex items-center gap-2 text-[#C1A461]">
                        <Users className="w-4 h-4" />
                        <span>{member.name}</span>
                        <span className="text-sm text-[#C1A461]/60">
                          ({member.email})
                        </span>
                      </div>
                      {member.email !== user?.email && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeMember(member.email)}
                          className="text-red-500 hover:text-red-600"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Prize Category */}
            <div className="space-y-2">
              <Label className="text-[#C1A461]">
                Prize Category <span className="text-red-500">*</span>
              </Label>
              <Select
                value={formData.prize_category}
                onValueChange={(value) => handleChange('prize_category', value)}
              >
                <SelectTrigger className="bg-[#1B2228] border-[#C1A461]/20 text-[#C1A461]">
                  <SelectValue placeholder="Select a prize category" />
                </SelectTrigger>
                <SelectContent className="bg-[#1B2228] border-[#C1A461]/20">
                  {PRIZE_CATEGORIES[submissionType].map((category) => (
                    <SelectItem
                      key={category.value}
                      value={category.value}
                      className="text-[#C1A461]"
                    >
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Project Title */}
            <div className="space-y-2">
              <Label className="text-[#C1A461]">
                Project Title <span className="text-red-500">*</span>
              </Label>
              <Input
                placeholder="Enter your project title"
                value={formData.title}
                onChange={(e) => handleChange('title', e.target.value)}
                className="bg-[#1B2228] border-[#C1A461]/20 text-[#C1A461]"
              />
            </div>

            {/* Project Description */}
            <div className="space-y-2">
              <Label className="text-[#C1A461]">
                Project Description <span className="text-red-500">*</span>
              </Label>
              <Textarea
                placeholder="Describe your project..."
                value={formData.description}
                onChange={(e) => handleChange('description', e.target.value)}
                className="min-h-[150px] bg-[#1B2228] border-[#C1A461]/20 text-[#C1A461]"
              />
            </div>

            {/* Repository URL */}
            <div className="space-y-2">
              <Label className="text-[#C1A461]">
                Repository URL <span className="text-red-500">*</span>
              </Label>
              <Input
                placeholder="https://github.com/yourusername/project"
                value={formData.repository_url}
                onChange={(e) => handleChange('repository_url', e.target.value)}
                className="bg-[#1B2228] border-[#C1A461]/20 text-[#C1A461]"
              />
            </div>

            {/* Deployment URL */}
            <div className="space-y-2">
              <Label className="text-[#C1A461]">Demo URL (Optional)</Label>
              <Input
                placeholder="https://your-project.vercel.app"
                value={formData.deployment_url}
                onChange={(e) => handleChange('deployment_url', e.target.value)}
                className="bg-[#1B2228] border-[#C1A461]/20 text-[#C1A461]"
              />
            </div>

            {/* Smart Contract Deployment */}
            <div className="flex items-center space-x-2">
              <Checkbox
                id="contract_deployed"
                checked={formData.contract_deployed}
                onCheckedChange={(checked) => handleChange('contract_deployed', checked)}
                className="border-[#C1A461]/20 data-[state=checked]:bg-[#C1A461] data-[state=checked]:border-[#C1A461]"
              />
              <Label
                htmlFor="contract_deployed"
                className="text-[#C1A461]"
              >
                Project includes deployed smart contracts
              </Label>
            </div>

            {/* Submit Button */}
            <Button
              className="w-full bg-[#C1A461] hover:bg-[#C1A461]/90 text-[#1B2228]"
              onClick={handleSubmit}
              disabled={loading || 
                (submissionType === 'team' && (!formData.team_members || formData.team_members.length < 2))}
            >
              {loading ? "Submitting..." : 
               submissionType === 'team' && (!formData.team_members || formData.team_members.length < 2)
                ? "Add at least one team member"
                : "Submit Project"
              }
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}