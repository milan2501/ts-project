
import { errorResponseInterface } from "./errorResponseInterface";
import { SingleMovieInterface } from "./singleMovieInterface";
import { successResponseInterface } from "./successResponseInterface";

export interface ApiResponseInterface {
    config: {},
    data: successResponseInterface | errorResponseInterface,
    headers: {},
    request: {},
    status: string,
    statusText: string
}
