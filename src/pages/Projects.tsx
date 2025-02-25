import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowUpRight, AlertTriangle, Shield, Bug, AlertCircle } from 'lucide-react'
import { Badge } from "@/components/ui/badge"

const Project = () => {
  const severityLevels = [
    {
      level: "Critical",
      reward: "Up to $50,000",
      description: "Critical vulnerabilities that can lead to fund loss, unauthorized control, or severe protocol disruption",
      icon: AlertTriangle,
      colorClass: "text-destructive"
    },
    {
      level: "High",
      reward: "Up to $25,000",
      description: "High-severity vulnerabilities affecting protocol security or functionality",
      icon: AlertCircle,
      colorClass: "text-orange-500"
    },
    {
      level: "Medium",
      reward: "Up to $10,000",
      description: "Medium-impact vulnerabilities with limited scope or impact",
      icon: Shield,
      colorClass: "text-yellow-500"
    },
    {
      level: "Low",
      reward: "Up to $2,000",
      description: "Low-severity issues with minimal impact",
      icon: Bug,
      colorClass: "text-blue-500"
    }
  ]

  const inScope = [
    "Smart Contract vulnerabilities",
    "Consensus mechanism flaws",
    "Network layer exploits",
    "Virtual machine vulnerabilities",
    "Cryptographic weaknesses",
    "Economic attack vectors"
  ]

  const outScope = [
    "Already reported issues",
    "DDoS attacks",
    "Social engineering",
    "Client-side injections",
    "MITM attacks",
    "Issues in third-party applications"
  ]

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4">
        <div className="grid gap-12">
          <section className="pt-12">
            <h1 className="text-4xl font-bold mb-6 text-foreground">
              Bug Find
            </h1>
            <p className="text-lg mb-8 text-foreground opacity-90">
              Help secure the Alephium protocol and earn rewards for finding vulnerabilities.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-bold mb-8 text-foreground">
              Severity Levels & Rewards
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {severityLevels.map(level => (
                <Card key={level.level}>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <level.icon className={`h-6 w-6 ${level.colorClass}`} />
                      <h3 className="text-xl font-semibold text-foreground">
                        {level.level}
                      </h3>
                    </div>
                    <div className="text-xl font-bold mb-3 text-foreground">
                      {level.reward}
                    </div>
                    <p className="text-foreground opacity-80">
                      {level.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
          <section>
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-background border border-border">
                <CardHeader>
                  <CardTitle className="text-foreground">In Scope</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {inScope.map(item => (
                      <li key={item} className="flex items-center gap-2">
                        <Badge className="bg-green-500/10 text-green-500 hover:bg-green-500/20">
                          Included
                        </Badge>
                        <span className="text-foreground opacity-90">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              <Card className="bg-background border border-border">
                <CardHeader>
                  <CardTitle className="text-foreground">Out of Scope</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {outScope.map(item => (
                      <li key={item} className="flex items-center gap-2">
                        <Badge className="bg-red-500/10 text-red-500 hover:bg-red-500/20">
                          Excluded
                        </Badge>
                        <span className="text-foreground opacity-90">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </section>
          <section>
            <Card className="bg-background border border-border">
              <CardHeader>
                <CardTitle className="text-foreground">Submission Guidelines</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-foreground space-y-2">
                  <p>• Provide detailed technical information about the vulnerability</p>
                  <p>• Include proof-of-concept code or steps to reproduce</p>
                  <p>• One vulnerability per report</p>
                  <p>• First report of a vulnerability receives the reward</p>
                  <p>• Public disclosure only after the fix is deployed</p>
                  <p>• Follow responsible disclosure practices</p>
                </div>
              </CardContent>
            </Card>
          </section>
          <section>
            <div className="space-y-6">
              <Card className="bg-background border border-border">
                <CardHeader>
                  <CardTitle className="text-foreground">Disclosure Policy</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-foreground space-y-4">
                    <p className="leading-relaxed">
                      All found vulnerabilities or bugs must be exclusively reported to: <span className="font-semibold"> bugbounty@alephium.org</span>
                    </p>
                    <div className="space-y-2">
                      <p>Your report should include:</p>
                      <ul className="list-disc pl-6 space-y-1">
                        <li>The conditions that the bug reproduction depends on</li>
                        <li>Steps required to reproduce the bug or a proof of concept</li>
                        <li>Potential repercussions of the vulnerability's exploitation</li>
                      </ul>
                    </div>
                    <div className="space-y-2">
                      <p className="font-semibold">Important Notes:</p>
                      <ul className="space-y-2">
                        <li>• Acknowledgment will be issued within 2 business days</li>
                        <li>• Vulnerabilities must be reported within 24 hours of discovery</li>
                        <li>• Public disclosure is prohibited before Alephium's authorization</li>
                        <li>• Comprehensive reports increase reward chances and potential amounts</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-background border border-border">
                <CardHeader>
                  <CardTitle className="text-foreground">Qualification Requirements</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-foreground space-y-3">
                    <p className="font-semibold mb-4">To qualify for a reward, you must:</p>
                    <ul className="space-y-3">
                      {[
                        "Comply with Program Rules and meet eligibility requirements",
                        "Identify a previously unreported, non-public vulnerability",
                        "Be the first to report the unique vulnerability",
                        "Provide sufficient information for reproduction and rectification",
                        "Not exploit the vulnerability in any manner",
                        "Maintain confidentiality until authorized disclosure",
                        "Prevent privacy violations and data destruction",
                        "Not report previously rewarded vulnerabilities",
                        "Avoid illegal behavior or coercive tactics"
                      ].map((requirement, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-primary mt-1">•</span>
                          <span className="opacity-90">{requirement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
              <div className="flex gap-4">
                <Button 
                  className="bg-primary hover:bg-primary/90 text-primary-foreground"
                  onClick={() => window.open('mailto:bugbounty@alephium.org')}
                >
                  Submit Report
                  <ArrowUpRight className="ml-2 h-4 w-4" />
                </Button>
                <Button 
                  className="bg-primary hover:bg-primary/90 text-primary-foreground"
                  onClick={() => window.open('https://github.com/alephium/community/blob/master/BugBounty.md', '_blank')}
                >
                  View Guidelines
                  <ArrowUpRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

export default Project