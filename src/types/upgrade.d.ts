interface Upgrade {
  name: string
  description: string
  price: number
}

interface AutoClicker extends Upgrade {
  increase: number
  owned: number
}

interface PassiveBuff extends Upgrade {
  applyBuff: (clicks: number, cps?: number) => number
  owned: boolean
}
