let allRepos = [];
// 1. 내 깃허브 사용자명 설정
const username = 'bs7703'; // 본인 아이디로 바꾸세요!
async function fetchRepos() 
{
    try
    {
    const response = await fetch(`https://api.github.com/users/${username}/repos`);
    allRepos = await response.json(); // 데이터를 변수에 저장
    }
    catch (error) {
    console.error(error);
    container.innerHTML = `<p>프로젝트를 불러오는 중 오류가 발생했습니다.</p><button id="reload">reload</button>`;
    const reload = document.querySelector("#reload")=
    reload.addEventListener('click', ()=>
    {
        fetchRepos();
    }
    )
    }
    renderProjects(allRepos); // 처음에 전체 출력
    // 2. 데이터에서 언어 목록만 추출해서 버튼 만들기 (중요!)
    createFilterButtons(allRepos);
}
function createFilterButtons(repos) {
  // 1. 모든 repo에서 language만 추출 (null 제외)
  const languages = repos
    .map(repo => repo.language)
    .filter((lang, index, self) => lang !== null && self.indexOf(lang) === index);

  // 2. 'All' 버튼을 포함한 전체 버튼 목록 생성
  const buttonContainer = document.querySelector("#language-container");
  
  // 초기화 (중복 생성 방지)
  buttonContainer.innerHTML = `<button class="filter-btn" data-lang="All">All</button>`;

  // 3. 추출된 언어들로 버튼 추가
  languages.forEach(lang => {
    const btn = document.createElement("button");
    btn.className = "filter-btn";
    btn.textContent = lang;
    btn.setAttribute("data-lang", lang);
    buttonContainer.appendChild(btn);
  });
}

function filterProjects(language) {
    // 1. Array.filter()를 사용하여 조건에 맞는 데이터만 추출
    const filtered = (language === "All") 
        ? allRepos 
        : allRepos.filter(repo => repo.language === language);

    // 2. 필터링된 결과만 화면에 다시 그리기
    renderProjects(filtered);
}

function renderProjects(reposToRender) {
    const repoHTML = reposToRender.map(repo => {
        return `
        <div class="project-card">
        <h3>${repo.name}</h3>
        <p>${repo.description || '설명이 없습니다.'}</p>
        <div class="tags">
          <span class="tag">${repo.language || 'No Language'}</span>
          <span class="stars">⭐ ${repo.stargazers_count}</span>
        </div>
        <a href="${repo.html_url}" target="_blank" class="view-link">View Project</a>
      </div>
        `;
    }).join('');

    document.querySelector("#project-container").innerHTML = repoHTML;
}

document.querySelector("#language-container").addEventListener("click", (e) => {
    if (e.target.classList.contains("filter-btn")) {
        const selectedLang = e.target.getAttribute("data-lang");
        filterProjects(selectedLang); // 필터 함수 호출!
    }
});

fetchRepos();