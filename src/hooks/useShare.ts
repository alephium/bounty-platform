import { useState } from 'react'
import { toast } from '../components/ui/use-toast'

function useShare() {
  const [isSharing, setIsSharing] = useState(false)

  const handleShare = async (title: string, url: string) => {
    setIsSharing(true)
    try {
      // Check if Web Share API is supported
      if (navigator.share) {
        await navigator.share({
          title,
          url
        })
        toast({
          description: "Successfully shared!",
          duration: 2000
        })
      } else {
        // Fallback to clipboard
        await navigator.clipboard.writeText(url)
        toast({
          description: "Link copied to clipboard!",
          duration: 2000
        })
      }
    } catch (error) {
      // Handle specific errors
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          // User cancelled the share operation
          return
        }
        if (error.name === 'NotAllowedError') {
          toast({
            variant: "destructive",
            description: "Permission denied for sharing",
            duration: 3000
          })
          return
        }
      }
      // Fallback error message
      toast({
        variant: "destructive",
        description: "Failed to share. Please try copying the URL manually.",
        duration: 3000
      })
    } finally {
      setIsSharing(false)
    }
  }

  return {
    isSharing,
    handleShare
  }
}

export default useShare