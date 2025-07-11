import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function GrantsPage() {
  return (
    <div className="min-h-screen bg-[#1B2228] py-16 px-4">
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-[#C1A461] font-sentient">Need funds to build out your idea?</h1>
          <p className="text-[#C1A461]/80 text-lg max-w-2xl mx-auto">
            Discover the complete list of crypto grants available to support your project. Fast, equity-free funding
            without the hassle.
          </p>
          <div className="flex items-center justify-center gap-2 pt-2">
            {["Equity-Free", "No Bullshit", "Fast AF"].map((tag) => (
              <Badge
                key={tag}
                className="bg-[#C1A461]/10 hover:bg-[#C1A461]/20 text-[#C1A461] border border-[#C1A461]/20"
              >
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {grants.map((grant) => (
            <Card key={grant.id} className="bg-[#1B2228] border-[#C1A461]/20 overflow-hidden">
              <CardHeader className="p-0">
              <div className="h-48 relative">
                <img
                  src={grant.image || "/placeholder.svg"}
                  alt={grant.name}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
              </CardHeader>
              <CardContent className="pt-4">
                <h3 className="text-lg font-bold text-[#C1A461]">{grant.name}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[#C1A461] text-sm">◈</span>
                  <span className="text-[#C1A461]/80 text-sm">{grant.amount}</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-[#C1A461]/10 hover:bg-[#C1A461]/20 text-[#C1A461] border border-[#C1A461]/20">
                  Apply Now
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

const grants = [
  {
    id: 1,
    name: "ALEPHIUM Microgrants Program",
    amount: "Up to 10k USDC",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: 2,
    name: " DAO Grants",
    amount: "Up to 10k USDC",
    image: "/placeholder.svg?height=400&width=600&text=Jupiter",
  },
  {
    id: 3,
    name: " Grants",
    amount: "250-5k JUP",
    image: "/placeholder.svg?height=400&width=600&text=Uplink",
  },
  {
    id: 4,
    name: "Regional Events",
    amount: "Up to 750 USDC",
    image: "/placeholder.svg?height=400&width=600&text=Regional",
  }
  // },
  // {
  //   id: 5,
  //   name: "mtnDAO Grants Program",
  //   amount: "Up to 10k USDC",
  //   image: "/placeholder.svg?height=400&width=600&text=mtnDAO",
  // },
  // {
  //   id: 6,
  //   name: "solBoston Grants Program",
  //   amount: "Up to 10k USDC",
  //   image: "/placeholder.svg?height=400&width=600&text=solBoston",
  // },
  // {
  //   id: 7,
  //   name: "The PORT Grants Program",
  //   amount: "Up to 10k USDC",
  //   image: "/placeholder.svg?height=400&width=600&text=PORT",
  // },
  // {
  //   id: 8,
  //   name: "tidalDAO Grants Program",
  //   amount: "Up to 10k USDC",
  //   image: "/placeholder.svg?height=400&width=600&text=tidalDAO",
  // },
  // {
  //   id: 9,
  //   name: "Vortx Grants Program",
  //   amount: "Up to 10k USDC",
  //   image: "/placeholder.svg?height=400&width=600&text=Vortx",
  // },
]
