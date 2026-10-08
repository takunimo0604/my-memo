import { useState } from 'react'
import { validateTag } from '../memo'

type MemoItemProps = {
  text: string
  tags: string[]
  onDelete: () => void
  onAddTag: (tag: string) => void
  onRemoveTag: (tag: string) => void
}

export function MemoItem({ text, tags, onDelete, onAddTag, onRemoveTag }: MemoItemProps) {
  const [input, setInput] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const result = validateTag(tags, input)
    if (result.error !== null) {
      setError(result.error)
      return
    }
    onAddTag(result.tag)
    setInput('')
    setError('')
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
    setError('')
  }

  return (
    <li className="rounded border border-gray-200 px-3 py-2">
      <div className="flex items-center justify-between">
        <span className="break-all">{text}</span>
        <button
          onClick={onDelete}
          className="ml-2 text-sm text-red-600 hover:underline"
        >
          삭제
        </button>
      </div>
      {tags.length > 0 && (
        <ul className="mt-2 flex flex-wrap gap-1">
          {tags.map((tag) => (
            <li
              key={tag}
              className="flex items-center rounded bg-gray-100 px-2 py-0.5 text-sm break-all"
            >
              {tag}
              <button
                type="button"
                onClick={() => onRemoveTag(tag)}
                aria-label={`${tag} 태그 삭제`}
                className="ml-1 text-gray-500 hover:text-red-600"
              >
                ×
              </button>
            </li>
          ))}
        </ul>
      )}
      <form onSubmit={handleSubmit} className="mt-2">
        <input
          value={input}
          onChange={handleChange}
          placeholder="태그 추가 (Enter)"
          aria-label="태그 입력"
          className="w-full rounded border border-gray-300 px-2 py-1 text-sm"
        />
        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
      </form>
    </li>
  )
}
