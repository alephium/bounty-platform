import { useState } from 'react'
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter 
} from "./ui/dialog"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"
import { Button } from "./ui/button"
import { Label } from "./ui/label"
import { toast } from "sonner"
import { handleBountySubmission } from '../hooks/submissionHandlers'
import { Bounty } from '../types/supabase'
import { Loader2, X } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useUser } from '../contexts/UserContext'

interface SubmissionDialogProps {
  bounty: Bounty
  userId: string
  isOpen: boolean
  onClose: () => void
  onSubmissionComplete: () => void
}

export function SubmissionDialog({
  bounty,
  userId,
  isOpen,
  onClose,
  onSubmissionComplete
}: SubmissionDialogProps) {
  const navigate = useNavigate()
  const { user } = useUser() // Add this to get current user data
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    submissionUrl: '',
    tweetUrl: '',
  })

  const validateForm = () => {
    if (!formData.title.trim()) {
      toast.error("Please enter a title")
      return false
    }
    if (!formData.description.trim()) {
      toast.error("Please enter a description")
      return false
    }
    if (!formData.submissionUrl.trim()) {
      toast.error("Please provide a submission URL")
      return false
    }
    try {
      new URL(formData.submissionUrl)
      if (formData.tweetUrl && formData.tweetUrl.trim() !== '') {
        new URL(formData.tweetUrl)
      }
    } catch {
      toast.error("Please enter valid URLs")
      return false
    }
    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    setIsSubmitting(true)
    try {
      // Make sure the sponsor data is available in the bounty object
      if (!bounty.sponsor) {
        throw new Error("Sponsor information is missing. Please refresh the page.")
      }
      
      // Add timestamp to make each submission unique
      const timestamp = new Date().getTime()
      
      console.log("Starting submission process with data:", {
        bountyId: bounty.id,
        userId,
        title: formData.title
      });
      
      const result = await handleBountySubmission(
        bounty,
        userId,
        formData.submissionUrl + `?t=${timestamp}`, // Add timestamp to URL to make it unique
        formData.title,
        formData.tweetUrl || null,
        formData.description,
        user // Pass the full user object to include user details
      )
      
      if (result.success) {
        toast.success("Submission successful!")
        onSubmissionComplete()
        onClose()
      } else {
        // Handle specific error codes
        if (result.error && result.error.includes("row-level security policy")) {
          toast.error("Permission error. Please sign out and sign in again.")
          setTimeout(() => navigate('/auth'), 2000);
        } else if (result.error && result.error.includes("No active session found")) {
          toast.error("Your session has expired. Please sign in again.")
          setTimeout(() => navigate('/auth'), 2000);
        } else {
          throw new Error(result.error)
        }
      }
    } catch (error: any) {
      console.error('Submission process failed:', error)
      
      // More detailed error handling
      if (error.message && error.message.includes("row-level security policy")) {
        toast.error("Permission denied. Please sign out and sign in again to refresh your session.")
        setTimeout(() => navigate('/auth'), 2000);
      } else if (error.message && error.message.includes("No active session found")) {
        toast.error("Your session has expired. Please sign in again.")
        setTimeout(() => navigate('/auth'), 2000);
      } else {
        toast.error(error.message || "Failed to submit. Please try again.")
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  // Reset form data when dialog is closed
  const handleClose = () => {
    setFormData({
      title: '',
      description: '',
      submissionUrl: '',
      tweetUrl: '',
    })
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[600px] bg-[#1B2228] border-[#C1A461]/20">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-bold text-[#C1A461]">
              Submit Your Solution
            </DialogTitle>
            <Button
              variant="ghost"
              size="icon"
              className="text-[#C1A461]/60 hover:text-[#C1A461] hover:bg-[#C1A461]/10"
              onClick={handleClose}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <DialogDescription className="text-[#C1A461]/80">
            We can't wait to see what you've created!
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label className="text-[#C1A461]">
              Title <span className="text-red-500">*</span>
            </Label>
            <Input
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              placeholder="Enter submission title"
              className="bg-[#1B2228] border-[#C1A461]/20 text-[#C1A461]"
              required
            />
          </div>

          <div className="space-y-2">
            <Label className="text-[#C1A461]">
              Description <span className="text-red-500">*</span>
            </Label>
            <Textarea
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Describe your solution"
              className="min-h-[100px] bg-[#1B2228] border-[#C1A461]/20 text-[#C1A461]"
              required
            />
          </div>

          <div className="space-y-2">
            <Label className="text-[#C1A461]">
              Submission URL <span className="text-red-500">*</span>
            </Label>
            <div className="text-sm text-[#C1A461]/60 mb-2">
              Make sure this link is accessible by everyone!
            </div>
            <Input
              value={formData.submissionUrl}
              onChange={(e) => setFormData(prev => ({ ...prev, submissionUrl: e.target.value }))}
              placeholder="https://URL_ADDRESS"
              className="bg-[#1B2228] border-[#C1A461]/20 text-[#C1A461]"
              required
            />
          </div>

          <div className="space-y-2">
            <Label className="text-[#C1A461]">X Link</Label>
            <div className="text-sm text-[#C1A461]/60 mb-2">
              This helps sponsors discover (and maybe repost!) your work on social media!
            </div>
            <Input
              value={formData.tweetUrl}
              onChange={(e) => setFormData(prev => ({ ...prev, tweetUrl: e.target.value }))}
              placeholder="https://twitter.com/your-x"
              className="bg-[#1B2228] border-[#C1A461]/20 text-[#C1A461]"
            />
          </div>

          <DialogFooter className="pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isSubmitting}
              className="border-[#C1A461]/20 text-[#C1A461]"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-[#C1A461] hover:bg-[#C1A461]/90 text-[#1B2228]"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Submitting...
                </>
              ) : (
                'Submit'
              )}
            </Button>
          </DialogFooter>

          <div className="text-center text-sm text-[#C1A461]/60">
            By submitting this solution, you agree to our Terms of Use.
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}