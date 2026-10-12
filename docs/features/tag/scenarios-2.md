# 메모에 태그 추가/삭제 시나리오 (#2)

## 함수 시그니처

| 함수/콜백 | 입력 | 출력 | 에러 메시지 |
|---|---|---|---|
| `validateTag` (기존) | `tags: string[]`, `input: string` | `TagResult` (`{ tag: string; error: null }` 또는 `{ tag: null; error: string }`) | `태그를 입력하세요.`, `이미 있는 태그입니다.` |
| `MemoItem.handleSubmit` (기존) | `event: React.FormEvent<HTMLFormElement>` | `void` | 검증 실패 시 해당 문구를 입력란 아래에 표시 |
| `onAddTag` (기존 콜백) | `tag: string` | `void` | - |
| `onRemoveTag` (기존 콜백) | `tag: string` | `void` | - |
| `handleChangeTags` (기존) | `id: string`, `change: (tags: string[]) => string[]` | `void` | - |
| `loadMemos` (기존) | 없음 | `Memo[]` | 파싱 실패 시 빈 배열 반환 |

저장은 별도 함수가 아니라 메모 상태 변경을 감지하는 `useEffect`가 담당한다.

## 테스트 시나리오

태그 길이와 개수에는 제한이 없으므로 최대값 기준 경계 테스트는 적용하지 않는다. 의미 있는 경계로 태그 0개, 1개, 여러 개 상태를 확인한다.

### [정상]

- `S1 [C1] validateTag should return the trimmed tag when input has surrounding whitespace`
- `S2 [C1] MemoItem.handleSubmit should add the tag and show its chip when Enter is pressed with valid input`
- `S4 [C2] handleChangeTags should remove only the selected tag when a tag's × button is pressed`
- `S7 [C3] MemoItem.handleSubmit should show "이미 있는 태그입니다." and not add a tag when input differs only by whitespace and case`
- `S9 [C5] App should retain a memo's tag after localStorage is saved and the app is reloaded`

### [경계]

- `S3 [C1] validateTag should accept a one-character tag when the memo has no tags`
- `S5 [C1] validateTag should accept a new tag when the memo already has multiple different tags`
- `S6 [C2] handleChangeTags should leave no tags when the memo's only tag is removed`

### [예외]

- `S8 [C4] MemoItem.handleSubmit should show "태그를 입력하세요." and not add a tag when input contains only whitespace`
- `S10 [C5] loadMemos should treat a saved memo without a tags field as having an empty tag list`
- `S11 [체크리스트 밖] loadMemos should return an empty list when saved JSON is malformed`

## 체크리스트 대조표

| 체크리스트 | 시나리오 | 구분 |
|---|---|---|
| C1. Enter로 앞뒤 공백을 제거해 해당 메모에 추가 | S1, S2, S3, S5 | 정상, 경계 |
| C2. ×를 누르면 해당 태그만 삭제 | S4, S6 | 정상, 경계 |
| C3. 공백·대소문자만 다른 중복은 추가하지 않고 안내 표시 | S7 | 정상 |
| C4. 공백만 입력하면 추가하지 않고 안내 표시 | S8 | 예외 |
| C5. 새로고침 후 태그 유지, 태그 없는 기존 메모도 표시 | S9, S10 | 정상, 예외 |
| 체크리스트 밖 | S11. 잘못된 JSON 저장 데이터 처리 | 예외 |
