import { useContext } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import { UserContext } from "../App";
import { useLoaderData } from "react-router-dom";

export function CreateRecipePage() {
  let pantry = useLoaderData();

  return (
    <Container className="page-top-padding">
      <ul>
        {pantry.length > 0 &&
          pantry.map((ingredient, index) => {
            return <li key={index}>{ingredient.name}</li>;
          })}
      </ul>
    </Container>
  );
}

//   const [recipeName, setRecipeName] = useState("");
//   const [recipeDescription, setRecipeDescription] = useState("");
//   const [recipeIngredients, setRecipeIngredients] = useState("");
//   const [recipeInstructions, setRecipeInstructions] = useState("");
//   const [recipeImage, setRecipeImage] = useState("");
