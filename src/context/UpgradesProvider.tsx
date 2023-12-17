'use client'

import { ReactNode, createContext, useContext, useState } from "react"

const UpgradesContext = createContext<{
  upgrades: Upgrade[]
  clicksPerSecond: number
}>({
  upgrades: [],
  clicksPerSecond: 0,
})

export function useUpgrades() {
  return useContext(UpgradesContext)
}

export default function UpgradesProvider({ children }: { children: ReactNode}) {
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

  return (
    <UpgradesContext.Provider value={{ upgrades, clicksPerSecond }}>
      { children }
    </UpgradesContext.Provider>
  )
}