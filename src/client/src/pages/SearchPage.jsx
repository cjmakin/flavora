import { useLoaderData } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";
import { RecipeCard } from "../components/RecipeCard";

export function SearchPage() {
  const searchResults = useLoaderData();

  return (
    <Container className="page-top-padding">
      {searchResults.data.count === 0
        ? (
          <h4 style={{ paddingTop: "30px" }}>
            No results found
          </h4>
        )
        : (
          <Row>
            <h4 style={{ paddingTop: "30px" }}>
              {searchResults.data.count} results found
            </h4>
            {searchResults.data.results.map((recipe) => {
              return (
                <>
                  <RecipeCard recipe={recipe} />
                </>
              );
            })}
          </Row>
        )}
    </Container>
  );
}
