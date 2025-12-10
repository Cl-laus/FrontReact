"use client";

import { DisplayRecipeDetail } from "@/src/api/types";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import {
  ArrowLeft,
  Edit,
  Trash,
} from "lucide-react";

interface Props {
  recipe: DisplayRecipeDetail;
  onBack: () => void;
  onEdit: () => void;
  onDelete: (id: string) => void;
}

export default function RecipeDetailCard({
  recipe,
  onBack,
  onEdit,
  onDelete,
}: Props) {
  return (
    <Card className="shadow-md">
      <CardHeader className="text-2xl font-bold">{recipe.title}</CardHeader>

      <CardContent className="space-y-4">
        <p>
          <span className="font-semibold">Catégorie :</span> {recipe.category}
        </p>

        <div className="mt-5 w-full aspect-video rounded-xl overflow-hidden">
          <img
            src={
              recipe.picture.startsWith("http") // on verifie si cest une url ou juste un nom
                ? recipe.picture
                : `http://localhost:8000/uploads/${recipe.picture}`
            }
            alt={recipe.title}
            className="w-full h-full object-cover"
          />
        </div>

        <div>
          <p className="font-semibold">Étapes :</p>
          <p>{recipe.steps}</p>
        </div>
      </CardContent>

      <CardFooter className="flex gap-2">
        <Button onClick={onBack}>
          <ArrowLeft /> Retour à la liste
        </Button>
        <Button variant="default" onClick={onEdit}>
          <Edit /> Edit
        </Button>
        <Button variant="default" onClick={() => onDelete(recipe.id)}>
          <Trash /> Delete
        </Button>
      </CardFooter>
    </Card>
  );
}
