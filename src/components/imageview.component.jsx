import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useHistory } from "react-router-dom";

import "../MageBank.css";

const ImageView = () => {
  const history = useHistory();
  const [image, setImage] = useState([]);
  const params = useParams();

  useEffect(() => {
    fetchImage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchImage = async () => {
    console.log(`http://localhost:4000/image/${params.id}`);
    const image = await fetch(`http://localhost:4000/image/${params.id}`);
    const imageJSON = await image.json();
    setImage(imageJSON.image[0]);
  }

  const deleteImage = async (e) => {
    e.preventDefault();
    await axios({
      method: "delete",
      url: `http://localhost:4000/image/${image["img_id"]}`,
    })
      .then(history.push("/Images"))
      .catch(console.error);
  }

  return (
    <div className="imageview">
      <h1>{image["filename"]}</h1>
      <div className="imageview-image">
        <img src="IMG_1701.JPG" alt="image1" />
      </div>
      <h2>Keywords: {image["keywords"]}</h2>
      <button className="imageview-delete" onClick={deleteImage}>Delete!</button>
    </div>
  );
};

export default ImageView;
