import { ApiResponseInterface } from "../interfaces/apiResponseInterface";
import { SingleMovieInterface } from "../interfaces/singleMovieInterface";
import { successResponseInterface } from "../interfaces/successResponseInterface";



export function createMovieCard(responseData: ApiResponseInterface['data']): void {

    const responseDataSuccess = responseData as successResponseInterface;

    const infoAboutMovie = document.querySelector("#infoAboutMovie");

    if (!infoAboutMovie) return;

    infoAboutMovie.innerHTML = "";
    infoAboutMovie.className = "row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-2 px-1";

    if (!responseDataSuccess.Search || !Array.isArray(responseDataSuccess.Search)) return;
    responseDataSuccess.Search.forEach((movie: any) => {
    const col = document.createElement("div");
    col.className = "col";

    col.innerHTML = `
      <div class="card h-100 shadow-sm border-0 rounded-4 overflow-hidden hover-shadow transition">
        <img src="${movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/300x450?text=No+Image"}"
             class="card-img-top object-fit-cover" alt="${movie.Title}" style="height: 400px;">
        <div class="card-body d-flex flex-column justify-content-between">
          <div>
            <h5 class="card-title fw-bold">${movie.Title}</h5>
            <p class="card-text text-secondary mb-2">Year: ${movie.Year}</p>
            <span class="badge bg-secondary">${movie.Type}</span>
          </div>
          <a href="https://www.imdb.com/title/${movie.imdbID}/" 
             class="btn btn-outline-primary btn-sm mt-3" 
             target="_blank" rel="noopener noreferrer">
            View on IMDb
          </a>
        </div>
      </div>
    `;

    infoAboutMovie.appendChild(col);
  });
}



















