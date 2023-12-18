"use client"

import UpgradeItem from '@/components/UpgradeItem'
import { useThings } from '@/context/ContextProvider'
import { useEffect, useState } from 'react'

export default function Home() {
  const [isMounted, setIsMounted] = useState<boolean>(false)
  const { upgrades, clicksPerSecond } = useThings()
  const [clicks, setClicks] = useState<number>(0)
  
  function incrementClicks(): void {
    setClicks(clicks + 1)
  }

  function autoClick (): void {
    console.log('auto: ' + clicksPerSecond)

    if (clicksPerSecond) {
      setClicks((prevClicks) => prevClicks + clicksPerSecond)
    }
  }

  useEffect(() => {
    if (isMounted) {
      console.log(clicksPerSecond)
      // const intervalTimer:number = clicksPerSecond === 0 ? 1000 : (1000 / clicksPerSecond)
      const autoClickInterval:NodeJS.Timeout = setInterval(autoClick, 1000)

      return () => clearInterval(autoClickInterval)
    }
  }, [isMounted, clicksPerSecond])

  useEffect(() => {
    setIsMounted(true)
  }, [])

  return (
    <main className="min-h-screen grid place-content-center p-24">
      <div className='max-w-5xl'>
        <div className='flex'>
          <button onClick={incrementClicks} className='mx-auto text-5xl duration-200 active:scale-95'>{ clicks }</button>
        </div>
        <p className='mt-20 text-2xl text-center'>{ clicksPerSecond } CpS</p>
        <div className='mt-8 grid grid-cols-4 gap-4'>
          { upgrades.map((upgrade) =>
            <UpgradeItem upgrade={upgrade} key={upgrade.name} />
          )}
        </div>
      </div>
    </main>
  )
}
