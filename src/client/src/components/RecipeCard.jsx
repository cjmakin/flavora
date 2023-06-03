import { Button, Card } from "react-bootstrap";
import { useContext } from "react";
import { RecipeContext } from "../App";
import { useNavigate } from "react-router-dom";
import { removeRecipe } from "../utilities.jsx";

export function RecipeCard(props) {
  const navigate = useNavigate();
  const { setRecipe } = useContext(RecipeContext);

  const imagePath = props.recipe.img_path;
  const mediaPath = "/src";
  const index = imagePath.indexOf(mediaPath);
  const imagePathRelativeToMedia = imagePath.slice(index + mediaPath.length);

  function handleRecipeClick() {
    setRecipe(props.recipe);
    navigate("/recipes/");
  }

  function handleRemoveRecipe(event) {
    event.stopPropagation();

    try {
      removeRecipe(props.recipe);
      props.setCookbook(
        props.cookbook.filter((recipe) => recipe.id !== props.recipe.id),
      );
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Card
      onClick={handleRecipeClick}
      className="recipe-card"
    >
      <Card.Img
        variant="top"
        src={imagePathRelativeToMedia}
      />
      <Card.Body>
        <Card.Title>{props.recipe.name}</Card.Title>
        <Card.Text>
          {props.recipe.description}
        </Card.Text>
        <Button onClick={handleRemoveRecipe} variant="outline-danger">
          Delete
        </Button>
      </Card.Body>
    </Card>
  );
}
