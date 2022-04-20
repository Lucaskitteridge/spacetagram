import React from "react";
export default function PhotoBlock(props) {
  const {url, title, date, explanation } = props.photo
  return (
    <div className="photoBlock">
      <div>
        <img
          src={url}
          alt={title}
          className="spacePhoto"
        />
      </div>
      <div className="descriptionText">
        <div className="dateAndTitle">
          {title} - {date}
        </div>
        <div className="explanation">
          Explanation: {explanation}
        </div>
        <div className="likeButton">
          {/* <Button onClick={likeButton} variant="outline-success">
            {selectedPhoto.liked === true ? "Unlike" : "Like"}
          </Button> */}
        </div>
      </div>
    </div>
  );
}
