import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
  import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
  import { useNavigate } from 'react-router-dom'
  import { User, LogOut, Settings } from 'lucide-react'
  import { UserService } from '@/services/user.service'
  
  interface AvatarDropdownProps {
    user: {
      full_name: string | null;
      avatar_url?: string | null;
    };
    getInitials: (name: string | null) => string;
  }
  
  export function AvatarDropdown({ user, getInitials }: AvatarDropdownProps) {
    const navigate = useNavigate()
  
    const handleLogout = async () => {
      try {
        await UserService.signOut()
        navigate('/auth')
      } catch (error) {
        console.error('Error logging out:', error)
      }
    }
  
    return (
      <DropdownMenu>
        <DropdownMenuTrigger className="cursor-pointer">
          <div className="flex items-center gap-4">
            <span className="text-sm text-[#C1A461]">{user.full_name}</span>
            <Avatar>
              {user.avatar_url ? (
                <AvatarImage
                  src={user.avatar_url}
                  alt={user.full_name || 'User avatar'}
                />
              ) : null}
              <AvatarFallback className="bg-amber-500/20 text-[#C1A461]">
                {getInitials(user.full_name)}
              </AvatarFallback>
            </Avatar>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 bg-[#1B2228] border-[#C1A461]/20">
          <DropdownMenuItem 
            className="text-[#C1A461] focus:bg-[#C1A461]/20 focus:text-[#C1A461] cursor-pointer"
            onClick={() => navigate('/profile')}
          >
            <User className="mr-2 h-4 w-4" />
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem 
            className="text-[#C1A461] focus:bg-[#C1A461]/20 focus:text-[#C1A461] cursor-pointer"
            onClick={() => navigate('/editprofile')}
          >
            <Settings className="mr-2 h-4 w-4" />
            Edit Profile
          </DropdownMenuItem>
          <DropdownMenuSeparator className="bg-[#C1A461]/20" />
          <DropdownMenuItem 
            className="text-[#C1A461] focus:bg-[#C1A461]/20 focus:text-[#C1A461] cursor-pointer"
            onClick={handleLogout}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }