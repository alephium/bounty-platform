import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"

export function PostListing() {
  return (
    <Card className="bg-[#1B2228] border-[#C1A461]/20">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-emerald-600 rounded-lg flex items-center justify-center">
              <img src="/placeholder.svg" alt="Company Logo" width={32} height={32} className="text-white" />
            </div>
            <div>
              <CardTitle className="text-[#C1A461]">Write a Deep Dive on PiperCoin</CardTitle>
              <div className="flex items-center gap-2 mt-1 text-sm text-[#C1A461]/60">
                <span>By Pied Piper</span>
                <span>•</span>
                <span>Ends in 21 days</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[#C1A461]">◈</span>
            <span className="text-[#C1A461] font-bold">$1,000</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <Textarea
          placeholder="Pied Piper is a pioneering middle-out compression company. The company is looking for bounty hunters to deep dive into the $PIPER coin, and explain the coin's background and utility to noobs."
          className="min-h-[120px] bg-[#1B2228] border-[#C1A461]/20 text-[#C1A461] focus-visible:ring-[#C1A461]"
        />
        <div>
          <Label className="text-[#C1A461] mb-2 block">Skills</Label>
          <div className="flex flex-wrap gap-2">
            {["Writing", "Marketing", "Community"].map((skill) => (
              <Badge key={skill} className="bg-[#C1A461]/10 hover:bg-[#C1A461]/20 text-[#C1A461]">
                {skill}
              </Badge>
            ))}
          </div>
        </div>
        <Button className="w-full bg-[#C1A461] hover:bg-[#C1A461]/90 text-[#1B2228]">Post Bounty</Button>
      </CardContent>
    </Card>
  )
}

