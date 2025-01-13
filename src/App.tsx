import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { supabase } from './lib/supabase'
import { UserService } from './services/user.service'
import { User } from './types/supabase'
import { UserProvider } from './contexts/UserContext'
import { ThemeProvider } from './contexts/ThemeContext'
import Layout from './components/Layout'
import Home from './pages/Home'
import { Bounties } from './pages/Bounties'
import { Projects } from './pages/Projects'
import { Grants } from './pages/Grants'
import Hackathon from './pages/Hackathon'
import Prize  from './pages/Prize'
import Profile from './pages/Profile'
import Submit from './pages/Submit'
import { EditProfile } from './pages/EditProfile'
import AuthPage from './pages/Auth'

interface ProtectedRouteProps {
  children: React.ReactNode
  user: User | null
  loading: boolean
}

const ProtectedRoute = ({ children, user, loading }: ProtectedRouteProps) => {
  if (loading) {
    return (
      <div className="min-h-screen bg-[#1B2228] flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-[#C1A461]" />
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/auth" replace />
  }

  return children
}

const App = () => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            {/* Public routes */}
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/" element={<Home />} />
            <Route path="/bounties" element={<Bounties />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/grants" element={<Grants />} />
            <Route path="/hackathon" element={<Hackathon />} />
            <Route path="/editprofile" element={<EditProfile />} />
            <Route path="/hackathon/prize" element={<Prize />} />
            <Route path="/hackathon/submit" element={<Submit />} />
            <Route path="/profile/:username" element={<Profile />} />
            {/* Catch-all route for 404 */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App