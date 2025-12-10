"use client";

import { Button } from "@/src/components/ui/button";

import RecipeForm from "./RecipeForm";
import { useState } from "react";
import Link from "next/link";

export default function Navigation() {
  const [isAdding, setIsAdding] = useState(false);

  return (
    <nav className="w-full bg-white shadow-sm px-6 py-4 flex justify-between items-center">
      <Link href="/" className="text-xl font-bold">
        Mon Site Recettes
      </Link>

      <Button onClick={() => setIsAdding(true)} variant="default">
        Ajouter une recette
      </Button>

      {/* Formulaire en modal */}
      {/* le formulaire d'ajout s'affiche en changeant la valeur via le bouton */}
      {isAdding && <RecipeForm onClose={() => setIsAdding(false)} />}
    </nav>
  );
}
