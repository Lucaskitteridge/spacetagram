import { useEffect, useState } from "react";
import moment from "moment";

export default function useStateHelpers() {
  const apiKey = process.env.REACT_APP_API_KEY || "DEMO_KEY";
  const [photosOfTheDay, setPhotosOfTheDay] = useState([]);
  const [favs, setFavs] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showTopBtn, setShowTopBtn] = useState(false);
  const [endDate, setEndDate] = useState(moment().format().slice(0, 10));
  const [startDate, setStartDate] = useState(
    moment().subtract(5, "days").format().slice(0, 10)
  );

  //Get request to fetch appointments for each day
  useEffect(() => {
    setTimeout(() => {
      fetchNasaData(startDate, endDate);
    }, 1500);
  }, []);

  //Fetch data from Nasa Api
  const fetchNasaData = (start, end) => {
    fetch(
      `https://api.nasa.gov/planetary/apod?start_date=${start}&end_date=${end}&api_key=${apiKey}`
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
        setLoading(false);
        console.log(photosOfTheDay)
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchMorePhotos = () => {
    fetchNasaData(startDate, endDate);
  };

  const fetchNasaFaves = (date) => {
    fetch(`https://api.nasa.gov/planetary/apod?date=${date}&api_key=${apiKey}`)
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
  //2 states, 1 setState, 1 callback
  const getFaves = () => {
    setPhotosOfTheDay([]);
    if (!favs) {
      setTimeout(() => {
        setFavs(!favs);
        const local = { ...localStorage };
        setPhotosOfTheDay([]);
        for (const [date, liked] of Object.entries(local)) {
          if (liked === "true") {
            fetchNasaFaves(date);
          }
        }
      }, 1500);
    } else {
      let newStart = moment().subtract(5, "days").format().slice(0, 10);
      let newEnd = moment().format().slice(0, 10);
      setStartDate(newStart);
      setEndDate(newEnd);
      fetchNasaData(newStart, newEnd);
      setFavs(!favs);
    }
  };

  return {
    photosOfTheDay,
    favs,
    setFavs,
    endDate,
    setEndDate,
    startDate,
    setStartDate,
    getFaves,
    fetchMorePhotos,
    fetchNasaData,
    loading,
    showTopBtn,
    setShowTopBtn,
  };
}
