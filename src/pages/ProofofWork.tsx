import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { supabase } from "@/lib/supabase"
import { useUser } from "@/contexts/UserContext"
import { toast } from "sonner"
import { ProofOfWork, User } from '../types/supabase'

interface FormData {
  title: string;
  description: string;
  category: ProjectCategory;
  skills: string[];
  project_url: string;
}

enum ProjectCategory {
  FRONTEND = 'frontend',
  BACKEND = 'backend',
  BLOCKCHAIN = 'blockchain'
}

export default function ProofofWork() {
  const navigate = useNavigate()
  const { username } = useParams()
  const { user } = useUser()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    title: "",
    description: "",
    category: ProjectCategory.FRONTEND,
    skills: [],
    project_url: ""
  })

  const maxLength = 180

  if (user?.username !== username) {
    navigate(`/profile/${username}`)
    return null
  }

  const handleChange = (field: keyof FormData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
      // Reset skills when category changes
      ...(field === 'category' && { skills: [] })
    }))
  }

  const handleSkillChange = (skill: string) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill]
    }))
  }

  const handleSubmit = async () => {
    try {
      setLoading(true)

      // Validate form
      if (!formData.title || !formData.description || !formData.skills.length || !formData.project_url) {
        toast.error("Please fill in all required fields")
        return
      }

      // Validate URL
      try {
        new URL(formData.project_url)
      } catch {
        toast.error("Please enter a valid URL")
        return
      }

      // Create project
      const { error } = await supabase
        .from('proof_of_work')
        .insert([
          {
            title: formData.title,
            description: formData.description,
            category: formData.category,
            skills: formData.skills,
            project_url: formData.project_url,
            user_id: user?.id,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          }
        ])

      if (error) throw error

      toast.success("Project added successfully!")
      navigate(`/profile/${username}`)
    } catch (error) {
      console.error('Error adding project:', error)
      toast.error("Failed to add project. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const skillOptions = {
    [ProjectCategory.FRONTEND]: [
      "React", "Vue", "Angular", "Next.js", "Nuxt", "TypeScript",
      "HTML5", "CSS3", "Sass/SCSS", "Tailwind CSS", "Material UI"
    ],
    [ProjectCategory.BACKEND]: [
      "Node.js", "Python", "Java", "Go", "Ruby", "PHP",
      "PostgreSQL", "MongoDB", "MySQL", "Redis", "Docker"
    ],
    [ProjectCategory.BLOCKCHAIN]: [
      "Solidity", "Rust", "Ralph", "Web3.js", "Ethers.js", "Smart Contracts",
      "DeFi", "NFT Development", "Layer 2", "IPFS"
    ]
  }

  return (
    <div className="min-h-screen bg-[#1B2228] p-4 flex items-center justify-center">
      <Card className="w-full max-w-2xl bg-[#1B2228] border-[#C1A461]/20">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-[#C1A461] text-2xl font-semibold">Add Project</CardTitle>
          <Button
            variant="ghost"
            size="icon"
            className="text-[#C1A461]/60 hover:text-[#C1A461] hover:bg-[#C1A461]/10"
            onClick={() => navigate(`/profile/${username}`)}
          >
            <X className="h-5 w-5" />
          </Button>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label className="text-[#C1A461]">
              Project Title <span className="text-red-500">*</span>
            </Label>
            <Input 
              placeholder="Project Title"
              value={formData.title}
              onChange={(e) => handleChange('title', e.target.value)}
              className="bg-[#1B2228] border-[#C1A461]/20 text-[#C1A461] focus-visible:ring-[#C1A461] placeholder:text-[#C1A461]/40"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-[#C1A461]">
              Description <span className="text-red-500">*</span>
            </Label>
            <div className="relative">
              <Textarea
                placeholder="Project Description"
                className="bg-[#1B2228] border-[#C1A461]/20 text-[#C1A461] focus-visible:ring-[#C1A461] placeholder:text-[#C1A461]/40 min-h-[120px]"
                value={formData.description}
                onChange={(e) => handleChange('description', e.target.value)}
                maxLength={maxLength}
              />
              <span className="absolute bottom-2 right-2 text-sm text-[#C1A461]/60">
                {maxLength - formData.description.length} characters left
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-[#C1A461]">
              Category <span className="text-red-500">*</span>
            </Label>
            <Select
              value={formData.category}
              onValueChange={(value) => handleChange('category', value as ProjectCategory)}
            >
              <SelectTrigger className="bg-[#1B2228] border-[#C1A461]/20 text-[#C1A461] focus:ring-[#C1A461]">
                <SelectValue placeholder="Select..." />
              </SelectTrigger>
              <SelectContent className="bg-[#1B2228] border-[#C1A461]/20">
                {Object.values(ProjectCategory).map(category => (
                  <SelectItem key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)} Development
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-[#C1A461]">
              Skills <span className="text-red-500">*</span>
            </Label>
            <div className="grid grid-cols-2 gap-2">
              {skillOptions[formData.category].map(skill => (
                <div
                  key={skill}
                  className={`p-2 rounded border cursor-pointer transition-colors
                    ${formData.skills.includes(skill)
                      ? 'bg-[#C1A461] text-[#1B2228] border-[#C1A461]'
                      : 'border-[#C1A461]/20 text-[#C1A461] hover:bg-[#C1A461]/10'
                    }`}
                  onClick={() => handleSkillChange(skill)}
                >
                  {skill}
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-[#C1A461]">
              Project URL <span className="text-red-500">*</span>
            </Label>
            <Input 
              placeholder="https://example.com"
              value={formData.project_url}
              onChange={(e) => handleChange('project_url', e.target.value)}
              className="bg-[#1B2228] border-[#C1A461]/20 text-[#C1A461] focus-visible:ring-[#C1A461] placeholder:text-[#C1A461]/40"
            />
          </div>

          <Button 
            className="w-full bg-[#C1A461] hover:bg-[#C1A461]/90 text-[#1B2228]"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Adding Project..." : "Add Project"}
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}