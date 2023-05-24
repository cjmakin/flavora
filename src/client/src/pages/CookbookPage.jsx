import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useLoaderData } from "react-router-dom";
import { RecipeCard } from "../components/RecipeCard";

export function CookbookPage() {
  const [cookbook] = useState(useLoaderData);

  return (
    <Container className="page-top-padding">
      <h1 className="branding">Cookbook</h1>

      <Row>
        {cookbook.map((recipe) => {
          return (
            <Col>
              <RecipeCard recipe={recipe} />
            </Col>
          );
        })}
      </Row>
    </Container>
  );
}
