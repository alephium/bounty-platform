import { Bounty } from '../types/supabase'
import { SUPABASE_ANON_KEY, SUPABASE_URL } from "../config";

interface SubmissionResult {
  success: boolean
  error?: string
  data?: any
}

export const handleBountySubmission = async (
  bounty: Bounty,
  userId: string,
  submissionUrl: string,
  title: string,
  tweetUrl: string | null,
  description: string
): Promise<SubmissionResult> => {
  console.log("Direct fetch submission attempt");
  
  // Get these from your environment variables or Supabase client
  const supabaseUrl = SUPABASE_URL;
  const supabaseKey = SUPABASE_ANON_KEY;
  if (!supabaseUrl || !supabaseKey) {
    return {
      success: false,
      error: 'Missing Supabase configuration'
    };
  }
  
  const submissionData = {
    bounty_id: bounty.id,
    bounty_name: bounty.title,
    sponsor_id: bounty.sponsor?.id,
    sponsor_name: bounty.sponsor?.name,
    sponsor_logo_url: bounty.sponsor?.logo_url || "",
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
  };
  
  try {
    console.log("Attempting direct fetch to Supabase REST API");
    
    // Using fetch API directly with timeout for submission
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);
    
    const response = await fetch(`${supabaseUrl}/rest/v1/bounty_submissions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': supabaseKey,
        'Authorization': `Bearer ${supabaseKey}`,
        'Prefer': 'return=representation'
      },
      body: JSON.stringify(submissionData),
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Error response from REST API:', errorText);
      return {
        success: false,
        error: `API error: ${response.status} - ${errorText}`
      };
    }
    
    const data = await response.json();
    console.log("Direct insert successful:", data);
    
    // Update the bounty's submission count using direct fetch instead of Supabase client
    try {
      console.log("Updating bounty submission count using direct fetch...");
      
      // Create update data
      const updateData = {
        current_submissions: bounty.current_submissions + 1
      };
      
      // Use another controller for the update request
      const updateController = new AbortController();
      const updateTimeoutId = setTimeout(() => updateController.abort(), 5000);
      
      // Perform the PATCH request to update the bounty
      const updateResponse = await fetch(`${supabaseUrl}/rest/v1/bounties?id=eq.${bounty.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'apikey': supabaseKey,
          'Authorization': `Bearer ${supabaseKey}`,
          'Prefer': 'return=minimal'
        },
        body: JSON.stringify(updateData),
        signal: updateController.signal
      });
      
      clearTimeout(updateTimeoutId);
      
      if (!updateResponse.ok) {
        const updateErrorText = await updateResponse.text();
        console.error('Error updating bounty count:', updateErrorText);
      } else {
        console.log("Bounty submission count updated successfully");
      }
    } catch (updateError) {
      console.error('Exception during bounty count update:', updateError);
      // Continue since the submission was successful
    }
    
    return {
      success: true,
      data: data
    };
  } catch (error: any) {
    console.error('Error with direct fetch approach:', error);
    
    if (error.name === 'AbortError') {
      return {
        success: false,
        error: 'The request was aborted due to timeout'
      };
    }
    
    return {
      success: false,
      error: error.message || 'An unexpected error occurred'
    };
  }
}