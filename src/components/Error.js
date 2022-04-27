import React from "react";
import "./Error.css";

export default function Error({ error }) {
  return (
    <div className="errorLoading">
      <div className="errorTitle">Error Loading Photos</div>
      <div className="errorSubTitle">{error}</div>
    </div>
  );
}
