import { useThings } from '@/context/ContextProvider'

interface UpgradeItemProps {
  autoClicker: AutoClicker
}

export default function AutoClicker({ autoClicker }: UpgradeItemProps) {
  const { clicks, buyUpgrade } = useThings()

  return (
    <div onClick={() => buyUpgrade(autoClicker)} className={(autoClicker.price > clicks ? 'brightness-50 cursor-not-allowed' : 'cursor-pointer') + ' rounded-xl border-2 border-slate-300 py-2 px-4 duration-200 hover:bg-slate-300 hover:text-black'}>
      <div className='flex flex-row justify-between'>
        <p className='font-bold'>{ autoClicker.name }</p>
        <p>{ autoClicker.increase } CpS</p>
      </div>
      <p className='italic'>{ autoClicker.description }</p>
      <div className='flex flex-row justify-between'>
        <p>Price: { autoClicker.price }</p>
        <p>Owned: { autoClicker.owned }</p>
      </div>
    </div>
  )
}