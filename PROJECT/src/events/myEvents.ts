import { createMovieCard } from "../components/movieCard";
import { insertValues } from "../components/searchForm";
import { lastSearch } from "../ui/renderPreviousSearches";



export function clearStorage(): void  {
            localStorage.clear();
            lastSearch.innerHTML = '';
        }

export function inputNameOfMovie (e: Event): string {
            const target = e.currentTarget as HTMLInputElement;
            return target.value;
        };

export function inputYearOfMovie (e: Event): string {
            const target = e.currentTarget as HTMLSelectElement;
            return target.value
        ;}

export async function renderMovies(): Promise<void> {
            const response = await insertValues();
            createMovieCard(response.data);
        };

export function getMovieDetail(movie: any):void {
            
            const overlayDiv = document.createElement("div");
            overlayDiv.classList.add("overlay");

            const popupDiv = document.createElement("div");
            popupDiv.classList.add("popup");

            const imgDiv = document.createElement("div");
            imgDiv.classList.add("child1");

            const titleDiv = document.createElement("div");
            titleDiv.classList.add("child2");

            const popupImg = document.createElement("img");
            const popupTitle = document.createElement("h3");
            const popupYear = document.createElement("p");
            const popupBadge = document.createElement("p");
            popupTitle.textContent = movie.Title;
            popupYear.textContent = movie.Type;
            popupBadge.textContent = movie.Year;
            popupImg.src = movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/300x450?text=No+Image";
            
            imgDiv.appendChild(popupImg);
            titleDiv.append(popupTitle, popupYear, popupBadge);
            popupDiv.append(imgDiv, titleDiv);
            overlayDiv.appendChild(popupDiv);
            document.body.appendChild(overlayDiv);

            overlayDiv.addEventListener("click", (e) => {
            let target = e.target as Node | null;
                if (target === overlayDiv) {
                    overlayDiv.remove() // Clean removal
                }
            });
        };

























