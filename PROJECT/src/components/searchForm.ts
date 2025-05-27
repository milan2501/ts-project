import { ApiResponseInterface } from "../interfaces/apiResponseInterface";
import { errorResponseInterface } from "../interfaces/errorResponseInterface";
import { callOmdbApi } from "../services/omdbApiServices";
import { setHistoryManager } from "./searchHistoryManager";
 
const container = document.querySelector("#container") as HTMLElement | null;
const inputRow = document.createElement("div");
inputRow.classList.add("d-flex", "align-items-center", "mb-3", "gap-2", "w-100");

export const findBtn = document.createElement("button");
findBtn.classList.add('btn', 'btn-primary', 'm-3');
findBtn.textContent = "Find Movie";
findBtn.style.width = "15%"

let nameOfMovie = document.createElement("input");
nameOfMovie.classList.add('form-control', 'form-control-sm', 'me-3');
nameOfMovie.placeholder = "Name of Movie";
nameOfMovie.style.width = "15%";


let yearOfProduction = document.createElement("select");
yearOfProduction.classList.add('form-select', 'form-select-sm');
yearOfProduction.style.width = "15%";
const emptyOption = document.createElement("option");
emptyOption.value = "";
emptyOption.disabled = true;
emptyOption.hidden = true;
emptyOption.selected = true;
emptyOption.textContent = "Years";

const suggestedParagraph = document.createElement("p");
suggestedParagraph.classList.add("mt-3", "text-muted");
suggestedParagraph.style.display = "none";


export let chosenYear: string = "";
export let chosenName: string = "";


export function editSearchForm(): void {

    if (container) {

        container.classList.add('d-flex', 'flex-column', 'align-items-start');
         yearOfProduction.append(emptyOption);
        for (let i: number = 1960; i <= 2025; i++) {
            let yearOptions = document.createElement("option");
            yearOptions.textContent = i.toString();
            yearOptions.value = i.toString();
            yearOfProduction.append(yearOptions);
        }

        inputRow.append(nameOfMovie, yearOfProduction, findBtn);
        container.append(inputRow, suggestedParagraph);

        nameOfMovie.addEventListener("input", (e) => {
            const target = e.currentTarget as HTMLInputElement;
            chosenName = target.value;
        });

        yearOfProduction.addEventListener("change", (e) => {
            const target = e.currentTarget as HTMLSelectElement;
            chosenYear = target.value;
        });
    }
}

export async function insertValues(): Promise<ApiResponseInterface> {

    if (chosenName.trim() === '') alert ("Enter movie please!");

    const firstParam = { key: "s", value: chosenName };
    const secondParam = { key: "y", value: chosenYear };

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
        suggestedParagraph.classList.add("mt-3", "fw-bold", "fst-italic", "text-danger");
        suggestedParagraph.style.display = "block";
    } else {
        setHistoryManager({name: chosenName, year: chosenYear});

    }

    return fullResponse;
}

                


















































