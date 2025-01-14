import { useState, useEffect } from "react"
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
import { useTheme } from "@/contexts/ThemeContext"
import { toast } from "sonner"
import { Category, Bounty } from "@/types/supabase"

interface FormData {
  title: string
  description: string
  category: Category
  company: {
    name: string
    logo: string
  }
  reward: {
    amount: number
    token: string
  }
  due_date: string
  status: 'open' | 'in review' | 'completed'
}

const INITIAL_FORM_DATA: FormData = {
  title: "",
  description: "",
  category: 'development',
  company: {
    name: "Alephium",
    logo: ""
  },
  reward: {
    amount: 0,
    token: "ALPH"
  },
  due_date: "",
  status: 'open'
}

export default function EditBounty() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useUser()
  const { theme } = useTheme()
  const [loading, setLoading] = useState(false)
  const [initialLoading, setInitialLoading] = useState(false)
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM_DATA)

  const textColor = theme === 'dark' ? 'text-[#C1A461]' : 'text-gray-900'
  const bgColor = theme === 'dark' ? 'bg-[#1B2228]' : 'bg-white'
  const borderColor = theme === 'dark' ? 'border-[#C1A461]/20' : 'border-amber-200'

  // Fetch existing bounty data if editing
  useEffect(() => {
    const fetchBounty = async () => {
      if (!id) return

      setInitialLoading(true)
      try {
        const { data, error } = await supabase
          .from('bounties')
          .select('*')
          .eq('id', id)
          .single()

        if (error) throw error
        if (data) {
          setFormData(data)
        }
      } catch (error) {
        console.error('Error fetching bounty:', error)
        toast.error("Failed to load bounty details")
        navigate('/bounties')
      } finally {
        setInitialLoading(false)
      }
    }

    fetchBounty()
  }, [id])

  // Check if user is authorized
  useEffect(() => {
    if (!user?.email?.endsWith('@alephium.org')) {
      toast.error("Unauthorized access")
      navigate('/bounties')
    }
  }, [user])

  const handleChange = (
    field: keyof FormData | 'reward.amount' | 'reward.token' | 'company.name' | 'status', 
    value: any
  ) => {
    setFormData(prev => {
      if (field === 'reward.amount') {
        return { ...prev, reward: { ...prev.reward, amount: Number(value) } }
      }
      if (field === 'reward.token') {
        return { ...prev, reward: { ...prev.reward, token: value } }
      }
      if (field === 'company.name') {
        return { ...prev, company: { ...prev.company, name: value } }
      }
      return { ...prev, [field]: value }
    })
  }

  const validateForm = () => {
    const requiredFields: (keyof FormData)[] = ['title', 'description', 'category', 'due_date']
    const emptyFields = requiredFields.filter(field => !formData[field])

    if (emptyFields.length > 0) {
      toast.error(`Please fill in: ${emptyFields.join(', ')}`)
      return false
    }

    if (!formData.reward.amount || formData.reward.amount <= 0) {
      toast.error("Please enter a valid reward amount")
      return false
    }

    const dueDate = new Date(formData.due_date)
    if (dueDate < new Date()) {
      toast.error("Due date cannot be in the past")
      return false
    }

    return true
  }

  const handleSubmit = async () => {
    if (!validateForm()) return

    setLoading(true)
    try {
      if (id) {
        // Update existing bounty
        const { error } = await supabase
          .from('bounties')
          .update({
            ...formData,
            updated_at: new Date().toISOString()
          })
          .eq('id', id)

        if (error) throw error
        toast.success("Bounty updated successfully!")
      } else {
        // Create new bounty
        const { error } = await supabase
          .from('bounties')
          .insert([{
            ...formData,
            submissions_count: 0,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          }])

        if (error) throw error
        toast.success("Bounty published successfully!")
      }

      navigate('/bounties')
    } catch (error) {
      console.error('Error saving bounty:', error)
      toast.error(id ? "Failed to update bounty" : "Failed to publish bounty")
    } finally {
      setLoading(false)
    }
  }

  if (initialLoading) {
    return (
      <div className={`min-h-screen ${bgColor} flex items-center justify-center`}>
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-[#C1A461]" />
      </div>
    )
  }

  return (
    <div className={`min-h-screen ${bgColor} p-4 flex items-center justify-center`}>
      <Card className={`w-full max-w-2xl ${bgColor} ${borderColor}`}>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className={`${textColor} text-2xl font-semibold`}>
            {id ? 'Edit Bounty' : 'Publish Bounty'}
          </CardTitle>
          <Button
            variant="ghost"
            size="icon"
            className={`${textColor}/60 hover:${textColor} hover:bg-[#C1A461]/10`}
            onClick={() => navigate('/bounties')}
          >
            <X className="h-5 w-5" />
          </Button>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Title */}
          <div className="space-y-2">
            <Label className={textColor}>
              Title <span className="text-red-500">*</span>
            </Label>
            <Input 
              placeholder="Bounty Title"
              value={formData.title}
              onChange={(e) => handleChange('title', e.target.value)}
              className={`${bgColor} ${borderColor} ${textColor}`}
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label className={textColor}>
              Description <span className="text-red-500">*</span>
            </Label>
            <Textarea
              placeholder="Describe the bounty requirements and deliverables"
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              className={`${bgColor} ${borderColor} ${textColor} min-h-[120px]`}
            />
          </div>

          {/* Category */}
          <div className="space-y-2">
            <Label className={textColor}>
              Category <span className="text-red-500">*</span>
            </Label>
            <Select
              value={formData.category}
              onValueChange={(value: Category) => handleChange('category', value)}
            >
              <SelectTrigger className={`${bgColor} ${borderColor} ${textColor}`}>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent className={`${bgColor} ${borderColor}`}>
                <SelectItem value="development">Development</SelectItem>
                <SelectItem value="design">Design</SelectItem>
                <SelectItem value="content">Content</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Reward */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className={textColor}>
                Reward Amount <span className="text-red-500">*</span>
              </Label>
              <Input 
                type="number"
                min="0"
                step="0.1"
                placeholder="Amount"
                value={formData.reward.amount}
                onChange={(e) => handleChange('reward.amount', e.target.value)}
                className={`${bgColor} ${borderColor} ${textColor}`}
              />
            </div>
            <div className="space-y-2">
              <Label className={textColor}>
                Token <span className="text-red-500">*</span>
              </Label>
              <Select
                value={formData.reward.token}
                onValueChange={(value) => handleChange('reward.token', value)}
              >
                <SelectTrigger className={`${bgColor} ${borderColor} ${textColor}`}>
                  <SelectValue placeholder="Select token" />
                </SelectTrigger>
                <SelectContent className={`${bgColor} ${borderColor}`}>
                  <SelectItem value="ALPH">ALPH</SelectItem>
                  <SelectItem value="USDC">USDC</SelectItem>
                  <SelectItem value="ETH">ETH</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Due Date */}
          <div className="space-y-2">
            <Label className={textColor}>
              Due Date <span className="text-red-500">*</span>
            </Label>
            <Input 
              type="date"
              value={formData.due_date}
              min={new Date().toISOString().split('T')[0]}
              onChange={(e) => handleChange('due_date', e.target.value)}
              className={`${bgColor} ${borderColor} ${textColor}`}
            />
          </div>

          {/* Status (only for editing) */}
          {id && (
            <div className="space-y-2">
              <Label className={textColor}>Status</Label>
              <Select
                value={formData.status}
                onValueChange={(value: 'open' | 'in review' | 'completed') => 
                  handleChange('status', value)
                }
              >
                <SelectTrigger className={`${bgColor} ${borderColor} ${textColor}`}>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent className={`${bgColor} ${borderColor}`}>
                  <SelectItem value="open">Open</SelectItem>
                  <SelectItem value="in review">In Review</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          <Button 
            className="w-full bg-[#C1A461] hover:bg-[#C1A461]/90 text-[#1B2228]"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? (id ? "Updating..." : "Publishing...") : (id ? "Update Bounty" : "Publish Bounty")}
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}