const toggleBtn = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-links');
const scrollTopBtn = document.querySelector('#scrollTopBtn');

toggleBtn.addEventListener('click', () => {
  // active 클래스가 있으면 제거, 없으면 추가
  navMenu.classList.toggle('active');
});
// 1. 사용자가 스크롤을 할 때마다 실행
window.addEventListener('scroll', () => {
  // 200px 이상 내려오면 버튼 보이기, 아니면 숨기기
  if (window.scrollY > 200) {
    scrollTopBtn.style.display = 'block';
  } else {
    scrollTopBtn.style.display = 'none';
  }
});

// 2. 버튼 클릭 시 최상단으로 이동
scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth' // 부드럽게 스크롤링
  });
});