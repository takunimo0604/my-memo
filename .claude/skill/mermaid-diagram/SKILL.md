---
name: mermaid-diagram
description: src/의 컴포넌트·훅·유틸 파일 간 import 관계를 분석해 docs/architecture/index.html에 Mermaid flowchart TD로 그리고 브라우저로 연다. "아키텍처 다이어그램", "import 관계도", "구조도 그려줘" 요청 시 사용.
---

# mermaid-diagram

`src/`의 import 관계를 Mermaid 다이어그램으로 시각화한다.

## 절차

### 1. 파일 수집 및 import 분석

- `src/` 아래 파일을 Glob으로 모아 세 종류로 분류한다.
  - 컴포넌트: `src/components/**/*.tsx` (+ `src/App.tsx`, `src/main.tsx`)
  - 훅: `use`로 시작하는 파일 (예: `useMemos.ts`)
  - 유틸: 그 외 `.ts` 파일 (`*.test.*`, `src/test/`, `*.d.ts` 제외)
- 각 파일에서 `import ... from '<상대경로>'` 구문을 Grep으로 찾는다. 상대 경로(`./`, `../`)만 대상이며 `react` 같은 외부 패키지는 제외한다.
- 경로를 실제 파일로 해석해 `A --> B` (A가 B를 import) 엣지 목록을 만든다. 확장자가 없으면 `.ts`, `.tsx`, `/index.*` 순으로 확인한다.
- 테스트 파일과 CSS import는 그래프에서 제외한다.

### 2. docs/architecture/index.html 생성

- `docs/architecture/` 폴더가 없으면 만들고, 아래 형태로 `index.html`을 쓴다. 이미 있으면 덮어쓴다.
- 다이어그램은 `flowchart TD`를 사용한다.
- 노드 ID는 파일명(확장자 제외)에서 영숫자만 남기고, 라벨은 `src` 기준 경로로 둔다.
- 종류별로 `subgraph`(컴포넌트 / 훅 / 유틸)로 묶는다. 비어 있는 그룹은 만들지 않는다.
- 페이지 제목과 설명은 한국어로 쓴다.

```html
<!doctype html>
<html lang="ko">
<head>
  <meta charset="utf-8" />
  <title>아키텍처 import 관계도</title>
</head>
<body>
  <h1>아키텍처 import 관계도</h1>
  <pre class="mermaid">
flowchart TD
  subgraph 컴포넌트
    App["App.tsx"]
    MemoItem["components/MemoItem.tsx"]
  end
  App --> MemoItem
  </pre>
  <script type="module">
    import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.esm.min.mjs';
    mermaid.initialize({ startOnLoad: true });
  </script>
</body>
</html>
```

### 3. 브라우저로 열기

Windows 기준:

```powershell
Start-Process docs/architecture/index.html
```

macOS는 `open`, Linux는 `xdg-open`을 쓴다. 연 뒤 수집한 파일 수와 엣지 수를 한 줄로 보고한다.

## 주의

- 다이어그램에는 실제 import만 그린다. 추측으로 엣지를 추가하지 않는다.
- Mermaid는 CDN에서 불러오므로 오프라인에서는 렌더링되지 않는다.
