import { useEffect, useState } from 'react'

type Memo = { id: string; text: string }

const STORAGE_KEY = 'memos'

function loadMemos(): Memo[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as Memo[]) : []
  } catch {
    return []
  }
}

export default function App() {
  const [memos, setMemos] = useState<Memo[]>(loadMemos)
  const [text, setText] = useState('')

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(memos))
  }, [memos])

  const addMemo = (e: React.FormEvent) => {
    e.preventDefault()
    const trimmed = text.trim()
    if (!trimmed) return
    setMemos([{ id: crypto.randomUUID(), text: trimmed }, ...memos])
    setText('')
  }

  const deleteMemo = (id: string) => setMemos(memos.filter((m) => m.id !== id))

  return (
    <div className="mx-auto max-w-md p-6">
      <h1 className="mb-4 text-2xl font-bold">메모앱</h1>
      <form onSubmit={addMemo} className="mb-4 flex gap-2">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="메모를 입력하세요"
          className="flex-1 rounded border border-gray-300 px-3 py-2"
        />
        <button className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
          추가
        </button>
      </form>
      <p className="mb-2 text-sm text-gray-600">전체 {memos.length}개</p>
      {memos.length === 0 ? (
        <p className="text-gray-500">메모가 없습니다.</p>
      ) : (
        <ul className="space-y-2">
          {memos.map((m) => (
            <li
              key={m.id}
              className="flex items-center justify-between rounded border border-gray-200 px-3 py-2"
            >
              <span className="break-all">{m.text}</span>
              <button
                onClick={() => deleteMemo(m.id)}
                className="ml-2 text-sm text-red-600 hover:underline"
              >
                삭제
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
