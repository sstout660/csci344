import React, { use } from "react";
import { useState } from "react";
import "./Carousel.css";

export default function Carousel({ photos }) {
  //Declare state variable [state variable, state variable setter (also redraws screen)]
  const [index, setIndex] = useState(0);

  //helper functions:
  function next() {
    if (index === photos.length - 1) {
      setIndex(0);
    } else {
      setIndex(index + 1);
    }
  }

  function previous() {
    if (index === 0) {
      setIndex(photos.length - 1);
    } else {
      setIndex(index - 1);
    }
  }

  return (
    <div className="carousel">
      {/* display the first image in the gallery array below */}
      {/* also display a "Photo X of Y" message below the image */}
      <img src={photos[index]} />
      <p>
        Showing photo {index + 1} of {photos.length}.
      </p>
      <button onClick={previous}>Prev</button>
      <button onClick={next}>Next</button>
    </div>
  );
}
