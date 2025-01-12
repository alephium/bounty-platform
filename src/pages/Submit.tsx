import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { X } from 'lucide-react'
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
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { supabase } from "@/lib/supabase"
import { useUser } from "@/contexts/UserContext"
import { toast } from "@/components/ui/use-toast"

interface FormData {
  title: string
  description: string
  repository_url: string
  deployment_url: string
  category: string[]
  contract_deployed: boolean
  team_size: number
}

export default function ProjectSubmission() {
  const navigate = useNavigate()
  const { user } = useUser()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    title: "",
    description: "",
    repository_url: "",
    deployment_url: "",
    category: [],
    contract_deployed: false,
    team_size: 1
  })

  const categoryOptions = [
    { value: "dapp", label: "Decentralized Application" },
    { value: "defi", label: "DeFi Protocol" },
    { value: "nft", label: "NFT Project" },
    { value: "tool", label: "Developer Tool" },
    { value: "game", label: "Blockchain Game" },
    { value: "security", label: "Security Solution" }
  ]

  const handleChange = (field: keyof FormData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleCategoryToggle = (category: string) => {
    setFormData(prev => ({
      ...prev,
      category: prev.category.includes(category)
        ? prev.category.filter(c => c !== category)
        : [...prev.category, category]
    }))
  }

  const validateForm = () => {
    const errors: string[] = []
    
    if (!formData.title.trim()) errors.push("Project title is required")
    if (!formData.description.trim()) errors.push("Project description is required")
    if (!formData.repository_url.trim()) errors.push("Repository URL is required")
    if (formData.category.length === 0) errors.push("Select at least one category")
    
    // Basic URL validation
    const urlPattern = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/
    if (!urlPattern.test(formData.repository_url)) {
      errors.push("Enter a valid repository URL")
    }
    if (formData.deployment_url && !urlPattern.test(formData.deployment_url)) {
      errors.push("Enter a valid deployment URL")
    }

    return errors
  }

  const handleSubmit = async () => {
    try {
      setLoading(true)
      const errors = validateForm()
      
      if (errors.length > 0) {
        errors.forEach(error => toast({ description: error, variant: "destructive" }))
        return
      }

      // First get or verify team association
      const { data: teamMember, error: teamError } = await supabase
        .from('team_members')
        .select('team_id')
        .eq('user_id', user?.id)
        .single()

      if (teamError || !teamMember?.team_id) {
        toast({
          description: "You need to be part of a team to submit a project",
          variant: "destructive"
        })
        return
      }

      // Create project submission
      const { error: submissionError } = await supabase
        .from('hackathonprojects')
        .insert([
          {
            team_id: teamMember.team_id,
            title: formData.title,
            description: formData.description,
            repository_url: formData.repository_url,
            deployment_url: formData.deployment_url || null,
            category: formData.category,
            contract_deployed: formData.contract_deployed,
            submission_status: 'submitted'
          }
        ])

      if (submissionError) throw submissionError

      toast({
        description: "Project submitted successfully!",
        duration: 5000
      })
      
      navigate('/dashboard')
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

  return (
    <div className="min-h-screen bg-[#1B2228] p-4 md:p-8">
      <div className="max-w-3xl mx-auto">
        <Card className="bg-[#1B2228] border-[#C1A461]/20">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl text-[#C1A461]">Submit Your Project</CardTitle>
                <CardDescription className="text-[#C1A461]/80">
                  Share your hackathon project with the community
                </CardDescription>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate('/dashboard')}
                className="text-[#C1A461]/60 hover:text-[#C1A461] hover:bg-[#C1A461]/10"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Project Title */}
            <div className="space-y-2">
              <Label className="text-[#C1A461]">
                Project Title <span className="text-red-500">*</span>
              </Label>
              <Input
                placeholder="Enter your project title"
                value={formData.title}
                onChange={(e) => handleChange('title', e.target.value)}
                className="bg-[#1B2228] border-[#C1A461]/20 text-[#C1A461] placeholder:text-[#C1A461]/40"
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
                className="min-h-[150px] bg-[#1B2228] border-[#C1A461]/20 text-[#C1A461] placeholder:text-[#C1A461]/40"
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
                className="bg-[#1B2228] border-[#C1A461]/20 text-[#C1A461] placeholder:text-[#C1A461]/40"
              />
            </div>

            {/* Deployment URL */}
            <div className="space-y-2">
              <Label className="text-[#C1A461]">Deployment URL</Label>
              <Input
                placeholder="https://your-project.vercel.app"
                value={formData.deployment_url}
                onChange={(e) => handleChange('deployment_url', e.target.value)}
                className="bg-[#1B2228] border-[#C1A461]/20 text-[#C1A461] placeholder:text-[#C1A461]/40"
              />
            </div>

            {/* Categories */}
            <div className="space-y-4">
              <Label className="text-[#C1A461]">
                Project Categories <span className="text-red-500">*</span>
              </Label>
              <div className="grid grid-cols-2 gap-4">
                {categoryOptions.map((category) => (
                  <div key={category.value} className="flex items-center space-x-2">
                    <Checkbox
                      id={category.value}
                      checked={formData.category.includes(category.value)}
                      onCheckedChange={() => handleCategoryToggle(category.value)}
                      className="border-[#C1A461]/20 data-[state=checked]:bg-[#C1A461] data-[state=checked]:border-[#C1A461]"
                    />
                    <Label
                      htmlFor={category.value}
                      className="text-[#C1A461]"
                    >
                      {category.label}
                    </Label>
                  </div>
                ))}
              </div>
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
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit Project"}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}