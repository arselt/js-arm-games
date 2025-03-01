import { navigator } from "./navigation.js";
import { setupSearchEvents, setupModalEvents, setupInfiniteScroll } from "./events.js";

setupSearchEvents();
setupModalEvents();
navigator();

document.addEventListener("DOMContentLoaded", () => {
    setupInfiniteScroll();
});
