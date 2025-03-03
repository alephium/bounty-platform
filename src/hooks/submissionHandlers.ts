import { Bounty } from '../types/supabase'
import supabase from '../supabase/index'

export async function handleBountySubmission(
  bounty: Bounty,
  userId: string,
  submissionUrl: string,
  title: string,
  tweetUrl: string,
  description: string
) {
  try {
    // Check if user and bounty IDs are valid
    if (!userId || !bounty?.id) {
      throw new Error('Invalid user or bounty information');
    }

    // Create the bounty submission
    const { data: submissionData, error: submissionError } = await supabase
      .from('bounty_submissions')
      .insert({
        bounty_id: bounty.id,
        user_id: userId,
        sponsor_id: bounty.sponsor_id,
        title: title,
        description: description,
        submission_url: submissionUrl,
        tweetUrl:tweetUrl,
        status: 'submitted'
      })
      .select()
      .single();

    console.log("0000")

    if (submissionError) {
      console.error('Submission error:', submissionError);
      
      // Handle foreign key violation (sponsor_id might not exist)
      if (submissionError.code === '23503') {
        throw new Error('The sponsor information is invalid. Please try again later.');
      }
      
      // Handle unique constraint violation (user might have already submitted)
      if (submissionError.code === '23505') {
        throw new Error('You have already submitted to this bounty');
      }
      
      throw submissionError;
    }
    console.log("1111")
    // Update bounty's current_submissions count
    const { error: updateError } = await supabase
      .from('bounties')
      .update({ 
        current_submissions: bounty.current_submissions + 1 
      })
      .eq('id', bounty.id);

    if (updateError) {
      console.error('Error updating bounty count:', updateError);
      // Continue anyway since the submission was created
    }
    console.log("2222")
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
      });

    if (notificationError) {
      console.error('Error creating notification:', notificationError);
      // Continue anyway since the submission was created
    }

    console.log('Submission successful:', submissionData.id);
    return { success: true, submission: submissionData };
  } catch (error) {
    console.error('Error handling submission:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'An error occurred during submission'
    };
  }
}