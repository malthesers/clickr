import { useThings } from "@/context/ContextProvider"

interface UpgradeItemProps {
  upgrade: Upgrade
}

export default function UpgradeItem({ upgrade }: UpgradeItemProps) {
  const { clicks, buyUpgrade } = useThings()

  return (
    <div onClick={() => buyUpgrade(upgrade)} className={(upgrade.price > clicks ? 'brightness-50 cursor-not-allowed ' : '') + "rounded-xl border-2 border-slate-300 py-2 px-4 cursor-pointer duration-200 hover:bg-slate-300 hover:text-black"}>
      <div className="flex flex-row justify-between">
        <p className="font-bold">{ upgrade.name }</p>
        <p>{ upgrade.increase } CpS</p>
      </div>
      <p className="italic">{ upgrade.description }</p>
      <div className="flex flex-row justify-between">
        <p>Price: { upgrade.price }</p>
        <p>Owned: { upgrade.owned }</p>
      </div>
    </div>
  )
}