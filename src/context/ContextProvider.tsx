'use client'

import { ReactNode, createContext, useContext, useState } from "react"

const Context = createContext<{
  clicks: number
  upgrades: Upgrade[]
  clicksPerSecond: number
  doClick: () => void
  autoClick: () => void
  buyUpgrade: (bought:Upgrade) => void
}>({
  clicks: 0,
  upgrades: [],
  clicksPerSecond: 0,
  doClick: () => {},
  autoClick: () => {},
  buyUpgrade: () => {}
})

export function useThings() {
  return useContext(Context)
}

export default function ContextProvider({ children }: { children: ReactNode}) {
  const [clicks, setClicks] = useState<number>(0)
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
  const clicksPerSecond:number = upgrades.reduce((clicks, upgrade) => clicks + (upgrade.increase * upgrade.owned), 0)

  function doClick(): void {
    setClicks(clicks + 1)
  }

  function autoClick(): void {
    if (clicksPerSecond) {
      setClicks((prevClicks) => prevClicks + clicksPerSecond)
    }
  }

  function buyUpgrade(bought: Upgrade) {
    setUpgrades(
      upgrades.map(upgrade =>
        upgrade.name === bought.name ? {...bought, owned: bought.owned + 1 } : upgrade 
      )
    )
  }


  return (
    <Context.Provider value={{ clicks, upgrades, clicksPerSecond, doClick, autoClick, buyUpgrade }}>
      { children }
    </Context.Provider>
  )
}