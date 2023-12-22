interface Context {
  clicks: number
  autoClickers: AutoClicker[]
  cps: number
  cpsInterval: number
  doClick: () => void
  autoClick: () => void
  buyUpgrade: (bought:AutoClicker) => void
}