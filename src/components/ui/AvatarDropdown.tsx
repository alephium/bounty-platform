import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "./avatar"
import { useNavigate } from 'react-router-dom'
import { User, LogOut, Settings } from 'lucide-react'
import { UserService } from '../../services/user.service'
import { useTheme } from '../../contexts/ThemeContext'

interface AvatarDropdownProps {
  user: {
    full_name: string | null;
    avatar_url?: string | null;
    username?: string | null;
  };
  getInitials: (name: string | null) => string;
}

export function AvatarDropdown({ user, getInitials }: AvatarDropdownProps) {
  const navigate = useNavigate()
  const { theme } = useTheme()

  // Theme-specific styles
  const textColor = theme === 'dark' ? 'text-[#C1A461]' : 'text-gray-900'
  const dropdownBg = theme === 'dark' ? 'bg-[#1B2228]' : 'bg-white'
  const borderColor = theme === 'dark' ? 'border-[#C1A461]/20' : 'border-amber-200'
  const hoverBg = theme === 'dark' ? 'bg-[#C1A461]/20' : 'bg-amber-50'
  const avatarBg = theme === 'dark' ? 'bg-amber-500/20' : 'bg-amber-100'
  const focusTextColor = theme === 'dark' ? 'text-[#C1A461]' : 'text-amber-700'

  const handleLogout = async () => {
    try {
      await UserService.signOut()
      navigate('/auth')
    } catch (error) {
      console.error('Error logging out:', error)
    }
  }

  const handleProfileClick = () => {
    if (user.username) {
      navigate(`/profile/${user.username}`)
    } else {
      // Fallback to profile route if username is not available
      navigate('/profile')
    }
  }

  const menuItemClasses = `${textColor} focus:${hoverBg} focus:${focusTextColor} cursor-pointer`

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="cursor-pointer">
        <div className="flex items-center gap-4">
          <span className={`text-sm ${textColor}`}>{user.full_name}</span>
          <Avatar>
            {user.avatar_url ? (
              <AvatarImage
                src={user.avatar_url}
                alt={user.full_name || 'User avatar'}
              />
            ) : null}
            <AvatarFallback className={`${avatarBg} ${textColor}`}>
              {getInitials(user.full_name)}
            </AvatarFallback>
          </Avatar>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className={`w-56 ${dropdownBg} ${borderColor}`}>
        <DropdownMenuItem 
          className={menuItemClasses}
          onClick={handleProfileClick}
        >
          <User className="mr-2 h-4 w-4" />
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem 
          className={menuItemClasses}
          onClick={() => navigate('/editprofile')}
        >
          <Settings className="mr-2 h-4 w-4" />
          Edit Profile
        </DropdownMenuItem>
        <DropdownMenuSeparator className={borderColor} />
        <DropdownMenuItem 
          className={menuItemClasses}
          onClick={handleLogout}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}