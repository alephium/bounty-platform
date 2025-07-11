import { Bounty, User } from '../types/supabase'
import { SUPABASE_ANON_KEY, SUPABASE_URL } from "../config";
import { supabase } from '../lib/supabase';
import { BountyService } from '../services/bounty.service';

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
  description: string,
  userData?: User | null // Add optional userData parameter
): Promise<SubmissionResult> => {
  console.log("Starting submission with storage-only approach");
  
  if (!bounty.id || !userId || !submissionUrl) {
    return {
      success: false,
      error: 'Missing required fields for submission'
    };
  }
  
  // Get user data if not provided
  let userDetails: Partial<User> | null = userData || null;
  if (!userDetails) {
    try {
      // Get user details using a direct fetch to avoid client hanging
      const authToken = await getAuthToken();
      if (!authToken) {
        return {
          success: false,
          error: 'No authentication token found. Please sign in again.'
        };
      }
      
      const userResponse = await fetch(`${SUPABASE_URL}/rest/v1/users?id=eq.${userId}&select=*`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'apikey': SUPABASE_ANON_KEY,
          'Authorization': `Bearer ${authToken}`
        }
      });
      
      if (userResponse.ok) {
        const userData = await userResponse.json();
        if (userData && userData.length > 0) {
          userDetails = userData[0];
        }
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
      // Continue without user details rather than failing the submission
    }
  }
  
  // Get auth token
  const authToken = await getAuthToken();
  if (!authToken) {
    return {
      success: false,
      error: 'No authentication token found. Please sign in again.'
    };
  }
  
  // Prepare submission data with expanded user fields
  const submissionData = {
    bounty_id: bounty.id,
    bounty_name: bounty.title || "Untitled Bounty",
    sponsor_id: bounty.sponsor?.id || null,
    sponsor_name: bounty.sponsor?.name || "Unknown Sponsor",
    sponsor_logo_url: bounty.sponsor?.logo_url || "",
    user_id: userId,
    user_username: userDetails?.username || "",
    user_avatar_url: userDetails?.avatar_url || "",
    user_full_name: userDetails?.full_name || "",
    user_wallet_address: userDetails?.wallet_address || "",
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
  
  // Submit using direct REST API only
  try {
    console.log("Attempting submission with token from storage");
    
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);
    
    console.log("Making fetch request to REST API");
    const response = await fetch(`${SUPABASE_URL}/rest/v1/bounty_submissions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${authToken}`,
        'Prefer': 'return=representation'
      },
      body: JSON.stringify(submissionData),
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);
    console.log("Fetch request completed with status:", response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Submission failed:', errorText);
      return {
        success: false,
        error: `API error: ${response.status} - ${errorText}`
      };
    }
    
    const data = await response.json();
    console.log("Submission succeeded:", data);
    
    // Update submission count using the service method
    try {
      await BountyService.updateSubmissionCount(bounty.id);
    } catch (e) {
      console.error("Error updating submission count:", e);
    }
    
    return {
      success: true,
      data: data
    };
  } catch (error: any) {
    console.error('Submission error:', error);
    
    if (error.name === 'AbortError') {
      return {
        success: false,
        error: 'Request timed out. Please try again.'
      };
    }
    
    return {
      success: false,
      error: error.message || 'An unexpected error occurred'
    };
  }
};

// Helper function to get auth token from storage
async function getAuthToken(): Promise<string | null> {
  let authToken = null;
  
  // Try localStorage
  try {
    // Look through all localStorage items for Supabase auth
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && (key.includes('supabase.auth.token') || key.includes('sb-'))) {
        try {
          const value = localStorage.getItem(key);
          if (value) {
            // Parse the JSON
            const parsed = JSON.parse(value);
            
            // Different storage formats to check
            if (parsed?.currentSession?.access_token) {
              authToken = parsed.currentSession.access_token;
              console.log("Found token in localStorage format 1");
              break;
            } else if (parsed?.access_token) {
              authToken = parsed.access_token;
              console.log("Found token in localStorage format 2");
              break;
            } else if (parsed?.session?.access_token) {
              authToken = parsed.session.access_token; 
              console.log("Found token in localStorage format 3");
              break;
            }
          }
        } catch (e) {
          // Skip any items that aren't valid JSON
          console.log("Skipping non-JSON localStorage item:", key);
        }
      }
    }
    
    // If nothing found in localStorage, try session storage
    if (!authToken) {
      for (let i = 0; i < sessionStorage.length; i++) {
        const key = sessionStorage.key(i);
        if (key && (key.includes('supabase.auth.token') || key.includes('sb-'))) {
          try {
            const value = sessionStorage.getItem(key);
            if (value) {
              const parsed = JSON.parse(value);
              if (parsed?.currentSession?.access_token) {
                authToken = parsed.currentSession.access_token;
                console.log("Found token in sessionStorage format 1");
                break;
              } else if (parsed?.access_token) {
                authToken = parsed.access_token;
                console.log("Found token in sessionStorage format 2");
                break;
              } else if (parsed?.session?.access_token) {
                authToken = parsed.session.access_token;
                console.log("Found token in sessionStorage format 3");
                break;
              }
            }
          } catch (e) {
            console.log("Skipping non-JSON sessionStorage item:", key);
          }
        }
      }
    }
    
    console.log("Auth token found:", !!authToken);
  } catch (e) {
    console.error("Error accessing storage:", e);
  }
  
  return authToken;
}