import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/src/components/ui/card";

import {  Ingredient } from "../api/types";
import { ChefHat } from "lucide-react";

interface Props {
  ingredient: Ingredient;
}

export default function IngredientCard({ ingredient }: Props) {
  return (
    <Card className="shadow-none gap-0 pt-0 w-full">
      <CardHeader className="py-4 px-5 flex flex-row items-center gap-3 font-semibold">
        <div className="h-8 w-8 flex items-center justify-center bg-primary text-primary-foreground rounded-full">
          <ChefHat/>
        </div>
          {ingredient.label}
        
      </CardHeader>

      <CardContent className="mt-1 text-[15px] text-muted-foreground px-5">
        <p>{ingredient.quantity} {ingredient.unit}</p>
      </CardContent>

      
    </Card>
  );
}
