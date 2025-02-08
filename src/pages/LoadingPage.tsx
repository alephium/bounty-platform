import React from 'react'
import { Loader2 } from 'lucide-react'

export default function LoadingPage() {
  return (
    <main className="min-h-screen bg-[#1B2228] flex flex-col items-center justify-center p-4">
      <div className="max-w-7xl mx-auto w-full space-y-8 text-center">
        <div className="space-y-4">
          <div className="flex justify-center">
            <div className="relative">
              <Loader2 className="w-16 h-16 text-[#C1A461] animate-spin" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-[#C1A461]">
            Contributium
          </h1>
          <p className="text-xl text-[#C1A461]/80">
            Loading your experience...
          </p>
        </div>

        <div className="max-w-md mx-auto w-full space-y-2">
          <div className="h-2 bg-[#C1A461]/20 rounded-full overflow-hidden">
            <div className="h-full bg-[#C1A461] rounded-full animate-shimmer" />
          </div>
        </div>
      </div>
    </main>
  )
}