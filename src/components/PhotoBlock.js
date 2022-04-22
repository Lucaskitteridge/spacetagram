import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import "./PhotoBlock.css";

export default function PhotoBlock({ photo }) {
  const { url, title, date, explanation } = photo;
  const [selectedPhoto, setSelectedPhoto] = useState(photo);
  let likedInStorage = localStorage.getItem(selectedPhoto.date);

  //Uses likes in local storage to tell if the photo is previously liked
  useEffect(() => {
    if (likedInStorage === "false") {
      setSelectedPhoto((prevPhoto) => {
        return {
          ...prevPhoto,
          liked: false,
        };
      });
    } else if (likedInStorage === "true") {
      setSelectedPhoto((prevPhoto) => {
        return {
          ...prevPhoto,
          liked: true,
        };
      });
    }
  }, []);

  //Sets local storage for likes
  const onLike = () => {
    if (!selectedPhoto.liked) {
      setSelectedPhoto((prevPhoto) => {
        return {
          ...prevPhoto,
          liked: true,
        };
      });
      localStorage.setItem(selectedPhoto.date, true);
    } else {
      setSelectedPhoto((prevPhoto) => {
        return {
          ...prevPhoto,
          liked: false,
        };
      });
      localStorage.setItem(selectedPhoto.date, false);
    }
  };
  

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
            {selectedPhoto.liked ? 'Like' : "Unlike"}
          </Button>
        </div>
      </div>
    </div>
  );
}
