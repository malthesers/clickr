"use client"

import { useState } from 'react'

export default function Home() {
  const [clicks, setClicks] = useState<number>(1)

  function incrementClicks() {
    setClicks(clicks + 1)
  } 

  return (
    <main className="min-h-screen grid place-content-center p-24">
      <button onClick={incrementClicks} className='text-5xl'>{ clicks }</button>
    </main>
  )
}
