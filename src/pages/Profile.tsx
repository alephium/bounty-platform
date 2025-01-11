import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Edit, Share, Plus, Twitter, Linkedin, Github, Globe } from 'lucide-react'
import { useTheme } from '../contexts/ThemeContext'
import { useUser } from '../contexts/UserContext'
import { supabase } from '../lib/supabase'
import type { Project } from '../types'

export default function Profile() {
  const navigate = useNavigate()
  const { theme } = useTheme()
  const { user } = useUser()
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Theme-based styling
  const bgColor = theme === 'dark' ? 'bg-[#1B2228]' : 'bg-white'
  const textColor = theme === 'dark' ? 'text-[#C1A461]' : 'text-gray-900'
  const borderColor = theme === 'dark' ? 'border-[#C1A461]/20' : 'border-amber-200'
  const mutedTextColor = theme === 'dark' ? 'text-[#C1A461]/60' : 'text-gray-600'
  const cardBg = theme === 'dark' ? 'bg-gray-800/50' : 'bg-white'

  // Fetch projects
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true)
        setError(null)

        if (!user?.id) {
          throw new Error('No user found')
        }

        // Fetch user's projects
        const { data: projectsData, error: projectsError } = await supabase
          .from('projects')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })

        if (projectsError) {
          console.error('Projects fetch error:', projectsError)
          throw new Error('Failed to fetch projects')
        }

        setProjects(projectsData || [])
      } catch (err) {
        console.error('Profile error:', err)
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }

    if (user) {
      fetchProjects()
    }
  }, [user])

  if (!user) {
    return (
      <div className={`min-h-screen ${bgColor} flex flex-col items-center justify-center gap-4`}>
        <div className="text-[#C1A461]">Please log in to view your profile</div>
        <Button 
          onClick={() => navigate('/auth')}
          className="bg-[#C1A461] hover:bg-[#C1A461]/90 text-[#1B2228]"
        >
          Login
        </Button>
      </div>
    )
  }

  if (loading) {
    return (
      <div className={`min-h-screen ${bgColor} flex items-center justify-center`}>
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#C1A461]"></div>
      </div>
    )
  }

  const handleShare = async () => {
    try {
      await navigator.share({
        title: `${user.full_name || user.username}'s Profile`,
        url: window.location.href
      })
    } catch (err) {
      // Fallback to copying to clipboard
      navigator.clipboard.writeText(window.location.href)
    }
  }

  return (
    <div className={`min-h-screen ${bgColor}`}>
      {/* Header with gradient */}
      <div className="h-48 bg-gradient-to-r from-blue-400 via-purple-500 to-blue-400" />
      
      <div className="max-w-4xl mx-auto px-4 -mt-24">
        <div className="space-y-6">
          {/* Profile Header */}
          <div className="flex justify-between items-start">
            <div className="flex items-end gap-4">
              <Avatar className="w-32 h-32 border-4 border-[#1B2228] rounded-full">
                <AvatarImage src={user.avatar_url || '/placeholder.svg'} alt={user.full_name || user.username} />
                <AvatarFallback className="text-2xl">
                  {user.first_name?.[0]}{user.last_name?.[0]}
                </AvatarFallback>
              </Avatar>
              <div className="mb-4">
                <h1 className={`text-2xl font-bold ${textColor}`}>
                  {user.full_name || user.username}
                </h1>
                <p className={mutedTextColor}>@{user.username}</p>
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              <Button 
                variant="outline" 
                className={`border-${borderColor} ${textColor} hover:bg-[#C1A461]/20`}
                onClick={() => navigate('/edit-profile')}
              >
                <Edit className="w-4 h-4 mr-2" />
                Edit Profile
              </Button>
              <Button 
                variant="outline" 
                className={`border-${borderColor} ${textColor} hover:bg-[#C1A461]/20`}
                onClick={handleShare}
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
                  {user.work_experience && (
                    <p>{user.work_experience} years of experience</p>
                  )}
                  {user.current_employer && (
                    <p>Works at {user.current_employer}</p>
                  )}
                  {user.location && (
                    <p>Based in {user.location}</p>
                  )}
                  {user.bio && (
                    <p>{user.bio}</p>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card className={`${cardBg} border-${borderColor}`}>
              <CardContent className="p-6">
                <h2 className={`text-lg font-bold ${textColor} mb-4`}>Skills</h2>
                <div className="space-y-4">
                  {user.frontend_skills?.length > 0 && (
                    <div>
                      <h3 className={`text-sm ${mutedTextColor} mb-2`}>FRONTEND</h3>
                      <div className="flex flex-wrap gap-2">
                        {user.frontend_skills.map((skill) => (
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
                  
                  {user.backend_skills?.length > 0 && (
                    <div>
                      <h3 className={`text-sm ${mutedTextColor} mb-2`}>BACKEND</h3>
                      <div className="flex flex-wrap gap-2">
                        {user.backend_skills.map((skill) => (
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
                  
                  {user.blockchain_skills?.length > 0 && (
                    <div>
                      <h3 className={`text-sm ${mutedTextColor} mb-2`}>BLOCKCHAIN</h3>
                      <div className="flex flex-wrap gap-2">
                        {user.blockchain_skills.map((skill) => (
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
                  {Object.entries(user.total_earnings || {}).map(([token, amount]) => (
                    <span key={token} className="mr-2">
                      {amount.toLocaleString()} {token}
                    </span>
                  ))}
                </p>
                <p className={`text-sm ${mutedTextColor}`}>Total Earned</p>
              </div>
              <div className="text-center">
                <p className={`text-xl font-bold ${textColor}`}>
                  {user.completed_projects_count || 0}
                </p>
                <p className={`text-sm ${mutedTextColor}`}>Projects Completed</p>
              </div>
              <div className="text-center">
                <p className={`text-xl font-bold ${textColor}`}>
                  {user.completed_bounties_count || 0}
                </p>
                <p className={`text-sm ${mutedTextColor}`}>Bounties Completed</p>
              </div>
            </div>
            <div className="flex gap-4">
              {user.twitter_url && (
                <Button 
                  variant="ghost" 
                  size="icon"
                  className={`${mutedTextColor} hover:${textColor} hover:bg-[#C1A461]/20`}
                  onClick={() => window.open(user.twitter_url, '_blank')}
                >
                  <Twitter className="w-5 h-5" />
                </Button>
              )}
              {user.linkedin_url && (
                <Button 
                  variant="ghost" 
                  size="icon"
                  className={`${mutedTextColor} hover:${textColor} hover:bg-[#C1A461]/20`}
                  onClick={() => window.open(user.linkedin_url, '_blank')}
                >
                  <Linkedin className="w-5 h-5" />
                </Button>
              )}
              {user.github_url && (
                <Button 
                  variant="ghost" 
                  size="icon"
                  className={`${mutedTextColor} hover:${textColor} hover:bg-[#C1A461]/20`}
                  onClick={() => window.open(user.github_url, '_blank')}
                >
                  <Github className="w-5 h-5" />
                </Button>
              )}
              {user.website_url && (
                <Button 
                  variant="ghost" 
                  size="icon"
                  className={`${mutedTextColor} hover:${textColor} hover:bg-[#C1A461]/20`}
                  onClick={() => window.open(user.website_url, '_blank')}
                >
                  <Globe className="w-5 h-5" />
                </Button>
              )}
            </div>
          </div>

          {/* Projects Section */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className={`text-lg font-bold ${textColor}`}>Projects</h2>
              <Button 
                variant="outline"
                className={`border-${borderColor} ${textColor} hover:bg-[#C1A461]/20`}
                onClick={() => navigate('/projects/new')}
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Project
              </Button>
            </div>

            <Tabs defaultValue="personal-projects" className="w-full">
              <TabsList className={`${bgColor} border-${borderColor} w-full justify-start rounded-none p-0 h-auto`}>
                <TabsTrigger
                  value="personal-projects"
                  className={`rounded-none border-b-2 border-transparent data-[state=active]:border-[#C1A461] 
                    data-[state=active]:bg-transparent ${mutedTextColor} data-[state=active]:${textColor} px-4 py-2`}
                >
                  Personal Projects
                </TabsTrigger>
              </TabsList>

              <TabsContent value="personal-projects" className="py-6">
                {projects.length > 0 ? (
                  <div className="grid gap-4 md:grid-cols-2">
                    {projects.map((project) => (
                      <Card key={project.id} className={`${cardBg} border-${borderColor}`}>
                        <CardContent className="p-4">
                          <h3 className={`font-medium ${textColor}`}>{project.title}</h3>
                          <p className={`mt-2 ${mutedTextColor}`}>{project.description}</p>
                          <div className="mt-4 flex items-center gap-2">
                            <Badge>{project.category}</Badge>
                            <Badge variant="outline">{project.status}</Badge>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center space-y-4">
                    <div className="w-20 h-20 bg-[#C1A461]/10 rounded-full flex items-center justify-center mx-auto">
                      <div className="w-8 h-8 bg-[#C1A461]/20 rounded" />
                    </div>
                    <h3 className={textColor}>No projects yet</h3>
                    <div className="flex flex-col gap-2 max-w-xs mx-auto">
                      <Button 
                        className="bg-[#C1A461] hover:bg-[#C1A461]/90 text-[#1B2228]"
                        onClick={() => navigate('/proofofwork')}
                      >
                        Add Project
                      </Button>
                    </div>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}