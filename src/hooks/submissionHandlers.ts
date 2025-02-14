import { Bounty } from '../types/supabase'
import supabase from '../supabase/index'
export async function handleBountySubmission(
  bounty: Bounty,
  userId: string,
  submissionUrl: string,
  title: string,
  description: string
) {
  try {
    // First, check if user has already submitted
    const { data: existingSubmission } = await supabase
      .from('bounty_submissions')
      .select('id')
      .eq('bounty_id', bounty.id)
      .eq('user_id', userId)
      .single()

    if (existingSubmission) {
      throw new Error('You have already submitted to this bounty')
    }

    // Then, create the bounty submission
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

    // Update bounty's current_submissions count
    const { error: updateError } = await supabase
      .from('bounties')
      .update({ 
        current_submissions: bounty.current_submissions + 1 
      })
      .eq('id', bounty.id)

    if (updateError) throw updateError

    // Create notification for the sponsor
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

    return { success: true, submission: submissionData }
  } catch (error) {
    console.error('Error handling submission:', error)
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'An error occurred during submission'
    }
  }
}