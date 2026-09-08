const contactForm = document.querySelector('#contactForm');
const statusMsg = document.querySelector('#status');

// 유효성 검사 함수
const validateForm = (name, email, message) => {
  // 1. 이름 검사: 3자 이상
  if (name.length < 3) {
    alert("이름은 최소 3자 이상 입력해주세요.");
    return false;
  }

  // 2. 이메일 검사: 정규표현식 이용
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert("올바른 이메일 형식이 아닙니다.");
    return false;
  }

  // 3. 메시지 검사: 10자 이상
  if (message.length < 10) {
    alert("메시지는 최소 10자 이상 입력해주세요.");
    return false;
  }

  return true; // 모든 검사 통과
};
// 폼 제출 이벤트 리스너
contactForm.addEventListener('submit', async (event) => {
  event.preventDefault(); // 기본 제출 동작 방지

  // 입력값 가져오기
  const nameValue = document.querySelector('#name').value.trim();
  const emailValue = document.querySelector('#email').value.trim();
  const messageValue = document.querySelector('#message').value.trim();

  // 유효성 검사 실행
  if (validateForm(nameValue, emailValue, messageValue)) {
    
    // 검사 통과 시 Formspree로 전송
    const formData = new FormData(event.target);

    try {
      statusMsg.textContent = "전송 중...";
      
      const response = await fetch(event.target.action, {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        statusMsg.style.color = "blue";
        statusMsg.textContent = "메일이 성공적으로 전송되었습니다!";
        contactForm.reset(); // 폼 초기화
      } else {
        throw new Error("전송 실패");
      }
    } catch (error) {
      statusMsg.style.color = "red";
      statusMsg.textContent = "오류가 발생했습니다. 다시 시도해주세요.";
    }
  }
});