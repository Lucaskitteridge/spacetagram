import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import "./PhotoBlock.css";

export default function PhotoBlock({ photo, favs }) {
  const { url, title, date, explanation } = photo;
  const [selectedPhoto, setSelectedPhoto] = useState(photo);
  let likedInStorage = localStorage.getItem(selectedPhoto.date);

  //Work on toggle explanation if time

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
    setTimeout(() => {
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
    }, 300);
  };

  const onHover = () => {};

  return (
    <div className="photoBlock">
      <div className="photoContainer">
        <img src={url} alt={title} className="spacePhoto" />
      </div>
      <div className="descriptionText">
        <div className="dateAndTitle">
          <div className="dateAndTitle">
            {title} - <div className="date">&nbsp;{date}</div>
          </div>
          <div className="likeButton">
            <Button variant="outline" size="lg" onClick={onLike}>
              {selectedPhoto.liked ? (
                <span
                  className="material-symbols-outlined clicked "
                  onMouseEnter
                >
                  favorite
                </span>
              ) : (
                <span className="material-symbols-outlined">favorite</span>
              )}
            </Button>
          </div>
        </div>
        <div>
          <div className="explanation">{explanation}</div>
        </div>
      </div>
    </div>
  );
}
