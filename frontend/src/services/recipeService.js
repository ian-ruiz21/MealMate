import sendRequest from "./sendRequest";

const BASE_URL = "/api/recipes";

export async function index() {
  return sendRequest(BASE_URL, "GET");
}

export async function show(recipeId) {
  return sendRequest(`${BASE_URL}/${recipeId}`, "GET");
}

export async function showMyRecipes() {
  return sendRequest(`${BASE_URL}/my-recipes`, "GET");
}

export async function create(data) {
  return sendRequest(`${BASE_URL}`, "POST", data);
}

export async function deleteRecipe(recipeId) {
    return sendRequest(`${BASE_URL}/${recipeId}`, "DELETE");
  }

export async function update(recipeId, data) {
    return sendRequest(`${BASE_URL}/${recipeId}`, "PUT", data);
}

export async function createComment(hootId, data) {
  return sendRequest(`${BASE_URL}/${hootId}/comments`, "POST", data);
}


