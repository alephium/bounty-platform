export interface Project {
  id: string
  title: string
  description: string | null
  created_at: string
  updated_at: string
}

export type ProjectInsert = Omit<Project, 'id' | 'created_at' | 'updated_at'>

export interface User {
  id: string
  email: string
  full_name: string | null
  created_at: string
  updated_at: string
}

export type UserUpdate = Partial<Omit<User, 'id' | 'created_at' | 'updated_at'>>

export interface Bounty {
  id: string
  title: string
  company: {
    name: string
    logo: string
  }
  type: 'Bounty' | 'Project'
  reward: {
    amount: number
    token: string
  }
  dueIn: string
  submissions: number
  status: 'Open' | 'In Review' | 'Completed'
}

export type BountyInsert = Omit<Bounty, 'id' | 'created_at' | 'updated_at'>