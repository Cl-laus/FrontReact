export interface DisplayRecipeBasic {
  id: string;
  title: string;
  category: string;
  picture: string;
}
export interface DisplayRecipeDetail extends DisplayRecipeBasic {
  steps: string;

  servings: number;
}

export interface Page<T> {
  member: T[];
  page: {
    number: number;
    itemsPerPage: number;
    totalElements: number;
    totalPages: number;
  };
}

export interface Ingredient {
  id: number;
  label: string;
  unit: string;
  quantity: number;
}

export interface CreateIngredient {
    label: string;
  unit: string;
  quantity: number;
}
export interface CreateRecipe {
  title: string;
  category: string;
  picture: string;
  steps: string;
  servings: number;
  ingredients: CreateIngredient[];
  // n'attends pas d'ID
}
