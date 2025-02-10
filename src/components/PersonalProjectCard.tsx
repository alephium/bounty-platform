import { useState } from 'react'
import { Globe, MoreVertical, Pencil, Trash, X } from 'lucide-react'
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useTheme } from '@/contexts/ThemeContext'
import { supabase } from '@/lib/supabase'
import { toast } from 'sonner'

const skillOptions = {
  frontend: [
    { value: "react", label: "React" },
    { value: "vue", label: "Vue.js" },
    { value: "typescript", label: "TypeScript" },
    // Add more frontend skills as needed
  ],
  backend: [
    { value: "nodejs", label: "Node.js" },
    { value: "python", label: "Python" },
    { value: "java", label: "Java" },
    // Add more backend skills as needed
  ],
  blockchain: [
    { value: "solidity", label: "Solidity" },
    { value: "rust", label: "Rust" },
    { value: "web3", label: "Web3.js" },
    // Add more blockchain skills as needed
  ],
  design: [
    { value: "figma", label: "Figma" },
    { value: "ui", label: "UI Design" },
    { value: "ux", label: "UX Design" },
    // Add more design skills as needed
  ],
  content: [
    { value: "writing", label: "Content Writing" },
    { value: "editing", label: "Content Editing" },
    { value: "seo", label: "SEO Writing" },
    // Add more content skills as needed
  ]
}

interface ProjectCardProps {
  project: {
    id: string
    title: string
    description: string
    category: string
    skills: string[]
    project_url?: string
    user_id: string
  }
  onUpdate: (updatedProject: ProjectCardProps['project']) => void
  onDelete: (id: string) => void
  isOwner: boolean
}

