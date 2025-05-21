import axios from "axios";
import { ApiParametersInterface } from "../interfaces/apiParamsInterfaces";
import { ApiResponseInterface } from "../interfaces/apiResponseInterface";
const API_URL = 'https://www.omdbapi.com/';
const API_KEY = '180c6fcc';


function buildApi(params: ApiParametersInterface[]): string {
    let searchParams = "";
    params.forEach(param => {
        searchParams += `${param.key}=${param.value}&`;
    });
    return API_URL+"?"+searchParams+"apiKey="+API_KEY;
}

export async function callOmdbApi(params: ApiParametersInterface[]): Promise<ApiResponseInterface> {
    const url = buildApi(params);
    return await axios.get(url);
} 


