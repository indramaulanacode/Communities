import { useState } from 'react'
import {
  ArrowUpRight,
  Boxes,
  ChevronLeft,
  ChevronRight,
  Diamond,
  Layers,
  LayoutGrid,
  MessageCircle,
  MessageSquare,
  Send,
  Star,
  Triangle,
  Users,
} from 'lucide-react'

function useActive(initial = null) {
  const [active, setActive] = useState(initial)
  return [active, (id) => setActive((cur) => (cur === id ? null : id))]
}

function CardHeader({ label, title }) {
  return (
    <div className="text-center">
      <p className="flex items-center justify-center gap-1.5 text-[11px] text-gray-400">
        <Layers size={12} className="text-[#7c4dff]" />
        {label}
      </p>
      <h2 className="mt-1 text-lg font-medium text-white">{title}</h2>
    </div>
  )
}

function Card({ children, className = '' }) {
  return (
    <div className={`rounded-2xl bg-[#161616] p-5 ${className}`}>
      {children}
    </div>
  )
}

function TechArsenal({ onNavigate }) {
  const tiles = [
    { label: 'Community', icon: LayoutGrid, page: 'community' },
    { label: 'People', icon: Users },
    { label: 'Chats', icon: MessageCircle, page: 'chats' },
    { label: 'Task', icon: Layers, page: 'task' },
  ]
  const [active, toggle] = useActive()
  return (
    <Card>
      <CardHeader label="My Genius" title="Tech Arsenal" />
      <div className="mt-4 grid grid-cols-2 gap-3">
        {tiles.map(({ label, icon: Icon, page }) => (
          <button
            key={label}
            onClick={() => {
              toggle(label)
              if (page) onNavigate(page)
            }}
            className={`flex items-center gap-2 rounded-lg p-2.5 text-left transition-colors ${
              active === label
                ? 'bg-[#262626] ring-1 ring-[#2e7cf6]'
                : 'bg-[#1e1e1e] hover:bg-[#262626]'
            }`}
          >
            <span className="flex size-7 shrink-0 items-center justify-center rounded-md bg-[#2a2a2a]">
              <Icon size={12} className="text-gray-400" />
            </span>
            <span className="text-[10px] text-gray-300">{label}</span>
          </button>
        ))}
      </div>
    </Card>
  )
}

function CommunityCard({ onNavigate }) {
  const [active, toggle] = useActive()
  return (
    <Card>
      <CardHeader label="My Stacks" title="Community" />
      <div className="mt-4 flex flex-col gap-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <button
            key={i}
            onClick={() => toggle(i)}
            className={`flex items-center gap-3 rounded-lg p-3 text-left transition-colors ${
              active === i ? 'bg-[#262626] ring-1 ring-[#7c4dff]' : 'bg-[#1e1e1e] hover:bg-[#262626]'
            }`}
          >
            <span className="flex size-9 shrink-0 items-center justify-center rounded-md bg-[#2a2a2a]">
              <MessageSquare size={14} className="text-gray-400" />
            </span>
            <span className="text-sm text-gray-200">Web Developer</span>
            <span
              role="button"
              tabIndex={0}
              onClick={(e) => {
                e.stopPropagation()
                onNavigate('community')
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.stopPropagation()
                  onNavigate('community')
                }
              }}
              className="ml-auto flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-lg bg-[#7c4dff] text-white transition-colors hover:bg-[#6a3fe0]"
            >
              <ArrowUpRight size={15} />
            </span>
          </button>
        ))}
      </div>
    </Card>
  )
}

const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

