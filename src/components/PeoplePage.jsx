import { useState } from 'react'
import {
  ArrowLeft,
  ArrowRight,
  Bookmark,
  CalendarDays,
  Check,
  Clock,
  Folder,
  Hash,
  Megaphone,
  MessageCircle,
  MessageSquare,
  MoreVertical,
  Search,
  Settings,
  Share2,
  SlidersHorizontal,
  UserPlus,
  Users,
} from 'lucide-react'

const initialChannels = [
  { id: 'general', name: 'general', icon: Hash },
  { id: 'introductions', name: 'introductions', icon: Megaphone },
  { id: 'design-feedback', name: 'design-feedback', icon: MessageSquare, badge: 4 },
  { id: 'resources', name: 'resources', icon: Bookmark },
]

const onlineNow = [
  { id: 'maya', name: 'Maya Chen', role: 'Host', color: 'bg-[#a855f7]' },
  { id: 'alex', name: 'Alex Morgan', role: 'Moderator', color: 'bg-[#2e7cf6]' },
  { id: 'priya', name: 'Priya Shah', role: 'Online', color: 'bg-[#f97316]' },
]

const initialMembers = [
  {
    id: 'mc',
    initials: 'MC',
    name: 'Maya Chen',
    handle: '@mayachen',
    role: 'Owner',
    status: 'Hosting in design-feedback',
    grad: 'from-[#a855f7] to-[#7c4dff]',
  },
  {
    id: 'am',
    initials: 'AM',
    name: 'Alex Morgan',
    handle: '@alexm',
    role: 'Moderator',
    status: 'Active 4 min ago',
    grad: 'from-[#2e7cf6] to-[#1d4ed8]',
  },
  {
    id: 'ps',
    initials: 'PS',
    name: 'Priya Shah',
    handle: '@priyashah',
    role: 'Moderator',
    status: 'Active 18 min ago',
    grad: 'from-[#ec4899] to-[#a855f7]',
  },
  {
    id: 'jb',
    initials: 'JB',
    name: 'Jon Bell',
    handle: '@jonb',
    role: 'Contributor',
    status: 'Shared a resource yesterday',
    grad: 'from-[#f97316] to-[#f59e0b]',
  },
  {
    id: 'sr',
    initials: 'SR',
    name: 'Sofia Reyes',
    handle: '@sofiar',
    role: 'Member',
    status: 'Joined 3 days ago',
    grad: 'from-[#22c55e] to-[#14b8a6]',
  },
  {
    id: 'nw',
    initials: 'NW',
    name: 'Noah Williams',
    handle: '@noahw',
    role: 'Member',
    status: 'Active yesterday',
    grad: 'from-[#ef4444] to-[#ec4899]',
  },
]

const extraMembers = [
  {
    id: 'ed',
    initials: 'ED',
    name: 'Emma Davis',
    handle: '@emmad',
    role: 'Member',
    status: 'Active 2 hours ago',
    grad: 'from-[#14b8a6] to-[#2e7cf6]',
  },
  {
    id: 'lp',
    initials: 'LP',
    name: 'Liam Park',
    handle: '@liamp',
    role: 'Contributor',
    status: 'Active 5 hours ago',
    grad: 'from-[#7c4dff] to-[#ec4899]',
  },
  {
    id: 'at',
    initials: 'AT',
    name: 'Ava Torres',
    handle: '@avat',
    role: 'Member',
    status: 'Joined last week',
    grad: 'from-[#f59e0b] to-[#ef4444]',
  },
  {
    id: 'ek',
    initials: 'EK',
    name: 'Ethan Kim',
    handle: '@ethank',
    role: 'Member',
    status: 'Active last week',
    grad: 'from-[#2e7cf6] to-[#22c55e]',
  },
  {
    id: 'ml',
    initials: 'ML',
    name: 'Mia Lopez',
    handle: '@mial',
    role: 'Contributor',
    status: 'Shared a resource last week',
    grad: 'from-[#ec4899] to-[#f97316]',
  },
  {
    id: 'lr',
    initials: 'LR',
    name: 'Lucas Reed',
    handle: '@lucasr',
    role: 'Member',
    status: 'Active 2 weeks ago',
    grad: 'from-[#a855f7] to-[#2e7cf6]',
  },
]

const files = [
  { id: 'f1', name: 'brand-assets.zip', size: '24 MB' },
  { id: 'f2', name: 'onboarding-guide.pdf', size: '2.1 MB' },
  { id: 'f3', name: 'community-kit.fig', size: '18 MB' },
]

const roles = ['All roles', 'Owner', 'Moderator', 'Contributor', 'Member']

