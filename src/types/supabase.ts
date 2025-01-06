export type Category = 'content' | 'design' | 'development' | 'other'
export type Status = 'open' | 'in review' | 'completed'

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

export interface User {
  id: string
  email: string
  full_name: string | null
  avatar_url?: string | null
  created_at: string
  updated_at: string
}

export type ProjectInsert = Omit<Project, 'id' | 'created_at' | 'updated_at'>
export type BountyInsert = Omit<Bounty, 'id' | 'created_at' | 'updated_at'>
export type GrantInsert = Omit<Grant, 'id' | 'created_at' | 'updated_at'>
export type UserUpdate = Partial<Omit<User, 'id' | 'created_at' | 'updated_at'>>