import { useState } from 'react'
import {
  ArrowUpRight,
  Bell,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock,
  CalendarDays,
  Flower2,
  Folder,
  Layers,
  LayoutGrid,
  MoreVertical,
  Plus,
  RotateCcw,
  Search,
  Trash2,
  Upload,
  User,
  X,
} from 'lucide-react'

const initialTasks = [
  { title: 'UX Resech Collections Your Text Here', done: false },
  { title: 'UI Reaserh Collections Your Text Here', done: false },
  { title: 'Community Feed Redesign', done: true },
  { title: 'Chat Thread Prototype', done: false },
  { title: 'Task Board Wireframe', done: true },
  { title: 'Calendar Widget Polish', done: false },
  { title: 'Onboarding Flow Review', done: false },
  { title: 'Design Tokens Cleanup', done: true },
  { title: 'Sprint Retro Notes', done: false },
  { title: 'Asset Export Batch', done: false },
  { title: 'Profile Card Layout', done: true },
  { title: 'Sidebar Navigation States', done: false },
  { title: 'Drag And Drop Upload Flow', done: false },
  { title: 'Personal Chats List States', done: true },
  { title: 'Job Desk Card Content', done: false },
  { title: 'Showcase Tiles Spacing', done: false },
  { title: 'Footer Links Audit', done: true },
  { title: 'Logo Strip Alignment', done: false },
  { title: 'Status On Progress Detail', done: false },
  { title: 'Add Your Task Modal Fields', done: true },
  { title: 'UX Resech Collections Your Text Here', done: false },
  { title: 'UI Reaserh Collections Your Text Here', done: false },
  { title: 'UX Resech Collections Your Text Here', done: true },
  { title: 'UI Reaserh Collections Your Text Here', done: false },
].map((task, i) => ({ id: i, ...task }))

const taskGroups = Array.from({ length: 10 }, (_, i) => ({ id: i, name: 'Task Group' }))

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

function Calendar() {
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
    <div className="mx-auto mt-3 w-fit rounded-xl bg-[#121212] p-4">
      <div className="flex items-center justify-between gap-8">
        <span className="text-xs font-semibold text-white">
          {monthNames[ym.m]} {ym.y}
        </span>
        <span className="flex items-center gap-2 text-gray-400">
          <button
            onClick={() => shift(-1)}
            className="transition-colors hover:text-white"
            aria-label="Previous month"
          >
            <ChevronLeft size={12} />
          </button>
          <button
            onClick={() => shift(1)}
            className="transition-colors hover:text-white"
            aria-label="Next month"
          >
            <ChevronRight size={12} />
          </button>
        </span>
      </div>
      <div className="mt-3 grid grid-cols-7 gap-x-4 gap-y-3 text-center">
        {['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map((d) => (
          <span key={d} className="text-[10px] text-gray-400">
            {d}
          </span>
        ))}
        {Array.from({ length: lead }).map((_, i) => (
          <span key={`blank-${i}`} />
        ))}
        {Array.from({ length: count }, (_, i) => i + 1).map((day) => (
          <button
            key={day}
            onClick={() => setSelected((cur) => (cur === day ? null : day))}
            className={`flex size-6 items-center justify-center rounded-full text-[10px] transition-colors ${
              selected === day
                ? 'bg-gradient-to-br from-[#2e7cf6] to-[#7c4dff] text-white'
                : 'text-gray-300 hover:bg-[#2a2a2a]'
            }`}
          >
            {day}
          </button>
        ))}
      </div>
    </div>
  )
}

function CalendarCard() {
  return (
    <div className="rounded-xl bg-[#191919] p-4">
      <div className="flex items-center justify-center gap-1.5 text-gray-400">
        <Layers size={12} className="text-[#7c4dff]" />
        <span className="text-[10px]">My Stacks</span>
      </div>
      <p className="mt-1 text-center text-sm text-white">Calendar</p>
      <Calendar />
    </div>
  )
}

function Collaborators({ label = 'Add Collaborations team' }) {
  const [pressed, setPressed] = useState(null)
  const toggle = (key) => setPressed((cur) => (cur === key ? null : key))
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-white">{label}</span>
      <button
        onClick={() => toggle('user')}
        className={`rounded-full p-2 transition-colors ${
          pressed === 'user'
            ? 'bg-[#262626] text-white'
            : 'bg-[#1f1f1f] text-gray-300 hover:bg-[#262626]'
        }`}
      >
        <User size={13} />
      </button>
      <button
        onClick={() => toggle('folder')}
        className={`rounded-full p-2 transition-colors ${
          pressed === 'folder'
            ? 'bg-[#262626] text-white'
            : 'bg-[#1f1f1f] text-gray-300 hover:bg-[#262626]'
        }`}
      >
        <Folder size={13} />
      </button>
    </div>
  )
}

