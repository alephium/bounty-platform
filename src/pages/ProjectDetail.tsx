'use client'

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Clock, Globe, MessageSquare, AlertTriangle, Send } from 'lucide-react'
import { Link } from "react-router-dom"
// import Image from "next/image"

export default function ProjectDetails() {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* <header className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <span className="text-2xl font-pirate tracking-wider text-[#C1A461]">CONTRIBUM</span>
            <nav className="hidden md:flex items-center gap-6">
              {["Voyages", "Crew", "Treasures"].map((item) => (
                <Link 
                  key={item} 
                  href="#" 
                  className="text-sm font-medium text-[#C1A461]/80 hover:text-[#C1A461] transition-colors"
                >
                  {item}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <Avatar>
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback className="bg-amber-500/20 text-[#C1A461]">YY</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header> */}

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-[300px,1fr] gap-8">
          <aside className="space-y-6">
            <Card className="bg-gray-800/50 border-amber-500/20">
              <CardContent className="p-4 space-y-4">
                <div>
                  <div className="flex items-center gap-2 text-2xl font-bold">
                    <span className="text-[#C1A461]">◈</span>
                    <span className="text-[#C1A461]">USDC</span>
                  </div>
                  <div className="text-sm text-[#C1A461]/60">Payment</div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-[#C1A461]/60">Applications</span>
                    <span className="text-[#C1A461] font-bold">25-50</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[#C1A461]/60">Remaining</span>
                    <div className="flex items-center gap-2 text-[#C1A461]">
                      <Clock className="w-4 h-4" />
                      <span>4d:2h:43m</span>
                    </div>
                  </div>
                </div>
                <Button className="w-full bg-amber-500 hover:bg-amber-600 text-gray-900">
                  Send Quote
                </Button>
                <div className="p-3 bg-amber-500/10 rounded-lg border border-amber-500/20">
                  <div className="flex gap-2 text-sm text-[#C1A461]">
                    <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-1" />
                    <p>Don't start working just yet! Apply first, and then begin working only once you've been hired for the project.</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800/50 border-amber-500/20">
              <CardContent className="p-4">
                <h3 className="font-bold text-[#C1A461] mb-3">SKILLS NEEDED</h3>
                <div className="flex flex-wrap gap-2">
                  {["Frontend", "Backend", "Blockchain"].map((skill) => (
                    <Badge 
                      key={skill}
                      variant="secondary" 
                      className="bg-amber-500/20 text-[#C1A461]"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800/50 border-amber-500/20">
              <CardContent className="p-4">
                <h3 className="font-bold text-[#C1A461] mb-3">CONTACT</h3>
                <Button 
                  variant="outline" 
                  className="w-full border-amber-500/20 text-[#C1A461] hover:bg-amber-500/20"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Reach out
                </Button>
              </CardContent>
            </Card>
          </aside>

          <div className="space-y-6">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-2xl font-bold text-[#C1A461] mb-2">
                  Solana/Rust Developer Intern
                </h1>
                <div className="flex items-center gap-4 text-[#C1A461]/60">
                  <span>by Sizzil</span>
                  <Badge variant="secondary" className="bg-amber-500/20 text-[#C1A461]">
                    Project
                  </Badge>
                  <div className="flex items-center gap-1">
                    <Globe className="w-4 h-4" />
                    <span>Global</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageSquare className="w-4 h-4" />
                    <span>1</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {[1, 2, 3].map((i) => (
                    <Avatar key={i} className="border-2 border-gray-900">
                      <AvatarImage src="/placeholder.svg" />
                      <AvatarFallback className="bg-amber-500/20 text-[#C1A461]">U</AvatarFallback>
                    </Avatar>
                  ))}
                </div>
                <Button variant="outline" className="border-amber-500/20 text-[#C1A461] hover:bg-amber-500/20">
                  Subscribe
                </Button>
              </div>
            </div>

            <Tabs defaultValue="details" className="w-full">
              <TabsList className="bg-gray-800 border-b border-amber-500/20 w-full justify-start rounded-none p-0 h-auto">
                {["Details", "Inviting Proposals"].map((tab) => (
                  <TabsTrigger
                    key={tab}
                    value={tab.toLowerCase()}
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-amber-500 data-[state=active]:bg-transparent text-[#C1A461]/60 data-[state=active]:text-[#C1A461] px-4 py-2"
                  >
                    {tab}
                  </TabsTrigger>
                ))}
              </TabsList>

              <div className="py-6 space-y-8">
                <section>
                  <h2 className="text-lg font-bold text-[#C1A461] mb-4">Requirements:</h2>
                  <ul className="space-y-2 text-[#C1A461]/80">
                    <li>Must have experience with Solana and Rust.</li>
                    <li>Good understanding of the Anchor framework.</li>
                    <li>Proficient in TypeScript.</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-lg font-bold text-[#C1A461] mb-4">About The Project</h2>
                  <p className="text-[#C1A461]/80">
                    At Sizzil, we are working at the intersection of Prediction markets and entertainment.
                    We are looking for a Web3 Developer Intern to work on building version1 of the product.
                  </p>
                </section>

                <section>
                  <h2 className="text-lg font-bold text-[#C1A461] mb-4">Tech Stack</h2>
                  <div className="space-y-2 text-[#C1A461]/80">
                    <div><strong>Blockchain:</strong> Solana, Anchor Framework</div>
                    <div><strong>Smart Contracts:</strong> Rust</div>
                    <div><strong>Front-end:</strong> TypeScript</div>
                  </div>
                </section>

                <section>
                  <h2 className="text-lg font-bold text-[#C1A461] mb-4">Evaluation Criteria</h2>
                  <ul className="space-y-2 text-[#C1A461]/80">
                    <li>Proficiency in Solana development and Rust programming.</li>
                    <li>Experience with Anchor framework and deploying smart contracts.</li>
                    <li>Ability to integrate smart contracts with front-end applications.</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-lg font-bold text-[#C1A461] mb-4">Estimated Time to Complete</h2>
                  <p className="text-[#C1A461]/80">
                    The project duration is 2 months, covering development and delivery milestones.
                  </p>
                </section>

                <section>
                  <h2 className="text-lg font-bold text-[#C1A461] mb-4">Payment Logistics:</h2>
                  <p className="text-[#C1A461]/80">
                    Monthly : 350-650 USDC
                  </p>
                </section>

                <section>
                  <div className="flex items-center gap-2 mb-4">
                    <MessageSquare className="w-5 h-5 text-[#C1A461]" />
                    <h2 className="text-lg font-bold text-[#C1A461]">1 Comment</h2>
                  </div>
                  <div className="flex gap-4">
                    <Avatar>
                      <AvatarImage src="/placeholder.svg" />
                      <AvatarFallback className="bg-amber-500/20 text-[#C1A461]">YY</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <input
                        type="text"
                        placeholder="Write a comment"
                        className="w-full bg-gray-800 border border-amber-500/20 rounded-lg px-4 py-2 text-[#C1A461] placeholder-amber-500/40 focus:outline-none focus:border-amber-500"
                      />
                    </div>
                  </div>
                  <div className="mt-4 space-y-4">
                    <div className="flex gap-4">
                      <Avatar>
                        <AvatarImage src="/placeholder.svg" />
                        <AvatarFallback className="bg-amber-500/20 text-[#C1A461]">LA</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-[#C1A461]">Lurd Aquarius</span>
                          <span className="text-sm text-[#C1A461]/60">6h ago</span>
                        </div>
                        <p className="text-[#C1A461]/80 mt-1">
                          Alright but I will love to make the project duration 3 months and I know you won't regret. And how can I show up my skill I guess we will have work for a week free to know how good I can be. And it will be great to work with you guys
                        </p>
                        <Button 
                          variant="link" 
                          className="text-[#C1A461]/60 hover:text-[#C1A461] p-0 h-auto mt-2"
                        >
                          Reply
                        </Button>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  )
}





// import React, { useState, useEffect } from 'react'
// import { useParams } from 'react-router-dom'
// import { projectService } from '../services/project.service'
// import { Project } from '../types/supabase'

// export default function ProjectDetail() {
//   const { id } = useParams<{ id: string }>()
//   const [project, setProject] = useState<Project | null>(null)
//   const [loading, setLoading] = useState(true)

//   useEffect(() => {
//     if (id) {
//       loadProject(id)
//     }
//   }, [id])

//   const loadProject = async (projectId: string) => {
//     try {
//       const data = await projectService.getProjectById(projectId)
//       setProject(data)
//     } catch (error) {
//       console.error('Error loading project:', error)
//     } finally {
//       setLoading(false)
//     }
//   }

//   if (loading) return <div>Loading...</div>
//   if (!project) return <div>Project not found</div>

//   return (
//     <div>
//       <h1 className="text-3xl font-bold">{project.title}</h1>
//       <p className="mt-4">{project.description}</p>
//     </div>
//   )
// }
