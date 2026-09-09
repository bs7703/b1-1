// Projects 영역의 현재 상태를 한 곳에서 관리합니다.
const projectState = {
    allRepos: [],
    selectedLanguage: "All"
};

const username = "bs7703";

async function fetchRepos(event) {
    if (event?.preventDefault) {
        event.preventDefault();
    }

    try {
        const response = await fetch(
            `https://api.github.com/users/${username}/repos`
        );

        if (!response.ok) {
            throw new Error(`GitHub API 요청 실패: ${response.status}`);
        }

        const repos = await response.json();

        // API 결과를 상태에 저장합니다.
        projectState.allRepos = Array.isArray(repos) ? repos : [];
        projectState.selectedLanguage = "All";

        createFilterButtons(projectState.allRepos);
        renderFilteredProjects();
    } catch (error) {
        console.error(error);

        const container = document.querySelector("#project-container");
        container.innerHTML = `
            <p>프로젝트를 불러오는 중 오류가 발생했습니다.</p>
            <button id="reload" type="button">다시 시도</button>
        `;

        document
            .querySelector("#reload")
            ?.addEventListener("click", fetchRepos);
    }
}

function createFilterButtons(repos) {
    const languages = repos
        .map(({ language }) => language)
        .filter(Boolean)
        .filter((language, index, array) => array.indexOf(language) === index);

    const buttonContainer = document.querySelector("#language-container");

    const buttons = ["All", ...languages]
        .map(language => {
            const activeClass =
                language === projectState.selectedLanguage ? " active" : "";

            return `
                <button
                    class="filter-btn${activeClass}"
                    data-lang="${language}"
                    type="button"
                >${language}</button>
            `;
        })
        .join("");

    buttonContainer.innerHTML = buttons;
}

function getFilteredProjects() {
    const { allRepos, selectedLanguage } = projectState;

    return selectedLanguage === "All"
        ? allRepos
        : allRepos.filter(
            ({ language }) => language === selectedLanguage
        );
}

function renderFilteredProjects() {
    const filteredRepos = getFilteredProjects();

    renderProjects(filteredRepos);
    createFilterButtons(projectState.allRepos);
}

function renderProjects(reposToRender) {
    const container = document.querySelector("#project-container");

    if (reposToRender.length === 0) {
        container.innerHTML = `<p>표시할 프로젝트가 없습니다.</p>`;
        return;
    }

    const repoHTML = reposToRender
        .map(repo => {
            const {
                name,
                description,
                language,
                stargazers_count: stars,
                html_url: url
            } = repo;

            return `
                <article class="project-card">
                    <h3>${name}</h3>
                    <p>${description || "설명이 없습니다."}</p>
                    <div class="tags">
                        <span class="tag">${language || "No Language"}</span>
                        <span class="stars">⭐ ${stars}</span>
                    </div>
                    <a
                        href="${url}"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="view-link"
                    >View Project</a>
                </article>
            `;
        })
        .join("");

    container.innerHTML = repoHTML;
}

document
    .querySelector("#language-container")
    .addEventListener("click", event => {
        const button = event.target.closest(".filter-btn");

        if (!button) {
            return;
        }

        // Event -> State 변경 -> Render
        projectState.selectedLanguage = button.dataset.lang;
        renderFilteredProjects();
    });

document.addEventListener("DOMContentLoaded", fetchRepos);
