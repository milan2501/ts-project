import { ApiResponseInterface } from "../interfaces/apiResponseInterface";



export function createMovieCard(responseData: ApiResponseInterface['data']): void {
    const infoAboutMovie = document.querySelector("#infoAboutMovie");
    if (!infoAboutMovie) return;
    infoAboutMovie.innerHTML = "";
    if (!responseData.Search || !Array.isArray(responseData.Search)) return;
    responseData.Search.forEach((movie: any) => {
        const frame = document.createElement("div");
        const img = document.createElement("img");
        img.src = movie.Poster;
        img.alt = movie.Title;
        const titleOfMovie = document.createElement("p") as HTMLParagraphElement;
        titleOfMovie.textContent = movie.Title;
        const yearOfMovie = document.createElement("span") as HTMLSpanElement;
        yearOfMovie.textContent = movie.Year;
        frame?.append(img, titleOfMovie, yearOfMovie);
        infoAboutMovie?.append(frame);
    })
}



















