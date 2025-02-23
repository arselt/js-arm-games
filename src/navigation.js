import { getGamesPreview, getCategories, actionateModal, getGameInfo, searchGame } from "./main.js";

const searchInput = document.querySelector('#searchForm input');
const searchButton = document.querySelector('#searchButton');

searchButton.addEventListener('click', () => {
    location.hash = '#search=' + searchInput.value;
})

window.addEventListener('hashchange', navigator, false);

export default function navigator(){

    if (location.hash.startsWith('#trends')) {
        TrendsPage();
    } else if (location.hash.startsWith('#search=')) {
        SearchAction();
    } else if (location.hash.startsWith('#category=')) {
        CategoryPage();
    } else if (location.hash.startsWith('#game=')) {
        GamePage();
    } else {
        TrendsPage();
    }

    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
};

function SearchAction() {
    searchGame(location.hash.split('=')[1])
    getCategories();
}

function TrendsPage() {
    getGamesPreview();
    getCategories();
};

function CategoryPage() {
    getGamesPreview(location.hash.split('=')[1]);
    getCategories();
};

function GamePage() {
    actionateModal();
    getGameInfo(location.hash.split('=')[1]);
};