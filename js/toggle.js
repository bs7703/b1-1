const themeToggle = document.querySelector('#theme-toggle');
const toggleBtn = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-links');
const navbar = document.querySelector('.navbar');
const scrollTopBtn = document.querySelector('#scrollTopBtn');

/**
 * 1. 테마 결정 로직
 */
const getInitialTheme = () => {
    // 사용자가 이전에 직접 설정한 값이 있는지 확인
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) return savedTheme;

    // 시스템 설정이 다크모드인지 확인
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return prefersDark ? 'dark' : 'light';
};

// 초기 테마 적용
const initialTheme = getInitialTheme();
document.documentElement.setAttribute('data-theme', initialTheme);
themeToggle.textContent = initialTheme === 'dark' ? '☀️' : '🌙';

/**
 * 2. 다크모드 토글 이벤트
 */
themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme); // 사용자의 선택을 저장
    themeToggle.textContent = newTheme === 'dark' ? '☀️' : '🌙';
});

/**
 * 3. 시스템 설정 변경 감지 (실시간 반영)
 * 사용자가 사이트 이용 중에 OS 설정을 바꾸면 즉시 반영됩니다.
 */
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    // 사용자가 수동으로 설정한 적이 없을 때만 시스템 설정을 따라감
    if (!localStorage.getItem('theme')) {
        const newTheme = e.matches ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', newTheme);
        themeToggle.textContent = newTheme === 'dark' ? '☀️' : '🌙';
    }
});

/**
 * 4. 기타 네비게이션 및 스크롤 로직 (기존 유지)
 */
toggleBtn.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

window.addEventListener('scroll', () => {
    // 네비게이션 바 스타일 변경        
    if (window.scrollY > 60) {
        navbar.classList.add("toggled");
    } else {
        navbar.classList.remove("toggled");
    }

    // Top 버튼 표시
    if (window.scrollY > 200) {
        scrollTopBtn.style.display = 'block';
    } else {
        scrollTopBtn.style.display = 'none';
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});