function TaskGroups({ onAdd }) {
  const [activeId, setActiveId] = useState(null)
  const [menuPressed, setMenuPressed] = useState(false)
  return (
    <section className="flex w-[18rem] shrink-0 flex-col rounded-2xl bg-[#121212] p-4">
      <div className="flex items-center justify-between rounded-xl bg-[#191919] px-4 py-3">
        <span className="text-sm text-white">Task Groups</span>
        <span className="flex items-center gap-2 text-gray-400">
          <button onClick={onAdd} className="transition-colors hover:text-white">
            <Plus size={14} />
          </button>
          <button
            onClick={() => setMenuPressed((p) => !p)}
            className={`rounded p-0.5 transition-colors ${
              menuPressed ? 'text-white' : 'hover:text-white'
            }`}
          >
            <MoreVertical size={14} />
          </button>
        </span>
      </div>

      <div className="mt-3 flex flex-1 flex-col gap-2 overflow-y-auto pb-1">
        {taskGroups.map((group) => (
          <button
            key={group.id}
            onClick={() => setActiveId((cur) => (cur === group.id ? null : group.id))}
            className={`shrink-0 rounded-lg px-4 py-3 text-left text-xs transition-colors ${
              activeId === group.id
                ? 'bg-[#1f1f1f] text-white ring-1 ring-[#2e7cf6]'
                : 'bg-[#191919] text-gray-300 hover:bg-[#1f1f1f]'
            }`}
          >
            {group.name}
          </button>
        ))}
      </div>
    </section>
  )
}

function YourTaskList({ tasks, onAdd, onSelectTask, onToggleDone, onSetAllDone, selectedId }) {
  const [activeId, setActiveId] = useState(null)
  const [query, setQuery] = useState('')
  const [gridPressed, setGridPressed] = useState(false)

  const q = query.trim().toLowerCase()
  const visible = tasks.filter((task) => task.title.toLowerCase().includes(q))
  const allDone = tasks.length > 0 && tasks.every((task) => task.done)

  return (
    <section className="flex w-[24rem] shrink-0 flex-col rounded-2xl bg-[#121212] p-4">
      <p className="text-center text-sm text-white">Your Task</p>

      <div className="mt-3 flex items-center justify-center gap-2 rounded-full bg-[#0a0a0a] px-4 py-2.5">
        <Search size={12} className="shrink-0 text-gray-500" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search"
          className="min-w-0 flex-1 bg-transparent text-[11px] text-gray-200 placeholder-gray-500 outline-none"
        />
        <Layers size={12} className="shrink-0 text-[#7c4dff]" />
        <span className="shrink-0 text-[11px] text-gray-300">Your Task</span>
      </div>

      <div className="mt-3 flex items-center justify-between">
        <button
          onClick={() => onSetAllDone(!allDone)}
          className="flex items-center gap-2 text-[10px] text-gray-400 transition-colors hover:text-gray-200"
        >
          <span
            className={`flex size-3.5 items-center justify-center rounded-sm border ${
              allDone ? 'border-[#2e7cf6] bg-[#2e7cf6]' : 'border-[#3a3a3a]'
            }`}
          >
            {allDone && <Check size={9} className="text-white" />}
          </span>
          Select All
        </button>
        <button
          onClick={onAdd}
          className="flex items-center gap-1.5 rounded-md bg-[#191919] px-3 py-1.5 text-[10px] text-gray-200 transition-colors hover:bg-[#1f1f1f]"
        >
          <Plus size={10} />
          Create New Task
        </button>
        <button
          onClick={() => setGridPressed((p) => !p)}
          className={`transition-colors ${gridPressed ? 'text-white' : 'text-gray-400 hover:text-gray-200'}`}
        >
          <LayoutGrid size={13} />
        </button>
      </div>

      <div className="mt-2 flex min-h-0 flex-1 flex-col gap-1 overflow-y-auto pb-1">
        {visible.map((task) => {
          const active = task.id === activeId
          return (
            <div
              key={task.id}
              role="button"
              tabIndex={0}
              onClick={() => setActiveId((cur) => (cur === task.id ? null : task.id))}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  setActiveId((cur) => (cur === task.id ? null : task.id))
                }
              }}
              className={`flex shrink-0 cursor-pointer items-center gap-3 rounded-lg px-3 py-3 text-left transition-colors ${
                active ? 'bg-[#191919]' : 'hover:bg-[#161616]'
              }`}
            >
              <button
                type="button"
                role="radio"
                aria-checked={active}
                onClick={(e) => {
                  e.stopPropagation()
                  setActiveId(task.id)
                }}
                className={`flex size-3.5 shrink-0 items-center justify-center rounded-sm border transition-colors ${
                  active ? 'border-[#2e7cf6]' : 'border-[#3a3a3a] hover:border-gray-400'
                }`}
              >
                {active && <span className="size-1.5 rounded-full bg-[#2e7cf6]" />}
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  onToggleDone(task.id)
                }}
                className="shrink-0 transition-colors hover:text-white"
                aria-pressed={task.done}
              >
                {task.done ? (
                  <Check size={14} className="text-[#2e7cf6]" />
                ) : (
                  <RotateCcw size={14} className="text-[#F4405E]" />
                )}
              </button>
              <span className="min-w-0 flex-1">
                <span className="block text-[11px] leading-snug text-white">{task.title}</span>
                <span
                  className={`mt-0.5 block text-[9px] ${
                    task.done ? 'text-[#2e7cf6]' : 'text-[#F4405E]'
                  }`}
                >
                  ● {task.done ? 'Finish' : 'Belum Dikerjakan'}
                </span>
              </span>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  onSelectTask(task.id)
                }}
                className={`shrink-0 rounded-lg p-2 transition-colors ${
                  selectedId === task.id
                    ? 'bg-[#2e7cf6] text-white'
                    : 'bg-[#1f1f1f] text-gray-300 hover:bg-[#262626]'
                }`}
              >
                <ArrowUpRight size={12} />
              </button>
            </div>
          )
        })}
        {visible.length === 0 && (
          <p className="py-6 text-center text-xs text-gray-500">No tasks found</p>
        )}
      </div>
    </section>
  )
}

