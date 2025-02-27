import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { UserService } from './services/user.service'
import { User } from './types/supabase'
import { UserProvider } from './contexts/UserContext'
import { ThemeProvider } from './contexts/ThemeContext'
import Layout from './components/Layout'
import LoadingPage from './pages/LoadingPage'
import Home from './pages/Home'
import { Bounties } from './pages/Bounties'
import Projects from './pages/Projects'
import Grants from './pages/Grants'
import Profile from './pages/Profile'
import { EditProfile } from './pages/EditProfile'
import AuthPage from './pages/Auth'
import EditBounty from './pages/EditBounty'
import BountyDetail from './pages/BountyDetail'
import Terms from './pages/Terms'
import Privacy from './pages/Privacy'
import { PostListing } from './components/PostListing'
import OnboardingSteps from './pages/Sponsor'
import SponsorDashboard from './pages/SponsorDashboard'
import { useUser } from './contexts/UserContext'
import { supabase } from './lib/supabase'


function SponsorRoute() {
  const { user } = useUser()
  const [loading, setLoading] = useState(true)
  const [hasSponsorProfile, setHasSponsorProfile] = useState(false)

  useEffect(() => {
    const checkSponsorProfile = async () => {
      if (!user?.id) return

      try {
        const { data } = await supabase
          .from('sponsors')
          .select('id')
          .eq('user_id', user.id)
          .single()

        setHasSponsorProfile(!!data)
      } catch (error) {
        console.error('Error checking sponsor profile:', error)
      } finally {
        setLoading(false)
      }
    }

    checkSponsorProfile()
  }, [user])

  if (loading) {
    return <LoadingPage />
  }

  return hasSponsorProfile ? <Navigate to="/sponsor/dashboard" replace /> : <OnboardingSteps />
}

export default function App() {
  const [initialUser, setInitialUser] = useState<User | null>(null)
  const [initializing, setInitializing] = useState(true)

  useEffect(() => {
    UserService.getCurrentUser()
      .then(setInitialUser)
      .catch(console.error)
      .finally(() => setInitializing(false))
  }, [])

  if (initializing) {
    return <LoadingPage />
  }

  return (
    <UserProvider initialUser={initialUser}>
      <ThemeProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/auth" element={<AuthPage />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/sponsor" element={<OnboardingSteps />} />
              <Route path="/sponsor/dashboard" element={<SponsorDashboard />} />
              <Route path="/bounties" element={<Bounties />} />
              {/* <Route path="/bounties/publisher" element={<BountyPublischer />} /> */}
              <Route path="/PostListing" element={<PostListing />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/grants" element={<Grants />} />
              <Route path="/editprofile" element={<EditProfile />} />
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