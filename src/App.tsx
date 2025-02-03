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
import Projects from './pages/Projects'
import Grants from './pages/Grants'
// import Hackathon from './pages/Hackathon'
// import Prize  from './pages/Prize'
import Profile from './pages/Profile'
// import Submit from './pages/Submit'
import { EditProfile } from './pages/EditProfile'
import AuthPage from './pages/Auth'
import EditBounty from './pages/EditBounty'
import BountyDetail from './pages/BountyDetail'
import LoadingPage from './pages/LoadingPage'
import Terms from './pages/Terms'
import Privacy from './pages/Privacy'

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

  useEffect(() => {
    const initUser = async () => {
      const currentUser = await UserService.getCurrentUser()
      setUser(currentUser)
      setLoading(false)
    }
    initUser()
  }, [])

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <UserProvider initialUser={user}>
      <ThemeProvider>
        <BrowserRouter>
          <Routes>
          {/* <Route path="/hackathon/prize" element={<Prize />} /> */}
            <Route element={<Layout />}>
              {/* Public routes */}
              <Route path="/auth" element={<AuthPage />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/" element={<Home />} />
              <Route path="/bounties" element={<Bounties />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/grants" element={<Grants />} />
              {/* <Route path="/hackathon" element={<Hackathon />} /> */}
              <Route path="/editprofile" element={<EditProfile />} />
              <Route path="/loading" element={<LoadingPage />} />
              {/* <Route path="/hackathon/submit" element={<Submit />} /> */}
              <Route path="/profile/:username" element={<Profile />} />
              <Route path="/bounty/:id" element={<BountyDetail />} />
              <Route path="/editbounty" element={<EditBounty />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </UserProvider>
  )
}

export default App