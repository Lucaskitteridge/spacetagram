import React from "react";
import useStateHelpers from "../helpers/stateHelpers";
import InfiniteScroll from "react-infinite-scroller";
import PhotoBlock from "./PhotoBlock";
import Navigation from "./Navigation";
import Error from "./Error";
import ScrollButton from "./ScrollButton";
import { InfinitySpin } from "react-loader-spinner";
import "./Feed.css";
export default function Feed() {
  const {
    getFaves,
    photosOfTheDay,
    favs,
    fetchMorePhotos,
    loading,
    error,
  } = useStateHelpers();

  //add calander componenent

  return (
    <>
      <ScrollButton />
      <Navigation getFaves={getFaves} favs={favs} />
      {!error && loading && <InfinitySpin color="red" />}
      {error && <Error error={error} />}
      <div className="feed">
        {favs && (
          <div className="favFeed">
            {photosOfTheDay.length > 0 ?
            photosOfTheDay
              .sort(function (a, b) {
                return new Date(b.date) - new Date(a.date);
              })
              .map((photo, index) => {
                return <PhotoBlock photo={photo} key={index} />;
              }) : <Error error={"No selected Favourites, Please favourite photos before returning"}/>}
          </div>
        )}
        {!error && !favs && (
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