function CalendarCard() {
  const [ym, setYm] = useState({ y: 2020, m: 9 })
  const [selected, setSelected] = useState(14)

  const shift = (delta) => {
    setYm(({ y, m }) => {
      let nm = m + delta
      let ny = y
      if (nm < 0) {
        nm = 11
        ny -= 1
      }
      if (nm > 11) {
        nm = 0
        ny += 1
      }
      return { y: ny, m: nm }
    })
    setSelected(null)
  }

  const lead = (new Date(ym.y, ym.m, 1).getDay() + 6) % 7
  const count = new Date(ym.y, ym.m + 1, 0).getDate()

  return (
    <Card>
      <CardHeader label="My Stacks" title="Calendar" />
      <div className="mt-4 rounded-lg bg-[#1e1e1e] p-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-white">
            {monthNames[ym.m]} {ym.y}
          </span>
          <span className="flex items-center gap-2 text-gray-400">
            <button
              onClick={() => shift(-1)}
              className="transition-colors hover:text-white"
              aria-label="Previous month"
            >
              <ChevronLeft size={13} />
            </button>
            <button
              onClick={() => shift(1)}
              className="transition-colors hover:text-white"
              aria-label="Next month"
            >
              <ChevronRight size={13} />
            </button>
          </span>
        </div>
        <div className="mt-3 grid grid-cols-7 text-center text-[10px] text-gray-400">
          {['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map((d) => (
            <span key={d} className="py-1">
              {d}
            </span>
          ))}
        </div>
        <div className="grid grid-cols-7 text-center text-[11px] text-gray-300">
          {Array.from({ length: lead }).map((_, i) => (
            <span key={`blank-${i}`} />
          ))}
          {Array.from({ length: count }, (_, i) => i + 1).map((day) => (
            <span key={day} className="flex items-center justify-center py-1">
              <button
                onClick={() => setSelected((cur) => (cur === day ? null : day))}
                className={`flex size-6 items-center justify-center rounded-full transition-colors ${
                  selected === day
                    ? 'bg-gradient-to-br from-[#2e7cf6] to-[#7c4dff] text-white'
                    : 'hover:bg-[#2a2a2a]'
                }`}
              >
                {day}
              </button>
            </span>
          ))}
        </div>
      </div>
    </Card>
  )
}

function TaskCard() {
  const tiles = [
    { icon: LayoutGrid, color: 'text-[#ef4444]' },
    { icon: Users, color: 'text-[#f97316]' },
    { icon: MessageCircle, color: 'text-[#a855f7]' },
    { icon: Layers, color: 'text-[#f97316]' },
    { icon: Boxes, color: 'text-[#14b8a6]' },
  ]
  const [active, toggle] = useActive()
  return (
    <Card>
      <p className="flex items-center justify-center gap-1.5 text-[11px] text-gray-400">
        <Layers size={12} className="text-[#7c4dff]" />
        Task
      </p>
      <div className="mt-4 grid grid-cols-5 gap-2">
        {tiles.map(({ icon: Icon, color }, i) => (
          <button
            key={i}
            onClick={() => toggle(i)}
            className="flex flex-col items-center gap-2 rounded-lg p-1 transition-colors hover:bg-[#1e1e1e]"
          >
            <span
              className={`flex size-10 items-center justify-center rounded-md transition-colors ${
                active === i ? 'bg-[#2a2a2a] ring-1 ring-[#2e7cf6]' : 'bg-[#1e1e1e]'
              }`}
            >
              <Icon size={16} className={color} />
            </span>
            <span className="text-[9px] text-gray-400">Community</span>
          </button>
        ))}
      </div>
    </Card>
  )
}

