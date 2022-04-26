import React from "react";
import { Navbar, Container, Button } from "react-bootstrap";
import "./Navigation.css";

export default function Navigation({ getFaves, favs }) {
  return (
    <Navbar sticky="top">
      <Container>
        <Navbar.Brand className="appTitle">Spacetagram&#128640; </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Button variant="danger" onClick={getFaves}>
            {!favs ? "View My Likes" : "View Feed"}
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
