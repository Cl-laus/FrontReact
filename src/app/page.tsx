"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { fetchRecipePage } from "@/src/api/recipes_api";
import { DisplayRecipeBasic } from "@/src/api/types";

import {
  Pagination,
  PaginationPrevious,
  PaginationNext,
} from "../components/ui/pagination";
import ProductCard from "../components/ProductCard";

export default function Home() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const page = Number(searchParams.get("page") ?? "1");
  const size = 6;

  const [recipes, setRecipes] = useState<DisplayRecipeBasic[]>([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetchRecipePage(String(page), String(size));
      setRecipes(response.member); // l'api renvoi les recette dans le member de la page
      console.log(response);

      // Sécurités : redirige si la page est invalide
      if (page < 1) {
        router.replace("/?page=1");
        return;
      }
      // Je n'ai pas reussi a recupererer le nombre total de page ou a le calculer....
      let max=4
      if (page > max) {
        router.replace(`/?page=${max}`);
        return;
      }
    }
    fetchData();
  }, [page]); // relance le fetch a chaque changement de la page

  const goToPage = (newPage: number) => {
    router.push(`/?page=${newPage}`); // change l'url
  };

  return (
    <div className="w-[90%] mx-auto my-10">
      {/* Grid des recettes */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 px-4">
        {recipes.map((recipe) => (
          <ProductCard
            key={recipe.id}
            recipe={recipe}
            onClick={() => router.push(`/recipes/${recipe.id}`)}
          />
        ))}
      </div>

      {/* Pagination */}
      <Pagination className="mt-8">
        <PaginationPrevious
          onClick={() => page > 1 && goToPage(page - 1)}
          className={page <= 1 ? "pointer-events-none opacity-20" : ""}
        />

        <PaginationNext
          onClick={() => recipes.length === size && goToPage(page + 1)} // on a pas le nombre de page; alors on compare si le nombre de recettes est egale au nombre attendu(6)
          className={
            recipes.length < size ? "pointer-events-none opacity-20" : ""
          }
        />
      </Pagination>
    </div>
  );
}