function ProfileInfoCard() {
  const tabs = ['usernamehere', 'Locations', 'Software Engginering', 'IST']
  const [starred, setStarred] = useState(false)
  const [activeTab, toggleTab] = useActive()
  const [activeBtn, toggleBtn] = useActive()
  return (
    <Card>
      <div className="flex items-center gap-4">
        <div className="size-16 shrink-0 rounded-2xl bg-[#e9e9e9]" />
        <div className="min-w-0">
          <p className="truncate text-base text-white">Joh Walker Info</p>
          <p className="text-[11px] text-gray-400">Messenger here</p>
          <p className="text-[10px] text-gray-500">06/07/24</p>
        </div>
        <button
          onClick={() => setStarred((s) => !s)}
          className="ml-auto shrink-0 transition-colors hover:text-[#5ea2ff]"
          aria-pressed={starred}
        >
          <Star
            size={16}
            fill={starred ? 'currentColor' : 'none'}
            className="text-[#2e7cf6]"
          />
        </button>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => toggleTab(tab)}
            className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-[10px] transition-colors ${
              activeTab === tab
                ? 'bg-[#262626] text-white ring-1 ring-[#7c4dff]'
                : 'bg-[#1e1e1e] text-gray-300 hover:bg-[#262626]'
            }`}
          >
            <Layers size={10} className="text-[#7c4dff]" />
            {tab}
          </button>
        ))}
      </div>
      <p className="mt-4 rounded-lg bg-[#1e1e1e] p-4 text-xs leading-relaxed text-gray-300">
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s,
      </p>
      <p className="mt-2 text-right text-[10px] text-gray-500">Today 05:01:22</p>
      <div className="mt-3 grid grid-cols-2 gap-3">
        {Array.from({ length: 2 }).map((_, i) => (
          <button
            key={i}
            onClick={() => toggleBtn(i)}
            className={`flex items-center justify-center gap-2 rounded-lg py-2.5 text-sm transition-colors ${
              activeBtn === i
                ? 'bg-[#262626] text-white'
                : 'bg-[#1e1e1e] text-gray-200 hover:bg-[#262626]'
            }`}
          >
            <Send size={13} className="text-[#7c4dff]" />
            Button Title
          </button>
        ))}
      </div>
    </Card>
  )
}

function ShowcaseTilesCard() {
  const dots = ['bg-[#22c55e]', 'bg-[#6b7280]', 'bg-[#22c55e]', 'bg-[#22c55e]']
  const [active, toggle] = useActive()
  const [viewsAll, setViewsAll] = useState(false)
  return (
    <Card>
      <CardHeader label="My Stacks" title="Rave Riviews Showcase" />
      <div className="mt-5 grid grid-cols-4 gap-3">
        {dots.map((dot, i) => (
          <button
            key={i}
            onClick={() => toggle(i)}
            className="flex flex-col items-center gap-2 rounded-lg p-1 transition-colors hover:bg-[#1e1e1e]"
          >
            <span className={`relative rounded-xl ${active === i ? 'ring-2 ring-[#2e7cf6]' : ''}`}>
              <span className="block size-12 rounded-xl bg-[#e9e9e9]" />
              <span className={`absolute -bottom-0.5 -right-0.5 size-3 rounded-full ${dot}`} />
            </span>
            <span className="text-center text-[10px] leading-tight text-gray-300">
              Place
              <br />
              Name Here
            </span>
          </button>
        ))}
      </div>
      <button
        onClick={() => setViewsAll((v) => !v)}
        className={`mt-5 flex w-full items-center justify-center gap-2 rounded-lg py-2.5 text-sm transition-colors ${
          viewsAll ? 'bg-[#262626] text-white' : 'bg-[#1e1e1e] text-gray-200 hover:bg-[#262626]'
        }`}
      >
        <Send size={13} className="text-[#7c4dff]" />
        Views All
      </button>
    </Card>
  )
}

function ShowcaseEntriesCard() {
  const [active, toggle] = useActive()
  const [activeBtn, toggleBtn] = useActive()
  return (
    <Card>
      <CardHeader label="My Stacks" title="Rave Riviews Showcase" />
      <div className="mt-4 flex flex-col gap-4">
        {Array.from({ length: 2 }).map((_, i) => (
          <button
            key={i}
            onClick={() => toggle(i)}
            className={`rounded-lg p-2 text-left transition-colors ${
              active === i ? 'bg-[#1e1e1e] ring-1 ring-[#2e7cf6]' : 'hover:bg-[#1e1e1e]'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="size-10 shrink-0 rounded-lg bg-[#e9e9e9]" />
              <div className="min-w-0">
                <p className="text-xs text-white">John Doe</p>
                <p className="text-[9px] text-gray-500">06/07/24</p>
              </div>
            </div>
            <p className="mt-2 text-[9px] leading-relaxed text-gray-400">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s,
            </p>
          </button>
        ))}
      </div>
      <div className="mt-4 grid grid-cols-2 gap-3">
        {Array.from({ length: 2 }).map((_, i) => (
          <button
            key={i}
            onClick={() => toggleBtn(i)}
            className={`flex items-center justify-center gap-2 rounded-lg py-2 text-[11px] transition-colors ${
              activeBtn === i
                ? 'bg-[#262626] text-white'
                : 'bg-[#1e1e1e] text-gray-200 hover:bg-[#262626]'
            }`}
          >
            <Send size={11} className="text-[#7c4dff]" />
            Button Title
          </button>
        ))}
      </div>
    </Card>
  )
}

