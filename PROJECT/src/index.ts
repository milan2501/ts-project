import { createMovieCard } from "./components/movieCard";
import { editSearchForm, findBtn, insertValues } from "./components/searchForm";
import './style.css';
import 'bootstrap/dist/css/bootstrap.min.css';


editSearchForm();

findBtn?.addEventListener("click", async () => {
    const response = await insertValues();
    createMovieCard(response.data);
    console.log(response);
});
















































































