// submissionHandlers.ts
import { supabase } from '@/lib/supabase'
import { toast } from 'sonner'
import type { Bounty } from '@/types/supabase'

export async function handleBountySubmission(
  bounty: Bounty,
  userId: string,
  submissionUrl: string,
  title: string,
  description: string
) {
  try {
    // First, create the bounty submission
    const { data: submissionData, error: submissionError } = await supabase
      .from('bounty_submissions')
      .insert({
        bounty_id: bounty.id,
        user_id: userId,
        title: title,
        description: description,
        submission_url: submissionUrl,
        status: 'submitted'
      })
      .select()
      .single()

    if (submissionError) throw submissionError

    // Then, create a notification for the sponsor
    const { error: notificationError } = await supabase
      .from('notifications')
      .insert({
        sponsor_id: bounty.sponsor_id,
        user_id: userId,
        submission_id: submissionData.id,
        submission_type: 'bounty',
        status: 'unread',
        title: `New submission for ${bounty.title}`,
        message: `A new submission has been received for your bounty "${bounty.title}"`
      })

    if (notificationError) throw notificationError

    // Update the bounty's current_submissions count
    const { error: updateError } = await supabase
      .from('bounties')
      .update({ 
        current_submissions: bounty.current_submissions + 1 
      })
      .eq('id', bounty.id)

    if (updateError) throw updateError

    return { success: true, submission: submissionData }
  } catch (error) {
    console.error('Error handling submission:', error)
    return { success: false, error }
  }
}