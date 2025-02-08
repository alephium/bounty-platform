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
  companyName: string
  websiteUrl: string
  twitterHandle: string
  logo: File | null
}

export function CreateSponsorProfile() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    companyName: "",
    websiteUrl: "",
    twitterHandle: "",
    logo: null
  })
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [dragActive, setDragActive] = useState(false)

  const handleLogoChange = (file: File) => {
    if (file) {
      // Validate file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "Error",
          description: "File size should be less than 5MB",
          variant: "destructive"
        })
        return
      }

      // Validate file type
      if (!file.type.startsWith('image/')) {
        toast({
          title: "Error",
          description: "Please upload an image file",
          variant: "destructive"
        })
        return
      }

      setFormData(prev => ({ ...prev, logo: file }))
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleLogoChange(e.dataTransfer.files[0])
    }
  }

  const removeImage = () => {
    setPreviewUrl(null)
    setFormData(prev => ({ ...prev, logo: null }))
  }

  const uploadLogo = async (file: File): Promise<string | null> => {
    try {
      const fileExt = file.name.split('.').pop()
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`
      const filePath = `sponsor-logos/${fileName}`

      const { error: uploadError } = await supabase.storage
        .from('public')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: true
        })

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

      // Validate form
      if (!formData.companyName.trim()) {
        toast({
          title: "Error",
          description: "Company name is required",
          variant: "destructive"
        })
        return
      }

      // Upload logo first if provided
      let logoUrl = null
      if (formData.logo) {
        logoUrl = await uploadLogo(formData.logo)
      }

      // Create sponsor
      const { data: sponsor, error } = await supabase
        .from('sponsors')
        .insert([{
          company_name: formData.companyName,
          website_url: formData.websiteUrl || null,
          twitter_handle: formData.twitterHandle || null,
          company_logo_url: logoUrl
        }])
        .select()
        .single()

      if (error) throw error

      toast({
        title: "Success",
        description: "Sponsor profile created successfully"
      })

      // Redirect to sponsor dashboard or profile
      navigate(`/sponsors/${sponsor.id}`)
    } catch (error) {
      console.error('Error creating sponsor:', error)
      toast({
        title: "Error",
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
        <CardTitle className="text-[#C1A461]">Create a sponsor profile</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Logo Upload Section */}
        <div className="space-y-2">
          <Label className="text-[#C1A461]">Company Logo</Label>
          <div 
            className={`relative h-48 border-2 border-dashed rounded-lg 
              ${dragActive ? 'border-[#C1A461] bg-[#C1A461]/10' : 'border-[#C1A461]/20'}
              transition-colors duration-200`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0]
                if (file) handleLogoChange(file)
              }}
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
                  onClick={removeImage}
                  className="absolute top-2 right-2 p-1 bg-red-500/80 hover:bg-red-500 rounded-full text-white"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-[#C1A461]/60">
                <ImagePlus className="h-10 w-10 mb-2" />
                <p className="text-sm">Drag and drop your logo here or click to browse</p>
                <p className="text-xs mt-1">PNG, JPG, GIF up to 5MB</p>
              </div>
            )}
          </div>
        </div>

        {/* Company Information */}
        <div className="space-y-4">
          <div className="space-y-2">
            <Label className="text-[#C1A461]">Company name</Label>
            <Input
              placeholder="Contribium"
              value={formData.companyName}
              onChange={(e) => setFormData(prev => ({ ...prev, companyName: e.target.value }))}
              className="bg-[#1B2228] border-[#C1A461]/20 text-[#C1A461] focus-visible:ring-[#C1A461]"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-[#C1A461]">Website URL</Label>
            <Input
              placeholder="https://contribium.com"
              value={formData.websiteUrl}
              onChange={(e) => setFormData(prev => ({ ...prev, websiteUrl: e.target.value }))}
              className="bg-[#1B2228] border-[#C1A461]/20 text-[#C1A461] focus-visible:ring-[#C1A461]"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-[#C1A461]">Twitter Handle</Label>
            <Input
              placeholder="@contribium"
              value={formData.twitterHandle}
              onChange={(e) => setFormData(prev => ({ ...prev, twitterHandle: e.target.value }))}
              className="bg-[#1B2228] border-[#C1A461]/20 text-[#C1A461] focus-visible:ring-[#C1A461]"
            />
          </div>
        </div>

        <Button 
          className="w-full bg-[#C1A461] hover:bg-[#C1A461]/90 text-[#1B2228]"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Creating Profile..." : "Create Profile"}
        </Button>
      </CardContent>
    </Card>
  )
}