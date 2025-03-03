import { useEffect, useState } from 'react'
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
import supabase from '../supabase/index'

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
    submissionUrl: '',
    tweetUrl: '',
    additionalInfo: ''
  })
  // console.log("formData in submissiondiaxlog!!!", formData)
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
      if (formData.tweetUrl) {
        new URL(formData.tweetUrl)
      }
    } catch {
      toast.error("Please enter valid URLs")
      return false
    }
    return true
  }

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   if (!validateForm()) return;

  //   setIsSubmitting(true);
  //   try {
  //     const result = await handleBountySubmission(
  //       bounty,
  //       userId,
  //       formData.submissionUrl,
  //       formData.title,
  //       formData.description
  //     );

  //     if (result.success) {
  //       toast.success("Submission successful!");
  //       onSubmissionComplete();
  //       onClose();
  //     } else {
  //       throw new Error(result.error);
  //     }
  //   } catch (error: any) {
  //     console.error('Submission process failed:', error);
  //     toast.error(error.message || "Failed to submit. Please try again.");
  //   } finally {
  //     setIsSubmitting(false);
  //   }
  // };
  // Updated handleSubmit function
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Add this line to ensure the form isn't submitting normally
    console.log("Preventing default form submission");
    
    // Move the Supabase call to an immediately executed function to isolate it
    (async function() {
      try {
        console.log("Starting isolated supabase call");
        const { data: existingUser, error } = await supabase
          .from('users')
          .select('*')
          .eq('id', userId)
          .single();
        
        console.log('existingUser (in isolated call)', existingUser, error);
      } catch (innerError) {
        console.error('Inner error:', innerError);
      }
      console.log("End of isolated call");
    })();
    
    console.log("End of handleSubmit function");
  };

  useEffect(()=> {
    const user = async() => {
      const { data: existingUser, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', userId)
    .single()
    console.log('existingUser', existingUser)
    }
    console.log('user', user())
  }, [])

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
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
              onClick={onClose}
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
            <div className="flex">
              <Input
                value={formData.submissionUrl}
                onChange={(e) => setFormData(prev => ({ ...prev, submissionUrl: e.target.value }))}
                placeholder="https://github.com/your-repo"
                className="rounded-l-none bg-[#1B2228] border-[#C1A461]/20 text-[#C1A461]"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-[#C1A461]">X Link</Label>
            <div className="text-sm text-[#C1A461]/60 mb-2">
              This helps sponsors discover (and maybe repost!) your work on social media!
            </div>
            <div className="flex">
              <Input
                value={formData.tweetUrl}
                onChange={(e) => setFormData(prev => ({ ...prev, tweetUrl: e.target.value }))}
                placeholder="https://twitter.com/your-x"
                className="rounded-l-none bg-[#1B2228] border-[#C1A461]/20 text-[#C1A461]"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-[#C1A461]">Additional Information</Label>
            <div className="text-sm text-[#C1A461]/60 mb-2">
              If you have any other links or information you'd like to share, please add them here!
            </div>
            <Input
              value={formData.additionalInfo}
              onChange={(e) => setFormData(prev => ({ ...prev, additionalInfo: e.target.value }))}
              placeholder="Add info or link"
              className="bg-[#1B2228] border-[#C1A461]/20 text-[#C1A461]"
            />
          </div>

          <DialogFooter className="pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
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