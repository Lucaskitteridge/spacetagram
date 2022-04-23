import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import moment from "moment";
import "./Feed.css";
import InfiniteScroll from "react-infinite-scroller";
import PhotoBlock from "./PhotoBlock";
export default function Feed() {
  const apiKey = process.env.REACT_APP_API_KEY || "DEMO_KEY";
  const [photosOfTheDay, setPhotosOfTheDay] = useState([]);
  const [favs, setFavs] = useState(false);
  const [loading, setLoading] = useState(true);
  const [startDate, setStartDate] = useState(
    moment().subtract(5, "days").format().slice(0, 10)
  );
  const [endDate, setEndDate] = useState(moment().format().slice(0, 10));

  //Get only the previous favs feature?
  //Maybe sort the photos option?

  //Fetch data from Nasa Api
  const fetchNasaData = (nasaKey, start, end) => {
    fetch(
      `https://api.nasa.gov/planetary/apod?start_date=${start}&end_date=${end}&api_key=${nasaKey}`
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
          let newData = data.reverse();
          setPhotosOfTheDay((prev) => [...prev, newData].flat());
        } else {
          setPhotosOfTheDay(data.reverse());
        }
        let newStart = moment(startDate)
          .subtract(6, "days")
          .format()
          .slice(0, 10);
        let newEnd = moment(endDate).subtract(6, "days").format().slice(0, 10);
        setStartDate(newStart);
        setEndDate(newEnd);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchNasaFaves = (nasaKey, date) => {
    fetch(`https://api.nasa.gov/planetary/apod?date=${date}&api_key=${nasaKey}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          console.log(response);
        }
      })
      .then((data) => {
        setPhotosOfTheDay((prev) => [...prev, data].flat());
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    setTimeout(() => {
      fetchNasaData(apiKey, startDate, endDate);
    }, 1500);
  }, []);

  const fetchMorePhotos = () => {
    fetchNasaData(apiKey, startDate, endDate);
  };

  const getFaves = () => {
    if (!favs) {
      setFavs(!favs);
      setPhotosOfTheDay([]);
      const local = { ...localStorage };
      for (const [key, value] of Object.entries(local)) {
        if (value === "true") {
          fetchNasaFaves(apiKey, key);
        }
      }
    } else {
      let newStart = moment().subtract(5, "days").format().slice(0, 10);
      let newEnd = moment().format().slice(0, 10);
      setStartDate(newStart);
      setEndDate(newEnd);
      setPhotosOfTheDay([]);
      fetchNasaData(apiKey, newStart, newEnd);
      setFavs(!favs);
    }
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
      <Button onClick={getFaves}>View my Fav's</Button>
      {favs && (
        <div className="totalFeed">
          {photosOfTheDay.sort(function(a, b){
            return new Date(b.date) - new Date(a.date)
          }).map((photo, index) => {
            return <PhotoBlock photo={photo} key={index} />;
          })}
        </div>
      )}
      {!favs && (
        <InfiniteScroll
          className="scrollableFeed"
          pageStart={0}
          hasMore={favs ? false : true}
          loadMore={fetchMorePhotos}
          initialLoad={false}
          loader={<div>Loading</div>}
        >
          <div className="totalFeed">
            {photosOfTheDay.map((photo, index) => {
              return <PhotoBlock photo={photo} key={index} />;
            })}
          </div>
        </InfiniteScroll>
      )}
    </div>
  );
}
