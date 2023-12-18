"use client"

import UpgradeItem from '@/components/UpgradeItem'
import { useUpgrades } from '@/context/UpgradesProvider'
import { useEffect, useState } from 'react'

export default function Home() {
  const [isMounted, setIsMounted] = useState<boolean>(false)
  const { upgrades, clicksPerSecond } = useUpgrades()
  const [clicks, setClicks] = useState<number>(0)
  

  function incrementClicks(): void {
    setClicks(clicks + 1)
  }

  const autoIncrementer = () : void => {
    console.log(clicksPerSecond)
    if (clicksPerSecond) {
      setClicks((prevClicks) => prevClicks + clicksPerSecond)
    }
  }

  function autoClick (): void {
    console.log('auto: ' + clicksPerSecond)

    if (clicksPerSecond) {
      setClicks((prevClicks) => prevClicks + clicksPerSecond)
    }

    setTimeout(autoClick, 1000)
  }

  useEffect(() => {
    if (isMounted) {
      // const incrementerInterval = setInterval(autoIncrementer, 1000)
      autoClick()
      // return () => clearInterval(incrementerInterval)
    }
  }, [isMounted])

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
