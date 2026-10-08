import { describe, expect, it } from 'vitest'
import { validateTag } from './memo'

describe('validateTag', () => {
  it('앞뒤 공백을 제거한 태그를 돌려준다', () => {
    expect(validateTag([], '  React ')).toEqual({ tag: 'React', error: null })
  })

  it('빈 값은 오류다', () => {
    expect(validateTag([], '   ').error).toBe('태그를 입력하세요.')
  })

  it('공백과 대소문자를 무시하고 중복을 막는다', () => {
    expect(validateTag(['React'], ' react ').error).toBe('이미 있는 태그입니다.')
  })
})
