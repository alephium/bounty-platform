import { useState } from "react"
import { ExternalLink, Github } from "lucide-react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

interface Submission {
  id: string
  title: string
  description: string
  repository_url: string
  deployment_url?: string
  contract_deployed: boolean
  prize_category: string
  participationType: 'team' | 'solo'
  team_name?: string
  participant_name?: string
}

export default function JudgeReview() {
  const [selectedTab, setSelectedTab] = useState<'team' | 'solo'>('team')

  // Mock data - replace with actual API call
  const submissions: Submission[] = [
    {
      id: "1",
      title: "DeFi Lending Protocol",
      description: "A decentralized lending protocol built on Alephium that allows users to lend and borrow crypto assets.",
      repository_url: "https://github.com/team1/defi-lending",
      deployment_url: "https://defi-lending.vercel.app",
      contract_deployed: true,
      prize_category: "creative",
      participationType: "team",
      team_name: "Team Alpha"
    },
    {
      id: "2",
      title: "Smart Contract Migration Tool",
      description: "A tool for porting Solidity contracts to Alephium's smart contract language.",
      repository_url: "https://github.com/solo1/migration-tool",
      deployment_url: "https://www.youtube.com/watch?v=demo",
      contract_deployed: false,
      prize_category: "port",
      participationType: "solo",
      participant_name: "John Doe"
    }
  ]

  const getPrizeCategoryLabel = (category: string) => {
    const teamLabels: Record<string, string> = {
      creative: "Most Creative Project",
      ux: "Best User Experience",
      code: "Best Code Quality",
      security: "Best Security Project"
    }

    const soloLabels: Record<string, string> = {
      port: "Port Solidity Contract",
      puzzle: "Bounty Puzzle",
      tool: "Developer Tool"
    }
    
    return teamLabels[category] || soloLabels[category] || category
  }

  const renderSubmissionCard = (submission: Submission) => (
    <Card key={submission.id} className="mb-4 bg-[#1B2228] border-[#C1A461]/20">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl text-[#C1A461]">{submission.title}</CardTitle>
            <CardDescription className="text-[#C1A461]/80">
              {submission.participationType === 'team' 
                ? `Team: ${submission.team_name}`
                : `Participant: ${submission.participant_name}`
              }
            </CardDescription>
          </div>
          <Badge 
            variant="outline" 
            className="border-[#C1A461] text-[#C1A461]"
          >
            {getPrizeCategoryLabel(submission.prize_category)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-[#C1A461]/90">{submission.description}</p>
        
        <div className="flex flex-wrap gap-2">
          {submission.contract_deployed && (
            <Badge className="bg-[#C1A461]/20 text-[#C1A461]">
              Smart Contract Deployed
            </Badge>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-2">
          <Button
            variant="outline"
            className="flex-1 border-[#C1A461]/20 text-[#C1A461] hover:bg-[#C1A461]/10"
            onClick={() => window.open(submission.repository_url, '_blank')}
          >
            <Github className="w-4 h-4 mr-2" />
            View Repository
          </Button>
          {submission.deployment_url && (
            <Button
              variant="outline"
              className="flex-1 border-[#C1A461]/20 text-[#C1A461] hover:bg-[#C1A461]/10"
              onClick={() => window.open(submission.deployment_url, '_blank')}
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              View Demo
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="min-h-screen bg-[#1B2228] p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#C1A461] mb-2">Judge Dashboard</h1>
          <p className="text-[#C1A461]/80">Review and evaluate hackathon submissions</p>
          <p className="text-[#C1A461]/60 text-sm mt-2">Submission deadline: February 1, 2025 5:00 PM</p>
        </div>

        <Tabs
          defaultValue="team"
          value={selectedTab}
          onValueChange={(value) => setSelectedTab(value as 'team' | 'solo')}
          className="space-y-4"
        >
          <TabsList className="bg-[#1B2228] border-[#C1A461]/20">
            <TabsTrigger
              value="team"
              className="data-[state=active]:bg-[#C1A461] data-[state=active]:text-[#1B2228]"
            >
              Team Projects
            </TabsTrigger>
            <TabsTrigger
              value="solo"
              className="data-[state=active]:bg-[#C1A461] data-[state=active]:text-[#1B2228]"
            >
              Solo Projects
            </TabsTrigger>
          </TabsList>

          <TabsContent value="team">
            <ScrollArea className="h-[calc(100vh-240px)]">
              {submissions
                .filter(s => s.participationType === 'team')
                .map(renderSubmissionCard)}
            </ScrollArea>
          </TabsContent>

          <TabsContent value="solo">
            <ScrollArea className="h-[calc(100vh-240px)]">
              {submissions
                .filter(s => s.participationType === 'solo')
                .map(renderSubmissionCard)}
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}