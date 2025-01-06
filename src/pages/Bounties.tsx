import { useState } from 'react'
import { Category, Status, Bounty } from '../types/supabase'

const categories: Category[] = ['content', 'design', 'development', 'other']
const statuses: Status[] = ['open', 'in review', 'completed']

export const Bounties = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category | 'all'>('all')
  const [selectedStatus, setSelectedStatus] = useState<Status | 'all'>('all')

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-[#C1A461]">Bounties</h1>
        <div className="flex gap-4">
          <select 
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value as Category | 'all')}
            className="bg-[#2D3439] text-[#C1A461] rounded-lg px-3 py-2"
          >
            <option value="all">All Categories</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          <select 
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value as Status | 'all')}
            className="bg-[#2D3439] text-[#C1A461] rounded-lg px-3 py-2"
          >
            <option value="all">All Statuses</option>
            {statuses.map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
        </div>
      </div>
      {/* Add BountyList component here */}
    </div>
  )
}