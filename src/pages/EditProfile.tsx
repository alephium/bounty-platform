import { ChangeEvent, FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Upload, Github, Twitter, Linkedin, Globe, MessageCircle, Loader2 } from 'lucide-react'
import { User } from '../types/supabase'
import { UserService } from '../services/user.service'
import { useUser } from '../contexts/UserContext'
import { supabase } from '../lib/supabase'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { Textarea } from '../components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select'
import { Badge } from '../components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar'
import { Checkbox } from '../components/ui/checkbox'
import { useToast } from '../components/ui/use-toast'
import { Web3Interest, WorkExperience } from '../types/supabase'
import { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { getAllCountries } from '../constants/countries'
import { 
  SKILLS_BY_CATEGORY, 
  type SkillCategory, 
  type SkillOption 
} from '../constants/skills'


interface FormData {
  username: string
  firstName: string
  lastName: string
  bio: string
  walletAddress: string
  githubUrl: string
  twitterUrl: string
  linkedinUrl: string
  telegramUrl: string
  websiteUrl: string
  currentEmployer: string
  web3Interests: Web3Interest[]
  workExperience: WorkExperience
  location: string
}

interface FormErrors {
  [key: string]: string
}

interface SelectedSkills extends Record<SkillCategory, string[]> {}

const COUNTRIES = [
  // Europe
  { value: 'albania', label: 'Albania' },
  { value: 'andorra', label: 'Andorra' },
  { value: 'austria', label: 'Austria' },
  { value: 'belgium', label: 'Belgium' },
  { value: 'bulgaria', label: 'Bulgaria' },
  { value: 'croatia', label: 'Croatia' },
  { value: 'cyprus', label: 'Cyprus' },
  { value: 'czech-republic', label: 'Czech Republic' },
  { value: 'denmark', label: 'Denmark' },
  { value: 'estonia', label: 'Estonia' },
  { value: 'finland', label: 'Finland' },
  { value: 'france', label: 'France' },
  { value: 'germany', label: 'Germany' },
  { value: 'greece', label: 'Greece' },
  { value: 'hungary', label: 'Hungary' },
  { value: 'iceland', label: 'Iceland' },
  { value: 'ireland', label: 'Ireland' },
  { value: 'italy', label: 'Italy' },
  { value: 'latvia', label: 'Latvia' },
  { value: 'liechtenstein', label: 'Liechtenstein' },
  { value: 'lithuania', label: 'Lithuania' },
  { value: 'luxembourg', label: 'Luxembourg' },
  { value: 'malta', label: 'Malta' },
  { value: 'monaco', label: 'Monaco' },
  { value: 'netherlands', label: 'Netherlands' },
  { value: 'norway', label: 'Norway' },
  { value: 'poland', label: 'Poland' },
  { value: 'portugal', label: 'Portugal' },
  { value: 'romania', label: 'Romania' },
  { value: 'slovakia', label: 'Slovakia' },
  { value: 'slovenia', label: 'Slovenia' },
  { value: 'spain', label: 'Spain' },
  { value: 'sweden', label: 'Sweden' },
  { value: 'switzerland', label: 'Switzerland' },
  { value: 'united-kingdom', label: 'United Kingdom' },

  // Asia
  { value: 'afghanistan', label: 'Afghanistan' },
  { value: 'bangladesh', label: 'Bangladesh' },
  { value: 'bhutan', label: 'Bhutan' },
  { value: 'brunei', label: 'Brunei' },
  { value: 'cambodia', label: 'Cambodia' },
  { value: 'china', label: 'China' },
  { value: 'india', label: 'India' },
  { value: 'indonesia', label: 'Indonesia' },
  { value: 'japan', label: 'Japan' },
  { value: 'kazakhstan', label: 'Kazakhstan' },
  { value: 'korea-north', label: 'Korea, North' },
  { value: 'korea-south', label: 'Korea, South' },
  { value: 'kyrgyzstan', label: 'Kyrgyzstan' },
  { value: 'laos', label: 'Laos' },
  { value: 'malaysia', label: 'Malaysia' },
  { value: 'maldives', label: 'Maldives' },
  { value: 'mongolia', label: 'Mongolia' },
  { value: 'myanmar', label: 'Myanmar' },
  { value: 'nepal', label: 'Nepal' },
  { value: 'pakistan', label: 'Pakistan' },
  { value: 'philippines', label: 'Philippines' },
  { value: 'singapore', label: 'Singapore' },
  { value: 'sri-lanka', label: 'Sri Lanka' },
  { value: 'taiwan', label: 'Taiwan' },
  { value: 'tajikistan', label: 'Tajikistan' },
  { value: 'thailand', label: 'Thailand' },
  { value: 'timor-leste', label: 'Timor-Leste' },
  { value: 'turkmenistan', label: 'Turkmenistan' },
  { value: 'uzbekistan', label: 'Uzbekistan' },
  { value: 'vietnam', label: 'Vietnam' },

  // North America
  { value: 'canada', label: 'Canada' },
  { value: 'mexico', label: 'Mexico' },
  { value: 'united-states', label: 'United States' },
  { value: 'costa-rica', label: 'Costa Rica' },
  { value: 'cuba', label: 'Cuba' },
  { value: 'dominican-republic', label: 'Dominican Republic' },
  { value: 'el-salvador', label: 'El Salvador' },
  { value: 'guatemala', label: 'Guatemala' },
  { value: 'haiti', label: 'Haiti' },
  { value: 'honduras', label: 'Honduras' },
  { value: 'jamaica', label: 'Jamaica' },
  { value: 'nicaragua', label: 'Nicaragua' },
  { value: 'panama', label: 'Panama' },
  { value: 'trinidad-and-tobago', label: 'Trinidad and Tobago' },

  // South America
  { value: 'argentina', label: 'Argentina' },
  { value: 'bolivia', label: 'Bolivia' },
  { value: 'brazil', label: 'Brazil' },
  { value: 'chile', label: 'Chile' },
  { value: 'colombia', label: 'Colombia' },
  { value: 'ecuador', label: 'Ecuador' },
  { value: 'guyana', label: 'Guyana' },
  { value: 'paraguay', label: 'Paraguay' },
  { value: 'peru', label: 'Peru' },
  { value: 'suriname', label: 'Suriname' },
  { value: 'uruguay', label: 'Uruguay' },
  { value: 'venezuela', label: 'Venezuela' }
];

const WEB3_INTERESTS = ['DeFi', 'NFTs', 'DAOs', 'GameFi', 'Infrastructure'] as const

export const EditProfile = () => {
  const navigate = useNavigate()
  const { toast } = useToast()
  const { user, refreshUser } = useUser()
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<FormErrors>({})
  const [avatarFile, setAvatarFile] = useState<File | null>(null)
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null)
  const bgColor = 'bg-background'
  
  const [selectedSkills, setSelectedSkills] = useState<SelectedSkills>({
    frontend: user?.frontend_skills || [],
    backend: user?.backend_skills || [],
    blockchain: user?.blockchain_skills || [],
    design: user?.design_skills || [],
    content: user?.content_skills || []
  })

  const [formData, setFormData] = useState<FormData>({
    username: user?.username || '',
    firstName: user?.first_name || '',
    lastName: user?.last_name || '',
    bio: user?.bio || '',
    walletAddress: user?.wallet_address || '',
    githubUrl: user?.github_url || '',
    twitterUrl: user?.twitter_url || '',
    linkedinUrl: user?.linkedin_url || '',
    telegramUrl: user?.telegram_url || '',
    websiteUrl: user?.website_url || '',
    currentEmployer: user?.current_employer || '',
    web3Interests: user?.web3_interests || [],
    workExperience: user?.work_experience || '0-2',
    location: user?.location || '',
  })

  const validateField = (name: string, value: string): string => {
    switch (name) {
      case 'username':
        if (!value) return 'Username is required'
        if (!/^[a-zA-Z0-9_]{1,20}$/.test(value)) {
          return 'Username must be 1-20 characters and can only contain letters, numbers, and underscores'
        }
        break
    }
    return ''
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    const error = validateField(name, value)
    setErrors(prev => ({
      ...prev,
      [name]: error
    }))
  }

  const handleSelectChange = (name: string, value: string) => {
    if (name === 'web3Interests') {
      const values = value.split(',').filter(Boolean) as Web3Interest[]
      setFormData(prev => ({
        ...prev,
        [name]: values
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }))
    }
  }

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "Error",
          description: "File size must be less than 5MB",
          variant: "destructive"
        })
        return
      }
      setAvatarFile(file)
      setAvatarPreview(URL.createObjectURL(file))
    }
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!user?.id) return
  
    setIsLoading(true)
  
    try {
      // Check username availability if it changed
      if (formData.username !== user.username) {
        const isAvailable = await UserService.isUsernameAvailable(formData.username)
        if (!isAvailable) {
          toast({
            title: "Error",
            description: "Username is already taken",
            variant: "destructive"
          })
          setIsLoading(false) // Important: Reset loading state
          return
        }
      }

      if (formData.walletAddress !== user.wallet_address) {
        const isAvailable = await UserService.isWalletAddressAvailable(formData.walletAddress, user.id)
        if (!isAvailable) {
          toast({
            title: "Error",
            description: "Wallet address is already registered",
            variant: "destructive"
          })
          setIsLoading(false)
          return
        }
      }  
  
      let avatarUrl = user.avatar_url
      if (avatarFile) {
        avatarUrl = await uploadAvatar()
        // Add error check for avatar upload
        if (!avatarUrl) {
          setIsLoading(false)
          return
        }
      }
  
      // Validate required fields before update
      if (!formData.username || !formData.firstName || !formData.lastName || !formData.walletAddress) {
        toast({
          title: "Error",
          description: "Please fill in all required fields",
          variant: "destructive"
        })
        setIsLoading(false)
        return
      }
  
      const updates: Partial<User> = {
        username: formData.username,
        first_name: formData.firstName,
        last_name: formData.lastName,
        bio: formData.bio,
        wallet_address: formData.walletAddress,
        github_url: formData.githubUrl,
        twitter_url: formData.twitterUrl,
        linkedin_url: formData.linkedinUrl,
        telegram_url: formData.telegramUrl,
        website_url: formData.websiteUrl,
        current_employer: formData.currentEmployer,
        web3_interests: formData.web3Interests,
        work_experience: formData.workExperience,
        location: formData.location,
        frontend_skills: selectedSkills.frontend,
        backend_skills: selectedSkills.backend,
        blockchain_skills: selectedSkills.blockchain,
        design_skills: selectedSkills.design,
        content_skills: selectedSkills.content,
        avatar_url: avatarUrl || undefined,
        updated_at: new Date().toISOString()
      }
  
      console.log('Updating profile with:', updates) // Add logging
  
      const updatedUser = await UserService.updateProfile(user.id, updates)
      if (!updatedUser) {
        throw new Error('Failed to update profile: No response from server')
      }
  
      await refreshUser()
      
      toast({
        title: "Success",
        description: "Profile updated successfully"
      })
  
      // Optional: Navigate away after successful update
      navigate(`/profile/${updatedUser.username}`)
  
    } catch (error) {
      console.error('Error updating profile:', error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to update profile",
        variant: "destructive"
      })
    } finally {
      setIsLoading(false)
    }
  }

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    if (!file) return
  
    // Validate file type explicitly
    const validTypes = ['image/jpeg', 'image/png', 'image/gif']
    if (!validTypes.includes(file.type)) {
      toast({
        title: "Error",
        description: "Please upload a valid image file (JPG, PNG, or GIF)",
        variant: "destructive"
      })
      return
    }
  
    // Size check (5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "Error",
        description: "File size must be less than 5MB",
        variant: "destructive"
      })
      return
    }
  
    try {
      // Create a preview
      const preview = URL.createObjectURL(file)
      setAvatarPreview(preview)
      setAvatarFile(file)
    } catch (error) {
      console.error('Error handling file:', error)
      toast({
        title: "Error",
        description: "Failed to process image. Please try again.",
        variant: "destructive"
      })
    }
  }, [toast])
  
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png'],
      'image/gif': ['.gif']
    },
    maxFiles: 1,
    maxSize: 5 * 1024 * 1024, // 5MB in bytes
  })

  const uploadAvatar = async (): Promise<string | null> => {
    if (!avatarFile || !user) return null
    
    try {
      const fileExt = avatarFile.name.split('.').pop()?.toLowerCase() || 'jpg'
      const fileName = `${Date.now()}.${fileExt}`
      
      const { data, error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(fileName, avatarFile, {
          contentType: avatarFile.type,
          upsert: true
        })
        
      if (uploadError) {
        console.error('Upload error:', uploadError)
        throw uploadError
      }
  
      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(fileName)
      
      return publicUrl
      
    } catch (error) {
      console.error('Error uploading avatar:', error)
      toast({
        title: "Error",
        description: "Failed to upload avatar. Please try again.",
        variant: "destructive"
      })
      return null
    }
  }

  return (
    <form onSubmit={handleSubmit} className={`min-h-screen ${bgColor} w-full px-4`}>
      <div className="max-w-3xl mx-auto">
        <Card className="bg-white dark:bg-[#1B2228] border-amber-200 dark:border-[#C1A461]/20">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-[#C1A461]">Edit Profile</CardTitle>
          </CardHeader>
          <CardContent className="space-y-8">
            {/* Personal Info */}
            <section className="space-y-6">
              <h2 className="text-lg font-semibold text-[#C1A461]">PERSONAL INFO</h2>
              
              <div className="space-y-4">
                <Label>Profile Picture</Label>
                <div className="mt-2 flex items-center gap-4">
                  <Avatar className="w-24 h-24">
                    <AvatarImage src={avatarPreview || user?.avatar_url || "/placeholder.svg"} />
                    <AvatarFallback>{formData.username?.slice(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div 
                    {...getRootProps()} 
                    className={`flex-1 border-2 border-dashed rounded-lg p-4 text-center transition-colors
                      ${isDragActive 
                        ? 'border-[#C1A461] bg-[#C1A461]/10' 
                        : 'border-[#C1A461]/20'} 
                      hover:border-[#C1A461]/40 cursor-pointer`}
                  >
                    <input {...getInputProps()} />
                    <Button 
                      type="button" 
                      variant="outline"
                      className="border-[#C1A461]/20 text-[#C1A461] hover:bg-[#C1A461]/20"
                      onClick={(e) => e.preventDefault()}
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      {isDragActive 
                        ? 'Drop the image here'
                        : 'Choose or drag and drop image'
                      }
                    </Button>
                    <p className="text-sm text-[#C1A461]/60 mt-2">
                      Maximum size 5 MB - PNG, JPG, GIF
                    </p>
                    {avatarFile && (
                      <p className="text-sm text-[#C1A461] mt-2">
                        Selected: {avatarFile.name}
                      </p>
                    )}
                  </div>
                </div>

                {/* Username */}
                <div className="space-y-1">
                  <Label htmlFor="username">Username *</Label>
                  <Input 
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    className={`bg-white dark:bg-[#1B2228] border-amber-200 dark:border-[#C1A461]/20 
                      text-gray-900 dark:text-[#C1A461] ${errors.username ? 'border-red-500' : ''}`}
                    required
                  />
                  {errors.username && (
                    <p className="text-red-500 text-sm">{errors.username}</p>
                  )}
                </div>

                {/* First and Last Name */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input 
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className={`bg-white dark:bg-[#1B2228] border-amber-200 dark:border-[#C1A461]/20 
                        text-gray-900 dark:text-[#C1A461] ${errors.firstName ? 'border-red-500' : ''}`}
                      required
                    />
                    {errors.firstName && (
                      <p className="text-red-500 text-sm">{errors.firstName}</p>
                    )}
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input 
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className={`bg-white dark:bg-[#1B2228] border-amber-200 dark:border-[#C1A461]/20 
                        text-gray-900 dark:text-[#C1A461] ${errors.lastName ? 'border-red-500' : ''}`}
                      required
                    />
                    {errors.lastName && (
                      <p className="text-red-500 text-sm">{errors.lastName}</p>
                    )}
                  </div>
                </div>

                {/* Bio */}
                <div className="space-y-1">
                  <Label htmlFor="bio">Your One-Line Bio</Label>
                  <Textarea 
                    id="bio"
                    name="bio"
                    value={formData.bio}
                    onChange={handleInputChange}
                    className="bg-white dark:bg-[#1B2228] border-amber-200 dark:border-[#C1A461]/20 
                      text-gray-900 dark:text-[#C1A461]"
                  />
                </div>

                {/* Wallet Address */}
                <div className="space-y-1">
                  <Label htmlFor="walletAddress">Your Alephium Wallet Address</Label>
                  <Input 
                    id="walletAddress"
                    name="walletAddress"
                    value={formData.walletAddress}
                    onChange={handleInputChange}
                    className={`bg-white dark:bg-[#1B2228] border-amber-200 dark:border-[#C1A461]/20 
                      text-gray-900 dark:text-[#C1A461] ${errors.walletAddress ? 'border-red-500' : ''}`}
                    required
                  />
                  {errors.walletAddress && (
                    <p className="text-red-500 text-sm">{errors.walletAddress}</p>
                  )}
                </div>

                {/* Social Links */}
                <section className="space-y-6">
                  <h2 className="text-lg font-semibold text-[#C1A461]">SOCIALS</h2>
                  <div className="space-y-4">
                    {[
                      { icon: Github, name: "githubUrl", placeholder: "github.com/", value: formData.githubUrl },
                      { icon: Twitter, name: "twitterUrl", placeholder: "x.com/", value: formData.twitterUrl },
                      { icon: Linkedin, name: "linkedinUrl", placeholder: "linkedin.com/in/", value: formData.linkedinUrl },
                      { icon: MessageCircle, name: "telegramUrl", placeholder: "t.me/", value: formData.telegramUrl },
                      { icon: Globe, name: "websiteUrl", placeholder: "https://", value: formData.websiteUrl },
                    ].map((social) => (
                      <div key={social.name} className="space-y-1">
                        <div className="relative">
                          <social.icon className="w-5 h-5 absolute left-3 top-2.5 text-[#C1A461]/60" />
                          <Input 
                            name={social.name}
                            value={social.value}
                            onChange={handleInputChange}
                            className={`bg-white dark:bg-[#1B2228] border-amber-200 dark:border-[#C1A461]/20 
                              text-gray-900 dark:text-[#C1A461] pl-10 ${errors[social.name] ? 'border-red-500' : ''}`}
                            placeholder={social.placeholder}
                          />
                        </div>
                        {errors[social.name] && (
                          <p className="text-red-500 text-sm">{errors[social.name]}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </section>

                {/* Work Section */}
                <section className="space-y-6">
                  <h2 className="text-lg font-semibold text-[#C1A461]">WORK</h2>
                  <div className="space-y-4">
                    {/* Web3 Interests */}
                    <div>
                      <Label>What areas of Web3 are you most interested in?</Label>
                      <Select value={formData.web3Interests.join(',')} onValueChange={(value) => handleSelectChange('web3Interests', value)}>
                        <SelectTrigger className="bg-white dark:bg-[#1B2228] border-amber-200 dark:border-[#C1A461]/20 text-gray-900 dark:text-[#C1A461]">
                          <SelectValue placeholder="Select areas" />
                        </SelectTrigger>
                        <SelectContent className="bg-white dark:bg-[#1B2228] border-amber-200 dark:border-[#C1A461]/20">
                          {WEB3_INTERESTS.map((interest) => (
                            <SelectItem key={interest} value={interest}>{interest}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Work Experience */}
                    <div>
                      <Label>Work Experience</Label>
                      <Select value={formData.workExperience} onValueChange={(value) => handleSelectChange('workExperience', value)}>
                        <SelectTrigger className="bg-white dark:bg-[#1B2228] border-amber-200 dark:border-[#C1A461]/20 text-gray-900 dark:text-[#C1A461]">
                          <SelectValue placeholder="Select experience" />
                        </SelectTrigger>
                        <SelectContent className="bg-white dark:bg-[#1B2228] border-amber-200 dark:border-[#C1A461]/20">
                          <SelectItem value="0-1">0 to 1 Year</SelectItem>
                          <SelectItem value="2-5">2 to 5 Years</SelectItem>
                          <SelectItem value="5+">more than 5 Years</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Location */}
                    <div>
                      <Label>Location</Label>
                      <Select value={formData.location} onValueChange={(value) => handleSelectChange('location', value)}>
                        <SelectTrigger className="bg-white dark:bg-[#1B2228] border-amber-200 dark:border-[#C1A461]/20 text-gray-900 dark:text-[#C1A461]">
                          <SelectValue placeholder="Select location" />
                        </SelectTrigger>
                        <SelectContent className="bg-white dark:bg-[#1B2228] border-amber-200 dark:border-[#C1A461]/20 h-48 overflow-y-auto">
                          {getAllCountries().map((country) => (
                            <SelectItem key={country.value} value={country.value}>
                              {country.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Current Employer */}
                    <div>
                      <Label>Current Employer</Label>
                      <Input 
                        name="currentEmployer"
                        value={formData.currentEmployer}
                        onChange={handleInputChange}
                        className="bg-white dark:bg-[#1B2228] border-amber-200 dark:border-[#C1A461]/20 text-gray-900 dark:text-[#C1A461]"
                      />
                    </div>

                    {/* Skills */}
                    <div>
                      <Label className="flex items-center gap-2">
                        Skills
                        <span className="text-[#C1A461]/60 text-sm">
                          Select your skills to receive relevant opportunities
                        </span>
                      </Label>
                      <div className="space-y-4 mt-4">
                        {(Object.entries(SKILLS_BY_CATEGORY) as [SkillCategory, SkillOption[]][]).map(([category, options]) => (
                          <div key={category}>
                            <h3 className="text-sm font-medium text-[#C1A461] mb-2">
                              {category.charAt(0).toUpperCase() + category.slice(1)}
                            </h3>
                            <div className="flex flex-wrap gap-2">
                              {options.map((skill) => {
                                const isSelected = selectedSkills[category].includes(skill.value);
                                return (
                                  <Badge
                                    key={skill.value}
                                    variant="outline"
                                    className={`cursor-pointer border-[#C1A461]/20 hover:border-[#C1A461]/40
                                      ${isSelected ? 'bg-[#C1A461]/20' : ''}`}
                                    onClick={() => {
                                      setSelectedSkills(prev => ({
                                        ...prev,
                                        [category]: isSelected
                                          ? prev[category].filter(s => s !== skill.value)
                                          : [...prev[category], skill.value]
                                      }))
                                    }}
                                  >
                                    {skill.label}
                                  </Badge>
                                )
                              })}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </section>

                {/* Submit Button */}
                <Button 
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-[#C1A461] hover:bg-[#C1A461]/90 text-[#1B2228]"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Updating Profile
                    </>
                  ) : (
                    "Update Profile"
                  )}
                </Button>
              </div>
            </section>
          </CardContent>
        </Card>
      </div>
    </form>
  )
}