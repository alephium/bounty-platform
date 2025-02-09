import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import type { BountySubmission, ProjectSubmission, Notification } from '@/types/supabase'

export function useSubmissions(sponsorId: string) {
  const [loading, setLoading] = useState(true)
  const [bountySubmissions, setBountySubmissions] = useState<BountySubmission[]>([])
  const [projectSubmissions, setProjectSubmissions] = useState<ProjectSubmission[]>([])
  const [notifications, setNotifications] = useState<Notification[]>([])

  useEffect(() => {
    async function fetchSubmissions() {
      try {
        setLoading(true)
        
        // Fetch bounty submissions
        const { data: bountyData } = await supabase
          .from('bounty_submissions')
          .select(`
            *,
            bounty:bounties(title, sponsor_id),
            user:users(full_name, avatar_url)
          `)
          .eq('bounty.sponsor_id', sponsorId)
          .order('created_at', { ascending: false })

        // Fetch project submissions
        const { data: projectData } = await supabase
          .from('project_submissions')
          .select(`
            *,
            project:projects(title, sponsor_id),
            user:users(full_name, avatar_url)
          `)
          .eq('project.sponsor_id', sponsorId)
          .order('created_at', { ascending: false })

        // Fetch notifications
        const { data: notificationData } = await supabase
          .from('notifications')
          .select('*')
          .eq('sponsor_id', sponsorId)
          .order('created_at', { ascending: false })

        if (bountyData) setBountySubmissions(bountyData)
        if (projectData) setProjectSubmissions(projectData)
        if (notificationData) setNotifications(notificationData)
      } catch (error) {
        console.error('Error fetching submissions:', error)
      } finally {
        setLoading(false)
      }
    }

    if (sponsorId) {
      fetchSubmissions()
    }
  }, [sponsorId])

  return {
    loading,
    bountySubmissions,
    projectSubmissions,
    notifications,
  }
}