import { Col, Container, Image, Row } from "react-bootstrap";
import { useLoaderData } from "react-router-dom";
import { useContext, useState } from "react";
import { UserContext } from "../App";
import timer_icon from "../assets/timer_icon.png";

// TODO:
// 1. Add a button to the recipe page that allows the user to add the recipe to their cookbook
// 2. Add a cooking time icon
// 3. Add a divider between the image and recipe name and the instructions
// 4. Make the description the same width as the Image
// 5. Center the Recipe name and user name in the column
// 6. Fix formatting on the Instructions and Ingredient lists

export function RecipePage() {
  const [recipe] = useState(useLoaderData);

  const imagePath = recipe.img_path;
  const mediaPath = "/src";
  const index = imagePath.indexOf(mediaPath);
  const imagePathRelativeToMedia = imagePath.slice(index + mediaPath.length);

  const instructions = recipe.instructions.split("\n").filter(
    (instruction) => {
      return instruction !== "";
    },
  );

  const ingredients = recipe.ingredients.split("\n");

  return (
    <Container className="page-top-padding">
      <Row className="container-border-bottom">
        <Col
          className="align-items-center justify-content-center"
          style={{ position: "relative" }}
        >
          <div className="recipe-page-name">{recipe.name}</div>

          <div style={{ display: "inline" }}>
            <div style={{ position: "absolute", bottom: "0" }}>
              <img
                className="timer-icon"
                src={timer_icon}
              />
              {recipe.cooking_time}
            </div>
          </div>
        </Col>

        <Col>
          <Image
            thumbnail
            classname="recipe-page-image"
            src={imagePathRelativeToMedia}
          />
          <div className="recipe-page-description">{recipe.description}</div>
        </Col>
      </Row>

      <Row style={{ paddingTop: "20px" }}>
        <Col>
          <div className="recipe-page-instructions-header">Instructions</div>
          {instructions.map((instruction, index) => (
            <>
              <div className="recipe-page-instruction-steps" key={index}>
                Step {index + 1}
              </div>
              <div className="recipe-page-instructions" key={index}>
                {instruction}
              </div>
            </>
          ))}
        </Col>
        <Col>
          <div className="recipe-page-ingredients-header">Ingredients</div>
          {ingredients.map((ingredient, index) => (
            <>
              <div
                className="recipe-page-ingredients"
                style={{ paddingBottom: "10px" }}
                key={index}
              >
                {ingredient}
              </div>
            </>
          ))}
        </Col>
      </Row>
    </Container>
  );
}
