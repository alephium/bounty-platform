// Basic type definitions
export type Category = 'content' | 'design' | 'development' | 'other'
export type Status = 'open' | 'in_review' | 'completed'
export type Web3Interest = 'defi' | 'nft' | 'dao' | 'other'
export type WorkExperience = '0-2' | '2-5' | '5-10' | '10+'
export type ProjectCategory = 'frontend' | 'backend' | 'blockchain' | 'design' | 'content'
export type ProjectStatus = 'published' | 'draft' | 'archived'
export type SkillCategory = 'frontend' | 'backend' | 'blockchain' | 'design'

// Sponsor interface with improved fields
export interface Sponsor {
  id: string
  name: string
  description: string | null
  logo_url: string | null
  website_url: string | null
  twitter_handle: string | null
  github_handle: string | null
  discord_url: string | null
  is_verified: boolean
  total_bounties_count: number
  total_projects_count: number
  total_reward_amount: number
  created_at: string
  updated_at: string
}

// Project interface with sponsor relationship
export interface Project {
  id: string
  sponsor_id: string
  title: string
  description: string | null
  category: Category
  status: Status
  requirements: string[] | null
  repository_url: string | null
  documentation_url: string | null
  tags: string[]
  is_featured: boolean
  submission_count: number
  created_at: string
  updated_at: string
  // Joins
  sponsor?: Sponsor
}

// Bounty interface with sponsor relationship and improved tracking
export interface Bounty {
  id: string
  sponsor_id: string
  title: string
  description: string | null
  category: Category
  status: Status
  requirements: string[] | null
  reward: {
    amount: number
    token: string
    usd_equivalent: number
  }
  submission_guidelines: string | null
  max_submissions: number
  current_submissions: number
  start_date: string
  end_date: string
  review_timeframe: number // Days to review
  difficulty_level: 'beginner' | 'intermediate' | 'advanced'
  estimated_hours: number | null
  tags: string[]
  is_featured: boolean
  created_at: string
  updated_at: string
  // Joins
  sponsor?: Sponsor
}

// Submission interfaces for both bounties and projects
export interface BountySubmission {
  id: string
  bounty_id: string
  user_id: string
  title: string
  description: string
  submission_url: string
  repository_url: string | null
  status: 'submitted' | 'in_review' | 'accepted' | 'rejected'
  feedback: string | null
  review_started_at: string | null
  completed_at: string | null
  created_at: string
  updated_at: string
}

export interface ProjectSubmission {
  id: string
  project_id: string
  user_id: string
  title: string
  description: string
  submission_url: string
  repository_url: string | null
  status: 'submitted' | 'in_review' | 'accepted' | 'rejected'
  feedback: string | null
  review_started_at: string | null
  completed_at: string | null
  created_at: string
  updated_at: string
}

// Database interface for type safety
export interface Database {
  public: {
    Tables: {
      sponsors: {
        Row: Sponsor
        Insert: Omit<Sponsor, 'id' | 'created_at' | 'updated_at' | 'is_verified' | 
          'total_bounties_count' | 'total_projects_count' | 'total_reward_amount'>
        Update: Partial<Omit<Sponsor, 'id' | 'created_at' | 'updated_at'>>
      }
      projects: {
        Row: Project
        Insert: Omit<Project, 'id' | 'created_at' | 'updated_at' | 'submission_count'>
        Update: Partial<Omit<Project, 'id' | 'created_at' | 'updated_at'>>
      }
      bounties: {
        Row: Bounty
        Insert: Omit<Bounty, 'id' | 'created_at' | 'updated_at' | 'current_submissions'>
        Update: Partial<Omit<Bounty, 'id' | 'created_at' | 'updated_at'>>
      }
      bounty_submissions: {
        Row: BountySubmission
        Insert: Omit<BountySubmission, 'id' | 'created_at' | 'updated_at' | 
          'review_started_at' | 'completed_at'>
        Update: Partial<Omit<BountySubmission, 'id' | 'created_at' | 'updated_at'>>
      }
      project_submissions: {
        Row: ProjectSubmission
        Insert: Omit<ProjectSubmission, 'id' | 'created_at' | 'updated_at' | 
          'review_started_at' | 'completed_at'>
        Update: Partial<Omit<ProjectSubmission, 'id' | 'created_at' | 'updated_at'>>
      }
    }
  }
}