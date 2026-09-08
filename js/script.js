const hamburger = document.querySelector('.hamburger');
const themeToggle = document.querySelector('#theme-toggle');
const navLinks = document.querySelector('.nav-links');

if (localStorage.getItem('dark-mode') == 'set') {document.body.classList.toggle('dark-mode')}
    if (localStorage.getItem('dark-mode') == 'set') {
        themeToggle.textContent = '☀️'; // 다크 모드일 때 해 아이콘
    } else {
        themeToggle.textContent = '🌙'; // 라이트 모드일 때 달 아이콘
    }
// 2. 이벤트 리스너 등록
themeToggle.addEventListener('click', () => {
    // 3. body 태그에 'dark-mode' 클래스를 토글(없으면 넣고, 있으면 뺌)
    document.body.classList.toggle('dark-mode');
    if (localStorage.getItem('dark-mode') == 'set'){localStorage.setItem('dark-mode', 'unset')}
    else {localStorage.setItem('dark-mode', 'set')}
    // 4. (선택 사항) 버튼 아이콘 변경
    if (localStorage.getItem('dark-mode') == 'set') {
        themeToggle.textContent = '☀️'; // 다크 모드일 때 해 아이콘
    } else {
        themeToggle.textContent = '🌙'; // 라이트 모드일 때 달 아이콘
    }
});


const observerOptions = {
  threshold: 0.5 // 요소가 10% 정도 보였을 때 실행
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    // 요소가 화면에 들어왔다면
    if (entry.isIntersecting) {
      entry.target.classList.add('active'); // 'active' 클래스 추가
    }
  });
}, observerOptions);

// 모든 reveal 클래스 요소를 감시 시작
const revealElements = document.querySelectorAll('.reveal');
revealElements.forEach(el => observer.observe(el));
// 페이지 로드 시 실행

