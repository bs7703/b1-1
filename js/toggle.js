const themeToggle = document.querySelector('#theme-toggle');
const toggleBtn = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-links');
const navbar = document.querySelector('.navbar');
const scrollTopBtn = document.querySelector('#scrollTopBtn');
const navLinks = document.querySelectorAll('.nav-links a');

const getInitialTheme = () => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) return savedTheme;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

const applyTheme = (theme) => {
  document.documentElement.setAttribute('data-theme', theme);
  themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
  themeToggle.setAttribute('aria-label', theme === 'dark' ? '라이트 모드 전환' : '다크 모드 전환');
};

applyTheme(getInitialTheme());

themeToggle.addEventListener('click', () => {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  localStorage.setItem('theme', newTheme);
  applyTheme(newTheme);
});

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (event) => {
  if (!localStorage.getItem('theme')) {
    applyTheme(event.matches ? 'dark' : 'light');
  }
});

const closeMobileMenu = () => {
  navMenu.classList.remove('active');
  toggleBtn.setAttribute('aria-expanded', 'false');
  toggleBtn.setAttribute('aria-label', '메뉴 열기');
};

toggleBtn.addEventListener('click', () => {
  const isOpen = navMenu.classList.toggle('active');
  toggleBtn.setAttribute('aria-expanded', String(isOpen));
  toggleBtn.setAttribute('aria-label', isOpen ? '메뉴 닫기' : '메뉴 열기');
});

navLinks.forEach((link) => link.addEventListener('click', closeMobileMenu));

document.addEventListener('click', (event) => {
  if (window.innerWidth >= 768) return;
  if (!navbar.contains(event.target)) closeMobileMenu();
});

window.addEventListener('resize', () => {
  if (window.innerWidth >= 768) closeMobileMenu();
});

const handleScroll = () => {
  navbar.classList.toggle('toggled', window.scrollY > 60);
  scrollTopBtn.classList.toggle('visible', window.scrollY > 300);
};

window.addEventListener('scroll', handleScroll, { passive: true });
handleScroll();

scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
