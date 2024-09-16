import sendRequest from "./sendRequest";


const BASE_URL = "/api/recipes";

export async function index() {
    return sendRequest(BASE_URL, 'GET');
}

export async function show(recipeId) {
    return sendRequest(`${BASE_URL}/${recipeId}`, 'GET');
}

export async function create(data) {
    return sendRequest(`${BASE_URL}`, "POST", data);
}
