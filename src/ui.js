import { savedGamesList, saveGame } from "./api";

export function renderGames(games, title) {
    const featuredTitle = document.querySelector(".carousel__section--popular h2.title");
    featuredTitle.textContent = title;
    
    const container = document.querySelector(".carousel__section--popular .carousel__container");

    container.innerHTML = "";

    createGames(games, container);
}

export function appendGames(games) {
    const container = document.querySelector(".carousel__section--popular .carousel__container");

    createGames(games, container)
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

export function getSavedGames() {
    const savedGames = savedGamesList();
    const gamesArray = Object.values(savedGames);

    const container = document.querySelector(".carousel__section--saved .carousel__container");

    container.innerHTML = "";

    createGames(gamesArray, container)
}

function createGames(gameList, container) {
    
    gameList.forEach(game => {
        
        
        const gameContainer = document.createElement("article");
        gameContainer.setAttribute("id", game.slug);
        gameContainer.classList.add("item-container");
        
        gameContainer.innerHTML = `
        <div class="item__thumbnail">
        <button class="item__button item__button--save" aria-label="save""></button>
        <img src="${game.background_image}" alt="${game.name} thumbnail" loading="lazy">
        </div>
        <h3 class="item__title title">${game.name}</h3>
        <a href="#game=${game.slug}" class="item__link">View Game</a>
        `;
        
        const saveGameButton = gameContainer.querySelector('.item__button--save');
        
        saveGameButton.addEventListener('click', () => {
            saveGameButton.classList.toggle('item__button--saved');
            saveGame(game);
            getSavedGames();
        });
        
        savedGamesList()[game.slug] && saveGameButton.classList.add('item__button--saved');

        container.appendChild(gameContainer);
    });
}