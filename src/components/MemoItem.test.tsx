import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { MemoItem } from './MemoItem'

function setup(tags: string[] = []) {
  const onAddTag = vi.fn()
  const onRemoveTag = vi.fn()
  render(
    <ul>
      <MemoItem
        text="장보기"
        tags={tags}
        onDelete={() => {}}
        onAddTag={onAddTag}
        onRemoveTag={onRemoveTag}
      />
    </ul>,
  )
  return { onAddTag, onRemoveTag }
}

describe('MemoItem 태그', () => {
  it('태그 목록을 보여준다', () => {
    setup(['집', '급함'])
    expect(screen.getByText('집')).toBeInTheDocument()
    expect(screen.getByText('급함')).toBeInTheDocument()
  })

  it('Enter로 태그를 추가한다', async () => {
    const { onAddTag } = setup()
    await userEvent.type(screen.getByLabelText('태그 입력'), ' 집 {Enter}')
    expect(onAddTag).toHaveBeenCalledWith('집')
  })

  it('중복 태그는 추가하지 않고 오류를 보여준다', async () => {
    const { onAddTag } = setup(['React'])
    await userEvent.type(screen.getByLabelText('태그 입력'), 'react{Enter}')
    expect(onAddTag).not.toHaveBeenCalled()
    expect(screen.getByText('이미 있는 태그입니다.')).toBeInTheDocument()
  })

  it('× 버튼으로 태그를 삭제한다', async () => {
    const { onRemoveTag } = setup(['집'])
    await userEvent.click(screen.getByLabelText('집 태그 삭제'))
    expect(onRemoveTag).toHaveBeenCalledWith('집')
  })
})
