"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Checkbox } from "@/components/ui/checkbox"
import { X, Upload, Github, Twitter, Linkedin, Globe, MessageCircle } from 'lucide-react'
import { useTheme } from '@/contexts/ThemeContext'

export default function EditProfile() {
  const [selectedSkills, setSelectedSkills] = useState<string[]>([])
  const { theme } = useTheme()

  const cardBg = theme === 'dark' ? 'bg-[#1B2228]' : 'bg-white'
  const mutedTextColor = theme === 'dark' ? 'text-[#C1A461]/60' : 'text-gray-500'
  const inputBg = theme === 'dark' ? 'bg-[#1B2228]' : 'bg-white'
  const focusRing = theme === 'dark' ? 'focus-visible:ring-[#C1A461]' : 'focus-visible:ring-amber-500'
  const badgeBg = theme === 'dark' ? 'bg-[#C1A461]/20' : 'bg-amber-100'
  const buttonHover = theme === 'dark' ? 'hover:bg-[#C1A461]/90' : 'hover:bg-amber-600'
  const bgColor = theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'
  const textColor = theme === 'dark' ? 'text-[#C1A461]' : 'text-gray-900'
  const borderColor = theme === 'dark' ? 'border-[#C1A461]/20' : 'border-amber-200'
  const hoverBg = theme === 'dark' ? 'bg-[#C1A461]/20' : 'bg-amber-50'
  const avatarBg = theme === 'dark' ? 'bg-amber-500/20' : 'bg-amber-100'
  const focusTextColor = theme === 'dark' ? 'text-[#C1A461]' : 'text-amber-700'
  const commonInputClasses = "bg-white dark:bg-[#1B2228] border-amber-200 dark:border-amber-500/20 text-gray-900 dark:text-[#C1A461] focus-visible:ring-amber-500 dark:focus-visible:ring-[#C1A461]"
  const labelClasses = "text-gray-900 dark:text-[#C1A461]"
  const mutedTextClasses = "text-gray-500 dark:text-[#C1A461]/60"

  return (
    <div className={`min-h-screen ${bgColor} ${textColor} p-4`}>
      <div className="max-w-3xl mx-auto">
        <Card className={`${cardBg} ${borderColor}`}>
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-[#C1A461]">Edit Profile</CardTitle>
          </CardHeader>
          <CardContent className="space-y-8">
            {/* Personal Info */}
            <section className="space-y-6">
              <h2 className="text-lg font-semibold text-[#C1A461]">PERSONAL INFO</h2>
              
              <div className="space-y-4">
                <div>
                  <Label>Profile Picture</Label>
                  <div className="mt-2 flex items-center gap-4">
                    <Avatar className="w-24 h-24">
                      <AvatarImage src="/placeholder.svg" />
                      <AvatarFallback>YL</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 border-2 border-dashed border-[#C1A461]/20 rounded-lg p-4 text-center">
                      <Button variant="outline" className="border-[#C1A461]/20 text-[#C1A461] hover:bg-[#C1A461]/20">
                        <Upload className="w-4 h-4 mr-2" />
                        Choose or drag and drop media
                      </Button>
                      <p className="text-sm text-[#C1A461]/60 mt-2">Maximum size 5 MB</p>
                    </div>
                  </div>
                </div>

                <div>
                  <Label htmlFor="username">Username *</Label>
                  <Input 
                    id="username" 
                    value="yy" 
                    className={`${inputBg} ${borderColor} ${textColor} ${focusRing}`}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input 
                      id="firstName" 
                      value="" 
                      className={`${inputBg} ${borderColor} ${textColor} ${focusRing}`}
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input 
                      id="lastName" 
                      value="" 
                      className={`${inputBg} ${borderColor} ${textColor} ${focusRing}`}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="bio">Your One-Line Bio</Label>
                  <Textarea 
                    id="bio" 
                    placeholder=""
                    className={`${inputBg} ${borderColor} ${textColor} ${focusRing}`}
                  />
                </div>

                <div>
                  <Label htmlFor="wallet">Your Alephium Wallet Address *</Label>
                  <Input 
                    id="wallet" 
                    placeholder="Wallet Address"
                    className={`${inputBg} ${borderColor} ${textColor} ${focusRing}`}
                  />
                </div>
              </div>
            </section>

            {/* Socials */}
            <section className="space-y-6">
              <h2 className="text-lg font-semibold text-[#C1A461]">SOCIALS</h2>
              <div className="space-y-4">
                {[
                  { icon: Github, placeholder: "github.com/", value: "" },
                  { icon: Twitter, placeholder: "x.com/", value: "" },
                  { icon: Linkedin, placeholder: "linkedin.com/in/", value: "" },
                  { icon: MessageCircle, placeholder: "t.me/", value: "" },
                  { icon: Globe, placeholder: "https://", value: "" },
                ].map((social, index) => (
                  <div key={index} className="relative">
                    <social.icon className="w-5 h-5 absolute left-3 top-2.5 text-[#C1A461]/60" />
                    <Input 
                      value={social.value}
                      className={`${inputBg} ${borderColor} ${textColor} ${focusRing}`}
                      placeholder={social.placeholder}
                    />
                  </div>
                ))}
              </div>
            </section>

            {/* Work */}
            <section className="space-y-6">
              <h2 className="text-lg font-semibold text-[#C1A461]">WORK</h2>
              <div className="space-y-4">
                <div>
                  <Label>What areas of Web3 are you most interested in?</Label>
                  <Select>
                    <SelectTrigger  className={`${inputBg} ${borderColor} ${textColor} ${focusRing}`}>
                      <SelectValue placeholder="Select areas" />
                    </SelectTrigger>
                    <SelectContent  className={`${inputBg} ${borderColor} ${textColor} ${focusRing}`}>
                      <SelectItem value="defi">DeFi</SelectItem>
                      <SelectItem value="nft">NFTs</SelectItem>
                      <SelectItem value="dao">DAOs</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Community Affiliations</Label>
                  <Select defaultValue="superteam">
                    <SelectTrigger  className={`${inputBg} ${borderColor} ${textColor} ${focusRing}`}>
                      <SelectValue placeholder="Select community" />
                    </SelectTrigger>
                    <SelectContent className={`${inputBg} ${borderColor} ${textColor} ${focusRing}`}>
                      <SelectItem value="superteam">Superteam Germany</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Work Experience</Label>
                  <Select defaultValue="2-5">
                    <SelectTrigger  className={`${inputBg} ${borderColor} ${textColor} ${focusRing}`}>
                      <SelectValue placeholder="Select experience" />
                    </SelectTrigger>
                    <SelectContent className={`${inputBg} ${borderColor} ${textColor} ${focusRing}`}>
                      <SelectItem value="0-1">0 to 1 Year</SelectItem>
                      <SelectItem value="2-5">2 to 5 Years</SelectItem>
                      <SelectItem value="5+">more than 5 Years</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Location</Label>
                  <Select defaultValue="">
                    <SelectTrigger className={`${inputBg} ${borderColor} ${textColor}`}>
                      <SelectValue placeholder="Select location" />
                    </SelectTrigger>
                    <SelectContent className={`${cardBg} ${borderColor}`}>
                      <SelectItem value="afghanistan">Afghanistan</SelectItem>
                      <SelectItem value="albania">Albania</SelectItem>
                      <SelectItem value="algeria">Algeria</SelectItem>
                      <SelectItem value="andorra">Andorra</SelectItem>
                      <SelectItem value="angola">Angola</SelectItem>
                      <SelectItem value="antigua-and-barbuda">Antigua and Barbuda</SelectItem>
                      <SelectItem value="argentina">Argentina</SelectItem>
                      <SelectItem value="armenia">Armenia</SelectItem>
                      <SelectItem value="australia">Australia</SelectItem>
                      <SelectItem value="austria">Austria</SelectItem>
                      <SelectItem value="azerbaijan">Azerbaijan</SelectItem>
                      <SelectItem value="bahamas">Bahamas</SelectItem>
                      <SelectItem value="bahrain">Bahrain</SelectItem>
                      <SelectItem value="bangladesh">Bangladesh</SelectItem>
                      <SelectItem value="barbados">Barbados</SelectItem>
                      <SelectItem value="belarus">Belarus</SelectItem>
                      <SelectItem value="belgium">Belgium</SelectItem>
                      <SelectItem value="belize">Belize</SelectItem>
                      <SelectItem value="benin">Benin</SelectItem>
                      <SelectItem value="bhutan">Bhutan</SelectItem>
                      <SelectItem value="bolivia">Bolivia</SelectItem>
                      <SelectItem value="bosnia-and-herzegovina">Bosnia and Herzegovina</SelectItem>
                      <SelectItem value="botswana">Botswana</SelectItem>
                      <SelectItem value="brazil">Brazil</SelectItem>
                      <SelectItem value="brunei">Brunei</SelectItem>
                      <SelectItem value="bulgaria">Bulgaria</SelectItem>
                      <SelectItem value="burkina-faso">Burkina Faso</SelectItem>
                      <SelectItem value="burundi">Burundi</SelectItem>
                      <SelectItem value="cambodia">Cambodia</SelectItem>
                      <SelectItem value="cameroon">Cameroon</SelectItem>
                      <SelectItem value="canada">Canada</SelectItem>
                      <SelectItem value="cape-verde">Cape Verde</SelectItem>
                      <SelectItem value="central-african-republic">Central African Republic</SelectItem>
                      <SelectItem value="chad">Chad</SelectItem>
                      <SelectItem value="chile">Chile</SelectItem>
                      <SelectItem value="china">China</SelectItem>
                      <SelectItem value="colombia">Colombia</SelectItem>
                      <SelectItem value="comoros">Comoros</SelectItem>
                      <SelectItem value="congo">Congo</SelectItem>
                      <SelectItem value="costa-rica">Costa Rica</SelectItem>
                      <SelectItem value="croatia">Croatia</SelectItem>
                      <SelectItem value="cuba">Cuba</SelectItem>
                      <SelectItem value="cyprus">Cyprus</SelectItem>
                      <SelectItem value="czech-republic">Czech Republic</SelectItem>
                      <SelectItem value="denmark">Denmark</SelectItem>
                      <SelectItem value="djibouti">Djibouti</SelectItem>
                      <SelectItem value="dominica">Dominica</SelectItem>
                      <SelectItem value="dominican-republic">Dominican Republic</SelectItem>
                      <SelectItem value="east-timor">East Timor</SelectItem>
                      <SelectItem value="ecuador">Ecuador</SelectItem>
                      <SelectItem value="egypt">Egypt</SelectItem>
                      <SelectItem value="el-salvador">El Salvador</SelectItem>
                      <SelectItem value="equatorial-guinea">Equatorial Guinea</SelectItem>
                      <SelectItem value="eritrea">Eritrea</SelectItem>
                      <SelectItem value="estonia">Estonia</SelectItem>
                      <SelectItem value="ethiopia">Ethiopia</SelectItem>
                      <SelectItem value="fiji">Fiji</SelectItem>
                      <SelectItem value="finland">Finland</SelectItem>
                      <SelectItem value="france">France</SelectItem>
                      <SelectItem value="gabon">Gabon</SelectItem>
                      <SelectItem value="gambia">Gambia</SelectItem>
                      <SelectItem value="georgia">Georgia</SelectItem>
                      <SelectItem value="germany">Germany</SelectItem>
                      <SelectItem value="ghana">Ghana</SelectItem>
                      <SelectItem value="greece">Greece</SelectItem>
                      <SelectItem value="grenada">Grenada</SelectItem>
                      <SelectItem value="guatemala">Guatemala</SelectItem>
                      <SelectItem value="guinea">Guinea</SelectItem>
                      <SelectItem value="guinea-bissau">Guinea-Bissau</SelectItem>
                      <SelectItem value="guyana">Guyana</SelectItem>
                      <SelectItem value="haiti">Haiti</SelectItem>
                      <SelectItem value="honduras">Honduras</SelectItem>
                      <SelectItem value="hungary">Hungary</SelectItem>
                      <SelectItem value="iceland">Iceland</SelectItem>
                      <SelectItem value="india">India</SelectItem>
                      <SelectItem value="indonesia">Indonesia</SelectItem>
                      <SelectItem value="iran">Iran</SelectItem>
                      <SelectItem value="iraq">Iraq</SelectItem>
                      <SelectItem value="ireland">Ireland</SelectItem>
                      <SelectItem value="israel">Israel</SelectItem>
                      <SelectItem value="italy">Italy</SelectItem>
                      <SelectItem value="ivory-coast">Ivory Coast</SelectItem>
                      <SelectItem value="jamaica">Jamaica</SelectItem>
                      <SelectItem value="japan">Japan</SelectItem>
                      <SelectItem value="jordan">Jordan</SelectItem>
                      <SelectItem value="kazakhstan">Kazakhstan</SelectItem>
                      <SelectItem value="kenya">Kenya</SelectItem>
                      <SelectItem value="kiribati">Kiribati</SelectItem>
                      <SelectItem value="korea-north">Korea, North</SelectItem>
                      <SelectItem value="korea-south">Korea, South</SelectItem>
                      <SelectItem value="kosovo">Kosovo</SelectItem>
                      <SelectItem value="kuwait">Kuwait</SelectItem>
                      <SelectItem value="kyrgyzstan">Kyrgyzstan</SelectItem>
                      <SelectItem value="laos">Laos</SelectItem>
                      <SelectItem value="latvia">Latvia</SelectItem>
                      <SelectItem value="lebanon">Lebanon</SelectItem>
                      <SelectItem value="lesotho">Lesotho</SelectItem>
                      <SelectItem value="liberia">Liberia</SelectItem>
                      <SelectItem value="libya">Libya</SelectItem>
                      <SelectItem value="liechtenstein">Liechtenstein</SelectItem>
                      <SelectItem value="lithuania">Lithuania</SelectItem>
                      <SelectItem value="luxembourg">Luxembourg</SelectItem>
                      <SelectItem value="macedonia">Macedonia</SelectItem>
                      <SelectItem value="madagascar">Madagascar</SelectItem>
                      <SelectItem value="malawi">Malawi</SelectItem>
                      <SelectItem value="malaysia">Malaysia</SelectItem>
                      <SelectItem value="maldives">Maldives</SelectItem>
                      <SelectItem value="mali">Mali</SelectItem>
                      <SelectItem value="malta">Malta</SelectItem>
                      <SelectItem value="marshall-islands">Marshall Islands</SelectItem>
                      <SelectItem value="mauritania">Mauritania</SelectItem>
                      <SelectItem value="mauritius">Mauritius</SelectItem>
                      <SelectItem value="mexico">Mexico</SelectItem>
                      <SelectItem value="micronesia">Micronesia</SelectItem>
                      <SelectItem value="moldova">Moldova</SelectItem>
                      <SelectItem value="monaco">Monaco</SelectItem>
                      <SelectItem value="mongolia">Mongolia</SelectItem>
                      <SelectItem value="montenegro">Montenegro</SelectItem>
                      <SelectItem value="morocco">Morocco</SelectItem>
                      <SelectItem value="mozambique">Mozambique</SelectItem>
                      <SelectItem value="myanmar">Myanmar</SelectItem>
                      <SelectItem value="namibia">Namibia</SelectItem>
                      <SelectItem value="nauru">Nauru</SelectItem>
                      <SelectItem value="nepal">Nepal</SelectItem>
                      <SelectItem value="netherlands">Netherlands</SelectItem>
                      <SelectItem value="new-zealand">New Zealand</SelectItem>
                      <SelectItem value="nicaragua">Nicaragua</SelectItem>
                      <SelectItem value="niger">Niger</SelectItem>
                      <SelectItem value="nigeria">Nigeria</SelectItem>
                      <SelectItem value="norway">Norway</SelectItem>
                      <SelectItem value="oman">Oman</SelectItem>
                      <SelectItem value="pakistan">Pakistan</SelectItem>
                      <SelectItem value="palau">Palau</SelectItem>
                      <SelectItem value="palestine">Palestine</SelectItem>
                      <SelectItem value="panama">Panama</SelectItem>
                      <SelectItem value="papua-new-guinea">Papua New Guinea</SelectItem>
                      <SelectItem value="paraguay">Paraguay</SelectItem>
                      <SelectItem value="peru">Peru</SelectItem>
                      <SelectItem value="philippines">Philippines</SelectItem>
                      <SelectItem value="poland">Poland</SelectItem>
                      <SelectItem value="portugal">Portugal</SelectItem>
                      <SelectItem value="qatar">Qatar</SelectItem>
                      <SelectItem value="romania">Romania</SelectItem>
                      <SelectItem value="russia">Russia</SelectItem>
                      <SelectItem value="rwanda">Rwanda</SelectItem>
                      <SelectItem value="saint-kitts-and-nevis">Saint Kitts and Nevis</SelectItem>
                      <SelectItem value="saint-lucia">Saint Lucia</SelectItem>
                      <SelectItem value="saint-vincent">Saint Vincent and the Grenadines</SelectItem>
                      <SelectItem value="samoa">Samoa</SelectItem>
                      <SelectItem value="san-marino">San Marino</SelectItem>
                      <SelectItem value="sao-tome">Sao Tome and Principe</SelectItem>
                      <SelectItem value="saudi-arabia">Saudi Arabia</SelectItem>
                      <SelectItem value="senegal">Senegal</SelectItem>
                      <SelectItem value="serbia">Serbia</SelectItem>
                      <SelectItem value="seychelles">Seychelles</SelectItem>
                      <SelectItem value="sierra-leone">Sierra Leone</SelectItem>
                      <SelectItem value="singapore">Singapore</SelectItem>
                      <SelectItem value="slovakia">Slovakia</SelectItem>
                      <SelectItem value="slovenia">Slovenia</SelectItem>
                      <SelectItem value="solomon-islands">Solomon Islands</SelectItem>
                      <SelectItem value="somalia">Somalia</SelectItem>
                      <SelectItem value="south-africa">South Africa</SelectItem>
                      <SelectItem value="south-sudan">South Sudan</SelectItem>
                      <SelectItem value="spain">Spain</SelectItem>
                      <SelectItem value="sri-lanka">Sri Lanka</SelectItem>
                      <SelectItem value="sudan">Sudan</SelectItem>
                      <SelectItem value="suriname">Suriname</SelectItem>
                      <SelectItem value="swaziland">Swaziland</SelectItem>
                      <SelectItem value="sweden">Sweden</SelectItem>
                      <SelectItem value="switzerland">Switzerland</SelectItem>
                      <SelectItem value="syria">Syria</SelectItem>
                      <SelectItem value="taiwan">Taiwan</SelectItem>
                      <SelectItem value="tajikistan">Tajikistan</SelectItem>
                      <SelectItem value="tanzania">Tanzania</SelectItem>
                      <SelectItem value="thailand">Thailand</SelectItem>
                      <SelectItem value="togo">Togo</SelectItem>
                      <SelectItem value="tonga">Tonga</SelectItem>
                      <SelectItem value="trinidad-and-tobago">Trinidad and Tobago</SelectItem>
                      <SelectItem value="tunisia">Tunisia</SelectItem>
                      <SelectItem value="turkey">Turkey</SelectItem>
                      <SelectItem value="turkmenistan">Turkmenistan</SelectItem>
                      <SelectItem value="tuvalu">Tuvalu</SelectItem>
                      <SelectItem value="uganda">Uganda</SelectItem>
                      <SelectItem value="ukraine">Ukraine</SelectItem>
                      <SelectItem value="united-arab-emirates">United Arab Emirates</SelectItem>
                      <SelectItem value="united-kingdom">United Kingdom</SelectItem>
                      <SelectItem value="united-states">United States</SelectItem>
                      <SelectItem value="uruguay">Uruguay</SelectItem>
                      <SelectItem value="uzbekistan">Uzbekistan</SelectItem>
                      <SelectItem value="vanuatu">Vanuatu</SelectItem>
                      <SelectItem value="vatican-city">Vatican City</SelectItem>
                      <SelectItem value="venezuela">Venezuela</SelectItem>
                      <SelectItem value="vietnam">Vietnam</SelectItem>
                      <SelectItem value="yemen">Yemen</SelectItem>
                      <SelectItem value="zambia">Zambia</SelectItem>
                      <SelectItem value="zimbabwe">Zimbabwe</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Current Employer</Label>
                  <Input 
                    value=""
                    className={`${inputBg} ${borderColor} ${textColor} ${focusRing}`}
                  />
                </div>

                <div>
                  <Label className="flex items-center gap-2">
                    Skills Needed
                    <span className="text-[#C1A461]/60 text-sm">
                      We will send email notifications of new listings for your selected skills
                    </span>
                  </Label>
                  <div className="space-y-4 mt-4">
                    {[
                      {
                        category: "Frontend",
                        skills: ["React", "Vue", "Angular"]
                      },
                      {
                        category: "Backend",
                        skills: ["Javascript", "Python", "C++"]
                      },
                      {
                        category: "Blockchain",
                        skills: ["Rust", "Solidity"]
                      }
                    ].map((category) => (
                      <div key={category.category}>
                        <h3 className="text-sm font-medium text-[#C1A461] mb-2">{category.category}</h3>
                        <div className="flex flex-wrap gap-2">
                          {category.skills.map((skill) => (
                            <Badge
                              key={skill}
                              variant="outline"
                              className={`cursor-pointer border-[#C1A461]/20 hover:border-[#C1A461]/40
                                ${selectedSkills.includes(skill) ? 'bg-[#C1A461]/20' : ''}`}
                              onClick={() => {
                                setSelectedSkills(prev => 
                                  prev.includes(skill) 
                                    ? prev.filter(s => s !== skill)
                                    : [...prev, skill]
                                )
                              }}
                            >
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox id="private" className="border-[#C1A461]/20 data-[state=checked]:bg-[#C1A461]" />
                  <Label htmlFor="private">Keep my info private</Label>
                </div>
              </div>
            </section>

            <Button className="w-full bg-[#C1A461] hover:bg-[#C1A461]/90 text-[#1B2228]">
              Update Profile
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}