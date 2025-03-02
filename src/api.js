import axios from "axios";
import { API_KEY } from "./secrets.js";
import { EXCLUDED_TAGS } from "./config.js";

const api = axios.create({
    baseURL: "https://api.rawg.io/api/",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    params: { key: API_KEY }
});

export async function fetchGames(category = null, query = null, page = 1) {
    const params = {
        dates: "2024-09-01,2025-12-31",
        ordering: "-rating",
        page_size: 40,
        page: page,
        ...(category && { genres: category, dates: "2023-01-01,2025-12-31" }),
        ...(query && { search: query, page_size: 40, dates: "" })
    };

    const { data } = await api.get("/games", { params });
    return data.results.filter(game => 
        game.tags && !game.tags.some(tag => EXCLUDED_TAGS.includes(tag.slug))
    );
}

export async function fetchCategories() {
    const { data } = await api.get("/genres");
    return data.results;
}

export async function fetchGameDetails(gameSlug) {
    const { data } = await api.get(`/games/${gameSlug}`);
    return data;
}

export function savedGamesList() {
    const item = JSON.parse(localStorage.getItem('saved_games'));
    let games;
    if (item) {
        games = item;
    } else {
        games = {};
    }

    return games;
}

export function saveGame(game) {
    const savedGames = savedGamesList();
    
    if (savedGames[game.slug]) {
        savedGames[game.slug] = undefined;
    } else {
        savedGames[game.slug] = { slug: game.slug, background_image: game.background_image, name: game.name };
    }

    localStorage.setItem('saved_games', JSON.stringify(savedGames));
}
