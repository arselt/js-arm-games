export function renderGames(games, title) {
    const gameListContainer = document.querySelector(".carousel__section--popular .carousel__container");
    const featuredTitle = document.querySelector(".carousel__section--popular h2.title");

    featuredTitle.textContent = title;

    gameListContainer.innerHTML = "";

    games.forEach(game => {
        const gameContainer = document.createElement("article");
        gameContainer.setAttribute("id", game.slug);
        gameContainer.classList.add("item-container");

        gameContainer.innerHTML = `
            <div class="item__thumbnail">
                <img src="${game.background_image}" alt="${game.name} thumbnail" loading="lazy">
            </div>
            <h3 class="item__title title">${game.name}</h3>
            <a href="#game=${game.slug}" class="item__link">View Game</a>
        `;

        gameListContainer.appendChild(gameContainer);
    });
}

export function appendGames(games) {
    const gameListContainer = document.querySelector(".carousel__section--popular .carousel__container");

    games.forEach(game => {
        const gameContainer = document.createElement("article");
        gameContainer.setAttribute("id", game.slug);
        gameContainer.classList.add("item-container");

        gameContainer.innerHTML = `
            <div class="item__thumbnail">
                <img src="${game.background_image}" alt="${game.name} thumbnail" loading="lazy">
            </div>
            <h3 class="item__title title">${game.name}</h3>
            <a href="#game=${game.slug}" class="item__link">View Game</a>
        `;

        gameListContainer.appendChild(gameContainer);
    });
}

export function renderCategories(categories) {
    const categoriesList = document.querySelector(".list__section--categories .list__container");
    categoriesList.innerHTML = "";

    categories.forEach(category => {
        const categoryItem = document.createElement("li");
        categoryItem.classList.add("category__item");

        categoryItem.innerHTML = `
            <a class="category__link" id="${category.slug}" href="#category=${category.slug}">
                ${category.name}
            </a>
        `;

        categoriesList.appendChild(categoryItem);
    });
}

export function renderGameModal(game) {
    const gameModal = document.querySelector(".game-modal");

    gameModal.querySelector(".game-modal__title").textContent = game.name;
    gameModal.querySelector(".game-modal__header").style.backgroundImage = `url(${game.background_image})`;
    gameModal.querySelector(".game-modal__description").innerHTML = game.description;
    gameModal.querySelector(".game-modal__rating").textContent = `Rating: ${game.rating}`;
    gameModal.querySelector(".game-modal__release-date").textContent = `Release Date: ${game.released}`;

    gameModal.showModal();
}
