// import { supabase } from '../lib/supabase'
import { Bounty } from '../types/supabase'
import supabase from '../supabase/index'


interface SubmissionResult {
  success: boolean
  error?: string
  data?: any
}

/**
 * Handles the submission of a bounty solution
 * @param bounty The bounty being submitted for
 * @param userId The ID of the user submitting
 * @param submissionUrl The URL of the submission
 * @param title The title of the submission
 * @param tweetUrl Optional X/Twitter URL
 * @param description Description of the submission
 * @returns A result object indicating success or failure
 */
export const handleBountySubmission = async (
  bounty: Bounty,
  userId: string,
  submissionUrl: string,
  title: string,
  tweetUrl: string | null,
  description: string
): Promise<SubmissionResult> => {
  try {
    // Validate required fields
    console.log("handlers0")
    if (!bounty.id || !userId || !submissionUrl || !title) {
      return {
        success: false,
        error: 'Missing required submission data'
      }
    }
    console.log("handlers1")
    // Make sure sponsor data is available
    if (!bounty.sponsor) {
      return {
        success: false,
        error: 'Sponsor information is missing'
      }
    }

    console.log("handlers2, userId: ", userId)
    console.log("handlers2, title: ", title)
    console.log("handlers2, description: ", description)
    console.log("handlers2, submissionUrl: ", submissionUrl)
    console.log("handlers2, tweetUrl: ", tweetUrl)
    

    try {
      console.log("Starting Supabase insert...");
      // Using flat structure instead of nested JSONB
      const { data, error } = await supabase
        .from('bounty_submissions')
        .insert({
          bounty_id: bounty.id,
          bounty_name: bounty.title,
          sponsor_id: bounty.sponsor.id,
          sponsor_name: bounty.sponsor.name,
          sponsor_logo_url: bounty.sponsor.logo_url || "",
          user_id: userId,
          title: title,
          description: description,
          submission_url: submissionUrl,
          tweet_url: tweetUrl,
          status: 'submitted',
          feedback: null,
          reward: {
            amount: 0,
            token: "",
            usd_equivalent: 0,
          }
        })
        .select();
      
      console.log("handlers3");
      
      if (error) {
        console.error('Error submitting bounty solution:', error)
        return {
          success: false,
          error: error.message
        }
      }
      
      
      console.log("handlers4")
      // Increment the bounty's submission count
      const { error: updateError } = await supabase
        .from('bounties')
        .update({ 
          current_submissions: bounty.current_submissions + 1
        })
        .eq('id', bounty.id)

      if (updateError) {
        console.error('Error updating bounty submission count:', updateError)
        // We don't return error here since the submission was successful
      }

      return {
        success: true,
        data: data
      }
    } catch (innerError: any) {
      console.error("Inner error in Supabase operation:", innerError);
      return {
        success: false,
        error: innerError.message || 'Error during database operation'
      };
    }
  } catch (error: any) {
    console.error('Unexpected error in handleBountySubmission:', error)
    return {
      success: false,
      error: error.message || 'An unexpected error occurred'
    }
  }
}