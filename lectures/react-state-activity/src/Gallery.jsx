import React, { use } from "react";
import { useState } from "react";

// pass in the state variable and the setter (lives in App)
export default function Gallery({ galleries, activeIndex, setActiveIndex }) {
  //Declare state variable [state variable, state variable setter (also redraws screen)]

  //helper functions:
  function setGallery(idx) {
    setActiveIndex(idx);
  }

  return (
    <div className="gallery">
      {galleries.map(function (gallery, idx) {
        return (
          // Passing argument into button (rly gross)
          <button
            onClick={() => {
              setGallery(idx);
            }}
          >
            {gallery.name} {idx === activeIndex ? " - Active" : ""}
          </button>
        );
      })}
    </div>
  );
}
