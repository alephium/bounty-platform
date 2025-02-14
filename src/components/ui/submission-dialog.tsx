import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "./dialog"
import { Input } from "./input"
import { Textarea } from "./textarea"
import { Button } from "./button"
import { Label } from "./label"
import { toast } from "sonner"
import { handleBountySubmission } from '../../hooks/submissionHandlers'
import { Bounty } from '../../types/supabase'
import { Loader2 } from 'lucide-react'

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
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    submissionUrl: ''
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
    } catch {
      toast.error("Please enter a valid URL")
      return false
    }
    return true
  }

  const handleSubmit = async () => {
    if (!validateForm()) return

    setIsSubmitting(true)
    try {
      const result = await handleBountySubmission(
        bounty,
        userId,
        formData.submissionUrl,
        formData.title,
        formData.description
      )

      if (result.success) {
        toast.success("Submission successful!")
        onSubmissionComplete()
        onClose()
      } else {
        toast.error("Failed to submit. Please try again.")
      }
    } catch (error) {
      console.error('Error submitting:', error)
      toast.error("An error occurred. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-[#1B2228] border-[#C1A461]/20">
        <DialogHeader>
          <DialogTitle className="text-[#C1A461]">Submit Solution</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label className="text-[#C1A461]">Title</Label>
            <Input
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              placeholder="Enter submission title"
              className="bg-[#1B2228] border-[#C1A461]/20 text-[#C1A461]"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-[#C1A461]">Description</Label>
            <Textarea
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Describe your solution"
              className="bg-[#1B2228] border-[#C1A461]/20 text-[#C1A461]"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-[#C1A461]">Submission URL</Label>
            <Input
              value={formData.submissionUrl}
              onChange={(e) => setFormData(prev => ({ ...prev, submissionUrl: e.target.value }))}
              placeholder="https://github.com/your-repo"
              className="bg-[#1B2228] border-[#C1A461]/20 text-[#C1A461]"
            />
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={onClose}
            disabled={isSubmitting}
            className="border-[#C1A461]/20 text-[#C1A461]"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
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
      </DialogContent>
    </Dialog>
  )
}