import { supabase } from '../lib/supabase'
import { User } from '../types/supabase'

export class UserService {
  static async getCurrentUser(): Promise<User | null> {
    try {
      // Get current session
      const { data: { session } } = await supabase.auth.getSession()
      console.log("1111", session)
      if (!session?.user) return null

      // Get user data from users table
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', session.user.id)
        .single()

      if (error) throw error
      return data
    } catch (error) {
      console.error('Error getting current user:', error)
      return null
    }
  }

  static async createOrUpdateUser(authUser: any): Promise<User | null> {
    try {
      // Check if user exists
      console.log("22222 ", authUser)
      const { data: existingUser } = await supabase
        .from('users')
        .select('*')
        .eq('id', authUser.id)
        .single()

      if (existingUser) return existingUser

      // Create new user if doesn't exist
      const newUser: Partial<User> = {
        id: authUser.id,
        email: authUser.email,
        username: await this.generateUniqueUsername(authUser.user_metadata?.full_name || ''),
        full_name: authUser.user_metadata?.full_name || '',
        avatar_url: authUser.user_metadata?.avatar_url,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }

      const { data, error } = await supabase
        .from('users')
        .insert([newUser])
        .select()
        .single()

      if (error) throw error
      return data
    } catch (error) {
      console.error('Error in createOrUpdateUser:', error)
      return null
    }
  }

  private static async generateUniqueUsername(fullName: string): Promise<string> {
    const baseUsername = fullName.split(' ')[0].toLowerCase().replace(/[^a-z0-9]/g, '')
    let username = baseUsername
    let counter = 1

    while (true) {
      const { data } = await supabase
        .from('users')
        .select('username')
        .eq('username', username)
        .single()

      if (!data) break
      username = `${baseUsername}${counter++}`
    }

    return username
  }

  static async signInWithGoogle() {
    const { origin } = window.location
    console.log(origin)
    return supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${origin}/auth/callback`,
        queryParams: {
          access_type: 'offline',
          prompt: 'consent'
        }
      }
    })
  }

  static async signOut() {
    return supabase.auth.signOut()
  }
}