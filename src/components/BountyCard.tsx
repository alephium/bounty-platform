import { Bounty } from '../types/supabase'

interface BountyCardProps {
    bounty: Bounty;
}

export const BountyCard = ({ bounty }: BountyCardProps) => {
    return (
      <div className="flex items-center p-4 border-b hover:bg-gray-50">
        <img src={bounty.company.logo} alt={bounty.company.name} className="w-12 h-12 rounded" />
        <div className="ml-4 flex-1">
          <h3 className="font-medium">{bounty.title}</h3>
          <div className="flex items-center text-sm text-gray-500">
            <span>{bounty.company.name}</span>
            <span className="mx-2">•</span>
            <span>{bounty.type}</span>
            <span className="mx-2">•</span>
            <span>Due in {bounty.dueIn}</span>
            {bounty.submissions > 0 && (
              <>
                <span className="mx-2">•</span>
                <span>{bounty.submissions} submissions</span>
              </>
            )}
          </div>
        </div>
        <div className="text-right">
          <div className="font-medium">{bounty.reward.amount} {bounty.reward.token}</div>
        </div>
      </div>
    );
  };