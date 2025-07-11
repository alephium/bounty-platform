import { CreateSponsorProfile } from "../pages/CreateSponsorProfile"
import { PostListing } from "./PostListing"
import { ViewSubmissions } from "./ViewSubmission"
import { Zap, Briefcase, Check } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../components/ui/accordion"
import { Card, CardContent } from "../components/ui/card"
import { useTheme } from "@/contexts/ThemeContext"

export default function OnboardingSteps() {
  const { theme } = useTheme()
  
  
  return (
    <div className={`min-h-screen bg-theme-primary p-8`}>
      <div className="max-w-4xl mx-auto space-y-16">
        <section className="text-center space-y-12">
          <h1 className={`text-4xl font-bold text-theme-primary`}>Start by posting your first Bounty or Project</h1>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className={`card-theme hover:border-theme-accent transition-colors`}>
              <CardContent className="p-6 space-y-6">
                <div className="w-12 h-12 rounded-full bg-theme-accent flex items-center justify-center">
                  <Zap className="w-6 h-6 text-theme-primary" />
                </div>
                <div className="space-y-2">
                  <h2 className={`text-xl font-bold text-theme-primary`}>Bounty</h2>
                  <p className="text-theme-muted">
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
                    <li key={item} className={`flex items-start gap-2 text-theme-muted`}>
                      <Check className={`w-5 h-5 text-theme-primary flex-shrink-0 mt-0.5`} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className={`card-theme hover:border-theme-accent transition-colors`}>
              <CardContent className="p-6 space-y-6">
                <div className="w-12 h-12 rounded-full bg-theme-accent flex items-center justify-center">
                  <Briefcase className="w-6 h-6 text-theme-primary" />
                </div>
                <div className="space-y-2">
                  <h2 className={`text-xl font-bold text-theme-primary`}>Project</h2>
                  <p className="text-theme-muted">
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
                    <li key={item} className={`flex items-start gap-2 text-theme-muted`}>
                      <Check className={`w-5 h-5 text-theme-primary flex-shrink-0 mt-0.5`} />
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
            <h2 className={`text-lg font-bold text-theme-primary`}>STEP 1</h2>
            <p className="text-theme-muted">Create a profile</p>
          </div>
          <CreateSponsorProfile />
        </div>

        <div className="grid grid-cols-[auto,1fr] gap-8 items-start">
          <div className="sticky top-8 space-y-2">
            <h2 className="text-lg font-bold text-theme-primary">STEP 2</h2>
            <p className="text-theme-muted">Post your listing</p>
          </div>
          <PostListing />
        </div>

        <div className="grid grid-cols-[auto,1fr] gap-8 items-start">
          <div className="sticky top-8 space-y-2">
            <h2 className="text-lg font-bold text-theme-primary">STEP 3</h2>
            <p className="text-theme-muted">Get submissions</p>
          </div>
          <ViewSubmissions />
        </div>

        <section className="space-y-6">
          <h2 className={`text-3xl font-bold text-center text-theme-primary`}>FAQs</h2>
          <Accordion type="single" collapsible className="w-full">
            {[
              {
                question: "Who qualifies to be a sponsor?",
                answer:
                  "Any team or project that is building in the Alephium ecosystem can sponsor a listing on Contribium. Size of the team or operations don't matter — you can be a tokenised project or a small grantee; as long as you are building on the Alephium blockchain, you can add a listing on Contribium.",
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
                question: "What can I use Contribium for?",
                answer:
                  "You can use Contribium for a wide range of tasks including development, design, marketing, content creation, and community management.",
              },
              {
                question: "I need help with my listing. How can I get in touch?",
                answer:
                  "Our support team is available to help. You can reach out through our support channels or contact yy@alephium.org.",
              },
            ].map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-theme-primary">
                <AccordionTrigger className={`text-theme-primary hover:text-theme-primary hover:no-underline`}>
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-theme-muted">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>
      </div>
    </div>
  )
}