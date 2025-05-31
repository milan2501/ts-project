import { createMovieCard } from "../components/movieCard";
import { getAllMovies } from "../components/searchHistoryManager";
import { callOmdbApi } from "../services/omdbApiServices";



export const lastSearch = document.createElement("div");
lastSearch.classList.add("d-flex", "flex-wrap", "mt-3");
lastSearch.innerHTML = '';


export function renderSavedMovies(): void {
    const movies = getAllMovies();
    lastSearch.innerHTML = '';
    for (let movie of movies) {
        const movieDiv = document.createElement("button");
        movieDiv.classList.add("movie-square", "p-2", "border", "rounded", "me-2", "mb-2", "bg-light");
        const name = document.createElement("span");
        name.dataset.name = movie.name;
        const year = document.createElement("span");
        year.dataset.year = movie.year.toString();
        name.textContent = movie.name + ", ";
        year.textContent = movie.year;
        const params = [
            {key: "s", value: name.dataset.name},
            {key: "y", value: year.dataset.year.toString()}
        ];
        movieDiv.append(name, year);
        lastSearch.append(movieDiv);
        movieDiv.addEventListener("click", async () => {
            const response = await callOmdbApi(params);
            createMovieCard(response.data);
        })
    }
}














