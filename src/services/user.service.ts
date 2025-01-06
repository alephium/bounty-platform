import { supabase } from '../lib/supabase'
import { User } from '../types/supabase'

export const userService = {
  getCurrentUser: async () => {
    const { data: { user } } = await supabase.auth.getUser()
    return user
  },

  updateProfile: async (userId: string, updates: Partial<User>) => {
    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', userId)
      .single()
    
    if (error) throw error
    return data
  }
}