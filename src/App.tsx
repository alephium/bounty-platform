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
import { Hackathon } from './pages/Hackathon'
import Profile from './pages/Profile'
import EditProfile from './pages/EditProfile'
import AuthPage from './pages/Auth'
import ProofofWork from './pages/ProofofWork'

// Protected Route wrapper component
const ProtectedRoute = ({ children, user, loading }) => {
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
    let mounted = true;
  
    const handleAuthChange = async (event, session) => {
      if (!mounted || !session?.user) {
        setUser(null);
        setLoading(false);
        return;
      }
  
      try {
        // First try to get existing user
        let userData = await UserService.getCurrentUser();
        
        // If no user exists, create one
        if (!userData) {
          userData = await UserService.createOrUpdateUser(session.user);
        }
  
        if (mounted) {
          setUser(userData);
          setLoading(false);
        }
      } catch (error) {
        console.error('Error handling auth change:', error);
        if (mounted) {
          setLoading(false);
        }
      }
    };
  
    // Set up auth listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(handleAuthChange);
  
    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  return (
    <UserProvider user={user} loading={loading}>
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
              
              {/* Profile routes with username parameter */}
              <Route 
                path="/profile" 
                element={
                  <ProtectedRoute user={user} loading={loading}>
                    <Profile />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/profile/:username" 
                element={<Profile />} 
              />

              {/* Protected routes */}
              <Route
                path="/editprofile"
                element={
                  <ProtectedRoute user={user} loading={loading}>
                    <EditProfile />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/proofofwork"
                element={
                  <ProtectedRoute user={user} loading={loading}>
                    <ProofofWork />
                  </ProtectedRoute>
                }
              />

              {/* Catch-all route for 404 */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </UserProvider>
  )
}

export default App