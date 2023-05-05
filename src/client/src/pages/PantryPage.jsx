import axios from "axios";
import { useContext, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useLoaderData } from "react-router-dom";
import { IngredientList } from "../components/IngredientList";
import { UserContext } from "../App";
import { addIngredients } from "../utilities";

const foodGroups = [
  "Animal foods",
  "Pulses",
  "Eggs",
  "Cereals and cereal products",
  "Milk and milk products",
  "Coffee and coffee products",
  "Baking goods",
  "Aquatic foods",
  "Snack foods",
  "Confectioneries",
  "Cocoa and cocoa products",
  "Soy",
  "Herbs and spices",
  "Vegetables",
  "Herbs and Spices",
  "Dishes",
  "Gourds",
  "Teas",
  "Fats and oils",
];

const searchIngredients = async (query, filters) => {
  try {
    const response = await axios.get("/api/ingredients/", {
      "params": {
        "query": query,
        "filters": filters,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export function PantryPage() {
  const { user } = useContext(UserContext);
  const [pantry, setPantry] = useState(useLoaderData);
  const [searchValue, setSearchValue] = useState("");
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [selectedSearchResults, setSelectedSearchResults] = useState([]);

  const [selectedIngredients, setSelectedIngredients] = useState([]);

  const handleRemoveIngredients = () => {
    console.log(selectedIngredients);
  };

  const handleAddIngredients = async () => {
    let response = await addIngredients(selectedSearchResults);
    if (response) {
      setPantry(response.data.data);
    }
  };

  const handleSearch = async (event) => {
    event.preventDefault();
    if (searchValue === "") {
      return;
    }

    let response = await searchIngredients(searchValue, selectedFilters);
    setSearchResults(response.data.results);
  };

  const handleChange = (event) => {
    setSearchValue(event.target.value);
  };

  return (
    <Container className="page-top-padding">
      <h1 className="branding">Pantry</h1>
      <Row style={{ paddingTop: "20px" }}>
        <IngredientList
          ingredients={pantry}
          handleIngredientClick={setSelectedIngredients}
          isChecked={false}
        />

        <Button
          style={{ marginTop: "30px" }}
          className="button-secondary"
          onClick={handleRemoveIngredients}
        >
          Remove Selected
        </Button>
      </Row>

      <Row className="container-border" style={{ marginTop: "50px" }}>
        <h1
          style={{ paddingTop: "40px", paddingBottom: "30px" }}
          className="branding"
        >
          Search Ingredients
        </h1>
        <Form onSubmit={handleSearch} className="d-flex">
          <Col md="auto">
            {/* checkboxes with all food groups */}
            <Form.Group
              style={{ width: "400px" }}
              className="mb-3"
              controlId="foodGroups"
            >
              <Form.Label className="form-header">Filters</Form.Label>
              {foodGroups.map((foodGroup, index) => {
                return (
                  <Form.Check
                    type="checkbox"
                    label={foodGroup}
                    key={index}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedFilters((
                          prev,
                        ) => [...prev, foodGroup]);
                      } else {
                        setSelectedFilters((prev) =>
                          prev.filter((p) => p !== foodGroup)
                        );
                      }
                    }}
                  />
                );
              })}
            </Form.Group>
          </Col>

          <Col style={{ paddingLeft: "50px" }}>
            <Form.Group className="mb-3">
              <Form.Control
                type="search"
                placeholder="Search Ingredients"
                className="me-2 search"
                aria-label="Search"
                onChange={handleChange}
              />
              <Form.Label
                style={{ paddingTop: "30px", paddingBotttom: "30px" }}
                className="form-header"
              >
                Results:
              </Form.Label>
              {searchResults.length > 0
                ? (
                  <IngredientList
                    ingredients={searchResults}
                    handleIngredientClick={setSelectedSearchResults}
                    isChecked={false}
                  />
                )
                : <p>No results found</p>}
              <Button
                style={{ marginTop: "30px" }}
                onClick={handleAddIngredients}
                className="button-primary"
              >
                Add Selected
              </Button>
            </Form.Group>
          </Col>
        </Form>
      </Row>
    </Container>
  );
}
