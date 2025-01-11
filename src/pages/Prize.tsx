import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Trophy, Users, Star, Sparkles, Code, Shield, Gift, Heart, GroupIcon as Team } from 'lucide-react'

export default function PrizePage() {
  return (
    <div className="min-h-screen bg-[#1B2228] text-[#C1A461] p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-[#C1A461]">Prize Pool</h1>
          <p className="text-xl text-[#C1A461]/80">Total Prize Budget: €15,000 in ALPH</p>
        </div>

        {/* Main Prizes */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-[#C1A461] flex items-center gap-2">
            <Trophy className="w-6 h-6" />
            Main Prizes - Team
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { place: "1st Place", amount: "€3,000", color: "from-yellow-400" },
              { place: "2nd Place", amount: "€2,000", color: "from-gray-400" },
              { place: "3rd Place", amount: "€1,000", color: "from-amber-700" }
            ].map((prize) => (
              <Card key={prize.place} className="bg-[#1B2228] border-[#C1A461]/20">
                <CardContent className="p-6">
                  <div className={`text-center p-4 rounded-lg bg-gradient-to-br ${prize.color} to-transparent/20`}>
                    <h3 className="text-xl font-bold">{prize.place}</h3>
                    <p className="text-2xl font-bold mt-2">{prize.amount}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Evaluation Criteria */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-[#C1A461]">Evaluation Criteria</h2>
          <div className="space-y-4">
            {[
              { name: "Functionality", percentage: 30 },
              { name: "Innovation", percentage: 25 },
              { name: "Design and User Experience (UI/UX)", percentage: 20 },
              { name: "Potential Impact", percentage: 15 },
              { name: "Extensibility", percentage: 10 }
            ].map((criteria) => (
              <div key={criteria.name} className="space-y-2">
                <div className="flex justify-between">
                  <span>{criteria.name}</span>
                  <span>{criteria.percentage}%</span>
                </div>
                <Progress value={criteria.percentage} className="h-2 bg-[#C1A461]/20">
                  <div className="h-full bg-[#C1A461]" style={{ width: `${criteria.percentage}%` }} />
                </Progress>
              </div>
            ))}
          </div>
        </section>

        {/* Specific Category Prizes */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-[#C1A461] flex items-center gap-2">
            <Star className="w-6 h-6" />
            Specific Category Prizes
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { title: "Most Creative Project", icon: Sparkles },
              { title: "Best User Experience", icon: Users },
              { title: "Best Code Quality", icon: Code },
              { title: "Best Security Project", icon: Shield }
            ].map((category) => (
              <Card key={category.title} className="bg-[#1B2228] border-[#C1A461]/20">
                <CardContent className="p-6 text-center">
                  <category.icon className="w-8 h-8 mx-auto mb-4" />
                  <h3 className="font-bold">{category.title}</h3>
                  <p className="mt-2 text-[#C1A461]/80">€500</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Individual Hacker Prizes */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-[#C1A461] flex items-center gap-2">
            <Gift className="w-6 h-6" />
            Individual Hacker Prizes
          </h2>
          <Card className="bg-[#1B2228] border-[#C1A461]/20">
            <CardContent className="p-6">
              <p className="text-lg font-bold mb-4">Prize Pool: €3,000</p>
              <ul className="space-y-4">
                <li className="flex items-start gap-2">
                  <span className="text-[#C1A461]">•</span>
                  <div>
                    <p className="font-bold">Port a simple Solidity Contract</p>
                    <p className="text-[#C1A461]/80">Up to €500</p>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#C1A461]">•</span>
                  <div>
                    <p className="font-bold">Solve the Bounty Puzzle</p>
                    <p className="text-[#C1A461]/80">€100 (based on complexity)</p>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#C1A461]">•</span>
                  <div>
                    <p className="font-bold">Build a Mini-Tool or Utility</p>
                    <p className="text-[#C1A461]/80">Up to €500</p>
                  </div>
                </li>
              </ul>
            </CardContent>
          </Card>
        </section>

        {/* Bonus & Surprise Prizes */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-[#C1A461] flex items-center gap-2">
            <Heart className="w-6 h-6" />
            Bonus & Surprise Prizes
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { title: "Best Team Collaboration", amount: "€500" },
              { title: "Coup de Coeur Blockflow", amount: "€500" },
              { title: "Coup de Coeur Rabbindesbois", amount: "€500" }
            ].map((prize) => (
              <Card key={prize.title} className="bg-[#1B2228] border-[#C1A461]/20">
                <CardContent className="p-6 text-center">
                  <h3 className="font-bold">{prize.title}</h3>
                  <p className="mt-2 text-[#C1A461]/80">{prize.amount}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Participation Prizes */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-[#C1A461] flex items-center gap-2">
            <Team className="w-6 h-6" />
            Participation Prizes
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <Card className="bg-[#1B2228] border-[#C1A461]/20">
              <CardHeader>
                <CardTitle className="text-lg">Developer Feedback Rewards</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-[#C1A461]/80">€15 per person + One Key hardware wallet Lottery</p>
                <p className="mt-2 text-sm text-[#C1A461]/60">
                  Distributed among participants submitting actionable, high-quality feedback about Alephium.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-[#1B2228] border-[#C1A461]/20">
              <CardHeader>
                <CardTitle className="text-lg">Team-Based Participation Prize</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-[#C1A461]/80">Prize Pool: €2,000</p>
                <p className="mt-2 text-sm text-[#C1A461]/60">
                  Shared among teams that deploy a functioning smart contract on Alephium's testnet but do not win any other prizes.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  )
}