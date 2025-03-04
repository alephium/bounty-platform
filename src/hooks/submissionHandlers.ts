import { Bounty } from '../types/supabase'
import supabase from '../supabase/index'


// export async function checkSupabaseConnection() {
//   try {
//     // Perform a simple, lightweight query to test connection
//     const { data, error } = await supabase
//       .from('users')
//       .select('id')
//       .limit(1)

//     if (error) {
//       console.error('❌ Supabase Connection Test Failed:', error)
//       return {
//         status: 'error',
//         message: 'Connection failed',
//         details: error.message
//       }
//     }

//     // Additional connection validation
//     const connectionChecks = {
//       basic: data !== null,
//       responseTime: Date.now() // You can calculate response time if needed
//     }

//     console.log('✅ Supabase Connection Successful!')
    
//     return {
//       status: 'success',
//       message: 'Supabase is connected and responding',
//       checks: connectionChecks
//     }
//   } catch (catchError) {
//     console.error('🚨 Unexpected Supabase Connection Error:', catchError)
//     return {
//       status: 'critical',
//       message: 'Unexpected connection error',
//       details: catchError instanceof Error ? catchError.message : String(catchError)
//     }
//   }
// }

// Usage example
async function testSupabaseConnection() {
  const connectionResult = await checkSupabaseConnection()
  
  switch (connectionResult.status) {
    case 'success':
      console.log('Connection established successfully! 🎉')
      break
    case 'error':
      console.warn('Connection issues detected. Please check configuration. 🔧')
      break
    case 'critical':
      console.error('Critical connection problem! 🚨')
      break
  }
}
export async function handleBountySubmission(
  bounty: Bounty,
  userId: string,
  submissionUrl: string,
  title: string,
  tweetUrl: string,
  description: string
) {
  // checkSupabaseConnection()
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
        tweet_url:tweetUrl,
        status: 'submitted'
      })
      .select()
      .single();

    console.log("submissionDate", submissionData)

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