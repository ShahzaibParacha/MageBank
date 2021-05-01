// import React, { useEffect, useState } from "react";
import React from "react";
import "../App.css";
import { Link } from "react-router-dom";

function ImagesView() {
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
    { id: 1, name: "image1", category: "none" },
    { id: 1, name: "image1", category: "none" },
    { id: 1, name: "image1", category: "none" },
    { id: 1, name: "image1", category: "none" },
    { id: 1, name: "image1", category: "none" },
    { id: 1, name: "image1", category: "none" },
  ];

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

  return (
    <div className="imagesview">
      <h1>MageBank ImagesView</h1>
      <div className="wrapper">{items.map((item) => displayCard(item))}</div>
    </div>
  );
}

export default ImagesView;
