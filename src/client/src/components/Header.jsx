import { Button, Container, Form, Nav, Navbar } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { UserContext } from "../App";
import { signOut } from "../utilities";
import SignInPopup from "./SignInPopup";
import CreateAccountPopup from "./CreateAccountPopup";
import logo from "../assets/logo.svg";

export function Header() {
  const [showSignInPopup, setShowSignInPopup] = useState(false);
  const [showCreateAccountPopup, setShowCreateAccountPopup] = useState(false);
  const { user } = useContext(UserContext);
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleCreateRecipeClick = () => {
    navigate("/create_recipe/");
  };

  const handleSignInClick = () => {
    setShowSignInPopup(true);
  };

  const handleCreateAccountClick = () => {
    setShowCreateAccountPopup(true);
  };

  const handleSignInPopupClose = () => {
    setShowSignInPopup(false);
  };

  const handleCreateAccountPopupClose = () => {
    setShowCreateAccountPopup(false);
  };

  const handleLogOutClick = async () => {
    await signOut(setUser);
    navigate("/");
    window.location.reload();
  };

  return (
    <Container>
      <Navbar bg="light" expand="lg" fixed="top" className="navbar">
        <Navbar.Brand className="branding" href="/">
          <img
            src={logo}
            width="50px"
            height="50px"
            className="d-inline-block align-top"
            alt="Flavora logo"
          />{"     "}
          Flavora
        </Navbar.Brand>
        <Form className="d-flex">
          <Form.Control
            type="search"
            placeholder="Search Recipes"
            className="me-2 search"
            aria-label="Search"
          />
        </Form>

        {user === undefined
          ? (
            <>
              {/* User is signed out  */}
              <Button
                onClick={handleCreateAccountClick}
                className="button-secondary ms-auto"
                style={{ marginRight: "30px", height: "50px" }}
              >
                Create Account
              </Button>{"    "}
              <Button
                onClick={handleSignInClick}
                className="button-primary"
                style={{ marginRight: "30px" }}
              >
                Sign In
              </Button>
              {showSignInPopup && (
                <SignInPopup
                  show={showSignInPopup}
                  onHide={handleSignInPopupClose}
                />
              )}
              {showCreateAccountPopup && (
                <CreateAccountPopup
                  show={showCreateAccountPopup}
                  onHide={handleCreateAccountPopupClose}
                />
              )}
            </>
          )
          : (
            <>
              {/* User is signed in  */}
              <Nav className="secondary-font ms-auto navbar-links">
                <Nav.Link
                  onClick={() => {
                    navigate("/pantry/");
                  }}
                  style={{ paddingRight: "30px" }}
                  href="#"
                >
                  My Pantry
                </Nav.Link>
                <Nav.Link href="#">My Cookbook</Nav.Link>
              </Nav>
              <Button
                onClick={handleCreateRecipeClick}
                className="button-secondary"
                style={{ marginRight: "30px", height: "50px" }}
              >
                Create Recipe
              </Button>{"    "}
              <Button
                onClick={handleLogOutClick}
                className="button-primary"
                style={{ marginRight: "30px" }}
              >
                Log Out
              </Button>
            </>
          )}
      </Navbar>
    </Container>
  );
}