function ShowcaseRowsCard() {
  const [active, toggle] = useActive()
  const [viewsAll, setViewsAll] = useState(false)
  return (
    <Card>
      <CardHeader label="My Stacks" title="Rave Riviews Showcase" />
      <div className="mt-4 flex flex-col gap-2.5">
        {Array.from({ length: 4 }).map((_, i) => (
          <button
            key={i}
            onClick={() => toggle(i)}
            className={`flex items-center gap-2.5 rounded-lg p-2.5 text-left transition-colors ${
              active === i ? 'bg-[#262626] ring-1 ring-[#2e7cf6]' : 'bg-[#1e1e1e] hover:bg-[#262626]'
            }`}
          >
            <span className="relative shrink-0">
              <span className="block size-8 rounded-full bg-[#e9e9e9]" />
              <span className="absolute -bottom-0.5 -right-0.5 size-2.5 rounded-full bg-[#22c55e]" />
            </span>
            <span className="min-w-0">
              <span className="block truncate text-[11px] text-white">Place yourname here</span>
              <span className="block truncate text-[9px] text-gray-500">Place yourname here</span>
            </span>
          </button>
        ))}
      </div>
      <button
        onClick={() => setViewsAll((v) => !v)}
        className={`mt-3 flex w-full items-center justify-center gap-2 rounded-lg py-2 text-[11px] transition-colors ${
          viewsAll ? 'bg-[#262626] text-white' : 'bg-[#1e1e1e] text-gray-200 hover:bg-[#262626]'
        }`}
      >
        <Send size={11} className="text-[#7c4dff]" />
        Views All
      </button>
    </Card>
  )
}

function JobDeskCard() {
  const rows = [
    { icon: MessageSquare, color: 'text-[#ef4444]' },
    { icon: MessageSquare, color: 'text-[#ef4444]' },
    { icon: MessageSquare, color: 'text-[#ef4444]' },
    { icon: MessageSquare, color: 'text-[#22c55e]' },
    { icon: MessageSquare, color: 'text-[#ef4444]' },
    { icon: MessageSquare, color: 'text-[#ef4444]' },
    { icon: Layers, color: 'text-[#a855f7]' },
  ]
  const [active, toggle] = useActive()
  return (
    <Card>
      <CardHeader label="My Stacks" title="Job Desk" />
      <div className="mt-4 flex flex-col gap-2.5">
        {rows.map(({ icon: Icon, color }, i) => (
          <button
            key={i}
            onClick={() => toggle(i)}
            className={`flex items-start gap-2 rounded-lg p-2.5 text-left transition-colors ${
              active === i ? 'bg-[#262626] ring-1 ring-[#2e7cf6]' : 'bg-[#1e1e1e] hover:bg-[#262626]'
            }`}
          >
            <Icon size={13} className={`mt-0.5 shrink-0 ${color}`} />
            <span className="min-w-0">
              <span className="block text-[10px] leading-snug text-gray-200">
                UI Reaserh Collections Your Text Here
              </span>
              <span className="block text-[9px] text-gray-500">Messeger here</span>
            </span>
          </button>
        ))}
      </div>
    </Card>
  )
}

function CollectionsCard() {
  const rows = [
    { color: 'text-[#ef4444]', sub: 'text-[#f97316]' },
    { color: 'text-[#2e7cf6]', sub: 'text-[#f97316]' },
    { color: 'text-[#22c55e]', sub: 'text-[#22c55e]' },
  ]
  const [active, toggle] = useActive()
  const [activeArrow, toggleArrow] = useActive()
  return (
    <Card>
      <CardHeader label="My Stacks" title="Rave Riviews Showcase" />
      <div className="mt-4 flex flex-col gap-2.5">
        {rows.map(({ color, sub }, i) => (
          <button
            key={i}
            onClick={() => toggle(i)}
            className={`flex items-center gap-2 rounded-lg p-2.5 text-left transition-colors ${
              active === i ? 'bg-[#262626] ring-1 ring-[#2e7cf6]' : 'bg-[#1e1e1e] hover:bg-[#262626]'
            }`}
          >
            <Triangle size={14} className={`shrink-0 ${color}`} />
            <span className="min-w-0 flex-1">
              <span className="block text-[10px] leading-snug text-gray-200">
                UX Reaserh Collections Your Text Here
              </span>
              <span className={`block text-[9px] ${sub}`}>Messeger here</span>
            </span>
            <span
              role="button"
              tabIndex={0}
              onClick={(e) => {
                e.stopPropagation()
                toggleArrow(i)
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.stopPropagation()
                  toggleArrow(i)
                }
              }}
              className={`flex size-7 shrink-0 cursor-pointer items-center justify-center rounded-full transition-colors ${
                activeArrow === i
                  ? 'bg-[#2e7cf6] text-white'
                  : 'bg-[#2a2a2a] text-gray-300 hover:bg-[#333]'
              }`}
            >
              <ArrowUpRight size={12} />
            </span>
          </button>
        ))}
      </div>
    </Card>
  )
}

