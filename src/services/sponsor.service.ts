import { supabase } from '../lib/supabase'
import { Sponsor, SponsorInsert } from '../types/supabase'

export class SponsorService {
  static async createSponsor(data: Omit<SponsorInsert, 'user_id'>): Promise<Sponsor | null> {
    try {
      // Get the current user's ID
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        throw new Error('No authenticated user')
      }

      const { data: sponsor, error } = await supabase
        .from('sponsors')
        .insert([{
          ...data,
          user_id: user.id,
          is_verified: false,
        }])
        .select()
        .single()

      if (error) throw error
      return sponsor
    } catch (error) {
      console.error('Error creating sponsor:', error)
      return null
    }
  }

  static async uploadLogo(file: File, sponsorId: string): Promise<string | null> {
    try {
      const fileExt = file.name.split('.').pop()
      const fileName = `${sponsorId}-logo.${fileExt}`
      const filePath = `sponsor-logos/${fileName}`

      const { error: uploadError } = await supabase.storage
        .from('public')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: true
        })

      if (uploadError) throw uploadError

      const { data: { publicUrl } } = supabase.storage
        .from('public')
        .getPublicUrl(filePath)

      return publicUrl
    } catch (error) {
      console.error('Error uploading logo:', error)
      return null
    }
  }

  static async updateSponsor(sponsorId: string, updates: Partial<Sponsor>): Promise<Sponsor | null> {
    try {
      const { data, error } = await supabase
        .from('sponsors')
        .update({
          ...updates,
          updated_at: new Date().toISOString()
        })
        .eq('id', sponsorId)
        .select()
        .single()

      if (error) throw error
      return data
    } catch (error) {
      console.error('Error updating sponsor:', error)
      return null
    }
  }

  static async getSponsor(sponsorId: string): Promise<Sponsor | null> {
    try {
      const { data, error } = await supabase
        .from('sponsors')
        .select('*')
        .eq('id', sponsorId)
        .single()

      if (error) throw error
      return data
    } catch (error) {
      console.error('Error getting sponsor:', error)
      return null
    }
  }

  static async getCurrentUserSponsor(): Promise<Sponsor | null> {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) return null

      const { data, error } = await supabase
        .from('sponsors')
        .select('*')
        .eq('user_id', user.id)
        .single()

      if (error) throw error
      return data
    } catch (error) {
      console.error('Error getting current user sponsor:', error)
      return null
    }
  }
}