import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "sonner"
import { supabase } from "@/lib/supabase"
import { useUser } from "@/contexts/UserContext"
import { ImagePlus, X } from "lucide-react"
import { useTheme } from "@/contexts/ThemeContext"

interface FormData {
  name: string
  website_url: string
  twitter_handle: string
  logo: File | null
}

export function CreateSponsorProfile() {
  const navigate = useNavigate()
  const { user } = useUser()
  const { theme } = useTheme()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    name: "",
    website_url: "",
    twitter_handle: "",
    logo: null
  })
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  const textColor = theme === 'dark' ? 'text-[#C1A461]' : 'text-gray-900'
  const bgColor = theme === 'dark' ? 'bg-[#1B2228]' : 'bg-white'
  const borderColor = theme === 'dark' ? 'border-[#C1A461]/20' : 'border-amber-200'

  const handleLogoChange = (file: File | null) => {
    if (!file) return

    if (file.size > 5 * 1024 * 1024) {
      toast.error("File size should be less than 5MB")
      return
    }

    if (!file.type.startsWith('image/')) {
      toast.error("Please upload an image file")
      return
    }

    setFormData(prev => ({ ...prev, logo: file }))
    const reader = new FileReader()
    reader.onloadend = () => setPreviewUrl(reader.result as string)
    reader.readAsDataURL(file)
  }

  const uploadLogo = async (file: File): Promise<string | null> => {
    try {
      const fileExt = file.name.split('.').pop()
      const fileName = `${Date.now()}.${fileExt}`
      const filePath = `sponsor-logos/${fileName}`

      const { error: uploadError } = await supabase.storage
        .from('public')
        .upload(filePath, file)

      if (uploadError) throw uploadError

      const { data: { publicUrl } } = supabase.storage
        .from('public')
        .getPublicUrl(filePath)

      return publicUrl
    } catch (error) {
      console.error('Error uploading logo:', error)
      return null
    }
  }

  const handleSubmit = async () => {
    try {
      if (!user?.id) {
        toast.error("You must be logged in")
        return
      }

      setLoading(true)

      if (!formData.name.trim()) {
        toast.error("Organization name is required")
        return
      }

      let logo_url = null
      if (formData.logo) {
        logo_url = await uploadLogo(formData.logo)
      }

      const { data: sponsor, error } = await supabase
        .from('sponsors')
        .insert([{
          user_id: user.id,
          name: formData.name,
          website_url: formData.website_url || null,
          twitter_handle: formData.twitter_handle || null,
          logo_url,
          is_verified: false,
          total_bounties_count: 0,
          total_projects_count: 0,
          total_reward_amount: 0
        }])
        .select()
        .single()

      if (error) throw error

      toast.success("Sponsor profile created successfully!")
      navigate(`/sponsor/dashboard`)
    } catch (error) {
      console.error('Error creating sponsor:', error)
      toast.error("Failed to create sponsor profile")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className={`${bgColor} ${borderColor}`}>
      <CardHeader>
        <CardTitle className={textColor}>Create Sponsor Profile</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label className={textColor}>Logo</Label>
          <div className="relative h-48 border-2 border-dashed rounded-lg border-[#C1A461]/20">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleLogoChange(e.target.files?.[0] || null)}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
            />
            
            {previewUrl ? (
              <div className="relative h-full w-full">
                <img 
                  src={previewUrl}
                  alt="Preview"
                  className="h-full w-full object-contain p-2"
                />
                <button
                  onClick={() => {
                    setPreviewUrl(null)
                    setFormData(prev => ({ ...prev, logo: null }))
                  }}
                  className="absolute top-2 right-2 p-1 bg-red-500/80 hover:bg-red-500 rounded-full text-white"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-[#C1A461]/60">
                <ImagePlus className="h-10 w-10 mb-2" />
                <p className="text-sm">Click to upload logo (max 5MB)</p>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label className={textColor}>Organization Name *</Label>
            <Input
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className={`${bgColor} ${borderColor} ${textColor}`}
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
      </CardContent>
    </Card>
  )
}