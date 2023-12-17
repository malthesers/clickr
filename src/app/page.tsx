"use client"

import { useEffect, useState } from 'react'

export default function Home() {
  const [clicks, setClicks] = useState<number>(0)
  const [clicksPerSecond, setClicksPerSecond] = useState<number>(1)

  function incrementClicks(): void {
    setClicks(clicks + 1)
  }

  const autoIncrementer = () => {
    setClicks((prevClicks) => prevClicks + 1)
  }

  useEffect(() => {
    const incrementerInterval = setInterval(autoIncrementer, 1000)

    return () => clearInterval(incrementerInterval)
  }, [])

  return (
    <main className="min-h-screen grid place-content-center p-24">
      <button onClick={incrementClicks} className='text-5xl duration-200 active:scale-95'>{ clicks }</button>
    </main>
  )
}
