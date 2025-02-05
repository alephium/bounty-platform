import { useState } from 'react'
import { Button } from "../components/ui/button"
import { Card, CardContent } from "../components/ui/card"
import { Separator } from "../components/ui/separator"
import { Mail } from 'lucide-react'
import { Link } from "react-router-dom"
import { UserService } from '../services/user.service'
import { useNavigate } from 'react-router-dom'
import { useTheme } from '../contexts/ThemeContext'
import { toast } from '../components/ui/use-toast'
import { supabase } from '../lib/supabase'

export default function AuthPage() {
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const { theme } = useTheme()

  // Theme-specific styles
  const bgColor = theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'
  const cardBg = theme === 'dark' ? 'bg-gray-800/50' : 'bg-white'
  const textColor = theme === 'dark' ? 'text-[#C1A461]' : 'text-gray-900'
  const mutedTextColor = theme === 'dark' ? 'text-[#C1A461]/60' : 'text-gray-500'
  const borderColor = theme === 'dark' ? 'border-amber-500/20' : 'border-amber-200'
  const buttonClass = theme === 'dark' 
    ? 'bg-amber-500 hover:bg-amber-600 text-gray-900' 
    : 'bg-amber-500 hover:bg-amber-600 text-white'

  const handleGoogleSignIn = async () => {
    // console.log('trigger')
    const { origin } = window.location
    try {
      setIsLoading(true)
      await supabase.auth.signInWithOAuth({
        provider: 'google',
      options: {
        redirectTo: `${origin}/auth/callback`,
        queryParams: {
          access_type: 'offline',
          prompt: 'consent'
        }
      }
      })
    } catch (error) {
      console.error('Error signing in with Google:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={`min-h-screen ${bgColor} flex flex-col items-center justify-center p-4`}>
      <Card className={`w-full max-w-md ${cardBg} ${borderColor}`}>
        <CardContent className="p-8 space-y-6">
          <div className="text-center space-y-2">
            <h1 className={`text-2xl font-bold ${textColor}`}>
              Set Sail on Your Journey
            </h1>
            <p className={mutedTextColor}>
              Your treasure awaits in global $ALPH bounty lands
            </p>
          </div>

          <div className="space-y-4">
            <Button 
              className={`w-full ${buttonClass} flex items-center justify-center gap-2`}
              size="lg"
              onClick={handleGoogleSignIn}
              disabled={isLoading}
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              {isLoading ? 'Loading...' : 'Continue with Google'}
            </Button>

            <div className="flex items-center gap-2">
              <Separator className={theme === 'dark' ? 'bg-amber-500/20' : 'bg-amber-200'} />
              <span className={mutedTextColor}>or</span>
              <Separator className={theme === 'dark' ? 'bg-amber-500/20' : 'bg-amber-200'} />
            </div>

            {/* <Button
              variant="outline"
              className={`w-full ${borderColor} ${textColor} 
                ${theme === 'dark' ? 'hover:bg-amber-500/20' : 'hover:bg-amber-50'}`}
              size="lg"
              onClick={() => navigate('/auth/email')}
            >
              <Mail className="w-5 h-5 mr-2" />
              Continue with Email
            </Button> */}

            <p className={`text-center text-sm ${mutedTextColor}`}>
              By continuing, you agree to our{' '}
              <Link to="/terms" className={`${textColor} hover:underline`}>
                Terms of Service
              </Link>
              {' '}and{' '}
              <Link to="/privacy" className={`${textColor} hover:underline`}>
                Privacy Policy
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}