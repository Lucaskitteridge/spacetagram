import React from "react";
import useStateHelpers from "../helpers/stateHelpers";
import InfiniteScroll from "react-infinite-scroller";
import PhotoBlock from "./PhotoBlock";
import Navigation from "./Navigation";
import ScrollButton from "./ScrollButton";
import CalanderButton from './CalanderButton'
import { InfinitySpin } from "react-loader-spinner";
import "./Feed.css";
export default function Feed() {
  const {
    getFaves,
    photosOfTheDay,
    favs,
    fetchMorePhotos,
    loading,
  } = useStateHelpers();

  //add calander componenent

  return (
    <>
      <ScrollButton />
      <CalanderButton />
      <Navigation getFaves={getFaves} favs={favs} />
      {loading && <InfinitySpin color="red" />}
      <div className="feed">
        {favs && (
          <div className="favFeed">
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
            loader={<InfinitySpin color="red" />}
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
