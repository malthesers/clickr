'use client'

import { ReactNode, createContext, useContext, useState } from 'react'
import { autoClickersData } from '@/upgrades/autoClickers'
import { passiveBuffsData } from '@/upgrades/passiveBuffs'

const Context = createContext<Context>({
  clicks: 0,
  autoClickers: [],
  passiveBuffs: [],
  cpc: 1,
  cps: 0,
  cpsInterval: 0,
  doClick: () => {},
  autoClick: () => {},
  buyAutoClicker: () => {},
  buyPassiveBuff: () => {}
})

export function useThings() {
  return useContext(Context)
}

export default function ContextProvider({ children }: { children: ReactNode }) {
  const [clicks, setClicks] = useState<number>(0)
  const [autoClickers, setAutoClickers] = useState<AutoClicker[]>(autoClickersData)
  const [passiveBuffs, setPassiveBuffs] = useState<PassiveBuff[]>(passiveBuffsData)
  const cpc: number = passiveBuffs.reduce((clicks, upgrade) => {
    if (upgrade.owned) {
      return upgrade.applyBuff(clicks)
    } else {
      return clicks
    }
  }, 1)
  const cps: number = autoClickers.reduce((clicks, upgrade) => clicks + upgrade.increase * upgrade.owned, 0)
  const cpsInterval: number = cps === 0 ? 1000 : 1000 / cps

  function doClick(): void {
    setClicks(clicks + cpc)
  }

  function autoClick(): void {
    // If cps above 0, update clicks by incrementing, OR if interval is less than 100 add 10% instead
    if (cps) setClicks((prevClicks) => prevClicks + (cpsInterval >= 100 ? 1 : Math.round(cps / 10)))
  }

  function buyAutoClicker(bought: AutoClicker) {
    // Proceed if enough clicks to purchase
    if (bought.price <= clicks) {
      // Subtract price from clicks
      setClicks((prevClicks) => prevClicks - bought.price)

      // Increment amount owned of parameterised upgrade
      setAutoClickers(
        autoClickers.map((upgrade) => {
          return upgrade.name === bought.name ? { ...bought, owned: bought.owned + 1 } : upgrade
        })
      )
    }
  }

  function buyPassiveBuff(bought: PassiveBuff) {
    // Proceed if enough clicks to purchase and not already bought
    if (bought.price <= clicks && !bought.owned) {
      // Subtract price from clicks
      setClicks((prevClicks) => prevClicks - bought.price)

      // Increment amount owned of parameterised upgrade
      setPassiveBuffs(
        passiveBuffs.map((upgrade) => {
          return upgrade.name === bought.name ? { ...bought, owned: true } : upgrade
        })
      )
    }
  }

  return (
    <Context.Provider value={{ clicks, autoClickers, passiveBuffs, cpc, cps, cpsInterval, doClick, autoClick, buyAutoClicker, buyPassiveBuff }}>
      {children}
    </Context.Provider>
  )
}
