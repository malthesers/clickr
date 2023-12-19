'use client'

import { ReactNode, createContext, useContext, useState } from "react"
import { upgradesData } from "@/data/upgrades"

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
  const [upgrades, setUpgrades] = useState<Upgrade[]>(upgradesData)
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
    if (bought.price < clicks) {
      setClicks((prevClicks) => prevClicks - bought.price)

      setUpgrades(
        upgrades.map(upgrade =>
          upgrade.name === bought.name ? {...bought, owned: bought.owned + 1 } : upgrade 
        )
      )
    }
  }


  return (
    <Context.Provider value={{ clicks, upgrades, clicksPerSecond, doClick, autoClick, buyUpgrade }}>
      { children }
    </Context.Provider>
  )
}