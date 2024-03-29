'use client'

import PassiveBuff from '@/components/upgrades/PassiveBuff'
import AutoClicker from '@/components/upgrades/AutoClicker'
import { useThings } from '@/context/ContextProvider'
import { useEffect, useState } from 'react'

export default function Home() {
  const [isMounted, setIsMounted] = useState<boolean>(false)
  const { clicks, doClick, autoClick, passiveBuffs, autoClickers, cpc, cps, cpsInterval } = useThings()

  useEffect(() => {
    if (isMounted) {
      // Set interval to calculated interval, OR 100 if less than 100 to cap calls at 10 per sec
      const autoClickInterval = setInterval(autoClick, cpsInterval >= 100 ? cpsInterval : 100)

      // Clear interval on unmount
      return () => clearInterval(autoClickInterval)
    }
  }, [isMounted, cps])

  useEffect(() => setIsMounted(true), [])

  return (
    <main className='min-h-screen grid place-content-center p-24'>
      <div className='max-w-7xl grid grid-cols-3 gap-4'>
        <div className='grid place-content-center gap-4'>
          <p className='text-2xl text-center'>{cpc} CpC</p>
          <p className='text-2xl text-center'>{cps} CpS</p>
          <button onClick={doClick} className='mx-auto text-5xl duration-200 active:scale-95'>
            {clicks}
          </button>
        </div>
        <div className='flex flex-col gap-4'>
          {passiveBuffs.map((passiveBuff) => (
            <PassiveBuff passiveBuff={passiveBuff} key={passiveBuff.name} />
          ))}
        </div>
        <div className='flex flex-col gap-4'>
          {autoClickers.map((autoClicker) => (
            <AutoClicker autoClicker={autoClicker} key={autoClicker.name} />
          ))}
        </div>
      </div>
    </main>
  )
}
