interface Context {
  clicks: number
  autoClickers: AutoClicker[]
  cps: number
  cpsInterval: number
  doClick: () => void
  autoClick: () => void
  buyAutoClicker: (bought:AutoClicker) => void
}