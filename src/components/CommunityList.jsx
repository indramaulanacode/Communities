import { Layers, Search, Star } from 'lucide-react'

const communities = Array.from({ length: 9 }, (_, i) => ({
  id: i,
  name: 'Place Your Name Here',
  subtitle: 'Messeger here',
  date: '06/07/24',
}))

export default function CommunityList() {
  return (
    <section className="flex w-[26rem] shrink-0 flex-col rounded-2xl bg-[#121212] p-4">
      <div className="flex items-center justify-center gap-2 pt-2 text-gray-200">
        <Layers size={14} className="text-[#2e7cf6]" />
        <span className="text-xs">Your Community</span>
      </div>

      <div className="mt-4 flex items-center justify-center gap-2 rounded-lg border border-[#242424] bg-[#0a0a0a] py-2.5">
        <span className="text-xs text-gray-500">Search</span>
        <Search size={12} className="text-gray-500" />
      </div>

      <div className="mt-4 flex flex-1 flex-col gap-3 overflow-y-auto pb-1">
        {communities.map((community) => (
          <button
            key={community.id}
            className="flex shrink-0 items-center gap-3 rounded-xl border border-[#232323] bg-[#191919] p-3 text-left transition-colors hover:bg-[#1f1f1f]"
          >
            <div className="size-12 shrink-0 rounded-lg bg-[#d6d6d6]" />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm text-white">{community.name}</p>
              <p className="truncate text-xs text-gray-400">{community.subtitle}</p>
              <p className="mt-0.5 text-[10px] text-gray-500">{community.date}</p>
            </div>
            <Star size={18} className="shrink-0 text-[#2e7cf6]" />
          </button>
        ))}
      </div>
    </section>
  )
}
