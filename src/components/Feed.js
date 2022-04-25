import React, {useState, useEffect} from "react";
import useStateHelpers from "../helpers/stateHelpers";
import InfiniteScroll from "react-infinite-scroller";
import PhotoBlock from "./PhotoBlock";
import Navigation from "./Navigation";
import ScrollButton from "./ScrollButton"
import "./Feed.css";
export default function Feed() {
  const { getFaves, photosOfTheDay, favs, fetchMorePhotos } = useStateHelpers();

  //add calander componenent and toggle description up and down, button to scroll to top

  return (
    <>
    <ScrollButton />
      <Navigation getFaves={getFaves} favs={favs} />
      <div className="feed">
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
            loader={<div className="loading">Loading...</div>}
          >
            <div className="totalFeed">
              {photosOfTheDay.map((photo, index) => {
                return <PhotoBlock photo={photo} key={index} />;
              })}
            </div>
          </InfiniteScroll>
        )}
      </div>
    </>
  );
}
