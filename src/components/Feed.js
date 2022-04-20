import React, { useState, useEffect } from "react";
export default function Feed() {
  const [photosOfTheDay, setPhotosOfTheDay] = useState([]);
  const apiKey = process.env.REACT_APP_API_KEY || "DEMO_KEY";

  //Fetch data from Nasa Api
  const fetchNasaData = (nasaKey) => {
    fetch(`https://api.nasa.gov/planetary/apod?&api_key=${nasaKey}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          console.log(response)
        }
      })
      .then((data) => setPhotosOfTheDay(data))
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchNasaData(apiKey);
    console.log(photosOfTheDay)
  }, []);

  return <div className="feed"></div>;
}
