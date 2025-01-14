import React from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from './ui/dialog'
import { Button } from './ui/button'

// interface AuthPromptModalProps {
//   open: boolean;
//   onClose: () => void;
// }

// export function AuthPromptModal({ open, onClose }: AuthPromptModalProps) {
//   const navigate = useNavigate()

//   return (
//     <Dialog open={open} onOpenChange={onClose}>
//       <DialogContent className="bg-gray-800/90 border-amber-500/20">
//         <DialogHeader>
//           <DialogTitle className="text-[#C1A461]">Join the Adventure!</DialogTitle>
//           <DialogDescription className="text-[#C1A461]/60">
//             Sign up now to unlock full access to bounties, projects, and exclusive rewards.
//           </DialogDescription>
//         </DialogHeader>
//         <div className="space-y-4">
//           <Button
//             className="w-full bg-amber-500 hover:bg-amber-600 text-gray-900"
//             onClick={() => navigate('/auth')}
//           >
//             Sign Up Now
//           </Button>
//           <Button
//             variant="outline"
//             className="w-full border-amber-500/20 text-[#C1A461] hover:bg-amber-500/20"
//             onClick={() => navigate('/auth')}
//           >
//             Login to Your Account
//           </Button>
//           <Button
//             variant="ghost"
//             className="w-full text-[#C1A461] hover:bg-transparent"
//             onClick={onClose}
//           >
//             Continue Browsing
//           </Button>
//         </div>
//       </DialogContent>
//     </Dialog>
//   )
// }