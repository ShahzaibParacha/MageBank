// import React, { useEffect, useState } from "react";
import React, { useState } from "react";
import "../App.css";
import { Link } from "react-router-dom";

function ImagesView() {
  const [searchParameter, setSearchParameter] = useState("");

  //   useEffect(() => {
  //     fetchItems();
  //   }, []);

  //   const [items, setItems] = useState([]);

  //   async function fetchItems() {
  //     const allProjects = await fetch("http://localhost:4000/projects");
  //     const items = await allProjects.json();
  //     setItems(items.allProjects);
  //   }

  const items = [
    { id: 1, name: "image1", category: "none" },
    { id: 2, name: "image1", category: "none" },
    { id: 3, name: "image1", category: "none" },
    { id: 4, name: "image1", category: "none" },
    { id: 5, name: "image1", category: "none" },
    { id: 6, name: "image1", category: "none" },
    { id: 7, name: "image1", category: "none" },
  ];

  let noImage;
  if (items.length === 0) {
    noImage = true;
  } else {
    noImage = false;
  }

  function displayCard(item) {
    return (
      <Link to={`/image/${item["id"]}`}>
        <div className="card">
          <div className="card-image">
            <img src="IMG_1701.JPG" alt="image1" />
          </div>
          <div className="card-stats">
            <div className="stat">
              <div className="value">{item["name"]}</div>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  const handleChange = (e) => {
    setSearchParameter(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(searchParameter);
    //initaite seacrh and only display items from that search, everythign when empty string and nothing when nothing matches
  };

  let conditionalRender;
  if (noImage) {
    conditionalRender = (
      <div className="imagesview">
        <h1>No Images uploaded</h1>
      </div>
    );
  } else {
    conditionalRender = (
      <div className="imagesview">
        <h1>MageBank ImagesView</h1>
        <form className="images-search" onSubmit={handleSubmit}>
          <label>
            <input type="text" onChange={handleChange} />
          </label>
          <button className="imageview-search">Search!</button>
        </form>
        <div className="wrapper">{items.map((item) => displayCard(item))}</div>
      </div>
    );
  }

  return <div className="imagesview">{conditionalRender}</div>;
}

export default ImagesView;
