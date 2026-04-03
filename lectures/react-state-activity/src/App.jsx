import React, { act, useState, useEffect } from "react";
import Carousel from "./Carousel";
import Gallery from "./Gallery";

import "./App.css";

export default function App() {
  //Declare state variables
  const [activeIndex, setActiveIndex] = useState(0);
  const [photos, setPhotos] = useState([]);
  // Initialize as empty array ^

  async function getFlickrPhotos() {
    const url = galleries[activeIndex].endpoint;
    const response = await fetch(url);
    const data = await response.json();

    const photoURLs = data.map((obj) => obj.img_url);

    setPhotos(photoURLs);
  }

  // useEffect doesn't take async functions, so we have to use this unspeakable syntax
  useEffect(() => {
    getFlickrPhotos();
  }, [activeIndex]);

  const galleries = [
    {
      name: "Cats",
      endpoint: "https://www.apitutor.org/flickr/simple/?tags=cat",
    },
    {
      name: "Dogs",
      endpoint: "https://www.apitutor.org/flickr/simple/?tags=dog",
    },
    {
      name: "Birds",
      endpoint: "https://www.apitutor.org/flickr/simple/?tags=bird",
    },
    {
      name: "Frogs",
      endpoint: "https://www.apitutor.org/flickr/simple/?tags=frog",
    },
  ];

  return (
    <div>
      <h1>This is a Gallery of Photos</h1>

      {/* Sharing state variables between components */}
      <Gallery
        galleries={galleries}
        activeIndex={activeIndex}
        setActiveIndex={setActiveIndex}
      />
      <Carousel photos={photos} />
    </div>
  );
}
