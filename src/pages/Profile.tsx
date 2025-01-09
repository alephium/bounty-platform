import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Edit, Share, Plus, Twitter, Linkedin, Github, Globe } from 'lucide-react'
import { useTheme } from '../contexts/ThemeContext'

export default function Profile() {
  const { theme } = useTheme()
  const bgColor = theme === 'dark' ? 'bg-[#1B2228]' : 'bg-white'
  const textColor = theme === 'dark' ? 'text-[#C1A461]' : 'text-gray-900'
  const borderColor = theme === 'dark' ? 'border-[#C1A461]/20' : 'border-amber-200'
  const mutedTextColor = theme === 'dark' ? 'text-[#C1A461]/60' : 'text-gray-600'
  const cardBg = theme === 'dark' ? 'bg-gray-800/50' : 'bg-white'

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
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback className="text-2xl">YL</AvatarFallback>
              </Avatar>
              <div className="mb-4">
                <h1 className="text-2xl font-bold text-[#C1A461]">Yuanying Li</h1>
                <p className="text-[#C1A461]/60">@yy</p>
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              <Button 
                variant="outline" 
                className="border-[#C1A461]/20 text-[#C1A461] hover:bg-[#C1A461]/20"
              >
                <Edit className="w-4 h-4 mr-2" />
                Edit Profile
              </Button>
              <Button 
                variant="outline" 
                className="border-[#C1A461]/20 text-[#C1A461] hover:bg-[#C1A461]/20"
              >
                <Share className="w-4 h-4 mr-2" />
                Share
              </Button>
            </div>
          </div>

          {/* Details and Skills */}
          <div className="grid md:grid-cols-2 gap-6">
          <Card className={`${cardBg} ${borderColor}`}>
              <CardContent className="p-6">
                <h2 className="text-lg font-bold text-[#C1A461] mb-4">Details</h2>
                <div className="space-y-3 text-[#C1A461]/60">
                  <p>Looking for Freelance Opportunities</p>
                  <p>Works at _Navi</p>
                  <p>Based in Germany</p>
                </div>
              </CardContent>
            </Card>

            <Card className={`${cardBg} ${borderColor}`}>
              <CardContent className="p-6">
                <h2 className="text-lg font-bold text-[#C1A461] mb-4">Skills</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm text-[#C1A461]/60 mb-2">FRONTEND</h3>
                    <div className="flex flex-wrap gap-2">
                      <Badge className="bg-[#C1A461]/20 text-[#C1A461] hover:bg-[#C1A461]/30">
                        React
                      </Badge>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm text-[#C1A461]/60 mb-2">BACKEND</h3>
                    <div className="flex flex-wrap gap-2">
                      {["Javascript", "Python", "C++"].map((skill) => (
                        <Badge 
                          key={skill}
                          className="bg-[#C1A461]/20 text-[#C1A461] hover:bg-[#C1A461]/30"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm text-[#C1A461]/60 mb-2">BLOCKCHAIN</h3>
                    <div className="flex flex-wrap gap-2">
                      {["Rust", "Solidity"].map((skill) => (
                        <Badge 
                          key={skill}
                          className="bg-[#C1A461]/20 text-[#C1A461] hover:bg-[#C1A461]/30"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Social Links and Stats */}
          <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-y border-[#C1A461]/20">
            <div className="flex gap-4">
              {[Twitter, Linkedin, Github, Globe].map((Icon, i) => (
                <Button 
                  key={i}
                  variant="ghost" 
                  size="icon"
                  className="text-[#C1A461]/60 hover:text-[#C1A461] hover:bg-[#C1A461]/20"
                >
                  <Icon className="w-5 h-5" />
                </Button>
              ))}
            </div>
            <div className="flex gap-6">
              <div className="text-center">
                <p className="text-xl font-bold text-[#C1A461]">$0</p>
                <p className="text-sm text-[#C1A461]/60">Earned</p>
              </div>
              <div className="text-center">
                <p className="text-xl font-bold text-[#C1A461]">0</p>
                <p className="text-sm text-[#C1A461]/60">Submissions</p>
              </div>
              <div className="text-center">
                <p className="text-xl font-bold text-[#C1A461]">0</p>
                <p className="text-sm text-[#C1A461]/60">Won</p>
              </div>
            </div>
          </div>

          {/* Proof of Work */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-[#C1A461]">Proof of Work</h2>
              <Button 
                variant="outline"
                className="border-[#C1A461]/20 text-[#C1A461] hover:bg-[#C1A461]/20"
              >
                <Plus className="w-4 h-4 mr-2" />
                ADD
              </Button>
            </div>

            <Tabs defaultValue="activity" className="w-full">
              <TabsList className="${bgColor} ${borderColor} w-full justify-start rounded-none p-0 h-auto">
                {["Activity Feed", "Personal Projects"].map((tab) => (
                  <TabsTrigger
                    key={tab}
                    value={tab.toLowerCase().replace(' ', '-')}
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#C1A461] data-[state=active]:bg-transparent text-[#C1A461]/60 data-[state=active]:text-[#C1A461] px-4 py-2"
                  >
                    {tab}
                  </TabsTrigger>
                ))}
              </TabsList>

              <div className="py-12">
                <div className="text-center space-y-4">
                  <div className="w-20 h-20 bg-[#C1A461]/10 rounded-full flex items-center justify-center mx-auto">
                    <div className="w-8 h-8 bg-[#C1A461]/20 rounded" />
                  </div>
                  <h3 className="text-[#C1A461]">Add some proof of work to build your profile</h3>
                  <div className="flex flex-col gap-2 max-w-xs mx-auto">
                    <Button className="bg-[#C1A461] hover:bg-[#C1A461]/90 text-[#1B2228]">
                      Add
                    </Button>
                    <Button 
                      variant="outline" 
                      className="border-[#C1A461]/20 text-[#C1A461] hover:bg-[#C1A461]/20"
                    >
                      Browse Bounties
                    </Button>
                  </div>
                </div>
              </div>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}
