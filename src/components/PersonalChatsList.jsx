import { useState } from 'react'
import { MoreVertical, Search, Star } from 'lucide-react'

const makeChats = (start, count) =>
  Array.from({ length: count }, (_, i) => ({
    id: start + i,
    name: 'Place Your Name Here',
    subtitle: 'Messeger here',
    date: '06/07/24',
  }))

const MAX_CHATS = 28

export default function PersonalChatsList() {
  const [activeId, setActiveId] = useState(null)
  const [chats, setChats] = useState(() => makeChats(0, 7))
  const [query, setQuery] = useState('')
  const [applied, setApplied] = useState('')
  const [starred, setStarred] = useState(() => new Set())
  const [menuOpen, setMenuOpen] = useState(false)

  const visible = applied.trim()
    ? chats.filter((chat) => chat.name.toLowerCase().includes(applied.trim().toLowerCase()))
    : chats

  const toggleStar = (id) =>
    setStarred((cur) => {
      const next = new Set(cur)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })

  const canLoadMore = chats.length < MAX_CHATS

  return (
    <section className="flex w-[26rem] shrink-0 flex-col rounded-2xl bg-[#121212] p-4">
      <div className="relative flex items-center justify-between rounded-xl bg-[#191919] px-4 py-3.5">
        <span className="text-sm text-white">Personal Chats</span>
        <button
          onClick={() => setMenuOpen((open) => !open)}
          className={`rounded-md p-1 transition-colors ${
            menuOpen ? 'bg-[#262626] text-white' : 'text-gray-400 hover:text-white'
          }`}
          aria-haspopup="menu"
          aria-expanded={menuOpen}
        >
          <MoreVertical size={16} />
        </button>
        {menuOpen && (
          <div className="absolute right-3 top-12 z-10 flex w-36 flex-col gap-1 rounded-xl bg-[#1e1e1e] p-1.5 shadow-lg">
            <button
              onClick={() => {
                setQuery('')
                setApplied('')
                setMenuOpen(false)
              }}
              className="rounded-lg px-3 py-2 text-left text-[11px] text-gray-200 transition-colors hover:bg-[#262626]"
            >
              Clear Search
            </button>
            <button
              onClick={() => {
                setStarred(new Set())
                setMenuOpen(false)
              }}
              className="rounded-lg px-3 py-2 text-left text-[11px] text-gray-200 transition-colors hover:bg-[#262626]"
            >
              Unstar All
            </button>
          </div>
        )}
      </div>

      <div className="mt-3 flex items-center gap-2">
        <div className="flex min-w-0 flex-1 items-center justify-between rounded-lg bg-[#0a0a0a] px-3 py-2.5">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && setApplied(query)}
            placeholder="Value"
            className="min-w-0 flex-1 bg-transparent text-xs text-gray-200 placeholder-gray-500 outline-none"
          />
          <Search size={13} className="shrink-0 text-gray-500" />
        </div>
        <button
          onClick={() => setApplied(query)}
          className="shrink-0 rounded-full bg-[#2e7cf6] px-6 py-2.5 text-xs font-medium text-white transition-colors hover:bg-[#2568d4]"
        >
          Search
        </button>
      </div>

      <div className="mt-3 flex flex-1 flex-col gap-3 overflow-y-auto pb-1">
        {visible.map((chat) => {
          const active = chat.id === activeId
          const isStarred = starred.has(chat.id)
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
              <span
                role="button"
                tabIndex={0}
                onClick={(e) => {
                  e.stopPropagation()
                  toggleStar(chat.id)
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.stopPropagation()
                    toggleStar(chat.id)
                  }
                }}
                className="shrink-0 cursor-pointer transition-colors hover:text-[#5ea2ff]"
                aria-pressed={isStarred}
              >
                <Star
                  size={18}
                  fill={isStarred ? 'currentColor' : 'none'}
                  className="text-[#2e7cf6]"
                />
              </span>
            </button>
          )
        })}
        {visible.length === 0 && (
          <p className="py-6 text-center text-xs text-gray-500">No chats found</p>
        )}
      </div>

      <button
        onClick={() => setChats((cur) => [...cur, ...makeChats(cur.length, 7)])}
        disabled={!canLoadMore}
        className={`mt-3 w-full shrink-0 rounded-full py-2.5 text-xs font-medium text-white transition-colors ${
          canLoadMore ? 'bg-[#f4436c] hover:bg-[#d93a60]' : 'cursor-not-allowed bg-[#6e2033]'
        }`}
      >
        {canLoadMore ? 'Load More' : 'No More Chats'}
      </button>
    </section>
  )
}
