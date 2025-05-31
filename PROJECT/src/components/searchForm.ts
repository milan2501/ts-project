import { clearStorage, inputNameOfMovie, inputYearOfMovie } from "../events/myEvents";
import { ApiResponseInterface } from "../interfaces/apiResponseInterface";
import { errorResponseInterface } from "../interfaces/errorResponseInterface";
import { callOmdbApi } from "../services/omdbApiServices";
import { lastSearch, renderSavedMovies } from "../ui/renderPreviousSearches";
import { yearOfProduction } from "./helper";
import { setHistoryManager } from "./searchHistoryManager";

const container = document.querySelector("#container") as HTMLElement | null;
const inputRow = document.createElement("div");
inputRow.classList.add("d-flex", "align-items-center", "mb-3", "gap-2", "w-100");

export const findBtn = document.createElement("button");
findBtn.classList.add('btn', 'btn-primary', 'm-3');
findBtn.textContent = "Find Movie";
findBtn.style.width = "15%"

export const clearButton = document.createElement("button");
clearButton.classList.add('btn', 'btn-primary', 'm-3');
clearButton.textContent = "Clear Search History";
clearButton.style.width = "15%"

let nameOfMovie = document.createElement("input");
nameOfMovie.classList.add('form-control', 'form-control-sm', 'me-3');
nameOfMovie.placeholder = "Name of Movie";
nameOfMovie.style.width = "15%";

const suggestedParagraph = document.createElement("p");
suggestedParagraph.classList.add("mt-3", "fw-bold", "fst-italic", "text-danger");
suggestedParagraph.style.display = "block";



export function editSearchForm(): void {

    if (container) {

        container.classList.add('d-flex', 'flex-column', 'align-items-start', 'p-2');

        inputRow.append(nameOfMovie, yearOfProduction, findBtn, clearButton);
        container.append(inputRow, lastSearch, suggestedParagraph);

        clearButton.addEventListener('click', clearStorage);

        nameOfMovie.addEventListener("input", inputNameOfMovie);

        yearOfProduction.addEventListener("change", inputYearOfMovie);
    }
}

export async function insertValues(): Promise<ApiResponseInterface> {
    let name = nameOfMovie.value;
    let year = yearOfProduction.value;

    if (name.trim() === '') alert("Enter movie please!");

    const firstParam = { key: "s", value: name };
    const secondParam = { key: "y", value: year };

    const fullResponse = await callOmdbApi([firstParam, secondParam]);
    const nonFullResponse = await callOmdbApi([firstParam]);

    const fullErrorResponse = fullResponse.data as errorResponseInterface;
    const nonFullErrorResponse = nonFullResponse.data as errorResponseInterface;

    if (fullErrorResponse.Response === "False") {

        if (nonFullErrorResponse.Response === "False") {

            suggestedParagraph.textContent = nonFullErrorResponse.Error;

        } else {
            suggestedParagraph.textContent =
                "Sorry, we couldn't find a movie with that exact name. But here are some similar titles you might be interested in!";
            return nonFullResponse;
        }

    } else {
        setHistoryManager({ name: name, year: year });
        renderSavedMovies()
    }

    return fullResponse;
};

















































