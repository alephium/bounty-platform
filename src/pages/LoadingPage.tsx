import { Loader2 } from 'lucide-react'

export default function LoadingPage() {
  return (
    <main className="min-h-screen bg-theme-primary flex flex-col items-center justify-center p-4">
      <div className="max-w-7xl mx-auto w-full space-y-8 text-center">
        <div className="space-y-4">
          <div className="flex justify-center">
            <div className="relative">
              <Loader2 className="w-16 h-16 text-theme-primary animate-spin" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-theme-primary font-sentient">
            Contributium
          </h1>
          <p className="text-xl text-theme-secondary">
            Loading your experience...
          </p>
        </div>

        <div className="max-w-md mx-auto w-full space-y-2">
          <div className="h-2 bg-theme-secondary rounded-full overflow-hidden">
            <div className="h-full bg-theme-primary rounded-full animate-shimmer" />
          </div>
        </div>
      </div>
    </main>
  )
}