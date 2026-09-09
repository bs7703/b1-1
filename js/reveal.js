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

