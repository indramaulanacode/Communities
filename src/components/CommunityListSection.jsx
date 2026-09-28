import { useState } from 'react'
import { ArrowLeft, Layers, Search, Star } from 'lucide-react'

const groups = Array.from({ length: 9 }, (_, i) => ({
  id: i,
  name: 'Place Your Name Here',
  subtitle: 'Messeger here',
  date: '06/07/24',
}))

const members = Array.from({ length: 11 }, (_, i) => ({
  id: i,
  name: 'Place Your Name Here',
  subtitle: 'Arsyad',
  message: 'Haloo Kamu sipa',
}))

function ListHeader({ query, onQuery }) {
  return (
    <>
      <div className="flex items-center justify-center gap-2 pt-2 text-gray-200">
        <Layers size={14} className="text-[#2e7cf6]" />
        <span className="text-xs">Your Community</span>
      </div>
      <div className="mt-4 flex items-center justify-center gap-2 rounded-lg border border-[#242424] bg-[#0a0a0a] py-2.5 pl-3 pr-2">
        <input
          value={query}
          onChange={(e) => onQuery(e.target.value)}
          placeholder="Search"
          className="min-w-0 flex-1 bg-transparent text-xs text-gray-200 placeholder-gray-500 outline-none"
        />
        <Search size={12} className="shrink-0 text-gray-500" />
      </div>
    </>
  )
}

function GroupList({ onOpen, query, onQuery, starred, onToggleStar }) {
  const visible = groups.filter((group) =>
    group.name.toLowerCase().includes(query.trim().toLowerCase()),
  )
  return (
    <>
      <ListHeader query={query} onQuery={onQuery} />
      <div className="mt-4 flex min-h-0 max-h-96 flex-1 flex-col gap-3 overflow-y-auto pb-1 lg:max-h-none">
        {visible.map((group) => (
          <button
            key={group.id}
            onClick={() => onOpen(group.id)}
            className="flex shrink-0 items-center gap-3 rounded-xl border border-[#232323] bg-[#191919] p-3 text-left transition-colors hover:bg-[#1f1f1f]"
          >
            <div className="size-12 shrink-0 rounded-lg bg-[#d6d6d6]" />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm text-white">{group.name}</p>
              <p className="truncate text-xs text-gray-400">{group.subtitle}</p>
              <p className="mt-0.5 text-[10px] text-gray-500">{group.date}</p>
            </div>
            <span
              role="button"
              tabIndex={0}
              onClick={(e) => {
                e.stopPropagation()
                onToggleStar(group.id)
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.stopPropagation()
                  onToggleStar(group.id)
                }
              }}
              className="shrink-0 cursor-pointer transition-colors hover:text-[#5ea2ff]"
              aria-pressed={starred.has(group.id)}
            >
              <Star
                size={18}
                fill={starred.has(group.id) ? 'currentColor' : 'none'}
                className="text-[#2e7cf6]"
              />
            </span>
          </button>
        ))}
        {visible.length === 0 && (
          <p className="py-6 text-center text-xs text-gray-500">No community found</p>
        )}
      </div>
    </>
  )
}

function ActiveGroupList({
  railActive,
  onSelectRail,
  listActive,
  onSelectEntry,
  onClose,
  query,
  onQuery,
}) {
  const visible = members.filter((member) =>
    member.name.toLowerCase().includes(query.trim().toLowerCase()),
  )
  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <button
        onClick={onClose}
        className="flex w-fit items-center gap-1.5 rounded-lg bg-[#1f1f1f] px-3 py-1.5 text-xs text-gray-300 transition-colors hover:bg-[#262626]"
      >
        <ArrowLeft size={13} />
        Back
      </button>

      <div className="mt-3 flex max-h-[26rem] min-h-0 flex-1 gap-3 lg:max-h-none">
        <div className="flex min-h-0 flex-col gap-3 overflow-y-auto py-2">
          {members.map((member) => (
            <button
              key={member.id}
              onClick={() => onSelectRail(member.id)}
              className={`size-12 shrink-0 rounded-xl bg-[#e9e9e9] transition-shadow ${
                member.id === railActive ? 'ring-4 ring-[#F4405E]' : ''
              }`}
            />
          ))}
        </div>

        <div className="flex min-h-0 min-w-0 flex-1 flex-col border-l border-[#242424] pl-3">
          <ListHeader query={query} onQuery={onQuery} />
          <div className="mt-4 flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto pb-1">
            {visible.map((member) => {
              const selected = member.id === listActive
              return (
                <button
                  key={member.id}
                  onClick={() => onSelectEntry(member.id)}
                  className={`shrink-0 rounded-lg px-4 py-3 text-left transition-colors ${
                    selected ? 'bg-[#3871EE]' : 'bg-[#191919] hover:bg-[#1f1f1f]'
                  }`}
                >
                  <p className="truncate text-sm text-white">{member.name}</p>
                  <p
                    className={`truncate text-[11px] ${
                      selected ? 'text-blue-100' : 'text-gray-400'
                    }`}
                  >
                    {member.subtitle}
                  </p>
                  <p
                    className={`truncate text-[11px] ${
                      selected ? 'text-blue-100' : 'text-gray-400'
                    }`}
                  >
                    {member.message}
                  </p>
                </button>
              )
            })}
            {visible.length === 0 && (
              <p className="py-6 text-center text-xs text-gray-500">No community found</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function CommunityListSection() {
  const [openGroup, setOpenGroup] = useState(null)
  const [railActive, setRailActive] = useState(3)
  const [listActive, setListActive] = useState(3)
  const [query, setQuery] = useState('')
  const [starred, setStarred] = useState(() => new Set())

  const toggleStar = (id) =>
    setStarred((cur) => {
      const next = new Set(cur)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })

  return (
    <section className="flex min-h-0 w-full shrink-0 flex-col rounded-2xl bg-[#121212] p-4 lg:w-[24rem]">
      {openGroup === null ? (
        <GroupList
          onOpen={setOpenGroup}
          query={query}
          onQuery={setQuery}
          starred={starred}
          onToggleStar={toggleStar}
        />
      ) : (
        <ActiveGroupList
          railActive={railActive}
          onSelectRail={setRailActive}
          listActive={listActive}
          onSelectEntry={setListActive}
          onClose={() => setOpenGroup(null)}
          query={query}
          onQuery={setQuery}
        />
      )}
    </section>
  )
}
