import { getMovieDetail } from "../events/myEvents";
import { ApiResponseInterface } from "../interfaces/apiResponseInterface";
import { successResponseInterface } from "../interfaces/successResponseInterface";


export function createMovieCard(responseData: ApiResponseInterface['data']): void {

  const responseDataSuccess = responseData as successResponseInterface;
  
  //info cards
  const infoAboutMovie = document.querySelector("#infoAboutMovie");
  if (!infoAboutMovie) return;
  infoAboutMovie.innerHTML = "";
  infoAboutMovie.className = "row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-2 px-1";
    
  //logic
  if (!responseDataSuccess.Search || !Array.isArray(responseDataSuccess.Search)) return;
  responseDataSuccess.Search.forEach((movie: any) => {
  const col = document.createElement("div");
  col.className = "col";

  const card = document.createElement("div");
  card.className = "card h-100 shadow-sm border-0 rounded-4 overflow-hidden hover-shadow transition";

  const img = document.createElement("img");
  img.src = movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/300x450?text=No+Image";
  img.className = "card-img-top object-fit-cover";
  img.alt = movie.Title;
  img.style.height = "400px";

  const cardBody = document.createElement("div");
  cardBody.className = "card-body d-flex flex-column justify-content-between";

  const contentDiv = document.createElement("div");
  const title = document.createElement("h5");
  title.className = "card-title fw-bold";
  title.textContent = movie.Title;

  const year = document.createElement("p");
  year.className = "card-text text-secondary mb-2";
  year.textContent = `Year: ${movie.Year}`;

  const badge = document.createElement("span");
  badge.className = "badge bg-secondary";
  badge.textContent = movie.Type;

  const detailsBtn = document.createElement("button");
  detailsBtn.className = "btn btn-outline-primary btn-sm mt-3";
  detailsBtn.textContent = "Details about movie";

  //details BTN  
  detailsBtn.addEventListener("click", () => getMovieDetail(movie));

  //appending  
  contentDiv.append(title, year, badge);
  cardBody.append(contentDiv, detailsBtn);
  card.append(img, cardBody);
  col.append(card);
  infoAboutMovie.appendChild(col);
  });
};



















