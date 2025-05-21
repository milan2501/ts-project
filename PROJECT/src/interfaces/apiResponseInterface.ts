export interface Movie {
  Title: string;
  Year: string;
  Poster: string;
}

export interface ApiResponseInterface {
    config: {},
    data: {
        Response: string,
        Search: Movie[];
    };
    headers: {},
    request: {},
    status: string,
    statusText: string
}
