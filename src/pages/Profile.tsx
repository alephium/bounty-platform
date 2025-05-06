import { useEffect, useState } from 'react'
import { useNavigate, useParams, useLocation } from 'react-router-dom'
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Badge } from "../components/ui/badge"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../components/ui/tabs"
import { Input } from "../components/ui/input"
import PersonalProjectCard from "../components/PersonalProjectCard"
import { Edit, Share, Twitter, Linkedin, Github, Globe, X, Copy, Send, Plus, MessageSquare } from 'lucide-react'
import { useTheme } from '../contexts/ThemeContext'
import { useUser } from '../contexts/UserContext'
import { supabase } from '../lib/supabase'
import { Project, User, ProofOfWork, ProofOfWorkInsert, ProjectCategory } from '../types/supabase'
import { toast } from 'react-hot-toast'
import { Label } from "../components/ui/label"
import { Textarea } from "../components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select"
import { 
  SKILLS_BY_CATEGORY, 
  type SkillCategory, 
  type SkillOption 
} from '../constants/skills'

export default function Profile() {
  const navigate = useNavigate()
  const { username } = useParams()
  const { theme } = useTheme()
  const { user: currentUser } = useUser()
  const [profileUser, setProfileUser] = useState<User | null>(null)
  const [projects, setProjects] = useState<ProofOfWork[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isShareModalOpen, setIsShareModalOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const [isAddProjectModalOpen, setIsAddProjectModalOpen] = useState(false)
  const [description, setDescription] = useState("")
  const maxLength = 180
  const [selectedCategory, setSelectedCategory] = useState<SkillCategory | "">("")
  const [selectedSubSkill, setSelectedSubSkill] = useState("")
  const [projectTitle, setProjectTitle] = useState("")
  const [projectUrl, setProjectUrl] = useState("")
  const [formErrors, setFormErrors] = useState({
    title: false,
    description: false,
    category: false,
    subSkill: false,
    url: false
  })
  const location = useLocation();
  // const shareUrl = `${import.meta.env.VITE_APP_URL}${location.pathname}`;
  const shareUrl = `http://5173${location.pathname}`; //wait for deploy
  const [submissionsCount, setSubmissionsCount] = useState(0);
  const [submissionsLoading, setSubmissionsLoading] = useState(true);
  // console.log('user',currentUser, profileUser)
  // Theme-based styling
  const bgColor = theme === 'dark' ? 'bg-[#1B2228]' : 'bg-white'
  const textColor = theme === 'dark' ? 'text-[#C1A461]' : 'text-gray-900'
  const borderColor = theme === 'dark' ? 'border-[#C1A461]/20' : 'border-amber-200'
  const mutedTextColor = theme === 'dark' ? 'text-[#C1A461]/60' : 'text-gray-600'
  const cardBg = theme === 'dark' ? 'bg-gray-800/50' : 'bg-white'

  // Share functionality
  const getShareUrl = (platform: string) => {
    const text = `Check out ${profileUser?.full_name || profileUser?.username}'s profile!`;
    
    switch (platform) {
      case "twitter":
        return `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(shareUrl)}`;
      case "telegram":
        return `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(text)}`;
      case "whatsapp":
        return `https://wa.me/?text=${encodeURIComponent(`${text} ${shareUrl}`)}`;
      default:
        return '';
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      toast.success("Copied to clipboard!")
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      toast.error("Failed to copy")
    }
  }

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        setLoading(true)
        setError(null)

        if (!username && currentUser) {
          setProfileUser(currentUser)
          navigate(`/profile/${currentUser.username}`, { replace: true })
          setLoading(false)
          return
        }
  
        const usernameToFetch = username || currentUser?.username
  
        if (!usernameToFetch) {
          throw new Error('No username provided')
        }
  
        const { data: userData, error: userError } = await supabase
          .from('users')
          .select('*')
          .eq('username', usernameToFetch)
          .single()
  
        if (userError) throw userError
  
        if (!userData) {
          throw new Error('User not found')
        }
  
        setProfileUser(userData)
  
        // Fetch projects after setting user
        const { data: projectsData, error: projectsError } = await supabase
          .from('proof_of_work')
          .select('*')
          .eq('user_id', userData.id)
          .order('created_at', { ascending: false })
  
        if (projectsError) throw projectsError
        setProjects(projectsData || [])
  
      } catch (err: any) {
        console.error('Profile error:', err)
        setError(err.message || 'An error occurred')
      } finally {
        setLoading(false)
      }
    }
  
    fetchProfileData()
  }, [username, currentUser, navigate])

  // Add this as a separate useEffect - don't modify your existing one
  useEffect(() => {
    const fetchSubmissionsCount = async () => {
      if (!profileUser?.id) return;
      
      try {
        setSubmissionsLoading(true);
        
        // Fetch bounty submissions count
        const { count: bountyCount, error: bountyError } = await supabase
          .from('bounty_submissions')
          .select('id', { count: 'exact', head: true })
          .eq('user_id', profileUser.id);
          
        if (bountyError) throw bountyError;
        
        setSubmissionsCount(bountyCount || 0);
      } catch (error) {
        console.error('Error fetching submissions count:', error);
      } finally {
        setSubmissionsLoading(false);
      }
    };
    
    fetchSubmissionsCount();
  }, [profileUser]);

  if (error || !profileUser) {
    return (
      <div className={`min-h-screen ${bgColor} flex flex-col items-center justify-center gap-4`}>
        <div className="text-[#C1A461]">{error || 'Profile not found'}</div>
        <Button 
          onClick={() => navigate('/')}
          className="bg-[#C1A461] hover:bg-[#C1A461]/90 text-[#1B2228]"
        >
          Go Home
        </Button>
      </div>
    )
  }

  const isOwnProfile = currentUser?.id === profileUser.id
  return (
    <>
      <div className={`min-h-screen ${bgColor}`}>
        {/* Header with gradient */}
        <div className="h-48 bg-gradient-to-r from-blue-400 via-purple-500 to-blue-400" />
          <div className="max-w-4xl mx-auto px-4 -mt-24">
            <div className="space-y-6">
              {/* Profile Header */}
              <div className="flex justify-between items-start">
              <div className="flex items-end gap-4">
                <Avatar className="w-32 h-32 border-4 border-[#1B2228] rounded-full">
                  <AvatarImage src={profileUser.avatar_url || '/placeholder.svg'} />
                  <AvatarFallback className="text-2xl">
                    {profileUser.first_name?.[0]}{profileUser.last_name?.[0]}
                  </AvatarFallback>
                </Avatar>
                
                <div className="mb-4">
                  <h1 className={`text-2xl font-bold ${textColor}`}>
                    {profileUser.full_name || profileUser.username}
                  </h1>
                  <p className={mutedTextColor}>@{profileUser.username}</p>
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                {isOwnProfile && (
                  <Button 
                    variant="outline" 
                    className={`border-${borderColor} ${textColor} hover:bg-[#C1A461]/20`}
                    onClick={() => navigate('/editprofile')}
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Profile
                  </Button>
                )}
                <Button 
                  variant="outline" 
                  className={`border-${borderColor} ${textColor} hover:bg-[#C1A461]/20`}
                  onClick={() => setIsShareModalOpen(true)}
                >
                  <Share className="w-4 h-4 mr-2" />
                  Share
                </Button>
              </div>
            </div>


              {/* Details and Skills */}
              <div className="grid md:grid-cols-2 gap-6">
                <Card className={`${cardBg} border-${borderColor}`}>
                  <CardContent className="p-6">
                    <h2 className={`text-lg font-bold ${textColor} mb-4`}>Details</h2>
                    <div className={`space-y-3 ${mutedTextColor}`}>
                      {profileUser.work_experience && (
                        <p>{profileUser.work_experience} years of experience</p>
                      )}
                      {profileUser.current_employer && (
                        <p>Works at {profileUser.current_employer}</p>
                      )}
                      {profileUser.location && (
                        <p>Based in {profileUser.location}</p>
                      )}
                      {profileUser.bio && (
                        <p>{profileUser.bio}</p>
                      )}
                    </div>
                  </CardContent>
                </Card>

                <Card className={`${cardBg} border-${borderColor}`}>
                  <CardContent className="p-6">
                    <h2 className={`text-lg font-bold ${textColor} mb-4`}>Skills</h2>
                    <div className="space-y-4">
                      {(profileUser?.frontend_skills || []).length > 0 && (
                        <div>
                          <h3 className={`text-sm ${mutedTextColor} mb-2`}>FRONTEND</h3>
                          <div className="flex flex-wrap gap-2">
                            {(profileUser.frontend_skills??[]).map((skill) => (
                              <Badge 
                                key={skill}
                                className="bg-[#C1A461]/20 text-[#C1A461] hover:bg-[#C1A461]/30"
                              >
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {(profileUser.backend_skills || []).length > 0 && (
                        <div>
                          <h3 className={`text-sm ${mutedTextColor} mb-2`}>BACKEND</h3>
                          <div className="flex flex-wrap gap-2">
                            {(profileUser.backend_skills??[]).map((skill) => (
                              <Badge 
                                key={skill}
                                className="bg-[#C1A461]/20 text-[#C1A461] hover:bg-[#C1A461]/30"
                              >
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {(profileUser.blockchain_skills|| []).length > 0 && (
                        <div>
                          <h3 className={`text-sm ${mutedTextColor} mb-2`}>BLOCKCHAIN</h3>
                          <div className="flex flex-wrap gap-2">
                            {(profileUser.blockchain_skills?? []).map((skill) => (
                              <Badge 
                                key={skill}
                                className="bg-[#C1A461]/20 text-[#C1A461] hover:bg-[#C1A461]/30"
                              >
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}

                      {(profileUser.design_skills || []).length > 0 && (
                        <div>
                          <h3 className={`text-sm ${mutedTextColor} mb-2`}>DESIGN</h3>
                          <div className="flex flex-wrap gap-2">
                            {(profileUser.design_skills ?? []).map((skill) => (
                              <Badge 
                                key={skill}
                                className="bg-[#C1A461]/20 text-[#C1A461] hover:bg-[#C1A461]/30"
                              >
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}

                      {(profileUser.content_skills || []).length > 0 && (
                        <div>
                          <h3 className={`text-sm ${mutedTextColor} mb-2`}>CONTENT</h3>
                          <div className="flex flex-wrap gap-2">
                            {(profileUser.content_skills ?? []).map((skill) => (
                              <Badge 
                                key={skill}
                                className="bg-[#C1A461]/20 text-[#C1A461] hover:bg-[#C1A461]/30"
                              >
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Achievements Section */}
              <div className={`flex flex-wrap items-center justify-between gap-4 py-4 border-y border-${borderColor}`}>
                <div className="flex gap-8">
                  <div className="text-center">
                    <p className={`text-xl font-bold ${textColor}`}>
                      {Object.entries(profileUser.total_earnings || {}).map(([token, amount]) => (
                        <span key={token} className="mr-2">
                          {amount.toLocaleString()} {token}
                        </span>
                      ))}
                    </p>
                    <p className={`text-sm ${mutedTextColor}`}>Total Reward</p>
                  </div>
                  {/* <div className="text-center">
                    <p className={`text-xl font-bold ${textColor}`}>
                      {profileUser.completed_bounties_count || 0}
                    </p>
                    <p className={`text-sm ${mutedTextColor}`}>Bounties Completed</p>
                  </div> */}
                  <div className="text-center">
                    <p className={`text-xl font-bold ${textColor}`}>
                      {submissionsLoading ? '...' : submissionsCount}
                    </p>
                    <p className={`text-sm ${mutedTextColor}`}>Bounties Completed</p>
                  </div>
                  <div className="text-center">
                    <p className={`text-xl font-bold ${textColor}`}>
                      {profileUser.completed_projects_count || 0}
                    </p>
                    <p className={`text-sm ${mutedTextColor}`}>Projects Completed</p>
                  </div>
                  <div className="text-center">
                    <p className={`text-xl font-bold ${textColor}`}>
                      {profileUser.completed_grants_count || 0}
                    </p>
                    <p className={`text-sm ${mutedTextColor}`}>Grant Completed</p>
                  </div>
                  {isOwnProfile && (
                    <Button 
                      className="bg-[#C1A461] hover:bg-[#C1A461]/90 text-[#1B2228] flex items-center gap-2"
                      onClick={() => navigate('/mysubmission')}
                    >
                      <MessageSquare className="w-4 h-4" />
                      View My Submissions
                    </Button>
                  )}
                </div>
                <div className="flex gap-4">
                  {profileUser.twitter_url && (
                    <a
                      href={profileUser.twitter_url || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${mutedTextColor} hover:${textColor} hover:bg-[#C1A461]/20`}
                    >
                      <Button variant="ghost" size="icon">
                        <Twitter className="w-5 h-5" />
                      </Button>
                    </a>
                  )}
                  {profileUser.linkedin_url && (
                    <a
                      href={profileUser.linkedin_url || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${mutedTextColor} hover:${textColor} hover:bg-[#C1A461]/20`}
                    >
                      <Button variant="ghost" size="icon">
                        <Linkedin className="w-5 h-5" />
                      </Button>
                    </a>
                  )}
                  {profileUser.github_url && (
                    <a
                      href={profileUser.github_url || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${mutedTextColor} hover:${textColor} hover:bg-[#C1A461]/20`}
                    >
                      <Button variant="ghost" size="icon">
                        <Github className="w-5 h-5" />
                      </Button>
                    </a>
                  )}
                  {profileUser.website_url && (
                    <a
                      href={profileUser.website_url || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${mutedTextColor} hover:${textColor} hover:bg-[#C1A461]/20`}
                    >
                      <Button variant="ghost" size="icon">
                        <Globe className="w-5 h-5" />
                      </Button>
                    </a>
                  )}
                </div>
              </div>

              <div className="space-y-6">
                <Tabs defaultValue="personal-projects" className="w-full">
                  <div className="flex justify-between items-center">
                    <TabsList className={`${bgColor} border-${borderColor} justify-start rounded-none p-0 h-auto`}>
                      <TabsTrigger
                        value="personal-projects"
                        className={`rounded-none border-b-2 border-transparent data-[state=active]:border-[#C1A461] 
                          data-[state=active]:bg-transparent ${mutedTextColor} data-[state=active]:${textColor} px-4 py-2`}
                      >
                        Personal Projects
                      </TabsTrigger>
                    </TabsList>
                    
                    <Button 
                      className="bg-[#C1A461] hover:bg-[#C1A461]/90 text-[#1B2228] flex items-center gap-2"
                      onClick={() => setIsAddProjectModalOpen(true)}
                    >
                      <Plus className="w-4 h-4" />
                      Add Project
                    </Button>
                  </div>

                  <TabsContent value="personal-projects" className="py-6">
                    {projects.length > 0 ? (
                      <div className="grid gap-4 md:grid-cols-2">
                        {projects.map((project) => (
                          <PersonalProjectCard
                            key={project.id}
                            project={project}
                            isOwner={currentUser?.id === project.user_id}
                            onUpdate={(updatedProject) => {
                              setProjects(prev => 
                                prev.map(p => p.id === updatedProject.id ? 
                                  { ...updatedProject, 
                                    category: updatedProject.category as ProjectCategory,
                                    project_url: updatedProject.project_url || '' 
                                  } 
                                  : p
                                )
                              )
                            }}
                            onDelete={(id) => {
                              setProjects(prev => prev.filter(p => p.id !== id))
                            }}
                          />
                        ))}
                      </div>
                    ) : (
                      <div className="text-center space-y-4">
                        <div className="w-20 h-20 bg-[#C1A461]/10 rounded-full flex items-center justify-center mx-auto">
                          <div className="w-8 h-8 bg-[#C1A461]/20 rounded" />
                        </div>
                        <h3 className={textColor}>No projects yet</h3>
                      </div>
                    )}
                  </TabsContent>
                </Tabs>
              </div>

              {isAddProjectModalOpen && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
                <Card className="w-full max-w-2xl bg-[#1B2228] border-[#C1A461]/20">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="text-[#C1A461] text-2xl font-semibold">Add Project</CardTitle>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-[#C1A461]/60 hover:text-[#C1A461] hover:bg-[#C1A461]/10"
                      onClick={() => setIsAddProjectModalOpen(false)}
                    >
                      <X className="h-5 w-5" />
                    </Button>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label className="text-[#C1A461]">
                        Project Title <span className="text-red-500">*</span>
                      </Label>
                      <Input 
                        placeholder="Project Title"
                        value={projectTitle}
                        onChange={(e) => setProjectTitle(e.target.value)}
                        className="bg-[#1B2228] border-[#C1A461]/20 text-[#C1A461] focus-visible:ring-[#C1A461] placeholder:text-[#C1A461]/40"
                      />
                    </div>


                    <div className="space-y-2">
                      <Label className="text-[#C1A461]">
                        Description <span className="text-red-500">*</span>
                      </Label>
                      <div className="relative">
                        <Textarea
                          placeholder="Project Description"
                          className="bg-[#1B2228] border-[#C1A461]/20 text-[#C1A461] focus-visible:ring-[#C1A461] placeholder:text-[#C1A461]/40 min-h-[120px]"
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          maxLength={maxLength}
                        />
                        <span className="absolute bottom-2 right-2 text-sm text-[#C1A461]/60">
                          {maxLength - description.length} characters left
                        </span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-[#C1A461]">
                        Skills <span className="text-red-500">*</span>
                      </Label>
                      {/* <Select onValueChange={setSelectedCategory} value={selectedCategory}> */}
                      <Select 
                        onValueChange={(value) => setSelectedCategory(value as SkillCategory | "")} 
                        value={selectedCategory}
                      >
                        <SelectTrigger className="bg-[#1B2228] border-[#C1A461]/20 text-[#C1A461] focus:ring-[#C1A461]">
                          <SelectValue placeholder="Select..." />
                        </SelectTrigger>
                        <SelectContent className="bg-[#1B2228] border-[#C1A461]/20">
                          <SelectItem value="frontend">Frontend Development</SelectItem>
                          <SelectItem value="backend">Backend Development</SelectItem>
                          <SelectItem value="blockchain">Blockchain Development</SelectItem>
                          <SelectItem value="design">Design</SelectItem>
                          <SelectItem value="content">Content</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-[#C1A461]">
                        Sub Skills <span className="text-red-500">*</span>
                      </Label>
                      <Select 
                        onValueChange={setSelectedSubSkill} 
                        value={selectedSubSkill}
                        disabled={!selectedCategory}
                      >
                        <SelectTrigger className="bg-[#1B2228] border-[#C1A461]/20 text-[#C1A461] focus:ring-[#C1A461]">
                          <SelectValue placeholder={selectedCategory ? "Select sub-skill..." : "Select a skill first"} />
                        </SelectTrigger>
                        <SelectContent className="bg-[#1B2228] border-[#C1A461]/20">
                          {selectedCategory && SKILLS_BY_CATEGORY[selectedCategory].map(skill => (
                            <SelectItem key={skill.value} value={skill.value}>
                              {skill.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-[#C1A461]">
                        Link <span className="text-red-500">*</span>
                      </Label>
                      <Input 
                        placeholder="https://example.com"
                        value={projectUrl}
                        onChange={(e) => setProjectUrl(e.target.value)}
                        className="bg-[#1B2228] border-[#C1A461]/20 text-[#C1A461] focus-visible:ring-[#C1A461] placeholder:text-[#C1A461]/40"
                      />
                    </div>

                    <Button 
                      className="w-full bg-[#C1A461] hover:bg-[#C1A461]/90 text-[#1B2228]"
                      onClick={async () => {
                        // Validate all fields
                        if (!projectTitle || !description || !selectedCategory || !selectedSubSkill || !projectUrl) {
                          toast.error("Please fill in all required fields")
                          return
                        }

                        // Validate URL
                        try {
                          new URL(projectUrl)
                        } catch {
                          toast.error("Please enter a valid URL")
                          return
                        }

                        try {
                          const newProof: ProofOfWorkInsert = {
                            user_id: currentUser?.id ?? '',
                            title: projectTitle,
                            description: description,
                            category: selectedCategory as ProjectCategory,
                            skills: [selectedSubSkill], // Array of skill IDs
                            project_url: projectUrl,
                          }

                          // Insert into Supabase
                          const { error } = await supabase
                            .from('proof_of_work')
                            .insert([newProof])

                          if (error) throw error

                          // Refresh the projects list
                          const { data: updatedProofs } = await supabase
                            .from('proof_of_work')
                            .select('*')
                            .eq('user_id', currentUser?.id)
                            .order('created_at', { ascending: false })

                          if (updatedProofs) {
                            setProjects(updatedProofs)
                          }

                          toast.success("Project added successfully!")
                          setIsAddProjectModalOpen(false)
                          
                          // Reset form
                          setProjectTitle("")
                          setDescription("")
                          setSelectedCategory("")
                          setSelectedSubSkill("")
                          setProjectUrl("")

                        } catch (error) {
                          console.error('Error adding project:', error)
                          toast.error("Failed to add project")
                        }
                      }}
                    >
                      Add Project
                    </Button>
                  </CardContent>
                </Card>
              </div>
              )}
            </div>
          </div>
      </div>
      {isShareModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-lg bg-[#1B2228] border-[#C1A461]/20">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-[#C1A461] text-2xl font-semibold">Share Profile</CardTitle>
              <Button
                variant="ghost"
                size="icon"
                className="text-[#C1A461]/60 hover:text-[#C1A461] hover:bg-[#C1A461]/10"
                onClick={() => setIsShareModalOpen(false)}
              >
                <X className="h-5 w-5" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-[#C1A461]/60 text-lg">
                Share your profile with friends or on social media to showcase your proof of work, all in one place
              </p>

              <div className="flex gap-2">
                <Input
                  readOnly
                  value={shareUrl}
                  className="bg-[#1B2228] border-[#C1A461]/20 text-[#C1A461] focus-visible:ring-[#C1A461]"
                />
                <Button
                  variant="outline"
                  className="border-[#C1A461]/20 text-[#C1A461] hover:bg-[#C1A461]/10"
                  onClick={handleCopy}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>

              <div className="space-y-3">
                <h3 className="text-[#C1A461]/60 uppercase text-sm font-medium">Share to</h3>
                <div className="flex gap-4">
                  <a
                    href={getShareUrl("twitter")}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="ghost" size="icon">
                      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                      </svg>
                    </Button>
                  </a>
                  <a
                    href={getShareUrl("telegram")}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="ghost" size="icon">
                      <Send className="w-5 h-5" />
                    </Button>
                  </a>
                  <a
                    href={getShareUrl("whatsapp")}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="ghost" size="icon">
                      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                      </svg>
                    </Button>
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  )
}