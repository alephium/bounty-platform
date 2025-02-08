import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Image from "next/image"

export function ViewSubmissions() {
  return (
    <Card className="bg-[#1B2228] border-[#C1A461]/20">
      <CardHeader>
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-emerald-600 rounded-lg flex items-center justify-center">
            <Image src="/placeholder.svg" alt="Company Logo" width={32} height={32} className="text-white" />
          </div>
          <CardTitle className="text-[#C1A461]">Submissions</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {[
          {
            name: "Jake's Submission",
            url: "jake.substack.com/why-piper-coin...",
            avatar: "J",
          },
          {
            name: "Keith's Submission",
            url: "keith.substack.com/why-piper-coin...",
            avatar: "K",
          },
          {
            name: "Mike's Submission",
            url: "mike.substack.com/why-piper-coin...",
            avatar: "M",
          },
        ].map((submission) => (
          <div
            key={submission.name}
            className="flex items-center gap-4 p-4 rounded-lg border border-[#C1A461]/10 hover:border-[#C1A461]/20 transition-colors"
          >
            <Avatar>
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback className="bg-[#C1A461]/10 text-[#C1A461]">{submission.avatar}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-medium text-[#C1A461]">{submission.name}</h3>
              <p className="text-sm text-[#C1A461]/60">{submission.url}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}