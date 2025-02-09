import { useState } from 'react'
import { useTheme } from '../contexts/ThemeContext' // Add theme import
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { Calendar } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { useUser } from '@/contexts/UserContext'
import { toast } from '@/components/ui/use-toast'
import type { BountyInsert, ProjectInsert, Category, Status } from '@/types/supabase'

interface FormData {
  title: string
  description: string
  category: Category
  requirements: string[]
  tags: string[]
  reward?: {
    amount: number
    token: string
    usd_equivalent: number
  }
  start_date?: string
  end_date?: string
  difficulty_level?: 'beginner' | 'intermediate' | 'advanced'
  estimated_hours?: number
}

const CATEGORIES: Category[] = ['content', 'design', 'development', 'other']
const TOKENS = ['ALPH', 'USDC', 'USDT']

export function PostListing() {
  const { user } = useUser()
  const { theme } = useTheme()
  const [loading, setLoading] = useState(false)
  const [listingType, setListingType] = useState<'bounty' | 'project'>('bounty')
  const [formData, setFormData] = useState<FormData>({
    title: '',
    description: '',
    category: 'development',
    requirements: [],
    tags: [],
  })

  const bgColor = theme === 'dark' ? 'bg-[#1B2228]' : 'bg-white'
  const textColor = theme === 'dark' ? 'text-[#C1A461]' : 'text-gray-900'
  const borderColor = theme === 'dark' ? 'border-[#C1A461]/20' : 'border-amber-200'
  const mutedTextColor = theme === 'dark' ? 'text-[#C1A461]/60' : 'text-gray-600'

  const handleInputChange = (field: keyof FormData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSubmit = async () => {
    try {
      setLoading(true)

      if (!user?.id) {
        toast({
          title: "Error",
          description: "You must be logged in to post a listing",
          variant: "destructive"
        })
        return
      }

      const baseData = {
        sponsor_id: user.id,
        title: formData.title,
        description: formData.description,
        category: formData.category,
        status: 'open',
        requirements: formData.requirements,
        tags: formData.tags,
        is_featured: false,
      }

      if (listingType === 'bounty') {
        const bountyData: BountyInsert = {
          ...baseData,
          reward: {
            amount: formData.reward?.amount || 0,
            token: formData.reward?.token || 'ALPH',
            usd_equivalent: formData.reward?.usd_equivalent || 0
          },
          start_date: formData.start_date || new Date().toISOString(),
          end_date: formData.end_date || new Date().toISOString(),
          review_timeframe: 7,
          difficulty_level: formData.difficulty_level || 'beginner',
          estimated_hours: formData.estimated_hours || 0,
          submission_guidelines: '',
          max_submissions: 10,
          current_submissions: 0,
          status: 'open' as Status
        }

        const { error } = await supabase
          .from('bounties')
          .insert([bountyData])

        if (error) {
        console.error('Supabase error details:', error)
        throw new Error(`Failed to insert bounty: ${error.message}`)
      }
      } else {
        const projectData: ProjectInsert = {
          ...baseData,
          repository_url: null,
          documentation_url: null,
          submission_count: 0,
          status: 'open' as Status
        }

        const { error } = await supabase
          .from('projects')
          .insert([projectData])

        if (error) throw error
      }

      toast({
        title: "Success",
        description: `${listingType === 'bounty' ? 'Bounty' : 'Project'} posted successfully!`
      })

      // Reset form
      setFormData({
        title: '',
        description: '',
        category: 'development',
        requirements: [],
        tags: [],
      })
    } catch (error) {
      console.error('Error posting listing:', error)
      toast({
        title: "Error",
        description: "Failed to post listing. Please try again.",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={`max-w-4xl mx-auto p-4 ${bgColor}`}>
      <Tabs value={listingType} onValueChange={(v) => setListingType(v as 'bounty' | 'project')}>
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger
            value="bounty"
            className={`${textColor} data-[state=active]:${textColor}`}
          >
            Bounty
          </TabsTrigger>
          <TabsTrigger
            value="project"
            className={`${textColor} data-[state=active]:${textColor}`}
          >
            Project
          </TabsTrigger>
        </TabsList>

        <Card className={`${bgColor} border-${borderColor}`}>
          <CardHeader>
            <CardTitle className={textColor}>
              Post a New {listingType === 'bounty' ? 'Bounty' : 'Project'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label className={textColor}>Title</Label>
              <Input
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                placeholder="Enter a descriptive title"
                className={`${bgColor} border-${borderColor} ${textColor} focus-visible:ring-[#C1A461] placeholder:${mutedTextColor}`}
              />
            </div>

            <div className="space-y-2">
              <Label className={textColor}>Description</Label>
              <Textarea
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Describe the requirements and expectations"
                className={`${bgColor} border-${borderColor} ${textColor} focus-visible:ring-[#C1A461] placeholder:${mutedTextColor} min-h-[120px]`}
              />
            </div>

            <div className="space-y-2">
              <Label className={textColor}>Category</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => handleInputChange('category', value)}
              >
                <SelectTrigger className={`${bgColor} border-${borderColor} ${textColor}`}>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent className={`${bgColor} border-${borderColor}`}>
                  {CATEGORIES.map((category) => (
                    <SelectItem 
                      key={category} 
                      value={category}
                      className={textColor}
                    >
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {listingType === 'bounty' && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className={textColor}>Reward Amount ($USD)</Label>
                    <Input
                      type="number"
                      value={formData.reward?.amount || ''}
                      onChange={(e) => handleInputChange('reward', {
                        amount: parseFloat(e.target.value),
                        token: formData.reward?.token || TOKENS[0],
                        usd_equivalent: parseFloat(e.target.value)
                      })}
                      placeholder="1000"
                      className={`${bgColor} border-${borderColor} ${textColor} focus-visible:ring-[#C1A461] placeholder:${mutedTextColor}`}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className={textColor}>Token</Label>
                    <Select
                      value={formData.reward?.token || TOKENS[0]}
                      onValueChange={(value) => handleInputChange('reward', {
                        ...formData.reward,
                        token: value
                      })}
                    >
                      <SelectTrigger className={`${bgColor} border-${borderColor} ${textColor}`}>
                        <SelectValue placeholder="Select token" />
                      </SelectTrigger>
                      <SelectContent className={`${bgColor} border-${borderColor}`}>
                        {TOKENS.map((token) => (
                          <SelectItem 
                            key={token} 
                            value={token}
                            className={textColor}
                          >
                            {token}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className={textColor}>Start Date</Label>
                    <div className="relative">
                      <Input
                        type="date"
                        value={formData.start_date || ''}
                        onChange={(e) => handleInputChange('start_date', e.target.value)}
                        className={`${bgColor} border-${borderColor} ${textColor} focus-visible:ring-[#C1A461]`}
                      />
                      <Calendar className={`absolute right-3 top-2.5 h-4 w-4 ${mutedTextColor}`} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className={textColor}>End Date</Label>
                    <div className="relative">
                      <Input
                        type="date"
                        value={formData.end_date || ''}
                        onChange={(e) => handleInputChange('end_date', e.target.value)}
                        className={`${bgColor} border-${borderColor} ${textColor} focus-visible:ring-[#C1A461]`}
                      />
                      <Calendar className={`absolute right-3 top-2.5 h-4 w-4 ${mutedTextColor}`} />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className={textColor}>Difficulty Level</Label>
                    <Select
                      value={formData.difficulty_level}
                      onValueChange={(value: 'beginner' | 'intermediate' | 'advanced') => 
                        handleInputChange('difficulty_level', value)}
                    >
                      <SelectTrigger className={`${bgColor} border-${borderColor} ${textColor}`}>
                        <SelectValue placeholder="Select difficulty" />
                      </SelectTrigger>
                      <SelectContent className={`${bgColor} border-${borderColor}`}>
                        <SelectItem value="beginner" className={textColor}>Beginner</SelectItem>
                        <SelectItem value="intermediate" className={textColor}>Intermediate</SelectItem>
                        <SelectItem value="advanced" className={textColor}>Advanced</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className={textColor}>Estimated Hours</Label>
                    <Input
                      type="number"
                      value={formData.estimated_hours || ''}
                      onChange={(e) => handleInputChange('estimated_hours', parseInt(e.target.value))}
                      placeholder="40"
                      className={`${bgColor} border-${borderColor} ${textColor} focus-visible:ring-[#C1A461] placeholder:${mutedTextColor}`}
                    />
                  </div>
                </div>
              </>
            )}

            <Button 
              className={theme === 'dark' ? 
                "w-full bg-[#C1A461] hover:bg-[#C1A461]/90 text-[#1B2228]" : 
                "w-full bg-amber-500 hover:bg-amber-600 text-white"}
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? 'Posting...' : `Post ${listingType === 'bounty' ? 'Bounty' : 'Project'}`}
            </Button>
          </CardContent>
        </Card>
      </Tabs>
    </div>
  )
} 