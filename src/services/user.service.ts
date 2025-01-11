import { supabase } from '../lib/supabase'
import { User } from '../types/supabase'

export class UserService {
  static async getCurrentUser(): Promise<User | null> {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return null

    const { data } = await supabase
      .from('users')
      .select('*')
      .eq('id', user.id)
      .single()

    return data
  }

  static async createOrUpdateUser(supabaseUser: any): Promise<User | null> {
    try {
      const { data: existingUser, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', supabaseUser.id)
        .single()

      console.log("Fetch result:", { existingUser, error })  // Safe debugging

      if (existingUser) {
        return existingUser
      }

      // Only proceed to create if we definitely don't have a user
      const newUser: Partial<User> = {
        id: supabaseUser.id,
        email: supabaseUser.email,
        full_name: supabaseUser.user_metadata?.full_name,
        avatar_url: supabaseUser.user_metadata?.avatar_url,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }

      const { data, error: insertError } = await supabase
        .from('users')
        .insert([newUser])
        .select()
        .single()

      if (insertError) throw insertError
      return data
    } catch (error) {
      console.error('Error in createOrUpdateUser:', error)
      return null
    }
  }

  static async signInWithGoogle() {
    const redirectTo = `${window.location.origin}`
    
    return supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo,
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        },
        scopes: 'email profile',
      },
    })
  }

  static async signOut() {
    return supabase.auth.signOut()
  }
}
