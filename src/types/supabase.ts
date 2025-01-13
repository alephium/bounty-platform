export type Category = 'content' | 'design' | 'development' | 'other'
export type Status = 'open' | 'in review' | 'completed'
export type Web3Interest = 'defi' | 'nft' | 'dao' | 'other'
export type WorkExperience = '0-2' | '2-5' | '5-10' | '10+'
export type ProjectCategory = 'frontend' | 'backend' | 'blockchain' | 'design' | 'content'
export type ProjectStatus = 'published' | 'draft' | 'archived'
export type SkillCategory = 'frontend' | 'backend' | 'blockchain' | 'design'

// Project, Bounty, and Grant interfaces remain the same
export interface Project {
  id: string
  title: string
  description: string | null
  category: Category
  status: Status
  created_at: string
  updated_at: string
}

export interface Bounty {
  id: string
  title: string
  description: string | null
  category: Category
  status: Status
  company: {
    name: string
    logo: string
  }
  reward: {
    amount: number
    token: string
  }
  due_date: string
  submissions_count: number
  created_at: string
  updated_at: string
}

export interface Grant {
  id: string
  title: string
  description: string | null
  category: Category
  status: Status
  organization: string
  amount: number
  deadline: string
  requirements: string[]
  created_at: string
  updated_at: string
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

// Updated User interface with minimal required fields
export interface User {
  id: string
  email: string                    // Required
  username: string | null          // Optional now
  first_name: string | null        // Optional
  last_name: string | null         // Optional
  full_name: string | null         // Optional
  bio: string | null               // Optional
  avatar_url: string | null        // Optional
  wallet_address: string | null    // Optional initially
  
  // Social links - all optional
  github_url: string | null
  twitter_url: string | null
  linkedin_url: string | null
  telegram_url: string | null
  website_url: string | null
  
  // Work related fields - all optional
  web3_interests: Web3Interest[]| null
  work_experience: WorkExperience
  location: string | null
  current_employer: string | null
  
  // Skills - all optional
  frontend_skills: string[] | null
  backend_skills: string[] | null
  blockchain_skills: string[] | null
  design_skills: string[] | null
  content_skills: string[] | null

  achievements?: UserAchievement[]
  total_earnings?: {
    [key: string]: number  // token -> amount mapping
  }
  completed_projects_count?: number
  completed_bounties_count?: number
  completed_grants_count?: number
  completed_hackathons_count?: number      
  created_at: string              // Required but auto-generated
  updated_at: string              // Required but auto-generated
}

export interface ProofOfWork {
  id: string
  user_id: string
  title: string
  description: string
  category: ProjectCategory
  skills: string[]         // Array of skill IDs
  project_url: string
}

export interface Skill {
  id: string
  name: string
  category: SkillCategory
  created_at: string
  updated_at: string
}


export type ProjectInsert = Omit<Project, 'id' | 'created_at' | 'updated_at'>
export type BountyInsert = Omit<Bounty, 'id' | 'created_at' | 'updated_at'>
export type GrantInsert = Omit<Grant, 'id' | 'created_at' | 'updated_at'>
export type UserUpdate = Partial<Omit<User, 'id' | 'created_at' | 'updated_at'>>
export type ProofOfWorkInsert = Omit<ProofOfWork, 'id' | 'created_at' | 'updated_at'>


export interface Team {
  id: string
  name: string
  created_at: string
  updated_at: string
  description: string | null
  team_size: number
  status: 'registered' | 'active' | 'completed' | 'disqualified'
}

export interface HackathonProject {
  id: string
  team_id: string
  title: string
  description: string | null
  repository_url: string | null
  deployment_url: string | null
  created_at: string
  updated_at: string
  submission_status: 'draft' | 'submitted' | 'qualified' | 'disqualified'
  contract_deployed: boolean
  category: string[]
}

export interface TeamMember {
  id: string
  team_id: string
  user_id: string
  role: 'leader' | 'member'
  joined_at: string
}

export interface EvaluationCriteria {
  id: string
  name: string
  description: string | null
  weight: number
  created_at: string
}

export interface Evaluation {
  id: string
  hackathonproject_id: string
  criteria_id: string
  judge_id: string
  score: number
  feedback: string | null
  created_at: string
  updated_at: string
}

export interface Prize {
  id: string
  name: string
  description: string | null
  amount: number
  category: 'main_prize' | 'specific_category' | 'individual_hacker' | 'bonus' | 'participation'
  sub_category: string | null
  max_winners: number
  created_at: string
}

export interface PrizeWinner {
  id: string
  prize_id: string
  team_id: string | null
  user_id: string | null
  hackathonproject_id: string | null
  awarded_amount: number
  awarded_at: string
}

// Database interface for type safety
export interface Database {
  public: {
    Tables: {
      teams: {
        Row: Team
        Insert: Omit<Team, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<Team, 'id'>>
      }
      hackathonprojects: {
        Row: HackathonProject
        Insert: Omit<HackathonProject, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<HackathonProject, 'id'>>
      }
      team_members: {
        Row: TeamMember
        Insert: Omit<TeamMember, 'id' | 'joined_at'>
        Update: Partial<Omit<TeamMember, 'id'>>
      }
      evaluation_criteria: {
        Row: EvaluationCriteria
        Insert: Omit<EvaluationCriteria, 'id' | 'created_at'>
        Update: Partial<Omit<EvaluationCriteria, 'id'>>
      }
      evaluations: {
        Row: Evaluation
        Insert: Omit<Evaluation, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<Evaluation, 'id'>>
      }
      prizes: {
        Row: Prize
        Insert: Omit<Prize, 'id' | 'created_at'>
        Update: Partial<Omit<Prize, 'id'>>
      }
      prize_winners: {
        Row: PrizeWinner
        Insert: Omit<PrizeWinner, 'id' | 'awarded_at'>
        Update: Partial<Omit<PrizeWinner, 'id'>>
      }
    }
    Views: {
      [key: string]: {
        Row: Record<string, unknown>
        Insert: Record<string, unknown>
        Update: Record<string, unknown>
      }
    }
    Functions: {
      [key: string]: {
        Args: Record<string, unknown>
        Returns: unknown
      }
    }
    Enums: {
      [key: string]: unknown
    }
  }
}