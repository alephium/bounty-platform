import { supabase } from '../lib/supabase'
import { User } from '../types/supabase'

export class UserService {
  static async getCurrentUser(): Promise<User | null> {
    try {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session?.user) return null

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

  private static async generateUniqueUsername(fullName: string): Promise<string> {
    const firstName = fullName.split(' ')[0].toLowerCase()
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

  static async signInWithGoogle() {
    const { origin } = window.location
    return supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${origin}/auth/callback`,
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        },
        scopes: 'email profile',
      },
    })
  }

  static async signInWithGithub() {
    const { origin } = window.location
    return supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: `${origin}/auth/callback`,
        scopes: 'user:email',
      },
    })
  }

  // static async signInWithTwitter() {
  //   const { origin } = window.location
  //   return supabase.auth.signInWithOAuth({
  //     provider: 'twitter',
  //     options: {
  //       redirectTo: `${origin}/auth/callback`,
  //     },
  //   })
  // }

  static async createOrUpdateUser(supabaseUser: any): Promise<User | null> {
    try {
      const { data: existingUser, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', supabaseUser.id)
        .single()

      if (existingUser) {
        return existingUser
      }

      // Get user metadata based on provider
      const { user_metadata } = supabaseUser
      const fullName = user_metadata?.full_name || 
                      user_metadata?.name ||
                      user_metadata?.user_name ||
                      ''
      
      const username = await this.generateUniqueUsername(fullName)

      // Split full name into first and last name
      const nameParts = fullName.split(' ')
      const firstName = nameParts[0]
      const lastName = nameParts.slice(1).join(' ')

      const newUser: Partial<User> = {
        id: supabaseUser.id,
        email: supabaseUser.email,
        username,
        full_name: fullName,
        first_name: firstName,
        last_name: lastName,
        avatar_url: user_metadata?.avatar_url,
        github_url: user_metadata?.user_name ? `https://github.com/${user_metadata.user_name}` : null,
        twitter_url: user_metadata?.user_name ? `https://twitter.com/${user_metadata.user_name}` : null,
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

  static async signOut() {
    return supabase.auth.signOut()
  }

  static async isUsernameAvailable(username: string): Promise<boolean> {
    const { data } = await supabase
      .from('users')
      .select('username')
      .eq('username', username)
      .single()
    
    return !data
  }

  static async updateProfile(userId: string, updates: Partial<User>): Promise<User | null> {
    try {
      const { data, error } = await supabase
        .from('users')
        .update(updates)
        .eq('id', userId)
        .select()
        .single()
  
      if (error) {
        console.error('Supabase error:', error)
        throw new Error(error.message)
      }
      
      if (!data) {
        throw new Error('No data returned from update operation')
      }
  
      return data
    } catch (error) {
      console.error('Error in updateProfile:', error)
      throw error // Re-throw to be handled by the component
    }
  }
}