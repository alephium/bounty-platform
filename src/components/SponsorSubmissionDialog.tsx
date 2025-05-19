import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Check, Copy, ExternalLink, CheckCircle, XCircle } from 'lucide-react'
import { useTheme } from '@/contexts/ThemeContext'
import { supabase } from '@/lib/supabase'
import { toast } from 'sonner'
import { BountySubmission } from '@/types/supabase'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

interface SponsorSubmissionDialogProps {
  isOpen: boolean
  onClose: () => void
  submission: BountySubmission | null
  onStatusUpdate: (submissionId: string, status: 'accepted' | 'rejected', feedback?: string) => Promise<void>
  onRefresh: () => void
}

export function SponsorSubmissionDialog({
  isOpen,
  onClose,
  submission,
  onStatusUpdate,
  onRefresh
}: SponsorSubmissionDialogProps) {
  const { theme } = useTheme()
  const [feedback, setFeedback] = useState('')
  const [rewardAmount, setRewardAmount] = useState('')
  const [transactionHash, setTransactionHash] = useState('')
  const [showWalletCopied, setShowWalletCopied] = useState(false)

  // Theme-specific styles
  const bgColor = theme === 'dark' ? 'bg-[#1B2228]' : 'bg-white'
  const textColor = theme === 'dark' ? 'text-[#C1A461]' : 'text-gray-900'
  const borderColor = theme === 'dark' ? 'border-[#C1A461]/20' : 'border-amber-200'
  const mutedTextColor = theme === 'dark' ? 'text-[#C1A461]/60' : 'text-gray-600'

  useEffect(() => {
    if (submission) {
      setFeedback(submission.feedback || '')
      setRewardAmount(submission.reward.amount.toString() || '')
      setTransactionHash(submission.transaction_hash || '')
    }
  }, [submission])

  // Helper function to get initials from username
  const getInitials = (username: string): string => {
    if (!username) return '?'
    return username.split('').slice(0, 2).join('').toUpperCase()
  }

  // Helper function to format date
  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
  }

  const copyWalletAddress = (address: string) => {
    navigator.clipboard.writeText(address)
    setShowWalletCopied(true)
    setTimeout(() => setShowWalletCopied(false), 2000)
    toast.success('Wallet address copied')
  }

  const saveRewardAmount = async (submissionId: string) => {
    if (!rewardAmount.trim()) return
    
    try {
      const { error } = await supabase
        .from('bounty_submissions')
        .update({
          reward: {
            amount: parseFloat(rewardAmount),
            token: 'ALPH',
            usd_equivalent: parseFloat(rewardAmount)
          }
        })
        .eq('id', submissionId)

      if (error) throw error
      
      toast.success('Reward amount updated')
      onRefresh()
    } catch (error) {
      console.error('Error updating reward amount:', error)
      toast.error('Failed to update reward amount')
    }
  }

  const saveTransactionHash = async (submissionId: string) => {
    if (!transactionHash.trim()) return
    
    try {
      const { error } = await supabase
        .from('bounty_submissions')
        .update({
          transaction_hash: transactionHash.trim()
        })
        .eq('id', submissionId)

      if (error) throw error
      
      toast.success('Transaction hash saved')
      onRefresh()
    } catch (error) {
      console.error('Error saving transaction hash:', error)
      toast.error('Failed to save transaction hash')
    }
  }

  if (!submission) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={`sm:max-w-[600px] ${bgColor} border-${borderColor}`}>
        <DialogHeader>
          <DialogTitle className={textColor}>Submission Details</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 mt-2">
          <div className="flex items-center gap-4">
            <Link to={`/profile/${submission.user_username}`}>
              <Avatar>
                <AvatarImage src={submission.user_avatar_url || undefined} />
                <AvatarFallback className="bg-[#C1A461]/20 text-[#C1A461]">
                  {getInitials(submission.user_username || "?")}
                </AvatarFallback>
              </Avatar>
            </Link>
            <div>
              <h3 className={`font-medium ${textColor}`}>
                {submission.title || 'No Title'}
              </h3>
              <p className={`text-sm ${mutedTextColor}`}>
                Submitted on {formatDate(submission.created_at)}
              </p>
            </div>
            <Badge 
              variant="outline" 
              className={
                submission.status === 'accepted' ? 'ml-auto bg-green-500/20 text-green-500' :
                submission.status === 'rejected' ? 'ml-auto bg-red-500/20 text-red-500' :
                submission.status === 'in_review' ? 'ml-auto bg-blue-500/20 text-blue-500' :
                'ml-auto bg-yellow-500/20 text-yellow-500'
              }
            >
              {submission.status}
            </Badge>
          </div>
          
          <div className="space-y-4">
            <div>
              <h4 className={`font-medium ${textColor}`}>Bounty</h4>
              <p className={textColor}>{submission.bounty_name || "Unknown Bounty"}</p>
            </div>
            
            <div>
              <h4 className={`font-medium ${textColor}`}>Title</h4>
              <p className={textColor}>{submission.title}</p>
            </div>
            
            <div>
              <h4 className={`font-medium ${textColor}`}>Description</h4>
              <p className={`whitespace-pre-wrap ${textColor}`}>{submission.description}</p>
            </div>
            
            {/* Wallet Address Section */}
            <div>
              <h4 className={`font-medium ${textColor} mb-2`}>User Wallet Address</h4>
              <div className="flex items-center gap-2">
                <div className={`flex-1 p-2 rounded border ${borderColor} bg-[#1B2228]/80 font-mono text-sm ${textColor}`}>
                  {submission.user_wallet_address || "No wallet address provided"}
                </div>
                {submission.user_wallet_address && (
                  <Button
                    variant="outline"
                    size="icon"
                    className={`border-${borderColor} ${textColor} hover:bg-[#C1A461]/10`}
                    onClick={() => copyWalletAddress(submission.user_wallet_address)}
                  >
                    {showWalletCopied ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </Button>
                )}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <h4 className={`font-medium ${textColor}`}>Reward Amount (USD)</h4>
                {submission.status === 'accepted' && submission.reward.amount > 0 && (
                  <Badge variant="outline" className="bg-[#C1A461]/10 text-[#C1A461]">
                    ${submission.reward.amount}
                  </Badge>
                )}
              </div>
              <div className="flex gap-2">
                <Input
                  type="number"
                  value={rewardAmount}
                  onChange={(e) => setRewardAmount(e.target.value)}
                  placeholder="Enter amount in USD"
                  className={`${bgColor} border-${borderColor} ${textColor}`}
                />
                <Button
                  variant="outline"
                  className={`border-${borderColor} ${textColor} hover:bg-[#C1A461]/10`}
                  onClick={() => saveRewardAmount(submission.id)}
                  disabled={!rewardAmount.trim()}
                >
                  Save
                </Button>
              </div>
              <p className={`text-xs mt-2 ${mutedTextColor}`}>
                {submission.reward.amount > 0 
                  ? `Current reward: $${submission.reward.amount} - You can update if needed`
                  : "Payment will be made in $ALPH equivalent to the USD amount entered above"}
              </p>
            </div>
            
            {/* Transaction Hash Section */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <h4 className={`font-medium ${textColor}`}>Transaction Hash</h4>
                {submission.status === 'accepted' && (
                  <Badge 
                    variant={submission.transaction_hash && submission.transaction_hash !== "NULL" ? "outline" : "destructive"} 
                    className={submission.transaction_hash && submission.transaction_hash !== "NULL" ? "bg-green-500/10 text-green-500" : ""}
                  >
                    {submission.transaction_hash && submission.transaction_hash !== "NULL" ? "Payment Recorded" : "Payment Required"}
                  </Badge>
                )}
              </div>
              <div className="flex gap-2">
                <Input
                  value={transactionHash}
                  onChange={(e) => setTransactionHash(e.target.value)}
                  placeholder="Enter transaction hash after payment"
                  className={`${bgColor} border-${borderColor} ${textColor}`}
                  disabled={submission.status !== 'accepted' && !submission.transaction_hash}
                />
                <Button
                  variant="outline"
                  className={`border-${borderColor} ${textColor} hover:bg-[#C1A461]/10`}
                  onClick={() => saveTransactionHash(submission.id)}
                  disabled={!transactionHash.trim() || (submission.status !== 'accepted' && !submission.transaction_hash)}
                >
                  Save
                </Button>
              </div>
              {submission.status === 'accepted' && !submission.transaction_hash && (
                <p className={`text-xs mt-2 ${mutedTextColor}`}>
                  Please record the transaction hash after you've paid the contributor
                </p>
              )}
            </div>
            
            <div>
              <h4 className={`font-medium ${textColor}`}>Submission URL</h4>
              <a 
                href={submission.submission_url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-blue-500 hover:text-blue-700"
              >
                <ExternalLink className="w-4 h-4" />
                {submission.submission_url}
              </a>
            </div>
            
            {submission.tweet_url && (
              <div>
                <h4 className={`font-medium ${textColor}`}>Tweet URL</h4>
                <a 
                  href={submission.tweet_url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-blue-500 hover:text-blue-700"
                >
                  <ExternalLink className="w-4 h-4" />
                  {submission.tweet_url}
                </a>
              </div>
            )}
            
            {submission.feedback && (
              <div>
                <h4 className={`font-medium ${textColor}`}>Feedback</h4>
                <p className={`whitespace-pre-wrap ${textColor}`}>{submission.feedback}</p>
              </div>
            )}
          </div>
          
          {/* Only show feedback field and approve/reject buttons if the submission is not already processed */}
          {submission.status === 'submitted' && (
            <>
              <div className="space-y-2">
                <h4 className={`font-medium ${textColor}`}>Feedback (Optional)</h4>
                <Textarea
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder="Add feedback for the submitter..."
                  className={`${bgColor} border-${borderColor} ${textColor}`}
                />
              </div>
              
              <DialogFooter className="flex justify-end gap-3 pt-4">
                <Button
                  variant="outline" 
                  className="border-red-500 text-red-500 hover:bg-red-500/10"
                  onClick={() => onStatusUpdate(submission.id, 'rejected', feedback)}
                >
                  <XCircle className="w-4 h-4 mr-2" />
                  Reject
                </Button>
                <Button
                  className="bg-green-600 hover:bg-green-700 text-white"
                  onClick={() => onStatusUpdate(submission.id, 'accepted', feedback)}
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Accept
                </Button>
              </DialogFooter>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}