import React from "react";
import "../App.css";

const ImageView = () => {
  const items = { id: 1, name: "image1", category: "none" };
  return (
    <div className="imageview">
      <h1>MageBank ImageView</h1>
      <div className="imageview-image">
        <img src="IMG_1701.JPG" alt="image1" />
      </div>
      <h2>{items["name"]}</h2>
      <h2>category:{items["category"]}</h2>
      <button className="imageview-delete">Delete!</button>
    </div>
  );
};

export default ImageView;
