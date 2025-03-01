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
