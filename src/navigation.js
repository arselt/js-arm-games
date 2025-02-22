import { getGamesPreview, getCategories } from "./main.js";

window.addEventListener('hashchange', navigator, false);

export default function navigator(){
    console.log({location});

    if (location.hash.startsWith('#trends')) {
        TrendsPage();
    } else if (location.hash.startsWith('#search=')) {
        console.log('Search');
    } else if (location.hash.startsWith('#category=')) {
        CategoryPage();
    } else if (location.hash.startsWith('#game=')) {
        GamePage();
    } else {
        TrendsPage();
    }
};

function TrendsPage() {
    getGamesPreview();
    getCategories();
};

function CategoryPage() {
    getGamesPreview(location.hash.split('=')[1]);
    getCategories();
};

function GamePage() {
    console.log('Game Page');
    
};