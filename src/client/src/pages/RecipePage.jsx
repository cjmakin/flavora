import { Container, Image } from "react-bootstrap";
import { useContext } from "react";
import { RecipeContext } from "../App";

export function RecipePage() {
  const { recipe } = useContext(RecipeContext);

  const imagePath = recipe.img_path;
  const mediaPath = "/src";
  const index = imagePath.indexOf(mediaPath);
  const imagePathRelativeToMedia = imagePath.slice(index + mediaPath.length);

  const instructions = recipe.instructions.split("\\n").filter(
    (instruction) => {
      return instruction !== "";
    },
  );

  const ingredients = recipe.ingredients.split("\\n");

  return (
    <Container className="page-top-padding">
      <h1 className="branding">{recipe.name}</h1>
      <Image src={imagePathRelativeToMedia} />
      <p>{recipe.description}</p>
      <h2>Instructions</h2>
      <ul>
        {instructions.map((instruction, index) => (
          <li key={index}>{instruction}</li>
        ))}
      </ul>
      <h2>Ingredients</h2>
      <ul>
        {ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>
      <p>Cooking time: {recipe.cooking_time}</p>
    </Container>
  );
}
