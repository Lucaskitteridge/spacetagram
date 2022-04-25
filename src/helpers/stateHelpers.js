import { useEffect, useState } from "react";
import moment from "moment";

export default function useStateHelpers() {
  const apiKey = process.env.REACT_APP_API_KEY || "DEMO_KEY";
  const [photosOfTheDay, setPhotosOfTheDay] = useState([]);
  const [favs, setFavs] = useState(false);
  const [startDate, setStartDate] = useState(
    moment().subtract(5, "days").format().slice(0, 10)
  );
  const [endDate, setEndDate] = useState(moment().format().slice(0, 10));

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

  //Get request to fetch appointments for each day
  useEffect(() => {
    setTimeout(() => {
      fetchNasaData(apiKey, startDate, endDate);
    }, 1500);
  }, []);

  return {
    photosOfTheDay,
    favs,
    setFavs,
    endDate,
    setEndDate,
    startDate,
    setStartDate,
    getFaves,
    fetchMorePhotos
  };
}
