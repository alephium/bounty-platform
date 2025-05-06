import { useNavigate } from "react-router-dom"
import { Trophy, Users, UserPlus } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useUser } from "@/contexts/UserContext"

export default function HackathonPage() {
  const navigate = useNavigate()
  const { user } = useUser()

  const handleParticipationClick = (type: 'team' | 'solo') => {
    if (!user) {
      navigate('/auth')
      return
    }
    navigate(`/hackathon/submit?type=${type}`)
  }

  return (
    <div className="min-h-screen bg-[#1B2228] p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-[#C1A461]">
            Alephium Hackathon 2025
          </h1>
          <p className="text-xl text-[#C1A461]/80">
            Build the Future of Decentralized Applications
          </p>
        </div>

        {/* Prize Pool Card */}
        <Card className="bg-[#1B2228] border-[#C1A461]/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-[#C1A461]">
              <Trophy className="w-6 h-6" />
              Prize Pool - 13000 $
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-[#C1A461]/80">
              Compete for amazing prizes and recognition in various categories
            </p>
            <Button
              onClick={() => navigate('/hackathon/prize')}
              className="w-full bg-[#C1A461] hover:bg-[#C1A461]/90 text-[#1B2228]"
            >
              View Prize Details
            </Button>
          </CardContent>
        </Card>

        {/* Participation Options */}
        <div className="grid md:grid-cols-2 gap-4">
          {/* Team Participation */}
          <Card className="bg-[#1B2228] border-[#C1A461]/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-[#C1A461]">
                <Users className="w-6 h-6" />
                Team Project
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-[#C1A461]/80">
                Collaborate with up to 4 team members and build something amazing together
              </p>
              <Button
                onClick={() => handleParticipationClick('team')}
                className="w-full bg-[#C1A461] hover:bg-[#C1A461]/90 text-[#1B2228]"
              >
                Submit as Team
              </Button>
            </CardContent>
          </Card>

          {/* Solo Participation */}
          <Card className="bg-[#1B2228] border-[#C1A461]/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-[#C1A461]">
                <UserPlus className="w-6 h-6" />
                Solo Project
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-[#C1A461]/80">
                Work independently and showcase your individual skills and creativity
              </p>
              <Button
                onClick={() => handleParticipationClick('solo')}
                className="w-full bg-[#C1A461] hover:bg-[#C1A461]/90 text-[#1B2228]"
              >
                Submit as Solo Hacker
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}