import { useState } from 'react'
import { Category, Status, Bounty } from '../types/supabase'
import { Card, CardContent } from "../components/ui/card"
import { Badge } from "../components/ui/badge"

const categories: Category[] = ['content', 'design', 'development', 'other']
const statuses: Status[] = ['open', 'in review', 'completed']

export const Bounties = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category | 'all'>('all')
  const [selectedStatus, setSelectedStatus] = useState<Status | 'all'>('all')

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Bounties</h1>
        <div className="flex gap-4">
          <select 
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value as Category | 'all')}
            className="bg-white border border-amber-200 text-gray-900 rounded-lg px-3 py-2 hover:border-amber-300 focus:ring-2 focus:ring-amber-500"
          >
            <option value="all">All Categories</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          <select 
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value as Status | 'all')}
            className="bg-white border border-amber-200 text-gray-900 rounded-lg px-3 py-2 hover:border-amber-300 focus:ring-2 focus:ring-amber-500"
          >
            <option value="all">All Statuses</option>
            {statuses.map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
        </div>
      </div>
      
      {/* Bounty cards would go here */}
      <div className="grid gap-4">
        <Card className="bg-white border-amber-200 hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Bounty Title</h3>
                <p className="text-gray-600">Description</p>
                <div className="flex gap-2 mt-2">
                  <Badge className="bg-amber-100 text-amber-700">
                    Category
                  </Badge>
                  <Badge className="bg-green-100 text-green-700">
                    Status
                  </Badge>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-amber-600">$1000</p>
                <p className="text-gray-600">Reward</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}