import { createContext, useContext, useEffect, useState } from "react"
import { supabase } from "../lib/supabase"
import { UserService } from "../services/user.service"
import { User } from "../types/supabase"
import LoadingPage from "../pages/LoadingPage"

interface UserContextValue {
  user: User | null
}

const UserContext = createContext<UserContextValue>({
  user: null
})

export const useUser = () => {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error("useUser must be used within a UserProvider")
  }
  return context
}

interface UserProviderProps {
  children: React.ReactNode
  initialUser: User | null
}

export function UserProvider({ children, initialUser }: UserProviderProps) {
  const [user, setUser] = useState<User | null>(initialUser)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let mounted = true

    // Handle auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (!mounted) return

        try {
          if (event === 'SIGNED_OUT') {
            setUser(null)
            return
          }

          if (!session?.user) {
            setUser(null)
            return
          }

          // Get or create user
          let userData = await UserService.getCurrentUser()
          if (!userData) {
            userData = await UserService.createOrUpdateUser(session.user)
          }

          setUser(userData)
        } catch (error) {
          console.error('Auth state change error:', error)
          setUser(null)
        } finally {
          setIsLoading(false)
        }
      }
    )

    // Initial session check
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!mounted) return

      if (session?.user) {
        UserService.getCurrentUser().then(userData => {
          if (mounted) {
            setUser(userData)
            setIsLoading(false)
          }
        })
      } else {
        setIsLoading(false)
      }
    })

    return () => {
      mounted = false
      subscription.unsubscribe()
    }
  }, [])

  if (isLoading) {
    return <LoadingPage />
  }

  return (
    <UserContext.Provider value={{ user }}>
      {children}
    </UserContext.Provider>
  )
}