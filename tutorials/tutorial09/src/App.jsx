import React from "react";
import { Image, TimePicker, Calendar } from "antd";
import dayjs from "dayjs";

import Card from "./components/Card.jsx";
import AntCard from "./components/AntCard.jsx";

export default function App() {
  const format = "HH:mm";
  const onPanelChange = (value, mode) => {
    console.log(value.format("YYYY-MM-DD"), mode);
  };
  return (
    <>
      <header>
        <h1>My First App</h1>
      </header>
      <main>
        <p>Hello React!</p>
        <Card
          name="Sample item"
          image_url="https://picsum.photos/id/237/400/300"
          description="A short description goes here."
        />
        <Card
          name="A long picture"
          image_url="https://picsum.photos/id/260/200/800"
          description="This one is quite long"
        />
        <AntCard
          name="A doggie"
          image_url="https://picsum.photos/id/237/400/300"
          description="Words go here"
        />
        <AntCard
          name="A long picture"
          image_url="https://picsum.photos/id/260/200/800"
          description="This one is quite long"
        />
        <TimePicker defaultValue={dayjs("12:08", format)} format={format} />
        <Calendar onPanelChange={onPanelChange} />
      </main>
    </>
  );
}
