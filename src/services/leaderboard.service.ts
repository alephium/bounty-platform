import { supabase } from '../lib/supabase'
import { User } from '../types/supabase'

export interface LeaderboardEntry {
  user: User
  totalSubmissions: number
  acceptedSubmissions: number
  totalEarnings: number
  completionRate: number
  rank: number
  recentActivity: string
}

export interface LeaderboardStats {
  totalUsers: number
  totalSubmissions: number
  totalEarnings: number
  activeUsers: number
}

export class LeaderboardService {
  static async getLeaderboard(limit: number = 100): Promise<LeaderboardEntry[]> {
    try {
      // Get user submission stats
      const { data: submissionStats, error: submissionError } = await supabase
        .from('bounty_submissions')
        .select(`
          user_id,
          status,
          reward,
          created_at,
          user:users(*)
        `)
        .order('created_at', { ascending: false })

      if (submissionError) throw submissionError

      // Group submissions by user
      const userStatsMap = new Map<string, {
        user: User
        totalSubmissions: number
        acceptedSubmissions: number
        totalEarnings: number
        recentActivity: string
      }>()

      submissionStats?.forEach(submission => {
        const userId = submission.user_id
        const user = submission.user

        if (!user) return

        if (!userStatsMap.has(userId)) {
          userStatsMap.set(userId, {
            user,
            totalSubmissions: 0,
            acceptedSubmissions: 0,
            totalEarnings: 0,
            recentActivity: submission.created_at
          })
        }

        const userStats = userStatsMap.get(userId)!
        userStats.totalSubmissions++
        
        if (submission.status === 'accepted') {
          userStats.acceptedSubmissions++
          userStats.totalEarnings += submission.reward?.usd_equivalent || 0
        }

        // Update recent activity to most recent
        if (new Date(submission.created_at) > new Date(userStats.recentActivity)) {
          userStats.recentActivity = submission.created_at
        }
      })

      // Convert to leaderboard entries and calculate completion rates
      const leaderboardEntries: LeaderboardEntry[] = Array.from(userStatsMap.values())
        .map(stats => ({
          ...stats,
          completionRate: stats.totalSubmissions > 0 ? 
            (stats.acceptedSubmissions / stats.totalSubmissions) * 100 : 0,
          rank: 0 // Will be set after sorting
        }))
        .sort((a, b) => {
          // Sort by total earnings first, then by completion rate, then by total submissions
          if (b.totalEarnings !== a.totalEarnings) {
            return b.totalEarnings - a.totalEarnings
          }
          if (b.completionRate !== a.completionRate) {
            return b.completionRate - a.completionRate
          }
          return b.totalSubmissions - a.totalSubmissions
        })
        .slice(0, limit)
        .map((entry, index) => ({
          ...entry,
          rank: index + 1
        }))

      return leaderboardEntries
    } catch (error) {
      console.error('Error fetching leaderboard:', error)
      return []
    }
  }

  static async getLeaderboardStats(): Promise<LeaderboardStats> {
    try {
      const [usersResult, submissionsResult, earningsResult] = await Promise.all([
        // Total users
        supabase
          .from('users')
          .select('id', { count: 'exact', head: true }),
        
        // Total submissions
        supabase
          .from('bounty_submissions')
          .select('id', { count: 'exact', head: true }),
        
        // Total earnings (accepted submissions)
        supabase
          .from('bounty_submissions')
          .select('reward')
          .eq('status', 'accepted')
      ])

      const totalUsers = usersResult.count || 0
      const totalSubmissions = submissionsResult.count || 0
      
      const totalEarnings = earningsResult.data?.reduce((sum, submission) => {
        return sum + (submission.reward?.usd_equivalent || 0)
      }, 0) || 0

      // Active users (users with submissions in last 30 days)
      const thirtyDaysAgo = new Date()
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
      
      const { data: activeSubmissions } = await supabase
        .from('bounty_submissions')
        .select('user_id')
        .gte('created_at', thirtyDaysAgo.toISOString())

      const activeUsers = new Set(activeSubmissions?.map(s => s.user_id)).size

      return {
        totalUsers,
        totalSubmissions,
        totalEarnings,
        activeUsers
      }
    } catch (error) {
      console.error('Error fetching leaderboard stats:', error)
      return {
        totalUsers: 0,
        totalSubmissions: 0,
        totalEarnings: 0,
        activeUsers: 0
      }
    }
  }

  static async getUserRank(userId: string): Promise<number> {
    try {
      const leaderboard = await this.getLeaderboard(1000) // Get more entries to find rank
      const userEntry = leaderboard.find(entry => entry.user.id === userId)
      return userEntry?.rank || 0
    } catch (error) {
      console.error('Error fetching user rank:', error)
      return 0
    }
  }
}