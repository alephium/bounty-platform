"use client"

import { useState } from "react"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Input } from "../components/ui/input"
import { X, Copy, Send } from 'lucide-react'
import { toast } from 'react-hot-toast'

export default function ShareModal() {
  const [copied, setCopied] = useState(false)
  const shareUrl = "https://earn.superteam.fun/t/yy"

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      toast.success("Copied to clipboard!")
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      toast.error("Failed to copy")
    }
  }

  const getShareUrl = (platform: string) => {
    switch (platform) {
      case "twitter":
        return `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}`;
      case "telegram":
        return `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}`;
      case "whatsapp":
        return `https://wa.me/?text=${encodeURIComponent(shareUrl)}`;
      default:
        return '';
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
      <Card className="w-full max-w-lg bg-[#1B2228] border-[#C1A461]/20">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-[#C1A461] text-2xl font-semibold">Share Profile</CardTitle>
          <Button
            variant="ghost"
            size="icon"
            className="text-[#C1A461]/60 hover:text-[#C1A461] hover:bg-[#C1A461]/10"
          >
            <X className="h-5 w-5" />
          </Button>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-[#C1A461]/60 text-lg">
            With your friends or on social media to showcase your proof of work, all in one place
          </p>

          <div className="flex gap-2">
            <Input
              readOnly
              value={shareUrl}
              className="bg-[#1B2228] border-[#C1A461]/20 text-[#C1A461] focus-visible:ring-[#C1A461]"
            />
            <Button
              variant="outline"
              className="border-[#C1A461]/20 text-[#C1A461] hover:bg-[#C1A461]/10"
              onClick={handleCopy}
            >
              <Copy className="h-4 w-4" />
            </Button>
          </div>

          <div className="space-y-3">
            <h3 className="text-[#C1A461]/60 uppercase text-sm font-medium">Share to</h3>
            <div className="flex gap-4">
              {[
                { platform: 'twitter', icon: <TwitterIcon /> },
                { platform: 'telegram', icon: <Send /> },
                { platform: 'whatsapp', icon: <WhatsAppIcon /> }
              ].map(({ platform, icon }) => (
                <a
                  key={platform}
                  href={getShareUrl(platform)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full w-12 h-12 border-[#C1A461]/20 text-[#C1A461] hover:bg-[#C1A461]/10"
                  >
                    {icon}
                  </Button>
                </a>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

