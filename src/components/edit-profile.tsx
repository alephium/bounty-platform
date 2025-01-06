import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Checkbox } from "@/components/ui/checkbox"
import { X, Upload, Github, Twitter, Linkedin, Globe, MessageCircle } from 'lucide-react'

export default function EditProfile() {
  const [selectedSkills, setSelectedSkills] = useState<string[]>([])

  return (
    <div className="min-h-screen bg-[#1B2228] text-[#C1A461] p-4">
      <div className="max-w-3xl mx-auto">
        <Card className="bg-[#1B2228] border-[#C1A461]/20">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-[#C1A461]">Edit Profile</CardTitle>
          </CardHeader>
          <CardContent className="space-y-8">
            {/* Personal Info */}
            <section className="space-y-6">
              <h2 className="text-lg font-semibold text-[#C1A461]">PERSONAL INFO</h2>
              
              <div className="space-y-4">
                <div>
                  <Label>Profile Picture</Label>
                  <div className="mt-2 flex items-center gap-4">
                    <Avatar className="w-24 h-24">
                      <AvatarImage src="/placeholder.svg" />
                      <AvatarFallback>YL</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 border-2 border-dashed border-[#C1A461]/20 rounded-lg p-4 text-center">
                      <Button variant="outline" className="border-[#C1A461]/20 text-[#C1A461] hover:bg-[#C1A461]/20">
                        <Upload className="w-4 h-4 mr-2" />
                        Choose or drag and drop media
                      </Button>
                      <p className="text-sm text-[#C1A461]/60 mt-2">Maximum size 5 MB</p>
                    </div>
                  </div>
                </div>

                <div>
                  <Label htmlFor="username">Username *</Label>
                  <Input 
                    id="username" 
                    value="yy" 
                    className="bg-[#1B2228] border-[#C1A461]/20 text-[#C1A461] focus-visible:ring-[#C1A461]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input 
                      id="firstName" 
                      value="Yuanying" 
                      className="bg-[#1B2228] border-[#C1A461]/20 text-[#C1A461] focus-visible:ring-[#C1A461]"
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input 
                      id="lastName" 
                      value="Li" 
                      className="bg-[#1B2228] border-[#C1A461]/20 text-[#C1A461] focus-visible:ring-[#C1A461]"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="bio">Your One-Line Bio</Label>
                  <Textarea 
                    id="bio" 
                    placeholder="A full-stack dev who loves hackathons."
                    className="bg-[#1B2228] border-[#C1A461]/20 text-[#C1A461] focus-visible:ring-[#C1A461]"
                  />
                </div>

                <div>
                  <Label htmlFor="wallet">Your Solana Wallet Address *</Label>
                  <Input 
                    id="wallet" 
                    placeholder="Wallet Address"
                    className="bg-[#1B2228] border-[#C1A461]/20 text-[#C1A461] focus-visible:ring-[#C1A461]"
                  />
                </div>
              </div>
            </section>

            {/* Socials */}
            <section className="space-y-6">
              <h2 className="text-lg font-semibold text-[#C1A461]">SOCIALS</h2>
              <div className="space-y-4">
                {[
                  { icon: Github, placeholder: "github.com/", value: "YYdev" },
                  { icon: Twitter, placeholder: "x.com/", value: "@yydata" },
                  { icon: Linkedin, placeholder: "linkedin.com/in/", value: "@yydata" },
                  { icon: MessageCircle, placeholder: "t.me/", value: "XiDev" },
                  { icon: Globe, placeholder: "https://", value: "yy.dev" },
                ].map((social, index) => (
                  <div key={index} className="relative">
                    <social.icon className="w-5 h-5 absolute left-3 top-2.5 text-[#C1A461]/60" />
                    <Input 
                      value={social.value}
                      className="pl-10 bg-[#1B2228] border-[#C1A461]/20 text-[#C1A461] focus-visible:ring-[#C1A461]"
                      placeholder={social.placeholder}
                    />
                  </div>
                ))}
              </div>
            </section>

            {/* Work */}
            <section className="space-y-6">
              <h2 className="text-lg font-semibold text-[#C1A461]">WORK</h2>
              <div className="space-y-4">
                <div>
                  <Label>What areas of Web3 are you most interested in?</Label>
                  <Select>
                    <SelectTrigger className="bg-[#1B2228] border-[#C1A461]/20 text-[#C1A461]">
                      <SelectValue placeholder="Select areas" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#1B2228] border-[#C1A461]/20">
                      <SelectItem value="defi">DeFi</SelectItem>
                      <SelectItem value="nft">NFTs</SelectItem>
                      <SelectItem value="dao">DAOs</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Community Affiliations</Label>
                  <Select defaultValue="superteam">
                    <SelectTrigger className="bg-[#1B2228] border-[#C1A461]/20 text-[#C1A461]">
                      <SelectValue placeholder="Select community" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#1B2228] border-[#C1A461]/20">
                      <SelectItem value="superteam">Superteam Germany</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Work Experience</Label>
                  <Select defaultValue="2-5">
                    <SelectTrigger className="bg-[#1B2228] border-[#C1A461]/20 text-[#C1A461]">
                      <SelectValue placeholder="Select experience" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#1B2228] border-[#C1A461]/20">
                      <SelectItem value="2-5">2 to 5 Years</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Location</Label>
                  <Select defaultValue="germany">
                    <SelectTrigger className="bg-[#1B2228] border-[#C1A461]/20 text-[#C1A461]">
                      <SelectValue placeholder="Select location" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#1B2228] border-[#C1A461]/20">
                      <SelectItem value="germany">Germany</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Current Employer</Label>
                  <Input 
                    value="_Navi"
                    className="bg-[#1B2228] border-[#C1A461]/20 text-[#C1A461] focus-visible:ring-[#C1A461]"
                  />
                </div>

                <div>
                  <Label className="flex items-center gap-2">
                    Skills Needed
                    <span className="text-[#C1A461]/60 text-sm">
                      We will send email notifications of new listings for your selected skills
                    </span>
                  </Label>
                  <div className="space-y-4 mt-4">
                    {[
                      {
                        category: "Frontend",
                        skills: ["React", "Vue", "Angular"]
                      },
                      {
                        category: "Backend",
                        skills: ["Javascript", "Python", "C++"]
                      },
                      {
                        category: "Blockchain",
                        skills: ["Rust", "Solidity"]
                      }
                    ].map((category) => (
                      <div key={category.category}>
                        <h3 className="text-sm font-medium text-[#C1A461] mb-2">{category.category}</h3>
                        <div className="flex flex-wrap gap-2">
                          {category.skills.map((skill) => (
                            <Badge
                              key={skill}
                              variant="outline"
                              className={`cursor-pointer border-[#C1A461]/20 hover:border-[#C1A461]/40
                                ${selectedSkills.includes(skill) ? 'bg-[#C1A461]/20' : ''}`}
                              onClick={() => {
                                setSelectedSkills(prev => 
                                  prev.includes(skill) 
                                    ? prev.filter(s => s !== skill)
                                    : [...prev, skill]
                                )
                              }}
                            >
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox id="private" className="border-[#C1A461]/20 data-[state=checked]:bg-[#C1A461]" />
                  <Label htmlFor="private">Keep my info private</Label>
                </div>
              </div>
            </section>

            <Button className="w-full bg-[#C1A461] hover:bg-[#C1A461]/90 text-[#1B2228]">
              Update Profile
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

