import { useEffect, useRef, useState } from 'react'
import { ChevronUp, Folder, MoreVertical, Paperclip, Star } from 'lucide-react'

const initialMessages = [
  {
    id: 1,
    sender: 'John Doe Indra',
    color: 'blue',
    text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
  },
  {
    id: 2,
    sender: 'John Doe Indra',
    color: 'orange',
    text: 'Lorem Ips\nsnfskf\num is simply dummy text of',
  },
  { id: 3, divider: 'Sunday 09:07' },
  {
    id: 4,
    sender: 'John Doe Indra',
    color: 'blue',
    own: true,
    text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
  },
  {
    id: 5,
    sender: 'John Doe Indra',
    color: 'orange',
    text: 'Lorem Ipsum is simply dummy text of',
  },
  { id: 6, divider: 'Sunday 09:07' },
  {
    id: 7,
    sender: 'John Doe Indra',
    color: 'orange',
    text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
  },
  {
    id: 8,
    text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
  },
]

function MessageBubble({ message, variant }) {
  if (variant === 'chats') {
    if (message.own) {
      return (
        <div className="flex items-end justify-end gap-3">
          <div className="max-w-md whitespace-pre-line rounded-xl bg-[#f4436c] px-5 py-3 text-sm leading-relaxed text-white">
            {message.text}
          </div>
          <div className="size-8 shrink-0 rounded-full bg-[#e9e9e9]" />
        </div>
      )
    }
    return (
      <div className="flex items-end gap-3">
        <div className="size-8 shrink-0 rounded-md bg-[#e9e9e9]" />
        <div className="max-w-md whitespace-pre-line rounded-xl bg-[#1e1e1e] px-5 py-3 text-sm leading-relaxed text-gray-200">
          {message.text}
        </div>
      </div>
    )
  }

  return (
    <div>
      {message.sender && (
        <div className="flex items-center gap-3">
          <div className="size-9 shrink-0 rounded-full bg-[#ececec]" />
          <span
            className={`text-sm font-bold ${
              message.color === 'orange' ? 'text-[#f97316]' : 'text-[#2e7cf6]'
            }`}
          >
            {message.sender}
          </span>
        </div>
      )}
      <div
        className={`mt-2 max-w-md whitespace-pre-line rounded-xl px-5 py-3 text-sm leading-relaxed ${
          message.own ? 'bg-[#2e7cf6] text-white' : 'bg-[#1e1e1e] text-gray-200'
        } ${message.sender ? 'ml-12' : ''}`}
      >
        {message.text}
      </div>
    </div>
  )
}

export default function ChatPanel({ chat, variant }) {
  const [fileOpen, setFileOpen] = useState(false)
  const [messages, setMessages] = useState(initialMessages)
  const [draft, setDraft] = useState('')
  const [starred, setStarred] = useState(false)
  const [menuPressed, setMenuPressed] = useState(false)
  const listRef = useRef(null)

  useEffect(() => {
    const list = listRef.current
    if (list) list.scrollTop = list.scrollHeight
  }, [messages])

  const send = () => {
    const text = draft.trim()
    if (!text) return
    setMessages((cur) => [...cur, { id: `own-${cur.length + 1}`, own: true, text }])
    setDraft('')
  }

  return (
    <section className="flex min-h-[28rem] min-w-0 flex-1 flex-col rounded-2xl bg-[#121212] lg:min-h-0">
      <header className="flex items-center gap-3 p-4">
        <div className="size-10 shrink-0 rounded-full bg-[#e9e9e9]" />
        <div className="min-w-0">
          <p className="truncate text-sm text-white">
            {chat ? chat.name : 'Place Your Name Here'}
          </p>
          <p className="truncate text-[11px] text-gray-400">
            {chat ? chat.subtitle : 'Messeger here'}
          </p>
          <p className="text-[10px] text-gray-500">{chat ? chat.date : '06/07/24'}</p>
        </div>
        <div className="ml-auto flex items-center gap-3">
          <button
            onClick={() => setStarred((s) => !s)}
            aria-pressed={starred}
            className="transition-colors hover:text-[#5ea2ff]"
          >
            <Star
              size={16}
              fill={starred ? 'currentColor' : 'none'}
              className="text-[#2e7cf6]"
            />
          </button>
          <button
            onClick={() => setMenuPressed((p) => !p)}
            aria-pressed={menuPressed}
            className={`rounded-md p-1 transition-colors ${
              menuPressed ? 'bg-[#262626] text-white' : 'text-gray-400 hover:text-white'
            }`}
          >
            <MoreVertical size={16} />
          </button>
        </div>
      </header>

      <div className="relative flex min-h-0 flex-1 flex-col">
        <div ref={listRef} className="flex min-h-0 flex-1 flex-col gap-6 overflow-y-auto px-6 py-4">
          {messages.map((message) =>
            message.divider ? (
              <p key={message.id} className="text-center text-[10px] text-gray-500">
                {message.divider}
              </p>
            ) : (
              <MessageBubble key={message.id} message={message} variant={variant} />
            ),
          )}
        </div>

        {fileOpen && (
          <div
            className="absolute inset-0 z-10 flex items-center justify-center bg-black/40 px-10 py-6"
            onClick={() => setFileOpen(false)}
          >
            <div
              className="flex aspect-square w-full max-w-md flex-col items-center justify-center gap-4 rounded-3xl bg-[#1c1c1c]"
              onClick={(e) => e.stopPropagation()}
            >
              <Folder size={44} strokeWidth={1.5} className="text-gray-300" />
              <p className="text-center text-sm leading-relaxed text-gray-300">
                Drag And Drop
                <br />
                File
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="p-4 pt-0">
        <div className="flex items-center gap-3 rounded-xl bg-[#1e1e1e] px-5 py-3">
          <input
            type="text"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && send()}
            placeholder="Write a messege......."
            className="min-w-0 flex-1 bg-transparent text-sm text-gray-200 placeholder-gray-500 outline-none"
          />
          <button
            onClick={() => setFileOpen((open) => !open)}
            className="shrink-0 text-gray-400 transition-colors hover:text-white"
          >
            <Paperclip size={16} />
          </button>
          <button
            onClick={send}
            aria-label="Send message"
            className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#7c4dff] text-white transition-colors hover:bg-[#6a3fe0]"
          >
            <ChevronUp size={16} />
          </button>
        </div>
      </div>
    </section>
  )
}
