import { API_KEY } from "./secrets"
import { EXCLUDED_TAGS } from "./config"
import axios from 'axios';
import navigator from "./navigation";

export { getGamesPreview, getCategories };

const api = axios.create({
    baseURL: 'https://api.rawg.io/api/',
    headers: {
        'Content-Type': 'application/json; charset=utf-8',
    },
    params: {
        key: API_KEY,
    }
});

async function getGamesPreview(category) {
    const params = {
        dates: '2024-09-01,2025-12-31',
        ordering: '-rating',
        page_size: 20,
        ...(category && { genres: category })
    };

    const { data } = await api.get('/games', {
        params
    });

    const games = data.results;
    const filteredGamesPerTags = games.filter(game => 
        game.tags && !game.tags.some(tag => EXCLUDED_TAGS.includes(tag.slug))
    );

    const gameListContainer = document.querySelector('.carousel__section--popular .carousel__container');
        
    gameListContainer.innerHTML = '';

    filteredGamesPerTags.forEach(game => {
        const featuredTitle = document.querySelector('.carousel__section--popular h2.title');
        featuredTitle.textContent = `Popular ${category ? category : "" } games`;

        const gameContainer = document.createElement('article');
        gameContainer.setAttribute('id', game.slug);
        gameContainer.classList.add('item-container');

        const gameImgContainer = document.createElement('div');
        gameImgContainer.classList.add('item__thumbnail');

        const gameImg = document.createElement('img');
        gameImg.setAttribute('alt', `${game.name} thumbnail`);
        gameImg.setAttribute('src', game.background_image);

        const gameLink = document.createElement('a');
        gameLink.setAttribute('href', `#game=${game.slug}`);
        gameLink.classList.add('item__link');
        gameLink.textContent = 'View Game';

        const gameTitle = document.createElement('h3');
        gameTitle.classList.add('item__title', 'title');
        gameTitle.textContent = game.name;

        gameImgContainer.appendChild(gameImg);

        gameContainer.appendChild(gameImgContainer);
        gameContainer.appendChild(gameTitle);
        gameContainer.appendChild(gameLink);

        gameListContainer.appendChild(gameContainer);
    });
}

async function getCategories() {
    const { data } = await api.get('/genres', {});

    const categories = data.results;

    console.log(categories)

    const categoriesList = document.querySelector('.list__section--categories .list__container');

    categoriesList.innerHTML = '';

    categories.forEach(category => {
        const categoryItem = document.createElement('li');
        categoryItem.classList.add('category__item');

        const categoryLink = document.createElement('a');
        categoryLink.classList.add('category__link');
        categoryLink.setAttribute('id', category.slug); //change to category.id if needed
        categoryLink.setAttribute('href', `#category=${category.slug}`);
        categoryLink.textContent = category.name;

        categoryItem.appendChild(categoryLink);
        categoriesList.appendChild(categoryItem);
    });
}

navigator();