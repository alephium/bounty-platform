import { useState } from "react"
import { Button } from "./ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Input } from "./ui/input"
import { X, Copy, Send } from 'lucide-react'
import { toast } from "sonner"

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

  const handleShare = (platform: string) => {
    let url = ""
    switch (platform) {
      case "twitter":
        url = `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}`
        break
      case "telegram":
        url = `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}`
        break
      case "whatsapp":
        url = `https://wa.me/?text=${encodeURIComponent(shareUrl)}`
        break
    }
    // if (url) window.open(url, "_blank")
  }

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
              <Button
                variant="outline"
                size="icon"
                className="rounded-full w-12 h-12 border-[#C1A461]/20 text-[#C1A461] hover:bg-[#C1A461]/10"
                onClick={() => handleShare("twitter")}
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="rounded-full w-12 h-12 border-[#C1A461]/20 text-[#C1A461] hover:bg-[#C1A461]/10"
                onClick={() => handleShare("telegram")}
              >
                <Send className="w-5 h-5" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="rounded-full w-12 h-12 border-[#C1A461]/20 text-[#C1A461] hover:bg-[#C1A461]/10"
                onClick={() => handleShare("whatsapp")}
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

