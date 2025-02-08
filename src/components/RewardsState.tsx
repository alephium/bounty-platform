import { useRewards } from '@/hooks/useRewards'
import { Card, CardContent } from '@/components/ui/card'

export function TreasureStats() {
  const { metrics, loading } = useRewards()

  // Format currency to show only whole numbers
  function formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount)
  }

  if (loading) {
    return (
      <Card className="bg-[#1B2228] border-[#C1A461]/20">
        <CardContent className="p-4 space-y-4">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-[#C1A461]/20 rounded" />
            <div className="h-6 bg-[#C1A461]/20 rounded" />
            <div className="h-8 bg-[#C1A461]/20 rounded" />
            <div className="h-6 bg-[#C1A461]/20 rounded" />
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-[#1B2228] border-[#C1A461]/20">
      <CardContent className="p-4 space-y-4">
        <div>
          <div className="flex items-center gap-2 text-2xl font-bold">
            <span className="text-[#C1A461]">◈</span>
            <span className="text-[#C1A461]">
              {formatCurrency(metrics.totalOpenRewards)}
            </span>
          </div>
          <div className="text-sm text-[#C1A461]">Total Treasure Open</div>
        </div>
        <div>
          <div className="flex items-center gap-2 text-2xl font-bold">
            <span className="text-[#C1A461]">◈</span>
            <span className="text-[#C1A461]">{metrics.availableQuests}</span>
          </div>
          <div className="text-sm text-[#C1A461]">Quests Available</div>
        </div>
      </CardContent>
    </Card>
  )
}