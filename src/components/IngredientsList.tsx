"use client";

import { useState } from "react";
import { CreateIngredient, Ingredient } from "@/src/api/types";
import { Input } from "@/src/components/ui/input";
import { Button } from "@/src/components/ui/button";



interface Props {
  ingredients: CreateIngredient[]; // le tableau envoyé par le parent( le formulaire de post)
  setIngredients: (ingredients: CreateIngredient[]) => void; // la methode pour mettre a jour ce tableau chez le parent
}

export default function IngredientsList({
  ingredients,
  setIngredients,
}: Props) {
  const [newLabel, setNewLabel] = useState("");
  const [newQuantity, setNewQuantity] = useState("");
  const [newUnit, setNewUnit] = useState("");

  function handleAdd(e: any) {
    e.preventDefault(); // Empêche le submit du formulaire

    if (!newLabel.trim()) return; // on verifie que le champs est pas vide

    setIngredients([
      ...ingredients,
      {
        
        label: newLabel,
        quantity: Number(newQuantity) || 0,
        unit: newUnit || "sans unit",
      },
    ]);

    
    setNewLabel("");
    setNewQuantity("");
    setNewUnit("");
  }

  function handleDelete(e: any, label: string) {
    e.preventDefault(); // Empêche le submit du formulaire

    setIngredients(ingredients.filter((i) => i.label !== label)); // filtre le tableau en enlevant l'item i avec ID correspondant, et ensuite on le réassigne au tableau
  }

  return (
    <div className="space-y-4">
      {/* Inputs */}
      <div className="flex gap-2">
        <Input
          placeholder="Nom"
          value={newLabel}
          onChange={(e) => setNewLabel(e.target.value)}
        />

        <Input
          type="number"
          placeholder="Qté"
          value={newQuantity}
          onChange={(e) => setNewQuantity(e.target.value)}
        />

        <Input
          placeholder="Unité"
          value={newUnit}
          onChange={(e) => setNewUnit(e.target.value)}
        />

        <Button onClick={handleAdd}>Ajouter</Button>
      </div>

      {/* Liste */}
      <ul className="space-y-2">
        {ingredients.map((ingredient) => (
          <li key={ingredient.label} className="border p-2 rounded-md">
            <div className="flex justify-between items-center">
              {ingredient.label} -- {ingredient.quantity} : {ingredient.unit}
              <Button onClick={(e) => handleDelete(e, ingredient.label)}>
                Enlever
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
