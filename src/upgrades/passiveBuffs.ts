export const passiveBuffsData: PassiveBuff[] = [
  {
    name: 'Double Click',
    description: 'Empowering your touch, doubling the value of manual clicks.',
    multiplier: 2,
    price: 10,
    owned: false,
    applyBuff: (clicks) => clicks * 2
  },
  {
    name: 'Double Double Click',
    description: 'Further empowering your touch, doubling manual click value.',
    multiplier: 2,
    price: 25,
    owned: false,
    applyBuff: (clicks: number) => clicks * 2
  }
]
