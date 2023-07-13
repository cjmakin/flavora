import { Col, Container, Image, Row } from "react-bootstrap";
``;
import logo from "../assets/logo.svg";

export function HomePage() {
  return (
    <Container className="page-top-padding">
      <Row>
        <Col>
        </Col>
      </Row>
      <Image src={logo} fluid />
    </Container>
  );
}
