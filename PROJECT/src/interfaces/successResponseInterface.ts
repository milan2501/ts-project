import { SingleMovieInterface } from "./singleMovieInterface";

export interface successResponseInterface {
    Response: string,
    Search: SingleMovieInterface[],
    totalResults: string
}