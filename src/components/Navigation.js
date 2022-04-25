import React from "react";
import { Navbar, Container, Button } from "react-bootstrap";
import useStateHelpers from "../helpers/stateHelpers";

export default function Navigation({getFaves}) {
  
  return (
    <Navbar>
      <Container>
        <Navbar.Brand>&#128640; Spacetagram &#128640;</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
            <Button variant="danger" onClick={getFaves}>View My Likes</Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
