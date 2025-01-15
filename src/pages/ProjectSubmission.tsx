import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { X } from 'lucide-react'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
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
import { useUser } from "@/contexts/UserContext"
import { useHackathonParticipation } from "@/hooks/useHackathonParticipation"
import { toast } from "@/components/ui/use-toast"
import { supabase } from "@/lib/supabase"

interface FormData {
  title: string
  description: string
  githubUrl: string
  demoUrl: string
  prizeCategory: string
  specificCategory?: string
}

export default function ProjectSubmission() {
  const navigate = useNavigate()
  const { user } = useUser()
  const { participation, team } = useHackathonParticipation(user?.id || '')
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    title: "",
    description: "",
    githubUrl: "",
    demoUrl: "",
    prizeCategory: "",
    specificCategory: ""
  })

  // Redirect if not participating
  if (!participation) {
    navigate('/hackathon')
    return null
  }

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
      // Reset specific category if prize category changes
      ...(field === 'prizeCategory' && { specificCategory: '' })
    }))
  }

  const validateUrl = (url: string) => {
    try {
      new URL(url)
      return true
    } catch {
      return false
    }
  }

  const handleSubmit = async () => {
    try {
      setLoading(true)

      // Validate form
      if (!formData.title.trim()) {
        toast({ description: "Project title is required", variant: "destructive" })
        return
      }

      if (!formData.description.trim()) {
        toast({ description: "Project description is required", variant: "destructive" })
        return
      }

      if (!validateUrl(formData.githubUrl)) {
        toast({ description: "Valid GitHub URL is required", variant: "destructive" })
        return
      }

      if (formData.demoUrl && !validateUrl(formData.demoUrl)) {
        toast({ description: "Demo URL must be valid if provided", variant: "destructive" })
        return
      }

      if (!formData.prizeCategory) {
        toast({ description: "Prize category is required", variant: "destructive" })
        return
      }

      if (formData.prizeCategory === 'specific' && !formData.specificCategory) {
        toast({ description: "Specific category is required", variant: "destructive" })
        return
      }

      // Create project submission
      const { error } = await supabase
        .from('hackathon_projects')
        .insert([{
          title: formData.title,
          description: formData.description,
          github_url: formData.githubUrl,
          demo_url: formData.demoUrl || null,
          participant_id: participation.id,
          prize_category: formData.prizeCategory,
          specific_category: formData.specificCategory || null,
          submission_status: 'submitted'
        }])

      if (error) throw error

      toast({ description: "Project submitted successfully!" })
      navigate('/hackathon')
    } catch (error) {
      console.error('Error submitting project:', error)
      toast({
        description: "Failed to submit project. Please try again.",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  const isSolo = participation.participation_type === 'solo'

  return (
    <div className="min-h-screen bg-[#1B2228] p-4 flex items-center justify-center">
      <Card className="w-full max-w-2xl bg-[#1B2228] border-[#C1A461]/20">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-[#C1A461] text-2xl font-semibold">
            Submit Project
          </CardTitle>
          <Button
            variant="ghost"
            size="icon"
            className="text-[#C1A461]/60 hover:text-[#C1A461] hover:bg-[#C1A461]/10"
            onClick={() => navigate('/hackathon')}
          >
            <X className="h-5 w-5" />
          </Button>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Project Title */}
          <div className="space-y-2">
            <Label className="text-[#C1A461]">
              Project Title <span className="text-red-500">*</span>
            </Label>
            <Input 
              placeholder="Enter project title"
              value={formData.title}
              onChange={(e) => handleChange('title', e.target.value)}
              className="bg-[#1B2228] border-[#C1A461]/20 text-[#C1A461]"
            />
          </div>

          {/* Project Description */}
          <div className="space-y-2">
            <Label className="text-[#C1A461]">
              Description <span className="text-red-500">*</span>
            </Label>
            <Textarea
              placeholder="Describe your project"
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              className="bg-[#1B2228] border-[#C1A461]/20 text-[#C1A461] min-h-[120px]"
            />
          </div>

          {/* GitHub URL */}
          <div className="space-y-2">
            <Label className="text-[#C1A461]">
              GitHub Repository URL <span className="text-red-500">*</span>
            </Label>
            <Input 
              placeholder="https://github.com/username/repo"
              value={formData.githubUrl}
              onChange={(e) => handleChange('githubUrl', e.target.value)}
              className="bg-[#1B2228] border-[#C1A461]/20 text-[#C1A461]"
            />
          </div>

          {/* Demo URL */}
          <div className="space-y-2">
            <Label className="text-[#C1A461]">Demo URL</Label>
            <Input 
              placeholder="https://your-demo-url.com"
              value={formData.demoUrl}
              onChange={(e) => handleChange('demoUrl', e.target.value)}
              className="bg-[#1B2228] border-[#C1A461]/20 text-[#C1A461]"
            />
          </div>

          {/* Prize Category */}
          <div className="space-y-2">
            <Label className="text-[#C1A461]">
              Prize Category <span className="text-red-500">*</span>
            </Label>
            <Select
              value={formData.prizeCategory}
              onValueChange={(value) => handleChange('prizeCategory', value)}
            >
              <SelectTrigger className="bg-[#1B2228] border-[#C1A461]/20 text-[#C1A461]">
                <SelectValue placeholder="Select prize category" />
              </SelectTrigger>
              <SelectContent className="bg-[#1B2228] border-[#C1A461]/20">
                {!isSolo && (
                  <>
                    <SelectItem value="main">Main Prize (Team)</SelectItem>
                    <SelectItem value="specific">Specific Category Prize</SelectItem>
                  </>
                )}
                {isSolo && (
                  <SelectItem value="individual">Individual Hacker Prize</SelectItem>
                )}
              </SelectContent>
            </Select>
          </div>

          {/* Specific Category Selection */}
          {formData.prizeCategory === 'specific' && (
            <div className="space-y-2">
              <Label className="text-[#C1A461]">
                Specific Category <span className="text-red-500">*</span>
              </Label>
              <Select
                value={formData.specificCategory}
                onValueChange={(value) => handleChange('specificCategory', value)}
              >
                <SelectTrigger className="bg-[#1B2228] border-[#C1A461]/20 text-[#C1A461]">
                  <SelectValue placeholder="Select specific category" />
                </SelectTrigger>
                <SelectContent className="bg-[#1B2228] border-[#C1A461]/20">
                  <SelectItem value="creative">Most Creative Project</SelectItem>
                  <SelectItem value="ux">Best User Experience</SelectItem>
                  <SelectItem value="code_quality">Best Code Quality</SelectItem>
                  <SelectItem value="security">Best Security Project</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          <Button 
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-[#C1A461] hover:bg-[#C1A461]/90 text-[#1B2228]"
          >
            {loading ? "Submitting..." : "Submit Project"}
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}