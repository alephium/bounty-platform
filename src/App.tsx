import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { supabase } from './lib/supabase'
import { UserService } from './services/user.service'
import { User } from './types/supabase'
import { UserProvider } from './contexts/UserContext'
import Layout from './components/Layout'
import Home from './pages/Home'
import { Bounties } from './pages/Bounties'
import { Projects } from './pages/Projects'
import { Grants } from './pages/Grants'
import Profile from './pages/Profile'
import EditProfile from './pages/EditProfile'
import AuthPage from './pages/Auth'

const App = () => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check for initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        UserService.createOrUpdateUser(session.user)
          .then(userData => setUser(userData))
      }
      setLoading(false)
    })

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        const userData = await UserService.createOrUpdateUser(session.user)
        setUser(userData)
      } else {
        setUser(null)
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  return (
    <UserProvider user={user} loading={loading}>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/" element={<Home />} />
            <Route path="/bounties" element={<Bounties />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/grants" element={<Grants />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/editprofile" element={<EditProfile />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </UserProvider>
  )
}

export default App