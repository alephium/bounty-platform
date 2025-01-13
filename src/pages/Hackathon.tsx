import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Trophy, Users, Code, PlusCircle } from 'lucide-react'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter
} from "../components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { useUser } from "../contexts/UserContext"
import { toast } from "../components/ui/use-toast"
import { supabase } from "../lib/supabase"

interface User {
  id: string;
  full_name: string | null;
  username: string | null;
}

interface TeamMember {
  id: string;
  full_name: string;
  username: string;
  role: 'leader' | 'member';
}

interface TeamMemberResponse {
  id: string;
  role: 'leader' | 'member';
  users: User | null;  // matches your Supabase join query
}

interface Team {
  id: string;
  name: string;
  description: string;
  members: TeamMember[];
}

export default function HackathonPage() {
  const navigate = useNavigate()
  const { user } = useUser()
  const [isCreateTeamOpen, setIsCreateTeamOpen] = useState(false)
  const [isAddMemberOpen, setIsAddMemberOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [currentTeam, setCurrentTeam] = useState<Team | null>(null)
  const [formData, setFormData] = useState({
    teamName: "",
    teamDescription: ""
  })
  const [memberUsername, setMemberUsername] = useState("")

  // Fetch current user's team on mount
  useEffect(() => {
    fetchUserTeam()
  }, [user])

  const fetchUserTeam = async () => {
    try {
      if (!user?.id) return

      // Get user's team membership
      const { data: teamMember, error: memberError } = await supabase
        .from('team_members')
        .select('team_id, role')
        .eq('user_id', user.id)
        .single()

      if (memberError || !teamMember?.team_id) return

      // Get team details
      const { data: team, error: teamError } = await supabase
        .from('teams')
        .select('*')
        .eq('id', teamMember.team_id)
        .single()

      if (teamError) throw teamError

      // Get team members
      const { data: members, error: membersError } = await supabase
        .from('team_members')
        .select(`
          id,
          role,
          users:user_id (
            id,
            full_name,
            username
          )
        `)
        .eq('team_id', team.id) as { data: TeamMemberResponse[] | null, error: any }

      if (membersError) throw membersError

      const membersData: TeamMember[] = members?.map(m => ({
        id: m.id,
        full_name: m.users?.full_name || '',
        username: m.users?.username || '',
        role: m.role
      })) || []

      setCurrentTeam({
        ...team,
        members: membersData
      })

    } catch (error) {
      console.error('Error fetching team:', error)
      toast({
        description: "Failed to load team information",
        variant: "destructive"
      })
    }
  }

  const handleCreateTeam = async () => {
    try {
      setLoading(true)

      if (!formData.teamName.trim()) {
        toast({
          description: "Team name is required",
          variant: "destructive"
        })
        return
      }

      // Create team
      const { data: team, error: teamError } = await supabase
        .from('teams')
        .insert([
          {
            name: formData.teamName,
            description: formData.teamDescription,
            team_size: 1,
            status: 'active'
          }
        ])
        .select()
        .single()

      if (teamError) throw teamError

      // Add creator as team leader
      const { error: memberError } = await supabase
        .from('team_members')
        .insert([
          {
            team_id: team.id,
            user_id: user?.id,
            role: 'leader'
          }
        ])

      if (memberError) throw memberError

      toast({
        description: "Team created successfully!"
      })
      setIsCreateTeamOpen(false)
      setFormData({ teamName: "", teamDescription: "" })
      fetchUserTeam()

    } catch (error) {
      console.error('Error creating team:', error)
      toast({
        description: "Failed to create team. Please try again.",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  const handleAddMember = async () => {
    try {
      setLoading(true)

      if (!memberUsername.trim()) {
        toast({
          description: "Username is required",
          variant: "destructive"
        })
        return
      }

      // Get user by username
      const { data: memberUser, error: userError } = await supabase
        .from('users')
        .select('id')
        .eq('username', memberUsername.trim())
        .single()

      if (userError || !memberUser) {
        toast({
          description: "User not found",
          variant: "destructive"
        })
        return
      }

      // Check if user is already in a team
      const { data: existingMember, error: existingError } = await supabase
        .from('team_members')
        .select('id')
        .eq('user_id', memberUser.id)
        .single()

      if (existingMember) {
        toast({
          description: "User is already part of a team",
          variant: "destructive"
        })
        return
      }

      // Add team member
      const { error: memberError } = await supabase
        .from('team_members')
        .insert([
          {
            team_id: currentTeam?.id,
            user_id: memberUser.id,
            role: 'member'
          }
        ])

      if (memberError) throw memberError

      toast({
        description: "Team member added successfully!"
      })
      setIsAddMemberOpen(false)
      setMemberUsername("")
      fetchUserTeam()

    } catch (error) {
      console.error('Error adding team member:', error)
      toast({
        description: "Failed to add team member. Please try again.",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#1B2228] p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-[#C1A461]">Alephium Hackathon</h1>
          <p className="text-xl text-[#C1A461]/80">Build the Future of Decentralized Applications</p>
        </div>

        {/* Action Cards */}
        <div className="grid gap-6">
          {/* Prize Pool Card */}
          <Card className="bg-[#1B2228] border-[#C1A461]/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-[#C1A461]">
                <Trophy className="w-5 h-5" />
                Prize Pool
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-[#C1A461]/80">View the available prizes and rewards</p>
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

          {/* Team Card */}
          <Card className="bg-[#1B2228] border-[#C1A461]/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-[#C1A461]">
                <Users className="w-5 h-5" />
                Your Team
              </CardTitle>
            </CardHeader>
            <CardContent>
              {currentTeam ? (
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-[#C1A461]">{currentTeam.name}</h3>
                    <p className="text-sm text-[#C1A461]/80">{currentTeam.description}</p>
                  </div>
                  <div className="space-y-2">
                    {currentTeam.members.map((member) => (
                      <div 
                        key={member.id}
                        className="flex items-center justify-between p-2 rounded-lg border border-[#C1A461]/20"
                      >
                        <span className="text-[#C1A461]">{member.full_name}</span>
                        <span className="text-sm text-[#C1A461]/60">{member.role}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <p className="text-[#C1A461]/80">Create or join a team to participate</p>
              )}
            </CardContent>
            <CardFooter className="flex gap-2">
              {!currentTeam ? (
                <Dialog open={isCreateTeamOpen} onOpenChange={setIsCreateTeamOpen}>
                  <DialogTrigger asChild>
                    <Button className="w-full bg-[#C1A461] hover:bg-[#C1A461]/90 text-[#1B2228]">
                      Create Team
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-[#1B2228] border-[#C1A461]/20">
                    <DialogHeader>
                      <DialogTitle className="text-[#C1A461]">Create a New Team</DialogTitle>
                      <DialogDescription className="text-[#C1A461]/80">
                        Form a team to participate in the hackathon
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label className="text-[#C1A461]">Team Name</Label>
                        <Input
                          value={formData.teamName}
                          onChange={(e) => setFormData(prev => ({ ...prev, teamName: e.target.value }))}
                          className="bg-[#1B2228] border-[#C1A461]/20 text-[#C1A461]"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-[#C1A461]">Description</Label>
                        <Input
                          value={formData.teamDescription}
                          onChange={(e) => setFormData(prev => ({ ...prev, teamDescription: e.target.value }))}
                          className="bg-[#1B2228] border-[#C1A461]/20 text-[#C1A461]"
                        />
                      </div>
                      <Button 
                        onClick={handleCreateTeam}
                        disabled={loading}
                        className="w-full bg-[#C1A461] hover:bg-[#C1A461]/90 text-[#1B2228]"
                      >
                        {loading ? "Creating..." : "Create Team"}
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              ) : (
                <Dialog open={isAddMemberOpen} onOpenChange={setIsAddMemberOpen}>
                  <DialogTrigger asChild>
                    <Button className="flex-1 bg-[#C1A461] hover:bg-[#C1A461]/90 text-[#1B2228]">
                      <PlusCircle className="w-4 h-4 mr-2" />
                      Add Member
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-[#1B2228] border-[#C1A461]/20">
                    <DialogHeader>
                      <DialogTitle className="text-[#C1A461]">Add Team Member</DialogTitle>
                      <DialogDescription className="text-[#C1A461]/80">
                        Invite someone to join your team using their username
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label className="text-[#C1A461]">Username</Label>
                        <Input
                          value={memberUsername}
                          onChange={(e) => setMemberUsername(e.target.value)}
                          className="bg-[#1B2228] border-[#C1A461]/20 text-[#C1A461]"
                          placeholder="Enter username"
                        />
                      </div>
                      <Button 
                        onClick={handleAddMember}
                        disabled={loading}
                        className="w-full bg-[#C1A461] hover:bg-[#C1A461]/90 text-[#1B2228]"
                      >
                        {loading ? "Adding..." : "Add Member"}
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              )}
            </CardFooter>
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
              <p className="text-[#C1A461]/80">Submit your project for the hackathon</p>
            </CardContent>
            <CardFooter>
              <Button
                onClick={() => navigate('/hackathon/submit')}
                disabled={!currentTeam}
                className="w-full bg-[#C1A461] hover:bg-[#C1A461]/90 text-[#1B2228] disabled:opacity-50"
              >
                {currentTeam ? "Submit Project" : "Join Team First"}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}