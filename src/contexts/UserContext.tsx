import { createContext, useContext, ReactNode } from 'react'
import { User } from '../types/supabase'

interface UserContextType {
  user: User | null
  loading: boolean
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export function UserProvider({ 
  children,
  user,
  loading
}: { 
  children: ReactNode
  user: User | null
  loading: boolean
}) {
  return (
    <UserContext.Provider value={{ user, loading }}>
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