# KSW AI Developer Portfolio

> **LEARN · BUILD · IMPROVE**  
> 순수 HTML, CSS, JavaScript로 직접 구현한 반응형 포트폴리오 웹사이트입니다.  
> UI 자체보다 **사용자 이벤트 → 상태 변경 → DOM 업데이트 → 화면 변화**의 흐름을 이해하는 것을 핵심 목표로 제작했습니다.

## 프로젝트 소개

AI 개발자를 목표로 학습하면서 만든 웹 기초 프로젝트입니다. React, Vue, jQuery, Bootstrap, Tailwind CSS 같은 프레임워크나 UI 라이브러리 없이 브라우저의 기본 기술만 사용했습니다.

HTML의 시맨틱 구조, CSS의 반응형 레이아웃과 테마, JavaScript의 DOM 조작과 이벤트 처리부터 `fetch`/`async-await` 기반 비동기 통신까지 하나의 웹사이트 안에서 연결해 보는 것이 목적입니다.

현재 Projects 영역은 **GitHub REST API**에서 `bs7703` 계정의 저장소를 가져와 동적으로 렌더링하며, 언어별 필터링과 로딩/에러/빈 상태를 처리합니다. Contact 폼은 입력값을 직접 검증하고 Formspree를 통해 메시지를 전송하도록 구성했습니다.

## 주요 기능

| 기능 | 구현 내용 |
| --- | --- |
| 반응형 UI | 모바일 우선 설계, 768px / 1024px 기준 레이아웃 확장 |
| Navigation | 고정 Navbar, 모바일 햄버거 메뉴, 섹션 앵커 이동 |
| Dark Mode | `data-theme` + CSS 변수 기반 테마 전환 |
| 상태 유지 | `localStorage`에 사용자가 선택한 테마 저장 |
| 시스템 테마 | `prefers-color-scheme` 감지 및 변경 대응 |
| GitHub API | `fetch` + `async/await`로 저장소 데이터 로드 |
| API 상태 UI | Loading / Success / Error / Empty 상태 렌더링 |
| 프로젝트 필터 | GitHub 저장소를 사용 언어별로 필터링 |
| Form Validation | 이름, 이메일, 메시지 검증 및 필드별 오류 표시 |
| Form 전송 | Formspree API를 이용한 실제 비동기 전송 |
| Scroll UI | 스크롤 Navbar 변화, Scroll-to-top 버튼 |
| Animation | Intersection Observer reveal 및 Hero 타이핑 효과 |
| 접근성 | `aria-label`, `aria-live`, `aria-expanded` 등 적용 |

## 기술 스택

