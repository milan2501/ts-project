import { searchHistoryManager } from "../interfaces/searchHistoryInterface";

export const KEY_WORD: string = 'rememberMovies';


export function setHistoryManager(movie: searchHistoryManager): void {
    let existingMovies = getAllMovies();
    let alreadyExists: boolean = 
    existingMovies.some((m: searchHistoryManager) => JSON.stringify(m) === JSON.stringify(movie));
    if (!alreadyExists) {
        existingMovies.push(movie);
        localStorage.setItem(KEY_WORD, JSON.stringify(existingMovies));
    }
}

export function getAllMovies(): searchHistoryManager[] {
    const data = localStorage.getItem(KEY_WORD);
    return data ? JSON.parse(data) : [];
}