function LogoStrip() {
  const [active, toggle] = useActive()
  const logos = [
    {
      key: 'blo',
      node: (
        <span className="flex items-center gap-4">
          <Diamond size={30} className="text-gray-300" />
          <span className="text-2xl font-bold text-white">Blo Community</span>
        </span>
      ),
    },
    { key: 'php', node: <span className="text-4xl font-black italic">php</span> },
    {
      key: 'slack',
      node: (
        <span className="flex items-center gap-2 text-3xl font-bold">
          <LayoutGrid size={26} />
          slack
        </span>
      ),
    },
    { key: 'percy', node: <span className="text-3xl font-bold">percy</span> },
    { key: 'paysafe', node: <span className="text-3xl font-bold">Paysafe:</span> },
  ]
  return (
    <div className="flex flex-wrap items-center gap-x-14 gap-y-4 rounded-2xl bg-[#161616] px-10 py-7">
      {logos.map(({ key, node }) => (
        <button
          key={key}
          onClick={() => toggle(key)}
          className={`transition-colors ${
            active === key ? 'text-white' : 'text-[#4b4b4b] hover:text-gray-300'
          }`}
        >
          {node}
        </button>
      ))}
    </div>
  )
}

function Footer() {
  const columns = [
    ['Service', 'Contact Us', 'Affilate Program', 'About Us'],
    ['Dashboard', 'Platform', 'Worksci Library', 'App Design'],
    ['About Us'],
  ]
  const [active, toggle] = useActive()
  return (
    <div className="flex flex-wrap gap-x-20 gap-y-8 rounded-2xl bg-[#161616] p-10">
      <div className="max-w-sm">
        <span className="flex items-center gap-4">
          <Diamond size={32} className="text-[#f97316]" />
          <span className="text-3xl font-bold text-white">Blo Community</span>
        </span>
        <p className="mt-5 text-sm leading-relaxed text-gray-400">
          Ease of shopping is our main focus. With powerful search features and
          customizable filters, you can easily find the products you are looking
          for.
        </p>
      </div>
      {columns.map((links, i) => (
        <div key={i}>
          <p className="text-sm font-semibold text-white">Get Started</p>
          <ul className="mt-4 space-y-3">
            {links.map((link) => {
              const key = `${i}-${link}`
              return (
                <li key={link}>
                  <button
                    onClick={() => toggle(key)}
                    className={`text-xs transition-colors ${
                      active === key ? 'text-white' : 'text-gray-400 hover:text-gray-200'
                    }`}
                  >
                    {link}
                  </button>
                </li>
              )
            })}
          </ul>
        </div>
      ))}
    </div>
  )
}

export default function Dashboard({ onNavigate }) {
  return (
    <div className="min-w-0 flex-1 overflow-auto">
      <div className="flex w-full min-w-[72rem] flex-col gap-4">
        <div className="grid grid-cols-[16rem_minmax(24rem,1fr)_14rem_15rem] items-start gap-4">
          <div className="flex flex-col gap-4">
            <TechArsenal onNavigate={onNavigate} />
            <CommunityCard onNavigate={onNavigate} />
            <CalendarCard />
          </div>
          <div className="flex flex-col gap-4">
            <TaskCard />
            <ProfileInfoCard />
            <ShowcaseTilesCard />
          </div>
          <div className="flex flex-col gap-4">
            <ShowcaseEntriesCard />
            <ShowcaseRowsCard />
          </div>
          <div className="flex flex-col gap-4">
            <JobDeskCard />
            <CollectionsCard />
          </div>
        </div>
        <LogoStrip />
        <Footer />
      </div>
    </div>
  )
}
