import React, { useState, useEffect } from "react";
import "./Feed.css";
import InfiniteScroll from "react-infinite-scroll-component";
import PhotoBlock from "./PhotoBlock";
export default function Feed() {
  const beginingDate = new Date();
  beginingDate.setDate(beginingDate.getDate() - 10);
  const apiKey = process.env.REACT_APP_API_KEY || "DEMO_KEY";
  const [photosOfTheDay, setPhotosOfTheDay] = useState([]);
  const [startDate, setStartDate] = useState(beginingDate);
  const [endDate, setEndDate] = useState(new Date());

  //Fetch data from Nasa Api
  const fetchNasaData = (nasaKey, start, end) => {
    fetch(
      `https://api.nasa.gov/planetary/apod?start_date=${start
        .toJSON()
        .slice(0, 10)}&end_date=${end.toJSON().slice(0, 10)}&api_key=${nasaKey}`
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          console.log(response);
        }
      })
      .then((data) => {
        if (photosOfTheDay.length > 0) {
          setPhotosOfTheDay((prev) => [...prev, data.reverse()].flat());
        } else {
          setPhotosOfTheDay((prev) => [data.reverse()].flat());
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchNasaData(apiKey, startDate, endDate);
  }, []);

  const fetchMorePhotos = () => {
    setTimeout(() => {
      fetchNasaData(apiKey, startDate, endDate);
    }, 1500);
  };

  return (
    <div className="feed">
      <div className="titleBar">
        <div className="title">
          <b>&#128640; Spacetagram &#128640;</b>
        </div>
        <div className="subTitle">
          Brought to you through NASA's photo of the day API
        </div>
      </div>
      <InfiniteScroll
        dataLength={photosOfTheDay.length}
        hasMore={true}
        next={fetchMorePhotos}
        loader={<div>Loading...</div>}
      >
        {photosOfTheDay.map((photo, index) => {
          return <PhotoBlock photo={photo} key={index} />;
        })}
      </InfiniteScroll>
    </div>
  );
}
