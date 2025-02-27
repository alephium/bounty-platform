import { useState, useEffect } from 'react'
import { useTheme } from '../contexts/ThemeContext'
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { useNavigate } from 'react-router-dom'
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
import { Pencil } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { useUser } from '@/contexts/UserContext'
import { toast } from '@/components/ui/use-toast'
import type { Bounty, BountyInsert, ProjectInsert, Category, Status } from '@/types/supabase'

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
  const { user } = useUser()
  const { theme } = useTheme()
  const [loading, setLoading] = useState(false)
  const [listingType, setListingType] = useState<'bounty' | 'project'>('bounty')
  const [formData, setFormData] = useState<FormData>({
    title: '',
    description: '',
    category: 'development',
    requirements: '',
    tags: [],
  })
  
  // New state for storing sponsor bounties
  const [sponsorId, setSponsorId] = useState<string | null>(null)
  const [sponsorBounties, setSponsorBounties] = useState<Bounty[]>([])
  const [loadingBounties, setLoadingBounties] = useState(false)

  const bgColor = theme === 'dark' ? 'bg-[#1B2228]' : 'bg-white'
  const textColor = theme === 'dark' ? 'text-[#C1A461]' : 'text-gray-900'
  const borderColor = theme === 'dark' ? 'border-[#C1A461]/20' : 'border-amber-200'
  const mutedTextColor = theme === 'dark' ? 'text-[#C1A461]/60' : 'text-gray-600'

  // Fetch sponsor profile and bounties when component loads
  useEffect(() => {
    const getSponsorAndBounties = async () => {
      if (!user?.id) return
      
      try {
        // Get sponsor profile
        const { data: sponsor, error: sponsorError } = await supabase
          .from('sponsors')
          .select('id')
          .eq('user_id', user.id)
          .single()
          
        if (sponsorError) {
          console.error('Error fetching sponsor:', sponsorError)
          return
        }
        
        if (sponsor?.id) {
          setSponsorId(sponsor.id)
          
          // Fetch bounties
          setLoadingBounties(true)
          const { data: bounties, error: bountiesError } = await supabase
            .from('bounties')
            .select('*')
            .eq('sponsor_id', sponsor.id)
            .order('created_at', { ascending: false })
            
          if (bountiesError) {
            console.error('Error fetching bounties:', bountiesError)
          } else {
            setSponsorBounties(bounties || [])
          }
        }
      } catch (error) {
        console.error('Error loading sponsor data:', error)
      } finally {
        setLoadingBounties(false)
      }
    }
    
    getSponsorAndBounties()
  }, [user])

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

      // Check if the logged-in user has a sponsor profile
      const { data: sponsorData, error: sponsorError } = await supabase
        .from('sponsors')
        .select('id, total_bounties_count, total_projects_count, total_reward_amount')
        .eq('user_id', user.id)
        .single()

      // If no sponsor profile exists
      if (sponsorError || !sponsorData) {
        toast({
          title: "Sponsor Profile Required",
          description: "You need to create a sponsor profile before posting a listing",
          variant: "destructive"
        })
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
        requirements: formData.requirements,
        tags: formData.tags,
        is_featured: false,
      }

      let newListingId: string | null = null
      let usdEquivalent = 0

      if (listingType === 'bounty') {
        // Calculate USD equivalent for reward
        usdEquivalent = formData.reward?.amount || 0

        const bountyData: BountyInsert = {
          ...baseData,
          reward: {
            amount: formData.reward?.amount || 0,
            token: formData.reward?.token || 'ALPH',
            usd_equivalent: usdEquivalent
          },
          start_date: formData.start_date || new Date().toISOString(),
          end_date: formData.end_date || new Date().toISOString(),
          review_timeframe: 7,
          difficulty_level: formData.difficulty_level || 'beginner',
          estimated_hours: formData.estimated_hours || 0,
          submission_guidelines: '',
          max_submissions: 10,
          current_submissions: 0,
          status: 'open'
        }

        const { data, error } = await supabase
          .from('bounties')
          .insert([bountyData])
          .select('id')
          .single()

        if (error) {
          console.error('Supabase bounty error:', error)
          throw new Error(`Failed to insert bounty: ${error.message}`)
        }

        newListingId = data.id

        // Update sponsor's bounty statistics
        await supabase
          .from('sponsors')
          .update({
            total_bounties_count: sponsorData.total_bounties_count + 1,
            total_reward_amount: sponsorData.total_reward_amount + usdEquivalent,
            updated_at: new Date().toISOString()
          })
          .eq('id', sponsorData.id)

      } else {
        const projectData: ProjectInsert = {
          ...baseData,
          repository_url: null,
          documentation_url: null,
          submission_count: 0,
          status: 'open'
        }

        const { data, error } = await supabase
          .from('projects')
          .insert([projectData])
          .select('id')
          .single()

        if (error) {
          console.error('Supabase project error:', error)
          throw new Error(`Failed to insert project: ${error.message}`)
        }

        newListingId = data.id

        // Update sponsor's project statistics
        await supabase
          .from('sponsors')
          .update({
            total_projects_count: sponsorData.total_projects_count + 1,
            updated_at: new Date().toISOString()
          })
          .eq('id', sponsorData.id)
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
        requirements: '',
        tags: [],
      })

      // Refresh the list of bounties
      if (sponsorData.id && listingType === 'bounty') {
        const { data: refreshedBounties } = await supabase
          .from('bounties')
          .select('*')
          .eq('sponsor_id', sponsorData.id)
          .order('created_at', { ascending: false })
          
        if (refreshedBounties) {
          setSponsorBounties(refreshedBounties)
        }
      }
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

  // Function to handle editing a bounty
  const handleEditBounty = (bountyId: string) => {
    navigate(`/editbounty?id=${bountyId}`)
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
                placeholder="Describe the and expectations"
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
                        className={`${bgColor} border-${borderColor} ${textColor} focus-visible:ring-[#C1A461]
                                  [&::-webkit-calendar-picker-indicator]:absolute 
                                  [&::-webkit-calendar-picker-indicator]:right-3
                                  [&::-webkit-calendar-picker-indicator]:left-auto
                                  `}
                        id="start-date"
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
                        className={`${bgColor} border-${borderColor} ${textColor} focus-visible:ring-[#C1A461]
                                  [&::-webkit-calendar-picker-indicator]:absolute 
                                  [&::-webkit-calendar-picker-indicator]:right-3
                                  [&::-webkit-calendar-picker-indicator]:left-auto
                                  `}
                        id="end-date"
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
              {loading ? 'Posting...' : `Post ${listingType === 'bounty' ? 'Bounty' : 'Project'}`}
            </Button>
          </CardContent>
        </Card>
      </Tabs>

      {/* List of sponsor's bounties with edit buttons */}
      {listingType === 'bounty' && (
        <div className="mt-10">
          <h2 className={`text-xl font-semibold ${textColor} mb-4`}>Your Bounties</h2>
          
          {loadingBounties ? (
            <p className={textColor}>Loading your bounties...</p>
          ) : sponsorBounties.length === 0 ? (
            <p className={`${textColor} opacity-70`}>You haven't posted any bounties yet.</p>
          ) : (
            <div className="space-y-4">
              {sponsorBounties.map((bounty) => (
                <div 
                  key={bounty.id} 
                  className={`p-4 border ${borderColor} rounded-lg flex justify-between items-center`}
                >
                  <div>
                    <h3 className={`font-medium ${textColor}`}>{bounty.title}</h3>
                    <div className="flex gap-2 mt-1">
                      <span className={`text-sm ${mutedTextColor}`}>
                        {bounty.reward.amount} {bounty.reward.token}
                      </span>
                      <span className={`text-sm ${mutedTextColor}`}>
                        Status: {bounty.status}
                      </span>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    className={`border-${borderColor} ${textColor}`}
                    onClick={() => handleEditBounty(bounty.id)}
                  >
                    <Pencil className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}