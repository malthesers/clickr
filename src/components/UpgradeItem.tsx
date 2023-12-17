interface UpgradeItemProps {
  upgrade: Upgrade
}

export default function UpgradeItem({ upgrade }: UpgradeItemProps) {
  return (
    <div className="rounded-xl border-2 border-slate-300 py-2 px-4 cursor-pointer duration-200 hover:bg-slate-300 hover:text-black">
      <p className="font-bold">{ upgrade.name }</p>
      <p className="italic">{ upgrade.description }</p>
      <p>{ upgrade.increase } CpS</p>
    </div>
  )
}