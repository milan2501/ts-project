import { createMovieCard } from "./components/movieCard";
import { editSearchForm, findBtn, insertValues } from "./components/searchForm";
import { callOmdbApi } from "./services/omdbApiServices";

editSearchForm();

findBtn?.addEventListener("click", async () => {
    const response = await insertValues();
    createMovieCard(response.data);
});


/*
ispisati podatke iz search-a
ako nismo dobili nikakve podatke, onda uraditi pretragu samo po search-u, bez godine
*/


















































































