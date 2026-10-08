export type Memo = { id: string; text: string; tags: string[] }

export type TagResult = { tag: string; error: null } | { tag: null; error: string }

export function validateTag(tags: string[], input: string): TagResult {
  const tag = input.trim()
  if (!tag) return { tag: null, error: '태그를 입력하세요.' }
  const key = tag.toLowerCase()
  if (tags.some((t) => t.toLowerCase() === key)) {
    return { tag: null, error: '이미 있는 태그입니다.' }
  }
  return { tag, error: null }
}
