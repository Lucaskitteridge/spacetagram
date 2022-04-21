import React, { useState } from "react";
import { Button } from "react-bootstrap";
import "./PhotoBlock.css";

export default function PhotoBlock({ photo }) {
  const { url, title, date, explanation } = photo;
  const [like, setLike] = useState(false)

  const onLike = function() {
    setLike(!like)
  }

  return (
    <div className="photoBlock">
      <div>
        <img src={url} alt={title} className="spacePhoto" />
      </div>
      <div className="descriptionText">
        <div className="dateAndTitle">
          {title} - {date}
        </div>
        <div className="explanation">{explanation}</div>
        <div className="likeButton">
          <Button variant="outline-success" onClick={onLike}>
            {like ? 'Unlike' : "Like"}
          </Button>
        </div>
      </div>
    </div>
  );
}
