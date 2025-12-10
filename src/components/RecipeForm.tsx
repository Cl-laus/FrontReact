"use client";

import {
  CreateIngredient,
  DisplayRecipeDetail,
  Ingredient,
} from "@/src/api/types";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { Textarea } from "@/src/components/ui/textarea";
import { useState } from "react";
import { patchRecipe, postRecipe } from "../api/recipes_api";
import IngredientsList from "./IngredientsList";
import { useRouter } from "next/navigation";

interface Props {
  recipe?: DisplayRecipeDetail; // optionnel car le formulaire marche aussi pour l'ajout
  onClose: () => void; // si on veut rajouter des action pour le paretns quand on ferme ce formulaire
}

export default function RecipeForm({ recipe, onClose }: Props) {
  ///toutes les valeurs Recupérées en update

  const [title, setTitle] = useState(recipe?.title || "");
  const [category, setCategory] = useState(recipe?.category || "");
  const [imageUrl, setImageUrl] = useState(recipe?.picture || "");
  const [servings, setServings] = useState(recipe?.servings || 1);
  const [steps, setSteps] = useState(recipe?.steps || "");
  const patchMode = recipe?.id;

  // Tableau d'ingrédients pour le mode POST
  const [ingredients, setIngredients] = useState<CreateIngredient[]>([]);

  //pour la redirection apres le POST
  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    let inBddRecipe: DisplayRecipeDetail;
    if (patchMode) {
      // il y a un Id dans le formulaire donc on est en mode edition
      let UpdatedRecipe = {
        ...recipe,
        title,
        category,
        servings,
        steps,
        picture: imageUrl,
      };
      inBddRecipe = await patchRecipe(UpdatedRecipe);
    } else {
      let newRecipe = {
        title,
        category,
        steps,
        picture: imageUrl,
        servings,
        ingredients,
      };

      inBddRecipe = await postRecipe(newRecipe);
    }
    //on ferme et on redirige vers la page de l'element crée
    onClose();
    router.push(`/recipes/${inBddRecipe.id}`);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-xl font-bold">
          {patchMode ? "Modifier" : "Creer"} une recette
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Titre */}
            <div className="flex flex-col">
              <Label>Titre</Label>
              <Input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Titre de la recette"
              />
            </div>

            {/* Image */}
            <div className="flex flex-col">
              <Label>Image (URL)</Label>
              <Input
                type="text"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="Colle l'URL de l'image"
              />
            </div>

            {/* Catégorie */}
            <div className="flex flex-col">
              <Label>Catégorie</Label>
              <Input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="Catégorie de la recette"
              />
            </div>

            {/* Portions */}
            <div className="flex flex-col">
              <Label>Portions</Label>
              <Input
                type="number"
                value={servings}
                onChange={(e) => setServings(Number(e.target.value))}
                placeholder="Nombre de portions"
              />
            </div>

            {/* Étapes */}
            <div className="flex flex-col">
              <Label>Étapes</Label>
              <Textarea
                value={steps}
                onChange={(e) => setSteps(e.target.value)}
                placeholder="Décris les étapes de la recette"
                rows={6}
              />
            </div>
            {/* Pour ajouter les ingredients en mode POST */}
            {!patchMode && (
              <IngredientsList
                ingredients={ingredients}
                setIngredients={setIngredients}
              />
            )}

            <CardFooter className="flex justify-end gap-2">
              <Button variant="outline" type="button" onClick={onClose}>
                Annuler
              </Button>
              <Button type="submit">Sauvegarder</Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
