import React, { useState, useEffect } from "react";
import { Button, Accordion } from "react-bootstrap";
import "./PhotoBlock.css";

export default function PhotoBlock({ photo, favs }) {
  const { url, title, date, explanation } = photo;
  const [selectedPhoto, setSelectedPhoto] = useState(photo);
  let likedInStorage = localStorage.getItem(selectedPhoto.date);
  const [open, setOpen] = useState(false);

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
      <div className="photoContainer">
        <img src={url} alt={title} className="spacePhoto" />
      </div>
      <div className="descriptionText">
        <div className="innerContainer">
          <div className="dateAndTitle">
            <div className="dateAndTitle">
              {title} - <div className="date">&nbsp;{date}</div>
            </div>
            <div className="likeButton">
              <Button
                className="outline"
                variant="outline"
                size="lg"
                onClick={onLike}
              >
                {selectedPhoto.liked ? (
                  <span className="material-symbols-outlined clicked ">
                    favorite
                  </span>
                ) : (
                  <span className="material-symbols-outlined">favorite</span>
                )}
              </Button>
            </div>
          </div>
          <div>
            <Accordion alwaysOpen="true">
              <Accordion.Item eventKey="0">
                <Accordion.Header
                  className="toggleName"
                  onClick={() => setOpen(!open)}
                >
                  {!open ? "View Description" : "Hide Description"}
                </Accordion.Header>
                <Accordion.Body className="explanation">
                  {explanation}
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </div>
        </div>
      </div>
    </div>
  );
}
