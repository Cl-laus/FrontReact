"use client";

import {
  deleteRecipe,
  fetchRecipeDetail,
  fetchRecipeIngredients,
} from "@/src/api/recipes_api";
import { DisplayRecipeDetail, Ingredient } from "@/src/api/types";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import RecipeForm from "@/src/components/RecipeForm";
import IngredientCard from "@/src/components/IngredientsCard";
import RecipeDetailCard from "@/src/components/recipeDetailCard";
import { Card, CardContent, CardHeader } from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import { Minus, Plus, Utensils } from "lucide-react";

export default function PageDetail() {
  const params = useParams();
  const router = useRouter();
  const id = String(params.id);

  const [recipe, setRecipe] = useState<DisplayRecipeDetail | null>(null);
  const [ingredients, setIngredients] = useState<Ingredient[] | null>(null);
  const [isEdited, setIsEdited] = useState(false);

  const [servingCount, setServingCount] = useState<number>(1);

  useEffect(() => {
    async function fetchData() {
      const data = await fetchRecipeDetail(id);
      const dataIngredients = await fetchRecipeIngredients(id);

      setRecipe(data);
      setIngredients(dataIngredients);
      setServingCount(data.servings);
    }
    fetchData();
  }, [id, isEdited]);

  async function handleDelete(id: string) {
    try {
      await deleteRecipe(id);
      router.push("/");
    } catch (error) {
      console.error(error);
    }
  }

  if (!recipe) return null;

  return (
    <>
      <div className="max-w-6xl mx-auto my-10 flex flex-col lg:flex-row gap-6">
        {/* Recette */}
        <div>
          <RecipeDetailCard
            recipe={recipe}
            onBack={() => router.back()} // on retourne en arriere
            onEdit={() => setIsEdited(true)} // On modifie la valeur pour afficher le form d'edition
            onDelete={handleDelete}
          />
          <div>
            {/* Nombre de parts */}
            {/* Je n'ai pas reussi a en faire un components, trop complexe avec les props....*/}
            <Card className="p-4">
              <CardHeader className="py-4 px-5 flex flex-row items-center gap-3 font-semibold">
                <div className="h-8 w-8 flex items-center justify-center bg-primary text-primary-foreground rounded-full">
                  <Utensils />
                </div>
                Portions:
              </CardHeader>
              <CardContent className="flex items-center  gap-4">
                <p className="text-xl font-bold">{servingCount}</p>

                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    onClick={
                      () => setServingCount(Math.max(1, servingCount - 1)) // empeche d'aller sous 1
                    }
                  >
                    <Minus className="h-4 w-4" />
                  </Button>

                  <Button
                    variant="outline"
                    onClick={() => setServingCount(servingCount + 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Ingrédients */}
        <div className="w-full lg:w-1/3 flex flex-col">
          {ingredients && ingredients.length > 0 ? (
            // cas1: j'ai des ingredients
            ingredients.map((ingredient) => {
              const multiplier = servingCount / recipe.servings; // pour avoir le ratio

              return (
                <IngredientCard
                  key={ingredient.id}
                  ingredient={{
                    ...ingredient,
                    quantity: Math.round(ingredient.quantity * multiplier),
                  }}
                />
              );
            })
          ) : (
            //cas 2: je n'ai pas d'ingredients
            <Card className="p-4">
              <CardHeader className="py-4 px-5 flex flex-row items-center gap-3 font-semibold">
                <div className="h-8 w-8 flex items-center justify-center bg-primary text-primary-foreground rounded-full">
                  <Utensils />
                </div>
                Pas d'ingrédients...
              </CardHeader>
            </Card>
          )}
        </div>
      </div>

      <div>
        {/* affichage du form d'edition */}
        {isEdited && (
          <RecipeForm recipe={recipe} onClose={() => setIsEdited(false)} />
        )}
      </div>
    </>
  );
}