function TaskDetail({ task, onFinish, onDelete }) {
  const [pressed, setPressed] = useState(null)
  const toggle = (key) => setPressed((cur) => (cur === key ? null : key))
  const done = task?.done ?? false

  return (
    <section className="flex min-w-0 flex-1 flex-col gap-4 overflow-y-auto rounded-2xl bg-[#121212] p-5">
      <div className="flex items-center gap-2">
        {done ? (
          <Check size={18} className="text-[#22c55e]" />
        ) : (
          <RotateCcw size={18} className="text-[#F4405E]" />
        )}
        <span className={`text-base ${done ? 'text-[#22c55e]' : 'text-[#F4405E]'}`}>
          {done ? 'Status Finish' : 'Status On Progress'}
        </span>
      </div>

      <p className="text-sm leading-relaxed text-white">
        {task ? task.title : 'Task Name Placehere your project Bloweblowe'}
      </p>

      <div className="flex flex-col items-start gap-1.5">
        <p className="flex items-center gap-1.5 text-[11px] text-gray-400">
          <CalendarDays size={11} className="text-[#2e7cf6]" />
          Create Date:
          <span className="text-gray-200">05-29-2024</span>
        </p>
        <p className="flex items-center gap-1.5 text-[11px] text-gray-400">
          <Bell size={11} className="text-[#2e7cf6]" />
          Notifications
        </p>
        <button
          onClick={() => toggle('deadline')}
          className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 text-[10px] transition-colors ${
            pressed === 'deadline'
              ? 'bg-[#262626] text-white'
              : 'bg-[#191919] text-gray-300 hover:bg-[#1f1f1f]'
          }`}
        >
          <Clock size={10} className="text-[#7c4dff]" />
          Add deadline
        </button>
      </div>

      <p className="rounded-xl bg-[#191919] p-4 text-[11px] leading-relaxed text-gray-400">
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
        been the industry&apos;s standard dummy text ever since the 1500s,
      </p>

      <button
        onClick={() => toggle('status')}
        className={`flex w-fit items-center gap-1.5 rounded-md px-2.5 py-1 text-[10px] transition-colors ${
          pressed === 'status'
            ? 'bg-[#262626] text-white'
            : 'bg-[#191919] text-gray-300 hover:bg-[#1f1f1f]'
        }`}
      >
        <Clock size={10} className="text-[#7c4dff]" />
        Status On Progress
      </button>

      <div className="flex items-center justify-between">
        <button
          onClick={() => task && onFinish(task.id)}
          disabled={!task}
          className={`rounded-lg px-12 py-2 text-xs font-medium text-white transition-colors ${
            task ? 'bg-[#1d4ed8] hover:bg-[#1a45c0]' : 'cursor-not-allowed bg-[#1d4ed8]/40'
          }`}
        >
          Finishs
        </button>
        <button
          onClick={() => task && onDelete(task.id)}
          disabled={!task}
          className={`rounded-lg p-2.5 transition-colors ${
            task
              ? 'bg-[#191919] text-[#F4405E] hover:bg-[#1f1f1f]'
              : 'cursor-not-allowed bg-[#191919] text-[#F4405E]/40'
          }`}
        >
          <Trash2 size={14} />
        </button>
      </div>

      <Collaborators />

      <CalendarCard />
    </section>
  )
}

function AddTaskModal({ onClose, onSubmit }) {
  const [title, setTitle] = useState('')
  const [note, setNote] = useState('')

  const submit = () => {
    onSubmit(title.trim(), note.trim())
    onClose()
  }

  return (
    <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/60 p-6">
      <div className="flex max-h-full w-full max-w-lg flex-col gap-4 overflow-y-auto rounded-2xl bg-[#161616] p-6">
        <div className="relative flex items-center justify-center gap-2">
          <Flower2 size={22} className="text-[#F4405E]" />
          <span className="text-2xl text-white">Add Your task</span>
          <button
            onClick={onClose}
            className="absolute right-0 top-0 text-gray-400 transition-colors hover:text-white"
          >
            <X size={16} />
          </button>
        </div>

        <div>
          <p className="text-[11px] text-gray-300">Add Your task</p>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Add Your task"
            className="mt-1.5 w-full rounded-lg bg-[#121212] px-4 py-3 text-xs text-white placeholder-gray-500 outline-none"
          />
        </div>

        <div>
          <p className="text-[11px] text-gray-300">Note</p>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Note"
            className="mt-1.5 h-20 w-full resize-none rounded-lg bg-[#121212] px-4 py-3 text-xs text-white placeholder-gray-500 outline-none"
          />
        </div>

        <CalendarCard />

        <Collaborators />

        <div className="flex gap-3">
          <button
            onClick={submit}
            className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-[#1f1f1f] py-2.5 text-xs text-white transition-colors hover:bg-[#262626]"
          >
            Save
            <Check size={12} className="text-[#2e7cf6]" />
          </button>
          <button
            onClick={submit}
            className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-[#7c4dff] py-2.5 text-xs text-white transition-colors hover:bg-[#6a3fe0]"
          >
            Upload
            <Upload size={12} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default function TaskPage() {
  const [modalOpen, setModalOpen] = useState(true)
  const [tasks, setTasks] = useState(initialTasks)
  const [selectedId, setSelectedId] = useState(null)

  const addTask = (title) => {
    setTasks((cur) => [
      { id: Date.now(), title: title || 'UX Resech Collections Your Text Here', done: false },
      ...cur,
    ])
  }

  const toggleDone = (id) =>
    setTasks((cur) => cur.map((task) => (task.id === id ? { ...task, done: !task.done } : task)))

  const setAllDone = (done) => setTasks((cur) => cur.map((task) => ({ ...task, done })))

  const finishTask = (id) =>
    setTasks((cur) => cur.map((task) => (task.id === id ? { ...task, done: true } : task)))

  const deleteTask = (id) => {
    setTasks((cur) => cur.filter((task) => task.id !== id))
    setSelectedId((cur) => (cur === id ? null : cur))
  }

  const selectedTask = tasks.find((task) => task.id === selectedId) ?? null

  return (
    <div className="relative flex min-w-0 flex-1 gap-4">
      <TaskGroups onAdd={() => setModalOpen(true)} />
      <YourTaskList
        tasks={tasks}
        onAdd={() => setModalOpen(true)}
        onSelectTask={setSelectedId}
        onToggleDone={toggleDone}
        onSetAllDone={setAllDone}
        selectedId={selectedId}
      />
      <TaskDetail task={selectedTask} onFinish={finishTask} onDelete={deleteTask} />
      {modalOpen && (
        <AddTaskModal onClose={() => setModalOpen(false)} onSubmit={addTask} />
      )}
    </div>
  )
}
