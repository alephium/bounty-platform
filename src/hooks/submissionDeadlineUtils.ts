import { useState, useEffect } from 'react'

const DEADLINE = new Date('2025-02-01T17:00:00') // February 1, 2025, 5:00 PM

export function useSubmissionDeadline() {
  const [isAfterDeadline, setIsAfterDeadline] = useState(false)
  const [timeRemaining, setTimeRemaining] = useState('')

  useEffect(() => {
    function updateDeadlineStatus() {
      const now = new Date()
      setIsAfterDeadline(now > DEADLINE)
      
      if (now < DEADLINE) {
        const diff = DEADLINE.getTime() - now.getTime()
        
        const days = Math.floor(diff / (1000 * 60 * 60 * 24))
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
        
        setTimeRemaining(`${days}d ${hours}h ${minutes}m`)
      } else {
        setTimeRemaining('Deadline passed')
      }
    }

    updateDeadlineStatus()
    const interval = setInterval(updateDeadlineStatus, 60000) // Update every minute
    
    return () => clearInterval(interval)
  }, [])

  return { isAfterDeadline, timeRemaining, deadline: DEADLINE }
}