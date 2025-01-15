// hooks/useHackathonParticipation.ts
import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { HackathonParticipant, Team } from '../types/supabase'

export function useHackathonParticipation(userId: string) {
  const [participation, setParticipation] = useState<HackathonParticipant | null>(null)
  const [team, setTeam] = useState<Team | null>(null)
  const [loading, setLoading] = useState(true)

  // Fetch current participation
  const fetchParticipation = async () => {
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
        .single()

      if (error) throw error

      setParticipation(data)
      setTeam(data?.team)
    } catch (error) {
      console.error('Error fetching participation:', error)
    } finally {
      setLoading(false)
    }
  }

  // Create team participation
  const createTeam = async (name: string, description: string) => {
    try {
      // Create team with the current user as member1
      const { data: teamData, error: teamError } = await supabase
        .from('teams')
        .insert([{ 
          name, 
          description, 
          status: 'active',
          member1: userId,
          member2: null,
          member3: null,
          member4: null,
          member5: null
        }])
        .select()
        .single()

      if (teamError) {
        console.error('Team creation error:', teamError)
        throw teamError
      }

      // Create participation
      const { data: participationData, error: participationError } = await supabase
        .from('hackathon_participants')
        .insert([{
          user_id: userId,
          team_id: teamData.id,
          participation_type: 'team'
        }])
        .select()
        .single()

      if (participationError) {
        console.error('Participation error:', participationError)
        throw participationError
      }

      await fetchParticipation()
      return true
    } catch (error) {
      console.error('Error creating team:', error)
      return false
    }
  }

  // Register as solo
  const registerAsSolo = async () => {
    try {
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
      return false
    }
  }

  // Leave team or withdraw from solo participation
  const leaveParticipation = async () => {
    try {
      // Delete participation record
      const { error } = await supabase
        .from('hackathon_participants')
        .delete()
        .eq('user_id', userId)

      if (error) throw error

      // If this was a team member and they were member1 (team leader), delete the team
      if (team && team.member1 === userId) {
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
      return false
    }
  }

  useEffect(() => {
    if (userId) {
      fetchParticipation()
    }
  }, [userId])

  const addTeamMember = async (username: string) => {
    try {
      // First find the user by username
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('id')
        .eq('username', username)
        .single()

      if (userError || !userData) {
        throw new Error('User not found')
      }

      // Check if user is already in a team
      const { data: existingParticipation, error: participationError } = await supabase
        .from('hackathon_participants')
        .select('id')
        .eq('user_id', userData.id)
        .single()

      if (existingParticipation) {
        throw new Error('User is already participating in the hackathon')
      }

      if (!team) {
        throw new Error('No team found')
      }

      // Find first available member slot
      const memberSlot = !team.member2 ? 'member2'
        : !team.member3 ? 'member3'
        : !team.member4 ? 'member4'
        : !team.member5 ? 'member5'
        : null

      if (!memberSlot) {
        throw new Error('Team is already full')
      }

      // Update team with new member
      const { error: updateError } = await supabase
        .from('teams')
        .update({ [memberSlot]: userData.id })
        .eq('id', team.id)

      if (updateError) throw updateError

      // Create participation record for new member
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
    } catch (error: any) {
      console.error('Error adding team member:', error)
      throw error
    }
  }

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