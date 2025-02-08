import { CreateProfile } from "../components/CreateSponsorProfile"
import { PostListing } from "../components/PostListing"
import { ViewSubmissions } from "../components/ViewSubmission"
import { Zap, Briefcase, Check } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card, CardContent } from "@/components/ui/card"

export default function OnboardingSteps() {
  return (
    <div className="min-h-screen bg-[#1B2228] p-8">
      <div className="max-w-4xl mx-auto space-y-16">
        <section className="text-center space-y-12">
          <h1 className="text-4xl font-bold text-[#C1A461]">Start by posting your first Bounty or Project</h1>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="bg-[#1B2228] border-[#C1A461]/20 hover:border-[#C1A461]/40 transition-colors">
              <CardContent className="p-6 space-y-6">
                <div className="w-12 h-12 rounded-full bg-[#C1A461]/10 flex items-center justify-center">
                  <Zap className="w-6 h-6 text-[#C1A461]" />
                </div>
                <div className="space-y-2">
                  <h2 className="text-xl font-bold text-[#C1A461]">Bounty</h2>
                  <p className="text-[#C1A461]/80">
                    Bounties are listings where everyone completes a given scope of work, and competes for the prize
                    pool
                  </p>
                </div>
                <ul className="space-y-3">
                  {[
                    "Great for awareness campaigns where you want to reach the most people possible",
                    "Get multiple options to choose from",
                    "Examples: Twitter Threads, Deep-Dives, Memes, Product Feedback, and more",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-[#C1A461]/80">
                      <Check className="w-5 h-5 text-[#C1A461] flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-[#1B2228] border-[#C1A461]/20 hover:border-[#C1A461]/40 transition-colors">
              <CardContent className="p-6 space-y-6">
                <div className="w-12 h-12 rounded-full bg-[#C1A461]/10 flex items-center justify-center">
                  <Briefcase className="w-6 h-6 text-[#C1A461]" />
                </div>
                <div className="space-y-2">
                  <h2 className="text-xl font-bold text-[#C1A461]">Project</h2>
                  <p className="text-[#C1A461]/80">
                    Projects are freelance gigs — people apply with their proposals but don't begin working until you
                    pick them
                  </p>
                </div>
                <ul className="space-y-3">
                  {[
                    "Perfect for work that requires collaboration and iteration",
                    "Single output that is specific to your exact needs",
                    "Examples: Full Stack Development, Hype Video Production, Hiring a Community Manager, and more",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-[#C1A461]/80">
                      <Check className="w-5 h-5 text-[#C1A461] flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        <div className="grid grid-cols-[auto,1fr] gap-8 items-start">
          <div className="sticky top-8 space-y-2">
            <h2 className="text-lg font-bold text-[#C1A461]">STEP 1</h2>
            <p className="text-[#C1A461]/60">Create a profile</p>
          </div>
          <CreateProfile />
        </div>

        <div className="grid grid-cols-[auto,1fr] gap-8 items-start">
          <div className="sticky top-8 space-y-2">
            <h2 className="text-lg font-bold text-[#C1A461]">STEP 2</h2>
            <p className="text-[#C1A461]/60">Post your listing</p>
          </div>
          <PostListing />
        </div>

        <div className="grid grid-cols-[auto,1fr] gap-8 items-start">
          <div className="sticky top-8 space-y-2">
            <h2 className="text-lg font-bold text-[#C1A461]">STEP 3</h2>
            <p className="text-[#C1A461]/60">Get submissions</p>
          </div>
          <ViewSubmissions />
        </div>

        <section className="space-y-6">
          <h2 className="text-3xl font-bold text-center text-[#C1A461]">FAQs</h2>
          <Accordion type="single" collapsible className="w-full">
            {[
              {
                question: "Who qualifies to be a sponsor?",
                answer:
                  "Any team or project that is building in the Solana ecosystem can sponsor a listing on Superteam Earn. Size of the team or operations don't matter — you can be a tokenised project or a small grantee; as long as you are building on the Solana blockchain, you can add a listing on Earn.",
              },
              {
                question: "How much money do I need to put up?",
                answer:
                  "The minimum budget varies depending on the type of work and complexity. We recommend discussing your specific needs with our team.",
              },
              {
                question: "Who judges the bounties & projects?",
                answer:
                  "Bounties are typically judged by the sponsoring team, while projects are directly managed between the sponsor and the selected freelancer.",
              },
              {
                question: "Are there any hidden costs and charges?",
                answer:
                  "No, all fees and charges are transparent and discussed upfront before listing your bounty or project.",
              },
              {
                question: "What can I use Superteam Earn for?",
                answer:
                  "You can use Superteam Earn for a wide range of tasks including development, design, marketing, content creation, and community management.",
              },
              {
                question: "I need help with my listing. How can I get in touch?",
                answer:
                  "Our support team is available to help. You can reach out through our support channels or contact form.",
              },
            ].map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-[#C1A461]/20">
                <AccordionTrigger className="text-[#C1A461] hover:text-[#C1A461] hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-[#C1A461]/80">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>
      </div>
    </div>
  )
}