export default function PersonalProjectCard({ project, onUpdate, onDelete, isOwner }: ProjectCardProps) {
  const { theme } = useTheme()
  const [isEditMode, setIsEditMode] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [editedProject, setEditedProject] = useState(project)
  const [isLoading, setIsLoading] = useState(false)

  // Theme-specific styles
  const textColor = theme === 'dark' ? 'text-[#C1A461]' : 'text-gray-900'
  const mutedTextColor = theme === 'dark' ? 'text-[#C1A461]/60' : 'text-gray-600'
  const cardBg = theme === 'dark' ? 'bg-[#1B2228]' : 'bg-white'
  const borderColor = theme === 'dark' ? 'border-[#C1A461]/20' : 'border-amber-200'
  const hoverBg = theme === 'dark' ? 'hover:bg-[#C1A461]/10' : 'hover:bg-amber-50'

  const handleDelete = async () => {
    try {
      setIsLoading(true)
      const { error } = await supabase
        .from('proof_of_work')
        .delete()
        .eq('id', project.id)

      if (error) throw error

      onDelete(project.id)
      toast.success('Project deleted successfully')
      setIsDeleteDialogOpen(false)
    } catch (error) {
      console.error('Error deleting project:', error)
      toast.error('Failed to delete project')
    } finally {
      setIsLoading(false)
    }
  }

  const handleUpdate = async () => {
    try {
      setIsLoading(true)

      // Basic validation
      if (!editedProject.title || !editedProject.description || !editedProject.category) {
        toast.error('Please fill in all required fields')
        return
      }

      // URL validation if provided
      if (editedProject.project_url) {
        try {
          new URL(editedProject.project_url)
        } catch {
          toast.error('Please enter a valid URL')
          return
        }
      }

      const { error } = await supabase
        .from('proof_of_work')
        .update(editedProject)
        .eq('id', project.id)

      if (error) throw error

      onUpdate(editedProject)
      toast.success('Project updated successfully')
      setIsEditMode(false)
    } catch (error) {
      console.error('Error updating project:', error)
      toast.error('Failed to update project')
    } finally {
      setIsLoading(false)
    }
  }

  if (isEditMode) {
    return (
      <Card className={`${cardBg} border-${borderColor}`}>
        <CardContent className="p-4 space-y-4">
          <div className="flex justify-between items-center">
            <Label className={textColor}>Title</Label>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsEditMode(false)}
              className={`${textColor} ${hoverBg}`}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          <Input
            value={editedProject.title}
            onChange={(e) => setEditedProject(prev => ({ ...prev, title: e.target.value }))}
            className={`bg-${cardBg} border-${borderColor} ${textColor}`}
          />

          <Label className={textColor}>Description</Label>
          <Textarea
            value={editedProject.description}
            onChange={(e) => setEditedProject(prev => ({ ...prev, description: e.target.value }))}
            className={`bg-${cardBg} border-${borderColor} ${textColor}`}
          />

          <Label className={textColor}>Category</Label>
          <Select
            value={editedProject.category}
            onValueChange={(value) => setEditedProject(prev => ({ ...prev, category: value }))}
          >
            <SelectTrigger className={`bg-${cardBg} border-${borderColor} ${textColor}`}>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent className={cardBg}>
              <SelectItem value="frontend">Frontend Development</SelectItem>
              <SelectItem value="backend">Backend Development</SelectItem>
              <SelectItem value="blockchain">Blockchain Development</SelectItem>
              <SelectItem value="design">Design</SelectItem>
              <SelectItem value="content">Content</SelectItem>
            </SelectContent>
          </Select>

          <Label className={textColor}>Project URL</Label>
          <Input
            value={editedProject.project_url}
            onChange={(e) => setEditedProject(prev => ({ ...prev, project_url: e.target.value }))}
            className={`bg-${cardBg} border-${borderColor} ${textColor}`}
            placeholder="https://example.com"
          />

          <div className="flex justify-end gap-2 pt-2">
            <Button
              variant="outline"
              onClick={() => setIsEditMode(false)}
              className={`border-${borderColor} ${textColor}`}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              onClick={handleUpdate}
              className="bg-[#C1A461] hover:bg-[#C1A461]/90 text-[#1B2228]"
              disabled={isLoading}
            >
              {isLoading ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <>
      <Card className={`${cardBg} border-${borderColor}`}>
        <CardContent className="p-4">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <h3 className={`font-medium ${textColor}`}>
                {project.title}
              </h3>
              
              <p className={`mt-2 ${mutedTextColor}`}>
                {project.description}
              </p>
              
              <div className="mt-4 flex flex-wrap gap-2">
                <Badge className="bg-[#C1A461]/20 text-[#C1A461] hover:bg-[#C1A461]/30">
                  {project.category}
                </Badge>
                
                {project.skills?.map((skill, index) => (
                  <Badge 
                    key={`${skill}-${index}`}
                    variant="outline" 
                    className="border-[#C1A461]/20 text-[#C1A461]"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>

              {project.project_url && (
                <a 
                  href={project.project_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`mt-3 inline-flex items-center text-sm ${mutedTextColor} hover:${textColor}`}
                >
                  <Globe className="w-4 h-4 mr-1" />
                  View Project
                </a>
              )}
            </div>

            {isOwner && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="ghost" 
                    className={`h-8 w-8 p-0 ${textColor} ${hoverBg}`}
                  >
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent 
                  className={`${cardBg} border-${borderColor}`}
                  align="end"
                >
                  <DropdownMenuItem 
                    className={`${textColor} ${hoverBg} cursor-pointer`}
                    onClick={() => setIsEditMode(true)}
                  >
                    <Pencil className="mr-2 h-4 w-4" />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className={borderColor} />
                  <DropdownMenuItem 
                    className="text-red-500 hover:text-red-600 hover:bg-red-100/10 cursor-pointer"
                    onClick={() => setIsDeleteDialogOpen(true)}
                  >
                    <Trash className="mr-2 h-4 w-4" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </CardContent>
      </Card>

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className={`${cardBg} border-${borderColor}`}>
          <DialogHeader>
            <DialogTitle className={textColor}>Delete Project</DialogTitle>
            <DialogDescription className={mutedTextColor}>
              Are you sure you want to delete this project? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex gap-2 sm:gap-0">
            <Button
              variant="outline"
              className={`border-${borderColor} ${textColor} ${hoverBg}`}
              onClick={() => setIsDeleteDialogOpen(false)}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={isLoading}
            >
              {isLoading ? 'Deleting...' : 'Delete'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}