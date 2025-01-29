import { useTheme } from '@/contexts/ThemeContext'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'

export default function Terms() {
  const { theme } = useTheme()

  // Theme-specific styles
  const bgColor = theme === 'dark' ? 'bg-[#1B2228]' : 'bg-gray-50'
  const textColor = theme === 'dark' ? 'text-[#C1A461]' : 'text-gray-900'
  const mutedTextColor = theme === 'dark' ? 'text-[#C1A461]/60' : 'text-gray-500'
  const borderColor = theme === 'dark' ? 'border-[#C1A461]/20' : 'border-amber-200'

  return (
    <div className={`min-h-screen ${bgColor} p-4 md:p-8`}>
      <div className="max-w-4xl mx-auto">
        <Card className={`${bgColor} ${borderColor}`}>
          <CardHeader>
            <CardTitle className={`text-2xl font-bold ${textColor}`}>
              Terms of Use
            </CardTitle>
            <p className={`${mutedTextColor}`}>
              Last updated: 04.10.2024
            </p>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[calc(100vh-16rem)] pr-6">
              <div className="space-y-6">
                <section>
                  <p className={textColor}>
                    These terms of use ("Terms") are entered into between PANDA SOFTWARE SA, 
                    a company limited by shares established under the laws of Switzerland and 
                    domiciled at Neuchâtel, Switzerland ("Company", "we" or "us"), developing 
                    tools for the Alephium blockchain ("Alephium") and the users ("you" or "your").
                  </p>
                </section>

                <section className="space-y-4">
                  <h2 className={`text-xl font-semibold ${textColor}`}>
                    Eligibility and Restricted Jurisdictions
                  </h2>
                  <p className={textColor}>
                    By accessing or using the Alephium Tools, you represent and warrant that you:
                  </p>
                  <ul className={`list-disc pl-6 space-y-2 ${textColor}`}>
                    <li>have the right, authority, and legal capacity to accept these Terms and that you are of the legal majority age in your country or jurisdiction of residence;</li>
                    <li>will not access and/or use the Alephium Tools if the laws of your countries of residency and/or citizenship prohibit you from doing so in accordance with these Terms;</li>
                    <li>are not subject to personal sanctions issued by the UN, US, EU or Switzerland;</li>
                    <li>only access or use the Alephium Tools for your own personal use;</li>
                    <li>are not accessing or using the Alephium Tools from one of the countries embargoed or restricted by the Swiss State Secretariat for Economic Affairs (SECO).</li>
                  </ul>
                </section>

                <section className="space-y-4">
                  <h2 className={`text-xl font-semibold ${textColor}`}>
                    Alephium Blockchain
                  </h2>
                  <p className={textColor}>
                    The Alephium blockchain ("Alephium Blockchain") is fully decentralized and is not 
                    operated or maintained by the Company. We do not facilitate any aspect of 
                    blockchain-based digital asset transactions. Any interaction with the Alephium 
                    Blockchain remains in your exclusive responsibility.
                  </p>
                </section>

                <section className="space-y-4">
                  <h2 className={`text-xl font-semibold ${textColor}`}>
                    Wallet Apps
                  </h2>
                  <h3 className={`text-lg font-medium ${textColor}`}>Overview</h3>
                  <p className={textColor}>
                    The Alephium Mobile Wallet, the Alephium Desktop Wallet, the Alephium Node 
                    Wallet, and the Alephium Browser Wallet (collectively "Wallet Apps") are 
                    self-custodial wallet software tools compatible with Alephium. They run locally 
                    on your device and allow you to self-manage your digital assets.
                  </p>
                </section>

                <section className="space-y-4">
                  <h2 className={`text-xl font-semibold ${textColor}`}>
                    Personal Data
                  </h2>
                  <p className={textColor}>
                    When you access and use the Alephium Tools, none of your personal data is 
                    collected, processed, used, and/or stored by the Company.
                  </p>
                  <p className={textColor}>
                    The Alephium Desktop and Mobile Wallet collect anonymized, non-sensitive data 
                    about your interactions and errors encountered such as:
                  </p>
                  <ul className={`list-disc pl-6 space-y-2 ${textColor}`}>
                    <li>a unique anonymous ID which is the only identification information generated upon the first launch of your wallet application;</li>
                    <li>button clicks;</li>
                    <li>number of Addresses;</li>
                    <li>number of contacts;</li>
                    <li>wallet preferences.</li>
                  </ul>
                </section>

                <section className="space-y-4">
                  <h2 className={`text-xl font-semibold ${textColor}`}>
                    Governing Law and Jurisdiction
                  </h2>
                  <p className={textColor}>
                    These Terms shall be governed and construed in accordance with the substantive 
                    laws of Switzerland. The application of the United Nations Convention on 
                    Contracts for the International Sale of Goods shall be excluded. Any dispute 
                    arising out of or in conjunction with these Terms shall be submitted to the 
                    exclusive jurisdiction of the ordinary courts of the city of Zurich, Switzerland.
                  </p>
                </section>
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}