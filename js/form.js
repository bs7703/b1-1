const contactForm = document.querySelector('#contactForm');
const statusMsg = document.querySelector('#form-message');
const submitButton = document.querySelector('#submit_form');

const fields = {
  name: {
    input: document.querySelector('#name'),
    error: document.querySelector('#name-error'),
    validate: (value) => value.length >= 3 || '이름은 3자 이상 입력해주세요.'
  },
  email: {
    input: document.querySelector('#email'),
    error: document.querySelector('#email-error'),
    validate: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || '올바른 이메일 형식이 아닙니다.'
  },
  message: {
    input: document.querySelector('#message'),
    error: document.querySelector('#message-error'),
    validate: (value) => value.length >= 10 || '메시지는 10자 이상 입력해주세요.'
  }
};

const setFieldState = ({ input, error }, message = '') => {
  const hasError = Boolean(message);
  input.setAttribute('aria-invalid', String(hasError));
  error.textContent = message;
};

const validateField = (field) => {
  const value = field.input.value.trim();
  const result = field.validate(value);
  const message = result === true ? '' : result;
  setFieldState(field, message);
  return !message;
};

Object.values(fields).forEach((field) => {
  field.input.addEventListener('input', () => validateField(field));
});

contactForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  statusMsg.textContent = '';

  const isValid = Object.values(fields).map(validateField).every(Boolean);
  if (!isValid) {
    statusMsg.textContent = '입력 내용을 다시 확인해주세요.';
    statusMsg.style.color = '#c53b36';
    return;
  }

  const formData = new FormData(contactForm);
  submitButton.disabled = true;
  submitButton.textContent = '전송 중...';
  statusMsg.textContent = '메시지를 전송하고 있습니다.';
  statusMsg.style.color = '';

  try {
    const response = await fetch('https://formspree.io/f/xdeopzkp', {
      method: 'POST',
      body: formData,
      headers: { Accept: 'application/json' }
    });

    if (!response.ok) throw new Error('전송 실패');

    statusMsg.textContent = '메일이 성공적으로 전송되었습니다.';
    statusMsg.style.color = '#2e8b57';
    contactForm.reset();
    Object.values(fields).forEach((field) => setFieldState(field));
  } catch (error) {
    console.error(error);
    statusMsg.textContent = '오류가 발생했습니다. 잠시 후 다시 시도해주세요.';
    statusMsg.style.color = '#c53b36';
  } finally {
    submitButton.disabled = false;
    submitButton.textContent = '보내기';
  }
});
