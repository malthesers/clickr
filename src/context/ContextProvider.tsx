'use client'

import { ReactNode, createContext, useContext, useState } from "react"

const Context = createContext<{
  upgrades: Upgrade[]
  clicksPerSecond: number
  buyUpgrade: (bought:Upgrade) => void
}>({
  upgrades: [],
  clicksPerSecond: 0,
  buyUpgrade: () => {}
})

export function useThings() {
  return useContext(Context)
}

export default function ContextProvider({ children }: { children: ReactNode}) {
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

  function buyUpgrade(bought: Upgrade) {
    setUpgrades(
      upgrades.map(upgrade =>
        upgrade.name === bought.name ? {...bought, owned: bought.owned + 1 } : upgrade 
      )
    )
  }

  const clicksPerSecond:number = upgrades.reduce((clicks, upgrade) => clicks + (upgrade.increase * upgrade.owned), 0)

  return (
    <Context.Provider value={{ upgrades, clicksPerSecond, buyUpgrade }}>
      { children }
    </Context.Provider>
  )
}