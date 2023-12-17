"use client"

import UpgradeItem from '@/components/UpgradeItem'
import { useEffect, useState } from 'react'

export default function Home() {
  const [clicks, setClicks] = useState<number>(0)
  const [clicksPerSecond, setClicksPerSecond] = useState<number>(0)
  const [upgrades, setUpgrades] = useState<Upgrade[]>([
    {
      name: 'Bonus Clicker',
      description: 'Performs additional clicks for you, increasesing clicks per second by 1.',
      increase: 1,
      price: 10,
      owned: 0
    },
    {
      name: 'Mega Clicker',
      description: 'An improved bonus clicker, increasesing clicks per second by 3.',
      increase: 3,
      price: 30,
      owned: 0
    },
    {
      name: 'Giga Clicker',
      description: 'A gigantic bonus clicker, increasesing clicks per second by 5.',
      increase: 5,
      price: 50,
      owned: 0
    },
    {
      name: 'Omega Clicker',
      description: 'The ultimate bonus clicker, increasesing clicks per second by 10.',
      increase: 10,
      price: 100,
      owned: 0
    },
  ])

  function incrementClicks(): void {
    setClicks(clicks + 1)
  }

  const autoIncrementer = () : void => {
    if (clicksPerSecond) {
      setClicks((prevClicks) => prevClicks + 1)
    }
  }

  useEffect(() => {
    const incrementerInterval = setInterval(autoIncrementer, 1000)

    return () => clearInterval(incrementerInterval)
  }, [])

  return (
    <main className="min-h-screen grid place-content-center p-24">
      <div className='max-w-5xl'>
        <button onClick={incrementClicks} className='text-5xl duration-200 active:scale-95'>{ clicks }</button>
        <div className='mt-20 grid grid-cols-4 gap-4'>
          { upgrades.map((upgrade) =>
            <UpgradeItem upgrade={upgrade} key={upgrade.name}/>
          )}
        </div>
      </div>
    </main>
  )
}
