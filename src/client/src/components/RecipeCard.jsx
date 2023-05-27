import { Button, Card } from "react-bootstrap";
import { useContext } from "react";
import { RecipeContext } from "../App";
import { useNavigate } from "react-router-dom";

export function RecipeCard(props) {
  const navigate = useNavigate();
  const { setRecipe } = useContext(RecipeContext);

  const imagePath = props.recipe.img_path;
  const mediaPath = "/src";
  const index = imagePath.indexOf(mediaPath);
  const imagePathRelativeToMedia = imagePath.slice(index + mediaPath.length);

  function handleViewRecipeClick() {
    setRecipe(props.recipe);
    navigate("/recipes/");
  }

  return (
    <Card style={{ width: "18rem", marginTop: "30px" }}>
      <Card.Img
        variant="top"
        src={imagePathRelativeToMedia}
      />
      <Card.Body>
        <Card.Title>{props.recipe.name}</Card.Title>
        <Card.Text>
          {props.recipe.description}
        </Card.Text>
        <Button onClick={handleViewRecipeClick} className="btn button-primary">
          View Recipe
        </Button>
      </Card.Body>
    </Card>
  );
}
