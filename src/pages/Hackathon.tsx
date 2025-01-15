import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Trophy, Users, Code, XCircle, UserPlus } from 'lucide-react'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter
} from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useUser } from "@/contexts/UserContext"
import { toast } from "@/components/ui/use-toast"
import { useHackathonParticipation } from "@/hooks/useHackathonParticipation"

export default function HackathonPage() {
  const navigate = useNavigate()
  const { user } = useUser()
  const { participation, team, loading, createTeam, registerAsSolo, leaveParticipation, addTeamMember } = 
    useHackathonParticipation(user?.id || '')
  
  const [isCreateTeamOpen, setIsCreateTeamOpen] = useState(false)
  const [isAddMemberOpen, setIsAddMemberOpen] = useState(false)
  const [formData, setFormData] = useState({
    teamName: "",
    teamDescription: "",
    memberUsername: ""
  })
  const [teamMembers, setTeamMembers] = useState<Array<{ username: string; full_name: string }>>([])

  const handleCreateTeam = async () => {
    if (!formData.teamName.trim()) {
      toast({
        description: "Team name is required",
        variant: "destructive"
      })
      return
    }

    const success = await createTeam(formData.teamName, formData.teamDescription)
    if (success) {
      toast({ description: "Team created successfully!" })
      setIsCreateTeamOpen(false)
      setFormData({ teamName: "", teamDescription: "", memberUsername: "" })
    } else {
      toast({
        description: "Failed to create team",
        variant: "destructive"
      })
    }
  }

  const handleLeaveParticipation = async () => {
    const success = await leaveParticipation()
    if (success) {
      toast({ 
        description: participation?.participation_type === 'team' 
          ? "Successfully left the team" 
          : "Successfully withdrew from solo participation"
      })
    } else {
      toast({
        description: "Failed to withdraw from participation",
        variant: "destructive"
      })
    }
  }

  const handleSoloRegistration = async () => {
    const success = await registerAsSolo()
    if (success) {
      toast({ description: "Successfully registered as solo hacker" })
    } else {
      toast({
        description: "Failed to register",
        variant: "destructive"
      })
    }
  }

  const handleAddMember = async () => {
    if (!formData.memberUsername.trim()) {
      toast({
        description: "Username is required",
        variant: "destructive"
      })
      return
    }
  
    try {
      await addTeamMember(formData.memberUsername)
      toast({ description: "Team member added successfully!" })
      setIsAddMemberOpen(false)
      setFormData(prev => ({ ...prev, memberUsername: "" }))
    } catch (error: any) {
      toast({
        description: error.message || "Failed to add team member",
        variant: "destructive"
      })
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#1B2228] flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-[#C1A461]" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#1B2228] p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-[#C1A461]">
            Alephium Hackathon -  CryptoXR 2025
          </h1>
          <p className="text-xl text-[#C1A461]/80">
            Build the Future of Decentralized Applications
          </p>
        </div>

        {/* Registration/Team Status Card */}
        <Card className="bg-[#1B2228] border-[#C1A461]/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-[#C1A461]">
              <Users className="w-5 h-5" />
              {participation ? (
                participation.participation_type === 'team' ? 'Your Team' : 'Solo Hacker'
              ) : 'Join Hackathon'}
            </CardTitle>
          </CardHeader>
          <CardContent>
          {participation?.participation_type === 'team' && team && (
            <>
              <div>
                <h3 className="font-semibold text-[#C1A461]">{team.name}</h3>
                <p className="text-sm text-[#C1A461]/80 mb-4">{team.description}</p>
                
                {/* Team Members Section */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <h4 className="text-[#C1A461] font-medium">Team Members</h4>
                    {/* Only show add member button if team isn't full */}
                    {!team.member5 && (
                      <Dialog open={isAddMemberOpen} onOpenChange={setIsAddMemberOpen}>
                        <DialogTrigger asChild>
                          <Button
                            size="sm"
                            className="bg-[#C1A461] hover:bg-[#C1A461]/90 text-[#1B2228]"
                          >
                            <UserPlus className="w-4 h-4 mr-2" />
                            Add Member
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="bg-[#1B2228] border-[#C1A461]/20">
                          <DialogHeader>
                            <DialogTitle className="text-[#C1A461]">
                              Add Team Member
                            </DialogTitle>
                            <DialogDescription className="text-[#C1A461]/80">
                              Enter the username of the person you want to add
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div className="space-y-2">
                              <Label className="text-[#C1A461]">Username</Label>
                              <Input
                                value={formData.memberUsername}
                                onChange={(e) => setFormData(prev => ({
                                  ...prev,
                                  memberUsername: e.target.value
                                }))}
                                placeholder="Enter username"
                                className="bg-[#1B2228] border-[#C1A461]/20 text-[#C1A461]"
                              />
                            </div>
                            <Button 
                              onClick={handleAddMember}
                              className="w-full bg-[#C1A461] hover:bg-[#C1A461]/90 text-[#1B2228]"
                            >
                              Add Member
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                    )}
                  </div>
                  
                  {/* Members List */}
                  <div className="space-y-2 border rounded-lg border-[#C1A461]/20 p-3">
                    {[team.member1, team.member2, team.member3, team.member4, team.member5]
                      .filter(Boolean)
                      .map((memberId, index) => (
                        <div 
                          key={memberId}
                          className="flex justify-between items-center text-[#C1A461]"
                        >
                          <span className="text-sm">
                            {index === 0 ? '👑 Team Leader' : `Member ${index + 1}`}
                          </span>
                        </div>
                      ))}
                  </div>
                </div>
              </div>

              <Button
                onClick={handleLeaveParticipation}
                variant="destructive"
                className="w-full mt-4"
              >
                <XCircle className="w-4 h-4 mr-2" />
                Leave Team
              </Button>
            </>
          )}
          </CardContent>
        </Card>

        {/* Submit Project Card */}
        <Card className="bg-[#1B2228] border-[#C1A461]/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-[#C1A461]">
              <Code className="w-5 h-5" />
              Submit Project
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-[#C1A461]/80">
              Submit your project for the hackathon
            </p>
          </CardContent>
          <CardFooter>
            <Button
              onClick={() => navigate('/hackathon/submit')}
              disabled={!participation}
              className="w-full bg-[#C1A461] hover:bg-[#C1A461]/90 text-[#1B2228] disabled:opacity-50"
            >
              {participation ? "Submit Project" : "Register First"}
            </Button>
          </CardFooter>
        </Card>

        {/* Prizes Card */}
        <Card className="bg-[#1B2228] border-[#C1A461]/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-[#C1A461]">
              <Trophy className="w-5 h-5" />
              Prize Pool
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-[#C1A461]/80">
              View available prizes and categories
            </p>
          </CardContent>
          <CardFooter>
            <Button
              onClick={() => navigate('/hackathon/prize')}
              className="w-full bg-[#C1A461] hover:bg-[#C1A461]/90 text-[#1B2228]"
            >
              View Prizes
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}