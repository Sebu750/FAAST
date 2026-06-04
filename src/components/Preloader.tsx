import { useEffect, useState } from 'react'

interface PreloaderProps {
  onFinish?: () => void
}

const Preloader = ({ onFinish }: PreloaderProps) => {
  const [isVisible, setIsVisible] = useState(true)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    // Start fade out after initial load
    const fadeTimer = setTimeout(() => {
      setIsAnimating(true)
    }, 800)

    // Complete and hide
    const hideTimer = setTimeout(() => {
      setIsVisible(false)
      onFinish?.()
    }, 1500)

    return () => {
      clearTimeout(fadeTimer)
      clearTimeout(hideTimer)
    }
  }, [onFinish])

  if (!isVisible) return null

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-black transition-opacity duration-700 ${
        isAnimating ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Ambient background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(187,148,87,0.08),transparent_60%)]" />

      {/* Main preloader content */}
      <div className="relative z-10 flex flex-col items-center gap-8">
        {/* Brand name and tagline */}
        <div className="text-center">
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-white tracking-tight mb-4 animate-fade-in">
            Adorzia
          </h1>
          <div className="h-[1px] w-32 bg-gradient-to-r from-transparent via-[#bb9457]/60 to-transparent mx-auto mb-4 animate-fade-in-delay" />
          <p className="text-[#bb9457] text-xs md:text-sm tracking-[0.35em] uppercase font-mono font-light animate-fade-in-delay">
            Where Visionaries Rise
          </p>
        </div>

        {/* Minimalist loading indicator */}
        <div className="flex flex-col items-center gap-4 animate-fade-in-slow">
          <div className="w-32 h-[0.5px] bg-neutral-900 relative overflow-hidden">
            <div className="absolute inset-y-0 left-0 w-full bg-[#bb9457] animate-loading-bar" />
          </div>
        </div>
      </div>

      {/* Custom animations */}
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes fadeInDelay {
          0%, 30% {
            opacity: 0;
            transform: translateY(8px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInSlow {
          0%, 60% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }

        @keyframes loadingBar {
          0% {
            width: 0%;
          }
          100% {
            width: 100%;
          }
        }

        .animate-fade-in {
          animation: fadeIn 0.6s ease-out forwards;
        }

        .animate-fade-in-delay {
          animation: fadeInDelay 1s ease-out forwards;
        }

        .animate-fade-in-slow {
          animation: fadeInSlow 1.2s ease-out forwards;
        }

        .animate-loading-bar {
          animation: loadingBar 2s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }
      `}</style>
    </div>
  )
}

export default Preloader