const roleChipClass = (role) =>
  role === 'Owner' || role === 'Moderator'
    ? 'bg-[#1d4ed8] text-blue-100'
    : 'bg-[#2a2a2a] text-gray-300'

function CommunityPanel({ onNavigate }) {
  const [channels, setChannels] = useState(initialChannels)
  const [activeChannel, setActiveChannel] = useState('design-feedback')
  const [activeOnline, setActiveOnline] = useState(null)
  const [query, setQuery] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)
  const [invitePressed, setInvitePressed] = useState(false)

  const q = query.trim().toLowerCase()
  const visibleChannels = channels.filter((c) => c.name.toLowerCase().includes(q))
  const visibleOnline = onlineNow.filter((o) => o.name.toLowerCase().includes(q))

  return (
    <section className="flex min-h-0 w-full shrink-0 flex-col rounded-2xl bg-[#121212] p-4 lg:w-[24rem]">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[9px] uppercase tracking-widest text-gray-500">Community</p>
          <h2 className="mt-1 text-lg text-white">Your Community</h2>
        </div>
        <button
          onClick={() => setMenuOpen((open) => !open)}
          className={`rounded-lg p-1.5 transition-colors ${
            menuOpen ? 'bg-[#262626] text-white' : 'text-gray-400 hover:text-white'
          }`}
        >
          <MoreVertical size={15} />
        </button>
      </div>

      <div className="mt-3 flex items-center gap-2 rounded-lg bg-[#0a0a0a] px-3 py-2.5">
        <Search size={13} className="shrink-0 text-gray-500" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search community"
          className="min-w-0 flex-1 bg-transparent text-xs text-gray-200 placeholder-gray-500 outline-none"
        />
        <span className="shrink-0 rounded bg-[#2a2a2a] px-1.5 py-0.5 text-[9px] text-gray-400">
          ⌘K
        </span>
      </div>

      <div className="mt-3 rounded-xl bg-[#191919] p-3">
        <div className="flex items-center gap-3">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-[#a855f7] to-[#7c4dff] text-white">
            <Users size={16} />
          </span>
          <div className="min-w-0">
            <p className="flex items-center gap-2 truncate text-sm text-white">
              Your Community
              <span className="shrink-0 rounded-md bg-[#1d4ed8]/40 px-1.5 py-0.5 text-[8px] text-blue-200">
                PRIVATE
              </span>
            </p>
            <p className="truncate text-[10px] text-gray-400">1,248 members · 82 online</p>
          </div>
        </div>
        <button
          onClick={() => onNavigate('chats')}
          className="mt-3 flex w-full items-center justify-between rounded-lg bg-[#2e7cf6] px-3 py-2.5 text-[11px] text-white transition-colors hover:bg-[#2568d4]"
        >
          <span className="flex items-center gap-2">
            <MessageCircle size={13} />
            Back to active conversation
          </span>
          <ArrowRight size={13} />
        </button>
      </div>

      <div className="mt-4 flex min-h-0 flex-1 flex-col overflow-y-auto">
        <div className="flex items-center justify-between">
          <span className="text-[9px] uppercase tracking-widest text-gray-500">Channels</span>
          <button
            onClick={() =>
              setChannels((cur) => [
                ...cur,
                {
                  id: `new-${cur.length}`,
                  name: `new-channel-${cur.length - 3}`,
                  icon: Hash,
                },
              ])
            }
            className="text-gray-400 transition-colors hover:text-white"
          >
            <Hash size={12} className="rotate-45" />
          </button>
        </div>
        <div className="mt-2 flex flex-col gap-1">
          {visibleChannels.map((channel) => {
            const Icon = channel.icon
            const active = channel.id === activeChannel
            return (
              <button
                key={channel.id}
                onClick={() => setActiveChannel(channel.id)}
                className={`flex items-center gap-2.5 rounded-lg px-3 py-2 text-left transition-colors ${
                  active ? 'bg-[#1e1e1e] text-white' : 'text-gray-400 hover:bg-[#191919]'
                }`}
              >
                <Icon size={13} className={active ? 'text-[#2e7cf6]' : 'text-gray-500'} />
                <span className="min-w-0 flex-1 truncate text-[11px]">{channel.name}</span>
                {channel.badge && (
                  <span className="shrink-0 rounded-full bg-[#2e7cf6] px-1.5 py-0.5 text-[9px] text-white">
                    {channel.badge}
                  </span>
                )}
              </button>
            )
          })}
        </div>

        <div className="mt-4 flex items-center justify-between">
          <span className="text-[9px] uppercase tracking-widest text-gray-500">Online now</span>
          <span className="text-[10px] text-gray-500">82</span>
        </div>
        <div className="mt-2 flex flex-col gap-1">
          {visibleOnline.map((person) => {
            const active = person.id === activeOnline
            return (
              <button
                key={person.id}
                onClick={() => setActiveOnline((cur) => (cur === person.id ? null : person.id))}
                className={`flex items-center gap-2.5 rounded-lg px-3 py-1.5 text-left transition-colors ${
                  active ? 'bg-[#1e1e1e]' : 'hover:bg-[#191919]'
                }`}
              >
                <span className={`size-6 shrink-0 rounded-full ${person.color}`} />
                <span className="min-w-0 flex-1 truncate text-[11px] text-gray-200">
                  {person.name}
                </span>
                <span className="shrink-0 text-[9px] text-gray-500">{person.role}</span>
              </button>
            )
          })}
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between gap-3 border-t border-[#232323] pt-4">
        <div className="min-w-0">
          <p className="text-[11px] text-white">Grow the conversation</p>
          <p className="truncate text-[9px] text-gray-500">
            Invite teammates with a secure link
          </p>
        </div>
        <button
          onClick={() => setInvitePressed((p) => !p)}
          className={`shrink-0 rounded-lg px-3 py-1.5 text-[10px] transition-colors ${
            invitePressed
              ? 'bg-[#262626] text-white'
              : 'bg-[#1e1e1e] text-gray-300 hover:bg-[#262626]'
          }`}
        >
          Invite
        </button>
      </div>
    </section>
  )
}

function MembersPanel() {
  const [tab, setTab] = useState('Members')
  const [members, setMembers] = useState(initialMembers)
  const [loaded, setLoaded] = useState(false)
  const [query, setQuery] = useState('')
  const [roleFilter, setRoleFilter] = useState('All roles')
  const [roleMenuOpen, setRoleMenuOpen] = useState(false)
  const [activeMember, setActiveMember] = useState(null)
  const [activeAction, setActiveAction] = useState(null)
  const [activeFile, setActiveFile] = useState(null)
  const [pressed, setPressed] = useState(null)
  const [invites, setInvites] = useState(0)

  const q = query.trim().toLowerCase()
  const visible = members.filter(
    (member) =>
      (roleFilter === 'All roles' || member.role === roleFilter) &&
      (member.name.toLowerCase().includes(q) ||
        member.handle.toLowerCase().includes(q) ||
        member.role.toLowerCase().includes(q)),
  )

  const togglePressed = (key) => setPressed((cur) => (cur === key ? null : key))

  return (
    <section className="flex min-h-0 min-w-0 flex-1 flex-col rounded-2xl bg-[#121212] p-5">
      <div className="flex items-center justify-between">
        <button
          onClick={() => togglePressed('back')}
          className={`flex items-center gap-2 rounded-lg px-3 py-2 text-[11px] transition-colors ${
            pressed === 'back'
              ? 'bg-[#262626] text-white'
              : 'bg-[#191919] text-gray-300 hover:bg-[#1f1f1f]'
          }`}
        >
          <ArrowLeft size={13} />
          Back to conversation
        </button>
        <span className="flex items-center gap-2">
          <button
            onClick={() => togglePressed('share')}
            className={`flex items-center gap-2 rounded-lg px-3 py-2 text-[11px] transition-colors ${
              pressed === 'share'
                ? 'bg-[#262626] text-white'
                : 'bg-[#191919] text-gray-300 hover:bg-[#1f1f1f]'
            }`}
          >
            <Share2 size={12} />
            Share
          </button>
          <button
            onClick={() => togglePressed('settings')}
            className={`rounded-lg p-2 transition-colors ${
              pressed === 'settings'
                ? 'bg-[#262626] text-white'
                : 'bg-[#191919] text-gray-300 hover:bg-[#1f1f1f]'
            }`}
          >
            <Settings size={13} />
          </button>
        </span>
      </div>

      <div className="mt-4 rounded-xl bg-[#191919] p-5">
        <div className="flex items-start gap-4">
          <span className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#a855f7] to-[#7c4dff] text-white">
            <Users size={22} />
          </span>
          <div className="min-w-0 flex-1">
            <p className="flex items-center gap-2 text-base text-white">
              Your Community
              <span className="flex size-4 shrink-0 items-center justify-center rounded-full bg-[#2e7cf6]">
                <Check size={10} className="text-white" />
              </span>
            </p>
            <p className="mt-1 text-[11px] leading-relaxed text-gray-400">
              A focused space for product thinkers and makers to exchange feedback, share
              practical resources, and build better work together.
            </p>
            <p className="mt-2 flex flex-wrap items-center gap-4 text-[10px] text-gray-400">
              <span className="flex items-center gap-1.5">
                <Users size={11} />
                1,248 members
              </span>
              <span className="flex items-center gap-1.5">
                <span className="size-1.5 rounded-full bg-[#22c55e]" />
                82 online
              </span>
              <span className="flex items-center gap-1.5">
                <CalendarDays size={11} />
                Created Jan 2024
              </span>
            </p>
          </div>
          <span className="flex shrink-0 items-center gap-1.5 rounded-lg bg-[#122b1c] px-3 py-2 text-[10px] text-[#4ade80]">
            <Check size={12} />
            Joined
          </span>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-6 border-b border-[#232323]">
        {['About', 'Members', 'Files'].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`-mb-px border-b-2 pb-2.5 text-[11px] transition-colors ${
              tab === t
                ? 'border-[#2e7cf6] text-white'
                : 'border-transparent text-gray-500 hover:text-gray-300'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === 'About' && (
        <div className="mt-4 flex flex-col gap-4">
          <p className="rounded-xl bg-[#191919] p-4 text-[11px] leading-relaxed text-gray-400">
            Your Community is a private workspace for product thinkers and makers. Members
            exchange feedback in focused channels, share practical resources, and host
            weekly conversations around design and development craft.
          </p>
          <div className="flex flex-wrap gap-2">
            {['Design', 'Development', 'Research', 'Feedback'].map((tag) => (
              <span
                key={tag}
                className="rounded-md bg-[#1e1e1e] px-3 py-1.5 text-[10px] text-gray-300"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}

      {tab === 'Files' && (
        <div className="mt-4 flex flex-col gap-2">
          {files.map((file) => (
            <button
              key={file.id}
              onClick={() => setActiveFile((cur) => (cur === file.id ? null : file.id))}
              className={`flex items-center gap-3 rounded-lg p-3 text-left transition-colors ${
                activeFile === file.id ? 'bg-[#1e1e1e]' : 'bg-[#191919] hover:bg-[#1f1f1f]'
              }`}
            >
              <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-[#2a2a2a] text-gray-300">
                <Folder size={14} />
              </span>
              <span className="min-w-0 flex-1 truncate text-[11px] text-gray-200">
                {file.name}
              </span>
              <span className="shrink-0 text-[10px] text-gray-500">{file.size}</span>
            </button>
          ))}
        </div>
      )}

      {tab === 'Members' && (
        <>
          <div className="mt-4 flex items-center gap-3">
            <div className="flex min-w-0 flex-1 items-center gap-2 rounded-lg bg-[#0a0a0a] px-3 py-2.5">
              <Search size={13} className="shrink-0 text-gray-500" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search members by name, handle, or role"
                className="min-w-0 flex-1 bg-transparent text-xs text-gray-200 placeholder-gray-500 outline-none"
              />
              <span className="shrink-0 rounded bg-[#2a2a2a] px-1.5 py-0.5 text-[9px] text-gray-400">
                ⌘F
              </span>
            </div>
            <div className="relative shrink-0">
              <button
                onClick={() => setRoleMenuOpen((open) => !open)}
                className={`flex items-center gap-2 rounded-lg px-3 py-2.5 text-[11px] transition-colors ${
                  roleMenuOpen
                    ? 'bg-[#262626] text-white'
                    : 'bg-[#191919] text-gray-300 hover:bg-[#1f1f1f]'
                }`}
              >
                <SlidersHorizontal size={12} />
                {roleFilter}
              </button>
              {roleMenuOpen && (
                <div className="absolute right-0 top-11 z-10 flex w-32 flex-col gap-1 rounded-xl bg-[#1e1e1e] p-1.5 shadow-lg">
                  {roles.map((role) => (
                    <button
                      key={role}
                      onClick={() => {
                        setRoleFilter(role)
                        setRoleMenuOpen(false)
                      }}
                      className={`rounded-lg px-3 py-1.5 text-left text-[10px] transition-colors ${
                        roleFilter === role
                          ? 'bg-[#262626] text-white'
                          : 'text-gray-300 hover:bg-[#262626]'
                      }`}
                    >
                      {role}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button
              onClick={() => {
                setInvites((n) => n + 1)
                setMembers((cur) => [
                  ...cur,
                  {
                    id: `invite-${invites + 1}`,
                    initials: `N${invites + 1}`,
                    name: `New Invite ${invites + 1}`,
                    handle: `@invite${invites + 1}`,
                    role: 'Member',
                    status: 'Invited just now',
                    grad: 'from-[#2e7cf6] to-[#7c4dff]',
                  },
                ])
              }}
              className="flex shrink-0 items-center gap-2 rounded-lg bg-[#2e7cf6] px-4 py-2.5 text-[11px] text-white transition-colors hover:bg-[#2568d4]"
            >
              <UserPlus size={12} />
              Invite members
            </button>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <span className="flex items-center gap-2 text-sm text-white">
              Members
              <span className="rounded-md bg-[#1e1e1e] px-2 py-0.5 text-[9px] text-gray-400">
                1,248
              </span>
            </span>
            <span className="text-[10px] text-gray-500">Sort: Recently active</span>
          </div>

          <div className="mt-3 flex min-h-0 max-h-96 flex-1 flex-col gap-2 overflow-y-auto pb-1 lg:max-h-none">
            {visible.map((member) => {
              const active = member.id === activeMember
              return (
                <div
                  key={member.id}
                  role="button"
                  tabIndex={0}
                  onClick={() => setActiveMember((cur) => (cur === member.id ? null : member.id))}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      setActiveMember((cur) => (cur === member.id ? null : member.id))
                    }
                  }}
                  className={`flex shrink-0 cursor-pointer items-center gap-3 rounded-xl p-3 text-left transition-colors ${
                    active ? 'bg-[#1e1e1e] ring-1 ring-[#2e7cf6]' : 'bg-[#161616] hover:bg-[#1c1c1c]'
                  }`}
                >
                  <span className="relative shrink-0">
                    <span
                      className={`flex size-10 items-center justify-center rounded-full bg-gradient-to-br text-[11px] font-medium text-white ${member.grad}`}
                    >
                      {member.initials}
                    </span>
                    <span className="absolute -bottom-0.5 -right-0.5 size-2.5 rounded-full bg-[#22c55e]" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-xs text-white">{member.name}</span>
                    <span className="block truncate text-[9px] text-gray-500">
                      {member.handle}
                    </span>
                  </span>
                  <span
                    className={`shrink-0 rounded-md px-2.5 py-1 text-[9px] ${roleChipClass(member.role)}`}
                  >
                    {member.role}
                  </span>
                  <span className="flex min-w-0 flex-1 items-center gap-1.5 text-[10px] text-gray-400">
                    <Clock size={10} className="shrink-0 text-gray-500" />
                    <span className="truncate">{member.status}</span>
                  </span>
                  <span className="flex shrink-0 items-center gap-1.5">
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        setActiveAction((cur) =>
                          cur === `${member.id}-chat` ? null : `${member.id}-chat`,
                        )
                      }}
                      className={`rounded-lg p-2 transition-colors ${
                        activeAction === `${member.id}-chat`
                          ? 'bg-[#2e7cf6] text-white'
                          : 'bg-[#1f1f1f] text-gray-300 hover:bg-[#262626]'
                      }`}
                    >
                      <MessageCircle size={12} />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        setActiveAction((cur) =>
                          cur === `${member.id}-menu` ? null : `${member.id}-menu`,
                        )
                      }}
                      className={`rounded-lg p-2 transition-colors ${
                        activeAction === `${member.id}-menu`
                          ? 'bg-[#262626] text-white'
                          : 'bg-[#1f1f1f] text-gray-300 hover:bg-[#262626]'
                      }`}
                    >
                      <MoreVertical size={12} />
                    </button>
                  </span>
                </div>
              )
            })}
            {visible.length === 0 && (
              <p className="py-6 text-center text-xs text-gray-500">No members found</p>
            )}
          </div>

          <div className="mt-3 flex items-center justify-between">
            <span className="text-[10px] text-gray-500">
              Showing {visible.length} of 1,248 members
            </span>
            <button
              onClick={() => {
                if (!loaded) {
                  setMembers((cur) => [...cur, ...extraMembers])
                  setLoaded(true)
                }
              }}
              disabled={loaded}
              className={`rounded-lg px-3 py-1.5 text-[10px] transition-colors ${
                loaded
                  ? 'cursor-not-allowed bg-[#191919] text-gray-600'
                  : 'bg-[#1e1e1e] text-gray-300 hover:bg-[#262626]'
              }`}
            >
              {loaded ? 'No more members' : 'Load more'}
            </button>
          </div>
        </>
      )}
    </section>
  )
}

export default function PeoplePage({ onNavigate }) {
  return (
    <div className="flex min-h-0 min-w-0 flex-1 flex-col gap-4 overflow-y-auto lg:flex-row lg:overflow-visible">
      <CommunityPanel onNavigate={onNavigate} />
      <MembersPanel />
    </div>
  )
}
