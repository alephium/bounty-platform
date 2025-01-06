import { useState } from 'react'
import { Button } from "../components/ui/button"
import { Card, CardContent } from "../components/ui/card"
import { Separator } from "../components/ui/separator"
import { Mail } from 'lucide-react'
import { Link } from "react-router-dom"
import { UserService } from '../services/user.service'
import { useNavigate } from 'react-router-dom'

export default function AuthPage() {
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true)
      const { error } = await UserService.signInWithGoogle()
      if (error) throw error
      
      // Supabase will automatically redirect to your app after successful sign in
      // You can handle the session in your App.tsx or a layout component
    } catch (error) {
      console.error('Error signing in with Google:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-4">
      <Card className="w-full max-w-md bg-gray-800/50 border-amber-500/20">
        <CardContent className="p-8 space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-bold text-[#C1A461]">
              Set Sail on Your Journey
            </h1>
            <p className="text-[#C1A461]/60">
              Your treasure awaits in global bounty lands
            </p>
          </div>

          <div className="space-y-4">
            <Button 
              className="w-full bg-amber-500 hover:bg-amber-600 text-gray-900 flex items-center justify-center gap-2"
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

            {/* Rest of your UI remains the same */}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
