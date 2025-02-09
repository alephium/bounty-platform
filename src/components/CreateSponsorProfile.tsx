import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "@/components/ui/use-toast"
import { supabase } from "@/lib/supabase"
import { ImagePlus, X } from "lucide-react"

interface FormData {
  name: string
  website_url: string
  twitter_handle: string
  logo: File | null
}

export function CreateSponsorProfile() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    name: "",
    website_url: "",
    twitter_handle: "",
    logo: null
  })
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  const handleLogoChange = (file: File | null) => {
    if (!file) return

    if (file.size > 5 * 1024 * 1024) {
      toast({
        description: "File size should be less than 5MB",
        variant: "destructive"
      })
      return
    }

    if (!file.type.startsWith('image/')) {
      toast({
        description: "Please upload an image file",
        variant: "destructive"
      })
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
      setLoading(true)

      if (!formData.name.trim()) {
        toast({
          description: "Company name is required",
          variant: "destructive"
        })
        return
      }

      let logo_url = null
      if (formData.logo) {
        logo_url = await uploadLogo(formData.logo)
      }

      const { data: sponsor, error } = await supabase
        .from('sponsors')
        .insert([{
          name: formData.name,
          website_url: formData.website_url || null,
          twitter_handle: formData.twitter_handle || null,
          logo_url
        }])
        .select()
        .single()

      if (error) throw error

      toast({ description: "Sponsor profile created successfully" })
      navigate(`/sponsors/${sponsor.id}`)
    } catch (error) {
      console.error('Error creating sponsor:', error)
      toast({
        description: "Failed to create sponsor profile",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="bg-[#1B2228] border-[#C1A461]/20">
      <CardHeader>
        <CardTitle className="text-[#C1A461]">Create Sponsor Profile</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label className="text-[#C1A461]">Logo</Label>
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
            <Label className="text-[#C1A461]">Company Name *</Label>
            <Input
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className="bg-[#1B2228] border-[#C1A461]/20 text-[#C1A461] focus-visible:ring-[#C1A461]"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-[#C1A461]">Website URL</Label>
            <Input
              value={formData.website_url}
              onChange={(e) => setFormData(prev => ({ ...prev, website_url: e.target.value }))}
              className="bg-[#1B2228] border-[#C1A461]/20 text-[#C1A461] focus-visible:ring-[#C1A461]"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-[#C1A461]">Twitter Handle</Label>
            <Input
              value={formData.twitter_handle}
              onChange={(e) => setFormData(prev => ({ ...prev, twitter_handle: e.target.value }))}
              className="bg-[#1B2228] border-[#C1A461]/20 text-[#C1A461] focus-visible:ring-[#C1A461]"
            />
          </div>
        </div>

        <Button 
          className="w-full bg-[#C1A461] hover:bg-[#C1A461]/90 text-[#1B2228]"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Creating..." : "Create Profile"}
        </Button>
      </CardContent>
    </Card>
  )
}