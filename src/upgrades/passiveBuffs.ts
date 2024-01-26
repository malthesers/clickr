export const passiveBuffsData: PassiveBuff[] = [
  {
    name: 'Double Click',
    description: 'Empowering your touch, doubling the value of manual clicks.',
    price: 10,
    owned: false,
    applyBuff: (clicks: number) => clicks * 2
  },
  {
    name: 'Double Double Click',
    description: 'Further empowering your touch, doubling manual click value.',
    price: 25,
    owned: false,
    applyBuff: (clicks: number) => clicks * 2
  },
  {
    name: 'Semi-Automatic',
    description: 'Your manual click power is increased by your CpS.',
    price: 5,
    owned: false,
    applyBuff: (clicks: number, cps?: number) => (cps ? clicks + cps : clicks)
  }
]
