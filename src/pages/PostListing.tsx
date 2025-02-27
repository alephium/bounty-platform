import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useTheme } from '../contexts/ThemeContext'
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
import { supabase } from '@/lib/supabase'
import { useUser } from '@/contexts/UserContext'
import { toast } from 'sonner'
import type { BountyInsert, ProjectInsert, Category, Status, Bounty, Project } from '@/types/supabase'

interface FormData {
  title: string
  description: string
  category: Category
  requirements: string
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
const TOKENS = ['ALPH', 'USDC']

export function PostListing() {
  const navigate = useNavigate()
  const { id } = useParams() // For edit functionality
  const { user } = useUser()
  const { theme } = useTheme()
  const [loading, setLoading] = useState(false)
  const [listingType, setListingType] = useState<'bounty' | 'project'>('bounty')
  const [isEditMode, setIsEditMode] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    title: '',
    description: '',
    category: 'development',
    requirements: '',
    tags: [],
  })

  // Fetch existing listing for editing
  useEffect(() => {
    const fetchListing = async () => {
      if (!id) return

      try {
        setLoading(true)
        
        // Try fetching bounty first
        const { data: bountyData, error: bountyError } = await supabase
          .from('bounties')
          .select('*')
          .eq('id', id)
          .single()

        if (bountyData) {
          setListingType('bounty')
          setFormData({
            title: bountyData.title,
            description: bountyData.description || '',
            category: bountyData.category,
            requirements: bountyData.requirements || '',
            tags: bountyData.tags || [],
            reward: {
              amount: bountyData.reward.amount,
              token: bountyData.reward.token,
              usd_equivalent: bountyData.reward.usd_equivalent
            },
            start_date: bountyData.start_date.split('T')[0],
            end_date: bountyData.end_date.split('T')[0],
            difficulty_level: bountyData.difficulty_level,
            estimated_hours: bountyData.estimated_hours || undefined
          })
          setIsEditMode(true)
          return
        }

        // If no bounty, try fetching project
        const { data: projectData, error: projectError } = await supabase
          .from('projects')
          .select('*')
          .eq('id', id)
          .single()

        if (projectData) {
          setListingType('project')
          setFormData({
            title: projectData.title,
            description: projectData.description || '',
            category: projectData.category,
            requirements: projectData.requirements?.[0] || '',
            tags: projectData.tags || []
          })
          setIsEditMode(true)
        }
      } catch (error) {
        console.error('Error fetching listing:', error)
        toast.error('Failed to load listing details')
      } finally {
        setLoading(false)
      }
    }

    fetchListing()
  }, [id])

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
        toast.error("You must be logged in to post a listing")
        return
      }

      // Validate required fields
      if (!formData.title.trim()) {
        toast.error("Title is required")
        return
      }
      if (!formData.description.trim()) {
        toast.error("Description is required")
        return
      }

      // Check if the logged-in user has a sponsor profile
      const { data: sponsorData, error: sponsorError } = await supabase
        .from('sponsors')
        .select('id, total_bounties_count, total_projects_count, total_reward_amount')
        .eq('user_id', user.id)
        .single()

      // If no sponsor profile exists
      if (sponsorError || !sponsorData) {
        toast.error("You need to create a sponsor profile before posting a listing")
        navigate('/sponsor')
        return
      }

      // Prepare base data
      const baseData = {
        sponsor_id: sponsorData.id,
        title: formData.title,
        description: formData.description,
        category: formData.category,
        status: 'open' as Status,
        requirements: formData.requirements, // Convert to array
        tags: formData.tags,
        is_featured: false,
      }

      let result;
      let usdEquivalent = 0;

      if (listingType === 'bounty') {
        // Validate reward for bounties
        if (!formData.reward?.amount) {
          toast.error("Reward amount is required for bounties")
          return
        }

        usdEquivalent = formData.reward?.amount || 0

        const bountyData: BountyInsert = {
          ...baseData,
          reward: {
            amount: formData.reward?.amount || 0,
            token: formData.reward?.token || 'ALPH',
            usd_equivalent: usdEquivalent
          },
          start_date: formData.start_date ? new Date(formData.start_date).toISOString() : new Date().toISOString(),
          end_date: formData.end_date ? new Date(formData.end_date).toISOString() : new Date().toISOString(),
          review_timeframe: 7,
          difficulty_level: formData.difficulty_level || 'beginner',
          estimated_hours: formData.estimated_hours || 0,
          submission_guidelines: '',
          max_submissions: 10,
          current_submissions: 0,
          status: 'open'
        }

        if (isEditMode && id) {
          // Update existing bounty
          result = await supabase
            .from('bounties')
            .update(bountyData)
            .eq('id', id)
            .select()
            .single()
        } else {
          // Create new bounty
          result = await supabase
            .from('bounties')
            .insert([bountyData])
            .select()
            .single()

          // Update sponsor's bounty statistics
          await supabase
            .from('sponsors')
            .update({
              total_bounties_count: sponsorData.total_bounties_count + 1,
              total_reward_amount: sponsorData.total_reward_amount + usdEquivalent,
              updated_at: new Date().toISOString()
            })
            .eq('id', sponsorData.id)
        }
      } else {
        const projectData: ProjectInsert = {
          ...baseData,
          repository_url: null,
          documentation_url: null,
          submission_count: 0,
          status: 'open'
        }

        if (isEditMode && id) {
          // Update existing project
          result = await supabase
            .from('projects')
            .update(projectData)
            .eq('id', id)
            .select()
            .single()
        } else {
          // Create new project
          result = await supabase
            .from('projects')
            .insert([projectData])
            .select()
            .single()

          // Update sponsor's project statistics
          await supabase
            .from('sponsors')
            .update({
              total_projects_count: sponsorData.total_projects_count + 1,
              updated_at: new Date().toISOString()
            })
            .eq('id', sponsorData.id)
        }
      }

      if (result.error) {
        throw result.error
      }

      toast.success(
        isEditMode 
          ? `${listingType === 'bounty' ? 'Bounty' : 'Project'} updated successfully!`
          : `${listingType === 'bounty' ? 'Bounty' : 'Project'} posted successfully!`
      )

      // Navigate to the listing details page
      navigate(`/${listingType}/${result.data.id}`)
    } catch (error) {
      console.error('Error posting/updating listing:', error)
      toast.error("Failed to post/update listing. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={`max-w-4xl mx-auto p-4 ${bgColor}`}>
      <Tabs 
        value={listingType} 
        onValueChange={(v) => !isEditMode && setListingType(v as 'bounty' | 'project')}
      >
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
              {isEditMode 
                ? `Edit ${listingType === 'bounty' ? 'Bounty' : 'Project'}` 
                : `Post a New ${listingType === 'bounty' ? 'Bounty' : 'Project'}`}
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
              <Label className={textColor}>Requirements</Label>
              <Textarea
                value={formData.requirements}
                onChange={(e) => handleInputChange('requirements', e.target.value)}
                placeholder="Add requirements"
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
              {loading ? 'Posting...' : `${isEditMode ? 'Update' : 'Post'} ${listingType === 'bounty' ? 'Bounty' : 'Project'}`}
            </Button>
          </CardContent>
        </Card>
      </Tabs>
    </div>
  )
}