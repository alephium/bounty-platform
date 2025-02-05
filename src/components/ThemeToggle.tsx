import { Moon, Sun } from 'lucide-react'
import { Button } from './ui/button'
import { useTheme } from '../contexts/ThemeContext'

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="w-8 h-8 flex items-center justify-center"
    >
      {theme === 'dark' ? (
        <Sun className="h-4 w-4 text-[#C1A461]" />
      ) : (
        <Moon className="h-4 w-4 text-gray-900" />
      )}
    </Button>
  )
}