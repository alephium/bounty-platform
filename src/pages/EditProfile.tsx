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
import { useTheme } from '../contexts/ThemeContext'
import { Web3Interest, WorkExperience } from '../types/supabase'

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

type SkillCategory = 'frontend' | 'backend' | 'blockchain' | 'design' | 'content'

interface SkillOption {
  value: string
  label: string
}

const skillOptions: Record<SkillCategory, SkillOption[]> = {
  frontend: [
    { value: "react", label: "React" },
    { value: "vue", label: "Vue.js" },
    { value: "angular", label: "Angular" },
    { value: "nextjs", label: "Next.js" },
    { value: "typescript", label: "TypeScript" },
    { value: "html", label: "HTML5" },
    { value: "css", label: "CSS3" },
    { value: "tailwind", label: "Tailwind CSS" },
    { value: "sass", label: "Sass/SCSS" },
    { value: "mui", label: "Material UI" }
  ],
  backend: [
    { value: "nodejs", label: "Node.js" },
    { value: "python", label: "Python" },
    { value: "java", label: "Java" },
    { value: "csharp", label: "C#" },
    { value: "golang", label: "Go" },
    { value: "ruby", label: "Ruby" },
    { value: "php", label: "PHP" },
    { value: "postgresql", label: "PostgreSQL" },
    { value: "mongodb", label: "MongoDB" },
    { value: "mysql", label: "MySQL" },
    { value: "redis", label: "Redis" },
    { value: "docker", label: "Docker" }
  ],
  blockchain: [
    { value: "solidity", label: "Solidity" },
    { value: "rust", label: "Rust" },
    { value: "ralph", label: "Ralph" },
    { value: "web3js", label: "Web3.js" },
    { value: "ethersjs", label: "Ethers.js" },
    { value: "hardhat", label: "Hardhat" },
    { value: "truffle", label: "Truffle" },
    { value: "defi", label: "DeFi Development" },
    { value: "nft", label: "NFT Development" },
    { value: "smartcontracts", label: "Smart Contracts" },
    { value: "ipfs", label: "IPFS" }
  ],
  design: [
    { value: "figma", label: "Figma" },
    { value: "sketch", label: "Sketch" },
    { value: "adobe_xd", label: "Adobe XD" },
    { value: "photoshop", label: "Photoshop" },
    { value: "illustrator", label: "Illustrator" },
    { value: "ui_design", label: "UI Design" },
    { value: "ux_design", label: "UX Design" },
    { value: "motion", label: "Motion Design" },
    { value: "3d", label: "3D Design" }
  ],
  content: [
    { value: "writing", label: "Content Writing" },
    { value: "editing", label: "Content Editing" },
    { value: "seo", label: "SEO Writing" },
    { value: "technical", label: "Technical Writing" },
    { value: "copywriting", label: "Copywriting" },
    { value: "social", label: "Social Media" },
    { value: "research", label: "Research" },
    { value: "storytelling", label: "Storytelling" }
  ]
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
  const { theme } = useTheme()
  const { toast } = useToast()
  const { user, refreshUser } = useUser()
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<FormErrors>({})
  const [avatarFile, setAvatarFile] = useState<File | null>(null)
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null)
  const bgColor = theme === 'dark' ? 'bg-[#1B2228]' : 'bg-white'
  
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
      case 'walletAddress':
        if (!value) return 'Wallet address is required'
        break
      case 'firstName':
        if (!value) return 'First name is required'
        break
      case 'lastName':
        if (!value) return 'Last name is required'
        break
      // URL validations
      case 'githubUrl':
      case 'twitterUrl':
      case 'linkedinUrl':
      case 'websiteUrl':
        if (value && !/^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/.test(value)) {
          return 'Invalid URL format'
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

  const uploadAvatar = async (): Promise<string | null> => {
    if (!avatarFile || !user) return null
    
    const fileExt = avatarFile.name.split('.').pop()
    const fileName = `${user.id}-${Date.now()}.${fileExt}`
    
    const { data, error } = await supabase.storage
      .from('avatars')
      .upload(fileName, avatarFile)
      
    if (error) throw error
    
    const { data: { publicUrl } } = supabase.storage
      .from('avatars')
      .getPublicUrl(fileName)
      
    return publicUrl
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
          return
        }
      }

      let avatarUrl = user.avatar_url
      if (avatarFile) {
        avatarUrl = await uploadAvatar()
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

      const updatedUser = await UserService.updateProfile(user.id, updates)
      if (!updatedUser) throw new Error('Failed to update profile')

      await refreshUser()
      
      toast({
        title: "Success",
        description: "Profile updated successfully"
      })
    } catch (error) {
      console.error('Error updating profile:', error)
      toast({
        title: "Error",
        description: "Failed to update profile",
        variant: "destructive"
      })
    } finally {
      setIsLoading(false)
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
                {/* Profile Picture */}
                <div>
                  <Label>Profile Picture</Label>
                  <div className="mt-2 flex items-center gap-4">
                    <Avatar className="w-24 h-24">
                      <AvatarImage src={avatarPreview || user?.avatar_url || "/placeholder.svg"} />
                      <AvatarFallback>{formData.username?.slice(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 border-2 border-dashed border-[#C1A461]/20 rounded-lg p-4 text-center">
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                        id="avatar-upload"
                      />
                      <Label htmlFor="avatar-upload" className="cursor-pointer">
                        <Button 
                          type="button" 
                          variant="outline"
                          className="border-[#C1A461]/20 text-[#C1A461] hover:bg-[#C1A461]/20"
                        >
                          <Upload className="w-4 h-4 mr-2" />
                          Choose or drag and drop media
                        </Button>
                      </Label>
                      <p className="text-sm text-[#C1A461]/60 mt-2">Maximum size 5 MB</p>
                    </div>
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
                    <Label htmlFor="firstName">First Name *</Label>
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
                    <Label htmlFor="lastName">Last Name *</Label>
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
                  <Label htmlFor="walletAddress">Your Alephium Wallet Address *</Label>
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
                          {COUNTRIES.map((country) => (
                            <SelectItem key={country.value} value={country.value}>{country.label}</SelectItem>
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
                        {(Object.entries(skillOptions) as [SkillCategory, SkillOption[]][]).map(([category, options]) => (
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