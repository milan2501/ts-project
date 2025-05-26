export function setHistoryManager(movieName: string, movieYear: string): void {
    localStorage.setItem(movieName, movieYear);
}

export function removeHistoryManager(movieName: string): void {
    localStorage.removeItem(movieName);
}




