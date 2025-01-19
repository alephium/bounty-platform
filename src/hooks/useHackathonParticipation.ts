import { useState, useEffect, useCallback } from 'react'
import { supabase } from '../lib/supabase'
import { HackathonParticipant, Team } from '../types/supabase'

export function useHackathonParticipation(userId: string) {
  const [participation, setParticipation] = useState<HackathonParticipant | null>(null)
  const [team, setTeam] = useState<Team | null>(null)
  const [loading, setLoading] = useState(true)

  // Fetch current participation
  const fetchParticipation = useCallback(async () => {
    if (!userId) {
      setLoading(false)
      return
    }

    let mounted = true
    setLoading(true)

    try {
      const { data, error } = await supabase
        .from('hackathon_participants')
        .select(`
          *,
          team:team_id (
            id,
            name,
            description,
            status,
            member1,
            member2,
            member3,
            member4,
            member5,
            created_at,
            updated_at
          )
        `)
        .eq('user_id', userId)
        .maybeSingle()

      if (error) throw error

      if (mounted) {
        setParticipation(data || null)
        setTeam(data?.team || null)
      }
    } catch (error) {
      console.error('Error fetching participation:', error)
      if (mounted) {
        setParticipation(null)
        setTeam(null)
      }
    } finally {
      if (mounted) {
        setLoading(false)
      }
    }

    return () => {
      mounted = false
    }
  }, [userId])

  useEffect(() => {
    const cleanup = fetchParticipation()
    return () => {
      cleanup?.then(cleanupFn => cleanupFn?.())
    }
  }, [fetchParticipation])

  const createTeam = async (name: string, description: string) => {
    try {
      const { data: existingParticipation } = await supabase
        .from('hackathon_participants')
        .select('id')
        .eq('user_id', userId)
        .maybeSingle()

      if (existingParticipation) {
        throw new Error('You are already participating in the hackathon')
      }

      const { data: teamData, error: teamError } = await supabase
        .from('teams')
        .insert([{ 
          name, 
          description, 
          status: 'active',
          member1: userId,
        }])
        .select()
        .single()

      if (teamError) throw teamError

      const { error: participationError } = await supabase
        .from('hackathon_participants')
        .insert([{
          user_id: userId,
          team_id: teamData.id,
          participation_type: 'team'
        }])

      if (participationError) throw participationError

      await fetchParticipation()
      return true
    } catch (error) {
      console.error('Error creating team:', error)
      throw error
    }
  }

  const registerAsSolo = async () => {
    try {
      const { data: existingParticipation } = await supabase
        .from('hackathon_participants')
        .select('id')
        .eq('user_id', userId)
        .maybeSingle()

      if (existingParticipation) {
        throw new Error('You are already participating in the hackathon')
      }

      const { error } = await supabase
        .from('hackathon_participants')
        .insert([{
          user_id: userId,
          participation_type: 'solo'
        }])

      if (error) throw error

      await fetchParticipation()
      return true
    } catch (error) {
      console.error('Error registering as solo:', error)
      throw error
    }
  }

  const leaveParticipation = async () => {
    if (!participation) return false

    try {
      const { error } = await supabase
        .from('hackathon_participants')
        .delete()
        .eq('user_id', userId)

      if (error) throw error

      if (team?.member1 === userId) {
        const { error: teamError } = await supabase
          .from('teams')
          .delete()
          .eq('id', team.id)

        if (teamError) throw teamError
      }

      setParticipation(null)
      setTeam(null)
      return true
    } catch (error) {
      console.error('Error leaving participation:', error)
      throw error
    }
  }

  const addTeamMember = useCallback(async (username: string) => {
    if (!team) throw new Error('No team found')

    try {
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('id')
        .eq('username', username)
        .maybeSingle()

      if (userError || !userData) {
        throw new Error('User not found')
      }

      const { data: existingParticipation } = await supabase
        .from('hackathon_participants')
        .select('id')
        .eq('user_id', userData.id)
        .maybeSingle()

      if (existingParticipation) {
        throw new Error('User is already participating in the hackathon')
      }

      const memberSlot = !team.member2 ? 'member2'
        : !team.member3 ? 'member3'
        : !team.member4 ? 'member4'
        : !team.member5 ? 'member5'
        : null

      if (!memberSlot) {
        throw new Error('Team is already full')
      }

      await supabase.auth.getSession()

      const { error: updateError } = await supabase
        .from('teams')
        .update({ [memberSlot]: userData.id })
        .eq('id', team.id)

      if (updateError) throw updateError

      const { error: addError } = await supabase
        .from('hackathon_participants')
        .insert([{
          user_id: userData.id,
          team_id: team.id,
          participation_type: 'team'
        }])

      if (addError) throw addError

      await fetchParticipation()
      return true
    } catch (error) {
      console.error('Error adding team member:', error)
      throw error
    }
  }, [team, fetchParticipation])

  return {
    participation,
    team,
    loading,
    createTeam,
    registerAsSolo,
    leaveParticipation,
    addTeamMember,
    refresh: fetchParticipation
  }
}