interface Context {
  clicks: number
  autoClickers: AutoClicker[]
  passiveBuffs: PassiveBuff[]
  cps: number
  cpsInterval: number
  doClick: () => void
  autoClick: () => void
  buyAutoClicker: (bought: AutoClicker) => void
  buyPassiveBuff: (bought: PassiveBuff) => void
}
