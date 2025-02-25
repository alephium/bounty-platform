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

interface AvatarDropdownProps {
  user: {
    full_name?: string
    avatar_url?: string
    username?: string
  };
  getInitials: (name?: string) => string;
}

export function AvatarDropdown({ user, getInitials }: AvatarDropdownProps) {
  const navigate = useNavigate()
  // We no longer need to define theme-specific classes here since our
  // Tailwind config and global CSS handle dark mode automatically.

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
      navigate('/profile')
    }
  }

  // Use semantic classes based on your Tailwind config:
  // "text-foreground" for general text,
  // "bg-background" for backgrounds,
  // "border-border" for borders, etc.
  const menuItemClasses = "text-foreground focus:bg-secondary focus:text-primary cursor-pointer"

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="cursor-pointer">
        <div className="flex items-center gap-4">
          <span className="text-sm text-foreground">{user.full_name}</span>
          <Avatar>
            {user.avatar_url ? (
              <AvatarImage
                src={user.avatar_url}
                alt={user.full_name || 'User avatar'}
              />
            ) : null}
            <AvatarFallback className="bg-muted text-foreground">
              {getInitials(user.full_name)}
            </AvatarFallback>
          </Avatar>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-background border border-border">
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
        <DropdownMenuSeparator className="border-border" />
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