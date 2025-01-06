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

  // if (loading) {
  //   return <div className="min-h-screen bg-[#1B2228] flex items-center justify-center">
  //     <div className="text-[#C1A461]">Loading...</div>
  //   </div>
  // }

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
          </Route>
        </Routes>
      </BrowserRouter>
    </UserProvider>
  )
}

export default App

// import { BrowserRouter, Routes, Route } from 'react-router-dom'
// import Layout from './components/Layout'
// import Home from './pages/Home' // Remove curly braces
// import { Bounties } from './pages/Bounties'
// import { Projects } from './pages/Projects'
// import { Grants } from './pages/Grants'


// const App = () => {
//   return (
//     <BrowserRouter>
//       <Layout>
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/bounties" element={<Bounties />} />
//           <Route path="/projects" element={<Projects />} />
//           <Route path="/grants" element={<Grants />} />
//         </Routes>
//       </Layout>
//     </BrowserRouter>
//   )
// }

// export default App