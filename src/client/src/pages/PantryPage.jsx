import axios from "axios";
import { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useLoaderData } from "react-router-dom";
import { IngredientList } from "../components/IngredientList";
import { addIngredients, removeIngredients } from "../utilities";

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
  const [pantry, setPantry] = useState(useLoaderData);
  const [searchValue, setSearchValue] = useState("");
  const [searchCount, setSearchCount] = useState(0);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [selectedSearchResults, setSelectedSearchResults] = useState([]);
  const [selectedIngredients, setSelectedIngredients] = useState([]);

  const handleRemoveIngredients = async () => {
    let response = await removeIngredients(selectedIngredients);
    if (response) {
      setPantry(response.data.data);
      setSelectedIngredients([]);
    }
  };

  const handleAddIngredients = async () => {
    let response = await addIngredients(selectedSearchResults);
    if (response) {
      setPantry(response.data.data);
      setSelectedSearchResults([]);
    }
  };

  const handleSearch = async (event) => {
    event.preventDefault();
    if (searchValue === "" && selectedFilters.length === 0) {
      return;
    }

    let response = await searchIngredients(searchValue, selectedFilters);
    setSearchResults(response.data.results);
    setSearchCount(response.data.count);
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

      <Row className="container-border-top" style={{ marginTop: "50px" }}>
        <h1
          style={{ paddingTop: "40px", paddingBottom: "30px" }}
          className="branding"
        >
          Add Ingredients
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
              <Row>
                <Form.Control
                  type="search"
                  placeholder="Search Ingredients"
                  className="me-2 search"
                  aria-label="Search"
                  onChange={handleChange}
                />
                <Button className="button-primary" type="submit">
                  Search
                </Button>
              </Row>
              {searchCount > 0
                ? (
                  <>
                    <Form.Label
                      style={{ paddingTop: "30px", paddingBotttom: "30px" }}
                      className="form-header"
                    >
                      {searchCount} Result(s):
                    </Form.Label>
                    <IngredientList
                      ingredients={searchResults}
                      handleIngredientClick={setSelectedSearchResults}
                      isChecked={false}
                    />

                    <Button
                      style={{ marginTop: "30px" }}
                      onClick={handleAddIngredients}
                      className="button-primary"
                    >
                      Add Selected
                    </Button>
                  </>
                )
                : (
                  <h4 style={{ paddingTop: "30px" }}>
                    No results found
                  </h4>
                )}
            </Form.Group>
          </Col>
        </Form>
      </Row>
    </Container>
  );
}
