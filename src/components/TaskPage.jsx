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

const initialTasks = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  title: 'UX Resech Collections Your Text Here',
  done: i === 2 || i === 5 || i === 7,
}))

const taskGroups = Array.from({ length: 10 }, (_, i) => ({ id: i, name: 'Task Group' }))

const calendarDays = [
  null,
  null,
  null,
  1, 2, 3, 4,
  5, 6, 7, 8, 9, 10, 11,
  12, 13, 14, 15, 16, 17, 18,
  19, 20, 21, 22, 23, 24, 25,
  26, 27, 28, 29, 30, 31,
]

function Calendar() {
  return (
    <div className="mx-auto mt-3 w-fit rounded-xl bg-[#121212] p-4">
      <div className="flex items-center justify-between gap-8">
        <span className="text-xs font-semibold text-white">October 2020</span>
        <span className="flex items-center gap-2 text-gray-400">
          <ChevronLeft size={12} />
          <ChevronRight size={12} />
        </span>
      </div>
      <div className="mt-3 grid grid-cols-7 gap-x-4 gap-y-3 text-center">
        {['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map((d) => (
          <span key={d} className="text-[10px] text-gray-400">
            {d}
          </span>
        ))}
        {calendarDays.map((day, i) => (
          <span
            key={i}
            className={`flex size-6 items-center justify-center rounded-full text-[10px] ${
              day === 14
                ? 'bg-gradient-to-br from-[#2e7cf6] to-[#7c4dff] text-white'
                : 'text-gray-300'
            }`}
          >
            {day ?? ''}
          </span>
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
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-white">{label}</span>
      <button className="rounded-full bg-[#1f1f1f] p-2 text-gray-300 transition-colors hover:bg-[#262626]">
        <User size={13} />
      </button>
      <button className="rounded-full bg-[#1f1f1f] p-2 text-gray-300 transition-colors hover:bg-[#262626]">
        <Folder size={13} />
      </button>
    </div>
  )
}

function TaskGroups({ onAdd }) {
  return (
    <section className="flex w-[18rem] shrink-0 flex-col rounded-2xl bg-[#121212] p-4">
      <div className="flex items-center justify-between rounded-xl bg-[#191919] px-4 py-3">
        <span className="text-sm text-white">Task Groups</span>
        <span className="flex items-center gap-2 text-gray-400">
          <button onClick={onAdd} className="transition-colors hover:text-white">
            <Plus size={14} />
          </button>
          <MoreVertical size={14} />
        </span>
      </div>

      <div className="mt-3 flex flex-1 flex-col gap-2 overflow-y-auto pb-1">
        {taskGroups.map((group) => (
          <button
            key={group.id}
            className="shrink-0 rounded-lg bg-[#191919] px-4 py-3 text-left text-xs text-gray-300 transition-colors hover:bg-[#1f1f1f]"
          >
            {group.name}
          </button>
        ))}
      </div>
    </section>
  )
}

function YourTaskList({ tasks, onAdd }) {
  const [activeId, setActiveId] = useState(null)

  return (
    <section className="flex w-[24rem] shrink-0 flex-col rounded-2xl bg-[#121212] p-4">
      <p className="text-center text-sm text-white">Your Task</p>

      <div className="mt-3 flex items-center justify-center gap-2 rounded-full bg-[#0a0a0a] px-4 py-2.5">
        <span className="text-[11px] text-gray-500">Search</span>
        <Search size={12} className="text-gray-500" />
        <Layers size={12} className="ml-3 text-[#7c4dff]" />
        <span className="text-[11px] text-gray-300">Your Task</span>
      </div>

      <div className="mt-3 flex items-center justify-between">
        <span className="flex items-center gap-2 text-[10px] text-gray-400">
          <span className="size-3.5 rounded-sm border border-[#3a3a3a]" />
          Select All
        </span>
        <button
          onClick={onAdd}
          className="flex items-center gap-1.5 rounded-md bg-[#191919] px-3 py-1.5 text-[10px] text-gray-200 transition-colors hover:bg-[#1f1f1f]"
        >
          <Plus size={10} />
          Create New Task
        </button>
        <LayoutGrid size={13} className="text-gray-400" />
      </div>

      <div className="mt-2 flex min-h-0 flex-1 flex-col gap-1 overflow-y-auto pb-1">
        {tasks.map((task) => {
          const active = task.id === activeId
          return (
            <button
              key={task.id}
              onClick={() => setActiveId((cur) => (cur === task.id ? null : task.id))}
              className={`flex shrink-0 items-center gap-3 rounded-lg px-3 py-3 text-left transition-colors ${
                active ? 'bg-[#191919]' : 'hover:bg-[#161616]'
              }`}
            >
              <span className="size-3.5 shrink-0 rounded-sm border border-[#3a3a3a]" />
              {task.done ? (
                <Check size={14} className="shrink-0 text-[#2e7cf6]" />
              ) : (
                <RotateCcw size={14} className="shrink-0 text-[#F4405E]" />
              )}
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
              <span className="shrink-0 rounded-lg bg-[#1f1f1f] p-2 text-gray-300">
                <ArrowUpRight size={12} />
              </span>
            </button>
          )
        })}
      </div>
    </section>
  )
}

function TaskDetail() {
  return (
    <section className="flex min-w-0 flex-1 flex-col gap-4 overflow-y-auto rounded-2xl bg-[#121212] p-5">
      <div className="flex items-center gap-2">
        <RotateCcw size={18} className="text-[#F4405E]" />
        <span className="text-base text-[#F4405E]">Status On Progress</span>
      </div>

      <p className="text-sm leading-relaxed text-white">
        Task Name Placehere your project Bloweblowe
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
        <span className="flex items-center gap-1.5 rounded-md bg-[#191919] px-2.5 py-1 text-[10px] text-gray-300">
          <Clock size={10} className="text-[#7c4dff]" />
          Add deadline
        </span>
      </div>

      <p className="rounded-xl bg-[#191919] p-4 text-[11px] leading-relaxed text-gray-400">
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
        been the industry&apos;s standard dummy text ever since the 1500s,
      </p>

      <span className="flex w-fit items-center gap-1.5 rounded-md bg-[#191919] px-2.5 py-1 text-[10px] text-gray-300">
        <Clock size={10} className="text-[#7c4dff]" />
        Status On Progress
      </span>

      <div className="flex items-center justify-between">
        <button className="rounded-lg bg-[#1d4ed8] px-12 py-2 text-xs font-medium text-white transition-colors hover:bg-[#1a45c0]">
          Finishs
        </button>
        <button className="rounded-lg bg-[#191919] p-2.5 text-[#F4405E] transition-colors hover:bg-[#1f1f1f]">
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

  const addTask = (title) => {
    setTasks((cur) => [
      { id: Date.now(), title: title || 'UX Resech Collections Your Text Here', done: false },
      ...cur,
    ])
  }

  return (
    <div className="relative flex min-w-0 flex-1 gap-4">
      <TaskGroups onAdd={() => setModalOpen(true)} />
      <YourTaskList tasks={tasks} onAdd={() => setModalOpen(true)} />
      <TaskDetail />
      {modalOpen && (
        <AddTaskModal onClose={() => setModalOpen(false)} onSubmit={addTask} />
      )}
    </div>
  )
}
