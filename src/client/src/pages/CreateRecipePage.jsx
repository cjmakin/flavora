import { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useLoaderData } from "react-router-dom";
import { IngredientList } from "../components/IngredientList";
import { createRecipe, saveRecipe } from "../utilities";

export function CreateRecipePage() {
  let pantry = useLoaderData();
  let ingredientNames = pantry.map((ingredient) => {
    return ingredient.name;
  });

  const [selectedIngredients, setSelectedIngredients] = useState([
    ...ingredientNames,
  ]);
  const [selectedPreferences, setSelectedPreferences] = useState([]);
  const [cookingTime, setCookingTime] = useState("30 minutes");

  const handleCookingTimeChange = (event) => {
    setCookingTime(event.target.value);
  };

  const dietRestrictions = [
    "Vegetarian",
    "Pescatarian",
    "Vegan",
    "Nut-Free",
    "Gluten-Free",
  ];

  const cookingTimes = [
    "30 minutes",
    "1 hour",
    "1 hour 30 minutes",
    "2 hours",
    "2 hours 30 minutes",
    "3 hours",
    "3 hours 30 minutes",
    "4 hours",
  ];

  const handleSubmit = async () => {
    let selectedIngredientNames = selectedIngredients.map((ingredient) => {
      return ingredient.name;
    });
    let response = await createRecipe(
      selectedIngredientNames,
      selectedPreferences,
      cookingTime,
    );

    if (!response.success) {
      alert("Model Currently Overloaded! Please try again later.");
    } else {
      response = await saveRecipe(
        response.data.name,
        response.data.description,
        response.data.ingredients,
        response.data.food_preferences,
        response.data.cooking_time,
        response.data.img_url,
        response.data.instructions,
      );
      if (response) {
        alert("Recipe successfully saved!");
      }
    }
  };

  return (
    <Container className="page-top-padding">
      <h1 className="branding">Create Recipe</h1>
      <Form>
        <Row style={{ paddingTop: "20px" }}>
          {/* Ingredient checkboxes */}
          <Col style={{ paddingRight: "30px" }}>
            <Form.Group className="mb-3" controlId="ingredients">
              <Form.Label className="form-header">Ingredients</Form.Label>
              <IngredientList
                ingredients={pantry}
                handleIngredientClick={setSelectedIngredients}
                isChecked={true}
              />
            </Form.Group>
          </Col>

          {/* Food preferences checkboxes */}
          <Col style={{ marginLeft: "50px" }}>
            <Form.Group className="mb-3" controlId="restrictions">
              <Form.Label className="form-header">Preferences</Form.Label>
              {dietRestrictions.map((restriction, index) => {
                return (
                  <Form.Check
                    key={index}
                    type="checkbox"
                    id={restriction}
                    label={restriction}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedPreferences((
                          prev,
                        ) => [...prev, restriction]);
                      } else {
                        setSelectedPreferences((prev) =>
                          prev.filter((p) => p !== restriction)
                        );
                      }
                    }}
                  />
                );
              })}
            </Form.Group>
          </Col>
        </Row>

        {/* Cooking time selection */}
        <Row>
          <Col>
            <Form.Group className="sm-3" controlId="cookingTime">
              <Form.Label className="form-header">Cooking Time</Form.Label>
              <Form.Select
                value={cookingTime}
                onChange={handleCookingTimeChange}
              >
                {cookingTimes.map((time, index) => {
                  return <option value={time}>{time}</option>;
                })}
              </Form.Select>
            </Form.Group>
          </Col>

          <Col>
          </Col>
        </Row>
        <Button
          style={{ marginTop: "50px" }}
          className="button-primary"
          onClick={handleSubmit}
        >
          Create
        </Button>
      </Form>
    </Container>
  );
}
