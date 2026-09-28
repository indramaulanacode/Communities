import { useState } from 'react'
import { MoreVertical, Search, Star } from 'lucide-react'

const chats = Array.from({ length: 7 }, (_, i) => ({
  id: i,
  name: 'Place Your Name Here',
  subtitle: 'Messeger here',
  date: '06/07/24',
}))

export default function PersonalChatsList() {
  const [activeId, setActiveId] = useState(null)

  return (
    <section className="flex w-[26rem] shrink-0 flex-col rounded-2xl bg-[#121212] p-4">
      <div className="flex items-center justify-between rounded-xl bg-[#191919] px-4 py-3.5">
        <span className="text-sm text-white">Personal Chats</span>
        <MoreVertical size={16} className="text-gray-400" />
      </div>

      <div className="mt-3 flex items-center gap-2">
        <div className="flex min-w-0 flex-1 items-center justify-between rounded-lg bg-[#0a0a0a] px-3 py-2.5">
          <span className="text-xs text-gray-500">Value</span>
          <Search size={13} className="text-gray-500" />
        </div>
        <button className="shrink-0 rounded-full bg-[#2e7cf6] px-6 py-2.5 text-xs font-medium text-white transition-colors hover:bg-[#2568d4]">
          Search
        </button>
      </div>

      <div className="mt-3 flex flex-1 flex-col gap-3 overflow-y-auto pb-1">
        {chats.map((chat) => {
          const active = chat.id === activeId
          return (
            <button
              key={chat.id}
              onClick={() => setActiveId((cur) => (cur === chat.id ? null : chat.id))}
              className={`flex shrink-0 items-center gap-3 rounded-xl border p-3 text-left transition-colors ${
                active
                  ? 'border-transparent bg-black'
                  : 'border-[#232323] bg-[#191919] hover:bg-[#1f1f1f]'
              }`}
            >
              <div className="size-11 shrink-0 rounded-full bg-white" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm text-white">{chat.name}</p>
                <p className={`truncate text-xs ${active ? 'text-white' : 'text-gray-400'}`}>
                  {chat.subtitle}
                </p>
                <p className={`mt-0.5 text-[10px] ${active ? 'text-white' : 'text-gray-500'}`}>
                  {chat.date}
                </p>
              </div>
              <Star size={18} className="shrink-0 text-[#2e7cf6]" />
            </button>
          )
        })}
      </div>

      <button className="mt-3 w-full shrink-0 rounded-full bg-[#f4436c] py-2.5 text-xs font-medium text-white transition-colors hover:bg-[#d93a60]">
        Load More
      </button>
    </section>
  )
}
