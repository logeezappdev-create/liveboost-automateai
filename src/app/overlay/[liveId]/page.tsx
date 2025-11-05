'use client'

import { useState, useEffect } from 'react'

export default function OverlayPage({ params }: { params: { liveId: string } }) {
  const [timeLeft, setTimeLeft] = useState(30 * 60) // 30 minutes in seconds
  const [salesCount, setSalesCount] = useState(23)
  const [isVisible, setIsVisible] = useState(true)

  // Mock config - in real app, fetch from API
  const config = {
    discount: 30,
    message: '🔥 Offre spéciale LIVE !',
    limitedPlaces: 7,
    timerEnabled: true,
    socialProof: true
  }

  // Countdown timer
  useEffect(() => {
    if (!config.timerEnabled) return

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) return 0
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [config.timerEnabled])

  // Simulate sales updates
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        setSalesCount(prev => prev + 1)
      }
    }, 10000)

    return () => clearInterval(interval)
  }, [])

  // Format time
  const minutes = Math.floor(timeLeft / 60)
  const seconds = timeLeft % 60

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 pointer-events-none">
      {/* Bottom Right - Main Overlay */}
      <div className="absolute bottom-8 right-8 pointer-events-none">
        <div className="bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl shadow-2xl p-8 text-white min-w-[350px] transform transition-all duration-500 hover:scale-105">
          {/* Message */}
          <div className="text-center mb-4">
            <div className="text-2xl font-bold mb-2">{config.message}</div>
            
            {/* Discount */}
            {config.discount > 0 && (
              <div className="relative">
                <div className="text-8xl font-black text-yellow-300 drop-shadow-2xl animate-pulse">
                  -{config.discount}%
                </div>
              </div>
            )}
          </div>

          {/* Timer */}
          {config.timerEnabled && timeLeft > 0 && (
            <div className="mt-6 p-6 bg-black/30 rounded-xl backdrop-blur-sm">
              <div className="text-sm mb-2 text-center text-white/90">Offre expire dans</div>
              <div className="text-6xl font-mono font-bold text-center tracking-wider">
                {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
              </div>
            </div>
          )}

          {/* Limited Places */}
          {config.limitedPlaces && config.limitedPlaces > 0 && (
            <div className="mt-4 p-4 bg-red-500/90 rounded-lg text-center">
              <div className="text-2xl font-bold animate-pulse">
                ⚡ Plus que {config.limitedPlaces} places !
              </div>
            </div>
          )}

          {/* Social Proof */}
          {config.socialProof && (
            <div className="mt-4 text-center text-sm text-white/80">
              <div className="flex items-center justify-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="font-medium">
                  ✅ {salesCount} personnes ont acheté aujourd'hui
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Top Banner - Alternative placement */}
      {/* <div className="absolute top-0 left-0 right-0 p-4">
        <div className="bg-gradient-to-r from-red-600 to-orange-600 text-white text-center py-3 px-6 rounded-lg shadow-lg">
          <span className="text-xl font-bold">
            🔥 {config.message} - {config.discount}% OFF
          </span>
        </div>
      </div> */}
    </div>
  )
}
