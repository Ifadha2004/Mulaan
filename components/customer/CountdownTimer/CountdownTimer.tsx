'use client'

import { useState, useEffect } from 'react'

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function CountdownTimer({ targetDate }: { targetDate: string }) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null)

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +new Date(targetDate) - +new Date()
      let timeLeftObj = null

      if (difference > 0) {
        timeLeftObj = {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        }
      }
      setTimeLeft(timeLeftObj)
    }

    const timer = setInterval(calculateTimeLeft, 1000)
    calculateTimeLeft()

    return () => clearInterval(timer)
  }, [targetDate])

  if (!timeLeft) return null

  return (
    <div className="flex gap-6 md:gap-10 justify-center items-center py-8 border-y border-brand-green/5">
      {Object.entries(timeLeft).map(([label, value]) => (
        <div key={label} className="text-center group">
          <div className="text-2xl md:text-4xl font-light tracking-tighter text-brand-green font-serif">
            {value.toString().padStart(2, '0')}
          </div>
          <div className="text-[8px] md:text-[9px] tracking-[0.3em] uppercase text-brand-gold mt-1 font-medium">
            {label}
          </div>
        </div>
      ))}
    </div>
  )
}