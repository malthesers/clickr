'use client'

import { ReactNode, createContext, useContext, useState } from "react"
import { upgradesData } from "@/data/upgrades"

const Context = createContext<Context>({
  clicks: 0,
  upgrades: [],
  cps: 0,
  cpsInterval: 0,
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
  const cps:number = upgrades.reduce((clicks, upgrade) => clicks + (upgrade.increase * upgrade.owned), 0)
  const cpsInterval:number = cps === 0 ? 1000 : (1000 / cps)

  function doClick(): void {
    setClicks(clicks + 1)
  }

  function autoClick(): void {
    if (cps && cpsInterval >= 100) {
      setClicks((prevClicks) => prevClicks + 1)
    } else {
      setClicks((prevClicks) => prevClicks + Math.round((cps / 10)))
    }
  }

  function buyUpgrade(bought: Upgrade) {
    if (bought.price <= clicks) {
      setClicks((prevClicks) => prevClicks - bought.price)
      setUpgrades(
        upgrades.map(upgrade =>
          upgrade.name === bought.name ? {...bought, owned: bought.owned + 1 } : upgrade 
        )
      )
    }
  }

  return (
    <Context.Provider value={{ clicks, upgrades, cps, cpsInterval, doClick, autoClick, buyUpgrade }}>
      { children }
    </Context.Provider>
  )
}