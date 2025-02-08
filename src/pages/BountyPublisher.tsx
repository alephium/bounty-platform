import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Plus, Pencil, Trash2 } from 'lucide-react'
import {
  Card,
  CardContent,
  CardFooter,
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
import { useUser } from '@/contexts/UserContext'
import { BountyService } from '../services/bounty.service'
import { toast } from '@/components/ui/use-toast'

export default function BountyPublisher() {
  const navigate = useNavigate()
  const { user } = useUser()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    reward_amount: '',
    reward_token: 'ALPH',
    requirements: [''],
    due_date: '',
    max_submissions: '1',
    submission_guidelines: '',
    review_timeframe: '7'
  })

  const handleRequirementChange = (index: number, value: string) => {
    const newRequirements = [...formData.requirements]
    newRequirements[index] = value
    setFormData(prev => ({ ...prev, requirements: newRequirements }))
  }

  const addRequirement = () => {
    setFormData(prev => ({
      ...prev,
      requirements: [...prev.requirements, '']
    }))
  }

  const removeRequirement = (index: number) => {
    setFormData(prev => ({
      ...prev,
      requirements: prev.requirements.filter((_, i) => i !== index)
    }))
  }

  const handleSubmit = async () => {
    try {
      setLoading(true)

      if (!user?.email?.endsWith('@alephium.org')) {
        toast({
          variant: "destructive",
          title: "Unauthorized",
          description: "Only Alephium team members can publish bounties"
        })
        return
      }

      // Validate form
      const requiredFields = ['title', 'description', 'category', 'reward_amount']
      const emptyFields = requiredFields.filter(field => !formData[field])
      
      if (emptyFields.length > 0) {
        toast({
          variant: "destructive",
          title: "Missing Fields",
          description: `Please fill in: ${emptyFields.join(', ')}`
        })
        return
      }

      const bountyData = {
        title: formData.title,
        description: formData.description,
        category: formData.category,
        publisher_id: user.id,
        publisher_email: user.email,
        company: {
          name: 'Alephium',
          logo: '/alephium-logo.png'
        },
        reward: {
          amount: parseFloat(formData.reward_amount),
          token: formData.reward_token,
          usd_equivalent: parseFloat(formData.reward_amount) // TODO: Add price conversion
        },
        requirements: formData.requirements.filter(r => r.trim()),
        due_date: formData.due_date || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        max_submissions: parseInt(formData.max_submissions),
        submission_guidelines: formData.submission_guidelines,
        review_timeframe: parseInt(formData.review_timeframe),
        status: 'open'
      }

      await BountyService.createBounty(bountyData)
      
      toast({
        title: "Success",
        description: "Bounty published successfully"
      })
      
      navigate('/bounties')
    } catch (error) {
      console.error('Error publishing bounty:', error)
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to publish bounty. Please try again."
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Publish New Bounty</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Basic Info */}
          <div className="space-y-4">
            <div>
              <Label>Title</Label>
              <Input
                value={formData.title}
                onChange={e => setFormData(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Bounty Title"
              />
            </div>
            <div>
              <Label>Description</Label>
              <Textarea
                value={formData.description}
                onChange={e => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Detailed description of the bounty"
                className="min-h-[120px]"
              />
            </div>
          </div>

          {/* Category */}
          <div>
            <Label>Category</Label>
            <Select
              value={formData.category}
              onValueChange={value => setFormData(prev => ({ ...prev, category: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="content">Content</SelectItem>
                <SelectItem value="design">Design</SelectItem>
                <SelectItem value="development">Development</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Reward */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Reward Amount</Label>
              <Input
                type="number"
                value={formData.reward_amount}
                onChange={e => setFormData(prev => ({ ...prev, reward_amount: e.target.value }))}
                placeholder="Amount"
              />
            </div>
            <div>
              <Label>Token</Label>
              <Select
                value={formData.reward_token}
                onValueChange={value => setFormData(prev => ({ ...prev, reward_token: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ALPH">ALPH</SelectItem>
                  <SelectItem value="USDC">USDC</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Requirements */}
          <div className="space-y-4">
            <Label>Requirements</Label>
            {formData.requirements.map((req, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  value={req}
                  onChange={e => handleRequirementChange(index, e.target.value)}
                  placeholder="Requirement"
                />
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={() => removeRequirement(index)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button
              variant="outline"
              onClick={addRequirement}
              className="w-full"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Requirement
            </Button>
          </div>

          {/* Submission Guidelines */}
          <div>
            <Label>Submission Guidelines</Label>
            <Textarea
              value={formData.submission_guidelines}
              onChange={e => setFormData(prev => ({ ...prev, submission_guidelines: e.target.value }))}
              placeholder="Guidelines for submissions"
              className="min-h-[120px]"
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-end gap-4">
          <Button
            variant="outline"
            onClick={() => navigate('/bounties')}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Publishing..." : "Publish Bounty"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}