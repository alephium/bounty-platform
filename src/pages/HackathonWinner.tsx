import { useEffect, useState } from "react"
import { Trophy, Star, Gift } from 'lucide-react'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { supabase } from "@/lib/supabase"

interface Winner {
  id: string
  project: {
    id: string
    title: string
    description: string
    github_url: string
    demo_url: string | null
    participant: {
      participation_type: 'team' | 'solo'
      team?: {
        name: string
        description: string
      }
      user: {
        full_name: string
      }
    }
  }
  prize_type: 'main' | 'specific' | 'individual'
  prize_category: string | null
  prize_amount: number
}

export default function WinnersPage() {
  const [winners, setWinners] = useState<{
    main: Winner[]
    specific: Winner[]
    individual: Winner[]
  }>({
    main: [],
    specific: [],
    individual: []
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchWinners()
  }, [])

  const fetchWinners = async () => {
    try {
      const { data, error } = await supabase
        .from('prize_winners')
        .select(`
          id,
          prize_type,
          prize_category,
          prize_amount,
          project:project_id (
            id,
            title,
            description,
            github_url,
            demo_url,
            participant:participant_id (
              participation_type,
              team:team_id (
                name,
                description
              ),
              user:user_id (
                full_name
              )
            )
          )
        `)
        .order('prize_amount', { ascending: false })

      if (error) throw error

      const categorizedWinners = data.reduce((acc, winner) => ({
        ...acc,
        [winner.prize_type]: [...(acc[winner.prize_type] || []), winner]
      }), { main: [], specific: [], individual: [] })

      setWinners(categorizedWinners)
    } catch (error) {
      console.error('Error fetching winners:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#1B2228] flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-[#C1A461]" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#1B2228] p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-[#C1A461]">
            Hackathon Winners
          </h1>
          <p className="text-xl text-[#C1A461]/80">
            Congratulations to all winners!
          </p>
        </div>

        {/* Main Prizes */}
        {winners.main.length > 0 && (
          <section className="space-y-6">
            <h2 className="text-2xl font-bold text-[#C1A461] flex items-center gap-2">
              <Trophy className="w-6 h-6" />
              Main Prizes
            </h2>
            <div className="grid gap-6">
              {winners.main.map((winner, index) => (
                <Card key={winner.id} className="bg-[#1B2228] border-[#C1A461]/20">
                  <CardHeader>
                    <CardTitle className="flex justify-between items-center text-[#C1A461]">
                      <span>{index === 0 ? "1st Place" : index === 1 ? "2nd Place" : "3rd Place"}</span>
                      <span>€{winner.prize_amount.toLocaleString()}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h3 className="text-xl font-bold text-[#C1A461]">
                        {winner.project.title}
                      </h3>
                      <p className="text-[#C1A461]/80 mt-2">
                        {winner.project.description}
                      </p>
                      <div className="mt-4">
                        <p className="text-[#C1A461] font-semibold">
                          {winner.project.participant.participation_type === 'team' 
                            ? winner.project.participant.team?.name 
                            : winner.project.participant.user.full_name}
                        </p>
                      </div>
                      <div className="flex gap-4 mt-4">
                        <Button
                          onClick={() => window.open(winner.project.github_url, '_blank')}
                          className="bg-[#C1A461] hover:bg-[#C1A461]/90 text-[#1B2228]"
                        >
                          View Code
                        </Button>
                        {winner.project.demo_url && (
                          <Button
                            onClick={() => window.open(winner.project.demo_url!, '_blank')}
                            className="bg-[#C1A461] hover:bg-[#C1A461]/90 text-[#1B2228]"
                          >
                            View Demo
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* Specific Category Prizes */}
        {winners.specific.length > 0 && (
          <section className="space-y-6">
            <h2 className="text-2xl font-bold text-[#C1A461] flex items-center gap-2">
              <Star className="w-6 h-6" />
              Category Prizes
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {winners.specific.map((winner) => (
                <Card key={winner.id} className="bg-[#1B2228] border-[#C1A461]/20">
                  <CardHeader>
                    <CardTitle className="flex justify-between items-center text-[#C1A461]">
                      <span>{getCategoryTitle(winner.prize_category)}</span>
                      <span>€{winner.prize_amount.toLocaleString()}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h3 className="text-xl font-bold text-[#C1A461]">
                        {winner.project.title}
                      </h3>
                      <p className="text-[#C1A461]/80 mt-2">
                        {winner.project.description}
                      </p>
                      <div className="mt-4">
                        <p className="text-[#C1A461] font-semibold">
                          {winner.project.participant.team?.name}
                        </p>
                      </div>
                      <div className="flex gap-4 mt-4">
                        <Button
                          onClick={() => window.open(winner.project.github_url, '_blank')}
                          className="bg-[#C1A461] hover:bg-[#C1A461]/90 text-[#1B2228]"
                        >
                          View Code
                        </Button>
                        {winner.project.demo_url && (
                          <Button
                            onClick={() => window.open(winner.project.demo_url!, '_blank')}
                            className="bg-[#C1A461] hover:bg-[#C1A461]/90 text-[#1B2228]"
                          >
                            View Demo
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* Individual Hacker Prizes */}
        {winners.individual.length > 0 && (
          <section className="space-y-6">
            <h2 className="text-2xl font-bold text-[#C1A461] flex items-center gap-2">
              <Gift className="w-6 h-6" />
              Individual Hacker Prizes
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {winners.individual.map((winner) => (
                <Card key={winner.id} className="bg-[#1B2228] border-[#C1A461]/20">
                  <CardHeader>
                    <CardTitle className="flex justify-between items-center text-[#C1A461]">
                      <span>{winner.project.title}</span>
                      <span>€{winner.prize_amount.toLocaleString()}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="text-[#C1A461]/80">
                        {winner.project.description}
                      </p>
                      <div className="mt-4">
                        <p className="text-[#C1A461] font-semibold">
                          {winner.project.participant.user.full_name}
                        </p>
                      </div>
                      <div className="flex gap-4 mt-4">
                        <Button
                          onClick={() => window.open(winner.project.github_url, '_blank')}
                          className="bg-[#C1A461] hover:bg-[#C1A461]/90 text-[#1B2228]"
                        >
                          View Code
                        </Button>
                        {winner.project.demo_url && (
                          <Button
                            onClick={() => window.open(winner.project.demo_url!, '_blank')}
                            className="bg-[#C1A461] hover:bg-[#C1A461]/90 text-[#1B2228]"
                          >
                            View Demo
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* No Winners Yet */}
        {!winners.main.length && !winners.specific.length && !winners.individual.length && (
          <div className="text-center text-[#C1A461]/80">
            Winners have not been announced yet. Stay tuned!
          </div>
        )}
      </div>
    </div>
  )
}

function getCategoryTitle(category: string | null): string {
  switch (category) {
    case 'creative':
      return 'Most Creative Project'
    case 'ux':
      return 'Best User Experience'
    case 'code_quality':
      return 'Best Code Quality'
    case 'security':
      return 'Best Security Project'
    default:
      return 'Category Prize'
  }
}