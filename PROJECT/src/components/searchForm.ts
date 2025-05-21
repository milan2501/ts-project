import { ApiResponseInterface } from "../interfaces/apiResponseInterface";
import { callOmdbApi } from "../services/omdbApiServices";

const container = document.querySelector("#container") as HTMLElement | null;
export const findBtn = document.createElement("button");
findBtn.textContent = "Find Movie";

let nameOfMovie = document.createElement("input");
nameOfMovie.placeholder = "Name of Movie";

let yearOfProduction = document.createElement("select");
yearOfProduction.style.width = "80px";
yearOfProduction.style.height = "21px";
yearOfProduction.style.margin = "20px";

export let chosenYear: string = "";
export let chosenName: string = "";

export function editSearchForm(): void {
    if (container) {
        for (let i: number = 1960; i <= 2025; i++) {
            let yearOptions = document.createElement("option");
            const emptyOption = document.createElement("option");
            emptyOption.value = "";
            emptyOption.disabled = true;
            emptyOption.hidden = true;
            emptyOption.selected = true;
            emptyOption.textContent = "Years";
            yearOptions.textContent = i.toString();
            yearOptions.value = i.toString();
            yearOfProduction.append(emptyOption, yearOptions);
        }

        container.append(nameOfMovie, yearOfProduction, findBtn);

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
  const firstParam = { key: "s", value: chosenName };
  const secondParam = { key: "y", value: chosenYear };

  const fullSearchRes = await callOmdbApi([firstParam, secondParam]);

  if (fullSearchRes.data.Response === "True" && fullSearchRes.data.Search) {
    return fullSearchRes;
  }

  const fallbackRes = await callOmdbApi([firstParam]);

  return fallbackRes;
}





















































