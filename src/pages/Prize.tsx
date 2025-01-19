import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Trophy, Users, Star, Code, Shield, Gift, Heart, Sparkles } from 'lucide-react'

export default function Prize() {
  return (
    <div className="min-h-screen bg-[#1A1D1F] text-[#C1A461] p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-[#C1A461]">Prize Pool</h1>
          <p className="text-xl text-[#C1A461]">Total Prize Budget: €15,000 in ALPH</p>
        </div>

        {/* Main Prizes */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold flex items-center gap-2 text-[#C1A461]">
            <Trophy className="w-6 h-6" />
            Main Prizes
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { place: "1st Place", amount: "€3,000", color: "from-yellow-300" },
              { place: "2nd Place", amount: "€2,000", color: "from-gray-300" },
              { place: "3rd Place", amount: "€1,000", color: "from-amber-600" }
            ].map((prize) => (
              <Card key={prize.place} className="bg-[#232628] border-[#C1A461]/30">
                <CardContent className="p-6">
                  <div className={`text-center p-4 rounded-lg bg-gradient-to-br ${prize.color} to-transparent/30`}>
                    <h3 className="text-xl font-bold text-[#C1A461]">{prize.place}</h3>
                    <p className="text-2xl font-bold mt-2 text-[#C1A461]">{prize.amount}</p>
                    <p className="text-sm text-[#C1A461]/90 mt-1">in ALPH</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Evaluation Criteria */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-[#C1A461]">Evaluation Criteria</h2>
          <Card className="bg-[#232628] border-[#C1A461]/30">
            <CardContent className="p-6 space-y-4">
              {[
                { name: "Functionality", percentage: 30, description: "Technical implementation, performance, and feature effectiveness" },
                { name: "Innovation", percentage: 25, description: "Originality and creativity in concept and execution" },
                { name: "Design and User Experience (UI/UX)", percentage: 20, description: "Design aesthetics, usability, and user-friendliness" },
                { name: "Potential Impact", percentage: 15, description: "Real-world applicability and problem-solving potential" },
                { name: "Extensibility", percentage: 10, description: "Scalability and future development potential" }
              ].map((criteria) => (
                <div key={criteria.name} className="space-y-2">
                  <div className="flex justify-between items-baseline">
                    <div>
                      <span className="font-medium text-[#C1A461]">{criteria.name}</span>
                      <p className="text-sm text-[#C1A461]/80">{criteria.description}</p>
                    </div>
                    <span className="text-sm font-medium text-[#C1A461]">{criteria.percentage}%</span>
                  </div>
                  <Progress value={criteria.percentage} className="h-2 bg-[#C1A461]/20">
                    <div className="h-full bg-[#C1A461]" style={{ width: `${criteria.percentage}%` }} />
                  </Progress>
                </div>
              ))}
            </CardContent>
          </Card>
        </section>

        {/* Special Prizes */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold flex items-center gap-2 text-[#C1A461]">
            <Star className="w-6 h-6" />
            Special Prizes
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { title: "Most Creative Project", icon: Sparkles, description: "Exceptional creativity in leveraging Alephium's features" },
              { title: "Best User Experience", icon: Users, description: "Outstanding design, ease of use, and accessibility" },
              { title: "Best Code Quality", icon: Code, description: "Clean, efficient, and well-documented code" },
              { title: "Best Security Project", icon: Shield, description: "Tools enhancing Alephium's security" }
            ].map((category) => (
              <Card key={category.title} className="bg-[#232628] border-[#C1A461]/30">
                <CardContent className="p-6 text-center">
                  <category.icon className="w-8 h-8 mx-auto mb-4 text-[#C1A461]" />
                  <h3 className="font-bold text-[#C1A461]">{category.title}</h3>
                  <p className="mt-2 text-[#C1A461]">€500</p>
                  <p className="mt-2 text-sm text-[#C1A461]/80">{category.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Solo Participant Prizes */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold flex items-center gap-2 text-[#C1A461]">
            <Gift className="w-6 h-6" />
            Solo Participant Prizes
          </h2>
          <Card className="bg-[#232628] border-[#C1A461]/30">
            <CardContent className="p-6">
              <div className="space-y-6">
                <div>
                  <p className="text-lg font-bold text-[#C1A461]">Prize Pool: €3,000</p>
                  <p className="mt-2 text-[#C1A461]/90">
                    Solo developers can participate in various challenges to showcase their skills and creativity.
                  </p>
                </div>
                <div className="space-y-4">
                  {[
                    {
                      title: "Port a Simple Solidity Contract",
                      reward: "Up to €500",
                      description: "Select from predefined Solidity contracts and port to Alephium's platform"
                    },
                    {
                      title: "Solve the Bounty Puzzle",
                      reward: "€100",
                      description: "Take on unique coding challenges based on complexity"
                    },
                    {
                      title: "Build a Mini-Tool or Utility",
                      reward: "Up to €500",
                      description: "Create tools to enhance the Alephium development experience"
                    }
                  ].map((challenge) => (
                    <div key={challenge.title} className="p-4 rounded-lg bg-[#2A2E30]">
                      <div className="flex justify-between items-start">
                        <h3 className="font-bold text-[#C1A461]">{challenge.title}</h3>
                        <span className="text-sm font-medium text-[#C1A461]">{challenge.reward}</span>
                      </div>
                      <p className="mt-2 text-sm text-[#C1A461]/80">{challenge.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Surprise Rewards */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold flex items-center gap-2 text-[#C1A461]">
            <Heart className="w-6 h-6" />
            Surprise Rewards
          </h2>
          <Card className="bg-[#232628] border-[#C1A461]/30">
            <CardContent className="p-6 text-center">
              <p className="text-lg text-[#C1A461]">
                Stay tuned for exclusive goodies, swag, bonus challenges, and unexpected rewards throughout the event!
              </p>
              <p className="mt-4 text-sm text-[#C1A461]/80">
                Whether it's a token of appreciation or an extra boost of motivation, we're here to ensure every participant feels valued and inspired.
              </p>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  )
}