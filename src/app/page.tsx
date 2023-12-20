'use client'

import UpgradeItem from '@/components/UpgradeItem'
import { useThings } from '@/context/ContextProvider'
import { useEffect, useState } from 'react'

export default function Home() {
  const [isMounted, setIsMounted] = useState<boolean>(false)
  const { clicks, doClick, autoClick, upgrades, cps, cpsInterval } = useThings()

  useEffect(() => {
    if (isMounted) {
      // Set interval to calculated interval, OR 100 if less than 100 to cap calls at 10 per sec
      const autoClickInterval = setInterval(autoClick, (cpsInterval >= 100 ? cpsInterval : 100))

      // Clear interval on unmount
      return () => clearInterval(autoClickInterval)
    }
  }, [isMounted, cps])

  useEffect(() => setIsMounted(true), [])

  return (
    <main className='min-h-screen grid place-content-center p-24'>
      <div className='max-w-5xl grid grid-cols-2'>
        <div className='grid place-content-center gap-4'>
          <p className='text-2xl text-center'>{ cps } CpS</p>
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
