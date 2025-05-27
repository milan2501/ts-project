import { searchHistoryManager } from "../interfaces/searchHistoryInterface";

export function setHistoryManager(movie: searchHistoryManager): void {
    let existingMovies = getAllMovies();
    let alreadyExists: boolean = existingMovies.some((m: searchHistoryManager) => JSON.stringify(m) === JSON.stringify(movie));
    if (!alreadyExists) {
        existingMovies.push(movie);
        localStorage.setItem('rememberMovies', JSON.stringify(existingMovies));
    }
}

export function getAllMovies(): searchHistoryManager[] {
    const data = localStorage.getItem('rememberMovies');
    return data ? JSON.parse(data) : [];
}



