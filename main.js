import { API_KEY } from "./src/secrets"

async function getGamesPreview() {
    const res = await fetch (`https://api.rawg.io/api/games?key=${API_KEY}`)
    const data = await res.json();

    const games = data.results;
    games.forEach(game => {
        const gameListContainer = document.querySelector('.carousel__section--popular .carousel__container');

        const gameContainer = document.createElement('article');
        gameContainer.classList.add('item-container');

        const gameImg = document.createElement('img');
        gameImg.classList.add('item__thumbnail');
        gameImg.setAttribute('alt', game.name);
        gameImg.setAttribute('src', game.background_image);

        const gameTitle = document.createElement('h3');
        gameTitle.classList.add('item__title', 'title');
        gameTitle.textContent = game.name;

        gameContainer.appendChild(gameImg);
        gameContainer.appendChild(gameTitle);
        gameListContainer.appendChild(gameContainer);
    });
}

getGamesPreview();