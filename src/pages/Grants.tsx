import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';

export default function Grants() {
  const bgColor = 'bg-background'
  const textColor = 'text-foreground'
  const borderColor = 'border-border'
  

  const grants = [
    {
      title: "Core Protocol Development",
      amount: "Up to $50,000",
      description: "Improvements to the core protocol, including consensus mechanism, networking layer, and virtual machine.",
      criteria: [
        "Must be well-tested and documented",
        "Should improve performance, security, or scalability",
        "Must pass security review"
      ]
    },
    {
      title: "Developer Tools & Infrastructure",
      amount: "Up to $30,000",
      description: "Tools and infrastructure to improve developer experience and ecosystem growth.",
      criteria: [
        "SDKs and libraries",
        "Development frameworks",
        "Testing tools and environments"
      ]
    },
    {
      title: "Applications & Use Cases",
      amount: "Up to $20,000",
      description: "Innovative applications built on the protocol that demonstrate real-world utility.",
      criteria: [
        "DeFi applications",
        "NFT platforms",
        "Cross-chain bridges",
        "Other novel use cases"
      ]
    }
  ];

  return (
    <div className={`min-h-screen ${bgColor}`}>
      {/* Hero Section */}
      <div className="max-w-4xl mx-auto py-12 px-4">
        <h1 className={`text-4xl font-bold mb-6 ${textColor}`}>
          Grant & Reward Program
        </h1>
        <p className={`text-lg mb-8 ${textColor} opacity-90`}>
          Supporting innovators and builders in the ecosystem through targeted funding and resources.
        </p>
        <div className="flex gap-4">
          <Button 
            className="bg-primary hover:bg-accent/60 text-primary-foreground"
            onClick={() => window.open('https://github.com/alephium/community/blob/master/Grant%26RewardProgram.md', '_blank')}
          >
            Apply Now
            <ArrowUpRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Grant Categories */}
      <div className="max-w-4xl mx-auto py-12 px-4">
        <h2 className={`text-2xl font-bold mb-8 ${textColor}`}>Grant Categories</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {grants.map((grant, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className={textColor}>{grant.title}</CardTitle>
                <div className={`text-lg font-semibold ${textColor}`}>
                  {grant.amount}
                </div>
              </CardHeader>
              <CardContent>
                <p className={`mb-4 ${textColor} opacity-80`}>
                  {grant.description}
                </p>
                <div className="space-y-2">
                  {grant.criteria.map((criterion, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className={`h-4 w-4 mt-1 ${textColor}`} />
                      <span className={`${textColor} opacity-80`}>{criterion}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Process Section */}
      <div className="max-w-4xl mx-auto py-12 px-4">
        <h2 className={`text-2xl font-bold mb-8 ${textColor}`}>Application Process</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <Card className={`${bgColor} ${borderColor}`}>
            <CardContent className="p-6">
              <h3 className={`text-xl font-semibold mb-4 ${textColor}`}>
                How to Apply
              </h3>
              <ol className={`space-y-4 ${textColor} opacity-80`}>
                <li>1. Review the grant categories and criteria</li>
                <li>2. Prepare a detailed proposal following the template</li>
                <li>3. Submit your proposal via GitHub</li>
                <li>4. Engage with the review committee</li>
                <li>5. Receive feedback and iterate</li>
              </ol>
            </CardContent>
          </Card>
          <Card className={`${bgColor} ${borderColor}`}>
            <CardContent className="p-6">
              <h3 className={`text-xl font-semibold mb-4 ${textColor}`}>
                Evaluation Criteria
              </h3>
              <ul className={`space-y-4 ${textColor} opacity-80`}>
                <li>• Technical feasibility and innovation</li>
                <li>• Impact on the ecosystem</li>
                <li>• Team experience and capability</li>
                <li>• Implementation timeline</li>
                <li>• Budget justification</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-4xl mx-auto py-12 px-4">
        <Card className={`${bgColor} ${borderColor}`}>
          <CardContent className="p-8 text-center">
            <h2 className={`text-2xl font-bold mb-4 ${textColor}`}>
              Ready to Build?
            </h2>
            <p className={`mb-6 ${textColor} opacity-90`}>
              Join the ecosystem and contribute to the future of decentralized applications.
            </p>
            <Button 
              className="bg-[#C1A461] hover:bg-[#C1A461]/90 text-[#1B2228]"
              onClick={() => window.open('https://docs.google.com/forms/d/e/1FAIpQLSexF7M7k7kDdJtsHKFGYZuw4uEP7dzRrxmTFaMQvdU8DdH3cA/viewform', '_blank')}
            >
              Start Your Application
              <ArrowUpRight className="ml-2 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}