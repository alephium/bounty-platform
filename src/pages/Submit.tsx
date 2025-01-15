import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
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
import { useUser } from "@/contexts/UserContext"
import { toast } from "@/components/ui/use-toast"

interface FormData {
  title: string
  description: string
  repository_url: string
  deployment_url: string
  category: string
  contract_deployed: boolean
  prize_category: string
}

const teamPrizes = [
  { value: "creative", label: "Most Creative Project" },
  { value: "ux", label: "Best User Experience (UI/UX)" },
  { value: "code", label: "Best Code Quality" },
  { value: "security", label: "Best Security Project" }
]

const soloPrizes = [
  { value: "port", label: "Port a Simple Solidity Contract" },
  { value: "puzzle", label: "Solve the Bounty Puzzle" },
  { value: "tool", label: "Build a Mini-Tool for Alephium Developers" }
]

const categoryOptions = [
  { value: "dapp", label: "Decentralized Application" },
  { value: "defi", label: "DeFi Protocol" },
  { value: "nft", label: "NFT Project" },
  { value: "tool", label: "Developer Tool" },
  { value: "game", label: "Blockchain Game" },
  { value: "security", label: "Security Solution" }
]

export default function ProjectSubmission() {
  const navigate = useNavigate()
  const { user } = useUser()
  const [loading, setLoading] = useState(false)
  const [participationType, setParticipationType] = useState<'team' | 'solo' | null>(null)
  const [formData, setFormData] = useState<FormData>({
    title: "",
    description: "",
    repository_url: "",
    deployment_url: "",
    category: "",
    contract_deployed: false,
    prize_category: ""
  })

  useEffect(() => {
    // Reset prize category when participation type changes
    setFormData(prev => ({ ...prev, prize_category: "" }))
  }, [participationType])

  const handleChange = (field: keyof FormData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const validateForm = () => {
    const errors: string[] = []
    
    if (!formData.title.trim()) errors.push("Project title is required")
    if (!formData.description.trim()) errors.push("Project description is required")
    if (!formData.repository_url.trim()) errors.push("Repository URL is required")
    if (!formData.category) errors.push("Project category is required")
    if (!formData.prize_category) errors.push("Prize category is required")
    
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

      // Submit project logic here
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
                onClick={() => navigate('/hackathon')}
                className="text-[#C1A461]/60 hover:text-[#C1A461] hover:bg-[#C1A461]/10"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Participation Type */}
            <div className="space-y-2">
              <Label className="text-[#C1A461]">
                Participation Type <span className="text-red-500">*</span>
              </Label>
              <RadioGroup
                value={participationType || ""}
                onValueChange={(value) => setParticipationType(value as 'team' | 'solo')}
                className="flex flex-col space-y-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="team" id="team" />
                  <Label htmlFor="team" className="text-[#C1A461]">Team Project</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="solo" id="solo" />
                  <Label htmlFor="solo" className="text-[#C1A461]">Solo Project</Label>
                </div>
              </RadioGroup>
            </div>

            {/* Prize Category */}
            {participationType && (
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
                    {(participationType === 'team' ? teamPrizes : soloPrizes).map((prize) => (
                      <SelectItem
                        key={prize.value}
                        value={prize.value}
                        className="text-[#C1A461]"
                      >
                        {prize.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

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

            {/* Project Category */}
            <div className="space-y-2">
              <Label className="text-[#C1A461]">
                Project Category <span className="text-red-500">*</span>
              </Label>
              <Select
                value={formData.category}
                onValueChange={(value) => handleChange('category', value)}
              >
                <SelectTrigger className="bg-[#1B2228] border-[#C1A461]/20 text-[#C1A461]">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent className="bg-[#1B2228] border-[#C1A461]/20">
                  {categoryOptions.map((category) => (
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
              <Label className="text-[#C1A461]">Demo URL(Video, Vercel or any site )</Label>
              <Input
                placeholder="https://your-project.vercel.app"
                value={formData.deployment_url}
                onChange={(e) => handleChange('deployment_url', e.target.value)}
                className="bg-[#1B2228] border-[#C1A461]/20 text-[#C1A461] placeholder:text-[#C1A461]/40"
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
              disabled={loading || !participationType}
            >
              {loading ? "Submitting..." : "Submit Project"}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}