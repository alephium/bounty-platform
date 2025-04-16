import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "sonner"
import { supabase } from "@/lib/supabase"
import { useUser } from "@/contexts/UserContext"
import { useTheme } from "@/contexts/ThemeContext"

interface FormData {
  name: string
  description: string
  website_url: string
  twitter_handle: string
}

export function CreateSponsorProfile() {
  const navigate = useNavigate()
  const { user } = useUser()
  const { theme } = useTheme()
  const [loading, setLoading] = useState(false)
  const [checking, setChecking] = useState(true)
  const [useFallback, setUseFallback] = useState(false)  // Track if we need to use fallback
  const [formData, setFormData] = useState<FormData>({
    name: "",
    description: "",
    website_url: "",
    twitter_handle: ""
  })

  const textColor = theme === 'dark' ? 'text-[#C1A461]' : 'text-gray-900'
  const bgColor = theme === 'dark' ? 'bg-[#1B2228]' : 'bg-white'
  const borderColor = theme === 'dark' ? 'border-[#C1A461]/20' : 'border-amber-200'

  // Check if user already has a sponsor profile
  useEffect(() => {
    const checkSponsorProfile = async () => {
      console.log("Checking sponsor profile, user:", user)
      
      // If no user, we're either not logged in or still loading
      if (!user) {
        console.log("No user found, setting checking to false after delay")
        // After a reasonable delay, assume not logged in rather than keep loading
        setTimeout(() => {
          setChecking(false)
        }, 1500)
        return
      }
      
      // Set a max timeout to prevent infinite loading
      const timeoutId = setTimeout(() => {
        console.log("Forced timeout for sponsor check")
        setChecking(false)
      }, 5000)
      
      try {
        console.log("Querying Supabase for sponsor profile with user ID:", user.id)
        const { data, error } = await supabase
          .from('sponsors')
          .select('id')
          .eq('user_id', user.id)
          .maybeSingle()
          
        clearTimeout(timeoutId)
          
        if (error) {
          console.error("Error checking sponsor profile:", error)
          if (error.code === 'PGRST116') {
            console.log("No profile found, which is expected for new sponsors")
          } else {
            toast.error("Error checking your sponsor profile: " + error.message)
          }
        } else if (data) {
          console.log("Found existing sponsor profile:", data)
          toast.success("Redirecting to your sponsor dashboard")
          setTimeout(() => {
            window.location.href = `/sponsor/dashboard`
          }, 1000)
          return
        }
      } catch (error) {
        clearTimeout(timeoutId)
        console.error("Exception checking sponsor profile:", error)
      } finally {
        clearTimeout(timeoutId)
        console.log("Setting checking to false")
        setChecking(false)
      }
    }
    
    checkSponsorProfile()
  }, [user, navigate]) 

  // Fallback method using direct fetch
  const createSponsorWithFetch = async () => {
    if (!user?.id) return
    
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
    const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

    if (!supabaseUrl || !supabaseKey) {
      toast.error("Missing Supabase configuration")
      return
    }

    try {
      setLoading(true)
      console.log("Creating sponsor profile using direct fetch for user:", user.id)
      
      const sponsorData = {
        user_id: user.id,
        name: formData.name,
        description: formData.description || null,
        website_url: formData.website_url || null,
        twitter_handle: formData.twitter_handle || null,
        logo_url: user.avatar_url,
        is_verified: false,
        total_bounties_count: 0,
        total_projects_count: 0,
        total_reward_amount: 0,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
      
      // Create a controller for timeout handling
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 10000)
      
      // Direct fetch request to Supabase 
      const response = await fetch(`${supabaseUrl}/rest/v1/sponsors`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': supabaseKey,
          'Authorization': `Bearer ${supabaseKey}`,
          'Prefer': 'return=representation'
        },
        body: JSON.stringify(sponsorData),
        signal: controller.signal
      })
      
      clearTimeout(timeoutId)
      
      if (!response.ok) {
        const errorText = await response.text()
        console.error('Error response from API:', response.status, errorText)
        throw new Error(`API error: ${response.status} - ${errorText}`)
      }
      
      const data = await response.json()
      console.log("Sponsor profile created successfully with fetch:", data)
      
      toast.success("Sponsor profile created successfully!")
      navigate(`/sponsor/dashboard`)
    } catch (error: any) {
      console.error('Error creating sponsor with fetch:', error)
      
      if (error.name === 'AbortError') {
        toast.error("Request timed out. Please check your internet connection and try again.")
      } else {
        toast.error(error.message || "Failed to create sponsor profile")
      }
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = createSponsorWithFetch;

  if (checking) {
    return (
      <Card className={`${bgColor} ${borderColor}`}>
        <CardContent className="p-12 flex justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-[#C1A461] border-t-transparent" />
        </CardContent>
      </Card>
    )
  }

  // Add a check for when the user isn't logged in
  if (!user) {
    return (
      <Card className={`${bgColor} ${borderColor}`}>
        <CardHeader>
          <CardTitle className={textColor}>Create Sponsor Profile</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className={textColor}>Please sign in to create a sponsor profile.</p>
          <Button 
            className="w-full bg-[#C1A461] hover:bg-[#C1A461]/90 text-[#1B2228]"
            onClick={() => navigate('/auth')}
          >
            Sign In
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className={`${bgColor} ${borderColor}`}>
      <CardHeader>
        <CardTitle className={textColor}>Create Sponsor Profile</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label className={textColor}>Organization Name *</Label>
            <Input
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className={`${bgColor} ${borderColor} ${textColor}`}
              placeholder="Your organization or project name"
            />
          </div>
          
          <div className="space-y-2">
            <Label className={textColor}>Description</Label>
            <Input
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className={`${bgColor} ${borderColor} ${textColor}`}
              placeholder="Brief description of your organization or project"
            />
          </div>
          
          <div className="space-y-2">
            <Label className={textColor}>Website URL</Label>
            <Input
              value={formData.website_url}
              onChange={(e) => setFormData(prev => ({ ...prev, website_url: e.target.value }))}
              className={`${bgColor} ${borderColor} ${textColor}`}
              placeholder="https://example.com"
            />
          </div>
          
          <div className="space-y-2">
            <Label className={textColor}>Twitter Handle</Label>
            <Input
              value={formData.twitter_handle}
              onChange={(e) => setFormData(prev => ({ ...prev, twitter_handle: e.target.value }))}
              className={`${bgColor} ${borderColor} ${textColor}`}
              placeholder="@username"
            />
          </div>
        </div>

        <Button 
          className="w-full bg-[#C1A461] hover:bg-[#C1A461]/90 text-[#1B2228]"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Creating..." : "Create Sponsor Profile"}
        </Button>
        
        {useFallback && (
          <div className="text-center">
            <p className={`text-sm ${textColor}`}>Having trouble? Try our alternative method:</p>
            <Button
              variant="ghost"
              className={`mt-2 ${textColor} hover:bg-[#C1A461]/10`}
              onClick={createSponsorWithFetch}
              disabled={loading}
            >
              Try Alternative Method
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}