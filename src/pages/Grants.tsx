import { Link } from 'react-router-dom'
// import Image from "next/image"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, ChevronDown, ExternalLink, ArrowRight } from "lucide-react"

export default function Grants() {
  return (
    <div className="min-h-screen bg-[#1B2228] text-gray-100">
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <Card className="bg-[#111418] border-gray-800 mb-6 overflow-hidden relative">
          <CardContent className="p-6 md:p-8">
            <div className="flex flex-col md:flex-row justify-between">
              <div className="max-w-xl">
                <Badge className="bg-[#6E56CF]/20 text-[#A594FD] mb-2">POLYGON</Badge>
                <h1 className="text-2xl md:text-3xl font-bold mb-2">
                  Polygon Community Grants Program: 1 Billion POL for Your Vision
                </h1>
                <p className="text-gray-400 mb-4">
                  Empowering builders to create lasting, future-proof, and creative contributions to the growth of
                  Polygon
                </p>
                <Button className="bg-[#6E56CF] hover:bg-[#5D46BF] text-white">Apply Now</Button>
              </div>
              <div className="hidden md:flex items-center justify-end">
                <div className="relative h-32 w-48">
                  {/* Circular badges */}
                  <div className="absolute right-0 top-0 flex flex-wrap gap-2">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                      <div key={i} className="rounded-full bg-[#6E56CF] w-10 h-10 flex items-center justify-center">
                        <span className="text-white">{i % 2 === 0 ? "∞" : "★"}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Info Cards */}
        <div className="grid md:grid-cols-2 gap-4 mb-8">
          <Card className="bg-[#6E56CF] border-none">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="bg-white/20 rounded-full p-2">
                  <span className="text-white text-xl">🔄</span>
                </div>
                <div>
                  <h3 className="font-bold text-white text-lg">Season 3 is live</h3>
                  <p className="text-white/80 text-sm">
                    Fresh selection of grants for protocols, tooling, and apps building on Polygon. Projects in
                    development welcome!
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#111418] border-gray-800">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="bg-[#6E56CF]/20 rounded-full p-2">
                  <span className="text-[#A594FD] text-xl">💰</span>
                </div>
                <div>
                  <h3 className="font-bold text-white text-lg">1 Billion POL</h3>
                  <p className="text-gray-400 text-sm">
                    The Polygon treasury has allocated 1 billion POL tokens to fund grants, with 300M POL per year over
                    3.5 years
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Live Section */}
        <div className="mb-12">
          <h2 className="text-xl font-bold mb-4">Live</h2>

          <div className="space-y-4">
            {[
              {
                logo: "/placeholder.svg",
                title: "AngelHack's Polygon Community Grants Program",
                description: "Funding innovative, high-impact, and future-focused projects for worldwide innovation",
                tag: "Grant Program",
              },
              {
                logo: "/placeholder.svg",
                title: "QuickLaunch Project Grants Program",
                description:
                  "Accelerating promising projects with funding and resources to build innovative solutions on Polygon",
                tag: "Grant Program",
              },
              {
                logo: "/placeholder.svg",
                title: "Polytern",
                description:
                  "Paid internship for ambitious developers wanting to accelerate their growth by building on Polygon while learning from industry experts",
                tag: "Grant Program",
              },
              {
                logo: "/placeholder.svg",
                title: "Thrive",
                description: "Supporting promising startups to achieve business success and growth on Polygon",
                tag: "Grant Program",
              },
              {
                logo: "/placeholder.svg",
                title: "Cryptorank: Concept Agents to Onchain Apps",
                description: "Funding for teams building AI agents to build on-chain apps",
                tag: "Grant Program",
              },
              {
                logo: "/placeholder.svg",
                title: "InfraX: DePin Quests",
                description: "Funding to incentivize the next wave of large permissionless DePIN networks",
                tag: "Grant Program",
              },
            ].map((program, index) => (
              <Card key={index} className="bg-[#111418] border-gray-800">
                <CardContent className="p-4">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 rounded-md overflow-hidden bg-gray-800">
                        {/* <Image
                          src={program.logo || "/placeholder.svg"}
                          alt={program.title}
                          width={64}
                          height={64}
                          className="object-cover"
                        /> */}
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <Badge className="bg-gray-800 text-gray-400 mb-2">{program.tag}</Badge>
                          <h3 className="font-bold text-white">{program.title}</h3>
                          <p className="text-gray-400 text-sm mt-1">{program.description}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-end">
                    <Button variant="outline" className="text-xs border-gray-700 text-gray-300 hover:bg-gray-800">
                      Learn More
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Upcoming Section */}
        <div className="mb-12">
          <h2 className="text-xl font-bold mb-4">Upcoming</h2>
          <div className="flex justify-center my-8">
            <Button variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800">
              View All Programs
            </Button>
          </div>
        </div>

        {/* Grantees Section */}
        <Card className="bg-[#111418] border-gray-800 mb-12">
          <CardContent className="p-6 md:p-8">
            <div className="flex flex-col items-center text-center mb-6">
              <div className="flex items-center justify-center mb-4">
                <div className="relative w-32 h-16">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-[#6E56CF] text-2xl">Grantees</span>
                  </div>
                  <div className="absolute left-0 top-0 w-8 h-8 transform -translate-y-1/2 -translate-x-1/2">
                    <div className="w-full h-full rounded-full border-2 border-[#6E56CF]"></div>
                  </div>
                  <div className="absolute right-0 top-0 w-8 h-8 transform -translate-y-1/2 translate-x-1/2">
                    <div className="w-full h-full rounded-full border-2 border-[#6E56CF]"></div>
                  </div>
                </div>
              </div>
              <p className="text-gray-400">Check out the projects that have received grant funding</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <div key={i} className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-gray-800 mb-2"></div>
                  <span className="text-xs text-gray-400">Project {i}</span>
                </div>
              ))}
            </div>

            <div className="flex justify-center">
              <Button variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800">
                View All
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Community Treasury Board */}
        <div className="mb-12">
          <h2 className="text-xl font-bold mb-6">Meet the Community Treasury Board</h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: "Ron Zacharias", role: "Board Member" },
              { name: "Maggie Love", role: "Board Member" },
              { name: "David Gogel", role: "Board Member" },
              { name: "Peta Gia", role: "Director of Community Grants" },
            ].map((member, index) => (
              <div key={index} className="flex flex-col items-center text-center">
                <Avatar className="w-20 h-20 mb-3">
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback className="bg-gray-800">{member.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <h3 className="font-medium text-white">{member.name}</h3>
                <p className="text-xs text-gray-400">{member.role}</p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-12">
          <h2 className="text-xl font-bold mb-6">FAQ</h2>

          <div className="space-y-2">
            {[
              "What is the Community Grants Program?",
              "What is the Community Treasury?",
              "What is the Community Treasury Board? What are their roles and responsibilities?",
              "What is a Grant Allocator (GA)?",
              "How are Grant Allocators (GAs) selected and what is their role?",
              "What is the season strategy for the Community Grants Program?",
              "What is the difference between Direct Grants and Grant Allocator Grants?",
              "Which projects are eligible to apply?",
            ].map((question, index) => (
              <div key={index} className="border border-gray-800 rounded-md">
                <button className="w-full p-4 flex items-center justify-between text-left">
                  <span>{question}</span>
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                </button>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-6">
            <Button variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800">
              View All FAQs
            </Button>
          </div>
        </div>

        {/* CTA Cards */}
        <div className="grid md:grid-cols-2 gap-4 mb-12">
          <Card className="bg-gradient-to-br from-[#6E56CF] to-[#4338CA] border-none">
            <CardContent className="p-6">
              <h3 className="text-white font-bold text-xl mb-2">Stay updated on the Community Grants Program</h3>
              <div className="flex gap-2 mt-4">
                <Input
                  placeholder="Enter your email"
                  className="bg-white/20 border-white/20 text-white placeholder:text-white/60"
                />
                <Button className="bg-white text-[#6E56CF] hover:bg-white/90">
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#111418] border-gray-800">
            <CardContent className="p-6">
              <h3 className="text-white font-bold text-xl mb-2">Join the Polygon Founders Community!</h3>
              <p className="text-gray-400 text-sm mb-4">
                Connect with other builders, share knowledge and get support as you build on Polygon.
              </p>
              <Button className="bg-[#6E56CF] hover:bg-[#5D46BF] text-white">
                Join Discord Server
                <ExternalLink className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
