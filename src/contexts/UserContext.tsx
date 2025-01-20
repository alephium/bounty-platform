import { createContext, useContext, ReactNode, useEffect, useState } from 'react'
import { User } from '../types/supabase'
import { UserService } from '../services/user.service'
import { supabase } from '../lib/supabase'

interface UserContextType {
  user: User | null
  loading: boolean
  refreshUser: () => Promise<void>
  signInWithEmail: (email: string, password: string) => Promise<{ 
    success: boolean
    error: string | null 
  }>
}

const UserContext = createContext<UserContextType | undefined>(undefined)

interface UserProviderProps {
  children: ReactNode
  initialUser: User | null
}

export function UserProvider({ children, initialUser }: UserProviderProps) {
  const [user, setUser] = useState<User | null>(initialUser)
  const [loading, setLoading] = useState(false)

  const refreshUser = async () => {
    try {
      setLoading(true)
      const userData = await UserService.getCurrentUser()
      
      if (userData) {
        setUser(userData)
      } else {
        console.warn('No user data found during refresh')
        setUser(null)
      }
    } catch (error) {
      console.error('Error refreshing user:', error)
      setUser(null)
    } finally {
      setLoading(false)
    }
  }

  const signInWithEmail = async (email: string, password: string) => {
    try {
      setLoading(true)
      const { data, error } = await UserService.signInWithEmail(email, password)
      
      if (error) throw error
      
      // Refresh user data after successful sign-in
      if (data?.user) {
        await refreshUser()
      }
      
      return { success: true, error: null }
    } catch (error) {
      console.error('Error signing in with email:', error)
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'An error occurred during sign in' 
      }
    } finally {
      setLoading(false)
    }
  }

  // Handle auth state changes
  useEffect(() => {
    let mounted = true

    const handleAuthChange = async (event: string, session: any) => {
      if (!mounted) return

      console.log('Auth event:', event)
      
      switch (event) {
        case 'SIGNED_IN':
        case 'USER_UPDATED':
        case 'TOKEN_REFRESHED':
          await refreshUser()
          break
        case 'SIGNED_OUT':
          setUser(null)
          break
        default:
          break
      }
    }

    // Set up auth listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(handleAuthChange)

    // Initial session check
    const checkInitialSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (session?.user && mounted) {
        await refreshUser()
      }
    }
    
    checkInitialSession()

    // Cleanup
    return () => {
      mounted = false
      subscription.unsubscribe()
    }
  }, [])

  const contextValue: UserContextType = {
    user,
    loading,
    refreshUser,
    signInWithEmail
  }

  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context
}