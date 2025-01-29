import { useTheme } from '@/contexts/ThemeContext'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'

export default function Privacy() {
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
              Privacy Policy
            </CardTitle>
            <p className={mutedTextColor}>
              Last modified: June 10, 2024
            </p>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[calc(100vh-16rem)] pr-6">
              <div className="space-y-6">
                <section>
                  <p className={textColor}>
                    This Privacy Policy (the "Policy") explains how Alephium ("Panda Software SA", 
                    "Alephium Developer", the "Company", "we", "us" or "our") collects, uses, and 
                    shares data in connection with the Alephium website (alephium.org), the Alephium 
                    wallets and all of our other properties, products, and services (the "Services").
                  </p>
                </section>

                <section className="space-y-4">
                  <h2 className={`text-xl font-semibold ${textColor}`}>
                    High Level Summary
                  </h2>
                  <ul className={`list-disc pl-6 space-y-2 ${textColor}`}>
                    <li>Alephium does not collect and store personal data, such as first name, last name, street address, date of birth, email address, or IP address.</li>
                    <li>Alephium collects non-identifiable data, such as device type, browser version, etc. This is to help drive production vision, not track users.</li>
                    <li>Alephium continues to explore methods to further protect consumers' privacy.</li>
                    <li>Users are empowered to explore client-side privacy techniques and tools.</li>
                    <li>Any material changes to privacy will be reflected in an updated privacy policy.</li>
                  </ul>
                </section>

                <section className="space-y-4">
                  <h2 className={`text-xl font-semibold ${textColor}`}>
                    Data We Collect
                  </h2>
                  <p className={textColor}>
                    Privacy is central to everything we do. Accordingly, we aspire to be transparent 
                    about what little data we do collect. We do not maintain user accounts and do 
                    not collect and store personal data, such as your name or internet protocol ("IP") 
                    address.
                  </p>
                  <div className="space-y-4">
                    <h3 className={`text-lg font-medium ${textColor}`}>Website Analytics</h3>
                    <p className={textColor}>
                      In our website at alephium.org we are using GoatCounter, a privacy-friendly web 
                      analytics tool. The following information can be stored:
                    </p>
                    <ul className={`list-disc pl-6 space-y-2 ${textColor}`}>
                      <li>URL of the visited page</li>
                      <li>Referer header</li>
                      <li>Browser and system information</li>
                      <li>Screen size</li>
                      <li>Country and region name derived from the IP address</li>
                      <li>Browser language</li>
                    </ul>
                  </div>
                  <div className="space-y-4">
                    <h3 className={`text-lg font-medium ${textColor}`}>Wallet Analytics</h3>
                    <p className={textColor}>
                      In our desktop and mobile wallets we are using PostHog. The information collected 
                      is completely anonymous. Only events such as button clicks and data such as 
                      number of wallets, addresses, contacts and wallet preferences are recorded.
                    </p>
                  </div>
                </section>

                <section className="space-y-4">
                  <h2 className={`text-xl font-semibold ${textColor}`}>
                    How We Use Data
                  </h2>
                  <p className={textColor}>
                    We use the data we collect to learn more about how users use the Services and 
                    where we can improve your experience. This data is also useful for debugging 
                    purposes.
                  </p>
                </section>

                <section className="space-y-4">
                  <h2 className={`text-xl font-semibold ${textColor}`}>
                    Security
                  </h2>
                  <p className={textColor}>
                    We implement and maintain reasonable administrative, physical, and technical 
                    security safeguards to help protect data from loss, theft, misuse, unauthorized 
                    access, disclosure, alteration, and destruction. You are responsible for all of 
                    your activity on the Services, including the security of your blockchain network 
                    addresses, cryptocurrency wallets, and their cryptographic keys.
                  </p>
                </section>

                <section className="space-y-4">
                  <h2 className={`text-xl font-semibold ${textColor}`}>
                    Contact Us
                  </h2>
                  <p className={textColor}>
                    If you have any questions about this Policy or how we collect, use, or share 
                    your information, please contact us at{' '}
                    <a 
                      href="mailto:info@alephium.org" 
                      className="text-[#C1A461] hover:underline"
                    >
                      info@alephium.org
                    </a>
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