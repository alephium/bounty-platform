import { supabase } from '../lib/supabase'
import { User } from '../types/supabase'

export class UserService {
  static async getCurrentUser(): Promise<User | null> {
    try {
      const { data: { session } } = await supabase.auth.getSession()
      console.log("getCurrentUser session:", session?.user?.id)

      if (!session?.user?.id) {
        console.log("No valid session")
        return null
      }

      // Short timeout for database query
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Database timeout')), 3000)
      );

      const queryPromise = supabase
        .from('users')
        .select('*')
        .eq('id', session.user.id)
        .single();

      const { data, error } = await Promise.race([queryPromise, timeoutPromise])
        .catch(error => {
          console.error("Query error:", error);
          return { data: null, error };
        });

      if (error) {
        console.error("Database error:", error);
        return null;
      }

      return data;
    } catch (error) {
      console.error('Error in getCurrentUser:', error);
      return null;
    }
  }

  static async createOrUpdateUser(authUser: any): Promise<User | null> {
    try {
      console.log("Creating/updating user:", authUser.id);

      const newUser: Partial<User> = {
        id: authUser.id,
        email: authUser.email,
        username: await this.generateUniqueUsername(authUser.user_metadata?.full_name || ''),
        full_name: authUser.user_metadata?.full_name || '',
        avatar_url: authUser.user_metadata?.avatar_url,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      const { data, error } = await supabase
        .from('users')
        .upsert([newUser])
        .select()
        .single();

      if (error) {
        console.error("Error creating user:", error);
        return null;
      }

      return data;
    } catch (error) {
      console.error('Error in createOrUpdateUser:', error);
      return null;
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