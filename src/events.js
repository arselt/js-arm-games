import { fetchGames } from "./api.js";
import { appendGames, renderGames } from "./ui.js";

let currentPage = 1;
let isLoading = false;
let currentCategory = null;
let currentSearchQuery = null;

export function setupInfiniteScroll() {
    const gameListContainer = document.querySelector(".carousel__section--popular .carousel__container");

    function updateView() {
        const hash = window.location.hash;
        const categoryMatch = hash.match(/#category=([^&]+)/);
        const searchMatch = hash.match(/#search=([^&]+)/);
        
        const newCategory = categoryMatch ? decodeURIComponent(categoryMatch[1]) : null;
        const newSearchQuery = searchMatch ? decodeURIComponent(searchMatch[1]) : null;

        if (newCategory !== currentCategory || newSearchQuery !== currentSearchQuery) {

            currentCategory = newCategory;
            currentSearchQuery = newSearchQuery;
            currentPage = 1;
            gameListContainer.innerHTML = "";  

            loadMoreGames();
        }
    }

    async function loadMoreGames() {
        if (isLoading) return;
        isLoading = true;

        try {
            const games = await fetchGames(currentCategory, currentSearchQuery, currentPage);
            if (currentPage === 1) {
                renderGames(games, currentCategory || `Resultados para: ${currentSearchQuery}`);
            } else {
                appendGames(games);
            }
        } catch (error) {
            console.error("❌ Error cargando juegos:", error);
        }

        isLoading = false;
    }

    window.addEventListener("hashchange", updateView);

    gameListContainer.addEventListener("scroll", async () => {
        if (isScrollComplete() && !isLoading) {
            currentPage++;
            await loadMoreGames();
        }
    });

    updateView();
}


function isScrollComplete() {
    const gameListContainer = document.querySelector(".carousel__section--popular .carousel__container");
    const { scrollLeft, clientWidth, scrollWidth } = gameListContainer;

    return (scrollLeft + clientWidth) >= scrollWidth;
}

export function setupSearchEvents() {
    const searchInput = document.querySelector("#searchForm input");
    const searchButton = document.querySelector("#searchButton");

    searchButton.addEventListener("click", () => {
        location.hash = "#search=" + searchInput.value;
    });
}

export function setupModalEvents() {
    const gameModal = document.querySelector(".game-modal");
    const closeButton = document.querySelector(".game-modal__close-button");

    closeButton.onclick = () => {
        let previousHash = window.location.hash;

        if (!gameModal.open) {
            gameModal.showModal();
        }

        gameModal.close();
        if (previousHash && previousHash !== window.location.hash) {
            window.location.hash = previousHash;
        } else if (document.referrer && document.referrer.includes(window.location.host)) {
            window.history.back();
        } else {
            window.location.href = "/";
        }
    };
}
