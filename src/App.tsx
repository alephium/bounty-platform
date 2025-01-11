import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
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
              <Route path="/auth" element={<AuthPage />} />
              <Route path="/" element={<Home />} />
              <Route path="/bounties" element={<Bounties />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/grants" element={<Grants />} />
              <Route path="/hackathon" element={<Hackathon />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/editprofile" element={<EditProfile />} />
              <Route path="/proofofwork" element={<ProofofWork />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </UserProvider>
  )
}

export default App