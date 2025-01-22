// src/config/hackathon.config.ts

export const HACKATHON_CONFIG = {
    // API URLs
    TEAM_SCRIPT_URL: "https://script.google.com/macros/s/AKfycbzpYqcreeuxm9OF6o8Z3y_j38T6iuus5cWjbv6ayBY9wj5ndy_3K-TbRFXoTlYu-kK42Q/exec",
    SOLO_SCRIPT_URL: "https://script.google.com/macros/s/AKfycbyZZ8dgnx-rDyjtecm92rXNppWJPlLIVeEk7HkD1F5tt_zhEWHqg4mhkDhGdaYg-llNWg/exec",
    
    // Team settings
    MAX_TEAM_SIZE: 5,
    MIN_TEAM_SIZE: 2,
    
    // Project settings
    MAX_PROJECTS_PER_SOLO: 3,
    
    // Prize pool
    TOTAL_PRIZE_POOL: 5000,
    CURRENCY: "ALPH"
  } as const;
  
  // Type definitions for API responses
  export interface TeamResponse {
    success: boolean;
    team?: {
      id: string;
      name: string;
      description: string;
      members: Array<{
        id: string;
        name: string;
        email: string;
        role: 'leader' | 'member';
      }>;
    };
    error?: string;
  }
  
  export interface SoloResponse {
    success: boolean;
    participationId?: string;
    error?: string;
  }
  
  export interface ParticipationResponse {
    participating: boolean;
    type?: 'team' | 'solo';
    teamId?: string;
    status?: 'registered' | 'submitted';
    team?: TeamResponse['team'];
    error?: string;
  }