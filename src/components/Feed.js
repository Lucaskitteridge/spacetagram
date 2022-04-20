import React from "react";
export default function Feed() {
  const apiKey = process.env.REACT_APP_API_KEY || "DEMO_KEY";

  //Fetch data from Nasa Api
  const fetchNasaData = () => {
    fetch(`https://api.nasa.gov/planetary/apod?&api_key=${apiKey}`)
      .then((response) => {
        console.log(response);
        if (response.ok) {
          return response.json();
        }
      })
      .then((data) => console.log(data))
      .catch((err) => {
        console.log(err);
      });
  };

  fetchNasaData();

  return <div className="feed"></div>;
}
