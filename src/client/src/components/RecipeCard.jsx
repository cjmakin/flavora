import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export function RecipeCard({ recipe }) {
  const imagePath = recipe.img_path;
  const mediaPath = "/src";
  const index = imagePath.indexOf(mediaPath);
  const imagePathRelativeToMedia = imagePath.slice(index + mediaPath.length);

  return (
    <Card style={{ width: "18rem", marginTop: "30px" }}>
      <Card.Img
        variant="top"
        src={imagePathRelativeToMedia}
      />
      <Card.Body>
        <Card.Title>{recipe.name}</Card.Title>
        <Card.Text>
          {recipe.description}
        </Card.Text>
        <Button className="button-primary">View Recipe</Button>
        <Link
          to={`/recipes/${recipe.id}`}
          style={{ color: "#ffffff" }}
          className="btn button-primary"
        >
          View Recipe
        </Link>
      </Card.Body>
    </Card>
  );
}
