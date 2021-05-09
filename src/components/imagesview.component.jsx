import React, { useState, useEffect } from "react";
import "../MageBank.css";
import { Link } from "react-router-dom";
import axios from "axios";

function ImagesView() {
  const [searchParameter, setSearchParameter] = useState("");
  const [allImages, setImages] = useState([]);

  useEffect(() => {
    fetchImages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchImages = async () => {
    await axios({
      method: "get",
      url: `http://localhost:4000/allImages`,
    })
      .then((images) => {
        setImages(images.data.allImages);
      })
      .catch(console.error);
  };

  let noImage;
  if (allImages.length === 0) {
    noImage = true;
  } else {
    noImage = false;
  }

  function displayCard(item) {
    return (
      <Link key={item.img_id} to={`/image/${item["img_id"]}`}>
        <div className="card">
          <div className="card-image">
            <img src={item["filename"]} alt={item["filename"]} />
          </div>
          <div className="card-stats">
            <div className="stat">
              <div className="value">{item["filename"]}</div>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  const handleDeleteAll = async (e) => {
    e.preventDefault();
    await axios({
      method: "delete",
      url: `http://localhost:4000/allImages`,
    })
      .then(window.location.reload())
      .catch(console.error);
  };

  const handleChange = (e) => {
    setSearchParameter(e.target.value);
  };

  const search = async () => {
    await axios({
      method: "get",
      url: `http://localhost:4000/allImages/${searchParameter}`,
    })
      .then((images) => {
        setImages(images.data.image);
      })
      .catch(console.error);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchParameter.length === 0) {
      alert("Empty search! Please retry with valid keywords or filename.");
    } else {
      search(searchParameter);
    }
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
        <h1>All Images</h1>
        <button className="imagesview-delete" onClick={handleDeleteAll}>
          Delete All
        </button>
        <form className="images-search" onSubmit={handleSubmit}>
          <label>
            <input type="text" onChange={handleChange} />
          </label>
          <button className="imagesview-search">Search!</button>
        </form>
        <div className="wrapper">
          {allImages.map((image) => displayCard(image))}
        </div>
      </div>
    );
  }

  return <div className="imagesview">{conditionalRender}</div>;
}

export default ImagesView;
