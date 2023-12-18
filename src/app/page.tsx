"use client"

import UpgradeItem from '@/components/UpgradeItem'
import { useThings } from '@/context/ContextProvider'
import { useEffect, useState } from 'react'

export default function Home() {
  const [isMounted, setIsMounted] = useState<boolean>(false)
  const { clicks, doClick, autoClick, upgrades, clicksPerSecond } = useThings()

  useEffect(() => {
    if (isMounted) {
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
      <div className='max-w-5xl grid grid-cols-2'>
        <div className='grid place-content-center gap-4'>
          <p className='text-2xl text-center'>{ clicksPerSecond } CpS</p>
          <button onClick={doClick} className='mx-auto text-5xl duration-200 active:scale-95'>{ clicks }</button>
        </div>
        <div className='flex flex-col gap-4'>
          { upgrades.map((upgrade) =>
            <UpgradeItem upgrade={upgrade} key={upgrade.name} />
          )}
        </div>
      </div>
    </main>
  )
}
