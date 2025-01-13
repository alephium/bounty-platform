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
    try {
      setIsLoading(true)
      const { error } = await UserService.signInWithGoogle()
      
      if (error) {
        toast({
          variant: "destructive",
          description: "Failed to sign in with Google. Please try again.",
          duration: 3000
        })
        throw error
      }
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
          {/* Rest of your component JSX remains the same */}
        </CardContent>
      </Card>
    </div>
  )
}