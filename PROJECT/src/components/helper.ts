export let yearOfProduction = document.createElement("select");
yearOfProduction.classList.add('form-select', 'form-select-sm');
yearOfProduction.style.width = "15%";
const emptyOption = document.createElement("option");
emptyOption.value = "";
emptyOption.disabled = true;
emptyOption.hidden = true;
emptyOption.selected = true;
emptyOption.textContent = "Years";

export function getYearsOption(): void {
    
    yearOfProduction.append(emptyOption);
            
        for (let i: number = 1960; i <= 2025; i++) {
                let yearOptions = document.createElement("option");
                yearOptions.textContent = i.toString();
                yearOptions.value = i.toString();
                yearOfProduction.append(yearOptions);
            }
}
getYearsOption()








