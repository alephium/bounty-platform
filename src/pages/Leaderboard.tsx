import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Trophy, Medal, Award, TrendingUp, Users, DollarSign, Target, Crown } from 'lucide-react'
import { useTheme } from '@/contexts/ThemeContext'
import { useUser } from '@/contexts/UserContext'
import { LeaderboardService, LeaderboardEntry, LeaderboardStats } from '@/services/leaderboard.service'
import LoadingPage from './LoadingPage'

export default function Leaderboard() {
  const { theme } = useTheme()
  const { user } = useUser()
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([])
  const [stats, setStats] = useState<LeaderboardStats>({
    totalUsers: 0,
    totalSubmissions: 0,
    totalEarnings: 0,
    activeUsers: 0
  })
  const [loading, setLoading] = useState(true)
  const [userRank, setUserRank] = useState(0)
  const [selectedPeriod, setSelectedPeriod] = useState('all')

  const bgColor = theme === 'dark' ? 'bg-[#1B2228]' : 'bg-white'
  const textColor = theme === 'dark' ? 'text-[#C1A461]' : 'text-gray-900'
  const borderColor = theme === 'dark' ? 'border-[#C1A461]/20' : 'border-amber-200'
  const mutedTextColor = theme === 'dark' ? 'text-[#C1A461]/60' : 'text-gray-600'
  const cardBg = theme === 'dark' ? 'bg-gray-800/50' : 'bg-white'

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const [leaderboardData, statsData] = await Promise.all([
          LeaderboardService.getLeaderboard(50),
          LeaderboardService.getLeaderboardStats()
        ])
        
        setLeaderboard(leaderboardData)
        setStats(statsData)
        
        // Get current user's rank if logged in
        if (user) {
          const rank = await LeaderboardService.getUserRank(user.id)
          setUserRank(rank)
        }
      } catch (error) {
        console.error('Error fetching leaderboard data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [user])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    })
  }

  const getInitials = (name: string | null) => {
    if (!name) return 'U'
    return name.split(' ').map(part => part[0]).join('').toUpperCase().slice(0, 2)
  }

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="w-5 h-5 text-yellow-500" />
      case 2:
        return <Medal className="w-5 h-5 text-gray-400" />
      case 3:
        return <Award className="w-5 h-5 text-amber-600" />
      default:
        return <span className={`font-bold ${textColor}`}>#{rank}</span>
    }
  }

  const getRankBadgeColor = (rank: number) => {
    switch (rank) {
      case 1:
        return 'bg-yellow-500/20 text-yellow-500 border-yellow-500/20'
      case 2:
        return 'bg-gray-400/20 text-gray-400 border-gray-400/20'
      case 3:
        return 'bg-amber-600/20 text-amber-600 border-amber-600/20'
      default:
        return theme === 'dark' ? 
          'bg-[#C1A461]/20 text-[#C1A461] border-[#C1A461]/20' : 
          'bg-amber-100 text-amber-700 border-amber-200'
    }
  }

  if (loading) {
    return <LoadingPage />
  }

  return (
    <div className={`min-h-screen ${bgColor} w-full px-4`}>
      <div className="max-w-7xl mx-auto py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className={`text-3xl font-bold ${textColor} flex items-center gap-2`}>
              <Trophy className="w-8 h-8" />
              Leaderboard
            </h1>
            <p className={`${mutedTextColor} mt-2`}>
              Top performers in the Contribium community
            </p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className={`${cardBg} ${borderColor}`}>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-full ${theme === 'dark' ? 'bg-[#C1A461]/20' : 'bg-amber-100'}`}>
                  <Users className={`w-5 h-5 ${textColor}`} />
                </div>
                <div>
                  <p className={`text-2xl font-bold ${textColor}`}>
                    {stats.totalUsers.toLocaleString()}
                  </p>
                  <p className={`text-sm ${mutedTextColor}`}>Total Users</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className={`${cardBg} ${borderColor}`}>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-full ${theme === 'dark' ? 'bg-[#C1A461]/20' : 'bg-amber-100'}`}>
                  <Target className={`w-5 h-5 ${textColor}`} />
                </div>
                <div>
                  <p className={`text-2xl font-bold ${textColor}`}>
                    {stats.totalSubmissions.toLocaleString()}
                  </p>
                  <p className={`text-sm ${mutedTextColor}`}>Total Submissions</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className={`${cardBg} ${borderColor}`}>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-full ${theme === 'dark' ? 'bg-[#C1A461]/20' : 'bg-amber-100'}`}>
                  <DollarSign className={`w-5 h-5 ${textColor}`} />
                </div>
                <div>
                  <p className={`text-2xl font-bold ${textColor}`}>
                    ${stats.totalEarnings.toLocaleString()}
                  </p>
                  <p className={`text-sm ${mutedTextColor}`}>Total Earnings</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className={`${cardBg} ${borderColor}`}>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-full ${theme === 'dark' ? 'bg-[#C1A461]/20' : 'bg-amber-100'}`}>
                  <TrendingUp className={`w-5 h-5 ${textColor}`} />
                </div>
                <div>
                  <p className={`text-2xl font-bold ${textColor}`}>
                    {stats.activeUsers.toLocaleString()}
                  </p>
                  <p className={`text-sm ${mutedTextColor}`}>Active Users</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* User's Rank (if logged in) */}
        {user && userRank > 0 && (
          <Card className={`${cardBg} ${borderColor} mb-6`}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={user.avatar_url || undefined} />
                    <AvatarFallback>{getInitials(user.full_name)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className={`font-semibold ${textColor}`}>Your Rank</h3>
                    <p className={`text-sm ${mutedTextColor}`}>{user.full_name || user.username}</p>
                  </div>
                </div>
                <Badge variant="outline" className={getRankBadgeColor(userRank)}>
                  #{userRank}
                </Badge>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Leaderboard */}
        <Card className={`${cardBg} ${borderColor}`}>
          <CardHeader>
            <CardTitle className={`${textColor} flex items-center gap-2`}>
              <Trophy className="w-5 h-5" />
              Top Contributors
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="space-y-2">
              {leaderboard.map((entry, index) => (
                <div
                  key={entry.user.id}
                  className={`flex items-center justify-between p-4 hover:bg-opacity-50 transition-colors
                    ${index < 3 ? 'bg-gradient-to-r from-amber-500/5 to-transparent' : ''}
                    ${theme === 'dark' ? 'hover:bg-[#C1A461]/5' : 'hover:bg-amber-50'}`}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-8 flex justify-center">
                      {getRankIcon(entry.rank)}
                    </div>
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={entry.user.avatar_url || undefined} />
                      <AvatarFallback>{getInitials(entry.user.full_name)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <Link 
                          to={`/profile/${entry.user.username}`}
                          className={`font-semibold ${textColor} hover:underline`}
                        >
                          {entry.user.full_name || entry.user.username}
                        </Link>
                        {entry.user.username && (
                          <span className={`text-sm ${mutedTextColor}`}>
                            @{entry.user.username}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-4 text-sm">
                        <span className={mutedTextColor}>
                          {entry.totalSubmissions} submissions
                        </span>
                        <span className={mutedTextColor}>
                          {entry.completionRate.toFixed(1)}% success rate
                        </span>
                        <span className={mutedTextColor}>
                          Last active: {formatDate(entry.recentActivity)}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`font-bold ${textColor}`}>
                      ${entry.totalEarnings.toLocaleString()}
                    </div>
                    <div className={`text-sm ${mutedTextColor}`}>
                      {entry.acceptedSubmissions} accepted
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {leaderboard.length === 0 && (
          <Card className={`${cardBg} ${borderColor} mt-8`}>
            <CardContent className="p-8 text-center">
              <Trophy className={`w-16 h-16 ${mutedTextColor} mx-auto mb-4`} />
              <h3 className={`text-lg font-semibold ${textColor} mb-2`}>
                No Data Yet
              </h3>
              <p className={`${mutedTextColor} mb-4`}>
                The leaderboard will populate as users complete bounties and earn rewards.
              </p>
              <Button 
                asChild 
                className={theme === 'dark' ? 
                  'bg-[#C1A461] hover:bg-[#C1A461]/90 text-[#1B2228]' : 
                  'bg-amber-500 hover:bg-amber-600 text-white'}
              >
                <Link to="/bounties">View Bounties</Link>
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}