import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster, toast } from 'react-hot-toast';
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
import { CreateSponsorProfile } from './pages/CreateSponsorProfile'
import { PostListing } from './pages/PostListing'
import SponsorDashboard from './pages/SponsorDashboard'
import OnboardingSteps from './pages/Sponsor'
import MySubmission from './pages/MySubmission'
import SponsorProfile from './pages/SponsorProfile'
import Leaderboard from './pages/Leaderboard'
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
          {/* <Toaster position='top-right' /> */}
          <Toaster
            position="top-center"
            toastOptions={{
              className: 'toast-theme',
              style: {
                padding: '16px 24px',
                borderRadius: '8px',
                fontSize: '16px',
                maxWidth: '400px',
                textAlign: 'center',
              },
            }}
          />
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/auth" element={<AuthPage />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/sponsor" element={<OnboardingSteps />} />
              <Route path="/sponsor/dashboard" element={<SponsorDashboard />} />
              <Route path="/sponsor/:id" element={<SponsorProfile />} />
              <Route path="/bounties" element={<Bounties />} />
              <Route path="/postlisting" element={<PostListing />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/grants" element={<Grants />} />
              <Route path="/leaderboard" element={<Leaderboard />} />
              <Route path="/mysubmission" element={<MySubmission />} />
              <Route path="/editprofile" element={<EditProfile />} />
              <Route path="/profile/:username" element={<Profile />} />
              <Route path="/bounty/:id" element={<BountyDetail />} />
              <Route path="/editbounty" element={<EditBounty />} />
              <Route path="/editbounty/:id" element={<EditBounty />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </UserProvider>
  )
}