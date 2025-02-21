import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from './ui/dialog'
import { Button } from './ui/button'
import { Textarea } from './ui/textarea'
import { Label } from './ui/label'

interface FeedbackDialogProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (feedback: string) => void
  title: string
  action: string
}

export function FeedbackDialog({
  isOpen,
  onClose,
  onSubmit,
  title,
  action
}: FeedbackDialogProps) {
  const [feedback, setFeedback] = useState('')

  const handleSubmit = () => {
    onSubmit(feedback)
    setFeedback('')
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-[#1B2228] border-[#C1A461]/20">
        <DialogHeader>
          <DialogTitle className="text-[#C1A461]">{title}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label className="text-[#C1A461]">Feedback</Label>
            <Textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Provide feedback to the submitter..."
              className="bg-[#1B2228] border-[#C1A461]/20 text-[#C1A461]"
              required
            />
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={onClose}
            className="border-[#C1A461]/20 text-[#C1A461]"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            className="bg-[#C1A461] hover:bg-[#C1A461]/90 text-[#1B2228]"
          >
            {action}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}