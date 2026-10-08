import { useEffect, useState } from 'react'
import { MemoItem } from './components/MemoItem'
import type { Memo } from './memo'

const STORAGE_KEY = 'memos'

function loadMemos(): Memo[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw) as (Omit<Memo, 'tags'> & { tags?: string[] })[]
    return parsed.map((m) => ({ ...m, tags: m.tags ?? [] }))
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

  const handleAddMemo = (e: React.FormEvent) => {
    e.preventDefault()
    const trimmed = text.trim()
    if (!trimmed) return
    setMemos([{ id: crypto.randomUUID(), text: trimmed, tags: [] }, ...memos])
    setText('')
  }

  const handleDeleteMemo = (id: string) => setMemos(memos.filter((m) => m.id !== id))

  const handleChangeTags = (id: string, change: (tags: string[]) => string[]) =>
    setMemos(memos.map((m) => (m.id === id ? { ...m, tags: change(m.tags) } : m)))

  return (
    <div className="mx-auto max-w-md p-6">
      <h1 className="mb-4 text-2xl font-bold">메모앱</h1>
      <form onSubmit={handleAddMemo} className="mb-4 flex gap-2">
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
            <MemoItem
              key={m.id}
              text={m.text}
              tags={m.tags}
              onDelete={() => handleDeleteMemo(m.id)}
              onAddTag={(tag) => handleChangeTags(m.id, (tags) => [...tags, tag])}
              onRemoveTag={(tag) =>
                handleChangeTags(m.id, (tags) => tags.filter((t) => t !== tag))
              }
            />
          ))}
        </ul>
      )}
    </div>
  )
}
