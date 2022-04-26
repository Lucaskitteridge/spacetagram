import React, { useState } from "react";
import { FaCalendarDay } from "react-icons/fa";
import useStateHelpers from "../helpers/stateHelpers";
import { Offcanvas } from "react-bootstrap";
import "./CalanderButton.css";

export default function CalanderButton() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <div className="top-to-btm">
        <FaCalendarDay className="icon-position icon-style" onClick={handleShow}/>
      </div>
      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Select Dates</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          Some text as placeholder. In real life you can have the elements you
          have chosen. Like, text, images, lists, etc.
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}
