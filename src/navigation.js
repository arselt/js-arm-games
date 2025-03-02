import { renderGames, renderCategories, renderGameModal, getSavedGames } from "./ui.js";
import { fetchGames, fetchCategories, fetchGameDetails } from "./api.js";

export function navigator() {
    if (location.hash.startsWith("#trends")) {
        TrendsPage();
    } else if (location.hash.startsWith("#search=")) {
        SearchPage();
    } else if (location.hash.startsWith("#category=")) {
        CategoryPage();
    } else if (location.hash.startsWith("#game=")) {
        GamePage();
    } else {
        TrendsPage();
    }

    getSavedGames();
    
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

async function TrendsPage() {
    const categories = await fetchCategories();
    renderCategories(categories);
    const games = await fetchGames();
    renderGames(games, "Popular Games");
}

async function SearchPage() {
    const categories = await fetchCategories();
    renderCategories(categories);
    const query = location.hash.split("=")[1];
    const games = await fetchGames(null, query);
    renderGames(games, `Results for ${query.replace(/%20/g, " ")}`);
}

async function CategoryPage() {
    const categories = await fetchCategories();
    renderCategories(categories);
    const category = location.hash.split("=")[1];
    const games = await fetchGames(category);
    renderGames(games, `Popular ${category} Games`);
}

async function GamePage() {
    const gameSlug = location.hash.split("=")[1];
    const game = await fetchGameDetails(gameSlug);
    renderGameModal(game);
}

window.addEventListener("hashchange", navigator, false);
