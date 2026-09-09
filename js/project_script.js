let allRepos = [];
let selectedLanguage = 'All';
const username = 'bs7703';

const projectContainer = document.querySelector('#project-container');
const languageContainer = document.querySelector('#language-container');

const renderStatus = (type, message) => {
  const retryButton = type === 'error'
    ? '<button id="reload" class="btn btn-secondary" type="button">다시 시도</button>'
    : '';

  const spinner = type === 'loading' ? '<span class="spinner" aria-hidden="true"></span>' : '';

  projectContainer.innerHTML = `
    <div class="status-panel ${type}-state">
      ${spinner}
      <p>${message}</p>
      ${retryButton}
    </div>
  `;

  document.querySelector('#reload')?.addEventListener('click', fetchRepos);
};

async function fetchRepos(event) {
  event?.preventDefault?.();
  renderStatus('loading', '프로젝트를 불러오는 중입니다.');

  try {
    const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);

    if (!response.ok) {
      const rateLimited = response.status === 403;
      throw new Error(rateLimited ? 'GitHub API 호출 제한에 도달했습니다.' : `GitHub API 오류 (${response.status})`);
    }

    const data = await response.json();
    if (!Array.isArray(data)) throw new Error('예상하지 못한 응답 형식입니다.');

    allRepos = data;
    selectedLanguage = 'All';
    createFilterButtons(allRepos);
    renderProjects(allRepos);
  } catch (error) {
    console.error(error);
    renderStatus('error', error.message || '프로젝트를 불러올 수 없습니다.');
  }
}

function createFilterButtons(repos) {
  const languages = repos
    .map(({ language }) => language)
    .filter(Boolean)
    .filter((language, index, self) => self.indexOf(language) === index)
    .sort();

  const buttons = ['All', ...languages]
    .map((language) => `
      <button class="filter-btn ${language === selectedLanguage ? 'active' : ''}" data-lang="${language}" type="button">
        ${language}
      </button>
    `)
    .join('');

  languageContainer.innerHTML = buttons;
}

function filterProjects(language) {
  selectedLanguage = language;
  const filtered = language === 'All'
    ? allRepos
    : allRepos.filter(({ language: repoLanguage }) => repoLanguage === language);

  createFilterButtons(allRepos);
  renderProjects(filtered);
}

function renderProjects(reposToRender) {
  if (reposToRender.length === 0) {
    renderStatus('empty', '표시할 프로젝트가 없습니다.');
    return;
  }

  projectContainer.innerHTML = reposToRender.map(({ name, description, language, stargazers_count, html_url }) => `
    <article class="project-card">
      <h3>${name}</h3>
      <p>${description || '설명이 없습니다.'}</p>
      <div class="tags">
        <span class="tag">${language || 'No Language'}</span>
        <span class="stars">⭐ ${stargazers_count}</span>
      </div>
      <a href="${html_url}" target="_blank" rel="noopener noreferrer" class="view-link">View Project</a>
    </article>
  `).join('');
}

languageContainer.addEventListener('click', (event) => {
  const button = event.target.closest('.filter-btn');
  if (!button) return;
  filterProjects(button.dataset.lang);
});

document.addEventListener('DOMContentLoaded', fetchRepos);
