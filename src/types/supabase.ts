export type Category = 'content' | 'design' | 'development' | 'other'
export type Status = 'open' | 'in_review' | 'completed'
export type Web3Interest = 'defi' | 'nft' | 'dao' | 'other'
export type WorkExperience = '0-2' | '2-5' | '5-10' | '10+'
export type ProjectCategory = 'frontend' | 'backend' | 'blockchain' | 'design' | 'content'
export type ProjectStatus = 'published' | 'draft' | 'archived'
export type SkillCategory = 'frontend' | 'backend' | 'blockchain' | 'design'
export type SponsorInsert = Omit<Sponsor, 'id' | 'created_at' | 'updated_at' | 'is_verified'>
export type SponsorUpdate = Partial<Omit<Sponsor, 'id' | 'created_at' | 'updated_at'>>
export type ProjectInsert = Omit<Project, 'id' | 'created_at' | 'updated_at'>
export type BountyInsert = Omit<Bounty, 'id' | 'created_at' | 'updated_at'>
export type UserUpdate = Partial<Omit<User, 'id' | 'created_at' | 'updated_at'>>
export type ProofOfWorkInsert = Omit<ProofOfWork, 'id' | 'created_at' | 'updated_at'>


export interface Sponsor {
  id: string
  user_id: string
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

export interface Project {
  id: string
  sponsor_id: string
  title: string
  description: string | null
  category: Category
  status: Status
  requirements: string | null
  repository_url: string | null
  documentation_url: string | null
  tags: string[]
  is_featured: boolean
  submission_count: number
  created_at: string
  updated_at: string
  sponsor?: Sponsor
}

export interface BountyComment {
  id: string
  bounty_id: string
  user_id: string
  content: string
  created_at: string
  updated_at: string
  // Join relationships
  user?: User
  bounty?: Bounty
}

// Bounty interface with sponsor relationship and improved tracking
export interface Bounty {
  id: string
  sponsor_id: string
  title: string
  description: string | null
  category: Category
  status: Status
  requirements: string | null
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

export interface BountySubmission {
  id: string
  bounty_id: string
  bounty_name: string
  sponsor_id: string
  sponsor_name: string
  sponsor_logo_url: string
  user_id: string
  title: string
  description: string
  submission_url: string
  tweet_url: string | null
  status: 'submitted' | 'in_review' | 'accepted' | 'rejected'
  feedback: string | null
  review_started_at: string | null
  completed_at: string | null
  created_at: string
  updated_at: string
  reward: {
    amount: number
    token: string
    usd_equivalent: number
  }
  user?: {
    full_name: string | null
    avatar_url: string | null
  }
}


export interface ProjectSubmission {
  id: string
  project_id: string
  user_id: string
  sponsor_id: string
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
  user?: {
    full_name: string | null
    avatar_url: string | null
  }
}

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

export interface UserAchievement {
  id: string
  user_id: string
  project_id?: string
  bounty_id?: string
  type: 'project' | 'bounty' | 'grant' | 'hackathon'
  status: Status
  earnings?: {
    amount: number
    token: string
    Prize: string
  }
  completed_at: string
  created_at: string
  updated_at: string
}

export interface User {
  id: string
  email: string                  
  username: string | null         
  first_name: string | null        
  last_name: string | null         
  full_name: string | null         
  bio: string | null               
  avatar_url: string | null        
  wallet_address: string | null   
  
  github_url: string | null
  twitter_url: string | null
  linkedin_url: string | null
  telegram_url: string | null
  website_url: string | null
  
  web3_interests: Web3Interest[]| null
  work_experience: WorkExperience
  location: string | null
  current_employer: string | null
  
  frontend_skills: string[] | null
  backend_skills: string[] | null
  blockchain_skills: string[] | null
  design_skills: string[] | null
  content_skills: string[] | null

  achievements?: UserAchievement[]
  total_earnings?: {
    [key: string]: number
  }
  completed_projects_count?: number
  completed_bounties_count?: number
  completed_grants_count?: number
  completed_hackathons_count?: number      
  created_at: string              
  updated_at: string            
}

export interface ProofOfWork {
  id: string
  user_id: string
  title: string
  description: string
  category: ProjectCategory
  skills: string[]       
  project_url: string
}

export interface Skill {
  id: string
  name: string
  category: SkillCategory
  created_at: string
  updated_at: string
}