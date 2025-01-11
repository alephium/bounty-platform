import { supabase } from '../lib/supabase'
import { User } from '../types/supabase'

console.log("session!!!",supabase.auth.getSession());

export class UserService {
  static async getCurrentUser(): Promise<User | null> {
    try {
      // First check if we have a session
      const { data: { session }, error: sessionError } = await supabase.auth.getSession()
      if (sessionError) throw sessionError
      if (!session?.user) return null

      // Get the user data from our users table
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', session.user.id)
        .single()

        console.log(data)

      if (error) throw error
      return data
    } catch (error) {
      console.error('Error getting current user:', error)
      return null
    }
  }
  private static async generateUniqueUsername(fullName: string): Promise<string> {
    // Get first name and convert to lowercase
    const firstName = fullName.split(' ')[0].toLowerCase()
    // Remove special characters and spaces
    const baseUsername = firstName.replace(/[^a-z0-9]/g, '')
    
    let username = baseUsername
    let counter = 1

    while (true) {
      const { data: existingUser } = await supabase
        .from('users')
        .select('username')
        .eq('username', username)
        .single()

      if (!existingUser) break
      username = `${baseUsername}${counter}`
      counter++
    }

    return username
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

      // Generate username from full name
      const fullName = supabaseUser.user_metadata?.full_name || ''
      const username = await this.generateUniqueUsername(fullName)

      // Split full name into first and last name
      const nameParts = fullName.split(' ')
      const firstName = nameParts[0]
      const lastName = nameParts.slice(1).join(' ')

      // Only proceed to create if we definitely don't have a user
      const newUser: Partial<User> = {
        id: supabaseUser.id,
        email: supabaseUser.email,
        username,
        full_name: fullName,
        first_name: firstName,
        last_name: lastName,
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
    try {
      const { origin } = window.location
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${origin}`,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
          scopes: 'email profile',
        },
      })
      
      if (error) throw error
      return data
    } catch (error) {
      console.error('Error signing in with Google:', error)
      throw error
    }
  }
  static async signOut() {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      
      // Clear any local storage items related to auth
      window.localStorage.removeItem('contributium-auth')
      window.localStorage.removeItem('supabase.auth.token')
      
      return true
    } catch (error) {
      console.error('Error signing out:', error)
      throw error
    }
  }

  static async updateProfile(userId: string, updates: Partial<User>): Promise<User | null> {
    try {
      const { data, error } = await supabase
        .from('users')
        .update(updates)
        .eq('id', userId)
        .select()
        .single()

      if (error) throw error
      return data
    } catch (error) {
      console.error('Error updating profile:', error)
      return null
    }
  }

  static async isUsernameAvailable(username: string): Promise<boolean> {
    try {
      const { data: existingUser } = await supabase
        .from('users')
        .select('username')
        .eq('username', username)
        .single()

      return !existingUser
    } catch {
      return true // If there's an error, assume username is available
    }
  }
}