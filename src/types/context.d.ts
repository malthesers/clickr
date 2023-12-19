interface Context {
  clicks: number
  upgrades: Upgrade[]
  cps: number
  cpsInterval: number
  doClick: () => void
  autoClick: () => void
  buyUpgrade: (bought:Upgrade) => void
}