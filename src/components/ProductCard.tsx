import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/src/components/ui/card";
import { ArrowRight, Shapes } from "lucide-react";
import { DisplayRecipeBasic } from "../api/types";

interface Props {
  recipe: DisplayRecipeBasic;
  onClick: () => void;
}

export default function ProductCard({ recipe, onClick }: Props) {
  return (
    <Card className="shadow-none gap-0 pt-0 w-full">
      <CardHeader className="py-4 px-5 flex flex-row items-center gap-3 font-semibold">
        <div className="h-8 w-8 flex items-center justify-center bg-primary text-primary-foreground rounded-full">
          <Shapes className="h-5 w-5" />
        </div>
        {recipe.title}
      </CardHeader>

      <CardContent className="mt-1 text-[15px] text-muted-foreground px-5">
        <p>{recipe.category}</p>
        <div className="mt-5 w-full aspect-video rounded-xl overflow-hidden">
          <img
            src={
              recipe.picture.startsWith("http") // on verifie si cest une url ou juste un nom
                ? recipe.picture // c'est déjà une URL complète
                : `http://localhost:8000/uploads/${recipe.picture}` // concaténation
            }
            alt={recipe.title}
            className="w-full h-full object-cover"
          />
        </div>
      </CardContent>

      <CardFooter className="mt-6">
        <Button onClick={onClick}>
          Voir Detail <ArrowRight />
        </Button>
      </CardFooter>
    </Card>
  );
}
