import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUser } from '../contexts/UserContext'
import { useTheme } from '../contexts/ThemeContext'
import { Button } from "../components/ui/button"
import { UserSubmissions } from "../components/UserSubmissions"
import { ArrowLeft } from 'lucide-react'

export default function MySubmissionsPage() {
  const { user } = useUser()
  const { theme } = useTheme()
  const navigate = useNavigate()


  useEffect(() => {
    // Redirect to login if no user
    if (!user) {
      navigate('/auth')
    }
  }, [user, navigate])

  if (!user) {
    return null // or a loading indicator
  }

  return (
    <div className={`min-h-screen bg-theme-primary`}>
      <div className="container mx-auto py-8 px-4">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <Button 
              variant="ghost" 
              className={`text-theme-primary mr-2`}
              onClick={() => navigate('/profile/' + user.username)}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Profile
            </Button>
          </div>
          <Button 
            onClick={() => navigate('/bounties')}
            className="btn-theme-primary"
          >
            Explore Bounties
          </Button>
        </div>
        
        <div className="mb-6">
          <h1 className={`text-3xl font-bold text-theme-primary font-sentient`}>My Submissions</h1>
          <p className="text-theme-muted">Track and manage all your bounty and project submissions</p>
        </div>
        
        {/* Submissions List */}
        <UserSubmissions />
      </div>
    </div>
  )
}