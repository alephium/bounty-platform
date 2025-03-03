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
    // Log the bounty data for debugging
    console.log('Submitting for bounty:', bounty, 'by user:', userId);

    // Make sure we have the sponsor_id
    if (!bounty.sponsor_id) {
      console.error('Missing sponsor_id in bounty data:', bounty);
      throw new Error('Bounty data is incomplete (missing sponsor ID)');
    }

    console.log('Checking for existing submission...')

    const { data: existingUser, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single()
        console.log(existingUser)
    // Check if user has already submitted
    // const { data: existingSubmission, error: checkError } = await supabase
    //   .from('bounty_submissions')
    //   .select('id')
    //   .eq('bounty_id', bounty.id)
    //   .eq('user_id', userId)
    //   .single();
    
    // console.log('Checking for existing submission...', existingSubmission)

    // if (checkError && checkError.code !== 'PGRST116') { // Ignore "no rows returned" error
    //   console.error('Check submission error:', checkError);
    //   throw checkError;
    // }

    // if (existingSubmission) {
    //   throw new Error('You have already submitted to this bounty');
    // }

    // Create the bounty submission with sponsor_id included
    const { data: submissionData, error: submissionError } = await supabase
      .from('bounty_submissions')
      .insert({
        bounty_id: bounty.id,
        user_id: userId,
        sponsor_id: bounty.sponsor_id, // Include the sponsor_id from the bounty
        title: title,
        description: description,
        submission_url: submissionUrl,
        status: 'submitted'
      })
      .select()
      .single();

    console.log(submissionData, submissionError)

    if (submissionError) {
      console.error('Submission error:', submissionError);
      throw submissionError;
    }

    // Update bounty's current_submissions count
    const { error: updateError } = await supabase
      .from('bounties')
      .update({ 
        current_submissions: bounty.current_submissions + 1 
      })
      .eq('id', bounty.id);

    if (updateError) {
      console.error('Update error:', updateError);
      throw updateError;
    }

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
      console.error('Notification error:', notificationError);
      throw notificationError;
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