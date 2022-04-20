import React, {useState} from "react";
import { Button } from "react-bootstrap";
import "./PhotoBlock.css";

export default function PhotoBlock({ photo }) {
  const { url, title, date, explanation } = photo;
  return (
    <div className="photoBlock">
      <div>
        <img src={url} alt={title} className="spacePhoto" />
      </div>
      <div className="descriptionText">
        <div className="dateAndTitle">
          {title} - {date}
        </div>
        <div className="explanation">Explanation: {explanation}</div>
        <div className="likeButton">
          <Button variant="outline-success">
            Like
          </Button>
        </div>
      </div>
    </div>
  );
}
