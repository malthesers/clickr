import { useThings } from '@/context/ContextProvider'

interface PassiveBuffProps {
  passiveBuff: PassiveBuff
}

export default function PassiveBuff({ passiveBuff }: PassiveBuffProps) {
  const { clicks, buyPassiveBuff } = useThings()

  return (
    <div onClick={() => buyPassiveBuff(passiveBuff)} className={(passiveBuff.price > clicks ? 'brightness-50 cursor-not-allowed' : 'cursor-pointer') + ' rounded-xl border-2 border-slate-300 py-2 px-4 duration-200 hover:bg-slate-300 hover:text-black'}>
      <div className='flex flex-row justify-between'>
        <p className='font-bold'>{ passiveBuff.name }</p>
        <p>{ passiveBuff.increase } CpC</p>
      </div>
      <p className='italic'>{ passiveBuff.description }</p>
      <div className='flex flex-row justify-between'>
        <p>Price: { passiveBuff.price }</p>
        <p>Owned: { passiveBuff.owned ? '✔️' : '❌' }</p>
      </div>
    </div>
  )
}