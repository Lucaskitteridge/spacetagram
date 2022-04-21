import React, { useState, useEffect } from "react";
import "./Feed.css";
import InfiniteScroll from "react-infinite-scroller";
import moment from 'moment'
import PhotoBlock from "./PhotoBlock";
export default function Feed() {
  const apiKey = process.env.REACT_APP_API_KEY || "DEMO_KEY";
  const [photosOfTheDay, setPhotosOfTheDay] = useState([]);
  const [startDate, setStartDate] = useState(moment().subtract(5, 'days').format().slice(0, 10));
  const [endDate, setEndDate] = useState(moment().format().slice(0, 10));

  //Fetch data from Nasa Api
  const fetchNasaData = (nasaKey, start, end) => {
    fetch(
      `https://api.nasa.gov/planetary/apod?start_date=${start
        }&end_date=${end}&api_key=${nasaKey}`
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
          let newData = data.reverse()
          setPhotosOfTheDay((prev) => [...prev, newData].flat());
        } else {
          setPhotosOfTheDay(data.reverse());
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
    console.log('here')
    setTimeout(() => {
      setStartDate(moment(startDate).subtract(6, 'days').format().slice(0, 10))
      setEndDate(moment(endDate).subtract(6, 'days').format().slice(0, 10))
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
        className="scrollableFeed"
        pagestart={0}
        hasMore={true}
        loadMore={fetchMorePhotos}
        initialLoad={false}
        loader={<div>Loading...</div>}
      >
        {photosOfTheDay.map((photo, index) => {
          return <PhotoBlock photo={photo} key={index} />;
        })}
      </InfiniteScroll>
    </div>
  );
}
