export type Category = 'content' | 'design' | 'development' | 'other'
export type Status = 'open' | 'in review' | 'completed'
export type Web3Interest = 'defi' | 'nft' | 'dao'
export type WorkExperience = '0-2' | '2-5' | '5-10' | '10+'

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
  web3_interests: Web3Interest[] | null
  community_affiliations: string[] | null
  work_experience: WorkExperience | null
  location: string | null
  current_employer: string | null
  
  // Skills - all optional
  frontend_skills: string[] | null
  backend_skills: string[] | null
  blockchain_skills: string[] | null
  
  is_private: boolean              // Required but with default
  created_at: string              // Required but auto-generated
  updated_at: string              // Required but auto-generated
}

export type ProjectInsert = Omit<Project, 'id' | 'created_at' | 'updated_at'>
export type BountyInsert = Omit<Bounty, 'id' | 'created_at' | 'updated_at'>
export type GrantInsert = Omit<Grant, 'id' | 'created_at' | 'updated_at'>
export type UserUpdate = Partial<Omit<User, 'id' | 'created_at' | 'updated_at'>>