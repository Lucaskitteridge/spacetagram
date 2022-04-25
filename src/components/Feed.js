import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import moment from "moment";
import "./Feed.css";
import useStateHelpers from '../helpers/stateHelpers'
import InfiniteScroll from "react-infinite-scroller";
import PhotoBlock from "./PhotoBlock";
export default function Feed() {

  const {
    getFaves,
    favs,
    photosOfTheDay,
    fetchMorePhotos
  } = useStateHelpers()

  return (
    <div className="feed">
      <Button onClick={getFaves}>View my Fav's</Button>
      {favs && (
        <div className="totalFeed">
          {photosOfTheDay
            .sort(function (a, b) {
              return new Date(b.date) - new Date(a.date);
            })
            .map((photo, index) => {
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
