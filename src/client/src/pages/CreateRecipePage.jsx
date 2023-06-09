import { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { IngredientList } from "../components/IngredientList";
import { useLoaderData, useNavigate } from "react-router-dom";
import { createImage, createRecipe, saveRecipe } from "../utilities";
import { ClockLoader } from "react-spinners";

export function CreateRecipePage() {
  let pantry = useLoaderData();

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("Creating Recipe...");
  const [selectedIngredients, setSelectedIngredients] = useState([
    ...pantry,
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

    setLoading(true);
    let response = await createRecipe(
      selectedIngredientNames,
      selectedPreferences,
      cookingTime,
    );

    let recipeDict = {
      "name": response.data.name,
      "description": response.data.description,
      "ingredients": response.data.ingredients,
      "food_preferences": response.data.food_preferences,
      "cooking_time": response.data.cooking_time,
      "instructions": response.data.instructions,
    };

    if (!response.success) {
      setLoading(false);
      alert("Model Currently Overloaded! Please try again later.");
    } else {
      // Create image
      setLoadingText("Creating Image...");
      response = await createImage(response.data.description);
      if (!response.success) {
        setLoading(false);
        alert("Model Currently Overloaded! Please try again later.");
      } else {
        // Save recipe
        recipeDict["img_url"] = response.data.img_url;
        setLoadingText("Saving Recipe...");
        response = await saveRecipe(
          recipeDict.name,
          recipeDict.description,
          recipeDict.ingredients,
          recipeDict.food_preferences,
          recipeDict.cooking_time,
          recipeDict.img_url,
          recipeDict.instructions,
        );

        if (response) {
          navigate("/recipes/" + response.data.id + "/");
          setLoading(false);
        }
      }
    }
  };

  return (
    <>
      {loading === false
        ? (
          <Container className="page-top-padding">
            <h1 className="branding">Create Recipe</h1>
            <Form>
              <Row style={{ paddingTop: "20px" }}>
                {/* Ingredient checkboxes */}
                <Col style={{ paddingRight: "30px" }}>
                  <Form.Group
                    className="mb-3"
                    controlId="ingredients"
                  >
                    <Form.Label className="form-header">
                      Ingredients
                    </Form.Label>
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
                    <Form.Label className="form-header">
                      Cooking Time
                    </Form.Label>
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
        )
        : (
          // Loading screen
          <>
            <Container style={{ paddingTop: "200px" }}>
              <h1
                style={{
                  textAlign: "center",
                }}
                className="branding fade-in"
              >
                {loadingText}
              </h1>
            </Container>
            <Container className="spinner">
              <ClockLoader
                color={"#258E00"}
                loading={loading}
                size={150}
                className="pulse"
              >
              </ClockLoader>
            </Container>
          </>
        )}
    </>
  );
}