![HTML5](https://img.shields.io/badge/HTML5-Semantic_Markup-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-Responsive_Design-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?logo=javascript&logoColor=black)
![GitHub API](https://img.shields.io/badge/GitHub-REST_API-181717?logo=github&logoColor=white)

- **HTML5** — 시맨틱 마크업, Form, 접근성 속성
- **CSS3** — CSS Variables, Flexbox, Grid, Media Query, Transition, Animation
- **JavaScript ES6+** — DOM, Event, Array Method, Template Literal, Destructuring
- **Web API** — Fetch API, Local Storage, Intersection Observer, MatchMedia
- **External API** — GitHub REST API, Formspree

## 프로젝트 구조

```text
portfolio_improved/
├── index.html
├── README.md
├── css/
│   ├── variable.css      # 색상, 테마, 공통 변수
│   ├── layout.css        # Navbar, Grid, 반응형 레이아웃
│   ├── components.css    # 버튼, 카드, 폼 등의 UI 컴포넌트
│   └── animation.css     # 타이핑, reveal 등 애니메이션
├── js/
│   ├── toggle.js         # 테마, 모바일 메뉴, 스크롤 UI
│   ├── project_script.js # GitHub API, 상태/필터/프로젝트 렌더링
│   ├── form.js           # 폼 검증 및 비동기 전송
│   └── reveal.js         # Intersection Observer
└── images/
    └── logo.png
```

CSS와 JavaScript를 기능별 파일로 나누어 한 파일이 지나치게 많은 책임을 가지지 않도록 구성했습니다.

## 핵심 학습 1 — 이벤트 → 상태 → 렌더링

이번 프로젝트에서 가장 중요하게 학습한 부분입니다.

```text
사용자 이벤트
    ↓
JavaScript Event Listener
    ↓
상태 변경
    ↓
DOM / Attribute / Class 변경
    ↓
브라우저가 새로운 UI 렌더링
```

### Dark Mode

```text
테마 버튼 click
    ↓
현재 data-theme 확인
    ↓
light ↔ dark 변경
    ↓
localStorage 저장
    ↓
CSS Variable 변경
    ↓
전체 UI 변경
```

JavaScript에서 모든 요소의 색상을 직접 변경하지 않고, `<html>`의 `data-theme` 상태만 변경하고 CSS 변수가 실제 스타일을 담당하도록 역할을 분리했습니다.

### 프로젝트 필터

```text
언어 버튼 click
    ↓
data-lang 읽기
    ↓
selectedLanguage 변경
    ↓
Array.filter()
    ↓
renderProjects()
    ↓
프로젝트 Grid 갱신
```

이 과정을 통해 **데이터 자체와 화면에 표현되는 결과를 분리**하고, 상태가 달라지면 다시 렌더링한다는 개념을 학습했습니다.

## 핵심 학습 2 — GitHub API와 비동기 처리

GitHub API 호출은 다음 흐름으로 구성했습니다.

```javascript
const response = await fetch(url);

if (!response.ok) {
  throw new Error(...);
}

const data = await response.json();
```

단순히 데이터를 받아오는 것에서 끝내지 않고 UI를 상태별로 나누었습니다.

```text
fetchRepos()
    │
    ├── 요청 중 ──→ Loading UI
    │
    ├── 성공 ─────→ Repository Card UI
    │
    ├── 데이터 없음 → Empty UI
    │
    └── 실패 ─────→ Error + Retry UI
```

여기서 `fetch()`는 HTTP 403/404/500 자체만으로 자동으로 `catch`에 들어가는 것이 아니므로 `response.ok`를 검사해야 한다는 점도 학습했습니다. GitHub API의 403 응답 역시 오류 상태로 처리합니다.

## 핵심 학습 3 — 배열을 UI로 변환하기

GitHub API가 반환한 저장소 배열을 `map`, `filter` 등의 배열 메서드로 가공했습니다.

### `map()`

Repository 객체 배열을 프로젝트 카드 HTML로 변환합니다.

```text
Repository[]
    ↓ map()
HTML Card[]
    ↓ join('')
HTML 문자열
    ↓ innerHTML
화면 렌더링
```

### `filter()`

선택한 프로그래밍 언어와 일치하는 저장소만 새로운 배열로 만듭니다.

### 구조 분해 할당

```javascript
({ name, description, language, stargazers_count, html_url })
```

객체 전체를 반복해서 접근하지 않고 필요한 속성을 명시적으로 추출하는 ES6+ 문법을 적용했습니다.

## 핵심 학습 4 — 반응형 CSS

모바일 화면을 기본으로 작성하고 화면 크기가 커질수록 레이아웃을 확장하는 방식을 사용했습니다.

```text
Mobile First
    │
    ├── 기본 스타일
    │
    ├── ≥ 768px  : Tablet
    │
    └── ≥ 1024px : Desktop
```

Navbar에는 **Flexbox**, Projects에는 **CSS Grid**를 사용했습니다. 프로젝트 Grid는 `auto-fit`과 `minmax()`를 이용해 화면 너비에 따라 카드 개수가 자연스럽게 변경되도록 구성했습니다.

모바일에서는 메뉴를 햄버거 버튼으로 전환하고, Navbar 자체는 화면 상단에 고정되어 스크롤 중에도 주요 메뉴에 접근할 수 있도록 했습니다.

## 핵심 학습 5 — DOM과 브라우저 API

이번 프로젝트를 통해 다음 브라우저 기능을 실제 UI에 연결했습니다.

- `querySelector()` / `querySelectorAll()`을 이용한 DOM 탐색
- `addEventListener()`를 이용한 이벤트 등록
- `classList`를 이용한 UI 상태 변경
- `textContent` / `innerHTML`을 이용한 화면 업데이트
- `localStorage`를 이용한 사용자 설정 저장
- `window.matchMedia()`를 이용한 시스템 다크 모드 감지
- `IntersectionObserver`를 이용한 스크롤 reveal 효과
- `window.scrollTo()`를 이용한 부드러운 페이지 이동
- `FormData`를 이용한 Form 데이터 구성
- `fetch()`와 `async/await`를 이용한 비동기 HTTP 통신

## 핵심 학습 6 — Form Validation

브라우저 기본 제출 동작에만 의존하지 않고 JavaScript에서 입력 상태를 검사하고 각 필드 근처에 오류를 렌더링했습니다.

```text
submit
  ↓
preventDefault()
  ↓
입력값 검증
  ├── 실패 → 해당 Field Error 표시
  └── 성공
       ↓
     FormData
       ↓
     fetch POST
       ↓
     성공 / 실패 상태 표시
```

이를 통해 **입력 → 검증 상태 → UI 변경 → 비동기 요청 → 결과 UI**라는 하나의 완전한 사용자 이벤트 흐름을 구현했습니다.

## 이전 학습과의 연결

이번 웹 프로젝트 이전에는 Python을 중심으로 자료구조와 프로그램 구조를 직접 구현했습니다.

- BST / Red-Black Tree / Heap
- Graph / Union-Find
- Dijkstra / Kruskal 등 그래프 알고리즘
- Generic, Comparator, ABC / Protocol 기반 추상화
- 파일 I/O와 고정 길이 레코드
- Generator 기반 데이터 스트리밍
- Query / Matcher 구조
- CLI Parser와 Validator

이전 학습의 중심 질문이 **“데이터를 어떤 구조로 저장하고 어떻게 처리할 것인가?”**였다면, 이번 프로젝트에서는 이를 웹으로 확장하여 **“사용자의 행동과 외부 데이터가 변할 때 화면을 어떻게 다시 표현할 것인가?”**를 학습했습니다.

```text
자료구조 / 알고리즘
        ↓
프로그램 구조와 책임 분리
        ↓
파일 I/O 기반 Application
        ↓
DOM + Event 기반 Web Application   ← 현재
        ↓
State + Component 기반 React       ← 다음 학습 목표
```

## 구현하면서 개선한 점

초기 구현 이후 기능만 추가하는 대신 코드와 UI를 다시 검토하면서 다음 부분을 개선했습니다.

- 모바일 Navbar와 햄버거 메뉴의 위치 관계 명확화
- 모바일/태블릿/데스크톱 레이아웃 일관성 개선
- CSS Variable을 이용한 Light/Dark 테마 구조화
- GitHub API HTTP 오류 검사 추가
- API Loading/Error/Empty 상태 분리
- Error 상태에 Retry 기능 추가
- 프로젝트 언어 필터 상태 명시화
- Form의 `alert()` 기반 오류 표시를 필드별 오류 UI로 변경
- 제출 중 상태 표시 및 중복 제출 방지
- Intersection Observer를 실제 Section에 적용
- 접근성을 위한 ARIA 속성 보완
- 외부 링크에 `noopener noreferrer` 적용

## 실행 방법

별도의 빌드 과정이나 패키지 설치가 필요하지 않습니다.

```bash
git clone <YOUR_REPOSITORY_URL>
cd <YOUR_REPOSITORY_NAME>
```

VS Code에서 프로젝트를 연 뒤 **Live Server**로 `index.html`을 실행합니다.

> GitHub API를 인증 없이 호출하므로 짧은 시간에 지나치게 많은 새로고침을 하면 API 호출 제한이 발생할 수 있습니다. 이 경우 프로젝트 영역에서 오류 상태가 표시됩니다.

## 배포

GitHub Pages 배포 후 아래 항목을 실제 주소로 변경할 예정입니다.

- **Live Demo:** `TODO: GitHub Pages URL`
- **Repository:** `TODO: Repository URL`

## Screenshot

최종 배포 전 다음 스크린샷을 저장소에 추가할 예정입니다.

- Desktop
- Mobile
- Dark Mode

```text
screenshots/
├── desktop.png
├── mobile.png
└── dark-mode.png
```

## 현재까지의 학습 체크

- [x] 시맨틱 HTML 구조 설계
- [x] 외부 CSS / JavaScript 파일 분리
- [x] Flexbox와 Grid의 용도 구분
- [x] Mobile First 반응형 레이아웃
- [x] DOM 선택과 변경
- [x] `addEventListener` 기반 이벤트 처리
- [x] 이벤트 → 상태 → 렌더링 흐름 구현
- [x] ES6+ `map` / `filter` / 구조 분해 / Template Literal 활용
- [x] `fetch` / `async-await` 비동기 처리
- [x] HTTP 성공/실패 상태 처리
- [x] GitHub API 데이터 동적 렌더링
- [x] Loading / Error / Empty UI 처리
- [x] `localStorage` 상태 유지
- [x] Intersection Observer 활용
- [x] JavaScript Form Validation
- [x] 실제 Form 비동기 전송
- [x] GitHub Pages 최종 배포
- [x] Desktop / Mobile / Dark Mode 스크린샷 추가
- [x] 최종 배포 URL을 README에 반영

## 다음 학습 목표

이 프로젝트에서 직접 구현한 구조를 기반으로 다음 단계에서는 React의 추상화와 비교할 예정입니다.

```text
Vanilla JavaScript          React
─────────────────────────────────────
DOM 직접 선택               Component
Event Listener              Event Handler
직접 상태 변수 관리          State
renderProjects()            Render
innerHTML 변경              JSX
상태 변경 후 직접 렌더 호출   State 변경 → 재렌더링
```

React를 단순히 새로운 문법으로 배우기보다, 이번 프로젝트에서 직접 경험한 DOM 조작의 어떤 문제를 React가 해결하는지 비교하며 학습하는 것이 다음 목표입니다.

---

### Project Goal

> **동작하는 코드를 만드는 것에서 끝내지 않고, 이벤트가 어디에서 발생하고 상태가 어떻게 변하며 그 상태가 어떻게 화면으로 표현되는지를 설명할 수 있는 개발자가 되는 것.**

