import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export interface RewardsMetrics {
  totalOpenRewards: number
  availableQuests: number
  distributedRewards: number
  activeRewards: number
  totalBounties: number
  activeBounties: number
  completedBounties: number
}

export function useRewards() {
  const [metrics, setMetrics] = useState<RewardsMetrics>({
    totalOpenRewards: 0,
    availableQuests: 0,
    distributedRewards: 0,
    activeRewards: 0,
    totalBounties: 0,
    activeBounties: 0,
    completedBounties: 0
  })
  const [loading, setLoading] = useState(true)

  async function fetchMetrics() {
    try {
      const { data: bounties, error: bountiesError } = await supabase
        .from('bounties')
        .select('status, reward')

      if (bountiesError) throw bountiesError

      let totalOpenRewards = 0
      let distributedRewards = 0
      let activeRewards = 0
      let completedCount = 0
      let activeCount = 0
      let availableQuests = 0

      bounties?.forEach(bounty => {
        const rewardAmount = bounty.reward.usd_equivalent || bounty.reward.amount

        if (bounty.status === 'open') {
          totalOpenRewards += rewardAmount
          availableQuests++
          activeCount++
          activeRewards += rewardAmount
        } else if (bounty.status === 'in_review') {
          activeCount++
          activeRewards += rewardAmount
        } else if (bounty.status === 'completed') {
          distributedRewards += rewardAmount
          completedCount++
        }
      })

      setMetrics({
        totalOpenRewards,
        availableQuests,
        distributedRewards,
        activeRewards,
        totalBounties: bounties?.length || 0,
        activeBounties: activeCount,
        completedBounties: completedCount
      })
    } catch (error) {
      console.error('Error fetching metrics:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMetrics()

    // Subscribe to bounties table changes
    const subscription = supabase
      .channel('bounties_changes')
      .on('postgres_changes', 
        { 
          event: '*', 
          schema: 'public', 
          table: 'bounties' 
        }, 
        () => {
          fetchMetrics()
        }
      )
      .subscribe()

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  return {
    metrics,
    loading,
    refreshMetrics: fetchMetrics
  }
}