import { supabase } from '@/lib/supabase'
import type { Bounty, BountySubmission } from '@/types/supabase'

export class BountyService {
  static async createBounty(bountyData: Partial<Bounty>) {
    const { data, error } = await supabase
      .from('bounties')
      .insert([bountyData])
      .select()
      .single()

    if (error) throw error
    return data
  }

  static async updateBounty(id: string, updates: Partial<Bounty>) {
    const { data, error } = await supabase
      .from('bounties')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data
  }

  static async updateBountyStatus(id: string, status: 'open' | 'in_review' | 'completed') {
    return this.updateBounty(id, { status })
  }

  static async getBounty(id: string) {
    const { data, error } = await supabase
      .from('bounties')
      .select(`
        *,
        submissions:bounty_submissions(*)
      `)
      .eq('id', id)
      .single()

    if (error) throw error
    return data
  }

  static async listBounties(filters = {}) {
    const { data, error } = await supabase
      .from('bounties')
      .select('*')
      .match(filters)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data
  }

  static async submitBounty(submission: Partial<BountySubmission>) {
    const { data, error } = await supabase
      .from('bounty_submissions')
      .insert([submission])
      .select()
      .single()

    if (error) throw error
    return data
  }

  static async updateSubmissionStatus(
    submissionId: string,
    status: 'in_review' | 'accepted' | 'rejected',
    feedback?: string
  ) {
    const { data, error } = await supabase
      .from('bounty_submissions')
      .update({ 
        status,
        feedback,
        updated_at: new Date().toISOString()
      })
      .eq('id', submissionId)
      .select()
      .single()

    if (error) throw error
    return data
  }

  static async getBountySubmissions(bountyId: string) {
    const { data, error } = await supabase
      .from('bounty_submissions')
      .select(`
        *,
        user:users(id, username, full_name, avatar_url)
      `)
      .eq('bounty_id', bountyId)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data
  }

  static async updateSubmissionCount(bountyId: string) {
    const { count, error: countError } = await supabase
      .from('bounty_submissions')
      .select('*', { count: 'exact', head: true })
      .eq('bounty_id', bountyId)

    if (countError) throw countError

    const { data, error } = await supabase
      .from('bounties')
      .update({ current_submissions: count || 0 })
      .eq('id', bountyId)
      .select()
      .single()

    if (error) throw error
    return data
  }
}