import React from "react";
import { Navbar, Container, Button } from "react-bootstrap";

export default function Navigation() {
  return (
    <Navbar>
      <Container>
        <Navbar.Brand>&#128640; Spacetagram &#128640;</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            View My Likes
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
