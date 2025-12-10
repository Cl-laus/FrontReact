import axios from "./axios-api";
import {
  CreateRecipe,
  DisplayRecipeBasic,
  DisplayRecipeDetail,
  Ingredient,
  Page,
} from "./types";

export async function fetchRecipePage(page: string, itemsPerPage: string) {
  try {
    const response = await axios.get<Page<DisplayRecipeBasic>>("/api/recipes", {
      params: { page, itemsPerPage },
    });
    return response.data;
  } catch (error) {
    console.error("Erreur lors du chargement de la page' :", error);
    throw error;
  }
}

export async function fetchRecipeDetail(id: string) {
  try {
    const response = await axios.get<DisplayRecipeDetail>("/api/recipes/" + id);
    return response.data;
  } catch (error) {
    console.error("Erreur lors du chargement' :", error);
    throw error;
  }
}

export async function fetchRecipeIngredients(id: string) {
  try {
    const response = await axios.get<Ingredient[]>(
      "/api/recipes/" + id + "/ingredients"
    );
    return response.data;
  } catch (error) {
    console.error("Erreur lors du chargement' :", error);
    throw error;
  }
}

export async function postRecipe(recipe: CreateRecipe) {
  try {
    const response = await axios.post<DisplayRecipeDetail>(
      "/api/recipes",
      recipe,
      { headers: { "Content-Type": "application/json" } }
    );
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la création' :", error);
    throw error;
  }
}

export async function patchRecipe(recipe: DisplayRecipeDetail) {
  try {
    const response = await axios.patch<DisplayRecipeDetail>(
      "/api/recipes/" + recipe.id,
      recipe
    );
    return response.data;
  } catch (error) {
    console.error("Erreur lors de l'update' :", error);
    throw error;
  }
}

export async function deleteRecipe(id: string) {
  try {
    await axios.delete<void>("/api/recipes/" + id);
  } catch (error) {
    console.error("Erreur lors de la suppression :", error);
    throw error;
  }
}
